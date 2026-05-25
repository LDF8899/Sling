package com.sling.common.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.util.Date;

/**
 * 基础实体 — 所有数据库实体可继承此类获得通用审计字段
 *
 * <p>包含：主键 id、创建/更新时间（自动填充）、逻辑删除标识。
 * 配合 MyBatis-Plus MetaObjectHandler 实现 createTime/updateTime 自动填充。
 */
@Data
public class BaseEntity {

    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    @TableField(value = "created_time", fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private Date createdTime;

    @TableField(value = "updated_time", fill = FieldFill.INSERT_UPDATE)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Shanghai")
    private Date updatedTime;

    @TableField(value = "create_by", fill = FieldFill.INSERT)
    private String createBy;

    @TableField(value = "update_by", fill = FieldFill.INSERT_UPDATE)
    private String updateBy;

    @TableField(value = "remark")
    private String remark;

    /** 删除标志：0=已删除, 1=正常 */
    @TableField(value = "del_flag")
    @TableLogic
    private Integer delFlag = 1;
}
