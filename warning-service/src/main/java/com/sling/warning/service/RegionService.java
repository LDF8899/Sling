package com.sling.warning.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.warning.entity.Region;

import java.util.List;
import java.util.Map;

public interface RegionService extends IService<Region> {

    /**
     * 获取完整的区域树（三级：大区→省/市→具体区域）
     */
    List<Map<String, Object>> getRegionTree();

    /**
     * 获取指定层级的区域列表
     * @param level 层级（1/2/3），null 返回全部
     * @param parentId 父区域ID，null 且 level!=1 时返回该层级全部
     */
    List<Region> getRegions(Integer level, Long parentId);
}
