package com.sling.hospital.controller;

import com.sling.common.utils.Result;
import com.sling.hospital.entity.HospitalInfo;
import com.sling.hospital.entity.dto.HospitalSearchDTO;
import com.sling.hospital.entity.dto.RouteDTO;
import com.sling.hospital.service.HospitalGeoService;
import com.sling.hospital.service.HospitalInfoService;
import com.sling.hospital.service.HospitalSearchService;
import com.sling.hospital.service.PythonIntegrationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * REST controller for hospital map, geocoding, routing, and search.
 */
@Slf4j
@RestController
@RequestMapping("/api/hospital")
@RequiredArgsConstructor
public class HospitalMapController {

    private final PythonIntegrationService pythonIntegrationService;
    private final HospitalSearchService hospitalSearchService;
    private final HospitalInfoService hospitalInfoService;
    private final HospitalGeoService hospitalGeoService;

    /**
     * Convert address to coordinates (geocoding).
     */
    @GetMapping("/geocode")
    public Result<?> geocode(@RequestParam String address, @RequestParam(required = false) String city) {
        try {
            Map<String, Object> result = pythonIntegrationService.addressToCoordinate(address, city);
            return Result.success(result);
        } catch (Exception e) {
            log.error("Geocoding failed for address: {}", address, e);
            return Result.fail("Address resolution failed: " + e.getMessage());
        }
    }

    /**
     * Convert coordinates to address (reverse geocoding).
     */
    @GetMapping("/reverse-geocode")
    public Result<?> reverseGeocode(@RequestParam Double lon, @RequestParam Double lat) {
        try {
            Map<String, Object> result = pythonIntegrationService.coordinateToAddress(lon, lat);
            return Result.success(result);
        } catch (Exception e) {
            log.error("Reverse geocoding failed for ({}, {})", lon, lat, e);
            return Result.fail("Coordinate resolution failed: " + e.getMessage());
        }
    }

    /**
     * Get driving route between two points.
     */
    @PostMapping("/route/driving")
    public Result<?> getDrivingRoute(@RequestBody RouteDTO routeDTO) {
        try {
            Map<String, Object> result = pythonIntegrationService.getDrivingRoute(
                    routeDTO.getStartLon(),
                    routeDTO.getStartLat(),
                    routeDTO.getEndLon(),
                    routeDTO.getEndLat(),
                    routeDTO.getStrategy()
            );
            return Result.success(result);
        } catch (Exception e) {
            log.error("Driving route planning failed", e);
            return Result.fail("Route planning failed: " + e.getMessage());
        }
    }

    /**
     * Get walking route between two points.
     */
    @PostMapping("/route/walking")
    public Result<?> getWalkingRoute(@RequestBody RouteDTO routeDTO) {
        try {
            Map<String, Object> result = pythonIntegrationService.getWalkingRoute(
                    routeDTO.getStartLon(),
                    routeDTO.getStartLat(),
                    routeDTO.getEndLon(),
                    routeDTO.getEndLat()
            );
            return Result.success(result);
        } catch (Exception e) {
            log.error("Walking route planning failed", e);
            return Result.fail("Route planning failed: " + e.getMessage());
        }
    }

    /**
     * Search for nearby hospitals.
     */
    @PostMapping("/search")
    public Result<?> searchHospitals(@RequestBody HospitalSearchDTO searchDTO) {
        try {
            List<HospitalInfo> hospitals = hospitalSearchService.searchHospitals(searchDTO);
            return Result.success(hospitals);
        } catch (Exception e) {
            log.error("Hospital search failed", e);
            return Result.fail("Search failed: " + e.getMessage());
        }
    }

    /**
     * Find nearby hospitals supporting snake-venom treatment (mini-program endpoint).
     */
    @PostMapping("/snake-venom/nearby")
    public Result<?> getNearbySnakeVenomHospitals(@RequestBody Map<String, Object> params) {
        try {
            Double longitude = null;
            Double latitude = null;
            Integer radius = 5000;

            if (params.containsKey("longitude")) {
                longitude = Double.valueOf(params.get("longitude").toString());
            }
            if (params.containsKey("latitude")) {
                latitude = Double.valueOf(params.get("latitude").toString());
            }
            if (params.containsKey("radius")) {
                radius = Integer.valueOf(params.get("radius").toString());
            }

            HospitalSearchDTO searchDTO = new HospitalSearchDTO();
            searchDTO.setUserInput(longitude + "," + latitude);
            searchDTO.setRadius(radius);
            searchDTO.setKeyword("hospital");
            searchDTO.setMaxResults(20);

            List<HospitalInfo> hospitals = hospitalSearchService.searchHospitals(searchDTO);
            return Result.success(hospitals);
        } catch (Exception e) {
            log.error("Snake venom hospital search failed", e);
            return Result.fail("Search failed: " + e.getMessage());
        }
    }

    /**
     * 查询有特定蛇种血清的医院列表
     * @param snakeId 蛇类ID
     * @return 医院列表，包含血清库存信息
     */
    @GetMapping("/with-serum/{snakeId}")
    public Result<?> getHospitalsWithSerum(@PathVariable Long snakeId) {
        try {
            List<Map<String, Object>> hospitals = hospitalInfoService.getHospitalsWithSerum(snakeId);
            return Result.success(hospitals);
        } catch (Exception e) {
            log.error("查询有血清的医院失败", e);
            return Result.fail("查询失败: " + e.getMessage());
        }
    }

    /**
     * 基于 Redis GEO 查找附近有指定蛇种血清的医院（Agent 调度用）
     */
    @GetMapping("/nearby-with-serum")
    public Result<?> findNearbyWithSerum(
            @RequestParam Double lng,
            @RequestParam Double lat,
            @RequestParam Long snakeId,
            @RequestParam(defaultValue = "50") Double radiusKm,
            @RequestParam(defaultValue = "5") Integer limit) {
        try {
            List<Map<String, Object>> hospitals =
                    hospitalGeoService.findNearbyHospitalsWithSerum(lng, lat, snakeId, radiusKm, limit);
            return Result.success(hospitals);
        } catch (Exception e) {
            log.error("GEO 查询附近有血清医院失败", e);
            return Result.fail("查询失败: " + e.getMessage());
        }
    }
}
