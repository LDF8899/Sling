package com.sling.emergency;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Emergency Service application entry point.
 * <p>
 * Provides snake-bite emergency guides, wound image analysis, and emergency help submission.
 */
@Slf4j
@SpringBootApplication(scanBasePackages = "com.sling")
@EnableDiscoveryClient
@MapperScan("com.sling.emergency.mapper")
@EnableConfigurationProperties
@EnableAsync
public class EmergencyApplication implements WebMvcConfigurer {

    @Value("${app.image-dir}")
    private String imageDir;

    public static void main(String[] args) {
        SpringApplication.run(EmergencyApplication.class, args);
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = "file:" + imageDir.replace("\\", "/") + "/";
        log.info("Mapping /tu/** to resource location: {}", location);

        registry.addResourceHandler("/tu/**")
                .addResourceLocations(location);
    }
}
