package com.sling.snakeinfo.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.snakeinfo.entity.SnakeInfo;
import org.apache.ibatis.annotations.Mapper;

/**
 * 蛇类信息 Mapper
 */
@Mapper
public interface SnakeInfoMapper extends BaseMapper<SnakeInfo> {
}
