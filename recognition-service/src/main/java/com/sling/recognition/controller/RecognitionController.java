package com.sling.recognition.controller;

import com.sling.common.utils.Result;
import com.sling.recognition.service.RecognitionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * 蛇类识别控制器
 *
 * <p>提供蛇类图片上传识别接口。
 */
@Slf4j
@RestController
@RequestMapping("/api/recognition")
@RequiredArgsConstructor
public class RecognitionController {

    private final RecognitionService recognitionService;

    /**
     * 上传图片并识别蛇类
     *
     * @param image 图片文件
     * @return 识别结果
     */
    @PostMapping("/identify")
    public Result<?> identifySnake(@RequestParam("image") MultipartFile image) {
        try {
            if (image.isEmpty()) {
                return Result.fail("上传的图片不能为空");
            }

            String result = recognitionService.identifySnake(image);

            return Result.success(result);
        } catch (Exception e) {
            log.error("识别过程中发生错误", e);
            return Result.fail("识别过程中发生错误: " + e.getMessage());
        }
    }
}
