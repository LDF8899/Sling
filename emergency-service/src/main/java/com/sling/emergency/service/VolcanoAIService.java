package com.sling.emergency.service;

import com.sling.emergency.config.VolcanoConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

import jakarta.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 火山引擎豆包 AI 服务 — doubao-seed-2-0-pro
 */
@Service
public class VolcanoAIService {

    private static final Logger logger = LoggerFactory.getLogger(VolcanoAIService.class);

    @Autowired
    private VolcanoConfig volcanoConfig;

    private static final String API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";

    @PostConstruct
    public void init() {
        String key = volcanoConfig.getApiKey();
        logger.info("VolcanoAIService init — key: {}, model: {}",
            key != null ? key.substring(0, Math.min(8, key.length())) + "..." : "null",
            volcanoConfig.getModels().getText());
    }

    /**
     * 调用文本模型
     */
    public String callTextModel(String prompt) {
        try {
            List<Map<String, Object>> messages = new ArrayList<>();
            Map<String, Object> userMessage = new HashMap<>();
            userMessage.put("role", "user");

            List<Map<String, Object>> content = new ArrayList<>();
            Map<String, Object> textPart = new HashMap<>();
            textPart.put("type", "text");
            textPart.put("text", prompt);
            content.add(textPart);

            userMessage.put("content", content);
            messages.add(userMessage);

            return executeRequest(messages);
        } catch (ResourceAccessException e) {
            logger.error("Text model network timeout", e);
            return "网络连接超时，请稍后重试";
        } catch (Exception e) {
            logger.error("Text model error", e);
            return "调用AI失败: " + e.getMessage();
        }
    }

    /**
     * 调用视觉模型（文本 + 图片）
     */
    public String callVisionModel(String prompt, String imageUrl) {
        try {
            List<Map<String, Object>> messages = new ArrayList<>();
            Map<String, Object> userMessage = new HashMap<>();
            userMessage.put("role", "user");

            List<Map<String, Object>> content = new ArrayList<>();

            Map<String, Object> textPart = new HashMap<>();
            textPart.put("type", "text");
            textPart.put("text", prompt);
            content.add(textPart);

            Map<String, Object> imagePart = new HashMap<>();
            imagePart.put("type", "image_url");
            Map<String, String> imageUrlMap = new HashMap<>();
            imageUrlMap.put("url", imageUrl);
            imagePart.put("image_url", imageUrlMap);
            content.add(imagePart);

            userMessage.put("content", content);
            messages.add(userMessage);

            return executeRequest(messages);
        } catch (ResourceAccessException e) {
            logger.error("Vision model network timeout", e);
            return "网络连接超时，请稍后重试";
        } catch (Exception e) {
            logger.error("Vision model error", e);
            return "调用视觉模型失败: " + e.getMessage();
        }
    }

    /**
     * 带重试的安全调用
     */
    public String safeCallModel(String modelId, List<Map<String, Object>> messages) {
        int maxRetries = 3;
        int retryDelay = 2000;

        for (int i = 0; i < maxRetries; i++) {
            try {
                return executeRequest(messages);
            } catch (ResourceAccessException e) {
                logger.error("Network timeout (attempt {}/{})", i + 1, maxRetries);
                if (i < maxRetries - 1) {
                    try {
                        Thread.sleep(retryDelay);
                        retryDelay *= 2;
                    } catch (InterruptedException ie) {
                        Thread.currentThread().interrupt();
                        return "请求被中断";
                    }
                } else {
                    return "网络连接超时，请稍后重试";
                }
            } catch (Exception e) {
                logger.error("Error (attempt {}/{})", i + 1, maxRetries, e);
                return "调用失败: " + e.getMessage();
            }
        }
        return "重试" + maxRetries + "次后仍失败";
    }

    // ==================== 请求执行与响应解析 ====================

    private String executeRequest(List<Map<String, Object>> messages) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + volcanoConfig.getApiKey());

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", volcanoConfig.getModels().getText());
        requestBody.put("messages", messages);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add((request, body, execution) -> {
            request.getHeaders().add("Connection", "close");
            return execution.execute(request, body);
        });

        Class<Map> responseType = Map.class;
        ResponseEntity<Map> response = restTemplate.postForEntity(API_URL, requestEntity, responseType);

        return parseResponse(response.getBody());
    }

    @SuppressWarnings("unchecked")
    private String parseResponse(Map<String, Object> responseBody) {
        if (responseBody == null) {
            logger.warn("LLM response is null");
            return "AI 未返回有效响应";
        }

        // chat/completions 格式: choices[0].message.content
        if (responseBody.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                if (message != null) {
                    Object contentObj = message.get("content");
                    if (contentObj instanceof String) return (String) contentObj;
                }
            }
        }

        // 兼容 responses 格式: output[0].content[0].text
        if (responseBody.containsKey("output")) {
            List<Map<String, Object>> output = (List<Map<String, Object>>) responseBody.get("output");
            if (output != null && !output.isEmpty()) {
                Map<String, Object> item = output.get(0);
                if (item.containsKey("content")) {
                    List<Map<String, Object>> c = (List<Map<String, Object>>) item.get("content");
                    if (c != null && !c.isEmpty()) {
                        Object text = c.get(0).get("text");
                        if (text != null) return text.toString();
                    }
                }
            }
        }

        logger.warn("Unable to parse LLM response: {}", responseBody);
        return "识别失败，响应格式异常";
    }

    public VolcanoConfig getVolcanoConfig() {
        return this.volcanoConfig;
    }
}
