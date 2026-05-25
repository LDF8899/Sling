package com.sling.hospital.entity.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RouteDTO {
    /**
     * 起点经度
     */
    @NotNull(message = "起点经度不能为空")
    private Double startLon;

    /**
     * 起点纬度
     */
    @NotNull(message = "起点纬度不能为空")
    private Double startLat;

    /**
     * 终点经度
     */
    @NotNull(message = "终点经度不能为空")
    private Double endLon;

    /**
     * 终点纬度
     */
    @NotNull(message = "终点纬度不能为空")
    private Double endLat;

    /**
     * 路线类型：driving-驾车，walking-步行
     */
    private String routeType = "driving";

    /**
     * 驾车策略：0-默认路线，1-高速优先，2-国道优先，3-不走高速，4-避免收费，5-不走高速+避免收费
     */
    private Integer strategy = 0;
}