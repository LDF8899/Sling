package com.sling.hospital.runner;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sling.common.redis.RedisService;
import com.sling.hospital.entity.HospitalInfo;
import com.sling.hospital.entity.SerumInventory;
import com.sling.hospital.mapper.HospitalInfoMapper;
import com.sling.hospital.mapper.SerumInventoryMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.geo.Point;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

/**
 * 服务启动时同步医院数据到 Redis GEO + 血清库存索引
 * <p>
 * Key 结构：
 * - sling:hospital:geo — GEO 集合，医院经纬度
 * - sling:hospital:info:{id} — Hash，医院详情
 * - sling:hospital:serum:{snakeId} — Set，有该蛇种血清的医院 ID 列表
 * - sling:hospital:serum:{hospitalId}:{snakeId} — String，库存数量
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class HospitalGeoSyncRunner implements CommandLineRunner {

    private static final String GEO_KEY = "sling:hospital:geo";
    private static final String INFO_PREFIX = "sling:hospital:info:";
    private static final String SERUM_SNAKE_PREFIX = "sling:hospital:serum:";
    private static final String SERUM_STOCK_PREFIX = "sling:hospital:stock:";

    private final HospitalInfoMapper hospitalInfoMapper;
    private final SerumInventoryMapper serumInventoryMapper;
    private final RedisService redisService;

    @Override
    public void run(String... args) {
        log.info("========== 医院 Redis GEO 同步开始 ==========");
        long start = System.currentTimeMillis();

        try {
            clearOldKeys();
            syncHospitals();
            syncSerumInventory();

            long elapsed = System.currentTimeMillis() - start;
            log.info("========== 医院 Redis GEO 同步完成，耗时 {}ms ==========", elapsed);
        } catch (Exception e) {
            log.error("医院 Redis GEO 同步失败", e);
        }
    }

    /**
     * 同步医院坐标到 Redis GEO + 详情到 Hash
     */
    private void syncHospitals() {
        List<HospitalInfo> hospitals = hospitalInfoMapper.selectList(
                new QueryWrapper<HospitalInfo>().eq("del_flag", false));

        int count = 0;
        for (HospitalInfo h : hospitals) {
            if (h.getLatitude() == null || h.getLongitude() == null) continue;

            String id = String.valueOf(h.getHospitalId());

            // GEO 添加
            Point point = new Point(h.getLongitude().doubleValue(), h.getLatitude().doubleValue());
            redisService.geoAdd(GEO_KEY, point, id);

            // Hash 详情
            Map<String, Object> hash = new LinkedHashMap<>();
            hash.put("id", id);
            hash.put("name", h.getHospitalName());
            hash.put("address", h.getAddress());
            hash.put("lat", h.getLatitude());
            hash.put("lng", h.getLongitude());
            hash.put("contact", h.getContactInfo());
            hash.put("type", h.getHospitalType());
            hash.put("emergency", h.getEmergencyDepartment());
            redisService.hSetAll(INFO_PREFIX + id, hash);

            count++;
        }
        log.info("同步 {} 家医院到 Redis GEO", count);
    }

    /**
     * 同步血清库存到 Redis
     */
    private void syncSerumInventory() {
        List<SerumInventory> inventories = serumInventoryMapper.selectList(new QueryWrapper<>());

        // 按蛇种分组
        Map<Long, List<SerumInventory>> bySnake = inventories.stream()
                .filter(i -> i.getSerumAmount() != null && i.getSerumAmount() > 0)
                .collect(Collectors.groupingBy(SerumInventory::getSnakeId));

        for (Map.Entry<Long, List<SerumInventory>> entry : bySnake.entrySet()) {
            Long snakeId = entry.getKey();
            String setKey = SERUM_SNAKE_PREFIX + snakeId;

            for (SerumInventory inv : entry.getValue()) {
                String hospitalId = String.valueOf(inv.getHospitalId());
                redisService.sAdd(setKey, hospitalId);
                // 存储库存数量
                redisService.set(SERUM_STOCK_PREFIX + hospitalId + ":" + snakeId,
                        String.valueOf(inv.getSerumAmount()), 24, TimeUnit.HOURS);
            }
        }
        log.info("同步 {} 个蛇种的血清库存索引到 Redis", bySnake.size());
    }

    private void clearOldKeys() {
        for (String prefix : Arrays.asList(GEO_KEY, INFO_PREFIX, SERUM_SNAKE_PREFIX, SERUM_STOCK_PREFIX)) {
            Set<String> keys = redisService.keys(prefix + "*");
            if (keys != null && !keys.isEmpty()) {
                redisService.delete(keys.toArray(new String[0]));
            }
        }
        // GEO key 需要单独删除
        redisService.delete(GEO_KEY);
        log.info("已清除旧的医院 Redis 数据");
    }
}
