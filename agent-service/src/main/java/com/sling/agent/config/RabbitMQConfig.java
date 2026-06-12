package com.sling.agent.config;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * RabbitMQ 拓扑配置 — 事件总线
 * <p>
 * Exchange: sling.events (topic)
 * Queues:   sos.created, sos.status.changed, agent.decision
 */
@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "sling.events";

    public static final String QUEUE_SOS_CREATED = "sos.created";
    public static final String QUEUE_SOS_STATUS_CHANGED = "sos.status.changed";
    public static final String QUEUE_AGENT_DECISION = "agent.decision";

    public static final String ROUTING_KEY_SOS_CREATED = "sos.created.*";
    public static final String ROUTING_KEY_SOS_STATUS = "sos.status.changed.*";
    public static final String ROUTING_KEY_AGENT_DECISION = "agent.decision.*";

    @Bean
    public TopicExchange slingExchange() {
        return ExchangeBuilder.topicExchange(EXCHANGE).durable(true).build();
    }

    @Bean
    public Queue sosCreatedQueue() {
        return QueueBuilder.durable(QUEUE_SOS_CREATED).build();
    }

    @Bean
    public Queue sosStatusChangedQueue() {
        return QueueBuilder.durable(QUEUE_SOS_STATUS_CHANGED).build();
    }

    @Bean
    public Queue agentDecisionQueue() {
        return QueueBuilder.durable(QUEUE_AGENT_DECISION).build();
    }

    @Bean
    public Binding sosCreatedBinding(Queue sosCreatedQueue, TopicExchange slingExchange) {
        return BindingBuilder.bind(sosCreatedQueue).to(slingExchange).with(ROUTING_KEY_SOS_CREATED);
    }

    @Bean
    public Binding sosStatusChangedBinding(Queue sosStatusChangedQueue, TopicExchange slingExchange) {
        return BindingBuilder.bind(sosStatusChangedQueue).to(slingExchange).with(ROUTING_KEY_SOS_STATUS);
    }

    @Bean
    public Binding agentDecisionBinding(Queue agentDecisionQueue, TopicExchange slingExchange) {
        return BindingBuilder.bind(agentDecisionQueue).to(slingExchange).with(ROUTING_KEY_AGENT_DECISION);
    }

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(jsonMessageConverter());
        return template;
    }
}
