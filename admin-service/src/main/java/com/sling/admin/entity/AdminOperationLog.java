package com.sling.admin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("admin_operation_log")
public class AdminOperationLog {
    @TableId(value = "log_id", type = IdType.AUTO)
    private Long logId;

    @TableField("admin_user_id")
    private Long adminUserId;

    @TableField("username")
    private String username;

    @TableField("operation_type")
    private String operationType;

    @TableField("method")
    private String method;

    @TableField("operation_params")
    private String operationParams;

    @TableField("ip_address")
    private String ipAddress;

    @TableField("user_agent")
    private String userAgent;

    @TableField("operation_result")
    private Integer operationResult;

    @TableField("operation_desc")
    private String operationDesc;

    @TableField(exist = false)  // 数据库中没有execution_time字段
    private Long executionTime;

    @TableField("operation_time")
    private LocalDateTime operationTime;
}