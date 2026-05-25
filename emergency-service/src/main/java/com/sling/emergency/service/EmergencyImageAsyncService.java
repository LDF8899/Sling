package com.sling.emergency.service;

import com.sling.emergency.entity.SnakeEmergencyInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

/**
 * Async service for background image operations.
 * <p>
 * All methods in this service run on the {@code imageUpdateExecutor} thread pool,
 * keeping slow image-download tasks off the main request thread.
 */
@Slf4j
@Service
public class EmergencyImageAsyncService {

    private final BaiduImageService baiduImageService;
    private final SnakeEmergencyInfoService snakeEmergencyInfoService;

    public EmergencyImageAsyncService(BaiduImageService baiduImageService,
                                       SnakeEmergencyInfoService snakeEmergencyInfoService) {
        this.baiduImageService = baiduImageService;
        this.snakeEmergencyInfoService = snakeEmergencyInfoService;
    }

    /**
     * Asynchronously download and persist a Baidu image URL for the given snake.
     * <p>
     * Only fetches the image if one is not already stored.
     *
     * @param emergencyInfo the snake emergency info to update
     */
    @Async("imageUpdateExecutor")
    public void updateImageForSnake(SnakeEmergencyInfo emergencyInfo) {
        try {
            log.info("Async image update started for snake: {}", emergencyInfo.getSnakeName());

            // Skip if image already exists
            if (emergencyInfo.getImageUrl() != null && !emergencyInfo.getImageUrl().isEmpty()) {
                log.debug("Image already exists for snake '{}': {}, skipping",
                        emergencyInfo.getSnakeName(), emergencyInfo.getImageUrl());
                return;
            }

            String imageUrl = baiduImageService.getBaiduImageUrl(emergencyInfo.getSnakeName());

            if (imageUrl != null && !imageUrl.isEmpty()) {
                log.info("Retrieved image URL for '{}': {}", emergencyInfo.getSnakeName(), imageUrl);

                emergencyInfo.setImageUrl(imageUrl);

                SnakeEmergencyInfo updateInfo = new SnakeEmergencyInfo();
                updateInfo.setId(emergencyInfo.getId());
                updateInfo.setImageUrl(imageUrl);
                snakeEmergencyInfoService.updateById(updateInfo);

                log.info("Persisted image URL to database for snake '{}'", emergencyInfo.getSnakeName());
            } else {
                log.warn("No image URL returned for snake '{}'", emergencyInfo.getSnakeName());
            }
        } catch (Exception e) {
            log.error("Async image update failed for snake '{}': {}", emergencyInfo.getSnakeName(), e.getMessage(), e);
        }
    }
}
