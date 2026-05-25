package com.sling.user.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.user.entity.User;
import com.sling.user.mapper.UserMapper;
import com.sling.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * User service implementation.
 * Provides MyBatis-Plus CRUD operations for User entities.
 */
@Slf4j
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {
}
