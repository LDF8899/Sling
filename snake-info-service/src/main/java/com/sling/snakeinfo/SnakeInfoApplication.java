package com.sling.snakeinfo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

/**
 * 蛇类信息服务 — 蛇类百科数据库、特征库查询
 *
 * <p>端口 7002，为识别/预警/应急等服务提供蛇类数据支撑。
 */
@SpringBootApplication(scanBasePackages = "com.sling")
@EnableDiscoveryClient
@MapperScan("com.sling.snakeinfo.mapper")
public class SnakeInfoApplication {
    public static void main(String[] args) {
        SpringApplication.run(SnakeInfoApplication.class, args);
    }
}