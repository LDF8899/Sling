package com.sling.warning;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication(scanBasePackages = "com.sling")
@EnableDiscoveryClient
@MapperScan("com.sling.warning.mapper")
public class WarningApplication {
    public static void main(String[] args) {
        SpringApplication.run(WarningApplication.class, args);
    }
}
