package com.sling.admin.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.sling.admin.entity.AdminOperationLog;
import com.sling.admin.service.AdminOperationLogService;
import com.sling.common.utils.Result;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminLogController {

    private final AdminOperationLogService logService;

    public AdminLogController(AdminOperationLogService logService) {
        this.logService = logService;
    }

    @GetMapping("/logs")
    public Result<Map<String, Object>> getLogList(
            @RequestParam(defaultValue = "0") Integer page,
            @RequestParam(defaultValue = "20") Integer size,
            @RequestParam(defaultValue = "operationTime") String sortBy,
            @RequestParam(defaultValue = "descending") String sortOrder,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String operationType,
            @RequestParam(required = false) String resultStatus,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime startDate,
            @RequestParam(required = false) @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") LocalDateTime endDate) {

        Page<AdminOperationLog> pageInfo = new Page<>(page + 1, size);
        QueryWrapper<AdminOperationLog> wrapper = new QueryWrapper<>();

        if (username != null && !username.trim().isEmpty()) {
            wrapper.like("username", username.trim());
        }
        if (operationType != null && !operationType.trim().isEmpty()) {
            wrapper.eq("operation_type", operationType.trim());
        }
        if (resultStatus != null && !resultStatus.trim().isEmpty()) {
            wrapper.eq("operation_result", "success".equals(resultStatus) ? 1 : 0);
        }
        if (startDate != null) {
            wrapper.ge("operation_time", startDate);
        }
        if (endDate != null) {
            wrapper.le("operation_time", endDate);
        }

        String column = "operationTime".equals(sortBy) ? "operation_time" : "log_id";
        if ("ascending".equals(sortOrder)) {
            wrapper.orderByAsc(column);
        } else {
            wrapper.orderByDesc(column);
        }

        Page<AdminOperationLog> result = logService.page(pageInfo, wrapper);
        Map<String, Object> data = new HashMap<>();
        data.put("list", result.getRecords());
        data.put("total", result.getTotal());
        data.put("page", page);
        data.put("size", size);
        data.put("pages", result.getPages());

        return Result.success(data);
    }

    @GetMapping("/logs/{id}")
    public Result<AdminOperationLog> getLogDetail(@PathVariable Long id) {
        AdminOperationLog log = logService.getById(id);
        if (log != null) {
            return Result.success(log);
        }
        return Result.fail("日志不存在");
    }
}
