package com.sling.warning.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

@Data
@TableName("snake_info")
public class SnakeInfo {
    @TableId
    private Long snakeId;
    private String snakeName;
    private String characteristics;
    private Integer toxicityLevel;
    private String habitatInfo;
    private String conservationStatus;
}