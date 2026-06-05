package com.sling.warning.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

@Data
public class ActiveArea {
    @TableId
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;
    private String areaName;
    private Integer level;
    private String levelText;
    private Double lng;
    private Double lat;
    private String protectionSuggestion;
    private String activeRecord;
    private String commonSnakes;
    private String toxicityList;
    private String lastUpdate;
    private String suggestions;
    private String activityRecord;
    private String boundaryCoordinates;
    private String description;
}