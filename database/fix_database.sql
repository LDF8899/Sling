-- =============================================
-- SLING 数据库修复脚本
-- 基于服务实体逆向分析
-- =============================================

USE `sl`;

-- =============================================
-- 1. 创建缺失的表
-- =============================================

-- 1.1 角色权限关联表
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `permission_id` bigint NOT NULL COMMENT '权限ID',
  `permission_name` varchar(100) DEFAULT NULL COMMENT '权限名称',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间(BaseEntity)',
  `updated_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间(BaseEntity)',
  `create_by` varchar(50) DEFAULT NULL COMMENT '创建人',
  `update_by` varchar(50) DEFAULT NULL COMMENT '更新人',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `del_flag` int DEFAULT 1 COMMENT '删除标志：0-已删除，1-正常',
  PRIMARY KEY (`id`),
  KEY `idx_role_id` (`role_id`),
  KEY `idx_permission_id` (`permission_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='角色权限关联表';

-- 1.2 管理员用户表
DROP TABLE IF EXISTS `admin_users`;
CREATE TABLE `admin_users` (
  `admin_id` bigint NOT NULL AUTO_INCREMENT COMMENT '管理员ID',
  `username` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(255) NOT NULL COMMENT '密码(明文)',
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) DEFAULT NULL COMMENT '手机号',
  `real_name` varchar(50) DEFAULT NULL COMMENT '真实姓名',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `department` varchar(100) DEFAULT NULL COMMENT '部门',
  `position` varchar(100) DEFAULT NULL COMMENT '职位',
  `status` int DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `last_login_time` datetime DEFAULT NULL COMMENT '最后登录时间',
  `last_login_ip` varchar(50) DEFAULT NULL COMMENT '最后登录IP',
  `two_factor_enabled` int DEFAULT 0 COMMENT '双因素认证：0-关，1-开',
  `totp_secret` varchar(100) DEFAULT NULL COMMENT 'TOTP密钥',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` int DEFAULT 0 COMMENT '删除标志：0-正常，1-删除',
  PRIMARY KEY (`admin_id`),
  UNIQUE KEY `uk_admin_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员用户表';

-- 默认管理员
INSERT INTO `admin_users` VALUES (1, 'admin', 'admin123', 'admin@sling.com', '13800000000', '系统管理员', NULL, '技术部', '管理员', 1, NOW(), '127.0.0.1', 0, NULL, NOW(), NOW(), 0);

-- 1.3 管理员角色表
DROP TABLE IF EXISTS `admin_roles`;
CREATE TABLE `admin_roles` (
  `role_id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `role_name` varchar(50) NOT NULL COMMENT '角色名称',
  `role_code` varchar(50) NOT NULL COMMENT '角色编码',
  `role_description` varchar(255) DEFAULT NULL COMMENT '角色描述',
  `permissions` text COMMENT '权限列表(JSON)',
  `status` int DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`role_id`),
  UNIQUE KEY `uk_role_code` (`role_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员角色表';

INSERT INTO `admin_roles` VALUES (1, '超级管理员', 'SUPER_ADMIN', '拥有系统所有权限', '["all"]', 1, NOW(), NOW());
INSERT INTO `admin_roles` VALUES (2, '内容管理员', 'CONTENT_ADMIN', '管理蛇类信息、预警内容', '["snake:manage","warning:manage","hospital:manage"]', 1, NOW(), NOW());
INSERT INTO `admin_roles` VALUES (3, '用户管理员', 'USER_ADMIN', '管理用户和权限', '["user:manage","role:manage"]', 1, NOW(), NOW());

-- 1.4 管理员用户角色关联表
DROP TABLE IF EXISTS `admin_user_roles`;
CREATE TABLE `admin_user_roles` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `admin_user_id` bigint NOT NULL COMMENT '管理员用户ID',
  `role_id` bigint NOT NULL COMMENT '角色ID',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `del_flag` int DEFAULT 0 COMMENT '删除标志',
  PRIMARY KEY (`id`),
  KEY `idx_aur_admin_user_id` (`admin_user_id`),
  KEY `idx_aur_role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员用户角色关联表';

INSERT INTO `admin_user_roles` VALUES (1, 1, 1, NOW(), 0);

-- 1.5 管理员操作日志表 (以 admin-service 实体为准)
DROP TABLE IF EXISTS `admin_operation_log`;
CREATE TABLE `admin_operation_log` (
  `log_id` bigint NOT NULL AUTO_INCREMENT COMMENT '日志ID',
  `admin_user_id` bigint DEFAULT NULL COMMENT '管理员用户ID',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `operation_type` varchar(100) DEFAULT NULL COMMENT '操作类型',
  `method` varchar(200) DEFAULT NULL COMMENT '请求方法',
  `operation_params` text COMMENT '操作参数',
  `ip_address` varchar(50) DEFAULT NULL COMMENT 'IP地址',
  `user_agent` varchar(500) DEFAULT NULL COMMENT '用户代理',
  `operation_result` int DEFAULT NULL COMMENT '操作结果',
  `operation_desc` text COMMENT '操作描述',
  `operation_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '操作时间',
  PRIMARY KEY (`log_id`),
  KEY `idx_aol_admin_user_id` (`admin_user_id`),
  KEY `idx_aol_operation_time` (`operation_time` DESC),
  KEY `idx_aol_username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='管理员操作日志表';

-- 1.6 紧急求助表
DROP TABLE IF EXISTS `emergency_help`;
CREATE TABLE `emergency_help` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `type` varchar(50) DEFAULT 'snake_bite' COMMENT '求助类型',
  `location` varchar(255) DEFAULT NULL COMMENT '位置信息',
  `description` text COMMENT '详细描述',
  `phone` varchar(20) DEFAULT NULL COMMENT '联系电话',
  `is_public` tinyint(1) DEFAULT 0 COMMENT '是否公开',
  `image_count` int DEFAULT 0 COMMENT '图片数量',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `is_alerted` tinyint(1) DEFAULT 0 COMMENT '是否已报警',
  `alert_time` datetime DEFAULT NULL COMMENT '报警时间',
  `status` varchar(20) DEFAULT 'pending' COMMENT '状态',
  PRIMARY KEY (`id`),
  KEY `idx_eh_status` (`status`),
  KEY `idx_eh_create_time` (`create_time` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='紧急求助表';

-- =============================================
-- 2. 修复 snake_info 表 (添加 BaseEntity 需要的列)
-- =============================================
ALTER TABLE `snake_info`
  ADD COLUMN `id` bigint DEFAULT NULL COMMENT '与snake_id同步(BaseEntity)',
  ADD COLUMN `created_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间(BaseEntity)',
  ADD COLUMN `updated_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间(BaseEntity)',
  ADD COLUMN `create_by` varchar(50) DEFAULT NULL COMMENT '创建人(BaseEntity)',
  ADD COLUMN `update_by` varchar(50) DEFAULT NULL COMMENT '更新人(BaseEntity)',
  ADD COLUMN `remark` varchar(500) DEFAULT NULL COMMENT '备注(BaseEntity)',
  ADD COLUMN `del_flag` int DEFAULT 1 COMMENT '删除标志(BaseEntity)';

UPDATE `snake_info` SET `id` = `snake_id`, `del_flag` = 0 WHERE `id` IS NULL;
UPDATE `snake_info` SET `id` = `snake_id`, `del_flag` = 0 WHERE 1=1;

-- 触发器：INSERT 时 snako_id 复制到 id
DROP TRIGGER IF EXISTS `trg_snake_info_insert`;
CREATE TRIGGER `trg_snake_info_insert` BEFORE INSERT ON `snake_info` FOR EACH ROW
  SET NEW.id = COALESCE(NEW.id, NEW.snake_id);

-- =============================================
-- 3. 修复 user_permission 表 (permission_id → id)
-- =============================================
-- 先尝试删除外键（如果存在会报错，忽略）
-- ALTER TABLE `user_permission` DROP FOREIGN KEY `fk_permission_user`;

ALTER TABLE `user_permission`
  CHANGE COLUMN `permission_id` `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键ID';

ALTER TABLE `user_permission`
  ADD COLUMN `created_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间(BaseEntity)',
  ADD COLUMN `updated_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间(BaseEntity)',
  ADD COLUMN `create_by` varchar(50) DEFAULT NULL COMMENT '创建人(BaseEntity)',
  ADD COLUMN `update_by` varchar(50) DEFAULT NULL COMMENT '更新人(BaseEntity)',
  ADD COLUMN `remark` varchar(500) DEFAULT NULL COMMENT '备注(BaseEntity)',
  ADD COLUMN `del_flag` int DEFAULT 1 COMMENT '删除标志(BaseEntity)';

UPDATE `user_permission` SET `created_time` = NOW(), `del_flag` = 1 WHERE `del_flag` IS NULL;

ALTER TABLE `user_permission`
  ADD CONSTRAINT `fk_permission_user` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- =============================================
-- 4. 确保 hospital_info 有完整字段
-- =============================================
-- 如果已存在则忽略错误
ALTER TABLE `hospital_info` ADD COLUMN `serum_availability` tinyint(1) DEFAULT 0 COMMENT '是否有血清';
ALTER TABLE `hospital_info` ADD COLUMN `snake_venom_treatment` tinyint(1) DEFAULT 0 COMMENT '能否治疗蛇毒';
ALTER TABLE `hospital_info` ADD COLUMN `snake_venom_keywords` varchar(255) DEFAULT NULL COMMENT '蛇毒关键词';

-- =============================================
-- 5. 确保密码字段支持明文
-- =============================================
ALTER TABLE `user_info` MODIFY COLUMN `password` varchar(255) NOT NULL COMMENT '用户密码(明文存储)';
ALTER TABLE `admin_users` MODIFY COLUMN `password` varchar(255) NOT NULL COMMENT '密码(明文存储)';

-- =============================================
-- 6. 验证
-- =============================================
SHOW TABLES;
SELECT '=== snake_info 列 ===' AS info;
SHOW COLUMNS FROM `snake_info`;
SELECT '=== user_permission 列 ===' AS info;
SHOW COLUMNS FROM `user_permission`;
SELECT '=== admin_users ===' AS info;
SELECT admin_id, username, password, real_name, status FROM admin_users;
SELECT '=== user_info 密码(明文) ===' AS info;
SELECT user_id, username, password FROM user_info;
