package com.sling.emergency.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.emergency.entity.SnakeEmergencyInfo;
import com.sling.emergency.mapper.SnakeEmergencyInfoMapper;
import com.sling.emergency.service.SnakeEmergencyInfoService;
import com.sling.emergency.service.SnakeMatchingService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of {@link SnakeEmergencyInfoService} using MyBatis-Plus.
 */
@Slf4j
@Service
public class SnakeEmergencyInfoServiceImpl
        extends ServiceImpl<SnakeEmergencyInfoMapper, SnakeEmergencyInfo>
        implements SnakeEmergencyInfoService {

    @Autowired
    private SnakeMatchingService snakeMatchingService;

    @Override
    public SnakeEmergencyInfo getBySnakeName(String snakeName) {
        QueryWrapper<SnakeEmergencyInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("snake_name", snakeName);
        queryWrapper.eq("del_flag", 0);
        return getOne(queryWrapper);
    }

    @Override
    public List<SnakeEmergencyInfo> listAll() {
        QueryWrapper<SnakeEmergencyInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("del_flag", 0);
        return list(queryWrapper);
    }

    @Override
    public List<SnakeEmergencyInfo> matchBySymptoms(String symptoms) {
        return snakeMatchingService.intelligentMatch(symptoms);
    }

    @Override
    public boolean updateById(SnakeEmergencyInfo snakeEmergencyInfo) {
        return super.updateById(snakeEmergencyInfo);
    }

    @Override
    public boolean save(SnakeEmergencyInfo snakeEmergencyInfo) {
        return super.save(snakeEmergencyInfo);
    }

    @Override
    public void populateImageUrls(SnakeEmergencyInfo emergencyInfo, String imageDir) {
        if (emergencyInfo == null) {
            return;
        }
        String imageUrl = emergencyInfo.getImageUrl();
        if (imageUrl == null || imageUrl.isEmpty()) {
            emergencyInfo.setImageUrls(new ArrayList<>());
            return;
        }

        List<String> imageUrls = new ArrayList<>();

        String baseName;
        String directory;

        // If imageUrl is a full path, extract base name and directory
        if (imageUrl.contains("/") || imageUrl.contains("\\")) {
            String fileName = new File(imageUrl).getName();
            baseName = fileName.replaceAll("(_\\d+)?\\.\\w+$", "");
            directory = imageUrl.substring(0, imageUrl.lastIndexOf(File.separator));

            log.debug("Scanning for sibling images: baseName={}, directory={}", baseName, directory);

            for (int i = 1; i <= 3; i++) {
                String imgFileName = baseName + "_" + i + ".jpg";
                String imgPath = directory + File.separator + imgFileName;
                File imgFile = new File(imgPath);
                if (imgFile.exists()) {
                    imageUrls.add(imgPath);
                    log.debug("Found sibling image {}: {}", i, imgPath);
                }
            }
        } else {
            // imageUrl is just a filename like "眼镜蛇_1.jpg"
            baseName = imageUrl.replaceAll("(_\\d+)?\\.\\w+$", "");
            directory = imageDir;

            log.debug("Scanning for sibling images in imageDir: baseName={}, imageDir={}", baseName, imageDir);

            File imageDirFile = new File(imageDir);
            if (imageDirFile.exists() && imageDirFile.isDirectory()) {
                for (int i = 1; i <= 3; i++) {
                    String imgFileName = baseName + "_" + i + ".jpg";
                    File imgFile = new File(imageDirFile, imgFileName);
                    if (imgFile.exists()) {
                        imageUrls.add(imgFileName); // store just filename
                        log.debug("Found sibling image {}: {}", i, imgFileName);
                    }
                }
            }
        }

        log.debug("Populated {} image URLs for snake '{}'", imageUrls.size(), emergencyInfo.getSnakeName());
        emergencyInfo.setImageUrls(imageUrls);
    }
}
