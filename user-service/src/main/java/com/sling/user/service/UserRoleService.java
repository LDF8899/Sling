package com.sling.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.user.entity.Role;
import com.sling.user.entity.UserRole;

import java.util.List;

public interface UserRoleService extends IService<UserRole> {
    /**
     * 根据用户ID获取用户角色列表
     * @param userId 用户ID
     * @return 角色列表
     */
    List<Role> getRolesByUserId(Long userId);
}