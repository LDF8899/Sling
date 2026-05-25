package com.sling.hospital.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.hospital.entity.HospitalInfo;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.math.BigDecimal;
import java.util.List;

@Mapper
public interface HospitalInfoMapper extends BaseMapper<HospitalInfo> {
    /**
     * 根据经纬度和距离范围查找附近的医院
     * @param userLat 用户纬度
     * @param userLng 用户经度
     * @param distance 距离范围（单位：米）
     * @return 附近的医院列表
     */
    List<HospitalInfo> selectNearbyHospitals(@Param("userLat") BigDecimal userLat, 
                                          @Param("userLng") BigDecimal userLng, 
                                          @Param("distance") Integer distance);
    
    /**
     * 根据条件搜索附近的医院
     * @param userLat 用户纬度
     * @param userLng 用户经度
     * @param radius 搜索半径（单位：米）
     * @param keyword 搜索关键词
     * @param maxResults 最大返回结果数
     * @return 附近的医院列表
     */
    List<HospitalInfo> searchNearbyHospitals(@Param("userLat") BigDecimal userLat,
                                           @Param("userLng") BigDecimal userLng,
                                           @Param("radius") Integer radius,
                                           @Param("keyword") String keyword,
                                           @Param("maxResults") Integer maxResults);
}