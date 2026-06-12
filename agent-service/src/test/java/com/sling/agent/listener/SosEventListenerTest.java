package com.sling.agent.listener;

import com.rabbitmq.client.Channel;
import com.sling.agent.dto.SosEvent;
import com.sling.agent.service.AgentOrchestrator;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageProperties;

import java.io.IOException;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("SOS 事件监听器测试")
class SosEventListenerTest {

    @Mock
    private AgentOrchestrator agentOrchestrator;

    @InjectMocks
    private SosEventListener sosEventListener;

    @Mock
    private Channel channel;

    @Test
    @DisplayName("消费成功 → ACK")
    void testOnSosCreated_Success() throws IOException {
        SosEvent event = new SosEvent();
        event.setHelpId(100L);
        event.setType("snake_bite");

        MessageProperties props = new MessageProperties();
        props.setDeliveryTag(1L);
        Message message = new Message(new byte[0], props);

        when(agentOrchestrator.handleNewSos(any(SosEvent.class)))
                .thenReturn(new com.sling.agent.dto.AgentDecision());

        sosEventListener.onSosCreated(event, channel, message);

        verify(agentOrchestrator).handleNewSos(event);
        verify(channel).basicAck(1L, false);
        verify(channel, never()).basicNack(anyLong(), anyBoolean(), anyBoolean());
    }

    @Test
    @DisplayName("处理失败 → NACK 不重新入队")
    void testOnSosCreated_ProcessingFails() throws IOException {
        SosEvent event = new SosEvent();
        event.setHelpId(100L);

        MessageProperties props = new MessageProperties();
        props.setDeliveryTag(2L);
        Message message = new Message(new byte[0], props);

        when(agentOrchestrator.handleNewSos(any(SosEvent.class)))
                .thenThrow(new RuntimeException("处理失败"));

        sosEventListener.onSosCreated(event, channel, message);

        verify(channel).basicNack(2L, false, false);
        verify(channel, never()).basicAck(anyLong(), anyBoolean());
    }
}
