package com.sling.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.admin.entity.AdminOperationLog;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminOperationLogMapper extends BaseMapper<AdminOperationLog> {
}