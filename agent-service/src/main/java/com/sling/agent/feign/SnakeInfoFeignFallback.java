package com.sling.agent.feign;

import com.sling.common.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
public class SnakeInfoFeignFallback implements FallbackFactory<SnakeInfoFeignClient> {

    @Override
    public SnakeInfoFeignClient create(Throwable cause) {
        log.error("SnakeInfoFeignClient fallback: {}", cause.getMessage());
        return new SnakeInfoFeignClient() {
            @Override
            public Result<Map<String, Object>> getSnakeByName(String name) {
                return Result.fail("蛇种信息服务不可用: " + cause.getMessage());
            }

            @Override
            public Result<Map<String, Object>> getSnakeById(Long id) {
                return Result.fail("蛇种信息服务不可用: " + cause.getMessage());
            }
        };
    }
}
