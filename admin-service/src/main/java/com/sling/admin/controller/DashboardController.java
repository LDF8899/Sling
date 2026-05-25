package com.sling.admin.controller;

import com.sling.common.utils.Result;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class DashboardController {

    private final DataSource dataSource;

    public DashboardController(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    @GetMapping("/dashboard")
    public Result getDashboard() {
        Map<String, Object> stats = new HashMap<>();
        try (Connection conn = dataSource.getConnection()) {
            safePut(conn, stats, "userCount", "user_info", null, null);
            safePut(conn, stats, "adminCount", "admin_users", "del_flag = 0", null);
            String snakeWhere = hasColumn(conn, "snake_info", "del_flag") ? "del_flag = 0" : null;
            safePut(conn, stats, "snakeCount", "snake_info", snakeWhere, null);
            String hospitalWhere = hasColumn(conn, "hospital_info", "del_flag") ? "del_flag = 0" : null;
            safePut(conn, stats, "hospitalCount", "hospital_info", hospitalWhere, null);
            safePut(conn, stats, "recognitionCount", "recognition_record", null, null);
            safePut(conn, stats, "sosCount", "emergency_help", null, null);
            safePut(conn, stats, "warningCount", "warning_record", "is_valid = 1", null);
            String emergencyWhere = hasColumn(conn, "snake_emergency_info", "del_flag") ? "del_flag = 0" : null;
            safePut(conn, stats, "emergencyInfoCount", "snake_emergency_info", emergencyWhere, null);
            safePut(conn, stats, "pendingSosCount", "emergency_help", "status = 'pending'", null);
            safePut(conn, stats, "activeWarningAreas", "warning_area", null, null);
            safePut(conn, stats, "serumStockTotal", "serum_inventory", null, "serum_amount");
        } catch (Exception e) {
            return Result.fail("获取仪表盘数据失败: " + e.getMessage());
        }
        return Result.success(stats);
    }

    private void safePut(Connection conn, Map<String, Object> stats, String key,
                         String table, String where, String sumColumn) {
        try {
            if (sumColumn != null) {
                stats.put(key, sumColumn(conn, table, sumColumn, where));
            } else {
                stats.put(key, countTable(conn, table, where));
            }
        } catch (Exception e) {
            stats.put(key, -1L);
        }
    }

    private boolean hasColumn(Connection conn, String table, String column) {
        try (Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SHOW COLUMNS FROM " + table + " LIKE '" + column + "'")) {
            return rs.next();
        } catch (Exception e) {
            return false;
        }
    }

    private long countTable(Connection conn, String table, String where) throws Exception {
        String sql = "SELECT COUNT(*) FROM " + table;
        if (where != null) sql += " WHERE " + where;
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            return rs.next() ? rs.getLong(1) : 0;
        }
    }

    private long sumColumn(Connection conn, String table, String column, String where) throws Exception {
        String sql = "SELECT COALESCE(SUM(" + column + "), 0) FROM " + table;
        if (where != null) sql += " WHERE " + where;
        try (Statement stmt = conn.createStatement(); ResultSet rs = stmt.executeQuery(sql)) {
            return rs.next() ? rs.getLong(1) : 0;
        }
    }
}
