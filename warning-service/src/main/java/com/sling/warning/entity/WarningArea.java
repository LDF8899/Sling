package com.sling.warning.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("warning_area")
public class WarningArea {
    @TableId
    private Long areaId;
    private String areaName;
    private String description;
    private String boundaryCoordinates;
    private String snakeSpecies;
    private Integer warningLevel;
    private java.sql.Timestamp createTime;
}