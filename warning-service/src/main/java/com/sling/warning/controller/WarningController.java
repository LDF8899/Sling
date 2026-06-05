package com.sling.warning.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sling.common.utils.Result;
import com.sling.warning.entity.ActiveArea;
import com.sling.warning.entity.WarningRecord;
import com.sling.warning.entity.WarningArea;
import com.sling.warning.service.RegionService;
import com.sling.warning.service.WarningAreaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 蛇类预警控制器
 *
 * <p>提供风险区域地图、预警列表、实时预警查询等接口。
 */
@Slf4j
@RestController
@RequestMapping("/api/warning")
@RequiredArgsConstructor
public class WarningController {

    private final WarningAreaService warningAreaService;

    private final RegionService regionService;

    @Value("${api.volcano.key}")
    private String apiKey;

    @Value("${api.volcano.model-id}")
    private String modelId;

    @Value("${api.volcano.base-url}")
    private String apiUrl;

    @Value("${api.gaode.key}")
    private String gaodeApiKey;

    /**
     * 获取风险区域地图数据
     * 对应设计文档中的 GET /api/snake/active-area/map
     *
     * @param riskLevels  风险等级列表（可选）
     * @param toxicityIds 毒性等级列表（可选）
     * @param distance    距离范围（可选）
     * @param userLng     用户经度（可选）
     * @param userLat     用户纬度（可选）
     * @return 风险区域列表
     */
    @GetMapping("/active-area/map")
    public Result getActiveAreaMap(@RequestParam(required = false) List<Integer> riskLevels,
                                   @RequestParam(required = false) List<String> toxicityIds,
                                   @RequestParam(required = false) String distance,
                                   @RequestParam(required = false) Double userLng,
                                   @RequestParam(required = false) Double userLat) {
        // 构建查询条件
        com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<WarningArea> qw =
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<WarningArea>()
                        .orderByDesc("warning_level");

        // 风险等级筛选
        if (riskLevels != null && !riskLevels.isEmpty()) {
            qw.in("warning_level", riskLevels);
        }

        List<WarningArea> dbAreas = warningAreaService.list(qw);

        // 解析距离上限（km）
        double maxDistKm = 0;
        if (distance != null && !distance.isEmpty()) {
            try { maxDistKm = Double.parseDouble(distance); } catch (NumberFormatException ignored) {}
        }

        ObjectMapper om = new ObjectMapper();
        List<ActiveArea> areas = new ArrayList<>();
        for (WarningArea wa : dbAreas) {
            // 毒性筛选：检查 snakeSpecies JSON 中是否包含目标毒性关键词
            if (toxicityIds != null && !toxicityIds.isEmpty()) {
                String species = wa.getSnakeSpecies();
                if (species != null) {
                    boolean match = false;
                    for (String tid : toxicityIds) {
                        if (species.contains(tid)) { match = true; break; }
                    }
                    if (!match) continue;
                }
            }

            double[] center = computeCentroid(wa.getBoundaryCoordinates(), om);

            // 距离筛选：计算用户位置到区域中心的距离
            if (maxDistKm > 0 && userLng != null && userLat != null && center != null) {
                double distKm = haversine(userLng, userLat, center[0], center[1]);
                if (distKm > maxDistKm) continue;
            }

            ActiveArea aa = new ActiveArea();
            aa.setId(wa.getAreaId());
            aa.setAreaName(wa.getAreaName());
            aa.setLevel(wa.getWarningLevel());
            aa.setLevelText(getRiskLevelText(wa.getWarningLevel()));
            aa.setCommonSnakes(parseSnakeSpeciesStr(wa.getSnakeSpecies()));
            aa.setBoundaryCoordinates(wa.getBoundaryCoordinates());
            aa.setDescription(wa.getDescription());
            aa.setLastUpdate(wa.getUpdatedAt() != null ?
                    wa.getUpdatedAt().toString().replace("T", " ").substring(0, 19) :
                    (wa.getCreateTime() != null ? wa.getCreateTime().toString().replace("T", " ").substring(0, 19) : ""));
            if (center != null) {
                aa.setLng(center[0]);
                aa.setLat(center[1]);
            }
            areas.add(aa);
        }

        return Result.success(areas);
    }

    /**
     * Haversine 公式计算两点间距离（km）
     */
    private double haversine(double lng1, double lat1, double lng2, double lat2) {
        double R = 6371.0;
        double dLat = Math.toRadians(lat2 - lat1);
        double dLng = Math.toRadians(lng2 - lng1);
        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                 + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                 * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    /**
     * 获取最近预警列表
     * 对应设计文档中的 GET /api/snake/warning/recent
     *
     * @param limit     返回条数限制
     * @param riskLevel 风险等级筛选（可选）
     * @return 预警记录列表
     */
    @GetMapping("/recent")
    public Result getRecentWarnings(@RequestParam(required = false, defaultValue = "10") Integer limit,
                                    @RequestParam(required = false) Integer riskLevel) {
        // 从 warning_area 读取真实数据，按创建时间倒序
        com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<WarningArea> qw =
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<WarningArea>()
                        .orderByDesc("create_time")
                        .last("LIMIT " + limit);
        if (riskLevel != null) {
            qw.eq("warning_level", riskLevel);
        }
        List<WarningArea> dbAreas = warningAreaService.list(qw);

        List<WarningRecord> warnings = new ArrayList<>();
        for (WarningArea wa : dbAreas) {
            WarningRecord wr = new WarningRecord();
            wr.setId(wa.getAreaId());
            wr.setAreaId(wa.getAreaId());
            wr.setAreaName(wa.getAreaName());
            wr.setLevel(wa.getWarningLevel());
            wr.setLevelText(getRiskLevelText(wa.getWarningLevel()));
            wr.setSnakeNames(parseSnakeSpeciesStr(wa.getSnakeSpecies()));
            wr.setToxicityDesc(parseToxicityList(wa.getSnakeSpecies()));
            wr.setWarningContent(wa.getDescription());
            wr.setWarningTime(wa.getCreateTime() != null ?
                    wa.getCreateTime().toString().replace("T", " ").substring(0, 19) : "未知时间");
            warnings.add(wr);
        }

        return Result.success(warnings);
    }

    /**
     * 就近检测 — 判断用户坐标是否在预警区域内
     *
     * @param lng 用户经度
     * @param lat 用户纬度
     * @return 命中的预警区域列表
     */
    @GetMapping("/check-proximity")
    public Result checkProximity(@RequestParam Double lng, @RequestParam Double lat) {
        List<Map<String, Object>> matched = warningAreaService.checkProximity(lng, lat);
        return Result.success(matched);
    }

    /**
     * 获取风险区域详情
     * 对应设计文档中的 GET /api/snake/active-area/{areaId}
     *
     * @param areaId 区域ID
     * @return 风险区域详情
     */
    @GetMapping("/active-area/detail/{areaId}")
    public Result getActiveAreaDetail(@PathVariable Long areaId) {
        WarningArea wa = warningAreaService.getById(areaId);
        if (wa == null) {
            return Result.fail("区域不存在");
        }

        ObjectMapper om = new ObjectMapper();
        ActiveArea area = new ActiveArea();
        area.setId(wa.getAreaId());
        area.setAreaName(wa.getAreaName());
        area.setLevel(wa.getWarningLevel());
        area.setLevelText(getRiskLevelText(wa.getWarningLevel()));
        area.setCommonSnakes(parseSnakeSpeciesStr(wa.getSnakeSpecies()));
        area.setToxicityList(parseToxicityList(wa.getSnakeSpecies()));
        area.setBoundaryCoordinates(wa.getBoundaryCoordinates());
        area.setDescription(wa.getDescription());
        area.setProtectionSuggestion(wa.getDescription());
        area.setLastUpdate(wa.getUpdatedAt() != null ?
                wa.getUpdatedAt().toString().replace("T", " ").substring(0, 19) :
                (wa.getCreateTime() != null ? wa.getCreateTime().toString().replace("T", " ").substring(0, 19) : ""));

        double[] center = computeCentroid(wa.getBoundaryCoordinates(), om);
        if (center != null) {
            area.setLng(center[0]);
            area.setLat(center[1]);
        }

        return Result.success(area);
    }

    /**
     * 实时蛇类预警查询（2.0版本新增）
     * 根据用户位置和季节信息，通过LLM获取蛇类分布和安全建议
     *
     * @param requestData 包含经纬度、地址、季节等信息的请求体
     * @return 蛇类分布和安全建议
     */
    @PostMapping("/real-time")
    public Result getRealTimeWarning(@RequestBody Map<String, Object> requestData) {
        try {
            Double lng = (Double) requestData.get("lng");
            Double lat = (Double) requestData.get("lat");
            String address = (String) requestData.get("address");
            String season = (String) requestData.get("season");

            if (season == null || season.isEmpty()) {
                season = getCurrentSeason();
            }

            if ((address == null || address.isEmpty()) && lng != null && lat != null) {
                address = getAddressFromCoordinates(lng, lat);
            }

            // Prompt 要求 LLM 返回严格 JSON
            String llmPrompt = String.format(
                "你是一个蛇类风险分析专家。请根据以下条件分析蛇类风险，严格以 JSON 格式返回，不要输出任何 JSON 之外的文字：\n" +
                "地点：%s\n季节：%s\n\n" +
                "请返回如下 JSON 结构：\n" +
                "{\n" +
                "  \"snakes\": [{\"name\": \"蛇名\", \"venomous\": true/false, \"note\": \"简短特征\"}],\n" +
                "  \"activity\": {\"level\": \"高/中/低\", \"reason\": \"原因说明\"},\n" +
                "  \"tips\": [\"防护建议1\", \"防护建议2\", \"防护建议3\"]\n" +
                "}\n" +
                "要求：snakes 不超过5种，tips 2-3条，只返回 JSON。",
                address, season
            );

            String llmResult = callLLM(llmPrompt);

            // 解析 LLM 返回的 JSON
            ObjectMapper om = new ObjectMapper();
            Map<String, Object> result = new HashMap<>();
            result.put("address", address);
            result.put("season", season);

            JsonNode analysis = extractJson(llmResult, om);
            if (analysis != null) {
                result.put("analysis", om.convertValue(analysis, Map.class));
            }
            // 始终保留原始文本作为 fallback
            result.put("llmResponse", llmResult);

            return Result.success(result);
        } catch (Exception e) {
            log.error("获取实时预警信息失败", e);
            return Result.fail("获取实时预警信息失败: " + e.getMessage());
        }
    }

    /**
     * 从 LLM 响应中提取 JSON 对象。
     * 兼容纯 JSON、markdown 包裹的 JSON（```json...```）等格式。
     */
    private JsonNode extractJson(String text, ObjectMapper om) {
        if (text == null || text.isEmpty()) return null;
        try {
            // 先尝试直接解析
            return om.readTree(text.trim());
        } catch (Exception ignored) {}
        // 尝试提取 ```json ... ``` 或 ``` ... ``` 中的 JSON
        try {
            java.util.regex.Matcher m = java.util.regex.Pattern
                    .compile("```(?:json)?\\s*\\n?(\\{.*?\\})\\s*```", java.util.regex.Pattern.DOTALL)
                    .matcher(text);
            if (m.find()) return om.readTree(m.group(1));
        } catch (Exception ignored) {}
        // 尝试提取第一个 { ... } 块
        try {
            int start = text.indexOf('{');
            int end = text.lastIndexOf('}');
            if (start >= 0 && end > start) return om.readTree(text.substring(start, end + 1));
        } catch (Exception ignored) {}
        return null;
    }

    /**
     * 经纬度转地址（通过高德地图API）
     *
     * @param lng 经度
     * @param lat 纬度
     * @return 地址信息
     */
    @GetMapping("/convert-location")
    public Result convertLocation(@RequestParam Double lng, @RequestParam Double lat) {
        try {
            String address = getAddressFromCoordinates(lng, lat);
            Map<String, String> result = new HashMap<>();
            result.put("address", address);
            return Result.success(result);
        } catch (Exception e) {
            log.error("地址转换失败", e);
            return Result.fail("地址转换失败: " + e.getMessage());
        }
    }

    /**
     * 获取区域树（供用户端选择地区）
     */
    @GetMapping("/region-tree")
    public Result getRegionTree() {
        return Result.success(regionService.getRegionTree());
    }

    /**
     * 按区域查询预警信息（供用户端查看某地区的预警）
     *
     * @param regionId 区域ID（具体区域）
     * @return 该区域下的所有预警区域
     */
    @GetMapping("/by-region")
    public Result getWarningByRegion(@RequestParam Long regionId) {
        List<WarningArea> areas = warningAreaService.list(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<WarningArea>()
                        .eq("region_id", regionId)
                        .orderByDesc("warning_level"));
        return Result.success(areas);
    }

    /**
     * 获取当前季节
     *
     * @return 季节名称（春季/夏季/秋季/冬季）
     */
    private String getCurrentSeason() {
        Month month = LocalDate.now().getMonth();
        if (month.getValue() >= 3 && month.getValue() <= 5) {
            return "春季";
        } else if (month.getValue() >= 6 && month.getValue() <= 8) {
            return "夏季";
        } else if (month.getValue() >= 9 && month.getValue() <= 11) {
            return "秋季";
        } else {
            return "冬季";
        }
    }

    /**
     * 通过高德地图 API 将经纬度转换为地址
     *
     * @param lng 经度
     * @param lat 纬度
     * @return 格式化后的地址字符串
     * @throws Exception 请求或解析失败时抛出
     */
    private String getAddressFromCoordinates(Double lng, Double lat) throws Exception {
        String url = String.format(
            "https://restapi.amap.com/v3/geocode/regeo?key=%s&location=%s,%s&radius=1000&extensions=base",
            gaodeApiKey, lng, lat
        );

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        if (response == null || response.isEmpty()) {
            return "未知地址";
        }

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode rootNode = objectMapper.readTree(response);

        String status = rootNode.path("status").asText();
        if (!"1".equals(status)) {
            String info = rootNode.path("info").asText("地址解析失败");
            return info;
        }

        JsonNode regeocodeNode = rootNode.path("regeocode");
        if (regeocodeNode.isMissingNode()) {
            return "未知地址";
        }

        String formattedAddress = regeocodeNode.path("formatted_address").asText("未知地址");

        if (formattedAddress == null || formattedAddress.isEmpty() || "未知地址".equals(formattedAddress)) {
            JsonNode addressComponent = regeocodeNode.path("addressComponent");
            if (!addressComponent.isMissingNode()) {
                String province = addressComponent.path("province").asText("");
                String city = addressComponent.path("city").asText("");
                String district = addressComponent.path("district").asText("");
                String street = addressComponent.path("street").asText("");
                String streetNumber = addressComponent.path("streetNumber").asText("");

                StringBuilder addressBuilder = new StringBuilder();
                if (!province.isEmpty()) addressBuilder.append(province);
                if (!city.isEmpty()) addressBuilder.append(city);
                if (!district.isEmpty()) addressBuilder.append(district);
                if (!street.isEmpty()) addressBuilder.append(street);
                if (!streetNumber.isEmpty()) addressBuilder.append(streetNumber);

                return addressBuilder.length() > 0 ? addressBuilder.toString() : "未知地址";
            }
        }

        return formattedAddress;
    }

    /**
     * 调用LLM接口
     *
     * @param prompt 查询指令
     * @return LLM 响应内容
     * @throws Exception 调用失败时抛出
     */
    private String callLLM(String prompt) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + apiKey);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", modelId);
        requestBody.put("max_completion_tokens", 2000);

        List<Map<String, Object>> messages = new ArrayList<>();
        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);
        messages.add(userMessage);
        requestBody.put("messages", messages);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.postForEntity(
            apiUrl,
            requestEntity,
            Map.class
        );

        Map<String, Object> responseBody = response.getBody();
        if (responseBody != null && responseBody.containsKey("choices")) {
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseBody.get("choices");
            if (!choices.isEmpty()) {
                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                return (String) message.get("content");
            }
        }

        log.warn("LLM 响应中未包含有效的 choices 数据");
        return "未能获取到有效的LLM响应";
    }

    /**
     * 从 GeoJSON Polygon 计算中心点坐标 [lng, lat]
     */
    private double[] computeCentroid(String boundaryCoordinates, ObjectMapper om) {
        if (boundaryCoordinates == null || boundaryCoordinates.isEmpty()) return null;
        try {
            JsonNode root = om.readTree(boundaryCoordinates);
            JsonNode coords = root.path("coordinates");
            if (coords.isMissingNode() || !coords.isArray() || coords.isEmpty()) return null;
            JsonNode ring = coords.get(0);
            if (ring == null || !ring.isArray() || ring.size() < 3) return null;
            double sumLng = 0, sumLat = 0;
            for (JsonNode p : ring) {
                sumLng += p.get(0).asDouble();
                sumLat += p.get(1).asDouble();
            }
            return new double[]{ sumLng / ring.size(), sumLat / ring.size() };
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * 风险等级 → 中文文本
     */
    private String getRiskLevelText(Integer level) {
        if (level == null) return "未知风险";
        switch (level) {
            case 1: return "低风险";
            case 2: return "中风险";
            case 3: return "高风险";
            default: return "未知风险";
        }
    }

    /**
     * 解析 snakeSpecies JSON 为可读字符串
     * 格式: "[{\"name\":\"银环蛇\"},{\"name\":\"眼镜蛇\"}]" → "银环蛇、眼镜蛇"
     * 或纯字符串 "银环蛇" → "银环蛇"
     */
    private String parseSnakeSpeciesStr(String snakeSpecies) {
        if (snakeSpecies == null || snakeSpecies.isEmpty()) return "暂无";
        try {
            JsonNode arr = new ObjectMapper().readTree(snakeSpecies);
            if (arr.isArray()) {
                StringBuilder sb = new StringBuilder();
                for (JsonNode node : arr) {
                    if (sb.length() > 0) sb.append("、");
                    if (node.isObject()) {
                        sb.append(node.path("name").asText(node.toString()));
                    } else {
                        sb.append(node.asText());
                    }
                }
                return sb.length() > 0 ? sb.toString() : "暂无";
            }
        } catch (Exception ignored) {}
        return snakeSpecies;
    }

    /**
     * 从 snakeSpecies JSON 提取毒性描述
     */
    private String parseToxicityList(String snakeSpecies) {
        if (snakeSpecies == null || snakeSpecies.isEmpty()) return "暂无";
        try {
            JsonNode arr = new ObjectMapper().readTree(snakeSpecies);
            if (arr.isArray()) {
                StringBuilder sb = new StringBuilder();
                for (JsonNode node : arr) {
                    if (node.isObject() && node.has("toxicity")) {
                        if (sb.length() > 0) sb.append("、");
                        sb.append(node.path("toxicity").asText());
                    }
                }
                return sb.length() > 0 ? sb.toString() : "暂无数据";
            }
        } catch (Exception ignored) {}
        return "暂无数据";
    }
}
