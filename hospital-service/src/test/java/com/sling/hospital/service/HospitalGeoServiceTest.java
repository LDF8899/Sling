package com.sling.hospital.service;

import com.sling.common.redis.RedisService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.geo.*;
import org.springframework.data.redis.connection.RedisGeoCommands;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("医院 GEO 查询服务测试")
class HospitalGeoServiceTest {

    @Mock
    private RedisService redisService;

    @InjectMocks
    private HospitalGeoService hospitalGeoService;

    @Test
    @DisplayName("返回按距离排序的医院")
    void testFindNearbyHospitals_ReturnsSortedByDistance() {
        GeoResult<RedisGeoCommands.GeoLocation<Object>> r1 = new GeoResult<>(
                new RedisGeoCommands.GeoLocation<>("1", new Point(113.94, 22.53)),
                new Distance(1.2, Metrics.KILOMETERS));
        GeoResult<RedisGeoCommands.GeoLocation<Object>> r2 = new GeoResult<>(
                new RedisGeoCommands.GeoLocation<>("2", new Point(113.95, 22.54)),
                new Distance(3.5, Metrics.KILOMETERS));

        when(redisService.geoRadius(eq("sling:hospital:geo"), any(Point.class), eq(50.0), eq(10)))
                .thenReturn(new GeoResults<>(List.of(r1, r2)));

        when(redisService.hGetAll("sling:hospital:info:1"))
                .thenReturn(Map.of("id", "1", "name", "近医院", "address", "地址1"));
        when(redisService.hGetAll("sling:hospital:info:2"))
                .thenReturn(Map.of("id", "2", "name", "远医院", "address", "地址2"));

        List<Map<String, Object>> result = hospitalGeoService.findNearbyHospitals(113.93, 22.52, 50.0, 10);

        assertEquals(2, result.size());
        assertEquals("近医院", result.get(0).get("name"));
        assertEquals(1.2, result.get(0).get("distanceKm"));
        assertEquals("远医院", result.get(1).get("name"));
    }

    @Test
    @DisplayName("无结果时返回空列表")
    void testFindNearbyHospitals_EmptyResult() {
        when(redisService.geoRadius(anyString(), any(Point.class), anyDouble(), anyInt()))
                .thenReturn(new GeoResults<>(Collections.emptyList()));

        List<Map<String, Object>> result = hospitalGeoService.findNearbyHospitals(113.93, 22.52, 50.0, 10);

        assertTrue(result.isEmpty());
    }

    @Test
    @DisplayName("筛选有血清的医院")
    void testFindNearbyHospitalsWithSerum_FiltersBySerum() {
        GeoResult<RedisGeoCommands.GeoLocation<Object>> r1 = new GeoResult<>(
                new RedisGeoCommands.GeoLocation<>("1", new Point(113.94, 22.53)),
                new Distance(1.2, Metrics.KILOMETERS));
        GeoResult<RedisGeoCommands.GeoLocation<Object>> r2 = new GeoResult<>(
                new RedisGeoCommands.GeoLocation<>("2", new Point(113.95, 22.54)),
                new Distance(3.5, Metrics.KILOMETERS));

        when(redisService.geoRadius(anyString(), any(Point.class), anyDouble(), anyInt()))
                .thenReturn(new GeoResults<>(List.of(r1, r2)));

        when(redisService.hGetAll("sling:hospital:info:1"))
                .thenReturn(Map.of("id", "1", "name", "有血清医院"));
        when(redisService.hGetAll("sling:hospital:info:2"))
                .thenReturn(Map.of("id", "2", "name", "无血清医院"));

        // 医院1有血清，医院2没有
        when(redisService.sMembers("sling:hospital:serum:1"))
                .thenReturn(Set.of("1"));
        when(redisService.getString("sling:hospital:stock:1:1"))
                .thenReturn("12");

        List<Map<String, Object>> result = hospitalGeoService.findNearbyHospitalsWithSerum(
                113.93, 22.52, 1L, 50.0, 5);

        assertEquals(1, result.size());
        assertEquals("有血清医院", result.get(0).get("name"));
        assertEquals(12, result.get(0).get("serumAmount"));
    }
}
