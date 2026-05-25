package com.sling.user.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * Admin user entity.
 * NOTE: DUPLICATE of com.sling.admin.entity.AdminUser in admin-service.
 * This copy exists to support embedded admin features within user-service (e.g., admin login).
 * The authoritative entity definition and admin user management live in admin-service.
 */
@Data
@TableName("admin_users")
public class AdminUser {
    @TableId(value = "admin_id", type = IdType.AUTO)
    private Long adminId;

    @TableField("username")
    private String username;

    @TableField("password")
    private String password;

    @TableField("email")
    private String email;

    @TableField("phone")
    private String phone;

    @TableField("real_name")
    private String realName;

    @TableField("avatar")
    private String avatar;

    @TableField("department")
    private String department;

    @TableField("position")
    private String position;

    @TableField("status")
    private Integer status;

    @TableField("last_login_time")
    private LocalDateTime lastLoginTime;

    @TableField("last_login_ip")
    private String lastLoginIp;

    @TableField("two_factor_enabled")
    private Integer twoFactorEnabled;

    @TableField("totp_secret")
    private String totpSecret;

    @TableField("create_time")
    private LocalDateTime createTime;

    @TableField("update_time")
    private LocalDateTime updateTime;

    @TableField("del_flag")
    private Integer delFlag;
}