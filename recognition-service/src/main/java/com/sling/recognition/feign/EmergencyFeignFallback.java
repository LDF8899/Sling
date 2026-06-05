package com.sling.recognition.feign;

import com.sling.common.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

import java.util.Map;

/**
 * 急救信息服务降级处理
 */
@Slf4j
@Component
public class EmergencyFeignFallback implements FallbackFactory<EmergencyFeignClient> {

    @Override
    public EmergencyFeignClient create(Throwable cause) {
        log.error("急救信息服务调用失败", cause);
        return new EmergencyFeignClient() {
            @Override
            public Result<Map<String, Object>> getBySnakeName(String snakeName) {
                return Result.fail("急救信息服务暂不可用: " + cause.getMessage());
            }
        };
    }
}
