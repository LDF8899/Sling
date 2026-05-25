package com.sling.user.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.user.entity.UserPermission;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserPermissionMapper extends BaseMapper<UserPermission> {
    /**
     * 根据用户ID获取用户权限列表
     * @param userId 用户ID
     * @return 权限列表
     */
    @Select("SELECT * FROM user_permission WHERE user_id = #{userId}")
    List<UserPermission> selectByUserId(Long userId);
}