package com.sling.agent.service;

import com.sling.agent.dto.AgentDecision;
import com.sling.agent.dto.SosEvent;
import com.sling.agent.feign.EmergencyFeignClient;
import com.sling.agent.feign.HospitalFeignClient;
import com.sling.agent.feign.SnakeInfoFeignClient;
import com.sling.common.utils.Result;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.geo.Point;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 调度服务 — 医院推荐 + 严重等级判断
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class DispatchService {

    private final HospitalFeignClient hospitalFeignClient;
    private final SnakeInfoFeignClient snakeInfoFeignClient;
    private final EmergencyFeignClient emergencyFeignClient;
    private final RedisTemplate<String, Object> redisTemplate;

    /**
     * 根据 SOS 事件生成 Agent 决策
     */
    public AgentDecision makeDecision(SosEvent event) {
        AgentDecision decision = new AgentDecision();
        decision.setHelpId(event.getHelpId());
        decision.setSnakeName(event.getSnakeName());
        decision.setToxicityLevel(event.getToxicityLevel());

        // 1. 判断严重等级
        decision.setSeverity(calculateSeverity(event));

        // 2. 查询蛇种信息（补全 venomType）
        enrichSnakeInfo(decision, event);

        // 3. 查询推荐医院
        List<AgentDecision.HospitalRecommendation> hospitals = findHospitals(event);
        decision.setHospitals(hospitals);

        // 4. 获取急救指南
        enrichFirstAidGuide(decision, event);

        // 5. 生成摘要
        decision.setSummary(buildSummary(decision, event));

        log.info("Agent 决策完成: helpId={}, severity={}, hospitals={}",
                event.getHelpId(), decision.getSeverity(), hospitals.size());
        return decision;
    }

    /**
     * 严重等级判断
     */
    private String calculateSeverity(SosEvent event) {
        if (event.getToxicityLevel() != null) {
            return switch (event.getToxicityLevel()) {
                case 3 -> "critical";   // 剧毒
                case 2 -> "high";       // 有毒
                case 1 -> "medium";     // 低毒
                default -> "low";       // 无毒
            };
        }
        // 默认按蛇咬伤处理
        return "snake_bite".equals(event.getType()) ? "high" : "medium";
    }

    /**
     * 补全蛇种信息
     */
    private void enrichSnakeInfo(AgentDecision decision, SosEvent event) {
        try {
            if (event.getSnakeName() != null) {
                Result<Map<String, Object>> result = snakeInfoFeignClient.getSnakeByName(event.getSnakeName());
                if (result != null && result.getCode() == 200 && result.getData() != null) {
                    Map<String, Object> snake = result.getData();
                    Object venomType = snake.get("venomType");
                    if (venomType != null) {
                        decision.setVenomType(venomType.toString());
                    }
                }
            }
        } catch (Exception e) {
            log.warn("查询蛇种信息失败: {}", e.getMessage());
        }
    }

    /**
     * 查找附近有血清的医院 — 优先使用 Redis GEO 空间查询
     */
    private List<AgentDecision.HospitalRecommendation> findHospitals(SosEvent event) {
        List<AgentDecision.HospitalRecommendation> result = new ArrayList<>();

        try {
            if (event.getSnakeId() == null) return result;

            // 有坐标时用 Redis GEO 查询（毫秒级响应）
            if (event.getLongitude() != null && event.getLatitude() != null) {
                Result<List<Map<String, Object>>> geoResult = hospitalFeignClient.findNearbyWithSerum(
                        event.getLongitude(), event.getLatitude(),
                        event.getSnakeId(), 50.0, 3);

                if (geoResult != null && geoResult.getCode() == 200 && geoResult.getData() != null) {
                    result = geoResult.getData().stream()
                            .map(this::mapToHospital)
                            .collect(Collectors.toList());
                    log.info("GEO 查询找到 {} 家附近有血清的医院", result.size());
                    return result;
                }
            }

            // 降级：查询所有有血清的医院（无距离排序）
            Result<List<Map<String, Object>>> hospitalsResult =
                    hospitalFeignClient.getHospitalsWithSerum(event.getSnakeId());

            if (hospitalsResult != null && hospitalsResult.getCode() == 200
                    && hospitalsResult.getData() != null) {
                result = hospitalsResult.getData().stream()
                        .map(this::mapToHospital)
                        .sorted(Comparator.comparingDouble(AgentDecision.HospitalRecommendation::getDistanceKm))
                        .limit(3)
                        .collect(Collectors.toList());
            }
        } catch (Exception e) {
            log.warn("查询医院列表失败: {}", e.getMessage());
        }

        return result;
    }

    @SuppressWarnings("unchecked")
    private AgentDecision.HospitalRecommendation mapToHospital(Map<String, Object> h) {
        AgentDecision.HospitalRecommendation rec = new AgentDecision.HospitalRecommendation();
        rec.setHospitalId(toLong(h.get("hospitalId")));
        rec.setHospitalName((String) h.get("hospitalName"));
        rec.setAddress((String) h.get("address"));
        rec.setLatitude(toDouble(h.get("latitude")));
        rec.setLongitude(toDouble(h.get("longitude")));
        rec.setSerumAmount(toInt(h.get("serumAmount")));
        rec.setContactInfo((String) h.get("contactInfo"));
        // 距离和 ETA 需要根据用户位置计算，这里给默认值
        rec.setDistanceKm(0.0);
        rec.setEtaMinutes(0);
        return rec;
    }

    /**
     * 补全急救指南
     */
    private void enrichFirstAidGuide(AgentDecision decision, SosEvent event) {
        try {
            if (event.getSnakeName() != null) {
                Result<Map<String, Object>> result = emergencyFeignClient.getSnakeGuide(event.getSnakeName());
                if (result != null && result.getCode() == 200 && result.getData() != null) {
                    Object treatment = result.getData().get("emergencyTreatment");
                    if (treatment != null) {
                        decision.setFirstAidGuide(treatment.toString());
                    }
                }
            }
        } catch (Exception e) {
            log.warn("查询急救指南失败: {}", e.getMessage());
        }
    }

    private String buildSummary(AgentDecision decision, SosEvent event) {
        StringBuilder sb = new StringBuilder();
        sb.append("蛇种：").append(event.getSnakeName() != null ? event.getSnakeName() : "待确认");
        sb.append("（").append(severityLabel(decision.getSeverity())).append("）");

        if (decision.getHospitals() != null && !decision.getHospitals().isEmpty()) {
            AgentDecision.HospitalRecommendation top = decision.getHospitals().get(0);
            sb.append("，推荐 ").append(top.getHospitalName());
            if (top.getSerumAmount() != null && top.getSerumAmount() > 0) {
                sb.append("（血清 ").append(top.getSerumAmount()).append(" 支）");
            }
        }
        return sb.toString();
    }

    private String severityLabel(String severity) {
        return switch (severity) {
            case "critical" -> "致命级";
            case "high" -> "高危";
            case "medium" -> "中等";
            default -> "低风险";
        };
    }

    private Long toLong(Object v) {
        if (v instanceof Number) return ((Number) v).longValue();
        try { return Long.parseLong(v.toString()); } catch (Exception e) { return null; }
    }

    private Double toDouble(Object v) {
        if (v instanceof Number) return ((Number) v).doubleValue();
        try { return Double.parseDouble(v.toString()); } catch (Exception e) { return null; }
    }

    private Integer toInt(Object v) {
        if (v instanceof Number) return ((Number) v).intValue();
        try { return Integer.parseInt(v.toString()); } catch (Exception e) { return null; }
    }
}
