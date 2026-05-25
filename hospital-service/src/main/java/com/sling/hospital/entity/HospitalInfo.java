package com.sling.hospital.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@TableName("hospital_info")
public class HospitalInfo {
    @TableId(type = IdType.AUTO)
    private Long hospitalId;

    private String hospitalName;

    private String address;

    private BigDecimal latitude;

    private BigDecimal longitude;

    private String contactInfo;

    private String hospitalType;

    private Boolean emergencyDepartment;

    private LocalDateTime createdTime;

    private LocalDateTime updatedTime;

    private Boolean delFlag;

    // 计算距离的辅助字段
    @TableField(exist = false)
    private Double distance;

    // 辅助字段：距离描述（如"1.2公里"）
    @TableField(exist = false)
    private String distanceDesc;

    // 医院等级（新增）
    @TableField(exist = false)
    private String hospitalGrade;
}