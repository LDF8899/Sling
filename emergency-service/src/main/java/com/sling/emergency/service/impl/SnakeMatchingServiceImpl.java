package com.sling.emergency.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sling.emergency.entity.SnakeEmergencyInfo;
import com.sling.emergency.mapper.SnakeEmergencyInfoMapper;
import com.sling.emergency.service.SnakeMatchingService;
import com.sling.emergency.service.VolcanoAIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Implementation of {@link SnakeMatchingService} using AI-driven matching and database lookup.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SnakeMatchingServiceImpl implements SnakeMatchingService {

    private final SnakeEmergencyInfoMapper snakeEmergencyInfoMapper;
    private final VolcanoAIService volcanoAIService;

    @Override
    public List<SnakeEmergencyInfo> matchSnakesBySymptoms(String symptoms) {
        QueryWrapper<SnakeEmergencyInfo> queryWrapper = new QueryWrapper<>();
        return snakeEmergencyInfoMapper.selectList(queryWrapper);
    }

    @Override
    public boolean validateSnakeName(String snakeName) {
        QueryWrapper<SnakeEmergencyInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("snake_name", snakeName);
        return snakeEmergencyInfoMapper.selectCount(queryWrapper) > 0;
    }

    /**
     * Intelligently match snake species from symptom descriptions using the AI model.
     *
     * @param symptoms the AI-analyzed symptom description
     * @return list of matching snake species
     */
    @Override
    public List<SnakeEmergencyInfo> intelligentMatch(String symptoms) {
        try {
            String prompt = "Based on the following snake-bite symptom description: " + symptoms
                    + ", identify the 2-3 most likely snake species from the list below:\n"
                    + getAllSnakesInfo()
                    + "严格以 JSON 格式返回，不要输出任何 JSON 之外的文字：\n"
                    + "{\"names\": [\"蛇名1\", \"蛇名2\"]}";

            String llmResult = volcanoAIService.callTextModel(prompt);

            List<SnakeEmergencyInfo> matchedSnakes = new ArrayList<>();
            com.fasterxml.jackson.databind.JsonNode json = volcanoAIService.extractJson(llmResult);
            if (json != null && json.has("names")) {
                for (com.fasterxml.jackson.databind.JsonNode nameNode : json.get("names")) {
                    SnakeEmergencyInfo snakeInfo = getSnakeInfoByName(nameNode.asText().trim());
                    if (snakeInfo != null) {
                        matchedSnakes.add(snakeInfo);
                    }
                }
            } else if (llmResult != null && !llmResult.isEmpty()) {
                // fallback: 逗号分隔
                for (String snakeName : llmResult.split(",")) {
                    SnakeEmergencyInfo snakeInfo = getSnakeInfoByName(snakeName.trim());
                    if (snakeInfo != null) {
                        matchedSnakes.add(snakeInfo);
                    }
                }
            }

            if (matchedSnakes.isEmpty()) {
                log.warn("AI matching returned no results, falling back to full list");
                return snakeEmergencyInfoMapper.selectList(null);
            }

            return matchedSnakes;
        } catch (Exception e) {
            log.error("AI intelligent matching failed, falling back to full list", e);
            return snakeEmergencyInfoMapper.selectList(null);
        }
    }

    /**
     * Build a summary string of all snake species for the AI prompt.
     */
    private String getAllSnakesInfo() {
        List<SnakeEmergencyInfo> allSnakes = snakeEmergencyInfoMapper.selectList(null);
        StringBuilder sb = new StringBuilder();
        for (SnakeEmergencyInfo snake : allSnakes) {
            sb.append("Species: ").append(snake.getSnakeName())
                    .append(", Venom type: ").append(snake.getVenomType())
                    .append(", Symptoms: ").append(snake.getSymptomDescription())
                    .append("\n");
        }
        return sb.toString();
    }

    /**
     * Find a snake info record by exact species name.
     */
    private SnakeEmergencyInfo getSnakeInfoByName(String snakeName) {
        QueryWrapper<SnakeEmergencyInfo> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("snake_name", snakeName);
        return snakeEmergencyInfoMapper.selectOne(queryWrapper);
    }
}
