-- snake_info 表新增字段（与 SnakeInfo 实体对齐）
-- 执行前请确认数据库名为 sl

USE sl;

ALTER TABLE `snake_info`
  ADD COLUMN `family` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '科名，如眼镜蛇科、蝰科' AFTER `snake_name`,
  ADD COLUMN `genus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '属名' AFTER `family`,
  ADD COLUMN `latin_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '拉丁学名' AFTER `genus`,
  ADD COLUMN `toxin_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '毒素类型：神经毒素/血液毒素/细胞毒素/混合毒素/无毒' AFTER `toxicity_level`,
  ADD COLUMN `danger_level` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '危险梯队：重度/中度/轻度/无毒' AFTER `toxin_type`,
  ADD COLUMN `distribution` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '地理分布' AFTER `habitat_info`,
  ADD COLUMN `created_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间' AFTER `conservation_status`,
  ADD COLUMN `del_flag` int NULL DEFAULT 0 COMMENT '删除标志：0-正常，1-删除' AFTER `created_time`;
