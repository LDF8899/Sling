package com.sling.emergency.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

/**
 * Client for fetching snake images from Wikipedia and Baidu image search.
 * <p>
 * Attempts Wikipedia first, then falls back to Baidu image search if the Wikipedia query fails.
 */
@Slf4j
@Component
public class WikiImageClient {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    @Autowired
    private BaiduImageService baiduImageService;

    public WikiImageClient(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    /**
     * Get a snake image URL from Wikipedia, falling back to Baidu image search.
     *
     * @param snakeName the snake species name to search for
     * @return the image URL, or {@code null} if both sources fail
     */
    public String getWikiImageUrl(String snakeName) {
        try {
            String encodedTitle = URLEncoder.encode(snakeName, StandardCharsets.UTF_8);

            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl("https://zh.wikipedia.org/w/api.php")
                    .queryParam("action", "query")
                    .queryParam("prop", "pageimages")
                    .queryParam("piprop", "original")
                    .queryParam("titles", encodedTitle)
                    .queryParam("format", "json")
                    .queryParam("formatversion", "2");

            HttpHeaders headers = new HttpHeaders();
            headers.add("User-Agent", "Sling-Emergency-Service/1.0 (https://github.com/sling-project)");

            HttpEntity<Void> requestEntity = new HttpEntity<>(headers);
            ResponseEntity<String> response = restTemplate.exchange(
                    uriBuilder.toUriString(),
                    HttpMethod.GET,
                    requestEntity,
                    String.class
            );

            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                JsonNode rootNode = objectMapper.readTree(response.getBody());
                JsonNode queryNode = rootNode.get("query");

                if (queryNode != null) {
                    JsonNode pagesNode = queryNode.get("pages");

                    if (pagesNode != null && pagesNode.isArray() && pagesNode.size() > 0) {
                        JsonNode pageNode = pagesNode.get(0);
                        JsonNode originalNode = pageNode.get("original");

                        if (originalNode != null) {
                            JsonNode sourceNode = originalNode.get("source");
                            if (sourceNode != null) {
                                String wikiImageUrl = sourceNode.asText();
                                if (wikiImageUrl != null && !wikiImageUrl.isEmpty()) {
                                    return wikiImageUrl;
                                }
                            }
                        }
                    }
                }
            }
        } catch (Exception e) {
            log.warn("Wikipedia image fetch failed for '{}': {}", snakeName, e.getMessage(), e);
        }

        // Fallback to Baidu image search
        try {
            log.info("Wikipedia image not found for '{}', falling back to Baidu image search", snakeName);
            String baiduImageUrl = baiduImageService.getBaiduImageUrl(snakeName);
            if (baiduImageUrl != null && !baiduImageUrl.isEmpty()) {
                log.info("Retrieved Baidu image URL for '{}': {}", snakeName, baiduImageUrl);
                return baiduImageUrl;
            }
        } catch (Exception e) {
            log.error("Baidu image fetch also failed for '{}': {}", snakeName, e.getMessage(), e);
        }

        return null;
    }
}
