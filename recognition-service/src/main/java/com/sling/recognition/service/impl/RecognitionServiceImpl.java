package com.sling.recognition.service.impl;

import com.sling.recognition.service.RecognitionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

/**
 * 蛇类识别服务实现
 *
 * <p>通过调用火山引擎豆包视觉模型（doubao-seed-2-0-pro）进行蛇类图片识别。
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class RecognitionServiceImpl implements RecognitionService {

    @Value("${api.volcano.key}")
    private String apiKey;

    @Value("${api.volcano.model-id}")
    private String modelId;

    @Value("${api.volcano.base-url}")
    private String apiUrl;

    @Override
    public String identifySnake(MultipartFile image) throws Exception {
        String base64Image = convertToBase64(image);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        // 构建请求体 — chat/completions 格式
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelId);

        List<Map<String, Object>> messages = new ArrayList<>();
        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");

        List<Map<String, Object>> content = new ArrayList<>();

        // 图片
        Map<String, Object> imagePart = new HashMap<>();
        imagePart.put("type", "image_url");
        Map<String, String> imageUrlMap = new HashMap<>();
        imageUrlMap.put("url", "data:image/jpeg;base64," + base64Image);
        imagePart.put("image_url", imageUrlMap);

        // 文本指令
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("type", "text");
        textPart.put("text",
            "【蛇类精准识别 - 请发蛇全身图】\n" +
            "请识别图片中的蛇类，严格按以下格式输出：\n\n" +
            "中文通用名 + 拉丁学名\n" +
            "毒性：剧毒 / 无毒 / 微毒\n" +
            "毒液类型：血液循环毒 / 神经毒 / 混合毒 / 无\n" +
            "地理分布：\n" +
            "生活习性：\n" +
            "外形关键特征：\n" +
            "易混淆品种：\n" +
            "应急处理建议：");

        content.add(textPart);
        content.add(imagePart);
        userMessage.put("content", content);
        messages.add(userMessage);
        requestBody.put("messages", messages);

        // 发送请求
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(
            apiUrl,
            HttpMethod.POST,
            requestEntity,
            Map.class
        );

        // 解析响应
        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                if (message != null) {
                    Object text = message.get("content");
                    if (text != null) return text.toString();
                }
            }
        }

        log.warn("LLM 响应中未包含有效数据: {}", responseBody);
        return "识别失败，请稍后重试";
    }

    private String convertToBase64(MultipartFile image) throws Exception {
        byte[] bytes = image.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }
}
