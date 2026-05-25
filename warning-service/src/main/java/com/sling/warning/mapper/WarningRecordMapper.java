package com.sling.warning.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.warning.entity.WarningRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface WarningRecordMapper extends BaseMapper<WarningRecord> {
    
    /**
     * 查询最近的预警记录
     * @param limit 限制条数
     * @param riskLevel 风险等级
     * @return 预警记录列表
     */
    @Select("<script>" +
            "SELECT wr.id, wr.warning_content as warningContent, wr.warning_time as warningTime, " +
            "wa.area_name as areaName, wa.warning_level as level, " +
            "CASE wa.warning_level " +
            "WHEN 1 THEN '低风险' " +
            "WHEN 2 THEN '中风险' " +
            "WHEN 3 THEN '高风险' " +
            "END as levelText " +
            "FROM warning_record wr " +
            "LEFT JOIN warning_area wa ON wr.area_id = wa.area_id " +
            "WHERE wr.is_valid = 1 " +
            "<if test='riskLevel != null'> " +
            "AND wa.warning_level = #{riskLevel} " +
            "</if> " +
            "ORDER BY wr.warning_time DESC " +
            "LIMIT #{limit}" +
            "</script>")
    List<WarningRecord> selectRecentWarnings(@Param("limit") Integer limit, @Param("riskLevel") Integer riskLevel);
}