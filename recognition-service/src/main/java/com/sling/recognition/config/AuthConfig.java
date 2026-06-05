package com.sling.recognition.config;

import com.sling.common.interceptor.AdminAuthInterceptor;
import com.sling.common.security.JwtUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AuthConfig {

    @Bean
    public JwtUtil jwtUtil() {
        return new JwtUtil();
    }

    @Bean
    public AdminAuthInterceptor adminAuthInterceptor(JwtUtil jwtUtil) {
        return new AdminAuthInterceptor(jwtUtil);
    }
}
