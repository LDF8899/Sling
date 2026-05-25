package com.sling.emergency.config;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;
import java.util.concurrent.ThreadPoolExecutor;

/**
 * Async task configuration for emergency-service.
 * <p>
 * Provides a dedicated thread pool for async image download tasks,
 * keeping them isolated from the main request-handling pool.
 */
@Slf4j
@Configuration
public class AsyncConfig {

    @Bean(name = "imageUpdateExecutor")
    public Executor imageUpdateExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);
        executor.setMaxPoolSize(5);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("async-image-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.setWaitForTasksToCompleteOnShutdown(true);
        executor.setAwaitTerminationSeconds(30);
        executor.initialize();
        log.info("Async image update executor initialized: core={}, max={}", executor.getCorePoolSize(), executor.getMaxPoolSize());
        return executor;
    }
}
