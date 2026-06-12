package com.sling.snakeinfo.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.snakeinfo.entity.SnakeInfo;

import java.util.List;

/**
 * 蛇类信息服务接口
 */
public interface SnakeInfoService extends IService<SnakeInfo> {

    /**
     * 根据蛇名精确查询
     */
    SnakeInfo getByName(String snakeName);

    /**
     * 根据蛇名模糊查询
     */
    List<SnakeInfo> searchByName(String keyword);

    /**
     * 按毒性等级查询
     */
    List<SnakeInfo> getByToxicityLevel(Integer level);

    /**
     * 按保护状态查询
     */
    List<SnakeInfo> getByConservationStatus(String status);
}
