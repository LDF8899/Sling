package com.sling.recognition.feign;

import com.sling.common.utils.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

/**
 * 急救信息服务 Feign 客户端
 */
@FeignClient(name = "emergency-service", fallbackFactory = EmergencyFeignFallback.class)
public interface EmergencyFeignClient {

    /**
     * 根据蛇名查询急救信息
     */
    @GetMapping("/api/emergency/guide/{snakeName}")
    Result<Map<String, Object>> getBySnakeName(@PathVariable("snakeName") String snakeName);
}
