package com.sling.agent.feign;

import com.sling.common.utils.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

/**
 * 蛇种信息服务 Feign 客户端 — 查询蛇种详情
 */
@FeignClient(name = "snake-info-service", fallbackFactory = SnakeInfoFeignFallback.class)
public interface SnakeInfoFeignClient {

    /**
     * 根据蛇名获取蛇种详情
     */
    @GetMapping("/snake/name/{name}")
    Result<Map<String, Object>> getSnakeByName(@PathVariable("name") String name);

    /**
     * 根据 ID 获取蛇种详情
     */
    @GetMapping("/snake/{id}")
    Result<Map<String, Object>> getSnakeById(@PathVariable("id") Long id);
}
