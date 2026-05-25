package com.sling.admin.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

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