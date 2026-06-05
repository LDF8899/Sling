package com.sling.warning.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.warning.entity.Region;
import com.sling.warning.mapper.RegionMapper;
import com.sling.warning.service.RegionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
public class RegionServiceImpl extends ServiceImpl<RegionMapper, Region> implements RegionService {

    @Override
    public List<Map<String, Object>> getRegionTree() {
        List<Region> all = list(new QueryWrapper<Region>().orderByAsc("level", "region_id"));
        if (all.isEmpty()) {
            return Collections.emptyList();
        }

        // 按 parentId 分组
        Map<Long, List<Region>> byParent = all.stream()
                .filter(r -> r.getParentId() != null)
                .collect(Collectors.groupingBy(Region::getParentId));

        // 顶级（parentId == null）
        List<Region> roots = all.stream()
                .filter(r -> r.getParentId() == null)
                .collect(Collectors.toList());

        return roots.stream()
                .map(root -> buildTreeNode(root, byParent))
                .collect(Collectors.toList());
    }

    @Override
    public List<Region> getRegions(Integer level, Long parentId) {
        QueryWrapper<Region> qw = new QueryWrapper<>();
        if (level != null) {
            qw.eq("level", level);
        }
        if (parentId != null) {
            qw.eq("parent_id", parentId);
        }
        qw.orderByAsc("region_id");
        return list(qw);
    }

    private Map<String, Object> buildTreeNode(Region region, Map<Long, List<Region>> byParent) {
        Map<String, Object> node = new LinkedHashMap<>();
        node.put("id", region.getRegionId().toString());
        node.put("name", region.getName());
        node.put("level", region.getLevel());
        node.put("centerLng", region.getCenterLng());
        node.put("centerLat", region.getCenterLat());
        node.put("zoomLevel", region.getZoomLevel());

        List<Region> children = byParent.getOrDefault(region.getRegionId(), Collections.emptyList());
        if (!children.isEmpty()) {
            node.put("children", children.stream()
                    .map(child -> buildTreeNode(child, byParent))
                    .collect(Collectors.toList()));
        } else {
            node.put("children", Collections.emptyList());
        }

        return node;
    }
}
