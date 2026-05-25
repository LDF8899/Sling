package com.sling.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.user.entity.UserPermission;

import java.util.List;

public interface UserPermissionService extends IService<UserPermission> {
    /**
     * 根据用户ID获取用户权限列表
     * @param userId 用户ID
     * @return 权限列表
     */
    List<UserPermission> getPermissionsByUserId(Long userId);
}