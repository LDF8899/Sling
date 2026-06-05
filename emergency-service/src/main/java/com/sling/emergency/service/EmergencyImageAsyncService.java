package com.sling.emergency.service;

import com.sling.emergency.entity.SnakeEmergencyInfo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.File;

/**
 * Async service for background image operations.
 * <p>
 * All methods in this service run on the {@code imageUpdateExecutor} thread pool,
 * keeping slow image-download tasks off the main request thread.
 */
@Slf4j
@Service
public class EmergencyImageAsyncService {

    @Value("${app.image-dir}")
    private String imageDir;

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
        updateImageForSnake(emergencyInfo, false);
    }

    /**
     * Asynchronously download and persist a Baidu image URL for the given snake.
     *
     * @param emergencyInfo the snake emergency info to update
     * @param forceRefresh  if true, delete existing local images and re-fetch from Baidu
     */
    @Async("imageUpdateExecutor")
    public void updateImageForSnake(SnakeEmergencyInfo emergencyInfo, boolean forceRefresh) {
        try {
            log.info("Async image update started for snake: {}, forceRefresh={}", emergencyInfo.getSnakeName(), forceRefresh);

            if (forceRefresh) {
                // Delete existing local image files
                deleteExistingImages(emergencyInfo);
                // Clear imageUrl so scraper runs
                emergencyInfo.setImageUrl(null);
                SnakeEmergencyInfo clearInfo = new SnakeEmergencyInfo();
                clearInfo.setId(emergencyInfo.getId());
                clearInfo.setImageUrl("");
                snakeEmergencyInfoService.updateById(clearInfo);
            } else if (emergencyInfo.getImageUrl() != null && !emergencyInfo.getImageUrl().isEmpty()) {
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

    /**
     * Synchronously delete existing images and re-fetch from Baidu.
     * Called on the request thread so the response contains fresh image URLs.
     *
     * @param emergencyInfo the snake emergency info to refresh
     */
    public void refreshImageSync(SnakeEmergencyInfo emergencyInfo) {
        try {
            log.info("Sync image refresh started for snake: {}", emergencyInfo.getSnakeName());

            // 1. Delete existing local image files
            deleteExistingImages(emergencyInfo);

            // 2. Clear imageUrl in DB so scraper will run
            SnakeEmergencyInfo clearInfo = new SnakeEmergencyInfo();
            clearInfo.setId(emergencyInfo.getId());
            clearInfo.setImageUrl("");
            snakeEmergencyInfoService.updateById(clearInfo);
            emergencyInfo.setImageUrl(null);

            // 3. Call Python scraper synchronously
            String imageUrl = baiduImageService.getBaiduImageUrl(emergencyInfo.getSnakeName());

            if (imageUrl != null && !imageUrl.isEmpty()) {
                log.info("Sync refresh retrieved image URL for '{}': {}", emergencyInfo.getSnakeName(), imageUrl);
                emergencyInfo.setImageUrl(imageUrl);

                SnakeEmergencyInfo updateInfo = new SnakeEmergencyInfo();
                updateInfo.setId(emergencyInfo.getId());
                updateInfo.setImageUrl(imageUrl);
                snakeEmergencyInfoService.updateById(updateInfo);
            } else {
                log.warn("Sync refresh: no image URL returned for snake '{}'", emergencyInfo.getSnakeName());
            }
        } catch (Exception e) {
            log.error("Sync image refresh failed for snake '{}': {}", emergencyInfo.getSnakeName(), e.getMessage(), e);
        }
    }

    /**
     * Delete existing local image files for the given snake (e.g. snakeName_1.jpg, snakeName_2.jpg, snakeName_3.jpg).
     */
    private void deleteExistingImages(SnakeEmergencyInfo emergencyInfo) {
        String imageUrl = emergencyInfo.getImageUrl();
        if (imageUrl == null || imageUrl.isEmpty()) {
            return;
        }

        // Extract base name from imageUrl (could be filename or full path)
        String baseName;
        if (imageUrl.contains("/") || imageUrl.contains("\\")) {
            String fileName = new File(imageUrl).getName();
            baseName = fileName.replaceAll("(_\\d+)?\\.\\w+$", "");
        } else {
            baseName = imageUrl.replaceAll("(_\\d+)?\\.\\w+$", "");
        }

        File dir = new File(imageDir);
        if (!dir.exists() || !dir.isDirectory()) {
            return;
        }

        for (int i = 1; i <= 3; i++) {
            // Try common extensions
            for (String ext : new String[]{".jpg", ".png", ".gif", ".jpeg"}) {
                File imgFile = new File(dir, baseName + "_" + i + ext);
                if (imgFile.exists()) {
                    boolean deleted = imgFile.delete();
                    log.info("Deleted image file {} for snake '{}': {}", imgFile.getName(), emergencyInfo.getSnakeName(), deleted);
                }
            }
        }
    }
}
