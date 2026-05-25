package com.sling.hospital.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.hospital.entity.HospitalInfo;
import com.sling.hospital.mapper.HospitalInfoMapper;
import com.sling.hospital.service.HospitalInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of {@link HospitalInfoService} using MyBatis-Plus.
 */
@Slf4j
@Service
public class HospitalInfoServiceImpl extends ServiceImpl<HospitalInfoMapper, HospitalInfo>
        implements HospitalInfoService {

    @Autowired
    private HospitalInfoMapper hospitalInfoMapper;

    @Override
    public HospitalInfo getHospitalById(Long hospitalId) {
        QueryWrapper<HospitalInfo> wrapper = new QueryWrapper<>();
        wrapper.eq("hospital_id", hospitalId)
                .eq("del_flag", false);
        return hospitalInfoMapper.selectOne(wrapper);
    }
}
