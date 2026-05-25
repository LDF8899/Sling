package com.sling.hospital.service;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import javax.annotation.PostConstruct;

/**
 * Amap (Gaode Map) API service for geocoding, reverse geocoding, and POI search.
 */
@Slf4j
@Service
public class AmapService {

    @Value("${amap.api-key:}")
    private String amapApiKey;

    private RestTemplate restTemplate;

    @PostConstruct
    public void init() {
        this.restTemplate = new RestTemplate();
        log.info("AmapService initialized with API key: {}",
                amapApiKey != null && !amapApiKey.isEmpty() ? "configured" : "MISSING");
    }

    /**
     * Convert a fuzzy address to longitude/latitude.
     *
     * @param address the address string (e.g. "Tianhe District, Guangzhou")
     * @return array [longitude, latitude]
     */
    public Double[] addressToLngLat(String address) throws Exception {
        String url = String.format(
                "https://restapi.amap.com/v3/geocode/geo?key=%s&address=%s&output=json",
                amapApiKey, address);

        String response = restTemplate.getForObject(url, String.class);
        if (response == null) {
            throw new Exception("Amap API call returned no response");
        }

        JSONObject result = JSON.parseObject(response);
        if (!"1".equals(result.getString("status")) || result.getJSONArray("geocodes").isEmpty()) {
            throw new Exception("Address resolution failed: " + result.getString("info"));
        }

        String lngLat = result.getJSONArray("geocodes").getJSONObject(0).getString("location");
        String[] lngLatArr = lngLat.split(",");
        Double lng = Double.parseDouble(lngLatArr[0]);
        Double lat = Double.parseDouble(lngLatArr[1]);

        log.debug("Geocoded '{}' -> ({}, {})", address, lng, lat);
        return new Double[]{lng, lat};
    }

    /**
     * Search for nearby hospitals around a center point.
     *
     * @param lng      center longitude
     * @param lat      center latitude
     * @param radius   search radius in meters
     * @param pageSize results per page
     * @return raw JSON response string
     */
    public String searchNearbyHospitals(Double lng, Double lat, Integer radius, Integer pageSize) throws Exception {
        String url = String.format(
                "https://restapi.amap.com/v3/place/around?key=%s&location=%s,%s&types=090100|090101&radius=%d&offset=%d&page=1&extensions=base",
                amapApiKey, lng, lat, radius, pageSize);

        String response = restTemplate.getForObject(url, String.class);
        if (response == null) {
            throw new Exception("Amap POI search returned no response");
        }

        JSONObject result = JSON.parseObject(response);
        if (!"1".equals(result.getString("status"))) {
            throw new Exception("Nearby hospital search failed: " + result.getString("info"));
        }

        return response;
    }

    /**
     * Convert longitude/latitude to a human-readable address (reverse geocoding).
     *
     * @param lng longitude
     * @param lat latitude
     * @return formatted address string
     */
    public String addressFromLngLat(Double lng, Double lat) throws Exception {
        String url = String.format(
                "https://restapi.amap.com/v3/geocode/regeo?key=%s&location=%s,%s&radius=1000&extensions=base",
                amapApiKey, lng, lat);

        String response = restTemplate.getForObject(url, String.class);
        if (response == null) {
            throw new Exception("Amap reverse geocoding returned no response");
        }

        JSONObject result = JSON.parseObject(response);
        if (!"1".equals(result.getString("status"))) {
            throw new Exception("Reverse geocoding failed: " + result.getString("info"));
        }

        return result.getJSONObject("regeocode").getString("formatted_address");
    }
}
