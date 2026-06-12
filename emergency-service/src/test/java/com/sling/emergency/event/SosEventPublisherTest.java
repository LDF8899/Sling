package com.sling.emergency.event;

import com.sling.emergency.config.RabbitMQConfig;
import com.sling.emergency.entity.EmergencyHelp;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("SOS 事件发布器测试")
class SosEventPublisherTest {

    @Mock
    private RabbitTemplate rabbitTemplate;

    @InjectMocks
    private SosEventPublisher sosEventPublisher;

    @Test
    @DisplayName("发布 SOS 创建事件到 sling.events exchange")
    void testPublishSosCreated() {
        EmergencyHelp help = createTestHelp();

        sosEventPublisher.publishSosCreated(help);

        @SuppressWarnings("unchecked")
        ArgumentCaptor<Map<String, Object>> eventCaptor = (ArgumentCaptor<Map<String, Object>>) (ArgumentCaptor<?>) ArgumentCaptor.forClass(Map.class);
        verify(rabbitTemplate).convertAndSend(
                eq(RabbitMQConfig.EXCHANGE),
                eq("sos.created.snake_bite"),
                eventCaptor.capture());

        Map<String, Object> event = eventCaptor.getValue();
        assertEquals(100L, event.get("helpId"));
        assertEquals("snake_bite", event.get("type"));
        assertEquals("银环蛇", event.get("snakeName"));
        assertEquals("created", event.get("eventType"));
    }

    @Test
    @DisplayName("发布状态变更事件")
    void testPublishSosStatusChanged() {
        EmergencyHelp help = createTestHelp();
        help.setStatus("processing");

        sosEventPublisher.publishSosStatusChanged(help);

        verify(rabbitTemplate).convertAndSend(
                eq(RabbitMQConfig.EXCHANGE),
                eq("sos.status.changed.100"),
                any(Map.class));
    }

    @Test
    @DisplayName("事件包含经纬度坐标")
    void testPublishSosCreated_IncludesGeoCoordinates() {
        EmergencyHelp help = createTestHelp();
        help.setLongitude(113.93);
        help.setLatitude(22.52);

        sosEventPublisher.publishSosCreated(help);

        @SuppressWarnings("unchecked")
        ArgumentCaptor<Map<String, Object>> eventCaptor = (ArgumentCaptor<Map<String, Object>>) (ArgumentCaptor<?>) ArgumentCaptor.forClass(Map.class);
        verify(rabbitTemplate).convertAndSend(anyString(), anyString(), eventCaptor.capture());

        Map<String, Object> event = eventCaptor.getValue();
        assertEquals(113.93, event.get("longitude"));
        assertEquals(22.52, event.get("latitude"));
    }

    private EmergencyHelp createTestHelp() {
        EmergencyHelp help = new EmergencyHelp();
        help.setId(100L);
        help.setType("snake_bite");
        help.setLocation("深圳南山");
        help.setSnakeName("银环蛇");
        help.setSnakeId(1L);
        help.setToxicityLevel(3);
        help.setPhone("13800138000");
        return help;
    }
}
