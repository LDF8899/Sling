package com.sling.hospital.service;

import com.sling.hospital.entity.HospitalInfo;
import com.sling.hospital.entity.dto.HospitalSearchDTO;
import com.sling.hospital.mapper.HospitalInfoMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Service for searching nearby hospitals.
 * <p>
 * Prioritizes real-time data from the Python/Amap integration;
 * falls back to database search if the Python script fails.
 */
@Slf4j
@Service
@RequiredArgsConstructor
public class HospitalSearchService {

    private final HospitalInfoMapper hospitalInfoMapper;
    private final AmapService amapService;
    private final PythonIntegrationService pythonIntegrationService;

    /**
     * Search for nearby hospitals based on user input (address or coordinates).
     *
     * @param searchDTO the search criteria
     * @return list of matching hospital info records
     */
    public List<HospitalInfo> searchHospitals(HospitalSearchDTO searchDTO) {
        try {
            Double[] coordinates = parseUserInput(searchDTO.getUserInput());
            Double userLng = coordinates[0];
            Double userLat = coordinates[1];

            Map<String, Object> result = pythonIntegrationService.searchHospitals(userLng, userLat);

            if (result.get("success").equals(true)) {
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> hospitalsData = (List<Map<String, Object>>) result.get("hospitals");

                List<HospitalInfo> hospitals = new ArrayList<>();

                for (Map<String, Object> hospitalData : hospitalsData) {
                    HospitalInfo hospital = new HospitalInfo();
                    hospital.setHospitalName((String) hospitalData.get("name"));
                    hospital.setAddress((String) hospitalData.get("address"));

                    // Parse longitude
                    if (hospitalData.containsKey("longitude")) {
                        hospital.setLongitude(coerceToBigDecimal(hospitalData.get("longitude")));
                    } else if (hospitalData.containsKey("lon")) {
                        hospital.setLongitude(coerceToBigDecimal(hospitalData.get("lon")));
                    }

                    // Parse latitude
                    if (hospitalData.containsKey("latitude")) {
                        hospital.setLatitude(coerceToBigDecimal(hospitalData.get("latitude")));
                    } else if (hospitalData.containsKey("lat")) {
                        hospital.setLatitude(coerceToBigDecimal(hospitalData.get("lat")));
                    }

                    // Parse telephone
                    String telephoneStr = "";
                    Object telephoneObj = hospitalData.get("telephone");
                    if (telephoneObj instanceof String) {
                        telephoneStr = (String) telephoneObj;
                    } else if (telephoneObj instanceof java.util.List) {
                        java.util.List<?> telephoneList = (java.util.List<?>) telephoneObj;
                        if (!telephoneList.isEmpty()) {
                            telephoneStr = String.join(";", telephoneList.stream()
                                    .map(Object::toString)
                                    .toArray(String[]::new));
                        }
                    } else if (telephoneObj != null) {
                        telephoneStr = telephoneObj.toString();
                    }
                    hospital.setContactInfo(telephoneStr);

                    // Parse hospital grade
                    String gradeStr = "unknown";
                    Object gradeObj = hospitalData.get("grade");
                    if (gradeObj instanceof String) {
                        gradeStr = (String) gradeObj;
                    } else if (gradeObj instanceof java.util.List) {
                        java.util.List<?> gradeList = (java.util.List<?>) gradeObj;
                        if (!gradeList.isEmpty()) {
                            gradeStr = gradeList.get(0).toString();
                        }
                    } else if (gradeObj != null) {
                        gradeStr = gradeObj.toString();
                    }
                    hospital.setHospitalType(gradeStr);

                    hospital.setEmergencyDepartment(true);

                    // Parse distance
                    if (hospitalData.containsKey("distance_m")) {
                        Object distanceValue = hospitalData.get("distance_m");
                        if (distanceValue instanceof Integer) {
                            hospital.setDistance(((Integer) distanceValue).doubleValue());
                        } else if (distanceValue instanceof Double) {
                            hospital.setDistance((Double) distanceValue);
                        } else if (distanceValue instanceof BigDecimal) {
                            hospital.setDistance(((BigDecimal) distanceValue).doubleValue());
                        }
                    }

                    if (hospitalData.containsKey("distance")) {
                        hospital.setDistanceDesc((String) hospitalData.get("distance"));
                    }

                    hospitals.add(hospital);
                }

                return hospitals;
            } else {
                log.warn("Python script search failed, falling back to database: {}", result.get("error"));

                List<HospitalInfo> hospitals = hospitalInfoMapper.searchNearbyHospitals(
                        new BigDecimal(userLat),
                        new BigDecimal(userLng),
                        searchDTO.getRadius(),
                        searchDTO.getKeyword(),
                        searchDTO.getMaxResults()
                );

                for (HospitalInfo hospital : hospitals) {
                    double distance = hospital.getDistance();
                    if (distance >= 1000) {
                        hospital.setDistanceDesc(String.format("%.1f km", distance / 1000));
                    } else {
                        hospital.setDistanceDesc(String.format("%.0f m", distance));
                    }
                }

                return hospitals;
            }
        } catch (Exception e) {
            log.error("Hospital search failed", e);
            throw new RuntimeException("Hospital search failed: " + e.getMessage(), e);
        }
    }

    /**
     * Parse user input -- supports coordinate strings (lon,lat) and address strings.
     */
    private Double[] parseUserInput(String userInput) throws Exception {
        userInput = userInput.trim();

        if (isCoordinateFormat(userInput)) {
            String[] coords = userInput.replaceAll("[\\s\\uFF0C]", ",").split(",");
            if (coords.length >= 2) {
                double lon = Double.parseDouble(coords[0].trim());
                double lat = Double.parseDouble(coords[1].trim());

                if ((lon >= -180 && lon <= 180) && (lat >= -90 && lat <= 90)) {
                    return new Double[]{lon, lat};
                }
            }
        }

        // Treat as address -- use Python script for geocoding
        log.info("Resolving address via Python script: {}", userInput);
        Map<String, Object> result = pythonIntegrationService.addressToCoordinate(userInput, null);

        if (result.containsKey("success") && (Boolean) result.get("success")) {
            String location = (String) result.get("location");
            if (location != null) {
                String[] coords = location.split(",");
                if (coords.length >= 2) {
                    double lon = Double.parseDouble(coords[0]);
                    double lat = Double.parseDouble(coords[1]);
                    log.info("Address resolved: {} -> ({}, {})", userInput, lon, lat);
                    return new Double[]{lon, lat};
                }
            }
        } else {
            log.warn("Python script geocoding failed for '{}': {}", userInput, result.get("error"));

            log.info("Falling back to AmapService for address: {}", userInput);
            try {
                Double[] resultFromAmap = amapService.addressToLngLat(userInput);
                log.info("AmapService resolved: {} -> ({}, {})", userInput, resultFromAmap[0], resultFromAmap[1]);
                return resultFromAmap;
            } catch (Exception e) {
                log.error("AmapService geocoding also failed for '{}': {}", userInput, e.getMessage());
                throw new Exception("Address resolution failed, unable to obtain coordinates: " + e.getMessage());
            }
        }

        String location = (String) result.get("location");
        String[] coords = location.split(",");
        double lon = Double.parseDouble(coords[0]);
        double lat = Double.parseDouble(coords[1]);
        return new Double[]{lon, lat};
    }

    /**
     * Check if the input looks like a coordinate string.
     */
    private boolean isCoordinateFormat(String input) {
        String pattern = "^\\s*([+-]?\\d{1,3}\\.\\d+)\\s*[,，\\s]+\\s*([+-]?\\d{1,3}\\.\\d+)\\s*$";
        return input.matches(pattern);
    }

    /**
     * Safely coerce an object to BigDecimal, handling Integer, Double, and BigDecimal types.
     */
    private BigDecimal coerceToBigDecimal(Object value) {
        if (value instanceof BigDecimal) {
            return (BigDecimal) value;
        } else if (value instanceof Double) {
            return BigDecimal.valueOf((Double) value);
        } else if (value instanceof Integer) {
            return BigDecimal.valueOf((Integer) value);
        }
        return null;
    }
}
