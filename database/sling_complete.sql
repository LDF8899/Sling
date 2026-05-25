/*
 * SLING 项目完整数据库脚本
 * 版本：2026.01.26
 * 说明：包含完整的表结构、索引、注释和测试数据
 */

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =============================================
-- 创建数据库
-- =============================================
CREATE DATABASE IF NOT EXISTS `sl` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `sl`;

-- =============================================
-- 1. 用户与权限模块
-- =============================================

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role_id` bigint NOT NULL AUTO_INCREMENT COMMENT '角色唯一标识，自增长',
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '角色名称：ADMIN-管理员，MODERATOR-版主，USER-普通用户，VIP-VIP 用户',
  `role_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '角色描述',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '角色创建时间',
  PRIMARY KEY (`role_id`) USING BTREE,
  UNIQUE INDEX `role_name`(`role_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储系统中的角色信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'ADMIN', '系统管理员拥有所有权限', NOW());
INSERT INTO `role` VALUES (2, 'MODERATOR', '版主内容管理员管理内容和用户', NOW());
INSERT INTO `role` VALUES (3, 'USER', '普通用户基本功能权限', NOW());
INSERT INTO `role` VALUES (4, 'VIP', 'VIP 用户享有特殊权限', NOW());
INSERT INTO `role` VALUES (5, 'RESCUER', '救助人员，处理紧急求助调度', NOW());

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `user_id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户唯一标识，自增长',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名，用于登录',
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户密码（加密存储）',
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户邮箱',
  `wechat_openid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信 openid（小程序登录用）',
  `wechat_unionid` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信 unionid（跨应用统一用户）',
  `wechat_nickname` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信昵称',
  `wechat_avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '微信头像 URL',
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户手机号',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '用户创建时间',
  `last_login_time` timestamp NULL DEFAULT NULL COMMENT '用户最后登录时间',
  `extra_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '额外信息，JSON 格式',
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户头像 URL 地址',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE,
  UNIQUE INDEX `idx_wechat_openid`(`wechat_openid` ASC) USING BTREE COMMENT '确保一个微信只能绑定一个用户',
  INDEX `idx_wechat_unionid`(`wechat_unionid` ASC) USING BTREE COMMENT '跨应用查询优化'
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储用户基本信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_info
-- ----------------------------
-- 管理员用户
INSERT INTO `user_info` VALUES (1, 'admin', 'admin123', 'admin@sling.com', NULL, NULL, NULL, NULL, '13800138000', NOW(), NOW(), '{\"role\":\"系统管理员\"}', NULL);

-- 版主用户
INSERT INTO `user_info` VALUES (2, 'moderator1', 'mod123', 'mod1@sling.com', NULL, NULL, NULL, NULL, '13800138001', NOW(), NOW(), '{\"role\":\"内容管理员\"}', NULL);

-- 普通用户
INSERT INTO `user_info` VALUES (3, 'user1', 'user123', 'user1@example.com', NULL, NULL, NULL, NULL, '15685593321', NOW(), NOW(), '{\"role\":\"普通用户\"}', NULL);
INSERT INTO `user_info` VALUES (4, 'user2', 'user123', 'user2@example.com', NULL, NULL, NULL, NULL, '15685593322', NOW(), NOW(), '{\"role\":\"普通用户\"}', NULL);

-- VIP 用户
INSERT INTO `user_info` VALUES (5, 'vip_user', 'vip123', 'vip@example.com', NULL, NULL, NULL, NULL, '15685593323', NOW(), NOW(), '{\"role\":\"VIP 用户\"}', NULL);

-- 微信测试用户
INSERT INTO `user_info` VALUES (6, 'wechat_user1', 'wx123', NULL, 'wx_openid_001', 'wx_unionid_001', '微信用户 1', 'https://example.com/avatar1.jpg', NULL, NOW(), NOW(), '{\"login_type\":\"wechat\"}', NULL);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '主键',
  `user_id` bigint NOT NULL COMMENT '关联用户表的 user_id',
  `role_id` bigint NOT NULL COMMENT '关联角色表的 role_id',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '关联创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_role`(`user_id` ASC, `role_id` ASC) USING BTREE COMMENT '确保用户和角色的关联唯一性',
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储用户和角色的关联关系' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (1, 1, 1, NOW()); -- admin -> ADMIN
INSERT INTO `user_role` VALUES (2, 2, 2, NOW()); -- moderator1 -> MODERATOR
INSERT INTO `user_role` VALUES (3, 3, 3, NOW()); -- user1 -> USER
INSERT INTO `user_role` VALUES (4, 4, 3, NOW()); -- user2 -> USER
INSERT INTO `user_role` VALUES (5, 5, 4, NOW()); -- vip_user -> VIP
INSERT INTO `user_role` VALUES (6, 6, 3, NOW()); -- wechat_user1 -> USER

-- ----------------------------
-- Table structure for user_permission
-- ----------------------------
DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission`  (
  `permission_id` bigint NOT NULL AUTO_INCREMENT COMMENT '权限唯一标识，自增长',
  `user_id` bigint NOT NULL COMMENT '关联用户表的 user_id，表明该权限所属用户',
  `permission_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限名称，如"查看蛇类详细信息"',
  `permission_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '权限描述',
  PRIMARY KEY (`permission_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `fk_permission_user` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '记录用户所拥有的各项操作权限' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_permission
-- ----------------------------
INSERT INTO `user_permission` VALUES (1, 1, 'ALL_PERMISSIONS', '管理员拥有所有权限');
INSERT INTO `user_permission` VALUES (2, 2, 'CONTENT_MANAGE', '内容管理权限');
INSERT INTO `user_permission` VALUES (3, 3, 'BASIC_ACCESS', '基本访问权限');
INSERT INTO `user_permission` VALUES (4, 5, 'VIP_ACCESS', 'VIP 特殊权限');

-- ----------------------------
-- Table structure for user_action_log
-- ----------------------------
DROP TABLE IF EXISTS `user_action_log`;
CREATE TABLE `user_action_log`  (
  `log_id` bigint NOT NULL AUTO_INCREMENT COMMENT '行为记录唯一标识，自增长',
  `user_id` bigint NOT NULL COMMENT '关联用户表的 user_id，标识行为所属用户',
  `action_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '行为类型，如"LOGIN", "VIEW_SNAKE", "RECOGNIZE"等',
  `action_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '行为发生时间',
  `action_detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '行为详细描述',
  `action_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '行为相关元数据，JSON 格式',
  PRIMARY KEY (`log_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `action_time`(`action_time` DESC) USING BTREE COMMENT '按时间查询优化'
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '记录用户在系统内的各项操作行为' ROW_FORMAT = Dynamic;

-- =============================================
-- 2. 蛇类信息模块
-- =============================================

-- ----------------------------
-- Table structure for snake_info
-- ----------------------------
DROP TABLE IF EXISTS `snake_info`;
CREATE TABLE `snake_info`  (
  `snake_id` bigint NOT NULL AUTO_INCREMENT COMMENT '蛇类唯一标识，自增长',
  `snake_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '蛇类名称',
  `characteristics` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '蛇类特征描述',
  `toxicity_level` int NOT NULL COMMENT '毒性等级：0-无毒，1-低毒，2-有毒，3-剧毒',
  `habitat_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '栖息地信息',
  `conservation_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '保护状态',
  PRIMARY KEY (`snake_id`) USING BTREE,
  UNIQUE INDEX `idx_snake_name`(`snake_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类的基本信息和特征' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of snake_info
-- ----------------------------
INSERT INTO `snake_info` VALUES (1, '银环蛇', '身体黑白相间的环纹，白环窄黑环宽，头部椭圆形，夜行性', 3, '平原、丘陵、山地的溪沟边、稻田、鱼塘', '三有保护动物');
INSERT INTO `snake_info` VALUES (2, '眼镜蛇', '颈部可扩张成扁平状，受惊时竖起前身，发出呼呼声', 3, '平原、丘陵、山地、田野、草丛', '三有保护动物');
INSERT INTO `snake_info` VALUES (3, '眼镜王蛇', '体型巨大，可达 3-4 米，颈部扩张不如眼镜蛇明显', 3, '山区森林中', '濒危物种');
INSERT INTO `snake_info` VALUES (4, '五步蛇', '头大呈三角形，体背棕褐色，具有灰白色方形斑纹', 3, '山区森林、竹林、灌丛', '三有保护动物');
INSERT INTO `snake_info` VALUES (5, '竹叶青', '全身绿色，眼红色，头颈区分明显', 2, '山区树林、竹林、灌丛', '无危');
INSERT INTO `snake_info` VALUES (6, '蝮蛇', '头大呈三角形，体短粗，尾短', 2, '平原、丘陵、低山区', '无危');
INSERT INTO `snake_info` VALUES (7, '乌梢蛇', '体背黄褐色至黑褐色，脊背部有两条黑色纵纹', 0, '平原、丘陵、低山区', '三有保护动物');
INSERT INTO `snake_info` VALUES (8, '王锦蛇', '体大粗壮，体背黑褐色杂以黄色斑纹，头部有"王"字纹', 0, '平原、丘陵、山区', '三有保护动物');
INSERT INTO `snake_info` VALUES (9, '菜花蛇', '体背黄绿色，具有黑色横斑纹', 0, '平原、丘陵、山区', '无危');
INSERT INTO `snake_info` VALUES (10, '玉米蛇', '体色多样，腹部黑白方格纹，性情温顺', 0, '北美洲东南部', '无危');
INSERT INTO `snake_info` VALUES (11, '太攀蛇', '体型修长，鳞片光滑，世界毒性最强陆生蛇类之一', 3, '澳大利亚中部干旱区', '无危');
INSERT INTO `snake_info` VALUES (12, '赤链蛇', '体背黑褐色，具有多数红色横纹', 1, '平原、丘陵、低山区', '无危');
INSERT INTO `snake_info` VALUES (13, '蝰蛇', '体粗短，头大呈三角形', 2, '北方草原、荒漠草原', '无危');
INSERT INTO `snake_info` VALUES (14, '猪鼻蛇', '吻端上翘呈猪鼻状，体灰褐色', 1, '北美洲南部', '无危');
INSERT INTO `snake_info` VALUES (15, '海岸太攀蛇', '体长约 2-3 米，棕色至深橄榄色，毒性极强', 3, '澳大利亚东北部沿海', '无危');

-- ----------------------------
-- Table structure for snake_emergency_info
-- ----------------------------
DROP TABLE IF EXISTS `snake_emergency_info`;
CREATE TABLE `snake_emergency_info`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '蛇类急救信息唯一标识',
  `snake_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '蛇类名称',
  `snake_alias` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '蛇类别名/俗称',
  `venom_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '毒液类型：神经毒素、血液毒素、混合毒素',
  `symptom_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '中毒症状描述',
  `emergency_treatment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '应急处理方法',
  `medical_attention` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '就医注意事项',
  `image_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '蛇类图片 URL',
  `latin_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '拉丁学名',
  `forbidden_actions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '严格禁止的行为',
  `serum_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '解毒血清类型',
  `hospital_department` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '建议就医科室',
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` tinyint UNSIGNED NULL DEFAULT 0 COMMENT '删除标志：0-正常，1-删除',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `snake_name`(`snake_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类的急救信息，用于应急响应' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of snake_emergency_info
-- ----------------------------
INSERT INTO `snake_emergency_info` VALUES (1, '银环蛇', '金钱白花蛇', '神经毒素', '被咬后初期症状轻微，局部麻木、疼痛不明显，1-4 小时后出现神经麻痹（眼睑下垂、吞咽困难、呼吸困难）', '保持冷静，减少活动，用绷带轻轻绑扎伤口近心端，尽快就医', '注射抗银环蛇毒血清是唯一有效治疗手段', '银环蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (2, '眼镜蛇', '饭铲头', '混合毒素', '伤口剧痛，红肿明显，局部组织坏死，严重者可出现呼吸衰竭', '立即远离蛇体，用清水或肥皂水冲洗伤口，避免剧烈运动', '告知医生蛇的特征，可能需要抗眼镜蛇毒血清', '眼镜蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (3, '眼镜王蛇', '过山风', '混合毒素', '中毒症状发展迅速，剧烈疼痛，肿胀快速蔓延，可导致呼吸循环衰竭', '保持静止，避免奔跑，立即拨打急救电话', '需大量抗蛇毒血清，预后较差', '眼镜王蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (4, '五步蛇', '尖吻蝮', '血液毒素', '伤口出血不止，皮下瘀斑，血尿，严重者可出现 DIC（弥散性血管内凝血）', '加压包扎止血，避免使用止血带，尽快送医', '需要抗五步蛇毒血清和凝血因子', '五步蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (5, '竹叶青', '青竹标', '血液毒素', '局部剧痛，肿胀明显，可有水泡和血泡，淋巴结肿大', '冷敷患处，抬高患肢，避免切开排毒', '抗竹叶蛇毒血清治疗效果良好', '竹叶青_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (6, '蝮蛇', '土虺蛇', '混合毒素', '疼痛较轻，肿胀不明显，少数患者出现全身症状', '清洗消毒伤口，观察症状变化', '一般无需特殊治疗，严重者可用抗蝮蛇毒血清', '蝮蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (7, '乌梢蛇', NULL, NULL, '无毒蛇，伤口轻微疼痛，少量出血', '清洗消毒伤口，预防感染即可', '无需抗蛇毒血清，注意破伤风疫苗', '乌梢蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (8, '王锦蛇', '大王蛇', NULL, '无毒蛇，咬伤后疼痛明显，可有皮外伤', '清洗伤口，消毒包扎', '预防感染，无需抗蛇毒血清', '王锦蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (9, '菜花蛇', '黑眉锦蛇', NULL, '无毒蛇，伤口轻微，偶有感染', '肥皂水冲洗，碘伏消毒', '保持伤口清洁干燥，观察感染迹象', '菜花蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (10, '玉米蛇', NULL, NULL, '无毒宠物蛇，伤口轻微', '清水冲洗，创可贴保护', '无需特殊处理', '玉米蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (11, '太攀蛇', NULL, '神经毒素', '世界最毒蛇类，中毒后迅速出现呼吸肌麻痹，可在 1 小时内死亡', '立即加压固定患肢，尽快使用抗蛇毒血清', '必须在重症监护室治疗，需要呼吸机支持', '太攀蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (12, '赤链蛇', '火赤链', '后沟牙毒蛇，微毒', '伤口轻微疼痛，局部红肿，偶见过敏反应', '常规清洗消毒，抗过敏治疗', '一般无需抗蛇毒血清', '赤链蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (13, '蝰蛇', NULL, '血液毒素', '伤口剧痛，肿胀严重，出血倾向明显', '加压包扎，避免切开，尽快送医', '需要抗蝰蛇毒血清', '蝰蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (14, '猪鼻蛇', NULL, '后沟牙毒蛇，微毒', '伤口轻微，偶有局部过敏反应', '清洗消毒，观察过敏症状', '抗组胺药物治疗', '猪鼻蛇_1.jpg', NOW(), NOW(), 0);
INSERT INTO `snake_emergency_info` VALUES (15, '海岸太攀蛇', NULL, '神经毒素', '毒性极强，快速出现神经肌肉阻滞，呼吸衰竭', '立即固定患肢，人工呼吸，尽快给予抗蛇毒血清', '需要在 ICU 监护治疗', '太攀蛇_2.jpg', NOW(), NOW(), 0);

-- ----------------------------
-- Table structure for snake_serum_match
-- ----------------------------
DROP TABLE IF EXISTS `snake_serum_match`;
CREATE TABLE `snake_serum_match`  (
  `match_id` bigint NOT NULL AUTO_INCREMENT COMMENT '匹配记录唯一标识，自增长',
  `snake_id` bigint NOT NULL COMMENT '关联蛇类信息表的 snake_id，表明对应的蛇类',
  `serum_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '对应蛇类所需的血清类型',
  `match_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '匹配相关的额外元数据，JSON 格式',
  PRIMARY KEY (`match_id`) USING BTREE,
  INDEX `snake_id`(`snake_id` ASC) USING BTREE,
  CONSTRAINT `fk_serum_snake` FOREIGN KEY (`snake_id`) REFERENCES `snake_info` (`snake_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类与相应血清类型的匹配关系及相关信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of snake_serum_match
-- ----------------------------
INSERT INTO `snake_serum_match` VALUES (1, 1, '抗银环蛇毒血清', '{"effectiveness":"95%","version":"2024"}');
INSERT INTO `snake_serum_match` VALUES (2, 2, '抗眼镜蛇毒血清', '{"effectiveness":"90%","version":"2024"}');
INSERT INTO `snake_serum_match` VALUES (3, 3, '抗眼镜王蛇毒血清', '{"effectiveness":"85%","version":"2024"}');
INSERT INTO `snake_serum_match` VALUES (4, 4, '抗五步蛇毒血清', '{"effectiveness":"92%","version":"2024"}');
INSERT INTO `snake_serum_match` VALUES (5, 5, '抗竹叶青毒血清', '{"effectiveness":"88%","version":"2024"}');
INSERT INTO `snake_serum_match` VALUES (6, 6, '抗蝮蛇毒血清', '{"effectiveness":"90%","version":"2024"}');
INSERT INTO `snake_serum_match` VALUES (11, 11, '抗太攀蛇毒血清', '{"effectiveness":"80%","version":"2024"}');
INSERT INTO `snake_serum_match` VALUES (13, 13, '抗蝰蛇毒血清', '{"effectiveness":"87%","version":"2024"}');

-- =============================================
-- 3. 医院与血清模块
-- =============================================

-- ----------------------------
-- Table structure for hospital_info
-- ----------------------------
DROP TABLE IF EXISTS `hospital_info`;
CREATE TABLE `hospital_info`  (
  `hospital_id` bigint NOT NULL AUTO_INCREMENT COMMENT '医院唯一标识，自增长',
  `hospital_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '医院名称',
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '医院地址',
  `latitude` decimal(10, 6) NULL DEFAULT NULL COMMENT '纬度',
  `longitude` decimal(10, 6) NULL DEFAULT NULL COMMENT '经度',
  `contact_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '联系方式',
  `hospital_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '医院类型：综合医院、中医院、社区医院等',
  `serum_availability` tinyint(1) DEFAULT 0 COMMENT '是否有血清库存：0-无，1-有',
  `emergency_department` tinyint(1) DEFAULT 1 COMMENT '是否有急诊科：0-无，1-有',
  `snake_venom_treatment` tinyint(1) DEFAULT 0 COMMENT '是否能治疗蛇毒：0-否，1-是',
  `snake_venom_keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '擅长治疗的蛇毒类型关键词',
  `created_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` tinyint(1) DEFAULT 0 COMMENT '删除标志：0-正常，1-删除',
  PRIMARY KEY (`hospital_id`) USING BTREE,
  KEY `idx_location` (`latitude`, `longitude`) COMMENT '地理位置索引，用于附近医院查询',
  KEY `idx_type` (`hospital_type`) COMMENT '医院类型索引',
  KEY `idx_snake_treatment` (`snake_venom_treatment`) COMMENT '蛇毒治疗能力索引',
  KEY `idx_snake_keywords` (`snake_venom_keywords`) COMMENT '蛇毒关键词索引'
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储医院基本信息和服务能力' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hospital_info
-- ----------------------------
INSERT INTO `hospital_info` VALUES (1, '遵义医科大学第二附属医院', '新龙大道西 150 米', 27.694486, 107.043478, '0851-27596113;0851-27596114', '综合医院', 1, 1, 1, '银环蛇，眼镜蛇，五步蛇', NOW(), NOW(), 0);
INSERT INTO `hospital_info` VALUES (2, '遵义新蒲永康中医院', '长征大道与娄山路交叉口西 140 米', 27.705478, 107.036984, '18685202139', '中医院', 0, 1, 1, '竹叶青，蝮蛇', NOW(), NOW(), 0);
INSERT INTO `hospital_info` VALUES (3, '遵义新蒲康兴医院', '播州大道与奥体路交汇处天鹅湖康郡 1-2 号楼', 27.724318, 107.039192, '0851-28766120', '综合医院', 1, 1, 1, '眼镜王蛇，太攀蛇', NOW(), NOW(), 0);
INSERT INTO `hospital_info` VALUES (4, '新蒲瑞德医院', '林达阳光新城 2 号楼 2-3 号', 27.706456, 107.032616, '0851-28657120', '综合医院', 1, 1, 1, '常见毒蛇', NOW(), NOW(), 0);
INSERT INTO `hospital_info` VALUES (5, '新蒲镇卫生院接种点', '新蒲镇明星路 19 号', 27.711373, 107.030373, '', '社区医院', 0, 1, 0, NULL, NOW(), NOW(), 0);

-- ----------------------------
-- Table structure for serum_inventory
-- ----------------------------
DROP TABLE IF EXISTS `serum_inventory`;
CREATE TABLE `serum_inventory`  (
  `inventory_id` bigint NOT NULL AUTO_INCREMENT COMMENT '库存记录唯一标识，自增长',
  `hospital_id` bigint NOT NULL COMMENT '关联医院表的 hospital_id，表明该库存属于哪家医院',
  `snake_id` bigint NOT NULL COMMENT '关联蛇类信息表的 snake_id，表明对应的蛇类血清',
  `serum_amount` int NOT NULL COMMENT '该蛇类血清的库存数量',
  `serum_expiry_date` date NULL DEFAULT NULL COMMENT '血清的过期日期',
  `inventory_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '库存相关的额外元数据，JSON 格式',
  PRIMARY KEY (`inventory_id`) USING BTREE,
  INDEX `hospital_id`(`hospital_id` ASC) USING BTREE,
  INDEX `snake_id`(`snake_id` ASC) USING BTREE,
  CONSTRAINT `fk_inventory_hospital` FOREIGN KEY (`hospital_id`) REFERENCES `hospital_info` (`hospital_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_snake` FOREIGN KEY (`snake_id`) REFERENCES `snake_info` (`snake_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '记录各个医院针对不同蛇类血清的库存情况' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of serum_inventory
-- ----------------------------
INSERT INTO `serum_inventory` VALUES (1, 1, 1, 10, '2026-12-31', '{"batch":"2024001","supplier":"贵州医药"}');
INSERT INTO `serum_inventory` VALUES (2, 1, 2, 8, '2026-11-30', '{"batch":"2024002","supplier":"贵州医药"}');
INSERT INTO `serum_inventory` VALUES (3, 1, 4, 5, '2026-10-31', '{"batch":"2024003","supplier":"云南医药"}');
INSERT INTO `serum_inventory` VALUES (4, 2, 5, 6, '2026-09-30', '{"batch":"2024004","supplier":"广西医药"}');
INSERT INTO `serum_inventory` VALUES (5, 2, 6, 4, '2026-08-31', '{"batch":"2024005","supplier":"广西医药"}');
INSERT INTO `serum_inventory` VALUES (6, 3, 3, 3, '2026-12-15', '{"batch":"2024006","supplier":"进口血清"}');
INSERT INTO `serum_inventory` VALUES (7, 3, 11, 2, '2027-01-31', '{"batch":"2024007","supplier":"进口血清"}');
INSERT INTO `serum_inventory` VALUES (8, 4, 1, 7, '2026-11-15', '{"batch":"2024008","supplier":"贵州医药"}');
INSERT INTO `serum_inventory` VALUES (9, 4, 2, 5, '2026-10-15', '{"batch":"2024009","supplier":"贵州医药"}');

-- =============================================
-- 4. 预警模块
-- =============================================

-- ----------------------------
-- Table structure for warning_area
-- ----------------------------
DROP TABLE IF EXISTS `warning_area`;
CREATE TABLE `warning_area`  (
  `area_id` bigint NOT NULL AUTO_INCREMENT COMMENT '预警区域唯一标识',
  `area_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '预警区域名称',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '区域描述',
  `boundary_coordinates` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '边界坐标，JSON 格式存储多边形坐标点',
  `snake_species` json NULL COMMENT '该区域常见的蛇类品种',
  `warning_level` int NULL DEFAULT 1 COMMENT '预警等级：1-低风险，2-中风险，3-高风险，4-极高风险',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`area_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类活动预警区域信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warning_area
-- ----------------------------
INSERT INTO `warning_area` VALUES (1, '凤凰山森林公园', '遵义市红花岗区凤凰山', '{"type":"Polygon","coordinates":[[[107.01,27.68],[107.02,27.68],[107.02,27.69],[107.01,27.69],[107.01,27.68]]]}', '[{"snake_id":1,"name":"银环蛇"},{"snake_id":2,"name":"眼镜蛇"},{"snake_id":5,"name":"竹叶青"}]', 3, NOW());
INSERT INTO `warning_area` VALUES (2, '湘江河沿岸', '遵义市湘江河两岸绿化带', '{"type":"Polygon","coordinates":[[[107.03,27.70],[107.04,27.70],[107.04,27.71],[107.03,27.71],[107.03,27.70]]]}', '[{"snake_id":6,"name":"蝮蛇"},{"snake_id":7,"name":"乌梢蛇"},{"snake_id":12,"name":"赤链蛇"}]', 2, NOW());
INSERT INTO `warning_area` VALUES (3, '新蒲湿地公园', '遵义市新蒲新区湿地公园', '{"type":"Polygon","coordinates":[[[107.04,27.69],[107.05,27.69],[107.05,27.70],[107.04,27.70],[107.04,27.69]]]}', '[{"snake_id":5,"name":"竹叶青"},{"snake_id":8,"name":"王锦蛇"}]', 2, NOW());
INSERT INTO `warning_area` VALUES (4, '大娄山自然保护区', '遵义市汇川区大娄山', '{"type":"Polygon","coordinates":[[[107.00,27.75],[107.10,27.75],[107.10,27.80],[107.00,27.80],[107.00,27.75]]]}', '[{"snake_id":1,"name":"银环蛇"},{"snake_id":3,"name":"眼镜王蛇"},{"snake_id":4,"name":"五步蛇"}]', 4, NOW());

-- ----------------------------
-- Table structure for warning_record
-- ----------------------------
DROP TABLE IF EXISTS `warning_record`;
CREATE TABLE `warning_record`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '预警记录唯一标识',
  `area_id` bigint NOT NULL COMMENT '关联预警区域 ID',
  `warning_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '预警具体内容',
  `warning_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '预警发布时间',
  `is_valid` int NULL DEFAULT 1 COMMENT '是否有效：0-无效，1-有效',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `area_id`(`area_id` ASC) USING BTREE,
  INDEX `warning_time`(`warning_time` DESC) USING BTREE,
  CONSTRAINT `fk_warning_area` FOREIGN KEY (`area_id`) REFERENCES `warning_area` (`area_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储历史预警记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warning_record
-- ----------------------------
INSERT INTO `warning_record` VALUES (1, 1, '近日发现多条银环蛇活动，请注意安全', '2026-01-20 10:00:00', 1);
INSERT INTO `warning_record` VALUES (2, 2, '雨季来临，蝮蛇活动频繁，请避免靠近河边', '2026-01-18 14:30:00', 1);
INSERT INTO `warning_record` VALUES (3, 3, '公园施工发现竹叶青蛇窝，已联系专业机构处理', '2026-01-15 09:15:00', 1);
INSERT INTO `warning_record` VALUES (4, 4, '大娄山地区发现眼镜王蛇踪迹，禁止进入', '2026-01-10 16:00:00', 1);
INSERT INTO `warning_record` VALUES (5, 1, '昨日预警已解除，银环蛇已被捕获', '2026-01-21 08:00:00', 0);

-- ----------------------------
-- Table structure for warning_rule
-- ----------------------------
DROP TABLE IF EXISTS `warning_rule`;
CREATE TABLE `warning_rule`  (
  `rule_id` bigint NOT NULL AUTO_INCREMENT COMMENT '预警规则唯一标识',
  `snake_id` bigint NOT NULL COMMENT '关联蛇类 ID',
  `active_threshold` int NOT NULL COMMENT '活跃度阈值，超过此值触发预警',
  `warning_message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '预警消息模板',
  `rule_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '规则相关元数据，JSON 格式',
  PRIMARY KEY (`rule_id`) USING BTREE,
  INDEX `snake_id`(`snake_id` ASC) USING BTREE,
  CONSTRAINT `fk_warning_snake` FOREIGN KEY (`snake_id`) REFERENCES `snake_info` (`snake_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储预警规则配置' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of warning_rule
-- ----------------------------
INSERT INTO `warning_rule` VALUES (1, 1, 3, '【高风险预警】{area_name} 发现{count}条银环蛇活动，请避免前往！', '{"priority":"high","notify_methods":["app","sms"]}');
INSERT INTO `warning_rule` VALUES (2, 2, 2, '【高风险预警】{area_name} 发现{count}条眼镜蛇，请注意安全！', '{"priority":"high","notify_methods":["app"]}');
INSERT INTO `warning_rule` VALUES (3, 3, 1, '【极高风险预警】{area_name} 发现眼镜王蛇，请立即远离并报警！', '{"priority":"critical","notify_methods":["app","sms","police"]}');
INSERT INTO `warning_rule` VALUES (4, 4, 2, '【高风险预警】{area_name} 发现五步蛇活动，请勿靠近！', '{"priority":"high","notify_methods":["app"]}');
INSERT INTO `warning_rule` VALUES (5, 5, 5, '【中风险预警】{area_name} 发现多条竹叶青，请注意防范！', '{"priority":"medium","notify_methods":["app"]}');

-- =============================================
-- 5. AI 问答与识别模块
-- =============================================

-- ----------------------------
-- Table structure for emergency_qa_cache
-- ----------------------------
DROP TABLE IF EXISTS `emergency_qa_cache`;
CREATE TABLE `emergency_qa_cache`  (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '问答缓存唯一标识',
  `question` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户提问的问题',
  `answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'AI 生成的答案',
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储 AI 问答缓存，提高响应速度' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of emergency_qa_cache
-- ----------------------------
INSERT INTO `emergency_qa_cache` VALUES (1, '被菜花蛇咬了怎么办？', '被菜花蛇（通常指黑眉锦蛇、王锦蛇，均为无毒蛇）咬伤后的应急处理：\n\n### 一、立即采取的基础处理\n1. **保持冷静，脱离风险**\n   - 确认蛇已远离，避免二次咬伤\n   - 不要剧烈奔跑或活动\n\n2. **彻底清洗伤口**\n   - 用流动清水或肥皂水冲洗伤口至少 15 分钟\n   - 去除蛇口腔残留的细菌、污垢\n\n3. **消毒伤口**\n   - 用碘伏或医用酒精消毒伤口周围皮肤\n   - 不要直接涂在伤口内部\n\n4. **止血与保护伤口**\n   - 若伤口轻微出血，用干净纱布按压止血\n   - 不要包扎过紧，保持伤口透气\n\n### 二、需要就医的情况\n- 伤口较深，可能需要缝合或打破伤风疫苗\n- 出现感染迹象：红肿、疼痛加剧、发热、流脓\n- 对蛇口腔分泌物过敏\n- 不确定蛇种\n\n### 三、绝对禁止的行为\n- ❌ 用嘴吸伤口\n- ❌ 用土、草药、牙膏等敷伤口\n- ❌ 剧烈挤压伤口\n- ❌ 自行挑破水泡或伤口\n\n记住：无毒蛇咬伤的核心是"防感染"。', NOW(), NOW());

INSERT INTO `emergency_qa_cache` VALUES (2, '被银环蛇咬了有什么症状？', '银环蛇是中国毒性最强的毒蛇之一，毒液为**神经毒素**。\n\n### 中毒症状发展阶段：\n\n#### 第一阶段（0-1 小时）：初期症状轻微\n- 局部麻木、疼痛不明显\n- 伤口无明显红肿\n- 容易被忽视\n\n#### 第二阶段（1-4 小时）：神经麻痹症状\n- 眼睑下垂\n- 吞咽困难\n- 言语不清\n- 四肢无力\n\n#### 第三阶段（4 小时后）：严重症状\n- 呼吸困难\n- 呼吸肌麻痹\n- 意识模糊\n- 呼吸衰竭，可能致死\n\n### 急救措施：\n1. **立即远离蛇体**\n2. **保持冷静**，减少毒素扩散\n3. **用绷带轻轻绑扎**伤口近心端（避免过紧）\n4. **尽快就医**并注射**抗银环蛇毒血清**（唯一有效治疗手段）\n\n⚠️ 注意：银环蛇咬伤初期症状不明显，但毒性极强，一旦怀疑被咬伤，必须立即就医！', NOW(), NOW());

INSERT INTO `emergency_qa_cache` VALUES (3, '如何区分有毒蛇和无毒蛇？', '### 有毒蛇与无毒蛇的主要区别：\n\n#### 1. 头部形状\n- **有毒蛇**：多呈三角形（如五步蛇、竹叶青），但也有例外（银环蛇为椭圆形）\n- **无毒蛇**：多为椭圆形或圆形\n\n#### 2. 瞳孔形状\n- **有毒蛇**：多为竖瞳（像猫眼），但眼镜蛇科为圆瞳\n- **无毒蛇**：多为圆瞳\n\n#### 3. 体色花纹\n- **有毒蛇**：通常颜色鲜艳，花纹醒目（警戒色）\n- **无毒蛇**：颜色相对朴素\n\n#### 4. 尾部特征\n- **有毒蛇**：尾部短粗\n- **无毒蛇**：尾部细长\n\n#### 5. 行为特征\n- **有毒蛇**：受惊时可能有特殊防御行为（眼镜蛇竖身、响尾蛇摇尾）\n- **无毒蛇**：多选择逃跑\n\n### 常见有毒蛇识别要点：\n- **银环蛇**：黑白相间环纹，白环窄黑环宽\n- **眼镜蛇**：颈部可扩张成扁状\n- **五步蛇**：头大三角形，体背灰白色方斑\n- **竹叶青**：全身绿色，眼睛红色\n\n⚠️ **重要提醒**：以上方法并非绝对，最安全的做法是：**遇到任何蛇都保持距离，不要尝试捕捉或靠近！**', NOW(), NOW());

INSERT INTO `emergency_qa_cache` VALUES (4, '被毒蛇咬伤后多久会致命？', '### 被毒蛇咬伤后的致命时间因多种因素而异：\n\n#### 影响因素：\n1. **蛇的种类**\n2. **注入毒液量**\n3. **咬伤部位**\n4. **伤者体质**\n5. **救治及时性**\n\n#### 不同毒蛇的致命时间范围：\n\n##### 剧毒蛇类（1-6 小时内可能致命）：\n- **太攀蛇**（澳洲）：最快 30 分钟 -1 小时\n- **眼镜王蛇**：1-3 小时\n- **银环蛇**：2-6 小时\n- **五步蛇**：2-8 小时（主要死于大出血）\n\n##### 中等毒性蛇类（6-24 小时）：\n- **眼镜蛇**：4-12 小时\n- **竹叶青**：较少致命，但严重者可致器官衰竭\n- **蝰蛇**：6-24 小时\n\n##### 低毒蛇类（罕见致命）：\n- **蝮蛇**：一般不致命\n- **赤链蛇**：极少致命\n\n### ⏰ 黄金救治时间：\n- **最佳**：咬伤后 30 分钟内就医\n- **有效**：咬伤后 1-2 小时内\n- **危险**：超过 6 小时未治疗\n\n### 🚨 关键提示：\n**不要等待症状出现！** 有些毒蛇（如银环蛇）咬伤初期症状轻微，但毒性极强。**立即就医是最正确的选择！**', NOW(), NOW());

INSERT INTO `emergency_qa_cache` VALUES (5, '蛇怕什么气味和东西？', '### 蛇类害怕的气味和物品：\n\n#### 蛇害怕的气味：\n1. **硫磺味**\n   - 硫磺粉、雄黄等传统驱蛇用品\n   - 效果：中等，需要高浓度\n\n2. **刺激性化学品**\n   - 漂白水、氨水、汽油\n   - 效果：较强，但对人体也有害\n\n3. **某些植物精油**\n   - 薄荷油、桉树油、肉桂油\n   - 效果：较弱，需要经常补充\n\n4. **动物排泄物**\n   - 狐狸、黄鼠狼等天敌的粪便\n   - 效果：短期有效\n\n#### 蛇害怕的物品/环境：\n1. **震动**\n   - 蛇通过地面振动感知危险\n   - 敲击地面可驱赶\n\n2. **高温和明火**\n   - 大多数蛇怕火\n   - 但火灾时蛇也会逃窜伤人\n\n3. **开阔地带**\n   - 蛇喜欢隐蔽，不喜欢空旷处\n\n4. **某些动物**\n   - 鹅、猫、狗等家禽家畜\n   - 野猪、黄鼠狼等野生动物\n\n#### ⚠️ 重要提醒：\n- **驱蛇剂效果有限**，不能完全依赖\n- **保持环境整洁**是最好的防蛇方法\n- **清除杂物、杂草**，减少蛇的藏身处\n- **封堵洞穴和缝隙**，防止蛇进入室内\n\n如果遇到蛇，最安全的做法是：**保持距离，联系专业人员处理！**', NOW(), NOW());

-- ----------------------------
-- Table structure for recognition_record
-- ----------------------------
DROP TABLE IF EXISTS `recognition_record`;
CREATE TABLE `recognition_record`  (
  `record_id` bigint NOT NULL AUTO_INCREMENT COMMENT '识别记录唯一标识',
  `user_id` bigint NOT NULL COMMENT '关联用户 ID',
  `snake_id` bigint NULL DEFAULT NULL COMMENT '识别出的蛇类 ID',
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '上传图片的路径',
  `recognition_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '识别时间',
  `recognition_result` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '识别结果（蛇类名称）',
  `recognition_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '识别相关元数据，JSON 格式',
  PRIMARY KEY (`record_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `snake_id`(`snake_id` ASC) USING BTREE,
  INDEX `recognition_time`(`recognition_time` DESC) USING BTREE,
  CONSTRAINT `fk_recognition_user` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_recognition_snake` FOREIGN KEY (`snake_id`) REFERENCES `snake_info` (`snake_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储用户的蛇类识别记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of recognition_record
-- ----------------------------
INSERT INTO `recognition_record` VALUES (1, 3, 1, '/uploads/recognition/20260125_001.jpg', '2026-01-25 10:30:00', '银环蛇', '{"confidence":0.95,"model_version":"v2.1"}');
INSERT INTO `recognition_record` VALUES (2, 4, 5, '/uploads/recognition/20260124_002.jpg', '2026-01-24 15:20:00', '竹叶青', '{"confidence":0.88,"model_version":"v2.1"}');
INSERT INTO `recognition_record` VALUES (3, 5, 8, '/uploads/recognition/20260123_003.jpg', '2026-01-23 09:15:00', '王锦蛇', '{"confidence":0.92,"model_version":"v2.1"}');
INSERT INTO `recognition_record` VALUES (4, 6, 2, '/uploads/recognition/20260122_004.jpg', '2026-01-22 14:45:00', '眼镜蛇', '{"confidence":0.90,"model_version":"v2.1"}');
INSERT INTO `recognition_record` VALUES (5, 3, 7, '/uploads/recognition/20260121_005.jpg', '2026-01-21 16:30:00', '乌梢蛇', '{"confidence":0.87,"model_version":"v2.1"}');

-- ----------------------------
-- Table structure for snake_active_area
-- ----------------------------
DROP TABLE IF EXISTS `snake_active_area`;
CREATE TABLE `snake_active_area`  (
  `area_id` bigint NOT NULL AUTO_INCREMENT COMMENT '蛇类活跃区域唯一标识',
  `area_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '区域名称',
  `latitude` decimal(10, 6) NULL DEFAULT NULL COMMENT '中心点纬度',
  `longitude` decimal(10, 6) NULL DEFAULT NULL COMMENT '中心点经度',
  `radius` int NULL DEFAULT NULL COMMENT '影响半径（米）',
  `snake_id` bigint NOT NULL COMMENT '蛇类 ID',
  `active_count` int NULL DEFAULT 0 COMMENT '活跃度（观测到的数量）',
  `area_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '区域相关元数据，JSON 格式',
  PRIMARY KEY (`area_id`) USING BTREE,
  INDEX `snake_id`(`snake_id` ASC) USING BTREE,
  KEY `idx_location` (`latitude`, `longitude`),
  CONSTRAINT `fk_active_snake` FOREIGN KEY (`snake_id`) REFERENCES `snake_info` (`snake_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类活跃区域信息，用于预警和路径规划' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of snake_active_area
-- ----------------------------
INSERT INTO `snake_active_area` VALUES (1, '凤凰山东侧步道', 27.685000, 107.015000, 500, 1, 5, '{"last_sighted":"2026-01-25","terrain":"forest"}');
INSERT INTO `snake_active_area` VALUES (2, '湘江河湿地公园', 27.705000, 107.035000, 300, 6, 8, '{"last_sighted":"2026-01-24","terrain":"wetland"}');
INSERT INTO `snake_active_area` VALUES (3, '新蒲新区绿化带', 27.720000, 107.040000, 200, 5, 3, '{"last_sighted":"2026-01-23","terrain":"urban"}');
INSERT INTO `snake_active_area` VALUES (4, '大娄山南坡', 27.770000, 107.050000, 1000, 3, 2, '{"last_sighted":"2026-01-20","terrain":"mountain"}');
INSERT INTO `snake_active_area` VALUES (5, '龙岩景区溪流边', 27.690000, 107.025000, 400, 4, 4, '{"last_sighted":"2026-01-22","terrain":"riverside"}');

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================
-- 数据库初始化完成
-- =============================================
