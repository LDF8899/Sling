/*
 * 预警系统重构 — 数据库迁移脚本
 * 执行前请先备份数据库！
 */

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

USE `sl`;

-- =============================================
-- 1. 新增表：region（区域层级）
-- =============================================
DROP TABLE IF EXISTS `region`;
CREATE TABLE `region` (
  `region_id`    BIGINT NOT NULL AUTO_INCREMENT COMMENT '区域唯一标识',
  `name`         VARCHAR(50) NOT NULL COMMENT '区域名称',
  `parent_id`    BIGINT DEFAULT NULL COMMENT '父区域ID，NULL表示顶级大区',
  `level`        TINYINT NOT NULL COMMENT '层级：1=大区, 2=省/市, 3=具体区域',
  `center_lng`   DECIMAL(10,6) DEFAULT NULL COMMENT '中心经度（地图定位用）',
  `center_lat`   DECIMAL(10,6) DEFAULT NULL COMMENT '中心纬度（地图定位用）',
  `zoom_level`   INT DEFAULT 10 COMMENT '地图默认缩放级别',
  `create_time`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`region_id`),
  KEY `idx_parent` (`parent_id`),
  KEY `idx_level` (`level`),
  FOREIGN KEY (`parent_id`) REFERENCES `region`(`region_id`) ON DELETE CASCADE
) ENGINE=InnoDB CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='区域层级表（大区→省/市→具体区域）';

-- =============================================
-- 2. 新增表：rescuer_secondary_password（二级密码）
-- =============================================
DROP TABLE IF EXISTS `rescuer_secondary_password`;
CREATE TABLE `rescuer_secondary_password` (
  `id`          BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `role`        VARCHAR(20) NOT NULL COMMENT '角色：forester=护林员, medic=医护人员',
  `password`    VARCHAR(255) NOT NULL COMMENT '加密后的二级密码',
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role` (`role`)
) ENGINE=InnoDB CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='救助端二级密码（按角色共享）';

-- 初始密码（明文 forester123 和 medic123，上线前需改为加密存储）
INSERT INTO `rescuer_secondary_password` (`role`, `password`) VALUES ('forester', 'forester123');
INSERT INTO `rescuer_secondary_password` (`role`, `password`) VALUES ('medic', 'medic123');

-- =============================================
-- 3. 修改表：warning_area（增加区域关联和创建者信息）
-- =============================================
ALTER TABLE `warning_area`
  ADD COLUMN `region_id` BIGINT DEFAULT NULL COMMENT '关联区域ID（具体区域）' AFTER `area_name`,
  ADD COLUMN `created_by` BIGINT DEFAULT NULL COMMENT '创建人用户ID' AFTER `create_time`,
  ADD COLUMN `creator_role` VARCHAR(20) DEFAULT NULL COMMENT '创建人角色：forester/medic/admin' AFTER `created_by`,
  ADD COLUMN `updated_at` TIMESTAMP NULL DEFAULT NULL COMMENT '最后更新时间' ON UPDATE CURRENT_TIMESTAMP AFTER `creator_role`;

ALTER TABLE `warning_area`
  ADD KEY `idx_region` (`region_id`),
  ADD KEY `idx_creator` (`created_by`);

-- 清空旧的 seed 数据
DELETE FROM `warning_record`;
DELETE FROM `warning_area`;
ALTER TABLE `warning_area` AUTO_INCREMENT = 1;

-- =============================================
-- 4. 修改表：serum_inventory（增加区域关联）
-- =============================================
ALTER TABLE `serum_inventory`
  ADD COLUMN `region_id` BIGINT DEFAULT NULL COMMENT '关联区域ID（具体区域）' AFTER `inventory_id`;

ALTER TABLE `serum_inventory`
  ADD KEY `idx_region` (`region_id`);

-- =============================================
-- 5. 修改表：user_info（增加 rescuer 子类型标记）
-- =============================================
ALTER TABLE `user_info`
  ADD COLUMN `rescuer_type` VARCHAR(20) DEFAULT NULL COMMENT '救助人员子类型：forester=护林员, medic=医护人员' AFTER `avatar_url`;

-- 给现有 rescuer 角色用户标记类型（示例，按实际情况调整）
-- UPDATE `user_info` SET `rescuer_type` = 'forester' WHERE `user_id` IN (xxx);

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================
-- 迁移完成
-- =============================================
