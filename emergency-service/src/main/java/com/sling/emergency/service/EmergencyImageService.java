package com.sling.emergency.service;

import org.springframework.web.multipart.MultipartFile;

public interface EmergencyImageService {
    /**
     * 分析伤口图片并识别可能的症状
     * @param image 伤口图片
     * @return 分析结果
     * @throws Exception 处理异常
     */
    String analyzeWoundImage(MultipartFile image) throws Exception;
}