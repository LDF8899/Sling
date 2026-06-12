package com.sling.agent;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

/**
 * 蛇灵智能体服务 — AI Agent 编排中心
 * <p>
 * 职责：监听 SOS 事件 → 编排决策 → 推送通知
 */
@SpringBootApplication(scanBasePackages = {"com.sling.agent", "com.sling.common"})
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.sling.agent.feign")
public class AgentApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgentApplication.class, args);
    }
}
