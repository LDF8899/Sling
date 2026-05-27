package com.sling.warning.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("warning_record")
public class WarningRecord {
    @TableId
    private Long id;
    private Long areaId;
    private String warningContent;
    private String warningTime;  // 改为String类型以避免类型转换错误

    @TableField(exist = false)
    private String areaName;

    @TableField(exist = false)
    private Integer level;

    @TableField(exist = false)
    private String levelText;

    @TableField(exist = false)
    private String snakeNames;

    @TableField(exist = false)
    private String toxicityDesc;

    private Integer isValid;
}