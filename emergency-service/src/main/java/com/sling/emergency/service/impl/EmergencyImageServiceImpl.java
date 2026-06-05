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
                "请仔细分析伤口图片，严格以 JSON 格式返回，不要输出任何 JSON 之外的文字：\n" +
                "{\n" +
                "  \"biteMark\": {\"arrangement\": \"单排/双排\", \"spacingMm\": \"估算间距\", \"hasVenomFang\": true/false},\n" +
                "  \"symptoms\": {\"swelling\": \"红肿程度\", \"bleeding\": \"出血情况\", \"bruising\": \"淤血范围\", \"blister\": \"是否有溃烂/水泡\", \"numbness\": \"麻木感特征\"},\n" +
                "  \"assessment\": {\"venomousProbability\": \"高/中/低\", \"nonVenomousProbability\": \"高/中/低\", \"possibleSpecies\": [\"蛇种1\", \"蛇种2\"]},\n" +
                "  \"firstAid\": [\"紧急处理建议1\", \"紧急处理建议2\"]\n" +
                "}";

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
