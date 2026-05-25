package com.sling.warning.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sling.common.utils.Result;
import com.sling.warning.entity.WarningArea;
import com.sling.warning.entity.WarningRecord;
import com.sling.warning.mapper.WarningAreaMapper;
import com.sling.warning.mapper.WarningRecordMapper;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;

@RestController
@RequestMapping("/api/warning/admin")
public class WarningAdminController {

    private final WarningAreaMapper areaMapper;
    private final WarningRecordMapper recordMapper;
    private final DataSource dataSource;

    public WarningAdminController(WarningAreaMapper areaMapper, WarningRecordMapper recordMapper, DataSource dataSource) {
        this.areaMapper = areaMapper;
        this.recordMapper = recordMapper;
        this.dataSource = dataSource;
    }

    // Warning Areas
    @GetMapping("/areas")
    public Result getAreas(@RequestParam(defaultValue = "1") Integer page,
                           @RequestParam(defaultValue = "20") Integer size) {
        Page<WarningArea> pageInfo = new Page<>(page, size);
        Page<WarningArea> result = areaMapper.selectPage(pageInfo,
                new QueryWrapper<WarningArea>().orderByDesc("create_time"));
        return Result.success(Map.of(
                "list", result.getRecords(), "total", result.getTotal(),
                "page", page, "size", size, "pages", result.getPages()));
    }

    @GetMapping("/areas/{id}")
    public Result getArea(@PathVariable Long id) {
        WarningArea area = areaMapper.selectById(id);
        return area != null ? Result.success(area) : Result.fail("区域不存在");
    }

    @PostMapping("/areas")
    public Result createArea(@RequestBody WarningArea area) {
        areaMapper.insert(area);
        return Result.success("创建成功", area);
    }

    @PutMapping("/areas/{id}")
    public Result updateArea(@PathVariable Long id, @RequestBody WarningArea area) {
        area.setAreaId(id);
        areaMapper.updateById(area);
        return Result.success("更新成功");
    }

    @DeleteMapping("/areas/{id}")
    public Result deleteArea(@PathVariable Long id) {
        areaMapper.deleteById(id);
        return Result.success("删除成功");
    }

    // Warning Records
    @GetMapping("/records")
    public Result getRecords(@RequestParam(defaultValue = "1") Integer page,
                             @RequestParam(defaultValue = "20") Integer size) {
        Page<WarningRecord> pageInfo = new Page<>(page, size);
        Page<WarningRecord> result = recordMapper.selectPage(pageInfo,
                new QueryWrapper<WarningRecord>().orderByDesc("warning_time"));
        return Result.success(Map.of(
                "list", result.getRecords(), "total", result.getTotal(),
                "page", page, "size", size, "pages", result.getPages()));
    }

    // Warning Rules
    @GetMapping("/rules")
    public Result getRules(@RequestParam(defaultValue = "1") Integer page,
                           @RequestParam(defaultValue = "20") Integer size) {
        try (Connection conn = dataSource.getConnection()) {
            long total;
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery("SELECT COUNT(*) FROM warning_rule")) {
                total = rs.next() ? rs.getLong(1) : 0;
            }
            List<Map<String, Object>> list = new ArrayList<>();
            String sql = "SELECT wr.*, sn.snake_name FROM warning_rule wr " +
                    "LEFT JOIN snake_info sn ON wr.snake_id = sn.snake_id " +
                    "LIMIT " + ((page - 1) * size) + "," + size;
            try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
                var meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++)
                        row.put(meta.getColumnName(i), rs.getObject(i));
                    list.add(row);
                }
            }
            return Result.success(Map.of("list", list, "total", total, "page", page, "size", size));
        } catch (Exception e) {
            return Result.fail("查询失败: " + e.getMessage());
        }
    }

    @PutMapping("/rules/{ruleId}")
    public Result updateRule(@PathVariable Long ruleId, @RequestBody Map<String, Object> body) {
        try (Connection conn = dataSource.getConnection()) {
            StringBuilder set = new StringBuilder();
            for (Map.Entry<String, Object> e : body.entrySet()) {
                if (set.length() > 0) set.append(",");
                set.append(e.getKey()).append("='").append(e.getValue().toString().replace("'", "''")).append("'");
            }
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate("UPDATE warning_rule SET " + set + " WHERE rule_id = " + ruleId);
            }
            return Result.success("更新成功");
        } catch (Exception e) {
            return Result.fail("更新失败: " + e.getMessage());
        }
    }
}
