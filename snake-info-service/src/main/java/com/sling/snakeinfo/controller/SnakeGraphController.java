package com.sling.snakeinfo.controller;

import com.sling.common.redis.RedisService;
import com.sling.common.utils.Result;
import com.sling.snakeinfo.entity.SnakeInfo;
import com.sling.snakeinfo.service.SnakeInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * 蛇类知识图谱接口 — 返回 Cytoscape.js 格式的 nodes + edges
 */
@RestController
@RequestMapping("/snake/graph")
@RequiredArgsConstructor
public class SnakeGraphController {

    private final SnakeInfoService snakeInfoService;
    private final RedisService redisService;

    /**
     * 获取完整知识图谱数据
     * 返回 { nodes: [...], edges: [...] } 格式，可直接传给 Cytoscape.js
     */
    @GetMapping("/data")
    public Result<Map<String, Object>> getGraphData(
            @RequestParam(required = false, defaultValue = "all") String filter) {

        List<SnakeInfo> snakes = snakeInfoService.list();
        if (snakes.isEmpty()) {
            return Result.success(Map.of("nodes", List.of(), "edges", List.of()));
        }

        List<Map<String, Object>> nodes = new ArrayList<>();
        List<Map<String, Object>> edges = new ArrayList<>();
        Set<String> addedFamilies = new HashSet<>();
        Set<String> addedToxins = new HashSet<>();
        Set<String> addedDangerLevels = new HashSet<>();
        Set<String> addedSymptoms = new HashSet<>();

        // 毒素类型 → 典型症状映射
        Map<String, String> toxinSymptoms = Map.of(
                "神经毒素", "眼睑下垂、吞咽困难、呼吸肌麻痹、呼吸衰竭",
                "血液毒素", "伤口剧痛肿胀、凝血障碍、广泛性出血、DIC",
                "细胞毒素", "组织坏死、皮肤溃烂、角膜溃疡、心肌损害",
                "混合毒素", "多系统损害、呼吸抑制、凝血崩溃、组织坏死"
        );

        // 毒素类型 → 推荐血清映射
        Map<String, String> toxinSerum = Map.of(
                "神经毒素", "抗银环蛇/抗眼镜蛇蛇毒血清",
                "血液毒素", "抗蝮蛇/抗五步蛇蛇毒血清",
                "细胞毒素", "抗眼镜蛇蛇毒血清",
                "混合毒素", "多价抗蛇毒血清"
        );

        for (SnakeInfo snake : snakes) {
            // 按 filter 过滤
            if (!"all".equals(filter)) {
                if ("venomous".equals(filter) && (snake.getDangerLevel() == null || "无毒".equals(snake.getDangerLevel()))) {
                    continue;
                }
                if ("severe".equals(filter) && !"重度".equals(snake.getDangerLevel())) {
                    continue;
                }
            }

            String snakeId = "snake:" + snake.getSnakeId();

            // 蛇种节点
            nodes.add(Map.of(
                    "data", Map.of(
                            "id", snakeId,
                            "label", snake.getSnakeName(),
                            "type", "snake",
                            "family", snake.getFamily() != null ? snake.getFamily() : "",
                            "toxin", snake.getToxinType() != null ? snake.getToxinType() : "",
                            "danger", snake.getDangerLevel() != null ? snake.getDangerLevel() : "",
                            "latin", snake.getLatinName() != null ? snake.getLatinName() : ""
                    )
            ));

            // 科节点 + 边
            if (snake.getFamily() != null && !snake.getFamily().isEmpty()) {
                String familyId = "family:" + snake.getFamily();
                if (addedFamilies.add(snake.getFamily())) {
                    nodes.add(Map.of(
                            "data", Map.of(
                                    "id", familyId,
                                    "label", snake.getFamily(),
                                    "type", "family"
                            )
                    ));
                }
                edges.add(Map.of(
                        "data", Map.of(
                                "id", snakeId + "->" + familyId,
                                "source", snakeId,
                                "target", familyId,
                                "label", "属于"
                        )
                ));
            }

            // 毒素类型节点 + 边
            if (snake.getToxinType() != null && !"无毒".equals(snake.getToxinType()) && !snake.getToxinType().isEmpty()) {
                String toxinId = "toxin:" + snake.getToxinType();
                if (addedToxins.add(snake.getToxinType())) {
                    nodes.add(Map.of(
                            "data", Map.of(
                                    "id", toxinId,
                                    "label", snake.getToxinType(),
                                    "type", "toxin"
                            )
                    ));
                }
                edges.add(Map.of(
                        "data", Map.of(
                                "id", snakeId + "->" + toxinId,
                                "source", snakeId,
                                "target", toxinId,
                                "label", "分泌"
                        )
                ));

                // 症状节点 + 边（每个毒素类型关联一个症状节点）
                String symptomText = toxinSymptoms.getOrDefault(snake.getToxinType(), "");
                if (!symptomText.isEmpty()) {
                    String symptomId = "symptom:" + snake.getToxinType();
                    if (addedSymptoms.add(snake.getToxinType())) {
                        nodes.add(Map.of(
                                "data", Map.of(
                                        "id", symptomId,
                                        "label", symptomText,
                                        "type", "symptom"
                                )
                        ));
                    }
                    edges.add(Map.of(
                            "data", Map.of(
                                    "id", toxinId + "->" + symptomId,
                                    "source", toxinId,
                                    "target", symptomId,
                                    "label", "导致"
                            )
                    ));
                }

                // 血清节点 + 边
                String serumText = toxinSerum.getOrDefault(snake.getToxinType(), "");
                if (!serumText.isEmpty()) {
                    String serumId = "serum:" + snake.getToxinType();
                    if (!addedSymptoms.contains(serumId)) {
                        // reuse set to track serums too
                    }
                    // 用 addedToxins 的子集来跟踪血清
                    String serumKey = "serum_" + snake.getToxinType();
                    if (addedSymptoms.add(serumKey)) {
                        nodes.add(Map.of(
                                "data", Map.of(
                                        "id", serumId,
                                        "label", serumText,
                                        "type", "serum"
                                )
                        ));
                        edges.add(Map.of(
                                "data", Map.of(
                                        "id", toxinId + "->" + serumId,
                                        "source", toxinId,
                                        "target", serumId,
                                        "label", "中和"
                                )
                        ));
                    }
                }
            }

            // 危险等级节点 + 边
            if (snake.getDangerLevel() != null && !"无毒".equals(snake.getDangerLevel()) && !snake.getDangerLevel().isEmpty()) {
                String dangerId = "danger:" + snake.getDangerLevel();
                if (addedDangerLevels.add(snake.getDangerLevel())) {
                    nodes.add(Map.of(
                            "data", Map.of(
                                    "id", dangerId,
                                    "label", snake.getDangerLevel() + "危险",
                                    "type", "danger"
                            )
                    ));
                }
                edges.add(Map.of(
                        "data", Map.of(
                                "id", snakeId + "->" + dangerId,
                                "source", snakeId,
                                "target", dangerId,
                                "label", "危险等级"
                        )
                ));
            }
        }

        Map<String, Object> result = new LinkedHashMap<>();
        result.put("nodes", nodes);
        result.put("edges", edges);
        result.put("stats", Map.of(
                "totalNodes", nodes.size(),
                "totalEdges", edges.size(),
                "snakeCount", snakes.size()
        ));
        return Result.success(result);
    }

    /**
     * 获取单个蛇种的关联图谱（点击蛇种时展开）
     */
    @GetMapping("/detail/{snakeId}")
    public Result<Map<String, Object>> getSnakeDetail(@PathVariable Long snakeId) {
        SnakeInfo snake = snakeInfoService.getById(snakeId);
        if (snake == null) {
            return Result.fail(404, "蛇类信息不存在");
        }

        // 返回以该蛇种为中心的局部图谱
        return getGraphData("all");
    }
}
