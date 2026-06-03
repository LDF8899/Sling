package com.sling.warning.controller;

import com.sling.common.utils.Result;
import com.sling.warning.entity.Region;
import com.sling.warning.service.RegionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 区域管理控制器（救助端）
 */
@RestController
@RequestMapping("/api/rescue/regions")
@RequiredArgsConstructor
public class RegionController {

    private final RegionService regionService;

    /**
     * 获取完整区域树
     */
    @GetMapping("/tree")
    public Result getRegionTree() {
        List<Map<String, Object>> tree = regionService.getRegionTree();
        return Result.success(tree);
    }

    /**
     * 按层级/父级查询区域列表
     * @param level 层级（1/2/3），可选
     * @param parentId 父区域ID，可选
     */
    @GetMapping
    public Result getRegions(@RequestParam(required = false) Integer level,
                             @RequestParam(required = false) Long parentId) {
        List<Region> regions = regionService.getRegions(level, parentId);
        return Result.success(regions);
    }

    /**
     * 创建区域
     */
    @PostMapping
    public Result createRegion(@RequestBody Region region) {
        regionService.save(region);
        return Result.success("创建成功", region);
    }

    /**
     * 更新区域
     */
    @PutMapping("/{id}")
    public Result updateRegion(@PathVariable Long id, @RequestBody Region region) {
        region.setRegionId(id);
        regionService.updateById(region);
        return Result.success("更新成功");
    }

    /**
     * 删除区域
     */
    @DeleteMapping("/{id}")
    public Result deleteRegion(@PathVariable Long id) {
        regionService.removeById(id);
        return Result.success("删除成功");
    }
}
