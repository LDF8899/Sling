package com.sling.admin.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.admin.entity.AdminOperationLog;
import com.sling.admin.mapper.AdminOperationLogMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

/**
 * Admin operation log service.
 * Records and queries admin operation logs.
 */
@Slf4j
@Service
public class AdminOperationLogService extends ServiceImpl<AdminOperationLogMapper, AdminOperationLog> {

    private final AdminOperationLogMapper adminOperationLogMapper;

    public AdminOperationLogService(AdminOperationLogMapper adminOperationLogMapper) {
        this.adminOperationLogMapper = adminOperationLogMapper;
    }

    /**
     * Save a new operation log entry.
     *
     * @param log the log entry to save
     * @return true if saved successfully
     */
    public boolean saveOperationLog(AdminOperationLog log) {
        return adminOperationLogMapper.insert(log) > 0;
    }

    /**
     * Get operation logs for a specific admin user.
     *
     * @param userId the admin user ID
     * @param page   page number (unused, for future pagination)
     * @param size   page size (unused, for future pagination)
     * @return list of operation logs
     */
    public List<AdminOperationLog> getLogsByUserId(Long userId, int page, int size) {
        QueryWrapper<AdminOperationLog> wrapper = new QueryWrapper<>();
        wrapper.eq("admin_user_id", userId)
               .orderByDesc("operation_time");
        return adminOperationLogMapper.selectList(wrapper);
    }

    /**
     * Get all operation logs.
     *
     * @param page page number (unused, for future pagination)
     * @param size page size (unused, for future pagination)
     * @return list of all operation logs
     */
    public List<AdminOperationLog> getAllLogs(int page, int size) {
        QueryWrapper<AdminOperationLog> wrapper = new QueryWrapper<>();
        wrapper.orderByDesc("operation_time");
        return adminOperationLogMapper.selectList(wrapper);
    }

    /**
     * Get operation logs by username.
     *
     * @param username the username to filter by
     * @param page     page number (unused, for future pagination)
     * @param size     page size (unused, for future pagination)
     * @return list of matching operation logs
     */
    public List<AdminOperationLog> getLogsByUsername(String username, int page, int size) {
        QueryWrapper<AdminOperationLog> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username)
               .orderByDesc("operation_time");
        return adminOperationLogMapper.selectList(wrapper);
    }

    /**
     * Query logs with multiple filter conditions and pagination.
     *
     * @param page   the MyBatis-Plus page object
     * @param params map of query parameters (operationType, resultStatus, startDate, endDate, sortBy, sortOrder)
     * @return paginated result
     */
    public Page<AdminOperationLog> getLogsByConditions(Page<AdminOperationLog> page, Map<String, Object> params) {
        QueryWrapper<AdminOperationLog> wrapper = new QueryWrapper<>();

        // Operation type filter
        Object operationTypeObj = params.get("operationType");
        if (operationTypeObj != null && !String.valueOf(operationTypeObj).trim().isEmpty()) {
            String operationType = String.valueOf(operationTypeObj).toLowerCase();
            switch (operationType) {
                case "login":
                    wrapper.eq("operation_type", "login");
                    break;
                case "logout":
                    wrapper.eq("operation_type", "logout");
                    break;
                case "query":
                    wrapper.eq("operation_type", "query");
                    break;
                case "modify":
                    wrapper.eq("operation_type", "modify");
                    break;
                case "delete":
                    wrapper.eq("operation_type", "delete");
                    break;
                case "config":
                    wrapper.eq("operation_type", "config");
                    break;
                default:
                    break;
            }
        }

        // Result status filter
        Object resultStatusObj = params.get("resultStatus");
        if (resultStatusObj != null && !String.valueOf(resultStatusObj).trim().isEmpty()) {
            String resultStatus = String.valueOf(resultStatusObj);
            if ("success".equals(resultStatus)) {
                wrapper.eq("operation_result", 1);
            } else if ("failed".equals(resultStatus)) {
                wrapper.eq("operation_result", 0);
            }
        }

        // Time range filter
        Object startDateObj = params.get("startDate");
        Object endDateObj = params.get("endDate");
        LocalDateTime startDate = null;
        LocalDateTime endDate = null;

        if (startDateObj instanceof LocalDateTime) {
            startDate = (LocalDateTime) startDateObj;
        }
        if (endDateObj instanceof LocalDateTime) {
            endDate = (LocalDateTime) endDateObj;
        }

        if (startDate != null) {
            wrapper.ge("operation_time", startDate);
        }
        if (endDate != null) {
            wrapper.le("operation_time", endDate);
        }

        // Sorting
        Object sortByObj = params.get("sortBy");
        Object sortOrderObj = params.get("sortOrder");

        String sortBy = sortByObj != null ? String.valueOf(sortByObj) : "operationTime";
        String sortOrder = sortOrderObj != null ? String.valueOf(sortOrderObj) : "DESC";

        if ("operationTime".equals(sortBy) || "create_time".equals(sortBy) || "operation_time".equals(sortBy)) {
            if ("DESC".equalsIgnoreCase(sortOrder)) {
                wrapper.orderByDesc("operation_time");
            } else {
                wrapper.orderByAsc("operation_time");
            }
        } else if ("logId".equals(sortBy) || "id".equals(sortBy)) {
            if ("DESC".equalsIgnoreCase(sortOrder)) {
                wrapper.orderByDesc("log_id");
            } else {
                wrapper.orderByAsc("log_id");
            }
        } else {
            wrapper.orderByDesc("operation_time");
        }

        return adminOperationLogMapper.selectPage(page, wrapper);
    }
}
