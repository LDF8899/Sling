package com.sling.warning.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.warning.entity.ActiveArea;

import java.util.List;

public interface ActiveAreaService extends IService<ActiveArea> {
    /**
     * 查询所有风险区域
     */
    List<ActiveArea> getAllActiveAreas();
}