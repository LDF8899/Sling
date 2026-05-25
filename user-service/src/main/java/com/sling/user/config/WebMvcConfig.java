package com.sling.user.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Web MVC configuration for static resource handling and CORS.
 */
@Slf4j
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOriginPatterns("*")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
        log.info("CORS mappings configured for all paths");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // Map uploaded avatar files
        String baseDir = System.getProperty("user.dir");
        String avatarPath = baseDir + "/uploads/avatar/";

        // Ensure directory exists
        java.io.File avatarDir = new java.io.File(avatarPath);
        if (!avatarDir.exists()) {
            avatarDir.mkdirs();
        }

        registry.addResourceHandler("/uploads/avatar/**")
                .addResourceLocations("file:" + avatarPath)
                .setCachePeriod(3600);

        // Legacy mapping for backward compatibility
        registry.addResourceHandler("/user/uploads/**")
                .addResourceLocations("file:" + baseDir + "/uploads/");
        log.info("Resource handlers configured for avatar uploads at: {}", avatarPath);
    }
}
