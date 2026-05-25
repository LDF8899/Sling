package com.sling.warning.entity;

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
    private String areaName;
    private Integer level;
    private String levelText;
    private String snakeNames;
    private String toxicityDesc;
    private Integer isValid;
}