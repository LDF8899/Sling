package com.sling.user.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.sling.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("role")
public class Role extends BaseEntity {
    /**
     * 主键ID，对应数据库中的role_id字段
     */
    @TableId(value = "role_id", type = IdType.AUTO)
    private Long id;

    /**
     * 角色名称
     */
    private String roleName;

    /**
     * 角色描述
     */
    private String roleDescription;

    /**
     * 创建时间，重写父类的createTime字段映射
     */
    @TableField(value = "create_time")
    private java.util.Date createTime;
    
    @TableField(exist = false)  // role表中没有del_flag字段
    private Integer delFlag;
}