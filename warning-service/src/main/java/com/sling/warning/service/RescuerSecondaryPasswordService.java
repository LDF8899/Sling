package com.sling.warning.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.sling.warning.entity.RescuerSecondaryPassword;

public interface RescuerSecondaryPasswordService extends IService<RescuerSecondaryPassword> {

    /**
     * 验证二级密码
     * @param role 角色（forester / medic）
     * @param password 明文密码
     * @return true=验证通过
     */
    boolean verifyPassword(String role, String password);
}
