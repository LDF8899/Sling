package com.sling.snakeinfo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * 蛇类物种信息实体
 */
@Data
@TableName("snake_info")
public class SnakeInfo {

    @TableId(value = "snake_id", type = IdType.AUTO)
    private Long snakeId;

    /** 蛇类名称 */
    private String snakeName;

    /** 形态特征描述 */
    private String characteristics;

    /** 毒性等级：0=无毒 1=轻度 2=中度 3=重度 */
    private Integer toxicityLevel;

    /** 栖息地信息 */
    private String habitatInfo;

    /** 保护状态 */
    private String conservationStatus;

    @TableField(exist = false)
    private Long id;

    /** 科 */
    private String family;

    /** 属 */
    private String genus;

    /** 拉丁学名 */
    private String latinName;

    /** 毒素类型 */
    private String toxinType;

    /** 危险等级 */
    private String dangerLevel;

    /** 地理分布 */
    private String distribution;

    private LocalDateTime createdTime;
    private Integer delFlag;
}
