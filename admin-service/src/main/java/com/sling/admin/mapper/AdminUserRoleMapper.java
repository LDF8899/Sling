package com.sling.admin.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.sling.admin.entity.AdminUserRole;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface AdminUserRoleMapper extends BaseMapper<AdminUserRole> {

    @Select("SELECT ar.role_id, ar.role_name, ar.role_code, ar.role_description, ar.status " +
            "FROM admin_user_roles aur " +
            "JOIN admin_roles ar ON aur.role_id = ar.role_id " +
            "WHERE aur.admin_user_id = #{userId} AND aur.del_flag = 0 AND ar.status = 1")
    List<Map<String, Object>> selectUserRolesWithDetails(Long userId);
}