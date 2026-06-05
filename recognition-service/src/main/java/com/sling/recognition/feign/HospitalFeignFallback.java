package com.sling.recognition.feign;

import com.sling.common.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

/**
 * 医院服务降级处理
 */
@Slf4j
@Component
public class HospitalFeignFallback implements FallbackFactory<HospitalFeignClient> {

    @Override
    public HospitalFeignClient create(Throwable cause) {
        log.error("医院服务调用失败", cause);
        return new HospitalFeignClient() {
            @Override
            public Result<List<Map<String, Object>>> getHospitalsWithSerum(Long snakeId) {
                return Result.fail("医院服务暂不可用: " + cause.getMessage());
            }
        };
    }
}
