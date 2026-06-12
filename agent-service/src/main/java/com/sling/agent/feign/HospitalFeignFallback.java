package com.sling.agent.feign;

import com.sling.common.utils.Result;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.openfeign.FallbackFactory;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class HospitalFeignFallback implements FallbackFactory<HospitalFeignClient> {

    @Override
    public HospitalFeignClient create(Throwable cause) {
        log.error("HospitalFeignClient fallback: {}", cause.getMessage());
        return new HospitalFeignClient() {
            @Override
            public Result<List<Map<String, Object>>> getHospitalsWithSerum(Long snakeId) {
                return Result.fail("医院服务不可用: " + cause.getMessage());
            }

            @Override
            public Result<List<Map<String, Object>>> findNearbyWithSerum(
                    Double lng, Double lat, Long snakeId, Double radiusKm, Integer limit) {
                return Result.fail("医院服务不可用: " + cause.getMessage());
            }

            @Override
            public Result<Map<String, Object>> geocode(String address) {
                return Result.fail("地理编码服务不可用: " + cause.getMessage());
            }
        };
    }
}
