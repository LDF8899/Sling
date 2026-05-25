package com.sling.warning.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.warning.entity.SnakeInfo;
import com.sling.warning.mapper.SnakeInfoMapper;
import com.sling.warning.service.SnakeInfoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

/**
 * 蛇类信息服务实现
 *
 * <p>提供蛇类基础信息的查询功能。
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class SnakeInfoServiceImpl extends ServiceImpl<SnakeInfoMapper, SnakeInfo> implements SnakeInfoService {
}
