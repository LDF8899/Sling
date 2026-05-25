package com.sling.emergency.controller;

import com.sling.common.utils.Result;
import com.sling.emergency.entity.EmergencyHelp;
import com.sling.emergency.service.EmergencyHelpService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * REST controller for emergency help submission and retrieval.
 */
@Slf4j
@RestController
@RequestMapping("/api/emergency/help")
@RequiredArgsConstructor
public class EmergencyHelpController {

    private final EmergencyHelpService emergencyHelpService;

    /**
     * Submit an emergency help request.
     */
    @PostMapping("/submit")
    public Result<Map<String, Object>> submitEmergency(
            @RequestParam(value = "type", required = true) String type,
            @RequestParam(value = "location", required = true) String location,
            @RequestParam(value = "description", required = true) String description,
            @RequestParam(value = "phone", required = true) String phone,
            @RequestParam(value = "isPublic", required = false, defaultValue = "false") Boolean isPublic,
            @RequestParam(value = "images", required = false) MultipartFile[] images) {

        log.info("Emergency help submission: type={}, location={}, description={}", type, location, description);

        try {
            EmergencyHelp emergencyHelp = new EmergencyHelp();
            emergencyHelp.setType(type);
            emergencyHelp.setLocation(location);
            emergencyHelp.setDescription(description);
            emergencyHelp.setPhone(phone);
            emergencyHelp.setIsPublic(isPublic);

            if (images != null && images.length > 0) {
                emergencyHelp.setImageCount(images.length);
            }

            boolean saved = emergencyHelpService.saveEmergencyHelp(emergencyHelp);

            if (saved) {
                log.info("Emergency help submitted successfully, id={}", emergencyHelp.getId());

                Map<String, Object> responseData = new HashMap<>();
                responseData.put("id", emergencyHelp.getId());
                responseData.put("message", "Help request submitted successfully");
                responseData.put("timestamp", System.currentTimeMillis());

                return Result.success("Help request submitted successfully", responseData);
            } else {
                log.error("Failed to save emergency help record");
                return Result.fail("Failed to submit help request");
            }
        } catch (Exception e) {
            log.error("Exception during emergency help submission", e);
            return Result.fail("Submission failed: " + e.getMessage());
        }
    }

    /**
     * Get emergency help history.
     */
    @GetMapping("/history")
    public Result<List<EmergencyHelp>> getEmergencyHistory() {
        log.info("Fetching emergency help history");

        try {
            List<EmergencyHelp> history = emergencyHelpService.getEmergencyHistory();
            return Result.success(history);
        } catch (Exception e) {
            log.error("Error fetching emergency help history", e);
            return Result.fail("Failed to fetch history: " + e.getMessage());
        }
    }

    /**
     * Get emergency help detail by ID.
     */
    @GetMapping("/detail/{id}")
    public Result<EmergencyHelp> getEmergencyDetail(@PathVariable Long id) {
        log.info("Fetching emergency help detail, id={}", id);

        try {
            EmergencyHelp emergencyHelp = emergencyHelpService.getEmergencyHelpById(id);
            if (emergencyHelp != null) {
                return Result.success(emergencyHelp);
            } else {
                return Result.fail("Help record not found");
            }
        } catch (Exception e) {
            log.error("Error fetching emergency help detail", e);
            return Result.fail("Failed to fetch detail: " + e.getMessage());
        }
    }

    /**
     * Trigger alert for an emergency help request.
     */
    @PostMapping("/alert/{id}")
    public Result<String> triggerAlert(@PathVariable Long id) {
        log.info("Triggering alert for emergency help, id={}", id);

        try {
            boolean success = emergencyHelpService.triggerAlert(id);
            if (success) {
                return Result.success("Alert triggered", "Alert has been sent to relevant departments");
            } else {
                return Result.fail("Failed to trigger alert");
            }
        } catch (Exception e) {
            log.error("Error triggering alert", e);
            return Result.fail("Alert failed: " + e.getMessage());
        }
    }

    /**
     * Get paginated emergency help list with optional status/type filters.
     */
    @GetMapping("/list")
    public Result<Map<String, Object>> getList(
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "type", required = false) String type,
            @RequestParam(value = "page", defaultValue = "1") int page,
            @RequestParam(value = "size", defaultValue = "10") int size) {
        log.info("Fetching emergency help list: status={}, type={}, page={}, size={}", status, type, page, size);

        try {
            List<EmergencyHelp> list = emergencyHelpService.getEmergencyHelpList(status, type, page, size);
            int total = emergencyHelpService.getEmergencyHelpCount(status, type);

            Map<String, Object> result = new HashMap<>();
            result.put("records", list);
            result.put("total", total);
            result.put("page", page);
            result.put("size", size);
            return Result.success(result);
        } catch (Exception e) {
            log.error("Error fetching emergency help list", e);
            return Result.fail("Failed to fetch list: " + e.getMessage());
        }
    }

    /**
     * Get emergency help statistics by status.
     */
    @GetMapping("/stats")
    public Result<Map<String, Long>> getStats() {
        log.info("Fetching emergency help stats");

        try {
            Map<String, Long> stats = emergencyHelpService.getEmergencyHelpStats();
            return Result.success(stats);
        } catch (Exception e) {
            log.error("Error fetching emergency help stats", e);
            return Result.fail("Failed to fetch stats: " + e.getMessage());
        }
    }

    /**
     * Get latest emergency helps since a given timestamp (for real-time polling).
     */
    @GetMapping("/latest")
    public Result<List<EmergencyHelp>> getLatest(
            @RequestParam(value = "since", required = false) Long sinceTimestamp) {
        Date since = sinceTimestamp != null ? new Date(sinceTimestamp) : new Date(System.currentTimeMillis() - 60000);
        log.info("Fetching latest emergency helps since: {}", since);

        try {
            List<EmergencyHelp> list = emergencyHelpService.getLatestEmergencyHelps(since);
            return Result.success(list);
        } catch (Exception e) {
            log.error("Error fetching latest emergency helps", e);
            return Result.fail("Failed to fetch latest: " + e.getMessage());
        }
    }

    /**
     * Update the status of an emergency help request.
     */
    @PutMapping("/{id}/status")
    public Result<String> updateStatus(
            @PathVariable Long id,
            @RequestParam(value = "status", required = true) String status) {
        log.info("Updating status for help id={}, new status={}", id, status);

        if (!status.matches("pending|processing|resolved")) {
            return Result.fail("Invalid status: must be pending, processing, or resolved");
        }

        try {
            boolean success = emergencyHelpService.updateStatus(id, status);
            if (success) {
                return Result.success("Status updated", "Status changed to " + status);
            } else {
                return Result.fail("Failed to update status");
            }
        } catch (Exception e) {
            log.error("Error updating status for id: {}", id, e);
            return Result.fail("Update failed: " + e.getMessage());
        }
    }
}
