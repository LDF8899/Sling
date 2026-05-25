package com.sling.user.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.user.entity.AdminOperationLog;
import com.sling.user.mapper.AdminOperationLogMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin operation log service for user-service.
 * Records and queries admin operation logs.
 *
 * NOTE: This is a duplicate of the AdminOperationLogService in admin-service.
 * The authoritative operation log management lives in admin-service.
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
     * Get operation logs for a specific user.
     *
     * @param userId the user ID
     * @param page   page number (unused, for future pagination)
     * @param size   page size (unused, for future pagination)
     * @return list of operation logs
     */
    public List<AdminOperationLog> getLogsByUserId(Long userId, int page, int size) {
        QueryWrapper<AdminOperationLog> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId)
               .orderByDesc("create_time");
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
        wrapper.orderByDesc("create_time");
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
               .orderByDesc("create_time");
        return adminOperationLogMapper.selectList(wrapper);
    }
}
