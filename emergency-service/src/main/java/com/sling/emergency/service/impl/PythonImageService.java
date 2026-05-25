package com.sling.emergency.service.impl;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.List;
import java.util.ArrayList;

/**
 * Service that invokes a Python script to scrape Baidu images.
 * <p>
 * Script and output directories are configurable via application properties.
 */
@Slf4j
@Service
public class PythonImageService {

    @Value("${app.python.script-dir}")
    private String pythonScriptDir;

    @Value("${app.image-dir}")
    private String imageDir;

    /**
     * Call the Python image scraper script to search Baidu images.
     *
     * @param keyword the search keyword (typically snake species name)
     * @return a map containing success status, image URLs, local paths, and backend proxy URLs
     */
    public Map<String, Object> callPythonImageScraper(String keyword) {
        Map<String, Object> result = new HashMap<>();

        try {
            String pythonScriptPath = pythonScriptDir + "/baidu_image_scraper.py";
            String pythonPath = "python";

            List<String> command = new ArrayList<>();
            command.add(pythonPath);
            command.add(pythonScriptPath);
            command.add(keyword);
            command.add("3");
            command.add(imageDir);

            log.debug("Executing Python image scraper: {} {} {} 3 {}", pythonPath, pythonScriptPath, keyword, imageDir);

            ProcessBuilder processBuilder = new ProcessBuilder(command);
            processBuilder.environment().put("PYTHONIOENCODING", "utf-8");

            Process process = processBuilder.start();

            StringBuilder output = new StringBuilder();
            StringBuilder errorOutput = new StringBuilder();

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream(), "UTF-8"))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                    log.debug("Python stdout: {}", line);
                }
            }

            try (BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream(), "UTF-8"))) {
                String line;
                while ((line = errorReader.readLine()) != null) {
                    errorOutput.append(line).append("\n");
                    log.warn("Python stderr: {}", line);
                }
            }

            int exitCode = process.waitFor();

            if (exitCode == 0) {
                String outputStr = output.toString();

                List<String> onlineUrls = extractOnlineUrls(outputStr);
                List<String> localPaths = extractLocalPaths(outputStr);

                result.put("success", true);
                result.put("message", "Python script executed successfully");
                result.put("onlineUrls", onlineUrls);
                result.put("localPaths", localPaths);
                result.put("output", outputStr);

                if (!localPaths.isEmpty()) {
                    String localFilePath = localPaths.get(0);
                    String fileName = new java.io.File(localFilePath).getName();
                    result.put("imageUrl", fileName);
                    if (fileName != null && !fileName.isEmpty()) {
                        result.put("backendImageUrl", "/api/emergency/image/local?path=" + java.net.URLEncoder.encode(fileName, "UTF-8"));
                    }
                } else if (!onlineUrls.isEmpty()) {
                    String firstImageUrl = onlineUrls.get(0);
                    result.put("imageUrl", firstImageUrl);
                    if (firstImageUrl != null && !firstImageUrl.isEmpty()) {
                        result.put("backendImageUrl", "/api/emergency/image/online?url=" + java.net.URLEncoder.encode(firstImageUrl, "UTF-8"));
                    }
                } else {
                    result.put("imageUrl", null);
                    result.put("backendImageUrl", null);
                }
            } else {
                log.error("Python script exited with code {}: {}", exitCode, errorOutput.toString());
                result.put("success", false);
                result.put("message", "Python script execution failed, exit code: " + exitCode);
                result.put("error", errorOutput.toString());
                result.put("imageUrl", null);
                result.put("backendImageUrl", null);
            }

        } catch (Exception e) {
            log.error("Error calling Python image scraper: {}", e.getMessage(), e);

            result.put("success", false);
            result.put("message", "Exception calling Python script: " + e.getMessage());
            result.put("imageUrl", null);
            result.put("backendImageUrl", null);
        }

        return result;
    }

    /**
     * Extract online image URLs from Python script output.
     *
     * @param output the raw Python script stdout
     * @return list of extracted online URLs
     */
    private List<String> extractOnlineUrls(String output) {
        List<String> urls = new ArrayList<>();

        Pattern onlineUrlsPattern = Pattern.compile("ONLINE_URLS: \\[(.*?)\\]");
        Matcher matcher = onlineUrlsPattern.matcher(output);

        if (matcher.find()) {
            String urlsStr = matcher.group(1);
            String[] urlArray = urlsStr.split(",");
            for (String url : urlArray) {
                url = url.trim();
                if (url.startsWith("'") || url.startsWith("\"")) {
                    url = url.substring(1);
                }
                if (url.endsWith("'") || url.endsWith("\"")) {
                    url = url.substring(0, url.length() - 1);
                }
                if (!url.isEmpty() && url.startsWith("http")) {
                    urls.add(url.trim());
                }
            }
        }

        if (urls.isEmpty()) {
            Pattern downloadPattern = Pattern.compile("正在下载第\\s*\\d+\\s*张图片:\\s*(https?://[\\w\\-./?%&=]+)");
            Matcher downloadMatcher = downloadPattern.matcher(output);

            while (downloadMatcher.find()) {
                String url = downloadMatcher.group(1);
                if (!urls.contains(url)) {
                    urls.add(url);
                }
            }
        }

        return urls;
    }

    /**
     * Extract local file paths from Python script output.
     *
     * @param output the raw Python script stdout
     * @return list of extracted local file paths
     */
    private List<String> extractLocalPaths(String output) {
        List<String> paths = new ArrayList<>();

        Pattern localPathsPattern = Pattern.compile("LOCAL_PATHS: \\[(.*?)\\]");
        Matcher matcher = localPathsPattern.matcher(output);

        if (matcher.find()) {
            String pathsStr = matcher.group(1);
            String[] pathArray = pathsStr.split(",");
            for (String path : pathArray) {
                path = path.trim();
                if (path.startsWith("'") || path.startsWith("\"")) {
                    path = path.substring(1);
                }
                if (path.endsWith("'") || path.endsWith("\"")) {
                    path = path.substring(0, path.length() - 1);
                }
                if (!path.isEmpty()) {
                    paths.add(path.trim());
                }
            }
        }

        return paths;
    }
}
