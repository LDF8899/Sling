package com.sling.warning.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

@Data
@TableName("warning_area")
public class WarningArea {
    @TableId
    @JsonSerialize(using = ToStringSerializer.class)
    private Long areaId;
    private String areaName;
    private Long regionId;
    private String description;
    private String boundaryCoordinates;
    private String snakeSpecies;
    private Integer warningLevel;
    private java.sql.Timestamp createTime;
    private Long createdBy;
    private String creatorRole;    // forester / medic / admin
    private java.sql.Timestamp updatedAt;
}