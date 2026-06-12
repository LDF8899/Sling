package com.sling.emergency.event;

import com.sling.emergency.config.RabbitMQConfig;
import com.sling.emergency.entity.EmergencyHelp;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * SOS 事件发布器 — 将 EmergencyHelp 转换为事件并发送到 RabbitMQ
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class SosEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    /**
     * 发布 SOS 创建事件
     */
    public void publishSosCreated(EmergencyHelp help) {
        Map<String, Object> event = buildEvent(help);
        event.put("eventType", "created");

        String routingKey = "sos.created." + (help.getType() != null ? help.getType() : "unknown");
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, routingKey, event);
        log.info("[MQ] SOS 创建事件已发布: helpId={}, routingKey={}", help.getId(), routingKey);
    }

    /**
     * 发布 SOS 状态变更事件
     */
    public void publishSosStatusChanged(EmergencyHelp help) {
        Map<String, Object> event = buildEvent(help);
        event.put("eventType", "status_changed");

        String routingKey = "sos.status.changed." + help.getId();
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE, routingKey, event);
        log.info("[MQ] SOS 状态变更事件已发布: helpId={}, status={}", help.getId(), help.getStatus());
    }

    private Map<String, Object> buildEvent(EmergencyHelp help) {
        Map<String, Object> event = new HashMap<>();
        event.put("helpId", help.getId());
        event.put("type", help.getType());
        event.put("location", help.getLocation());
        event.put("description", help.getDescription());
        event.put("phone", help.getPhone());
        event.put("snakeName", help.getSnakeName());
        event.put("snakeId", help.getSnakeId());
        event.put("toxicityLevel", help.getToxicityLevel());
        event.put("recognitionRecordId", help.getRecognitionRecordId());
        event.put("longitude", help.getLongitude());
        event.put("latitude", help.getLatitude());
        event.put("status", help.getStatus());
        event.put("eventTime", System.currentTimeMillis());
        return event;
    }
}
