package com.sling.emergency.service;

import com.sling.emergency.entity.EmergencyHelp;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface EmergencyHelpService {

    /**
     * 保存紧急求助记录
     */
    boolean saveEmergencyHelp(EmergencyHelp emergencyHelp);

    /**
     * 根据ID获取紧急求助记录
     */
    EmergencyHelp getEmergencyHelpById(Long id);

    /**
     * 获取紧急求助历史记录
     */
    List<EmergencyHelp> getEmergencyHistory();

    /**
     * 触发报警机制
     */
    boolean triggerAlert(Long id);

    /**
     * 更新紧急求助记录
     */
    boolean updateEmergencyHelp(EmergencyHelp emergencyHelp);

    /**
     * 分页获取求助列表（支持状态和类型筛选）
     */
    List<EmergencyHelp> getEmergencyHelpList(String status, String type, int page, int size);

    /**
     * 获取求助总数（支持筛选）
     */
    int getEmergencyHelpCount(String status, String type);

    /**
     * 获取各状态统计
     */
    Map<String, Long> getEmergencyHelpStats();

    /**
     * 获取指定时间之后的新求助（用于实时轮询）
     */
    List<EmergencyHelp> getLatestEmergencyHelps(Date since);

    /**
     * 更新求助状态
     */
    boolean updateStatus(Long id, String status);
}