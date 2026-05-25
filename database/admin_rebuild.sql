-- =============================================
-- SLING Admin 重构 - 系统配置表
-- =============================================

USE `sl`;

CREATE TABLE IF NOT EXISTS `system_config` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `config_key` varchar(100) NOT NULL COMMENT '配置键',
  `config_value` text COMMENT '配置值',
  `config_group` varchar(50) DEFAULT 'basic' COMMENT '配置分组',
  `updated_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_config_key` (`config_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统配置表';

-- 默认配置
INSERT INTO `system_config` (`config_key`, `config_value`, `config_group`) VALUES
('site_name', '蛇灵 - 智能蛇类识别与应急平台', 'basic'),
('site_description', '面向户外工作者的蛇类识别与应急响应平台', 'basic'),
('max_upload_size', '20', 'basic'),
('maintenance_mode', 'false', 'basic'),
('max_login_attempts', '5', 'security'),
('lockout_duration', '30', 'security'),
('password_policy', 'medium', 'security'),
('session_timeout', '120', 'security'),
('two_factor_enabled', 'false', 'security'),
('smtp_host', '', 'email'),
('smtp_port', '587', 'email'),
('smtp_username', '', 'email'),
('smtp_password', '', 'email'),
('sender_name', '蛇灵平台', 'email'),
('smtp_ssl', 'true', 'email');

-- 给 user_info 表添加 status 字段（如果不存在）
ALTER TABLE `user_info` ADD COLUMN IF NOT EXISTS `status` int DEFAULT 1 COMMENT '状态：0-禁用，1-启用' AFTER `phone`;
