package com.sling.snakeinfo.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sling.common.utils.Result;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;

@RestController
@RequestMapping("/api/snake/admin/emergency")
public class EmergencyInfoAdminController {

    private final DataSource dataSource;

    public EmergencyInfoAdminController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/list")
    public Result getList(
            @RequestParam(defaultValue = "1") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(required = false) String keyword) {
        try (Connection conn = dataSource.getConnection()) {
            StringBuilder countSql = new StringBuilder("SELECT COUNT(*) FROM snake_emergency_info WHERE del_flag = 0");
            StringBuilder dataSql = new StringBuilder("SELECT * FROM snake_emergency_info WHERE del_flag = 0");
            if (keyword != null && !keyword.trim().isEmpty()) {
                String like = " AND snake_name LIKE '%" + keyword.trim() + "%'";
                countSql.append(like);
                dataSql.append(like);
            }
            dataSql.append(" ORDER BY id LIMIT ").append((page - 1) * size).append(",").append(size);

            long total;
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(countSql.toString())) {
                total = rs.next() ? rs.getLong(1) : 0;
            }

            List<Map<String, Object>> list = new ArrayList<>();
            try (Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(dataSql.toString())) {
                var meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++) {
                        row.put(meta.getColumnName(i), rs.getObject(i));
                    }
                    list.add(row);
                }
            }
            return Result.success(Map.of("list", list, "total", total, "page", page, "size", size));
        } catch (Exception e) {
            return Result.fail("查询失败: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public Result getDetail(@PathVariable Long id) {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM snake_emergency_info WHERE id = " + id)) {
            if (rs.next()) {
                Map<String, Object> row = new LinkedHashMap<>();
                var meta = rs.getMetaData();
                for (int i = 1; i <= meta.getColumnCount(); i++) {
                    row.put(meta.getColumnName(i), rs.getObject(i));
                }
                return Result.success(row);
            }
            return Result.fail("数据不存在");
        } catch (Exception e) {
            return Result.fail("查询失败: " + e.getMessage());
        }
    }

    @PostMapping
    public Result create(@RequestBody Map<String, Object> body) {
        try (Connection conn = dataSource.getConnection()) {
            StringBuilder cols = new StringBuilder();
            StringBuilder vals = new StringBuilder();
            for (Map.Entry<String, Object> e : body.entrySet()) {
                if (cols.length() > 0) { cols.append(","); vals.append(","); }
                cols.append(e.getKey());
                vals.append("'").append(e.getValue().toString().replace("'", "''")).append("'");
            }
            String sql = "INSERT INTO snake_emergency_info (" + cols + ") VALUES (" + vals + ")";
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(sql);
            }
            return Result.success("创建成功");
        } catch (Exception e) {
            return Result.fail("创建失败: " + e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public Result update(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        try (Connection conn = dataSource.getConnection()) {
            StringBuilder setClause = new StringBuilder();
            for (Map.Entry<String, Object> e : body.entrySet()) {
                if (setClause.length() > 0) setClause.append(",");
                setClause.append(e.getKey()).append("='").append(e.getValue().toString().replace("'", "''")).append("'");
            }
            String sql = "UPDATE snake_emergency_info SET " + setClause + " WHERE id = " + id;
            try (Statement stmt = conn.createStatement()) {
                int rows = stmt.executeUpdate(sql);
                return rows > 0 ? Result.success("更新成功") : Result.fail("数据不存在");
            }
        } catch (Exception e) {
            return Result.fail("更新失败: " + e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public Result delete(@PathVariable Long id) {
        try (Connection conn = dataSource.getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.executeUpdate("UPDATE snake_emergency_info SET del_flag = 1 WHERE id = " + id);
            return Result.success("删除成功");
        } catch (Exception e) {
            return Result.fail("删除失败: " + e.getMessage());
        }
    }
}
