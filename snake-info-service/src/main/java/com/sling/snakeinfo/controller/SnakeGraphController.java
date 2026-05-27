package com.sling.snakeinfo.controller;

import com.sling.common.redis.RedisService;
import com.sling.common.utils.Result;
import com.sling.snakeinfo.entity.SnakeInfo;
import com.sling.snakeinfo.service.SnakeInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

/**
 * 蛇类知识图谱接口 — 渐进式展开：概览 → 按科展开
 */
@RestController
@RequestMapping("/snake/graph")
@RequiredArgsConstructor
public class SnakeGraphController {

    private final SnakeInfoService snakeInfoService;
    private final RedisService redisService;

    private static final Map<String, String> TOXIN_SYMPTOMS = Map.of(
            "神经毒素", "眼睑下垂、吞咽困难、呼吸肌麻痹、呼吸衰竭",
            "血液毒素", "伤口剧痛肿胀、凝血障碍、广泛性出血、DIC",
            "细胞毒素", "组织坏死、皮肤溃烂、角膜溃疡、心肌损害",
            "混合毒素", "多系统损害、呼吸抑制、凝血崩溃、组织坏死"
    );

    private static final Map<String, String> TOXIN_SERUM = Map.of(
            "神经毒素", "抗银环蛇/抗眼镜蛇蛇毒血清",
            "血液毒素", "抗蝮蛇/抗五步蛇蛇毒血清",
            "细胞毒素", "抗眼镜蛇蛇毒血清",
            "混合毒素", "多价抗蛇毒血清"
    );

    /**
     * 概览 — 只返回顶层分类节点（科/毒素/危险/症状/血清），不含蛇种
     * 用于图谱默认视图
     */
    @GetMapping("/overview")
    public Result<Map<String, Object>> getOverview() {
        List<SnakeInfo> snakes = snakeInfoService.list();
        if (snakes.isEmpty()) {
            return Result.success(Map.of("nodes", List.of(), "edges", List.of()));
        }

        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> edges = new ArrayList<>();
        Set<String> addedFamilies = new HashSet<>();
        Set<String> addedToxins = new HashSet<>();
        Set<String> addedDangers = new HashSet<>();
        Set<String> addedSymptoms = new HashSet<>();
        Set<String> addedSerums = new HashSet<>();

        // 统计每个科的蛇种数量
        Map<String, Long> familyCounts = snakes.stream()
                .filter(s -> s.getFamily() != null && !s.getFamily().isEmpty())
                .collect(Collectors.groupingBy(SnakeInfo::getFamily, Collectors.counting()));

        for (SnakeInfo snake : snakes) {
            // 科节点
            if (snake.getFamily() != null && !snake.getFamily().isEmpty()) {
                if (addedFamilies.add(snake.getFamily())) {
                    nodes.add(Map.of(
                            "data", Map.of(
                                    "id", "family:" + snake.getFamily(),
                                    "label", snake.getFamily(),
                                    "type", "family",
                                    "count", familyCounts.getOrDefault(snake.getFamily(), 0L)
                            )
                    ));
                }
            }

            // 毒素类型节点
            if (snake.getToxinType() != null && !"无毒".equals(snake.getToxinType()) && !snake.getToxinType().isEmpty()) {
                String toxinId = "toxin:" + snake.getToxinType();
                if (addedToxins.add(snake.getToxinType())) {
                    nodes.add(Map.of(
                            "data", Map.of("id", toxinId, "label", snake.getToxinType(), "type", "toxin")
                    ));
                    // 症状
                    String symptomText = TOXIN_SYMPTOMS.getOrDefault(snake.getToxinType(), "");
                    if (!symptomText.isEmpty() && addedSymptoms.add(snake.getToxinType())) {
                        String symptomId = "symptom:" + snake.getToxinType();
                        nodes.add(Map.of(
                                "data", Map.of("id", symptomId, "label", symptomText, "type", "symptom")
                        ));
                        edges.add(Map.of(
                                "data", Map.of("id", toxinId + "->" + symptomId, "source", toxinId, "target", symptomId, "label", "导致")
                        ));
                    }
                    // 血清
                    String serumText = TOXIN_SERUM.getOrDefault(snake.getToxinType(), "");
                    if (!serumText.isEmpty() && addedSerums.add(snake.getToxinType())) {
                        String serumId = "serum:" + snake.getToxinType();
                        nodes.add(Map.of(
                                "data", Map.of("id", serumId, "label", serumText, "type", "serum")
                        ));
                        edges.add(Map.of(
                                "data", Map.of("id", toxinId + "->" + serumId, "source", toxinId, "target", serumId, "label", "中和")
                        ));
                    }
                }
            }

            // 危险等级节点
            if (snake.getDangerLevel() != null && !snake.getDangerLevel().isEmpty()) {
                String dangerId = "danger:" + snake.getDangerLevel();
                if (addedDangers.add(snake.getDangerLevel())) {
                    nodes.add(Map.of(
                            "data", Map.of("id", dangerId, "label", snake.getDangerLevel() + "危险", "type", "danger")
                    ));
                }
            }
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("nodes", nodes);
        result.put("edges", edges);
        result.put("stats", Map.of(
                "totalNodes", nodes.size(),
                "totalEdges", edges.size(),
                "familyCount", addedFamilies.size(),
                "snakeCount", snakes.size()
        ));
        return Result.success(result);
    }

    /**
     * 按科展开 — 返回某个科内的完整子图（蛇种 + 毒素/危险/症状/血清）
     */
    @GetMapping("/family/{familyName}")
    public Result<Map<String, Object>> getFamilyGraph(@PathVariable String familyName) {
        List<SnakeInfo> allSnakes = snakeInfoService.list();
        List<SnakeInfo> familySnakes = allSnakes.stream()
                .filter(s -> familyName.equals(s.getFamily()))
                .collect(Collectors.toList());

        if (familySnakes.isEmpty()) {
            return Result.success(Map.of("nodes", List.of(), "edges", List.of()));
        }

        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> edges = new ArrayList<>();
        Set<String> addedToxins = new HashSet<>();
        Set<String> addedDangers = new HashSet<>();
        Set<String> addedSymptoms = new HashSet<>();
        Set<String> addedSerums = new HashSet<>();

        // 科节点
        nodes.add(Map.of(
                "data", Map.of(
                        "id", "family:" + familyName,
                        "label", familyName,
                        "type", "family",
                        "count", familySnakes.size()
                )
        ));

        for (SnakeInfo snake : familySnakes) {
            String snakeId = "snake:" + snake.getSnakeId();

            nodes.add(Map.of(
                    "data", Map.of(
                            "id", snakeId,
                            "label", snake.getSnakeName(),
                            "type", "snake",
                            "family", snake.getFamily() != null ? snake.getFamily() : "",
                            "toxin", snake.getToxinType() != null ? snake.getToxinType() : "",
                            "danger", snake.getDangerLevel() != null ? snake.getDangerLevel() : "",
                            "latin", snake.getLatinName() != null ? snake.getLatinName() : "",
                            "parent", "family:" + familyName
                    )
            ));

            // 蛇种 → 科
            edges.add(Map.of(
                    "data", Map.of("id", snakeId + "->family:" + familyName,
                            "source", snakeId, "target", "family:" + familyName, "label", "属于")
            ));

            // 毒素类型
            if (snake.getToxinType() != null && !"无毒".equals(snake.getToxinType()) && !snake.getToxinType().isEmpty()) {
                String toxinId = "toxin:" + snake.getToxinType();
                if (addedToxins.add(snake.getToxinType())) {
                    nodes.add(Map.of(
                            "data", Map.of("id", toxinId, "label", snake.getToxinType(), "type", "toxin")
                    ));
                    // 症状
                    String st = TOXIN_SYMPTOMS.getOrDefault(snake.getToxinType(), "");
                    if (!st.isEmpty() && addedSymptoms.add(snake.getToxinType())) {
                        String symptomId = "symptom:" + snake.getToxinType();
                        nodes.add(Map.of("data", Map.of("id", symptomId, "label", st, "type", "symptom")));
                        edges.add(Map.of("data", Map.of("id", toxinId + "->" + symptomId, "source", toxinId, "target", symptomId, "label", "导致")));
                    }
                    // 血清
                    String sr = TOXIN_SERUM.getOrDefault(snake.getToxinType(), "");
                    if (!sr.isEmpty() && addedSerums.add(snake.getToxinType())) {
                        String serumId = "serum:" + snake.getToxinType();
                        nodes.add(Map.of("data", Map.of("id", serumId, "label", sr, "type", "serum")));
                        edges.add(Map.of("data", Map.of("id", toxinId + "->" + serumId, "source", toxinId, "target", serumId, "label", "中和")));
                    }
                }
                edges.add(Map.of(
                        "data", Map.of("id", snakeId + "->" + toxinId, "source", snakeId, "target", toxinId, "label", "分泌")
                ));
            }

            // 危险等级
            if (snake.getDangerLevel() != null && !snake.getDangerLevel().isEmpty()) {
                String dangerId = "danger:" + snake.getDangerLevel();
                if (addedDangers.add(snake.getDangerLevel())) {
                    nodes.add(Map.of(
                            "data", Map.of("id", dangerId, "label", snake.getDangerLevel() + "危险", "type", "danger")
                    ));
                }
                edges.add(Map.of(
                        "data", Map.of("id", snakeId + "->" + dangerId, "source", snakeId, "target", dangerId, "label", "危险等级")
                ));
            }
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("nodes", nodes);
        result.put("edges", edges);
        result.put("stats", Map.of(
                "totalNodes", nodes.size(),
                "totalEdges", edges.size(),
                "snakeCount", familySnakes.size(),
                "familyName", familyName
        ));
        return Result.success(result);
    }

    /**
     * 全量图谱 — 包含所有蛇种并设置 parent 为科节点，用于前端复合节点折叠
     */
    @GetMapping("/full")
    public Result<Map<String, Object>> getFullGraph() {
        List<SnakeInfo> snakes = snakeInfoService.list();
        if (snakes.isEmpty()) {
            return Result.success(Map.of("nodes", List.of(), "edges", List.of()));
        }

        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> edges = new ArrayList<>();
        Set<String> addedFamilies = new HashSet<>();
        Set<String> addedToxins = new HashSet<>();
        Set<String> addedDangers = new HashSet<>();
        Set<String> addedSymptoms = new HashSet<>();
        Set<String> addedSerums = new HashSet<>();

        Map<String, Long> familyCounts = snakes.stream()
                .filter(s -> s.getFamily() != null && !s.getFamily().isEmpty())
                .collect(Collectors.groupingBy(SnakeInfo::getFamily, Collectors.counting()));

        for (SnakeInfo snake : snakes) {
            String snakeId = "snake:" + snake.getSnakeId();
            String parentId = snake.getFamily() != null && !snake.getFamily().isEmpty()
                    ? "family:" + snake.getFamily() : null;

            Map<String, Object> snakeData = new LinkedHashMap<>();
            snakeData.put("id", snakeId);
            snakeData.put("label", snake.getSnakeName());
            snakeData.put("type", "snake");
            snakeData.put("family", snake.getFamily() != null ? snake.getFamily() : "");
            snakeData.put("toxin", snake.getToxinType() != null ? snake.getToxinType() : "");
            snakeData.put("danger", snake.getDangerLevel() != null ? snake.getDangerLevel() : "");
            snakeData.put("latin", snake.getLatinName() != null ? snake.getLatinName() : "");
            if (parentId != null) {
                snakeData.put("parent", parentId);
            }
            nodes.add(Map.of("data", snakeData));

            // 科节点
            if (snake.getFamily() != null && !snake.getFamily().isEmpty()) {
                if (addedFamilies.add(snake.getFamily())) {
                    nodes.add(Map.of(
                            "data", Map.of(
                                    "id", "family:" + snake.getFamily(),
                                    "label", snake.getFamily(),
                                    "type", "family",
                                    "count", familyCounts.getOrDefault(snake.getFamily(), 0L)
                            )
                    ));
                }
                edges.add(Map.of(
                        "data", Map.of("id", snakeId + "->family:" + snake.getFamily(),
                                "source", snakeId, "target", "family:" + snake.getFamily(), "label", "属于")
                ));
            }

            // 毒素类型
            if (snake.getToxinType() != null && !"无毒".equals(snake.getToxinType()) && !snake.getToxinType().isEmpty()) {
                String toxinId = "toxin:" + snake.getToxinType();
                if (addedToxins.add(snake.getToxinType())) {
                    nodes.add(Map.of("data", Map.of("id", toxinId, "label", snake.getToxinType(), "type", "toxin")));
                    // 症状
                    String st = TOXIN_SYMPTOMS.getOrDefault(snake.getToxinType(), "");
                    if (!st.isEmpty() && addedSymptoms.add(snake.getToxinType())) {
                        String symptomId = "symptom:" + snake.getToxinType();
                        nodes.add(Map.of("data", Map.of("id", symptomId, "label", st, "type", "symptom")));
                        edges.add(Map.of("data", Map.of("id", toxinId + "->" + symptomId, "source", toxinId, "target", symptomId, "label", "导致")));
                    }
                    // 血清
                    String sr = TOXIN_SERUM.getOrDefault(snake.getToxinType(), "");
                    if (!sr.isEmpty() && addedSerums.add(snake.getToxinType())) {
                        String serumId = "serum:" + snake.getToxinType();
                        nodes.add(Map.of("data", Map.of("id", serumId, "label", sr, "type", "serum")));
                        edges.add(Map.of("data", Map.of("id", toxinId + "->" + serumId, "source", toxinId, "target", serumId, "label", "中和")));
                    }
                }
                edges.add(Map.of(
                        "data", Map.of("id", snakeId + "->" + toxinId, "source", snakeId, "target", toxinId, "label", "分泌")
                ));
            }

            // 危险等级
            if (snake.getDangerLevel() != null && !snake.getDangerLevel().isEmpty()) {
                String dangerId = "danger:" + snake.getDangerLevel();
                if (addedDangers.add(snake.getDangerLevel())) {
                    nodes.add(Map.of("data", Map.of("id", dangerId, "label", snake.getDangerLevel() + "危险", "type", "danger")));
                }
                edges.add(Map.of(
                        "data", Map.of("id", snakeId + "->" + dangerId, "source", snakeId, "target", dangerId, "label", "危险等级")
                ));
            }
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("nodes", nodes);
        result.put("edges", edges);
        result.put("stats", Map.of(
                "totalNodes", nodes.size(),
                "totalEdges", edges.size(),
                "snakeCount", snakes.size(),
                "familyCount", addedFamilies.size()
        ));
        return Result.success(result);
    }

    /**
     * 单个蛇种详情 — 返回以该蛇种为中心的子图
     */
    @GetMapping("/detail/{snakeId}")
    public Result<Map<String, Object>> getSnakeDetail(@PathVariable Long snakeId) {
        SnakeInfo snake = snakeInfoService.getById(snakeId);
        if (snake == null) {
            return Result.fail(404, "蛇类信息不存在");
        }

        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> edges = new ArrayList<>();

        String sid = "snake:" + snake.getSnakeId();
        nodes.add(Map.of(
                "data", Map.of(
                        "id", sid,
                        "label", snake.getSnakeName(),
                        "type", "snake",
                        "family", snake.getFamily() != null ? snake.getFamily() : "",
                        "toxin", snake.getToxinType() != null ? snake.getToxinType() : "",
                        "danger", snake.getDangerLevel() != null ? snake.getDangerLevel() : "",
                        "latin", snake.getLatinName() != null ? snake.getLatinName() : ""
                )
        ));

        // 科
        if (snake.getFamily() != null && !snake.getFamily().isEmpty()) {
            String fid = "family:" + snake.getFamily();
            nodes.add(Map.of("data", Map.of("id", fid, "label", snake.getFamily(), "type", "family")));
            edges.add(Map.of("data", Map.of("id", sid + "->" + fid, "source", sid, "target", fid, "label", "属于")));
        }

        // 毒素 + 症状 + 血清
        if (snake.getToxinType() != null && !"无毒".equals(snake.getToxinType()) && !snake.getToxinType().isEmpty()) {
            String tid = "toxin:" + snake.getToxinType();
            nodes.add(Map.of("data", Map.of("id", tid, "label", snake.getToxinType(), "type", "toxin")));
            edges.add(Map.of("data", Map.of("id", sid + "->" + tid, "source", sid, "target", tid, "label", "分泌")));

            String st = TOXIN_SYMPTOMS.getOrDefault(snake.getToxinType(), "");
            if (!st.isEmpty()) {
                String symId = "symptom:" + snake.getToxinType();
                nodes.add(Map.of("data", Map.of("id", symId, "label", st, "type", "symptom")));
                edges.add(Map.of("data", Map.of("id", tid + "->" + symId, "source", tid, "target", symId, "label", "导致")));
            }
            String sr = TOXIN_SERUM.getOrDefault(snake.getToxinType(), "");
            if (!sr.isEmpty()) {
                String serumId = "serum:" + snake.getToxinType();
                nodes.add(Map.of("data", Map.of("id", serumId, "label", sr, "type", "serum")));
                edges.add(Map.of("data", Map.of("id", tid + "->" + serumId, "source", tid, "target", serumId, "label", "中和")));
            }
        }

        // 危险等级
        if (snake.getDangerLevel() != null && !snake.getDangerLevel().isEmpty()) {
            String did = "danger:" + snake.getDangerLevel();
            nodes.add(Map.of("data", Map.of("id", did, "label", snake.getDangerLevel() + "危险", "type", "danger")));
            edges.add(Map.of("data", Map.of("id", sid + "->" + did, "source", sid, "target", did, "label", "危险等级")));
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("nodes", nodes);
        result.put("edges", edges);
        result.put("stats", Map.of("totalNodes", nodes.size(), "totalEdges", edges.size()));
        return Result.success(result);
    }
}
