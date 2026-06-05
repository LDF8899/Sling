package com.sling.recognition.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.common.utils.Result;
import com.sling.recognition.entity.RecognitionRecord;
import com.sling.recognition.entity.RecognitionVO;
import com.sling.recognition.feign.EmergencyFeignClient;
import com.sling.recognition.feign.HospitalFeignClient;
import com.sling.recognition.feign.SnakeInfoFeignClient;
import com.sling.recognition.mapper.RecognitionRecordMapper;
import com.sling.recognition.service.RecognitionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Slf4j
@Service
public class RecognitionServiceImpl
        extends ServiceImpl<RecognitionRecordMapper, RecognitionRecord>
        implements RecognitionService {

    @Autowired
    private SnakeInfoFeignClient snakeInfoFeignClient;

    @Autowired
    private EmergencyFeignClient emergencyFeignClient;

    @Autowired
    private HospitalFeignClient hospitalFeignClient;

    @Value("${api.volcano.key}")
    private String apiKey;

    @Value("${api.volcano.model-id}")
    private String modelId;

    @Value("${api.volcano.base-url}")
    private String apiUrl;

    @Value("${app.image-upload-dir}")
    private String imageUploadDir;

    @Override
    public String identifySnake(MultipartFile image) throws Exception {
        String base64Image = convertToBase64(image);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelId);

        List<Map<String, Object>> messages = new ArrayList<>();
        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");

        List<Map<String, Object>> content = new ArrayList<>();

        Map<String, Object> imagePart = new HashMap<>();
        imagePart.put("type", "image_url");
        Map<String, String> imageUrlMap = new HashMap<>();
        imageUrlMap.put("url", "data:image/jpeg;base64," + base64Image);
        imagePart.put("image_url", imageUrlMap);

        Map<String, Object> textPart = new HashMap<>();
        textPart.put("type", "text");
        textPart.put("text",
            "【蛇类精准识别 - 请发蛇全身图】\n" +
            "请识别图片中的蛇类，严格以 JSON 格式返回，不要输出任何 JSON 之外的文字：\n" +
            "{\n" +
            "  \"name\": \"中文通用名\",\n" +
            "  \"latinName\": \"拉丁学名\",\n" +
            "  \"toxicity\": \"剧毒/无毒/微毒\",\n" +
            "  \"venomType\": \"血液循环毒/神经毒/混合毒/无\",\n" +
            "  \"distribution\": \"地理分布\",\n" +
            "  \"habits\": \"生活习性\",\n" +
            "  \"features\": \"外形关键特征\",\n" +
            "  \"similarSpecies\": \"易混淆品种\",\n" +
            "  \"firstAid\": \"应急处理建议\"\n" +
            "}");

        content.add(textPart);
        content.add(imagePart);
        userMessage.put("content", content);
        messages.add(userMessage);
        requestBody.put("messages", messages);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.exchange(
            apiUrl, HttpMethod.POST, requestEntity, Map.class
        );

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

    @Override
    public RecognitionRecord saveRecord(Long userId, MultipartFile image, String aiResult) {
        try {
            // 1. 保存图片到磁盘
            String uploadDir = imageUploadDir + "/recognition/";
            File dir = new File(uploadDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            String ext = ".jpg";
            String originalName = image.getOriginalFilename();
            if (originalName != null && originalName.contains(".")) {
                ext = originalName.substring(originalName.lastIndexOf("."));
            }
            String filename = "recognition_" + userId + "_" + System.currentTimeMillis() + ext;
            String filePath = uploadDir + filename;
            image.transferTo(new File(filePath));
            log.info("识别图片已保存: {}", filePath);

            // 2. 解析 AI 结果提取蛇名
            String snakeName = extractSnakeName(aiResult);

            // 3. 构建 metadata JSON
            String metadata = String.format(
                "{\"model_version\":\"%s\",\"full_text_length\":%d}",
                modelId, aiResult != null ? aiResult.length() : 0
            );

            // 4. 保存记录
            RecognitionRecord record = new RecognitionRecord();
            record.setUserId(userId);
            record.setImagePath("/uploads/recognition/" + filename);
            record.setRecognitionResult(snakeName);
            record.setRecognitionMetadata(metadata);
            save(record);

            log.info("识别记录已保存: userId={}, snakeName={}, recordId={}", userId, snakeName, record.getRecordId());
            return record;
        } catch (Exception e) {
            log.error("保存识别记录失败: userId={}", userId, e);
            return null;
        }
    }

    @Override
    public List<RecognitionRecord> getByUserId(Long userId) {
        return list(new QueryWrapper<RecognitionRecord>()
                .eq("user_id", userId)
                .orderByDesc("recognition_time")
                .last("LIMIT 20"));
    }

    @Override
    public int getCountByUserId(Long userId) {
        return (int) count(new QueryWrapper<RecognitionRecord>()
                .eq("user_id", userId));
    }

    /**
     * 获取完整的识别结果（包含蛇类信息、急救信息、医院列表）
     */
    @Override
    public RecognitionVO getIdentifyResult(Long userId, MultipartFile image) throws Exception {
        // 1. 调用 AI 识别
        String aiResult = identifySnake(image);

        // 2. 保存识别记录
        RecognitionRecord record = saveRecord(userId, image, aiResult);
        if (record == null) {
            throw new RuntimeException("保存识别记录失败");
        }

        // 3. 提取蛇名
        String snakeName = extractSnakeName(aiResult);
        log.info("识别出蛇名: {}", snakeName);

        // 4. 查询蛇类信息
        Map<String, Object> snakeInfo = null;
        try {
            Result<Map<String, Object>> snakeResult = snakeInfoFeignClient.getByName(snakeName);
            if (snakeResult != null && snakeResult.getCode() == 200) {
                snakeInfo = snakeResult.getData();
                log.info("获取蛇类信息成功: {}", snakeName);
            }
        } catch (Exception e) {
            log.warn("获取蛇类信息失败: {}", e.getMessage());
        }

        // 5. 查询急救信息
        Map<String, Object> emergencyInfo = null;
        try {
            Result<Map<String, Object>> emergencyResult = emergencyFeignClient.getBySnakeName(snakeName);
            if (emergencyResult != null && emergencyResult.getCode() == 200) {
                emergencyInfo = emergencyResult.getData();
                log.info("获取急救信息成功: {}", snakeName);
            }
        } catch (Exception e) {
            log.warn("获取急救信息失败: {}", e.getMessage());
        }

        // 6. 查询有血清的医院列表
        List<Map<String, Object>> hospitals = new ArrayList<>();
        if (snakeInfo != null && snakeInfo.containsKey("snakeId")) {
            try {
                Long snakeId = Long.valueOf(snakeInfo.get("snakeId").toString());
                Result<List<Map<String, Object>>> hospitalResult = hospitalFeignClient.getHospitalsWithSerum(snakeId);
                if (hospitalResult != null && hospitalResult.getCode() == 200 && hospitalResult.getData() != null) {
                    hospitals = hospitalResult.getData();
                    log.info("获取医院列表成功: {}家", hospitals.size());
                }
            } catch (Exception e) {
                log.warn("获取医院列表失败: {}", e.getMessage());
            }
        }

        // 7. 构建返回结果
        return RecognitionVO.builder()
                .aiResult(aiResult)
                .recordId(record.getRecordId())
                .snakeName(snakeName)
                .snakeInfo(snakeInfo)
                .emergencyInfo(emergencyInfo)
                .hospitals(hospitals)
                .build();
    }

    /**
     * 从 AI 返回的 JSON 中提取蛇名
     */
    private String extractSnakeName(String aiResult) {
        if (aiResult == null || aiResult.isEmpty()) {
            return "未知蛇类";
        }

        // 尝试 JSON 解析
        try {
            com.fasterxml.jackson.databind.ObjectMapper om = new com.fasterxml.jackson.databind.ObjectMapper();
            // 先尝试直接解析
            com.fasterxml.jackson.databind.JsonNode json = om.readTree(aiResult.trim());
            if (json.has("name")) return json.get("name").asText("未知蛇类");
        } catch (Exception ignored) {}

        // 尝试提取 ```json ... ``` 中的 JSON
        try {
            java.util.regex.Matcher m = java.util.regex.Pattern
                    .compile("```(?:json)?\\s*\\n?(\\{.*?\\})\\s*```", java.util.regex.Pattern.DOTALL)
                    .matcher(aiResult);
            if (m.find()) {
                com.fasterxml.jackson.databind.JsonNode json = new com.fasterxml.jackson.databind.ObjectMapper().readTree(m.group(1));
                if (json.has("name")) return json.get("name").asText("未知蛇类");
            }
        } catch (Exception ignored) {}

        // 尝试提取第一个 { ... } 块
        try {
            int start = aiResult.indexOf('{'), end = aiResult.lastIndexOf('}');
            if (start >= 0 && end > start) {
                com.fasterxml.jackson.databind.JsonNode json = new com.fasterxml.jackson.databind.ObjectMapper()
                        .readTree(aiResult.substring(start, end + 1));
                if (json.has("name")) return json.get("name").asText("未知蛇类");
            }
        } catch (Exception ignored) {}

        // fallback: 按旧行逻辑提取第一行有效文本
        for (String line : aiResult.split("\\n")) {
            String trimmed = line.trim();
            if (trimmed.isEmpty() || trimmed.startsWith("中文通用名") || trimmed.startsWith("#") || trimmed.startsWith("{")) continue;
            return trimmed.replaceAll("[^\\u4e00-\\u9fa5a-zA-Z/ ]", "").trim();
        }

        return "未知蛇类";
    }

    private String convertToBase64(MultipartFile image) throws Exception {
        byte[] bytes = image.getBytes();
        return Base64.getEncoder().encodeToString(bytes);
    }
}
