package com.sling.user.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Admin user-role association entity.
 * NOTE: DUPLICATE of com.sling.admin.entity.AdminUserRole in admin-service.
 * The authoritative entity definition lives in admin-service.
 */
@Data
@TableName("admin_user_roles")
public class AdminUserRole {
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField("admin_user_id")
    private Long adminUserId;

    @TableField("role_id")
    private Long roleId;

    @TableField("create_time")
    private LocalDateTime createTime;

    @TableField("del_flag")
    private Integer delFlag;
}