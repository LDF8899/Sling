package com.sling.user.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.sling.common.entity.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Date;

@Data
@EqualsAndHashCode(callSuper = true)
@TableName("user_info")
public class User extends BaseEntity {
    /**
     * 主键ID，对应数据库中的user_id字段
     */
    @TableId(value = "user_id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户名，具有唯一性，用于用户登录和标识
     */
    private String username;

    /**
     * 用户密码，经过加密存储
     */
    private String password;

    /**
     * 用户邮箱，可用于找回密码等功能
     */
    private String email;

    /**
     * 微信 openid（小程序唯一标识）
     */
    @TableField(value = "wechat_openid")
    private String wechatOpenid;

    /**
     * 微信 unionid（跨应用统一标识）
     */
    @TableField(value = "wechat_unionid")
    private String wechatUnionid;

    /**
     * 微信昵称
     */
    @TableField(value = "wechat_nickname")
    private String wechatNickname;

    /**
     * 微信头像
     */
    @TableField(value = "wechat_avatar")
    private String wechatAvatar;

    /**
     * 用户手机号码，方便联系用户
     */
    private String phone;

    /**
     * 用户最后登录时间，记录用户最后一次登录系统的时间
     */
    @TableField(value = "last_login_time")
    private Date lastLoginTime;

    /**
     * 用户头像URL地址
     */
    @TableField(value = "avatar_url")
    private String avatarUrl;

    /**
     * 用户状态：0-禁用，1-启用
     */
    @TableField(value = "status", exist = false)
    private Integer status;

    /**
     * 预留字段，以JSON格式存储用户可能的额外信息，如个性化设置等
     */
    @TableField(value = "extra_info")
    private String extraInfo;

    /**
     * 创建时间，重写父类的createdTime字段映射
     */
    @TableField(value = "create_time")
    private Date createTime;
    
    // 注意：以下字段在父类BaseEntity中已定义，但数据库表中没有对应字段，
    // 因此标记为不存在于数据库中
    
    /**
     * 更新时间，数据库中不存在此字段，设置为不存在
     */
    @TableField(exist = false)
    private Date updateTime;

    /**
     * 创建人，数据库中不存在此字段，设置为不存在
     */
    @TableField(exist = false)
    private String createBy;

    /**
     * 更新人，数据库中不存在此字段，设置为不存在
     */
    @TableField(exist = false)
    private String updateBy;

    /**
     * 备注，数据库中不存在此字段，设置为不存在
     */
    @TableField(exist = false)
    private String remark;
    
    /**
     * 删除标志，数据库中不存在此字段，设置为不存在
     */
    @TableField(exist = false)
    private Integer delFlag;
    
    /**
     * 创建时间，重写父类的createdTime字段映射
     */
    @TableField(exist = false)
    private Date createdTime;
    
    /**
     * 更新时间，重写父类的updatedTime字段映射
     */
    @TableField(exist = false)
    private Date updatedTime;
}