package com.sling.warning.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.warning.entity.WarningRecord;

import java.util.List;

public interface WarningRecordService extends IService<WarningRecord> {
    /**
     * 查询最近的预警记录
     * @param limit 限制条数
     * @param riskLevel 风险等级
     * @return 预警记录列表
     */
    List<WarningRecord> getRecentWarnings(Integer limit, Integer riskLevel);
}