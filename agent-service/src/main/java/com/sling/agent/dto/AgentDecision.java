package com.sling.agent.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

/**
 * Agent 决策结果 DTO — 推送给指挥中心
 */
@Data
public class AgentDecision implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 关联的 SOS 求助 ID */
    private Long helpId;

    /** 蛇种确认结果 */
    private String snakeName;
    private Integer toxicityLevel;
    private String venomType;

    /** 严重等级：critical / high / medium / low */
    private String severity;

    /** 推荐医院列表 */
    private List<HospitalRecommendation> hospitals;

    /** 急救指导 */
    private String firstAidGuide;

    /** 参考案例 */
    private String referenceCase;

    /** 决策摘要（一句话） */
    private String summary;

    @Data
    public static class HospitalRecommendation implements Serializable {
        private static final long serialVersionUID = 1L;

        private Long hospitalId;
        private String hospitalName;
        private String address;
        private Double latitude;
        private Double longitude;
        private Integer serumAmount;
        private Double distanceKm;
        private Integer etaMinutes;
        private String contactInfo;
    }
}
