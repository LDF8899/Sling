package com.sling.warning.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.sling.warning.entity.RescuerSecondaryPassword;
import com.sling.warning.mapper.RescuerSecondaryPasswordMapper;
import com.sling.warning.service.RescuerSecondaryPasswordService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class RescuerSecondaryPasswordServiceImpl
        extends ServiceImpl<RescuerSecondaryPasswordMapper, RescuerSecondaryPassword>
        implements RescuerSecondaryPasswordService {

    @Override
    public boolean verifyPassword(String role, String password) {
        if (role == null || password == null) {
            return false;
        }
        RescuerSecondaryPassword record = getOne(
                new QueryWrapper<RescuerSecondaryPassword>().eq("role", role));
        if (record == null) {
            log.warn("未找到角色 {} 的二级密码配置", role);
            return false;
        }
        // 当前使用明文比对，上线前改为 BCrypt
        return password.equals(record.getPassword());
    }
}
