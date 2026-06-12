package com.sling.emergency.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.util.Date;

@Data
@TableName("emergency_help")
public class EmergencyHelp {

    @TableId(type = IdType.AUTO)
    private Long id;

    // 求助类型 (snake_bite, animal_harm, other)
    private String type;

    // 位置信息
    private String location;

    // 详细描述
    private String description;

    // 联系电话
    private String phone;

    // 是否公开求助
    private Boolean isPublic;

    // 图片数量
    private Integer imageCount;

    // 创建时间
    private Date createTime;

    // 更新时间
    private Date updateTime;

    // 是否已报警
    private Boolean isAlerted;

    // 报警时间
    private Date alertTime;

    // 状态 (pending, processing, resolved)
    private String status;

    // ========== 新增字段：关联识别信息 ==========

    // 识别出的蛇名
    private String snakeName;

    // 关联 snake_info 表的 snake_id
    private Long snakeId;

    // 关联 recognition_record 表的 record_id
    private Long recognitionRecordId;

    // 毒性等级 (0=无毒, 1=低毒, 2=有毒, 3=剧毒)
    private Integer toxicityLevel;

    // ========== 新增字段：地理坐标 ==========

    // 经度
    private Double longitude;

    // 纬度
    private Double latitude;

    // 创建时初始化时间
    public EmergencyHelp() {
        this.createTime = new Date();
        this.updateTime = new Date();
        this.isPublic = false;
        this.isAlerted = false;
        this.status = "pending"; // 默认为待处理
    }
}