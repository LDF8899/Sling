package com.sling.hospital.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.hospital.entity.HospitalInfo;

import java.util.List;
import java.util.Map;

public interface HospitalInfoService extends IService<HospitalInfo> {

    /**
     * 根据ID获取医院信息
     */
    HospitalInfo getHospitalById(Long hospitalId);

    /**
     * 查询有特定蛇种血清的医院列表
     * @param snakeId 蛇类ID
     * @return 医院列表，包含血清库存信息
     */
    List<Map<String, Object>> getHospitalsWithSerum(Long snakeId);
}