package com.sling.user.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Admin role entity.
 * NOTE: DUPLICATE of com.sling.admin.entity.AdminRole in admin-service.
 * The authoritative entity definition lives in admin-service.
 */
@Data
@TableName("admin_roles")
public class AdminRole {
    @TableId(value = "role_id", type = IdType.AUTO)
    private Long roleId;

    @TableField("role_name")
    private String roleName;

    @TableField("role_code")
    private String roleCode;

    @TableField("role_description")
    private String roleDescription;

    @TableField("permissions")
    private String permissions; // JSON格式存储权限列表

    @TableField("status")
    private Integer status;

    @TableField("create_time")
    private LocalDateTime createTime;

    @TableField("update_time")
    private LocalDateTime updateTime;
}