package com.sling.agent.service;

import com.sling.agent.dto.AgentDecision;
import com.sling.agent.dto.SosEvent;
import com.sling.agent.feign.EmergencyFeignClient;
import com.sling.agent.feign.HospitalFeignClient;
import com.sling.agent.feign.SnakeInfoFeignClient;
import com.sling.common.utils.Result;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.redis.core.RedisTemplate;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("调度服务测试")
class DispatchServiceTest {

    @Mock
    private HospitalFeignClient hospitalFeignClient;

    @Mock
    private SnakeInfoFeignClient snakeInfoFeignClient;

    @Mock
    private EmergencyFeignClient emergencyFeignClient;

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @InjectMocks
    private DispatchService dispatchService;

    private SosEvent testEvent;

    @BeforeEach
    void setUp() {
        testEvent = new SosEvent();
        testEvent.setHelpId(100L);
        testEvent.setType("snake_bite");
        testEvent.setSnakeName("银环蛇");
        testEvent.setSnakeId(1L);
        testEvent.setToxicityLevel(3);
        testEvent.setLocation("深圳南山");
    }

    @Test
    @DisplayName("有坐标时调用 GEO 接口")
    void testMakeDecision_WithCoordinates_UsesGeo() {
        testEvent.setLongitude(113.93);
        testEvent.setLatitude(22.52);

        Map<String, Object> hospital = Map.of(
                "hospitalId", 1, "hospitalName", "XX医院",
                "latitude", 22.52, "longitude", 113.93,
                "serumAmount", 12, "address", "深圳市南山区"
        );
        when(hospitalFeignClient.findNearbyWithSerum(
                eq(113.93), eq(22.52), eq(1L), eq(50.0), eq(3)))
                .thenReturn(Result.success(List.of(hospital)));
        when(snakeInfoFeignClient.getSnakeByName("银环蛇"))
                .thenReturn(Result.success(Map.of("venomType", "神经毒素")));
        when(emergencyFeignClient.getSnakeGuide("银环蛇"))
                .thenReturn(Result.success(Map.of("emergencyTreatment", "保持冷静")));

        AgentDecision decision = dispatchService.makeDecision(testEvent);

        assertNotNull(decision);
        assertEquals("critical", decision.getSeverity());
        assertEquals(1, decision.getHospitals().size());
        assertEquals("XX医院", decision.getHospitals().get(0).getHospitalName());

        // 验证使用了 GEO 接口
        verify(hospitalFeignClient).findNearbyWithSerum(113.93, 22.52, 1L, 50.0, 3);
        verify(hospitalFeignClient, never()).getHospitalsWithSerum(anyLong());
    }

    @Test
    @DisplayName("无坐标时降级到全量查询")
    void testMakeDecision_NoCoordinates_Fallback() {
        Map<String, Object> hospital = Map.of(
                "hospitalId", 1, "hospitalName", "XX医院",
                "latitude", 22.52, "longitude", 113.93,
                "serumAmount", 12, "address", "深圳市南山区"
        );
        when(hospitalFeignClient.getHospitalsWithSerum(eq(1L)))
                .thenReturn(Result.success(List.of(hospital)));
        when(snakeInfoFeignClient.getSnakeByName("银环蛇"))
                .thenReturn(Result.success(Map.of("venomType", "神经毒素")));
        when(emergencyFeignClient.getSnakeGuide("银环蛇"))
                .thenReturn(Result.success(Map.of("emergencyTreatment", "保持冷静")));

        AgentDecision decision = dispatchService.makeDecision(testEvent);

        assertNotNull(decision);
        verify(hospitalFeignClient).getHospitalsWithSerum(1L);
        verify(hospitalFeignClient, never()).findNearbyWithSerum(anyDouble(), anyDouble(), anyLong(), anyDouble(), anyInt());
    }

    @Test
    @DisplayName("剧毒 → critical")
    void testCalculateSeverity_Critical() {
        testEvent.setToxicityLevel(3);
        when(hospitalFeignClient.getHospitalsWithSerum(anyLong()))
                .thenReturn(Result.success(List.of()));
        when(snakeInfoFeignClient.getSnakeByName(anyString()))
                .thenReturn(Result.fail("not found"));
        when(emergencyFeignClient.getSnakeGuide(anyString()))
                .thenReturn(Result.fail("not found"));

        AgentDecision decision = dispatchService.makeDecision(testEvent);
        assertEquals("critical", decision.getSeverity());
    }

    @Test
    @DisplayName("有毒 → high")
    void testCalculateSeverity_High() {
        testEvent.setToxicityLevel(2);
        when(hospitalFeignClient.getHospitalsWithSerum(anyLong()))
                .thenReturn(Result.success(List.of()));
        when(snakeInfoFeignClient.getSnakeByName(anyString()))
                .thenReturn(Result.fail("not found"));
        when(emergencyFeignClient.getSnakeGuide(anyString()))
                .thenReturn(Result.fail("not found"));

        AgentDecision decision = dispatchService.makeDecision(testEvent);
        assertEquals("high", decision.getSeverity());
    }

    @Test
    @DisplayName("无毒 → low")
    void testCalculateSeverity_Low() {
        testEvent.setToxicityLevel(0);
        when(hospitalFeignClient.getHospitalsWithSerum(anyLong()))
                .thenReturn(Result.success(List.of()));
        when(snakeInfoFeignClient.getSnakeByName(anyString()))
                .thenReturn(Result.fail("not found"));
        when(emergencyFeignClient.getSnakeGuide(anyString()))
                .thenReturn(Result.fail("not found"));

        AgentDecision decision = dispatchService.makeDecision(testEvent);
        assertEquals("low", decision.getSeverity());
    }

    @Test
    @DisplayName("医院服务不可用时返回空列表")
    void testMakeDecision_HospitalServiceUnavailable() {
        testEvent.setLongitude(113.93);
        testEvent.setLatitude(22.52);
        when(hospitalFeignClient.findNearbyWithSerum(anyDouble(), anyDouble(), anyLong(), anyDouble(), anyInt()))
                .thenReturn(Result.fail("服务不可用"));
        when(hospitalFeignClient.getHospitalsWithSerum(anyLong()))
                .thenReturn(Result.fail("服务不可用"));
        when(snakeInfoFeignClient.getSnakeByName(anyString()))
                .thenReturn(Result.fail("not found"));
        when(emergencyFeignClient.getSnakeGuide(anyString()))
                .thenReturn(Result.fail("not found"));

        AgentDecision decision = dispatchService.makeDecision(testEvent);

        assertNotNull(decision);
        assertTrue(decision.getHospitals().isEmpty());
    }
}
