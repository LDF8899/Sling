package com.sling.recognition.feign;

import com.sling.common.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 蛇类信息服务降级处理
 */
@Slf4j
@Component
public class SnakeInfoFeignFallback implements FallbackFactory<SnakeInfoFeignClient> {

    @Override
    public SnakeInfoFeignClient create(Throwable cause) {
        log.error("蛇类信息服务调用失败", cause);
        return new SnakeInfoFeignClient() {
            @Override
            public Result<Map<String, Object>> getByName(String name) {
                return Result.fail("蛇类信息服务暂不可用: " + cause.getMessage());
            }
        };
    }
}
