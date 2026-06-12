package com.sling.agent.feign;

import com.sling.common.utils.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * 急救服务 Feign 客户端 — 查询急救信息 + 更新 SOS 状态
 */
@FeignClient(name = "emergency-service", fallbackFactory = EmergencyFeignFallback.class)
public interface EmergencyFeignClient {

    /**
     * 获取蛇伤急救指南
     */
    @GetMapping("/api/emergency/guide/snake/{name}")
    Result<Map<String, Object>> getSnakeGuide(@PathVariable("name") String snakeName);

    /**
     * 更新 SOS 状态
     */
    @PutMapping("/api/emergency/help/{id}/status")
    Result<String> updateStatus(@PathVariable("id") Long id, @RequestParam("status") String status);
}
