package com.sling.admin.controller;

import com.sling.admin.service.SystemConfigService;
import com.sling.common.utils.Result;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin/config")
public class SystemConfigController {

    private final SystemConfigService configService;

    public SystemConfigController(SystemConfigService configService) {
        this.configService = configService;
    }

    @GetMapping
    public Result getConfigs() {
        return Result.success(configService.getAllConfigsGrouped());
    }

    @GetMapping("/{group}")
    public Result getConfigsByGroup(@PathVariable String group) {
        return Result.success(configService.getConfigsByGroup(group));
    }

    @PutMapping("/{group}")
    public Result saveConfigs(@PathVariable String group, @RequestBody Map<String, String> configs) {
        configService.saveConfigs(group, configs);
        return Result.success("配置保存成功");
    }
}
