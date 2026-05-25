package com.sling.emergency.controller;

import com.sling.common.utils.Result;
import com.sling.emergency.service.EmergencyImageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLConnection;

/**
 * REST controller for image serving and wound-image analysis.
 * <p>
 * Provides backend-proxy endpoints for local and online images (avoids CORS/hotlinking issues),
 * and an AI-powered wound-image analysis endpoint.
 */
@Slf4j
@RestController
@RequestMapping("/api/emergency/image")
@RequiredArgsConstructor
public class EmergencyImageController {

    @Value("${app.image-dir}")
    private String imageDir;

    private final EmergencyImageService emergencyImageService;

    // ==================== Image proxy endpoints ====================

    /**
     * Proxy a local image file by path, avoiding cross-origin and hotlink issues.
     *
     * @param path the relative image path within the configured image directory
     * @return the image resource response
     */
    @GetMapping("/local")
    public ResponseEntity<Resource> getLocalImage(@RequestParam String path) {
        try {
            String decodedPath = java.net.URLDecoder.decode(path, "UTF-8");
            log.debug("Requested local image path: {}", decodedPath);

            File allowedDirectory = new File(imageDir);
            File imageFile = new File(allowedDirectory, decodedPath);

            log.debug("Resolved full path: {}, exists: {}", imageFile.getAbsolutePath(), imageFile.exists());

            // Validate path to prevent directory traversal
            String canonicalPath = imageFile.getCanonicalPath();
            String allowedCanonicalPath = allowedDirectory.getCanonicalPath();

            if (!canonicalPath.startsWith(allowedCanonicalPath)) {
                log.warn("Path traversal attempt blocked: {} not under {}", canonicalPath, allowedCanonicalPath);
                return ResponseEntity.badRequest().build();
            }

            if (!imageFile.exists() || !isImageFile(imageFile)) {
                log.warn("Image file not found or not a recognized image type: {}", imageFile.getAbsolutePath());
                return ResponseEntity.notFound().build();
            }

            Resource resource = new FileSystemResource(imageFile);
            String contentType = determineContentType(imageFile);

            log.debug("Serving local image: {}, type: {}", imageFile.getAbsolutePath(), contentType);

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=3600")
                    .body(resource);

        } catch (IOException e) {
            log.error("Error serving local image: {}", e.getMessage(), e);
            return ResponseEntity.status(500).build();
        }
    }

    /**
     * Proxy a remote image URL, avoiding cross-origin and hotlink issues.
     *
     * @param urlParam the remote image URL
     * @return the image resource response
     */
    @GetMapping("/online")
    public ResponseEntity<Resource> getOnlineImage(@RequestParam String urlParam) {
        try {
            String decodedUrl = java.net.URLDecoder.decode(urlParam, "UTF-8");

            URL imageUrl;
            try {
                imageUrl = new URL(decodedUrl);
            } catch (MalformedURLException e) {
                log.warn("Invalid image URL: {}", decodedUrl);
                return ResponseEntity.badRequest().build();
            }

            String host = imageUrl.getHost();

            if (!isValidImageDomain(host)) {
                log.warn("Blocked image domain: {}", host);
                return ResponseEntity.badRequest().build();
            }

            URLConnection connection = imageUrl.openConnection();
            connection.setRequestProperty("User-Agent",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");
            connection.setRequestProperty("Referer", "https://image.baidu.com/");
            connection.setConnectTimeout(10000);
            connection.setReadTimeout(10000);

            byte[] imageBytes = connection.getInputStream().readAllBytes();
            Resource resource = new ByteArrayResource(imageBytes);

            String contentType = connection.getContentType();
            if (contentType == null || !contentType.startsWith("image/")) {
                String lowerPath = imageUrl.getPath().toLowerCase();
                if (lowerPath.endsWith(".jpg") || lowerPath.endsWith(".jpeg")) {
                    contentType = "image/jpeg";
                } else if (lowerPath.endsWith(".png")) {
                    contentType = "image/png";
                } else if (lowerPath.endsWith(".gif")) {
                    contentType = "image/gif";
                } else if (lowerPath.endsWith(".webp")) {
                    contentType = "image/webp";
                } else {
                    contentType = "application/octet-stream";
                }
            }

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CACHE_CONTROL, "max-age=3600")
                    .body(resource);

        } catch (Exception e) {
            log.error("Error serving online image: {}", e.getMessage(), e);
            return ResponseEntity.status(500).build();
        }
    }

    // ==================== Wound image analysis ====================

    /**
     * Analyze a wound image using the AI vision model to identify possible snake-bite symptoms.
     *
     * @param image the wound image file
     * @return the AI analysis result text
     */
    @PostMapping(value = "/analyze", consumes = {"multipart/form-data"})
    public Result<String> analyzeWoundImage(@RequestParam(value = "image", required = true) MultipartFile image) {
        try {
            String result = emergencyImageService.analyzeWoundImage(image);
            return Result.success(result);
        } catch (Exception e) {
            log.error("Wound image analysis failed", e);
            return Result.fail("Image analysis failed: " + e.getMessage());
        }
    }

    // ==================== Helper methods ====================

    /**
     * Check if the host belongs to an allowed image domain.
     */
    private boolean isValidImageDomain(String host) {
        return host != null && (
                host.endsWith("baidu.com")
                        || host.endsWith("bdimg.com")
                        || host.endsWith("bdstatic.com")
                        || host.endsWith("img0.baidu.com")
                        || host.endsWith("img1.baidu.com")
                        || host.endsWith("img2.baidu.com")
                        || host.endsWith("img3.baidu.com")
                        || host.endsWith("img4.baidu.com")
                        || host.endsWith("img5.baidu.com"));
    }

    /**
     * Check whether the file is a recognized image type by extension.
     */
    private boolean isImageFile(File file) {
        String name = file.getName().toLowerCase();
        return name.endsWith(".jpg") || name.endsWith(".jpeg")
                || name.endsWith(".png") || name.endsWith(".gif")
                || name.endsWith(".webp") || name.endsWith(".bmp");
    }

    /**
     * Determine content type from file extension.
     */
    private String determineContentType(File file) {
        String name = file.getName().toLowerCase();
        if (name.endsWith(".jpg") || name.endsWith(".jpeg")) {
            return "image/jpeg";
        } else if (name.endsWith(".png")) {
            return "image/png";
        } else if (name.endsWith(".gif")) {
            return "image/gif";
        } else if (name.endsWith(".webp")) {
            return "image/webp";
        } else if (name.endsWith(".bmp")) {
            return "image/bmp";
        }
        return "application/octet-stream";
    }
}
