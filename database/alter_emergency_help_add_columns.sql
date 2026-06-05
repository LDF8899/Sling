-- ============================================
-- 给 emergency_help 表添加识别关联字段
-- 执行时间：2026-06-04
-- 目的：关联用户的识别结果，让救助端能看到更多信息
-- ============================================

USE sl;

-- 添加新字段
ALTER TABLE emergency_help
ADD COLUMN snake_name VARCHAR(100) COMMENT '识别出的蛇名' AFTER status,
ADD COLUMN snake_id BIGINT COMMENT '关联 snake_info 表的 snake_id' AFTER snake_name,
ADD COLUMN recognition_record_id BIGINT COMMENT '关联 recognition_record 表的 record_id' AFTER snake_id,
ADD COLUMN toxicity_level INT COMMENT '毒性等级 (0=无毒, 1=低毒, 2=有毒, 3=剧毒)' AFTER recognition_record_id;

-- 添加索引
CREATE INDEX idx_snake_id ON emergency_help(snake_id);
CREATE INDEX idx_recognition_record_id ON emergency_help(recognition_record_id);

-- 验证
DESCRIBE emergency_help;
