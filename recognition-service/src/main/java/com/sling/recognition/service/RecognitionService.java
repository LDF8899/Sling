package com.sling.recognition.service;

import org.springframework.web.multipart.MultipartFile;

public interface RecognitionService {
    /**
     * 识别蛇类图片
     *
     * @param image 蛇类图片
     * @return 识别结果
     */
    String identifySnake(MultipartFile image) throws Exception;
}