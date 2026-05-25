package com.sling.admin.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.admin.entity.AdminUser;
import com.sling.admin.mapper.AdminUserMapper;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AdminUserService extends ServiceImpl<AdminUserMapper, AdminUser> {

    private final AdminUserMapper mapper;

    public AdminUserService(AdminUserMapper mapper) {
        this.mapper = mapper;
    }

    public AdminUser findByUsername(String username) {
        QueryWrapper<AdminUser> wrapper = new QueryWrapper<>();
        wrapper.eq("username", username).eq("del_flag", 0);
        return mapper.selectOne(wrapper);
    }

    public boolean updateLastLoginInfo(Long adminId, String ip) {
        AdminUser user = new AdminUser();
        user.setAdminId(adminId);
        user.setLastLoginTime(LocalDateTime.now());
        user.setLastLoginIp(ip);
        return mapper.updateById(user) > 0;
    }

    public List<AdminUser> getAllActiveAdmins() {
        QueryWrapper<AdminUser> wrapper = new QueryWrapper<>();
        wrapper.eq("del_flag", 0).eq("status", 1);
        return mapper.selectList(wrapper);
    }

    public Map<String, Object> listAdmins(int page, int size, String keyword) {
        Page<AdminUser> pageInfo = new Page<>(page, size);
        QueryWrapper<AdminUser> wrapper = new QueryWrapper<>();
        wrapper.eq("del_flag", 0);
        if (keyword != null && !keyword.trim().isEmpty()) {
            wrapper.and(w -> w
                    .like("username", keyword)
                    .or().like("real_name", keyword)
                    .or().like("email", keyword)
                    .or().like("phone", keyword));
        }
        wrapper.orderByDesc("create_time");
        Page<AdminUser> result = mapper.selectPage(pageInfo, wrapper);
        result.getRecords().forEach(u -> u.setPassword(null));

        Map<String, Object> data = new HashMap<>();
        data.put("list", result.getRecords());
        data.put("total", result.getTotal());
        data.put("page", page);
        data.put("size", size);
        data.put("pages", result.getPages());
        return data;
    }

    public boolean changePassword(Long adminId, String encodedPassword) {
        AdminUser user = new AdminUser();
        user.setAdminId(adminId);
        user.setPassword(encodedPassword);
        return mapper.updateById(user) > 0;
    }

    public boolean toggleStatus(Long adminId, Integer status) {
        AdminUser user = new AdminUser();
        user.setAdminId(adminId);
        user.setStatus(status);
        return mapper.updateById(user) > 0;
    }
}
