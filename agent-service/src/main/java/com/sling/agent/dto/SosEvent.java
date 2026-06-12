package com.sling.agent.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

/**
 * SOS 事件 DTO — 通过 RabbitMQ 传递
 */
@Data
public class SosEvent implements Serializable {

    private static final long serialVersionUID = 1L;

    /** 求助记录 ID */
    private Long helpId;

    /** 求助类型 (snake_bite / animal_harm / other) */
    private String type;

    /** 位置信息（文本描述） */
    private String location;

    /** 经度 */
    private Double longitude;

    /** 纬度 */
    private Double latitude;

    /** 详细描述 */
    private String description;

    /** 联系电话 */
    private String phone;

    /** 识别出的蛇名 */
    private String snakeName;

    /** 蛇种 ID */
    private Long snakeId;

    /** 毒性等级 (0=无毒, 1=低毒, 2=有毒, 3=剧毒) */
    private Integer toxicityLevel;

    /** 识别记录 ID */
    private Long recognitionRecordId;

    /** 事件发生时间 */
    private Date eventTime;

    /** 当前状态 */
    private String status;

    /** 事件类型：created / status_changed */
    private String eventType;
}
