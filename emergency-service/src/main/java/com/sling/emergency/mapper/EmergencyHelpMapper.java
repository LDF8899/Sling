package com.sling.emergency.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.emergency.entity.EmergencyHelp;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmergencyHelpMapper extends BaseMapper<EmergencyHelp> {
    // 继承BaseMapper后，自动拥有基本的CRUD操作
    // 如有特殊查询需求，可以在这里添加自定义方法
}