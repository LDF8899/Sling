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
     * 查询所有风险区域（简单查询，避免 JSON_CONTAINS 导致 500）
     */
    @Select("SELECT wa.area_id as id, wa.area_name as areaName, wa.warning_level as level, " +
            "wa.boundary_coordinates as boundaryCoordinates, wa.description as description, " +
            "wa.snake_species as snakeSpecies " +
            "FROM warning_area wa ORDER BY wa.warning_level DESC")
    List<ActiveArea> selectAllActiveAreas();
}