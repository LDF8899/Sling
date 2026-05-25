package com.sling.user.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.user.entity.Role;
import com.sling.user.entity.UserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface UserRoleMapper extends BaseMapper<UserRole> {
    /**
     * 根据用户ID获取用户角色列表
     * @param userId 用户ID
     * @return 角色列表
     */
    @Select("SELECT r.* FROM user_role ur JOIN role r ON ur.role_id = r.role_id WHERE ur.user_id = #{userId}")
    List<Role> selectRolesByUserId(Long userId);
}