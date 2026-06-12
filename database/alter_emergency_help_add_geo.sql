-- ============================================
-- 给 emergency_help 表添加地理坐标字段
-- 执行时间：2026-06-08
-- 目的：支持 Redis GEO 空间查询，用于 Agent 调度时计算距离
-- ============================================

USE sl;

-- 添加经度和纬度字段
ALTER TABLE emergency_help
ADD COLUMN longitude DOUBLE COMMENT '经度' AFTER toxicity_level,
ADD COLUMN latitude DOUBLE COMMENT '纬度' AFTER longitude;

-- 添加索引（支持空间范围查询）
CREATE INDEX idx_eh_geo ON emergency_help(longitude, latitude);

-- 验证
DESCRIBE emergency_help;
