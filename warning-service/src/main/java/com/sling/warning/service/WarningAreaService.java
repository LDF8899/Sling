package com.sling.warning.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.warning.entity.WarningArea;

import java.util.List;
import java.util.Map;

public interface WarningAreaService extends IService<WarningArea> {

    /**
     * 检测用户坐标是否在预警区域内
     *
     * @param lng 经度
     * @param lat 纬度
     * @return 命中的预警区域列表
     */
    List<Map<String, Object>> checkProximity(Double lng, Double lat);
}
