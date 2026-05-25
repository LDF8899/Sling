package com.sling.warning.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.warning.entity.WarningRecord;
import com.sling.warning.mapper.WarningRecordMapper;
import com.sling.warning.service.WarningRecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 预警记录服务实现
 *
 * <p>提供预警记录的查询功能。
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class WarningRecordServiceImpl extends ServiceImpl<WarningRecordMapper, WarningRecord> implements WarningRecordService {

    private final WarningRecordMapper warningRecordMapper;

    /**
     * 查询最近的预警记录
     *
     * @param limit     限制条数
     * @param riskLevel 风险等级
     * @return 预警记录列表
     */
    @Override
    public List<WarningRecord> getRecentWarnings(Integer limit, Integer riskLevel) {
        return warningRecordMapper.selectRecentWarnings(limit, riskLevel);
    }
}
