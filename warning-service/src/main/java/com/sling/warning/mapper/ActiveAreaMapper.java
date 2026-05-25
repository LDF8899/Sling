package com.sling.warning.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.warning.entity.ActiveArea;
import com.sling.warning.entity.WarningArea;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ActiveAreaMapper extends BaseMapper<ActiveArea> {
    
    /**
     * 根据风险等级和毒性等级查询风险区域
     * @param riskLevels 风险等级列表
     * @param toxicityLevels 毒性等级列表
     * @return 风险区域列表
     */
    @Select("<script>" +
            "SELECT wa.area_id as id, wa.area_name as areaName, wa.warning_level as level, " +
            "wa.boundary_coordinates as boundaryCoordinates " +
            "FROM warning_area wa " +
            "LEFT JOIN snake_info si ON JSON_CONTAINS(wa.snake_species, CAST(si.snake_id AS CHAR)) " +
            "WHERE 1=1 " +
            "<if test='riskLevels != null and riskLevels.size() > 0'> " +
            "AND wa.warning_level IN " +
            "<foreach item='item' collection='riskLevels' open='(' separator=',' close=')'>#{item}</foreach>" +
            "</if> " +
            "<if test='toxicityLevels != null and toxicityLevels.size() > 0'> " +
            "AND si.toxicity_level IN " +
            "<foreach item='item' collection='toxicityLevels' open='(' separator=',' close=')'>#{item}</foreach>" +
            "</if> " +
            "GROUP BY wa.area_id" +
            "</script>")
    List<ActiveArea> selectActiveAreasByRiskAndToxicity(List<Integer> riskLevels, List<Integer> toxicityLevels);
}