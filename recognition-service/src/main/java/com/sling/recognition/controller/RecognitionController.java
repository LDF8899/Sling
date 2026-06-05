package com.sling.recognition.controller;

import com.sling.common.utils.Result;
import com.sling.recognition.entity.RecognitionRecord;
import com.sling.recognition.entity.RecognitionVO;
import com.sling.recognition.service.RecognitionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/recognition")
@RequiredArgsConstructor
public class RecognitionController {

    private final RecognitionService recognitionService;

    /**
     * 上传图片并识别蛇类，自动保存识别记录
     */
    @PostMapping("/identify")
    public Result<?> identifySnake(
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "userId", required = false) Long userId) {
        try {
            if (image.isEmpty()) {
                return Result.fail("上传的图片不能为空");
            }

            String result = recognitionService.identifySnake(image);

            // 自动保存识别记录
            RecognitionRecord record = null;
            if (userId != null) {
                record = recognitionService.saveRecord(userId, image, result);
            }

            Map<String, Object> data = new HashMap<>();
            data.put("result", result);
            if (record != null) {
                data.put("recordId", record.getRecordId());
            }

            return Result.success(data);
        } catch (Exception e) {
            log.error("识别过程中发生错误", e);
            return Result.fail("识别过程中发生错误: " + e.getMessage());
        }
    }

    /**
     * 获取用户的识别记录列表
     */
    @GetMapping("/records/user/{userId}")
    public Result<List<RecognitionRecord>> getRecordsByUser(@PathVariable Long userId) {
        try {
            List<RecognitionRecord> records = recognitionService.getByUserId(userId);
            return Result.success(records);
        } catch (Exception e) {
            log.error("获取识别记录失败: userId={}", userId, e);
            return Result.fail("获取识别记录失败");
        }
    }

    /**
     * 获取用户的识别记录数量
     */
    @GetMapping("/records/user/{userId}/count")
    public Result<Integer> getRecordCountByUser(@PathVariable Long userId) {
        try {
            int count = recognitionService.getCountByUserId(userId);
            return Result.success(count);
        } catch (Exception e) {
            log.error("获取识别记录数量失败: userId={}", userId, e);
            return Result.fail("获取识别记录数量失败");
        }
    }

    /**
     * 上传图片并识别蛇类，返回完整识别结果（包含蛇类信息、急救信息、医院列表）
     */
    @PostMapping("/identify-full")
    public Result<RecognitionVO> identifySnakeFull(
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "userId", required = false) Long userId) {
        try {
            if (image.isEmpty()) {
                return Result.fail("上传的图片不能为空");
            }

            if (userId == null) {
                return Result.fail("用户ID不能为空");
            }

            RecognitionVO result = recognitionService.getIdentifyResult(userId, image);
            return Result.success(result);
        } catch (Exception e) {
            log.error("识别过程中发生错误", e);
            return Result.fail("识别过程中发生错误: " + e.getMessage());
        }
    }
}
