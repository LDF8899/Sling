package com.sling.admin.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.admin.entity.AdminRole;
import com.sling.admin.mapper.AdminRoleMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin role service.
 * Provides CRUD and business operations for AdminRole entities.
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
     * Get roles for a given admin user.
     * NOTE: This method is not yet implemented.
     *
     * @param userId the admin user ID
     * @return throws UnsupportedOperationException
     * @throws UnsupportedOperationException always - use AdminUserRoleService.getUserRoles()
     *                                       to get role associations, then resolve role details
     */
    public List<AdminRole> getUserRoles(Long userId) {
        throw new UnsupportedOperationException(
                "getUserRoles() is not yet implemented. Use AdminUserRoleService.getUserRoles() "
                + "to get role associations for userId=" + userId + ", then resolve role details.");
    }
}
