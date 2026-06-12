package com.sling.agent.listener;

import com.rabbitmq.client.Channel;
import com.sling.agent.config.RabbitMQConfig;
import com.sling.agent.dto.SosEvent;
import com.sling.agent.service.AgentOrchestrator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * SOS 事件监听器 — 从 RabbitMQ 消费事件并触发 Agent 编排
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class SosEventListener {

    private final AgentOrchestrator agentOrchestrator;

    /**
     * 监听 sos.created 队列 — 新 SOS 提交
     */
    @RabbitListener(queues = RabbitMQConfig.QUEUE_SOS_CREATED, ackMode = "MANUAL")
    public void onSosCreated(SosEvent event, Channel channel, Message message) throws IOException {
        long deliveryTag = message.getMessageProperties().getDeliveryTag();
        log.info("[MQ] 收到 SOS 创建事件: helpId={}, type={}, snake={}",
                event.getHelpId(), event.getType(), event.getSnakeName());

        try {
            agentOrchestrator.handleNewSos(event);
            channel.basicAck(deliveryTag, false);
            log.info("[MQ] SOS #{} 事件处理完成，已 ACK", event.getHelpId());
        } catch (Exception e) {
            log.error("[MQ] SOS #{} 事件处理失败: {}", event.getHelpId(), e.getMessage(), e);
            // 拒绝消息，不重新入队（避免无限重试）
            channel.basicNack(deliveryTag, false, false);
        }
    }

    /**
     * 监听 sos.status.changed 队列 — 状态变更
     */
    @RabbitListener(queues = RabbitMQConfig.QUEUE_SOS_STATUS_CHANGED, ackMode = "MANUAL")
    public void onSosStatusChanged(SosEvent event, Channel channel, Message message) throws IOException {
        long deliveryTag = message.getMessageProperties().getDeliveryTag();
        log.info("[MQ] 收到 SOS 状态变更事件: helpId={}", event.getHelpId());

        try {
            agentOrchestrator.handleStatusChanged(event);
            channel.basicAck(deliveryTag, false);
        } catch (Exception e) {
            log.error("[MQ] 状态变更事件处理失败: {}", e.getMessage(), e);
            channel.basicNack(deliveryTag, false, false);
        }
    }
}
