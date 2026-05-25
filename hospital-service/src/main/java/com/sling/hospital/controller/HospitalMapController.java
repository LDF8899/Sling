package com.sling.hospital.controller;

import com.sling.common.utils.Result;
import com.sling.hospital.entity.HospitalInfo;
import com.sling.hospital.entity.dto.HospitalSearchDTO;
import com.sling.hospital.entity.dto.RouteDTO;
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
}
