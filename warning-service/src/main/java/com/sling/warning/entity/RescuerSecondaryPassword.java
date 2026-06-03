package com.sling.warning.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.sql.Timestamp;

@Data
@TableName("rescuer_secondary_password")
public class RescuerSecondaryPassword {
    @TableId
    private Long id;
    private String role;       // forester / medic
    private String password;
    private Timestamp createTime;
    private Timestamp updateTime;
}
