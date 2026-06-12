package com.sling.hospital.service;

import com.sling.common.redis.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.GeoResults;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.connection.RedisGeoCommands;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 医院 GEO 查询服务 — 基于 Redis GEO 的空间查询
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class HospitalGeoService {

    private static final String GEO_KEY = "sling:hospital:geo";
    private static final String INFO_PREFIX = "sling:hospital:info:";
    private static final String SERUM_SNAKE_PREFIX = "sling:hospital:serum:";
    private static final String SERUM_STOCK_PREFIX = "sling:hospital:stock:";

    private final RedisService redisService;

    /**
     * 查找指定坐标附近的医院
     *
     * @param lng       经度
     * @param lat       纬度
     * @param radiusKm  半径（公里）
     * @param maxCount  最大返回数
     * @return 医院列表（含距离）
     */
    public List<Map<String, Object>> findNearbyHospitals(double lng, double lat, double radiusKm, int maxCount) {
        Point center = new Point(lng, lat);
        GeoResults<RedisGeoCommands.GeoLocation<Object>> results =
                redisService.geoRadius(GEO_KEY, center, radiusKm, maxCount);

        if (results == null || results.getContent().isEmpty()) {
            return Collections.emptyList();
        }

        return results.getContent().stream()
                .map(gr -> {
                    String hospitalId = gr.getContent().getName().toString();
                    Map<Object, Object> rawInfo = redisService.hGetAll(INFO_PREFIX + hospitalId);
                    if (rawInfo == null || rawInfo.isEmpty()) return null;

                    Map<String, Object> result = new LinkedHashMap<>();
                    rawInfo.forEach((k, v) -> result.put(k.toString(), v));
                    result.put("distanceKm", Math.round(gr.getDistance().getValue() * 100.0) / 100.0);
                    result.put("etaMinutes", estimateEtaMinutes(gr.getDistance().getValue()));
                    return result;
                })
                .filter(Objects::nonNull)
                .sorted(Comparator.comparingDouble(m -> ((Number) m.get("distanceKm")).doubleValue()))
                .collect(Collectors.toList());
    }

    /**
     * 查找附近有指定蛇种血清的医院
     *
     * @param lng       经度
     * @param lat       纬度
     * @param snakeId   蛇种 ID
     * @param radiusKm  搜索半径（公里）
     * @param maxCount  最大返回数
     * @return 有血清的医院列表（含距离和库存）
     */
    public List<Map<String, Object>> findNearbyHospitalsWithSerum(
            double lng, double lat, Long snakeId, double radiusKm, int maxCount) {

        // 1. 先查附近所有医院
        List<Map<String, Object>> nearby = findNearbyHospitals(lng, lat, radiusKm, maxCount * 2);

        // 2. 筛选有血清的
        String serumSetKey = SERUM_SNAKE_PREFIX + snakeId;
        Set<Object> hospitalsWithSerum = redisService.sMembers(serumSetKey);
        Set<String> serumHospitalIds = hospitalsWithSerum != null
                ? hospitalsWithSerum.stream().map(Object::toString).collect(Collectors.toSet())
                : Collections.emptySet();

        return nearby.stream()
                .filter(m -> serumHospitalIds.contains(m.get("id").toString()))
                .peek(m -> {
                    String hid = m.get("id").toString();
                    String stock = redisService.getString(SERUM_STOCK_PREFIX + hid + ":" + snakeId);
                    m.put("serumAmount", stock != null ? Integer.parseInt(stock) : 0);
                })
                .limit(maxCount)
                .collect(Collectors.toList());
    }

    /**
     * 估算到达时间（分钟）— 简化模型：城市平均 30km/h
     */
    private int estimateEtaMinutes(double distanceKm) {
        if (distanceKm <= 0) return 0;
        return Math.max(1, (int) Math.ceil(distanceKm / 30.0 * 60));
    }
}
