package com.sling.user.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.user.entity.AdminRole;
import com.sling.user.mapper.AdminRoleMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin role service for user-service.
 * Manages AdminRole entities within the user-service context.
 *
 * NOTE: This is a duplicate of the AdminRoleService in admin-service.
 * The authoritative admin role management lives in admin-service.
 */
@Slf4j
@Service
public class AdminRoleService extends ServiceImpl<AdminRoleMapper, AdminRole> {

    private final AdminRoleMapper adminRoleMapper;

    public AdminRoleService(AdminRoleMapper adminRoleMapper) {
        this.adminRoleMapper = adminRoleMapper;
    }

    /**
     * Find an active admin role by role code.
     *
     * @param roleCode the role code to search for
     * @return the AdminRole or null if not found
     */
    public AdminRole findByRoleCode(String roleCode) {
        QueryWrapper<AdminRole> wrapper = new QueryWrapper<>();
        wrapper.eq("role_code", roleCode).eq("status", 1);
        return adminRoleMapper.selectOne(wrapper);
    }

    /**
     * Get all active admin roles.
     *
     * @return list of active admin roles
     */
    public List<AdminRole> getAllActiveRoles() {
        QueryWrapper<AdminRole> wrapper = new QueryWrapper<>();
        wrapper.eq("status", 1);
        return adminRoleMapper.selectList(wrapper);
    }

    /**
     * Get roles for a given user.
     * NOTE: This method is not yet implemented.
     *
     * @param userId the user ID
     * @return throws UnsupportedOperationException
     * @throws UnsupportedOperationException always
     */
    public List<AdminRole> getUserRoles(Long userId) {
        log.warn("getUserRoles() called but not implemented for userId: {}", userId);
        throw new UnsupportedOperationException(
                "getUserRoles() is not yet implemented. Use AdminUserRoleService.getUserRoles() to get role associations, then resolve role details.");
    }
}
