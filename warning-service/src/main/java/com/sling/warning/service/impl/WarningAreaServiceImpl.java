package com.sling.warning.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sling.warning.entity.WarningArea;
import com.sling.warning.mapper.WarningAreaMapper;
import com.sling.warning.service.WarningAreaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class WarningAreaServiceImpl extends ServiceImpl<WarningAreaMapper, WarningArea> implements WarningAreaService {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public List<Map<String, Object>> checkProximity(Double lng, Double lat) {
        List<WarningArea> allAreas = list();
        List<Map<String, Object>> matched = new ArrayList<>();

        for (WarningArea area : allAreas) {
            if (area.getBoundaryCoordinates() == null || area.getBoundaryCoordinates().isEmpty()) {
                continue;
            }

            try {
                double[][] polygon = parsePolygon(area.getBoundaryCoordinates());
                if (polygon != null && isPointInPolygon(lng, lat, polygon)) {
                    Map<String, Object> info = new LinkedHashMap<>();
                    info.put("areaId", area.getAreaId());
                    info.put("areaName", area.getAreaName());
                    info.put("warningLevel", area.getWarningLevel());
                    info.put("description", area.getDescription());
                    info.put("snakeSpecies", area.getSnakeSpecies());
                    matched.add(info);
                }
            } catch (Exception e) {
                log.warn("解析区域 {} 的边界数据失败: {}", area.getAreaName(), e.getMessage());
            }
        }

        return matched;
    }

    /**
     * 解析 GeoJSON Polygon 为二维坐标数组
     * 格式: {"type":"Polygon","coordinates":[[[lng,lat],[lng,lat],...]]}
     */
    private double[][] parsePolygon(String geoJson) throws Exception {
        JsonNode root = objectMapper.readTree(geoJson);
        JsonNode coords = root.path("coordinates");
        if (coords.isMissingNode() || !coords.isArray() || coords.isEmpty()) {
            return null;
        }

        JsonNode outerRing = coords.get(0);
        if (outerRing == null || !outerRing.isArray()) {
            return null;
        }

        double[][] polygon = new double[outerRing.size()][2];
        for (int i = 0; i < outerRing.size(); i++) {
            JsonNode point = outerRing.get(i);
            polygon[i][0] = point.get(0).asDouble(); // lng
            polygon[i][1] = point.get(1).asDouble(); // lat
        }
        return polygon;
    }

    /**
     * Ray-casting 算法判断点是否在多边形内
     */
    private boolean isPointInPolygon(double lng, double lat, double[][] polygon) {
        boolean inside = false;
        for (int i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            double xi = polygon[i][0], yi = polygon[i][1];
            double xj = polygon[j][0], yj = polygon[j][1];
            if (((yi > lat) != (yj > lat)) &&
                (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
                inside = !inside;
            }
        }
        return inside;
    }
}
