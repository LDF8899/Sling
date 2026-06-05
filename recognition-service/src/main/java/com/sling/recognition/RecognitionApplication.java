package com.sling.recognition;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication(scanBasePackages = "com.sling")
@EnableDiscoveryClient
@EnableFeignClients(basePackages = "com.sling.recognition.feign")
@MapperScan("com.sling.recognition.mapper")
public class RecognitionApplication {
    public static void main(String[] args) {
        SpringApplication.run(RecognitionApplication.class, args);
    }
}
