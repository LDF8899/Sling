package com.sling.hospital.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.hospital.entity.HospitalInfo;
import com.sling.hospital.entity.SerumInventory;
import com.sling.hospital.mapper.HospitalInfoMapper;
import com.sling.hospital.mapper.SerumInventoryMapper;
import com.sling.hospital.service.HospitalInfoService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Implementation of {@link HospitalInfoService} using MyBatis-Plus.
 */
@Slf4j
@Service
public class HospitalInfoServiceImpl extends ServiceImpl<HospitalInfoMapper, HospitalInfo>
        implements HospitalInfoService {

    @Autowired
    private HospitalInfoMapper hospitalInfoMapper;

    @Autowired
    private SerumInventoryMapper serumInventoryMapper;

    @Override
    public HospitalInfo getHospitalById(Long hospitalId) {
        QueryWrapper<HospitalInfo> wrapper = new QueryWrapper<>();
        wrapper.eq("hospital_id", hospitalId)
                .eq("del_flag", false);
        return hospitalInfoMapper.selectOne(wrapper);
    }

    @Override
    public List<Map<String, Object>> getHospitalsWithSerum(Long snakeId) {
        log.info("查询有蛇种ID={}血清的医院列表", snakeId);

        // 1. 查询有该蛇种血清的库存记录
        QueryWrapper<SerumInventory> inventoryWrapper = new QueryWrapper<>();
        inventoryWrapper.eq("snake_id", snakeId)
                .gt("serum_amount", 0);  // 库存大于0
        List<SerumInventory> inventories = serumInventoryMapper.selectList(inventoryWrapper);

        if (inventories.isEmpty()) {
            log.info("没有找到蛇种ID={}的血清库存记录", snakeId);
            return new ArrayList<>();
        }

        // 2. 获取医院ID列表
        List<Long> hospitalIds = inventories.stream()
                .map(SerumInventory::getHospitalId)
                .distinct()
                .toList();

        // 3. 查询医院信息
        QueryWrapper<HospitalInfo> hospitalWrapper = new QueryWrapper<>();
        hospitalWrapper.in("hospital_id", hospitalIds)
                .eq("del_flag", false);
        List<HospitalInfo> hospitals = hospitalInfoMapper.selectList(hospitalWrapper);

        // 4. 组装结果
        List<Map<String, Object>> result = new ArrayList<>();
        for (HospitalInfo hospital : hospitals) {
            // 找到该医院对应的血清库存
            SerumInventory inventory = inventories.stream()
                    .filter(i -> i.getHospitalId().equals(hospital.getHospitalId()))
                    .findFirst()
                    .orElse(null);

            if (inventory != null) {
                Map<String, Object> item = new HashMap<>();
                item.put("hospitalId", hospital.getHospitalId());
                item.put("hospitalName", hospital.getHospitalName());
                item.put("address", hospital.getAddress());
                item.put("latitude", hospital.getLatitude());
                item.put("longitude", hospital.getLongitude());
                item.put("contactInfo", hospital.getContactInfo());
                item.put("hospitalType", hospital.getHospitalType());
                item.put("emergencyDepartment", hospital.getEmergencyDepartment());
                item.put("serumAmount", inventory.getSerumAmount());
                item.put("serumExpiryDate", inventory.getSerumExpiryDate());
                result.add(item);
            }
        }

        log.info("找到{}家有蛇种ID={}血清的医院", result.size(), snakeId);
        return result;
    }
}
