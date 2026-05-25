package com.sling.admin.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.admin.entity.SystemConfig;
import com.sling.admin.mapper.SystemConfigMapper;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SystemConfigService extends ServiceImpl<SystemConfigMapper, SystemConfig> {

    private final SystemConfigMapper mapper;

    public SystemConfigService(SystemConfigMapper mapper) {
        this.mapper = mapper;
    }

    public Map<String, String> getConfigsByGroup(String group) {
        QueryWrapper<SystemConfig> wrapper = new QueryWrapper<>();
        wrapper.eq("config_group", group);
        return mapper.selectList(wrapper).stream()
                .collect(Collectors.toMap(SystemConfig::getConfigKey, SystemConfig::getConfigValue));
    }

    public Map<String, Map<String, String>> getAllConfigsGrouped() {
        return mapper.selectList(null).stream()
                .collect(Collectors.groupingBy(
                        SystemConfig::getConfigGroup,
                        Collectors.toMap(SystemConfig::getConfigKey, SystemConfig::getConfigValue)
                ));
    }

    public void saveConfigs(String group, Map<String, String> configs) {
        for (Map.Entry<String, String> entry : configs.entrySet()) {
            QueryWrapper<SystemConfig> wrapper = new QueryWrapper<>();
            wrapper.eq("config_key", entry.getKey());
            SystemConfig existing = mapper.selectOne(wrapper);
            if (existing != null) {
                existing.setConfigValue(entry.getValue());
                mapper.updateById(existing);
            } else {
                SystemConfig sc = new SystemConfig();
                sc.setConfigKey(entry.getKey());
                sc.setConfigValue(entry.getValue());
                sc.setConfigGroup(group);
                mapper.insert(sc);
            }
        }
    }
}
