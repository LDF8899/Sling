package com.sling.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * SLING API 网关 — 基于 Spring Cloud Gateway
 *
 * <p>端口 8888，负责路由转发、全局 CORS、负载均衡、请求大小限制。
 * 所有前端/小程序请求统一通过此网关访问后端微服务。
 */
@SpringBootApplication(scanBasePackages = "com.sling")
@EnableDiscoveryClient
public class GatewayApplication {
    public static void main(String[] args) {
        SpringApplication.run(GatewayApplication.class, args);
    }
}