package com.sling.emergency.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.sling.emergency.entity.EmergencyHelp;
import com.sling.emergency.mapper.EmergencyHelpMapper;
import com.sling.emergency.service.EmergencyHelpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Implementation of {@link EmergencyHelpService} using MyBatis-Plus.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class EmergencyHelpServiceImpl implements EmergencyHelpService {

    private final EmergencyHelpMapper emergencyHelpMapper;

    @Override
    public boolean saveEmergencyHelp(EmergencyHelp emergencyHelp) {
        try {
            emergencyHelp.setCreateTime(new Date());
            emergencyHelp.setUpdateTime(new Date());

            int result = emergencyHelpMapper.insert(emergencyHelp);
            log.info("Saved emergency help record, id: {}, result: {}", emergencyHelp.getId(),
                    result > 0 ? "success" : "failure");
            return result > 0;
        } catch (Exception e) {
            log.error("Error saving emergency help record", e);
            return false;
        }
    }

    @Override
    public EmergencyHelp getEmergencyHelpById(Long id) {
        try {
            return emergencyHelpMapper.selectById(id);
        } catch (Exception e) {
            log.error("Error fetching emergency help by id: {}", id, e);
            return null;
        }
    }

    @Override
    public List<EmergencyHelp> getEmergencyHistory() {
        try {
            QueryWrapper<EmergencyHelp> queryWrapper = new QueryWrapper<>();
            queryWrapper.orderByDesc("create_time");
            return emergencyHelpMapper.selectList(queryWrapper);
        } catch (Exception e) {
            log.error("Error fetching emergency help history", e);
            return null;
        }
    }

    @Override
    public boolean triggerAlert(Long id) {
        try {
            EmergencyHelp emergencyHelp = emergencyHelpMapper.selectById(id);
            if (emergencyHelp == null) {
                log.warn("Alert trigger failed -- record not found, id: {}", id);
                return false;
            }

            emergencyHelp.setIsAlerted(true);
            emergencyHelp.setAlertTime(new Date());
            emergencyHelp.setUpdateTime(new Date());
            emergencyHelp.setStatus("processing");

            int result = emergencyHelpMapper.updateById(emergencyHelp);

            if (result > 0) {
                log.info("Alert triggered successfully, id: {}", id);
                sendAlertNotification(emergencyHelp);
                return true;
            } else {
                log.error("Failed to update alert status, id: {}", id);
                return false;
            }
        } catch (Exception e) {
            log.error("Error triggering alert for id: {}", id, e);
            return false;
        }
    }

    @Override
    public boolean updateEmergencyHelp(EmergencyHelp emergencyHelp) {
        try {
            emergencyHelp.setUpdateTime(new Date());
            int result = emergencyHelpMapper.updateById(emergencyHelp);
            return result > 0;
        } catch (Exception e) {
            log.error("Error updating emergency help record", e);
            return false;
        }
    }

    @Override
    public List<EmergencyHelp> getEmergencyHelpList(String status, String type, int page, int size) {
        try {
            QueryWrapper<EmergencyHelp> queryWrapper = new QueryWrapper<>();
            if (status != null && !status.isEmpty()) {
                queryWrapper.eq("status", status);
            }
            if (type != null && !type.isEmpty()) {
                queryWrapper.eq("type", type);
            }
            queryWrapper.orderByDesc("create_time");
            queryWrapper.last("LIMIT " + ((page - 1) * size) + ", " + size);
            return emergencyHelpMapper.selectList(queryWrapper);
        } catch (Exception e) {
            log.error("Error fetching emergency help list", e);
            return null;
        }
    }

    @Override
    public int getEmergencyHelpCount(String status, String type) {
        try {
            QueryWrapper<EmergencyHelp> queryWrapper = new QueryWrapper<>();
            if (status != null && !status.isEmpty()) {
                queryWrapper.eq("status", status);
            }
            if (type != null && !type.isEmpty()) {
                queryWrapper.eq("type", type);
            }
            return emergencyHelpMapper.selectCount(queryWrapper).intValue();
        } catch (Exception e) {
            log.error("Error counting emergency help records", e);
            return 0;
        }
    }

    @Override
    public Map<String, Long> getEmergencyHelpStats() {
        try {
            Map<String, Long> stats = new java.util.HashMap<>();
            stats.put("pending", emergencyHelpMapper.selectCount(
                    new QueryWrapper<EmergencyHelp>().eq("status", "pending")));
            stats.put("processing", emergencyHelpMapper.selectCount(
                    new QueryWrapper<EmergencyHelp>().eq("status", "processing")));
            stats.put("resolved", emergencyHelpMapper.selectCount(
                    new QueryWrapper<EmergencyHelp>().eq("status", "resolved")));
            stats.put("total", stats.get("pending") + stats.get("processing") + stats.get("resolved"));
            return stats;
        } catch (Exception e) {
            log.error("Error getting emergency help stats", e);
            return null;
        }
    }

    @Override
    public List<EmergencyHelp> getLatestEmergencyHelps(Date since) {
        try {
            QueryWrapper<EmergencyHelp> queryWrapper = new QueryWrapper<>();
            queryWrapper.gt("create_time", since);
            queryWrapper.orderByDesc("create_time");
            return emergencyHelpMapper.selectList(queryWrapper);
        } catch (Exception e) {
            log.error("Error fetching latest emergency helps", e);
            return null;
        }
    }

    @Override
    public boolean updateStatus(Long id, String status) {
        try {
            EmergencyHelp help = emergencyHelpMapper.selectById(id);
            if (help == null) {
                log.warn("Help record not found for status update, id: {}", id);
                return false;
            }
            help.setStatus(status);
            help.setUpdateTime(new Date());
            int result = emergencyHelpMapper.updateById(help);
            return result > 0;
        } catch (Exception e) {
            log.error("Error updating help status for id: {}", id, e);
            return false;
        }
    }

    /**
     * Send alert notification (placeholder for future SMS/email/push integration).
     */
    private void sendAlertNotification(EmergencyHelp emergencyHelp) {
        log.info("Sending alert notification -- id: {}, type: {}, location: {}",
                emergencyHelp.getId(), emergencyHelp.getType(), emergencyHelp.getLocation());
        // TODO: Integrate with real notification services (SMS, email, push)
    }
}
