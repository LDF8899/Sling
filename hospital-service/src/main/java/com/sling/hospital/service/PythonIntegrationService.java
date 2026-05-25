package com.sling.hospital.service;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import com.sling.hospital.util.PythonScriptExecutor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PythonIntegrationService {
    private static final Logger logger = LoggerFactory.getLogger(PythonIntegrationService.class);

    @Autowired
    private PythonScriptExecutor pythonExecutor;

    @Value("${app.python.hospital-dir}")
    private String pythonScriptsPath;

    /**
     * 地址转坐标
     */
    public Map<String, Object> addressToCoordinate(String address, String city) {
        try {
            List<String> params = new ArrayList<>();
            params.add("--mode");
            params.add("geocode");
            params.add("--address");
            params.add(address);
            
            if (city != null && !city.isEmpty()) {
                params.add("--city");
                params.add(city);
            }

            String result = pythonExecutor.executePythonScript(
                pythonScriptsPath + "/map.py", 
                params
            );

            // 解析Python脚本的输出结果
            return parseGeocodeResult(result);
        } catch (Exception e) {
            logger.error("Error in address to coordinate: {}", e.getMessage(), e);
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("error", e.getMessage());
            return errorResult;
        }
    }

    /**
     * 坐标转地址
     */
    public Map<String, Object> coordinateToAddress(Double lon, Double lat) {
        try {
            List<String> params = new ArrayList<>();
            params.add("--mode");
            params.add("reverse_geocode");
            params.add("--lon");
            params.add(lon.toString());
            params.add("--lat");
            params.add(lat.toString());

            String result = pythonExecutor.executePythonScript(
                pythonScriptsPath + "/map.py", 
                params
            );

            return parseReverseGeocodeResult(result);
        } catch (Exception e) {
            logger.error("Error in coordinate to address: {}", e.getMessage(), e);
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("error", e.getMessage());
            return errorResult;
        }
    }



    /**
     * 获取驾车路线
     */
    public Map<String, Object> getDrivingRoute(Double startLon, Double startLat, 
                                               Double endLon, Double endLat, Integer strategy) {
        try {
            List<String> params = new ArrayList<>();
            params.add("--mode");
            params.add("driving_route");
            params.add("--start_lon");
            params.add(startLon.toString());
            params.add("--start_lat");
            params.add(startLat.toString());
            params.add("--end_lon");
            params.add(endLon.toString());
            params.add("--end_lat");
            params.add(endLat.toString());
            params.add("--strategy");
            params.add(strategy.toString());

            String result = pythonExecutor.executePythonScript(
                pythonScriptsPath + "/rode.py", 
                params
            );

            return parseRouteResult(result);
        } catch (Exception e) {
            logger.error("Error in get driving route: {}", e.getMessage(), e);
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("error", e.getMessage());
            return errorResult;
        }
    }

    /**
     * 获取步行路线
     */
    public Map<String, Object> getWalkingRoute(Double startLon, Double startLat, 
                                               Double endLon, Double endLat) {
        try {
            List<String> params = new ArrayList<>();
            params.add("--mode");
            params.add("walking_route");
            params.add("--start_lon");
            params.add(startLon.toString());
            params.add("--start_lat");
            params.add(startLat.toString());
            params.add("--end_lon");
            params.add(endLon.toString());
            params.add("--end_lat");
            params.add(endLat.toString());

            String result = pythonExecutor.executePythonScript(
                pythonScriptsPath + "/rode.py", 
                params
            );

            return parseRouteResult(result);
        } catch (Exception e) {
            logger.error("Error in get walking route: {}", e.getMessage(), e);
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("error", e.getMessage());
            return errorResult;
        }
    }

    // 解析函数 - 这里需要根据Python脚本的实际输出格式进行解析
    private Map<String, Object> parseGeocodeResult(String result) {
        // 模拟解析逻辑，实际需要根据Python脚本输出格式调整
        Map<String, Object> parsedResult = new HashMap<>();
        try {
            // 尝试解析为JSON格式
            JSONObject jsonObject = JSON.parseObject(result);
            parsedResult.put("success", jsonObject.getBoolean("success"));
            if (jsonObject.getBoolean("success")) {
                parsedResult.put("location", jsonObject.getString("location"));
                parsedResult.put("province", jsonObject.getString("province"));
                parsedResult.put("city", jsonObject.getString("city"));
                parsedResult.put("district", jsonObject.getString("district"));
                parsedResult.put("formatted_address", jsonObject.getString("formatted_address"));
            } else {
                parsedResult.put("error", jsonObject.getString("error"));
            }
        } catch (Exception e) {
            // 如果不是JSON格式，尝试其他解析方式
            parsedResult.put("success", false);
            parsedResult.put("error", "Failed to parse geocode result: " + e.getMessage());
        }
        return parsedResult;
    }

    private Map<String, Object> parseReverseGeocodeResult(String result) {
        Map<String, Object> parsedResult = new HashMap<>();
        try {
            JSONObject jsonObject = JSON.parseObject(result);
            parsedResult.put("success", jsonObject.getBoolean("success"));
            if (jsonObject.getBoolean("success")) {
                parsedResult.put("formatted_address", jsonObject.getString("formatted_address"));
            } else {
                parsedResult.put("error", jsonObject.getString("error"));
            }
        } catch (Exception e) {
            parsedResult.put("success", false);
            parsedResult.put("error", "Failed to parse reverse geocode result: " + e.getMessage());
        }
        return parsedResult;
    }

    /**
     * 搜索附近医院
     */
    public Map<String, Object> searchHospitals(Double lon, Double lat) {
        try {
            List<String> params = new ArrayList<>();
            params.add("--mode");
            params.add("search");
            params.add("--lon");
            params.add(lon.toString());
            params.add("--lat");
            params.add(lat.toString());

            String result = pythonExecutor.executePythonScript(
                pythonScriptsPath + "/hospital.py", 
                params
            );

            return parseHospitalSearchResult(result);
        } catch (Exception e) {
            logger.error("Error in search hospitals: {}", e.getMessage(), e);
            Map<String, Object> errorResult = new HashMap<>();
            errorResult.put("success", false);
            errorResult.put("error", e.getMessage());
            return errorResult;
        }
    }

    private Map<String, Object> parseHospitalSearchResult(String result) {
        Map<String, Object> parsedResult = new HashMap<>();
        try {
            JSONObject jsonObject = JSON.parseObject(result);
            parsedResult.put("success", jsonObject.getBoolean("success"));
            if (jsonObject.getBoolean("success")) {
                parsedResult.put("hospitals", jsonObject.getJSONArray("hospitals"));
                parsedResult.put("center_coordinate", jsonObject.getString("center_coordinate"));
                parsedResult.put("search_radius_km", jsonObject.getInteger("search_radius_km"));
            } else {
                parsedResult.put("error", jsonObject.getString("error"));
            }
        } catch (Exception e) {
            parsedResult.put("success", false);
            parsedResult.put("error", "Failed to parse hospital search result: " + e.getMessage());
        }
        return parsedResult;
    }

    private Map<String, Object> parseRouteResult(String result) {
        Map<String, Object> parsedResult = new HashMap<>();
        try {
            JSONObject jsonObject = JSON.parseObject(result);
            parsedResult.put("success", jsonObject.getBoolean("success"));
            if (jsonObject.getBoolean("success")) {
                parsedResult.put("total_distance", jsonObject.getString("total_distance"));
                parsedResult.put("total_duration", jsonObject.getString("total_duration"));
                parsedResult.put("steps", jsonObject.getJSONArray("steps"));
                if (jsonObject.containsKey("strategy")) {
                    parsedResult.put("strategy", jsonObject.getString("strategy"));
                }
                if (jsonObject.containsKey("total_toll")) {
                    parsedResult.put("total_toll", jsonObject.getString("total_toll"));
                }
                if (jsonObject.containsKey("path_coords")) {
                    parsedResult.put("path_coords", jsonObject.getJSONArray("path_coords"));
                }
                if (jsonObject.containsKey("start")) {
                    parsedResult.put("start", jsonObject.getJSONArray("start"));
                }
                if (jsonObject.containsKey("end")) {
                    parsedResult.put("end", jsonObject.getJSONArray("end"));
                }
            } else {
                parsedResult.put("error", jsonObject.getString("error"));
            }
        } catch (Exception e) {
            parsedResult.put("success", false);
            parsedResult.put("error", "Failed to parse route result: " + e.getMessage());
        }
        return parsedResult;
    }
}