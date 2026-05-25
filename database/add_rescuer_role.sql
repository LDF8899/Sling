-- 增量脚本：添加救助人员角色
-- 执行方式：mysql -u root -p sl < add_rescuer_role.sql

USE `sl`;

INSERT INTO `role` VALUES (5, 'RESCUER', '救助人员，处理紧急求助调度', NOW())
ON DUPLICATE KEY UPDATE `role_description` = '救助人员，处理紧急求助调度';

-- 验证
SELECT * FROM `role` WHERE `role_name` = 'RESCUER';
