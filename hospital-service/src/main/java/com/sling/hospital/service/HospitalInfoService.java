package com.sling.hospital.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.hospital.entity.HospitalInfo;

import java.util.List;

public interface HospitalInfoService extends IService<HospitalInfo> {
    
    /**
     * 根据ID获取医院信息
     */
    HospitalInfo getHospitalById(Long hospitalId);
}