package com.sling.warning.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sling.common.utils.Result;
import com.sling.warning.entity.WarningArea;
import com.sling.warning.entity.WarningRecord;
import com.sling.warning.mapper.WarningAreaMapper;
import com.sling.warning.service.RescuerSecondaryPasswordService;
import com.sling.warning.service.WarningRecordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 救助端预警区域管理控制器
 *
 * <p>护林员和医护人员通过此接口管理预警区域，编辑操作需要二级密码验证。
 */
@RestController
@RequestMapping("/api/rescue/warning")
@RequiredArgsConstructor
public class RescueWarningController {

    private final WarningAreaMapper areaMapper;
    private final RescuerSecondaryPasswordService secondaryPasswordService;
    private final WarningRecordService warningRecordService;

    /**
     * 确保 snakeSpecies 值为合法 JSON（MySQL JSON 列要求）。
     * 如果前端传来普通字符串如 "银环蛇"，自动包装为 JSON 数组 "[\"银环蛇\"]"。
     */
    private String ensureJson(String value) {
        if (value == null || value.isBlank()) return null;
        String trimmed = value.trim();
        if (trimmed.startsWith("[") || trimmed.startsWith("{")) return trimmed;
        // 普通字符串 → JSON 数组
        return "[\"" + trimmed.replace("\\", "\\\\").replace("\"", "\\\"") + "\"]";
    }

    /**
     * 获取预警区域列表（按区域筛选）
     */
    @GetMapping("/areas")
    public Result getAreas(@RequestParam(required = false) Long regionId,
                           @RequestParam(defaultValue = "1") Integer page,
                           @RequestParam(defaultValue = "20") Integer size) {
        Page<WarningArea> pageInfo = new Page<>(page, size);
        QueryWrapper<WarningArea> qw = new QueryWrapper<WarningArea>()
                .orderByDesc("create_time");
        if (regionId != null) {
            qw.eq("region_id", regionId);
        }
        Page<WarningArea> result = areaMapper.selectPage(pageInfo, qw);
        return Result.success(Map.of(
                "list", result.getRecords(), "total", result.getTotal(),
                "page", page, "size", size, "pages", result.getPages()));
    }

    /**
     * 创建预警区域（需二级密码）
     */
    @PostMapping("/areas")
    public Result createArea(@RequestBody Map<String, Object> body) {
        String role = (String) body.get("creatorRole");
        String password = (String) body.get("secondaryPassword");

        if (!secondaryPasswordService.verifyPassword(role, password)) {
            return Result.fail(403, "二级密码验证失败");
        }

        WarningArea area = new WarningArea();
        area.setAreaName((String) body.get("areaName"));
        area.setRegionId(body.get("regionId") != null ? Long.valueOf(body.get("regionId").toString()) : null);
        area.setDescription((String) body.get("description"));
        area.setBoundaryCoordinates((String) body.get("boundaryCoordinates"));
        area.setSnakeSpecies(ensureJson((String) body.get("snakeSpecies")));
        area.setWarningLevel(body.get("warningLevel") != null ? Integer.valueOf(body.get("warningLevel").toString()) : 1);
        area.setCreatedBy(body.get("createdBy") != null ? Long.valueOf(body.get("createdBy").toString()) : null);
        area.setCreatorRole(role);

        areaMapper.insert(area);

        // 自动生成预警记录，使用户端 /warning 页面能看到
        WarningRecord record = new WarningRecord();
        record.setAreaId(area.getAreaId());
        record.setWarningContent(area.getDescription() != null ? area.getDescription() : area.getAreaName() + " 预警区域创建");
        record.setIsValid(1);
        warningRecordService.save(record);

        return Result.success("创建成功", area);
    }

    /**
     * 更新预警区域（需二级密码）
     */
    @PutMapping("/areas/{id}")
    public Result updateArea(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        String role = (String) body.get("creatorRole");
        String password = (String) body.get("secondaryPassword");

        if (!secondaryPasswordService.verifyPassword(role, password)) {
            return Result.fail(403, "二级密码验证失败");
        }

        WarningArea area = areaMapper.selectById(id);
        if (area == null) {
            return Result.fail("预警区域不存在");
        }

        if (body.get("areaName") != null) area.setAreaName((String) body.get("areaName"));
        if (body.get("regionId") != null) area.setRegionId(Long.valueOf(body.get("regionId").toString()));
        if (body.get("description") != null) area.setDescription((String) body.get("description"));
        if (body.get("boundaryCoordinates") != null) area.setBoundaryCoordinates((String) body.get("boundaryCoordinates"));
        if (body.get("snakeSpecies") != null) area.setSnakeSpecies(ensureJson((String) body.get("snakeSpecies")));
        if (body.get("warningLevel") != null) area.setWarningLevel(Integer.valueOf(body.get("warningLevel").toString()));

        areaMapper.updateById(area);
        return Result.success("更新成功");
    }

    /**
     * 删除预警区域（需二级密码）
     */
    @DeleteMapping("/areas/{id}")
    public Result deleteArea(@PathVariable Long id,
                             @RequestParam String role,
                             @RequestParam String secondaryPassword) {
        if (!secondaryPasswordService.verifyPassword(role, secondaryPassword)) {
            return Result.fail(403, "二级密码验证失败");
        }

        areaMapper.deleteById(id);
        // 同步删除关联的预警记录
        warningRecordService.remove(
                new com.baomidou.mybatisplus.core.conditions.query.QueryWrapper<WarningRecord>()
                        .eq("area_id", id));
        return Result.success("删除成功");
    }

    /**
     * 验证二级密码（供前端在编辑前预校验）
     */
    @PostMapping("/verify-password")
    public Result verifyPassword(@RequestBody Map<String, String> body) {
        String role = body.get("role");
        String password = body.get("password");
        boolean valid = secondaryPasswordService.verifyPassword(role, password);
        if (valid) {
            return Result.success("验证通过", Map.of("valid", true));
        } else {
            return Result.fail(403, "密码错误");
        }
    }
}
