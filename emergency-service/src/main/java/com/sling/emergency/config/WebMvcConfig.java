package com.sling.emergency.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Static resource mapping configuration.
 * <p>
 * Maps /tu/** URL paths to the local image storage directory configured via {@code app.image-dir}.
 */
@Slf4j
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${app.image-dir}")
    private String imageDir;

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        String location = "file:" + imageDir.replace("\\", "/") + "/";
        log.info("Mapping static resources /tu/** to {}", location);

        registry.addResourceHandler("/tu/**")
                .addResourceLocations(location);
    }
}
