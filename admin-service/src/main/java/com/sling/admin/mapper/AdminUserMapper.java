package com.sling.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.admin.entity.AdminUser;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminUserMapper extends BaseMapper<AdminUser> {
}