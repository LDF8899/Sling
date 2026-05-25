package com.sling.user.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.sling.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("user_permission")
public class UserPermission extends BaseEntity {
    /**
     * 关联用户表的user_id，表明该权限所属用户
     */
    private Long userId;

    /**
     * 权限名称，明确权限对应的操作，如"查看蛇类详细信息"
     */
    private String permissionName;

    /**
     * 权限描述，用于更详细地说明权限的作用和适用场景
     */
    private String permissionDescription;
    
    @com.baomidou.mybatisplus.annotation.TableField(exist = false)  // user_permission表中没有del_flag字段
    private Integer delFlag;
}