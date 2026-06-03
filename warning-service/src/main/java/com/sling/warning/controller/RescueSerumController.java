package com.sling.warning.controller;

import com.sling.common.utils.Result;
import com.sling.warning.service.RescuerSecondaryPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.*;

/**
 * 救助端血清库存管理控制器
 *
 * <p>医护人员管理某区域关联医院的血清库存，编辑操作需二级密码。
 */
@RestController
@RequestMapping("/api/rescue/serum")
@RequiredArgsConstructor
public class RescueSerumController {

    private final DataSource dataSource;
    private final RescuerSecondaryPasswordService secondaryPasswordService;

    /**
     * 获取某区域的血清库存
     */
    @GetMapping
    public Result getSerumByRegion(@RequestParam Long regionId) {
        try (Connection conn = dataSource.getConnection()) {
            List<Map<String, Object>> list = new ArrayList<>();
            String sql = "SELECT si.*, h.hospital_name, sn.snake_name " +
                    "FROM serum_inventory si " +
                    "LEFT JOIN hospital_info h ON si.hospital_id = h.hospital_id " +
                    "LEFT JOIN snake_info sn ON si.snake_id = sn.snake_id " +
                    "WHERE si.region_id = " + regionId +
                    " ORDER BY si.inventory_id";
            try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
                var meta = rs.getMetaData();
                while (rs.next()) {
                    Map<String, Object> row = new LinkedHashMap<>();
                    for (int i = 1; i <= meta.getColumnCount(); i++)
                        row.put(meta.getColumnName(i), rs.getObject(i));
                    list.add(row);
                }
            }
            return Result.success(list);
        } catch (Exception e) {
            return Result.fail("查询失败: " + e.getMessage());
        }
    }

    /**
     * 新增血清记录（需二级密码，角色必须是 medic）
     */
    @PostMapping
    public Result createSerum(@RequestBody Map<String, Object> body) {
        String role = (String) body.get("creatorRole");
        String password = (String) body.get("secondaryPassword");

        if (!secondaryPasswordService.verifyPassword(role, password)) {
            return Result.fail(403, "二级密码验证失败");
        }

        try (Connection conn = dataSource.getConnection()) {
            Long hospitalId = Long.valueOf(body.get("hospitalId").toString());
            Long regionId = Long.valueOf(body.get("regionId").toString());
            Long snakeId = body.get("snakeId") != null ? Long.valueOf(body.get("snakeId").toString()) : null;
            String serumName = (String) body.get("serumName");
            int stockCount = body.get("stockCount") != null ? Integer.parseInt(body.get("stockCount").toString()) : 0;
            String expiryDate = (String) body.get("expiryDate");
            Long updatedBy = body.get("updatedBy") != null ? Long.valueOf(body.get("updatedBy").toString()) : null;

            String sql = String.format(
                    "INSERT INTO serum_inventory (region_id, hospital_id, snake_id, serum_name, stock_count, expiry_date, updated_by) " +
                    "VALUES (%d, %d, %s, '%s', %d, %s, %s)",
                    regionId, hospitalId,
                    snakeId != null ? snakeId.toString() : "NULL",
                    serumName.replace("'", "''"),
                    stockCount,
                    expiryDate != null ? "'" + expiryDate + "'" : "NULL",
                    updatedBy != null ? updatedBy.toString() : "NULL"
            );
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate(sql);
            }
            return Result.success("创建成功");
        } catch (Exception e) {
            return Result.fail("创建失败: " + e.getMessage());
        }
    }

    /**
     * 更新血清记录（需二级密码）
     */
    @PutMapping("/{id}")
    public Result updateSerum(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        String role = (String) body.get("creatorRole");
        String password = (String) body.get("secondaryPassword");

        if (!secondaryPasswordService.verifyPassword(role, password)) {
            return Result.fail(403, "二级密码验证失败");
        }

        try (Connection conn = dataSource.getConnection()) {
            StringBuilder set = new StringBuilder();
            if (body.get("stockCount") != null) {
                if (set.length() > 0) set.append(",");
                set.append("stock_count=").append(body.get("stockCount"));
            }
            if (body.get("serumName") != null) {
                if (set.length() > 0) set.append(",");
                set.append("serum_name='").append(body.get("serumName").toString().replace("'", "''")).append("'");
            }
            if (body.get("expiryDate") != null) {
                if (set.length() > 0) set.append(",");
                set.append("expiry_date='").append(body.get("expiryDate")).append("'");
            }
            if (body.get("updatedBy") != null) {
                if (set.length() > 0) set.append(",");
                set.append("updated_by=").append(body.get("updatedBy"));
            }

            if (set.length() == 0) {
                return Result.fail("没有要更新的字段");
            }

            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate("UPDATE serum_inventory SET " + set + " WHERE inventory_id = " + id);
            }
            return Result.success("更新成功");
        } catch (Exception e) {
            return Result.fail("更新失败: " + e.getMessage());
        }
    }

    /**
     * 删除血清记录（需二级密码）
     */
    @DeleteMapping("/{id}")
    public Result deleteSerum(@PathVariable Long id,
                              @RequestParam String role,
                              @RequestParam String secondaryPassword) {
        if (!secondaryPasswordService.verifyPassword(role, secondaryPassword)) {
            return Result.fail(403, "二级密码验证失败");
        }

        try (Connection conn = dataSource.getConnection()) {
            try (Statement stmt = conn.createStatement()) {
                stmt.executeUpdate("DELETE FROM serum_inventory WHERE inventory_id = " + id);
            }
            return Result.success("删除成功");
        } catch (Exception e) {
            return Result.fail("删除失败: " + e.getMessage());
        }
    }
}
