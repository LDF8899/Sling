package com.sling.recognition.feign;

import com.sling.common.utils.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

/**
 * 蛇类信息服务 Feign 客户端
 */
@FeignClient(name = "snake-info-service", fallbackFactory = SnakeInfoFeignFallback.class)
public interface SnakeInfoFeignClient {

    /**
     * 根据蛇名精确查询
     */
    @GetMapping("/snake/by-name/{name}")
    Result<Map<String, Object>> getByName(@PathVariable("name") String name);
}
