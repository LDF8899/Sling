package com.sling.recognition.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

/**
 * 识别结果 VO - 包含完整的识别信息、蛇类信息、急救信息、医院列表
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RecognitionVO {

    /**
     * AI 返回的原始 markdown 文本
     */
    private String aiResult;

    /**
     * 识别记录ID
     */
    private Long recordId;

    /**
     * 识别出的蛇名
     */
    private String snakeName;

    /**
     * 蛇类信息
     */
    private Map<String, Object> snakeInfo;

    /**
     * 急救信息
     */
    private Map<String, Object> emergencyInfo;

    /**
     * 有血清的医院列表
     */
    private List<Map<String, Object>> hospitals;
}
