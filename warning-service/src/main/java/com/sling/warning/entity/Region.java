package com.sling.warning.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.sql.Timestamp;

@Data
@TableName("region")
public class Region {
    @TableId
    private Long regionId;
    private String name;
    private Long parentId;
    private Integer level;       // 1=大区, 2=省/市, 3=具体区域
    private BigDecimal centerLng;
    private BigDecimal centerLat;
    private Integer zoomLevel;
    private Timestamp createTime;
}
