package com.sling.snakeinfo.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.snakeinfo.entity.SnakeInfo;
import com.sling.snakeinfo.mapper.SnakeInfoMapper;
import com.sling.snakeinfo.service.SnakeInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 蛇类信息服务实现
 */
@Slf4j
@Service
public class SnakeInfoServiceImpl extends ServiceImpl<SnakeInfoMapper, SnakeInfo> implements SnakeInfoService {

    @Override
    public List<SnakeInfo> searchByName(String keyword) {
        return list(new QueryWrapper<SnakeInfo>()
                .like("snake_name", keyword)
                .orderByDesc("toxicity_level"));
    }

    @Override
    public List<SnakeInfo> getByToxicityLevel(Integer level) {
        return list(new QueryWrapper<SnakeInfo>()
                .eq("toxicity_level", level)
                .orderByAsc("snake_name"));
    }

    @Override
    public List<SnakeInfo> getByConservationStatus(String status) {
        return list(new QueryWrapper<SnakeInfo>()
                .eq("conservation_status", status)
                .orderByAsc("snake_name"));
    }
}
