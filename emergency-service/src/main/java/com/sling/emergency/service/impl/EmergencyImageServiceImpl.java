package com.sling.emergency.service.impl;

import com.sling.emergency.service.EmergencyImageService;
import com.sling.emergency.service.VolcanoAIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;

/**
 * Implementation of {@link EmergencyImageService} using the Volcano AI vision model.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmergencyImageServiceImpl implements EmergencyImageService {

    private final VolcanoAIService volcanoAIService;

    @Override
    public String analyzeWoundImage(MultipartFile image) throws Exception {
        try {
            String base64Image = convertToBase64(image);
            String imageUrl = "data:image/jpeg;base64," + base64Image;

            String prompt =
                "【蛇咬伤伤口识别 - 请发伤口实拍图】\n" +
                "请仔细分析伤口图片，严格按以下格式输出：\n\n" +
                "1. 牙痕形态判断：\n" +
                "   - 单排 / 双排牙痕\n" +
                "   - 牙痕间距（估算 mm）\n" +
                "   - 是否有明显毒牙痕（大而深的刺痕）\n\n" +
                "2. 伤口初步症状：\n" +
                "   - 红肿程度\n" +
                "   - 出血情况\n" +
                "   - 淤血范围\n" +
                "   - 是否出现溃烂/水泡\n" +
                "   - 麻木感特征\n\n" +
                "3. 初步判断：\n" +
                "   - 毒蛇咬伤概率（高/中/低）\n" +
                "   - 无毒蛇划伤概率（高/中/低）\n" +
                "   - 可能性最高的蛇种（2-3个）\n\n" +
                "4. 紧急处理建议：";

            return volcanoAIService.callVisionModel(prompt, imageUrl);
        } catch (Exception e) {
            log.error("Wound image analysis failed", e);
            throw new Exception("Image analysis error: " + e.getMessage(), e);
        }
    }

    /**
     * Convert a MultipartFile to a Base64-encoded string.
     */
    private String convertToBase64(MultipartFile image) throws Exception {
        try {
            byte[] bytes = image.getBytes();
            return Base64.getEncoder().encodeToString(bytes);
        } catch (Exception e) {
            log.error("Failed to convert image to Base64", e);
            throw new Exception("Image conversion failed: " + e.getMessage(), e);
        }
    }
}
