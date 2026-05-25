package com.sling.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.user.entity.UserPermission;
import com.sling.user.mapper.UserPermissionMapper;
import com.sling.user.service.UserPermissionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * User permission service implementation.
 */
@Slf4j
@Service
public class UserPermissionServiceImpl extends ServiceImpl<UserPermissionMapper, UserPermission> implements UserPermissionService {
    private final UserPermissionMapper userPermissionMapper;

    public UserPermissionServiceImpl(UserPermissionMapper userPermissionMapper) {
        this.userPermissionMapper = userPermissionMapper;
    }

    @Override
    public List<UserPermission> getPermissionsByUserId(Long userId) {
        return userPermissionMapper.selectByUserId(userId);
    }
}
