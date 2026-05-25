package com.sling.warning.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import lombok.Data;

@Data
public class ActiveArea {
    @TableId
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
}