package com.sling.user.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.user.entity.AdminUser;
import com.sling.user.mapper.AdminUserMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Admin user service for user-service.
 * Manages AdminUser entities within the user-service context.
 *
 * NOTE: This is a duplicate of the AdminUserService in admin-service.
 * This copy supports admin features embedded in user-service (e.g., admin login).
 * The authoritative admin user management lives in admin-service.
 */
@Slf4j
@Service
public class AdminUserService extends ServiceImpl<AdminUserMapper, AdminUser> {

    private final AdminUserMapper adminUserMapper;

    public AdminUserService(AdminUserMapper adminUserMapper) {
        this.adminUserMapper = adminUserMapper;
    }

    /**
     * Find an active admin user by username.
     *
     * @param username the username to search for
     * @return the AdminUser or null if not found
     */
    public AdminUser findByUsername(String username) {
        QueryWrapper<AdminUser> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username).eq("del_flag", 0).eq("status", 1);
        return adminUserMapper.selectOne(wrapper);
    }

    /**
     * Update last login time and IP for an admin user.
     *
     * @param adminId the admin user ID
     * @param ip      the IP address
     * @return true if updated successfully
     */
    public boolean updateLastLoginInfo(Long adminId, String ip) {
        AdminUser user = new AdminUser();
        user.setAdminId(adminId);
        user.setLastLoginTime(LocalDateTime.now());
        user.setLastLoginIp(ip);
        return adminUserMapper.updateById(user) > 0;
    }

    /**
     * Get all active admin users.
     *
     * @return list of active admin users
     */
    public List<AdminUser> getAllActiveAdmins() {
        QueryWrapper<AdminUser> wrapper = new QueryWrapper<>();
        wrapper.eq("del_flag", 0).eq("status", 1);
        return adminUserMapper.selectList(wrapper);
    }

    /**
     * Change password for an admin user.
     *
     * @param adminId     the admin user ID
     * @param newPassword the new password (should be pre-hashed)
     * @return true if updated
     */
    public boolean changePassword(Long adminId, String newPassword) {
        AdminUser user = new AdminUser();
        user.setAdminId(adminId);
        user.setPassword(newPassword);
        return adminUserMapper.updateById(user) > 0;
    }

    /**
     * Toggle the status of an admin user.
     *
     * @param adminId the admin user ID
     * @param status  the new status
     * @return true if updated
     */
    public boolean toggleStatus(Long adminId, Integer status) {
        AdminUser user = new AdminUser();
        user.setAdminId(adminId);
        user.setStatus(status);
        return adminUserMapper.updateById(user) > 0;
    }
}
