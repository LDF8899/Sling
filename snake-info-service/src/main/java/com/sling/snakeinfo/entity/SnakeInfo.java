package com.sling.snakeinfo.entity;

import com.baomidou.mybatisplus.annotation.IdType;
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

    /** 科名 */
    private String family;

    /** 属名 */
    private String genus;

    /** 拉丁学名 */
    private String latinName;

    /** 形态特征描述 */
    private String characteristics;

    /** 毒性等级：0=无毒 1=轻度 2=中度 3=重度 */
    private Integer toxicityLevel;

    /** 毒素类型 */
    private String toxinType;

    /** 危险梯队：无毒/轻度/中度/重度 */
    private String dangerLevel;

    /** 栖息地信息 */
    private String habitatInfo;

    /** 分布省份 */
    private String distribution;

    /** 保护状态 */
    private String conservationStatus;

    private Long id;
    private LocalDateTime createdTime;
    private Integer delFlag;
}
