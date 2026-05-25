package com.sling.warning.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.warning.entity.ActiveArea;

import java.util.List;

public interface ActiveAreaService extends IService<ActiveArea> {
    /**
     * 根据风险等级和毒性等级查询风险区域
     * @param riskLevels 风险等级列表
     * @param toxicityLevels 毒性等级列表
     * @return 风险区域列表
     */
    List<ActiveArea> getActiveAreasByRiskAndToxicity(List<Integer> riskLevels, List<Integer> toxicityLevels);
}