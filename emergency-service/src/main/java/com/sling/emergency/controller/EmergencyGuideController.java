package com.sling.emergency.controller;

import com.sling.common.utils.Result;
import com.sling.emergency.entity.EmergencyQaCache;
import com.sling.emergency.entity.SnakeEmergencyInfo;
import com.sling.emergency.service.BaiduImageService;
import com.sling.emergency.service.EmergencyImageAsyncService;
import com.sling.emergency.service.EmergencyQaCacheService;
import com.sling.emergency.service.SnakeEmergencyInfoService;
import com.sling.emergency.service.SnakeMatchingService;
import com.sling.emergency.service.VolcanoAIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST controller for snake emergency guides.
 * <p>
 * Provides endpoints for looking up snake species info, matching symptoms to species,
 * and answering emergency questions via AI.
 */
@Slf4j
@RestController
@RequestMapping("/api/emergency/guide")
@RequiredArgsConstructor
public class EmergencyGuideController {

    @Value("${app.image-dir}")
    private String imageDir;

    private final SnakeEmergencyInfoService snakeEmergencyInfoService;
    private final SnakeMatchingService snakeMatchingService;
    private final VolcanoAIService volcanoAIService;
    private final EmergencyQaCacheService emergencyQaCacheService;
    private final EmergencyImageAsyncService emergencyImageAsyncService;

    // ==================== Snake name lookup ====================

    /**
     * Look up emergency guide by snake species name.
     * Falls back to AI generation if the species is not in the database.
     *
     * @param refresh if true, force re-download images from Baidu
     */
    @GetMapping("/{snakeName}")
    public Result<SnakeEmergencyInfo> getEmergencyGuideBySnakeName(
            @PathVariable String snakeName,
            @RequestParam(defaultValue = "false") boolean refresh) {
        return processSnakeNameQuery(snakeName, refresh);
    }

    /**
     * Look up detailed snake info (including AI-enhanced scientific name explanation).
     * Same logic as {@link #getEmergencyGuideBySnakeName(String)}; provided under a
     * separate URL for client convenience.
     */
    @GetMapping("/scientific-name/{snakeName}")
    public Result<SnakeEmergencyInfo> getScientificNameInfo(@PathVariable String snakeName) {
        return processSnakeNameQuery(snakeName, false);
    }

    /**
     * Get detailed snake info with validation.
     */
    @GetMapping("/details/{snakeName}")
    public Result<SnakeEmergencyInfo> getDetailedSnakeInfo(@PathVariable String snakeName) {
        if (!snakeMatchingService.validateSnakeName(snakeName)) {
            return Result.fail("Snake species not found");
        }

        SnakeEmergencyInfo emergencyInfo = snakeEmergencyInfoService.getBySnakeName(snakeName);
        if (emergencyInfo != null) {
            emergencyImageAsyncService.updateImageForSnake(emergencyInfo);
            snakeEmergencyInfoService.populateImageUrls(emergencyInfo, imageDir);
            return Result.success(emergencyInfo);
        } else {
            return Result.fail("Snake species not found");
        }
    }

    /**
     * Shared query pipeline for snake-name lookups:
     * <ol>
     *   <li>Query the database</li>
     *   <li>If not found, generate info via AI and persist</li>
     *   <li>Trigger async image download</li>
     *   <li>Populate multi-image URLs from local storage</li>
     * </ol>
     */
    private Result<SnakeEmergencyInfo> processSnakeNameQuery(String snakeName, boolean refresh) {
        try {
            log.info("Processing snake name query: {}", snakeName);

            long startTime = System.currentTimeMillis();
            SnakeEmergencyInfo emergencyInfo = snakeEmergencyInfoService.getBySnakeName(snakeName);
            long dbQueryTime = System.currentTimeMillis() - startTime;
            log.info("DB query took {}ms, result: {}", dbQueryTime,
                    emergencyInfo != null ? "found" : "not found");

            if (emergencyInfo == null) {
                log.info("Not in DB -- generating info via AI for '{}'", snakeName);

                startTime = System.currentTimeMillis();
                String snakeDetails = getSnakeDetailsFromAI(snakeName);
                long aiQueryTime = System.currentTimeMillis() - startTime;
                log.info("AI generation took {}ms, content: {}", aiQueryTime, snakeDetails);

                emergencyInfo = new SnakeEmergencyInfo();
                emergencyInfo.setSnakeName(snakeName);
                emergencyInfo.setDelFlag(0);
                parseSnakeDetailsFromText(snakeDetails, emergencyInfo);

                startTime = System.currentTimeMillis();
                boolean saveResult = snakeEmergencyInfoService.save(emergencyInfo);
                long saveTime = System.currentTimeMillis() - startTime;
                log.info("DB save took {}ms, result: {}", saveTime, saveResult ? "success" : "failure");
            } else {
                log.info("Record already exists in DB for '{}'", snakeName);
            }

            if (refresh) {
                // Synchronous: delete old images, re-fetch from Baidu, then populate
                emergencyImageAsyncService.refreshImageSync(emergencyInfo);
            } else {
                // Async image download (fire-and-forget)
                emergencyImageAsyncService.updateImageForSnake(emergencyInfo);
            }

            // Populate multi-image URLs from local file system
            snakeEmergencyInfoService.populateImageUrls(emergencyInfo, imageDir);

            log.info("Returning result for '{}': {}", snakeName, emergencyInfo);
            return Result.success(emergencyInfo);
        } catch (Exception e) {
            log.error("Error processing snake name query '{}': {}", snakeName, e.getMessage(), e);
            return Result.fail("Error processing request: " + e.getMessage());
        }
    }

    // ==================== List / symptom matching ====================

    /**
     * List all snake emergency guides.
     */
    @GetMapping("/list")
    public Result<List<SnakeEmergencyInfo>> getAllEmergencyGuides() {
        try {
            List<SnakeEmergencyInfo> emergencyInfos = snakeEmergencyInfoService.listAll();

            if (emergencyInfos != null) {
                for (SnakeEmergencyInfo info : emergencyInfos) {
                    emergencyImageAsyncService.updateImageForSnake(info);
                }
            }

            return Result.success(emergencyInfos != null ? emergencyInfos : new ArrayList<>());
        } catch (Exception e) {
            log.error("Error listing emergency guides", e);
            return Result.fail("Error processing request: " + e.getMessage());
        }
    }

    /**
     * Match possible snake species from symptom description.
     */
    @PostMapping("/by-symptoms")
    public Result<List<SnakeEmergencyInfo>> getEmergencyGuidesBySymptoms(@RequestBody String symptoms) {
        try {
            String optimizedSymptoms = optimizeSymptomsDescription(symptoms);
            List<SnakeEmergencyInfo> emergencyInfos = snakeEmergencyInfoService.listAll();

            if (emergencyInfos != null) {
                for (SnakeEmergencyInfo info : emergencyInfos) {
                    emergencyImageAsyncService.updateImageForSnake(info);
                }
            }

            if (emergencyInfos != null && !emergencyInfos.isEmpty()) {
                return Result.success(emergencyInfos);
            } else {
                return Result.fail("No matching emergency info found");
            }
        } catch (Exception e) {
            return Result.fail("Error processing request: " + e.getMessage());
        }
    }

    // ==================== Q&A ====================

    /**
     * Ask an emergency-related question; answers are cached in the database.
     */
    @PostMapping("/ask")
    public Result<String> askEmergencyQuestion(@RequestBody String question) {
        try {
            EmergencyQaCache cachedAnswer = emergencyQaCacheService.getAnswerByQuestion(question);
            if (cachedAnswer != null) {
                return Result.success(cachedAnswer.getAnswer());
            }

            String answer = getAnswerFromAI(question);

            EmergencyQaCache qaCache = new EmergencyQaCache();
            qaCache.setQuestion(question);
            qaCache.setAnswer(answer);
            Date now = new Date();
            qaCache.setCreatedTime(now);
            qaCache.setUpdatedTime(now);
            emergencyQaCacheService.saveQaCache(qaCache);

            return Result.success(answer);
        } catch (Exception e) {
            return Result.fail("Error processing request: " + e.getMessage());
        }
    }

    // ==================== AI helper methods ====================

    /**
     * Ask the AI text model for detailed information about a snake species.
     */
    private String getSnakeDetailsFromAI(String snakeName) {
        try {
            String prompt =
                "【已知蛇种查应急指南】\n" +
                "蛇种名称：" + snakeName + "\n\n" +
                "请严格以 JSON 格式返回，不要输出任何 JSON 之外的文字：\n" +
                "{\n" +
                "  \"snakeAlias\": \"中文通用名\",\n" +
                "  \"latinName\": \"拉丁学名\",\n" +
                "  \"venomType\": \"血液循环毒/神经毒/混合毒/无\",\n" +
                "  \"emergencyTreatment\": \"急救流程（多条用\\n分隔）\",\n" +
                "  \"forbiddenActions\": \"严格禁止的行为（多条用\\n分隔）\",\n" +
                "  \"serumType\": \"对症解毒血清类型\",\n" +
                "  \"hospitalDepartment\": \"建议就医科室\"\n" +
                "}";

            log.debug("Calling AI model for snake details, prompt: {}", prompt);
            String result = volcanoAIService.callTextModel(prompt);
            log.debug("AI model result: {}", result);
            return result;
        } catch (Exception e) {
            log.error("AI call for snake details failed: {}", e.getMessage(), e);
            return "Failed to retrieve details for '" + snakeName + "': " + e.getMessage();
        }
    }

    /**
     * Parse AI JSON output into SnakeEmergencyInfo entity fields.
     */
    private void parseSnakeDetailsFromText(String text, SnakeEmergencyInfo info) {
        if (text == null || text.isEmpty()) {
            info.setSymptomDescription("AI-generated information for '" + info.getSnakeName() + "'");
            return;
        }

        com.fasterxml.jackson.databind.JsonNode json = volcanoAIService.extractJson(text);
        if (json != null) {
            if (json.has("snakeAlias")) info.setSnakeAlias(json.get("snakeAlias").asText());
            if (json.has("latinName")) info.setLatinName(json.get("latinName").asText());
            if (json.has("venomType")) info.setVenomType(json.get("venomType").asText());
            if (json.has("emergencyTreatment")) info.setEmergencyTreatment(json.get("emergencyTreatment").asText());
            if (json.has("forbiddenActions")) info.setForbiddenActions(json.get("forbiddenActions").asText());
            if (json.has("serumType")) info.setSerumType(json.get("serumType").asText());
            if (json.has("hospitalDepartment")) info.setHospitalDepartment(json.get("hospitalDepartment").asText());
        } else {
            // fallback: JSON 解析失败时保存原始文本
            info.setSymptomDescription("AI-generated information for '" + info.getSnakeName() + "':\n" + text);
        }
    }

    /**
     * Optimize a raw symptom description using the AI model for better matching.
     */
    private String optimizeSymptomsDescription(String symptoms) {
        try {
            String prompt =
                "【蛇咬伤症状优化】\n" +
                "请将以下蛇咬伤症状描述进行标准化整理，补充可能的遗漏信息，以便更准确地匹配蛇种和治疗方案：\n" +
                symptoms;
            return volcanoAIService.callTextModel(prompt);
        } catch (Exception e) {
            log.warn("AI symptom optimization failed, returning original description", e);
            return symptoms;
        }
    }

    /**
     * Get an answer from the AI model for an emergency question.
     */
    private String getAnswerFromAI(String question) {
        try {
            String prompt =
                "【自定义提问应急建议】\n" +
                "你是专业蛇伤急救顾问。用户将描述症状、场景或自身情况，请你给出专属的现场应急步骤。\n\n" +
                "请严格按以下格式输出：\n\n" +
                "现场应急步骤（按优先级排列）：\n" +
                "1.\n2.\n3.\n\n" +
                "严格禁忌行为（千万不要做）：\n" +
                "1.\n2.\n3.\n\n" +
                "送医注意事项：\n" +
                "1.\n2.\n3.\n\n" +
                "用户描述：" + question;

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

            return volcanoAIService.safeCallModel(
                    volcanoAIService.getVolcanoConfig().getModels().getText(),
                    messages);
        } catch (Exception e) {
            log.error("AI Q&A failed for question: {}", question, e);
            return "Sorry, unable to get an answer at this time. Please try again later. Error: "
                    + e.getMessage();
        }
    }
}
