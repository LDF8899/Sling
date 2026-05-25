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
import java.util.regex.Pattern;
import java.util.regex.Matcher;

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
     */
    @GetMapping("/{snakeName}")
    public Result<SnakeEmergencyInfo> getEmergencyGuideBySnakeName(@PathVariable String snakeName) {
        return processSnakeNameQuery(snakeName);
    }

    /**
     * Look up detailed snake info (including AI-enhanced scientific name explanation).
     * Same logic as {@link #getEmergencyGuideBySnakeName(String)}; provided under a
     * separate URL for client convenience.
     */
    @GetMapping("/scientific-name/{snakeName}")
    public Result<SnakeEmergencyInfo> getScientificNameInfo(@PathVariable String snakeName) {
        return processSnakeNameQuery(snakeName);
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
    private Result<SnakeEmergencyInfo> processSnakeNameQuery(String snakeName) {
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

            // Async image download (fire-and-forget)
            emergencyImageAsyncService.updateImageForSnake(emergencyInfo);

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
                "请严格按以下格式输出该蛇种的完整应急信息：\n\n" +
                "中文通用名 + 拉丁学名：\n" +
                "毒性等级：剧毒 / 无毒 / 微毒\n" +
                "毒液类型：血液循环毒 / 神经毒 / 混合毒 / 无\n\n" +
                "专属急救流程：\n" +
                "1.\n2.\n3.\n\n" +
                "严格禁止的行为：\n" +
                "1.\n2.\n3.\n\n" +
                "对症解毒血清类型：\n" +
                "建议就医科室：";

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
     * Parse AI text output into SnakeEmergencyInfo entity fields.
     */
    private void parseSnakeDetailsFromText(String text, SnakeEmergencyInfo info) {
        if (text == null || text.isEmpty()) {
            info.setSymptomDescription("AI-generated information for '" + info.getSnakeName() + "'");
            return;
        }

        // Parse 中文通用名 + 拉丁学名
        Pattern namePattern = Pattern.compile("中文通用名\\s*[+]\\s*拉丁学名[：:]*\\s*([^\\n]+)");
        Matcher nameMatcher = namePattern.matcher(text);
        if (nameMatcher.find()) {
            String names = nameMatcher.group(1).trim();
            if (names.contains("/")) {
                String[] parts = names.split("/");
                info.setSnakeAlias(parts[0].trim());
                info.setLatinName(parts[1].trim());
            } else {
                info.setSnakeAlias(names);
            }
        }

        // Parse 毒液类型
        Pattern typePattern = Pattern.compile("毒液类型[：:]*\\s*([^\\n]+)");
        Matcher typeMatcher = typePattern.matcher(text);
        if (typeMatcher.find()) {
            info.setVenomType(typeMatcher.group(1).trim());
        }

        // Parse 专属急救流程
        Pattern treatmentPattern = Pattern.compile("专属急救流程[：:]*\\s*[\\n]?([\\s\\S]*?)(?=严格禁止的行为|对症解毒血清|建议就医科室|$)");
        Matcher treatmentMatcher = treatmentPattern.matcher(text);
        if (treatmentMatcher.find()) {
            info.setEmergencyTreatment(treatmentMatcher.group(1).trim());
        }

        // Parse 严格禁止的行为
        Pattern forbidPattern = Pattern.compile("严格禁止的行为[：:]*\\s*[\\n]?([\\s\\S]*?)(?=对症解毒血清|建议就医科室|$)");
        Matcher forbidMatcher = forbidPattern.matcher(text);
        if (forbidMatcher.find()) {
            info.setForbiddenActions(forbidMatcher.group(1).trim());
        }

        // Parse 对症解毒血清
        Pattern serumPattern = Pattern.compile("对症解毒血清类型[：:]*\\s*([^\\n]+)");
        Matcher serumMatcher = serumPattern.matcher(text);
        if (serumMatcher.find()) {
            info.setSerumType(serumMatcher.group(1).trim());
        }

        // Parse 建议就医科室
        Pattern deptPattern = Pattern.compile("建议就医科室[：:]*\\s*([^\\n]+)");
        Matcher deptMatcher = deptPattern.matcher(text);
        if (deptMatcher.find()) {
            info.setHospitalDepartment(deptMatcher.group(1).trim());
        }

        // If no structured fields found, store raw text as symptom description
        if (info.getEmergencyTreatment() == null && info.getSerumType() == null) {
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
