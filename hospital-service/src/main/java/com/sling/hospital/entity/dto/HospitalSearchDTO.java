package com.sling.hospital.entity.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class HospitalSearchDTO {
    /**
     * 用户输入（支持模糊地址或经纬度字符串，如"广州市天河区"或"113.32,23.13"）
     */
    @NotNull(message = "用户位置信息不能为空")
    private String userInput;

    /**
     * 搜索半径（单位：米，默认5000米）
     */
    private Integer radius = 5000;

    /**
     * 搜索类型（hospital-医院，clinic-诊所等）
     */
    private String searchType = "hospital";

    /**
     * 搜索关键词（可选，用于搜索特定类型的医院）
     */
    private String keyword;

    /**
     * 最大返回结果数
     */
    private Integer maxResults = 10;
}