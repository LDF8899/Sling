package com.sling.recognition.feign;

import com.sling.common.utils.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

/**
 * 医院服务 Feign 客户端
 */
@FeignClient(name = "hospital-service", fallbackFactory = HospitalFeignFallback.class)
public interface HospitalFeignClient {

    /**
     * 查询有特定蛇种血清的医院列表
     */
    @GetMapping("/api/hospital/with-serum/{snakeId}")
    Result<List<Map<String, Object>>> getHospitalsWithSerum(@PathVariable("snakeId") Long snakeId);
}
