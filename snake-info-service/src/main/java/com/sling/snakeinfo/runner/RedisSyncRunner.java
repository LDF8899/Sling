package com.sling.snakeinfo.runner;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sling.common.redis.RedisService;
import com.sling.snakeinfo.entity.SnakeInfo;
import com.sling.snakeinfo.mapper.SnakeInfoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * 服务启动时自动将 MySQL 蛇类数据同步到 Redis
 *
 * <p>Key 结构：
 * <ul>
 *   <li>sling:snake:info:{snakeId} — Hash，蛇类急救卡片</li>
 *   <li>sling:snake:name:{snakeName} — String，名称→ID 索引</li>
 *   <li>sling:snake:latin:{latinName} — String，学名→ID 索引</li>
 *   <li>sling:snake:family:{family} — Set，科分类索引</li>
 *   <li>sling:snake:danger:{level} — Set，危险等级索引</li>
 * </ul>
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class RedisSyncRunner implements CommandLineRunner {

    private static final String PREFIX = "sling:snake:";
    private static final String DATA_VERSION_KEY = "sling:data:version";

    private final SnakeInfoMapper snakeInfoMapper;
    private final RedisService redisService;

    @Override
    public void run(String... args) {
        log.info("========== Redis 数据同步开始 ==========");
        long start = System.currentTimeMillis();

        try {
            // 清除旧数据
            clearOldKeys();

            // 从 MySQL 加载全部蛇类数据
            List<SnakeInfo> allSnakes = snakeInfoMapper.selectList(new QueryWrapper<>());
            if (allSnakes.isEmpty()) {
                log.warn("snake_info 表无数据，跳过同步");
                return;
            }

            int count = 0;
            for (SnakeInfo snake : allSnakes) {
                syncOne(snake);
                count++;
            }

            // 更新数据版本号
            String version = String.valueOf(System.currentTimeMillis());
            redisService.set(DATA_VERSION_KEY, version);

            long elapsed = System.currentTimeMillis() - start;
            log.info("========== Redis 数据同步完成：{} 条蛇类，耗时 {}ms ==========", count, elapsed);

        } catch (Exception e) {
            log.error("Redis 数据同步失败", e);
        }
    }

    /**
     * 同步单条蛇类数据到 Redis
     */
    private void syncOne(SnakeInfo snake) {
        String id = String.valueOf(snake.getSnakeId());

        // 1. Hash — sling:snake:info:{id}
        String hashKey = PREFIX + "info:" + id;
        Map<String, Object> hash = new LinkedHashMap<>();
        hash.put("id", id);
        hash.put("name", snake.getSnakeName());
        hash.put("family", snake.getFamily());
        hash.put("genus", snake.getGenus());
        hash.put("latin_name", snake.getLatinName());
        hash.put("characteristics", snake.getCharacteristics());
        hash.put("toxicity_level", snake.getToxicityLevel());
        hash.put("toxin_type", snake.getToxinType());
        hash.put("danger_level", snake.getDangerLevel());
        hash.put("habitat_info", snake.getHabitatInfo());
        hash.put("distribution", snake.getDistribution());
        hash.put("conservation_status", snake.getConservationStatus());
        redisService.hSetAll(hashKey, hash);

        // 2. 名称索引 — sling:snake:name:{snakeName}
        if (snake.getSnakeName() != null) {
            redisService.set(PREFIX + "name:" + snake.getSnakeName(), id);
        }

        // 3. 拉丁学名索引 — sling:snake:latin:{latinName}
        if (snake.getLatinName() != null) {
            // 学名中可能有空格和括号，保留原始格式
            redisService.set(PREFIX + "latin:" + snake.getLatinName(), id);
        }

        // 4. 科分类索引 — sling:snake:family:{family}
        if (snake.getFamily() != null) {
            redisService.sAdd(PREFIX + "family:" + snake.getFamily(), id);
        }

        // 5. 危险等级索引 — sling:snake:danger:{dangerLevel}
        if (snake.getDangerLevel() != null) {
            redisService.sAdd(PREFIX + "danger:" + snake.getDangerLevel(), id);
        }

        // 6. 毒素类型索引 — sling:snake:toxin:{toxinType}
        if (snake.getToxinType() != null) {
            redisService.sAdd(PREFIX + "toxin:" + snake.getToxinType(), id);
        }
    }

    /**
     * 清除旧的同步数据
     */
    private void clearOldKeys() {
        Set<String> keys = redisService.keys(PREFIX + "*");
        if (keys != null && !keys.isEmpty()) {
            redisService.delete(keys.toArray(new String[0]));
            log.info("已清除旧数据 {} 条", keys.size());
        }
    }
}
