package com.sling.agent.feign;

import com.sling.common.utils.Result;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;

/**
 * 医院服务 Feign 客户端 — 查询医院 + 血清库存
 */
@FeignClient(name = "hospital-service", fallbackFactory = HospitalFeignFallback.class)
public interface HospitalFeignClient {

    /**
     * 获取有指定蛇种血清的医院列表
     */
    @GetMapping("/api/hospital/with-serum/{snakeId}")
    Result<List<Map<String, Object>>> getHospitalsWithSerum(@PathVariable("snakeId") Long snakeId);

    /**
     * 基于 Redis GEO 查找附近有指定蛇种血清的医院
     */
    @GetMapping("/api/hospital/nearby-with-serum")
    Result<List<Map<String, Object>>> findNearbyWithSerum(
            @RequestParam("lng") Double lng,
            @RequestParam("lat") Double lat,
            @RequestParam("snakeId") Long snakeId,
            @RequestParam(value = "radiusKm", defaultValue = "50") Double radiusKm,
            @RequestParam(value = "limit", defaultValue = "5") Integer limit);

    /**
     * 地理编码：地址 → 经纬度
     */
    @GetMapping("/api/hospital/geocode")
    Result<Map<String, Object>> geocode(@RequestParam("address") String address);
}
