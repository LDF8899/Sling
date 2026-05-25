package com.sling.warning.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sling.common.utils.Result;
import com.sling.warning.entity.ActiveArea;
import com.sling.warning.entity.WarningRecord;
import com.sling.warning.service.ActiveAreaService;
import com.sling.warning.service.WarningRecordService;
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
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class WarningController {

    private final ActiveAreaService activeAreaService;

    private final WarningRecordService warningRecordService;

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
                                   @RequestParam(required = false) List<Integer> toxicityIds,
                                   @RequestParam(required = false) String distance,
                                   @RequestParam(required = false) Double userLng,
                                   @RequestParam(required = false) Double userLat) {
        List<ActiveArea> areas = activeAreaService.getActiveAreasByRiskAndToxicity(riskLevels, toxicityIds);

        if (areas.isEmpty()) {
            areas = createMockActiveAreas();
        }

        return Result.success(areas);
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
        List<WarningRecord> warnings = warningRecordService.getRecentWarnings(limit, riskLevel);

        if (warnings.isEmpty()) {
            warnings = createMockRecentWarnings();
        }

        return Result.success(warnings);
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
        ActiveArea area = new ActiveArea();
        area.setAreaName("青龙山区域");
        area.setLevel(3);
        area.setLevelText("高风险");
        area.setCommonSnakes("竹叶青、银环蛇");
        area.setToxicityList("剧毒");
        area.setProtectionSuggestion("建议避免夜间出行，穿着长裤和靴子");
        area.setActiveRecord("近一周内识别到5次剧毒蛇类活动");
        area.setLastUpdate("2025-12-02 10:30");
        area.setSuggestions("建议避免夜间出行，穿着长裤和靴子");
        area.setActivityRecord("近一周内识别到5次剧毒蛇类活动");

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

            String llmPrompt = String.format(
                "请回答以下问题，格式要求：蛇类分布列表（仅列常见种类，不超过5种）、活跃度等级（高/中/低）、安全建议（2-3条）：" +
                "1. 中国%s区域常见的野生蛇类有哪些？" +
                "2. %s该区域的蛇类活跃度如何？（结合季节习性：夏季活跃、冬季冬眠等）" +
                "3. 普通人在该区域活动时，应注意哪些蛇类防护事项？",
                address, season
            );

            String llmResult = callLLM(llmPrompt);

            Map<String, Object> result = new HashMap<>();
            result.put("address", address);
            result.put("season", season);
            result.put("llmResponse", llmResult);

            return Result.success(result);
        } catch (Exception e) {
            log.error("获取实时预警信息失败", e);
            return Result.fail("获取实时预警信息失败: " + e.getMessage());
        }
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
     * [开发专用] 生成模拟风险区域数据
     *
     * <p>当数据库中没有实际数据时，提供占位数据用于前端开发联调。
     * 正式上线前应移除本方法，确保数据来自真实数据库。
     *
     * @return 模拟的风险区域列表
     */
    private List<ActiveArea> createMockActiveAreas() {
        log.debug("数据库无数据，使用开发模拟数据填充风险区域");
        List<ActiveArea> areas = new ArrayList<>();
        ActiveArea area = new ActiveArea();
        area.setId(1L);
        area.setAreaName("青龙山区域");
        area.setLevel(3);
        area.setLevelText("高风险");
        area.setLng(116.403414);
        area.setLat(39.915085);
        area.setCommonSnakes("竹叶青、银环蛇");
        area.setToxicityList("剧毒、剧毒");
        area.setProtectionSuggestion("避免夜间出行，穿着长裤和靴子");
        areas.add(area);
        return areas;
    }

    /**
     * [开发专用] 生成模拟预警记录数据
     *
     * <p>当数据库中没有实际数据时，提供占位数据用于前端开发联调。
     * 正式上线前应移除本方法，确保数据来自真实数据库。
     *
     * @return 模拟的预警记录列表
     */
    private List<WarningRecord> createMockRecentWarnings() {
        log.debug("数据库无数据，使用开发模拟数据填充预警记录");
        List<WarningRecord> warnings = new ArrayList<>();
        WarningRecord warning = new WarningRecord();
        warning.setId(1L);
        warning.setAreaName("青龙山区域");
        warning.setLevel(3);
        warning.setLevelText("高风险");
        warning.setWarningTime("1小时前");
        warning.setWarningContent("发现剧毒蛇类（银环蛇）活动迹象");
        warning.setSnakeNames("竹叶青、银环蛇");
        warning.setToxicityDesc("剧毒");
        warnings.add(warning);
        return warnings;
    }
}
