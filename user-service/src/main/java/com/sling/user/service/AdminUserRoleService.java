package com.sling.user.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.user.entity.AdminUserRole;
import com.sling.user.mapper.AdminUserRoleMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Admin user-role association service for user-service.
 * Manages the relationship between admin users and roles.
 *
 * NOTE: This is a duplicate of the AdminUserRoleService in admin-service.
 * The authoritative admin user-role management lives in admin-service.
 */
@Slf4j
@Service
public class AdminUserRoleService extends ServiceImpl<AdminUserRoleMapper, AdminUserRole> {

    private final AdminUserRoleMapper adminUserRoleMapper;

    public AdminUserRoleService(AdminUserRoleMapper adminUserRoleMapper) {
        this.adminUserRoleMapper = adminUserRoleMapper;
    }

    /**
     * Get all role associations for a given admin user.
     *
     * @param userId the admin user ID
     * @return list of AdminUserRole associations
     */
    public List<AdminUserRole> getUserRoles(Long userId) {
        QueryWrapper<AdminUserRole> wrapper = new QueryWrapper<>();
        wrapper.eq("admin_user_id", userId).eq("del_flag", 0);
        return adminUserRoleMapper.selectList(wrapper);
    }

    /**
     * Assign a role to an admin user. Does nothing if the association already exists.
     *
     * @param userId the admin user ID
     * @param roleId the role ID
     * @return true if assigned or already exists
     */
    public boolean assignRoleToUser(Long userId, Long roleId) {
        // Check if the relationship already exists
        QueryWrapper<AdminUserRole> wrapper = new QueryWrapper<>();
        wrapper.eq("admin_user_id", userId).eq("role_id", roleId);
        AdminUserRole existing = adminUserRoleMapper.selectOne(wrapper);

        if (existing == null) {
            AdminUserRole userRole = new AdminUserRole();
            userRole.setAdminUserId(userId);
            userRole.setRoleId(roleId);
            return adminUserRoleMapper.insert(userRole) > 0;
        }
        return true;
    }

    /**
     * Remove a specific role from an admin user.
     *
     * @param userId the admin user ID
     * @param roleId the role ID
     * @return true if removed
     */
    public boolean removeRoleFromUser(Long userId, Long roleId) {
        QueryWrapper<AdminUserRole> wrapper = new QueryWrapper<>();
        wrapper.eq("admin_user_id", userId).eq("role_id", roleId);
        return adminUserRoleMapper.delete(wrapper) > 0;
    }

    /**
     * Remove all roles from an admin user.
     *
     * @param userId the admin user ID
     * @return true if removed
     */
    public boolean removeAllRolesForUser(Long userId) {
        QueryWrapper<AdminUserRole> wrapper = new QueryWrapper<>();
        wrapper.eq("admin_user_id", userId);
        return adminUserRoleMapper.delete(wrapper) > 0;
    }
}
