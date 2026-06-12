package com.sling.agent.service;

import com.sling.agent.dto.AgentDecision;
import com.sling.agent.dto.SosEvent;
import com.sling.agent.entity.EventLog;
import com.sling.agent.feign.EmergencyFeignClient;
import com.sling.common.utils.Result;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("Agent 编排引擎测试")
class AgentOrchestratorTest {

    @Mock
    private DispatchService dispatchService;

    @Mock
    private WebSocketNotificationService wsNotification;

    @Mock
    private EmergencyFeignClient emergencyFeignClient;

    @Mock
    private EventSourcingService eventSourcing;

    @InjectMocks
    private AgentOrchestrator agentOrchestrator;

    private SosEvent testEvent;
    private AgentDecision testDecision;

    @BeforeEach
    void setUp() {
        testEvent = new SosEvent();
        testEvent.setHelpId(100L);
        testEvent.setType("snake_bite");
        testEvent.setSnakeName("银环蛇");
        testEvent.setSnakeId(1L);
        testEvent.setToxicityLevel(3);
        testEvent.setLocation("深圳南山");
        testEvent.setLongitude(113.93);
        testEvent.setLatitude(22.52);

        testDecision = new AgentDecision();
        testDecision.setHelpId(100L);
        testDecision.setSnakeName("银环蛇");
        testDecision.setSeverity("critical");
        testDecision.setSummary("蛇种：银环蛇（致命级），推荐 XX医院（血清 12 支）");
        AgentDecision.HospitalRecommendation hospital = new AgentDecision.HospitalRecommendation();
        hospital.setHospitalId(1L);
        hospital.setHospitalName("XX医院");
        hospital.setSerumAmount(12);
        testDecision.setHospitals(List.of(hospital));
    }

    @Test
    @DisplayName("正常编排：决策生成 + WS 推送 + 状态更新 + 事件记录均被调用")
    void testHandleNewSos_Success() {
        when(dispatchService.makeDecision(any(SosEvent.class))).thenReturn(testDecision);
        when(emergencyFeignClient.updateStatus(eq(100L), eq("processing"))).thenReturn(Result.success("ok"));
        when(eventSourcing.record(anyLong(), anyString(), anyString(), anyMap()))
                .thenReturn(new EventLog());

        AgentDecision result = agentOrchestrator.handleNewSos(testEvent);

        assertNotNull(result);
        assertEquals("critical", result.getSeverity());
        assertEquals(1, result.getHospitals().size());

        // 验证 WS 推送
        verify(wsNotification).pushNewSos(testEvent);
        verify(wsNotification).pushAgentDecision(testDecision);

        // 验证状态更新
        verify(emergencyFeignClient).updateStatus(100L, "processing");

        // 验证事件溯源记录（至少 4 次：created, decision, notification, status_changed）
        verify(eventSourcing, atLeast(4)).record(anyLong(), anyString(), anyString(), anyMap());
    }

    @Test
    @DisplayName("状态更新失败时：决策和推送仍正常，事件记录失败信息")
    void testHandleNewSos_StatusUpdateFails() {
        when(dispatchService.makeDecision(any(SosEvent.class))).thenReturn(testDecision);
        when(emergencyFeignClient.updateStatus(eq(100L), eq("processing")))
                .thenThrow(new RuntimeException("服务不可用"));
        when(eventSourcing.record(anyLong(), anyString(), anyString(), anyMap()))
                .thenReturn(new EventLog());
        when(eventSourcing.record(anyLong(), anyString(), anyString(), anyMap(), anyLong(), anyString(), anyString()))
                .thenReturn(new EventLog());

        AgentDecision result = agentOrchestrator.handleNewSos(testEvent);

        // 决策仍然成功
        assertNotNull(result);
        assertEquals("critical", result.getSeverity());

        // WS 推送仍然执行
        verify(wsNotification).pushNewSos(testEvent);
        verify(wsNotification).pushAgentDecision(testDecision);

        // 状态更新被调用（虽然失败）
        verify(emergencyFeignClient).updateStatus(100L, "processing");

        // 记录了失败事件
        verify(eventSourcing).record(eq(100L), eq("status_change_failed"), eq("track"),
                anyMap(), anyLong(), eq("fail"), anyString());
    }

    @Test
    @DisplayName("状态变更：验证 WS 推送 + 事件记录")
    void testHandleStatusChanged() {
        testEvent.setEventType("status_changed");
        testEvent.setStatus("processing");
        when(eventSourcing.record(anyLong(), anyString(), anyString(), anyMap()))
                .thenReturn(new EventLog());

        agentOrchestrator.handleStatusChanged(testEvent);

        verify(wsNotification).pushSosStatus(100L, testEvent);
        verify(eventSourcing).record(eq(100L), eq("status_changed"), eq("track"), anyMap());
    }
}
