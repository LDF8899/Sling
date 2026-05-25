package com.sling.admin.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.admin.entity.AdminUserRole;
import com.sling.admin.mapper.AdminUserRoleMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Admin user-role association service.
 * Manages the relationship between admin users and roles.
 */
@Slf4j
@Service
public class AdminUserRoleService extends ServiceImpl<AdminUserRoleMapper, AdminUserRole> {

    private final AdminUserRoleMapper adminUserRoleMapper;

    public AdminUserRoleService(AdminUserRoleMapper adminUserRoleMapper) {
        this.adminUserRoleMapper = adminUserRoleMapper;
    }

    public List<AdminUserRole> getUserRoles(Long userId) {
        QueryWrapper<AdminUserRole> wrapper = new QueryWrapper<>();
        wrapper.eq("admin_user_id", userId).eq("del_flag", 0);
        return adminUserRoleMapper.selectList(wrapper);
    }

    public List<Map<String, Object>> getUserRoleDetails(Long userId) {
        return adminUserRoleMapper.selectUserRolesWithDetails(userId);
    }

    /**
     * Assign a role to an admin user. Does nothing if the association already exists.
     *
     * @param userId the admin user ID
     * @param roleId the role ID
     * @return true if assigned or already exists
     */
    public boolean assignRoleToUser(Long userId, Long roleId) {
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
