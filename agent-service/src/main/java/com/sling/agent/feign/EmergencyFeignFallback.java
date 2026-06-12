package com.sling.agent.feign;

import com.sling.common.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

@Slf4j
@Component
public class EmergencyFeignFallback implements FallbackFactory<EmergencyFeignClient> {

    @Override
    public EmergencyFeignClient create(Throwable cause) {
        log.error("EmergencyFeignClient fallback: {}", cause.getMessage());
        return new EmergencyFeignClient() {
            @Override
            public Result<Map<String, Object>> getSnakeGuide(String snakeName) {
                return Result.fail("急救服务不可用: " + cause.getMessage());
            }

            @Override
            public Result<String> updateStatus(Long id, String status) {
                return Result.fail("急救服务不可用: " + cause.getMessage());
            }
        };
    }
}
