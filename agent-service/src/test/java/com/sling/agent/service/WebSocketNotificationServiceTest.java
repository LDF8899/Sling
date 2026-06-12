package com.sling.agent.service;

import com.sling.agent.dto.AgentDecision;
import com.sling.agent.dto.SosEvent;
import com.sling.agent.dto.WsMessage;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("WebSocket 推送服务测试")
class WebSocketNotificationServiceTest {

    @Mock
    private SimpMessagingTemplate messagingTemplate;

    @InjectMocks
    private WebSocketNotificationService wsNotification;

    @Test
    @DisplayName("推送到 /topic/sos/new")
    void testPushNewSos() {
        SosEvent event = new SosEvent();
        event.setHelpId(100L);

        wsNotification.pushNewSos(event);

        verify(messagingTemplate).convertAndSend(eq("/topic/sos/new"), any(WsMessage.class));
    }

    @Test
    @DisplayName("推送到 /topic/agent/decision")
    void testPushAgentDecision() {
        AgentDecision decision = new AgentDecision();
        decision.setHelpId(100L);

        wsNotification.pushAgentDecision(decision);

        verify(messagingTemplate).convertAndSend(eq("/topic/agent/decision"), any(WsMessage.class));
    }

    @Test
    @DisplayName("推送到 /topic/sos/{id}/status 和 /topic/sos/status")
    void testPushSosStatus() {
        SosEvent event = new SosEvent();
        event.setStatus("processing");

        wsNotification.pushSosStatus(100L, event);

        verify(messagingTemplate).convertAndSend(eq("/topic/sos/100/status"), any(WsMessage.class));
        verify(messagingTemplate).convertAndSend(eq("/topic/sos/status"), any(WsMessage.class));
    }
}
