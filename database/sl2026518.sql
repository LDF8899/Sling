/*
 Navicat Premium Dump SQL

 Source Server         : XM
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : sl

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 18/05/2026 20:42:13
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储 AI 问答缓存，提高响应速度' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of emergency_qa_cache
-- ----------------------------
INSERT INTO `emergency_qa_cache` VALUES (1, '被菜花蛇咬了怎么办？', '被菜花蛇（通常指黑眉锦蛇、王锦蛇，均为无毒蛇）咬伤后的应急处理：\n\n### 一、立即采取的基础处理\n1. **保持冷静，脱离风险**\n   - 确认蛇已远离，避免二次咬伤\n   - 不要剧烈奔跑或活动\n\n2. **彻底清洗伤口**\n   - 用流动清水或肥皂水冲洗伤口至少 15 分钟\n   - 去除蛇口腔残留的细菌、污垢\n\n3. **消毒伤口**\n   - 用碘伏或医用酒精消毒伤口周围皮肤\n   - 不要直接涂在伤口内部\n\n4. **止血与保护伤口**\n   - 若伤口轻微出血，用干净纱布按压止血\n   - 不要包扎过紧，保持伤口透气\n\n### 二、需要就医的情况\n- 伤口较深，可能需要缝合或打破伤风疫苗\n- 出现感染迹象：红肿、疼痛加剧、发热、流脓\n- 对蛇口腔分泌物过敏\n- 不确定蛇种\n\n### 三、绝对禁止的行为\n- ❌ 用嘴吸伤口\n- ❌ 用土、草药、牙膏等敷伤口\n- ❌ 剧烈挤压伤口\n- ❌ 自行挑破水泡或伤口\n\n记住：无毒蛇咬伤的核心是\"防感染\"。', '2026-04-13 18:23:12', '2026-04-13 18:23:12');
INSERT INTO `emergency_qa_cache` VALUES (2, '被银环蛇咬了有什么症状？', '银环蛇是中国毒性最强的毒蛇之一，毒液为**神经毒素**。\n\n### 中毒症状发展阶段：\n\n#### 第一阶段（0-1 小时）：初期症状轻微\n- 局部麻木、疼痛不明显\n- 伤口无明显红肿\n- 容易被忽视\n\n#### 第二阶段（1-4 小时）：神经麻痹症状\n- 眼睑下垂\n- 吞咽困难\n- 言语不清\n- 四肢无力\n\n#### 第三阶段（4 小时后）：严重症状\n- 呼吸困难\n- 呼吸肌麻痹\n- 意识模糊\n- 呼吸衰竭，可能致死\n\n### 急救措施：\n1. **立即远离蛇体**\n2. **保持冷静**，减少毒素扩散\n3. **用绷带轻轻绑扎**伤口近心端（避免过紧）\n4. **尽快就医**并注射**抗银环蛇毒血清**（唯一有效治疗手段）\n\n⚠️ 注意：银环蛇咬伤初期症状不明显，但毒性极强，一旦怀疑被咬伤，必须立即就医！', '2026-04-13 18:23:12', '2026-04-13 18:23:12');
INSERT INTO `emergency_qa_cache` VALUES (3, '如何区分有毒蛇和无毒蛇？', '### 有毒蛇与无毒蛇的主要区别：\n\n#### 1. 头部形状\n- **有毒蛇**：多呈三角形（如五步蛇、竹叶青），但也有例外（银环蛇为椭圆形）\n- **无毒蛇**：多为椭圆形或圆形\n\n#### 2. 瞳孔形状\n- **有毒蛇**：多为竖瞳（像猫眼），但眼镜蛇科为圆瞳\n- **无毒蛇**：多为圆瞳\n\n#### 3. 体色花纹\n- **有毒蛇**：通常颜色鲜艳，花纹醒目（警戒色）\n- **无毒蛇**：颜色相对朴素\n\n#### 4. 尾部特征\n- **有毒蛇**：尾部短粗\n- **无毒蛇**：尾部细长\n\n#### 5. 行为特征\n- **有毒蛇**：受惊时可能有特殊防御行为（眼镜蛇竖身、响尾蛇摇尾）\n- **无毒蛇**：多选择逃跑\n\n### 常见有毒蛇识别要点：\n- **银环蛇**：黑白相间环纹，白环窄黑环宽\n- **眼镜蛇**：颈部可扩张成扁状\n- **五步蛇**：头大三角形，体背灰白色方斑\n- **竹叶青**：全身绿色，眼睛红色\n\n⚠️ **重要提醒**：以上方法并非绝对，最安全的做法是：**遇到任何蛇都保持距离，不要尝试捕捉或靠近！**', '2026-04-13 18:23:12', '2026-04-13 18:23:12');
INSERT INTO `emergency_qa_cache` VALUES (4, '被毒蛇咬伤后多久会致命？', '### 被毒蛇咬伤后的致命时间因多种因素而异：\n\n#### 影响因素：\n1. **蛇的种类**\n2. **注入毒液量**\n3. **咬伤部位**\n4. **伤者体质**\n5. **救治及时性**\n\n#### 不同毒蛇的致命时间范围：\n\n##### 剧毒蛇类（1-6 小时内可能致命）：\n- **太攀蛇**（澳洲）：最快 30 分钟 -1 小时\n- **眼镜王蛇**：1-3 小时\n- **银环蛇**：2-6 小时\n- **五步蛇**：2-8 小时（主要死于大出血）\n\n##### 中等毒性蛇类（6-24 小时）：\n- **眼镜蛇**：4-12 小时\n- **竹叶青**：较少致命，但严重者可致器官衰竭\n- **蝰蛇**：6-24 小时\n\n##### 低毒蛇类（罕见致命）：\n- **蝮蛇**：一般不致命\n- **赤链蛇**：极少致命\n\n### ⏰ 黄金救治时间：\n- **最佳**：咬伤后 30 分钟内就医\n- **有效**：咬伤后 1-2 小时内\n- **危险**：超过 6 小时未治疗\n\n### 🚨 关键提示：\n**不要等待症状出现！** 有些毒蛇（如银环蛇）咬伤初期症状轻微，但毒性极强。**立即就医是最正确的选择！**', '2026-04-13 18:23:12', '2026-04-13 18:23:12');
INSERT INTO `emergency_qa_cache` VALUES (5, '蛇怕什么气味和东西？', '### 蛇类害怕的气味和物品：\n\n#### 蛇害怕的气味：\n1. **硫磺味**\n   - 硫磺粉、雄黄等传统驱蛇用品\n   - 效果：中等，需要高浓度\n\n2. **刺激性化学品**\n   - 漂白水、氨水、汽油\n   - 效果：较强，但对人体也有害\n\n3. **某些植物精油**\n   - 薄荷油、桉树油、肉桂油\n   - 效果：较弱，需要经常补充\n\n4. **动物排泄物**\n   - 狐狸、黄鼠狼等天敌的粪便\n   - 效果：短期有效\n\n#### 蛇害怕的物品/环境：\n1. **震动**\n   - 蛇通过地面振动感知危险\n   - 敲击地面可驱赶\n\n2. **高温和明火**\n   - 大多数蛇怕火\n   - 但火灾时蛇也会逃窜伤人\n\n3. **开阔地带**\n   - 蛇喜欢隐蔽，不喜欢空旷处\n\n4. **某些动物**\n   - 鹅、猫、狗等家禽家畜\n   - 野猪、黄鼠狼等野生动物\n\n#### ⚠️ 重要提醒：\n- **驱蛇剂效果有限**，不能完全依赖\n- **保持环境整洁**是最好的防蛇方法\n- **清除杂物、杂草**，减少蛇的藏身处\n- **封堵洞穴和缝隙**，防止蛇进入室内\n\n如果遇到蛇，最安全的做法是：**保持距离，联系专业人员处理！**', '2026-04-13 18:23:12', '2026-04-13 18:23:12');

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
  `serum_availability` tinyint(1) NULL DEFAULT 0 COMMENT '是否有血清库存：0-无，1-有',
  `emergency_department` tinyint(1) NULL DEFAULT 1 COMMENT '是否有急诊科：0-无，1-有',
  `snake_venom_treatment` tinyint(1) NULL DEFAULT 0 COMMENT '是否能治疗蛇毒：0-否，1-是',
  `snake_venom_keywords` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '擅长治疗的蛇毒类型关键词',
  `created_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` tinyint(1) NULL DEFAULT 0 COMMENT '删除标志：0-正常，1-删除',
  PRIMARY KEY (`hospital_id`) USING BTREE,
  INDEX `idx_location`(`latitude` ASC, `longitude` ASC) USING BTREE COMMENT '地理位置索引，用于附近医院查询',
  INDEX `idx_type`(`hospital_type` ASC) USING BTREE COMMENT '医院类型索引',
  INDEX `idx_snake_treatment`(`snake_venom_treatment` ASC) USING BTREE COMMENT '蛇毒治疗能力索引',
  INDEX `idx_snake_keywords`(`snake_venom_keywords` ASC) USING BTREE COMMENT '蛇毒关键词索引'
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储医院基本信息和服务能力' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of hospital_info
-- ----------------------------
INSERT INTO `hospital_info` VALUES (1, '遵义医科大学第二附属医院', '新龙大道西 150 米', 27.694486, 107.043478, '0851-27596113;0851-27596114', '综合医院', 1, 1, 1, '银环蛇，眼镜蛇，五步蛇', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0);
INSERT INTO `hospital_info` VALUES (2, '遵义新蒲永康中医院', '长征大道与娄山路交叉口西 140 米', 27.705478, 107.036984, '18685202139', '中医院', 0, 1, 1, '竹叶青，蝮蛇', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0);
INSERT INTO `hospital_info` VALUES (3, '遵义新蒲康兴医院', '播州大道与奥体路交汇处天鹅湖康郡 1-2 号楼', 27.724318, 107.039192, '0851-28766120', '综合医院', 1, 1, 1, '眼镜王蛇，太攀蛇', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0);
INSERT INTO `hospital_info` VALUES (4, '新蒲瑞德医院', '林达阳光新城 2 号楼 2-3 号', 27.706456, 107.032616, '0851-28657120', '综合医院', 1, 1, 1, '常见毒蛇', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0);
INSERT INTO `hospital_info` VALUES (5, '新蒲镇卫生院接种点', '新蒲镇明星路 19 号', 27.711373, 107.030373, '', '社区医院', 0, 1, 0, NULL, '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0);

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
  CONSTRAINT `fk_recognition_snake` FOREIGN KEY (`snake_id`) REFERENCES `snake_info` (`snake_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_recognition_user` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储用户的蛇类识别记录' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of recognition_record
-- ----------------------------
INSERT INTO `recognition_record` VALUES (1, 3, 1, '/uploads/recognition/20260125_001.jpg', '2026-01-25 10:30:00', '银环蛇', '{\"confidence\":0.95,\"model_version\":\"v2.1\"}');
INSERT INTO `recognition_record` VALUES (2, 4, 5, '/uploads/recognition/20260124_002.jpg', '2026-01-24 15:20:00', '竹叶青', '{\"confidence\":0.88,\"model_version\":\"v2.1\"}');
INSERT INTO `recognition_record` VALUES (3, 5, 8, '/uploads/recognition/20260123_003.jpg', '2026-01-23 09:15:00', '王锦蛇', '{\"confidence\":0.92,\"model_version\":\"v2.1\"}');
INSERT INTO `recognition_record` VALUES (4, 6, 2, '/uploads/recognition/20260122_004.jpg', '2026-01-22 14:45:00', '眼镜蛇', '{\"confidence\":0.90,\"model_version\":\"v2.1\"}');
INSERT INTO `recognition_record` VALUES (5, 3, 7, '/uploads/recognition/20260121_005.jpg', '2026-01-21 16:30:00', '乌梢蛇', '{\"confidence\":0.87,\"model_version\":\"v2.1\"}');

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储系统中的角色信息' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES (1, 'ADMIN', '系统管理员拥有所有权限', '2026-04-13 18:23:11');
INSERT INTO `role` VALUES (2, 'MODERATOR', '版主内容管理员管理内容和用户', '2026-04-13 18:23:11');
INSERT INTO `role` VALUES (3, 'USER', '普通用户基本功能权限', '2026-04-13 18:23:11');
INSERT INTO `role` VALUES (4, 'VIP', 'VIP 用户享有特殊权限', '2026-04-13 18:23:11');
INSERT INTO `role` VALUES (5, 'RESCUER', '救助人员，处理紧急求助调度', '2026-05-18 20:25:33');

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
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '记录各个医院针对不同蛇类血清的库存情况' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of serum_inventory
-- ----------------------------
INSERT INTO `serum_inventory` VALUES (1, 1, 1, 10, '2026-12-31', '{\"batch\":\"2024001\",\"supplier\":\"贵州医药\"}');
INSERT INTO `serum_inventory` VALUES (2, 1, 2, 8, '2026-11-30', '{\"batch\":\"2024002\",\"supplier\":\"贵州医药\"}');
INSERT INTO `serum_inventory` VALUES (3, 1, 4, 5, '2026-10-31', '{\"batch\":\"2024003\",\"supplier\":\"云南医药\"}');
INSERT INTO `serum_inventory` VALUES (4, 2, 5, 6, '2026-09-30', '{\"batch\":\"2024004\",\"supplier\":\"广西医药\"}');
INSERT INTO `serum_inventory` VALUES (5, 2, 6, 4, '2026-08-31', '{\"batch\":\"2024005\",\"supplier\":\"广西医药\"}');
INSERT INTO `serum_inventory` VALUES (6, 3, 3, 3, '2026-12-15', '{\"batch\":\"2024006\",\"supplier\":\"进口血清\"}');
INSERT INTO `serum_inventory` VALUES (7, 3, 11, 2, '2027-01-31', '{\"batch\":\"2024007\",\"supplier\":\"进口血清\"}');
INSERT INTO `serum_inventory` VALUES (8, 4, 1, 7, '2026-11-15', '{\"batch\":\"2024008\",\"supplier\":\"贵州医药\"}');
INSERT INTO `serum_inventory` VALUES (9, 4, 2, 5, '2026-10-15', '{\"batch\":\"2024009\",\"supplier\":\"贵州医药\"}');

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
  INDEX `idx_location`(`latitude` ASC, `longitude` ASC) USING BTREE,
  CONSTRAINT `fk_active_snake` FOREIGN KEY (`snake_id`) REFERENCES `snake_info` (`snake_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类活跃区域信息，用于预警和路径规划' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of snake_active_area
-- ----------------------------
INSERT INTO `snake_active_area` VALUES (1, '凤凰山东侧步道', 27.685000, 107.015000, 500, 1, 5, '{\"last_sighted\":\"2026-01-25\",\"terrain\":\"forest\"}');
INSERT INTO `snake_active_area` VALUES (2, '湘江河湿地公园', 27.705000, 107.035000, 300, 6, 8, '{\"last_sighted\":\"2026-01-24\",\"terrain\":\"wetland\"}');
INSERT INTO `snake_active_area` VALUES (3, '新蒲新区绿化带', 27.720000, 107.040000, 200, 5, 3, '{\"last_sighted\":\"2026-01-23\",\"terrain\":\"urban\"}');
INSERT INTO `snake_active_area` VALUES (4, '大娄山南坡', 27.770000, 107.050000, 1000, 3, 2, '{\"last_sighted\":\"2026-01-20\",\"terrain\":\"mountain\"}');
INSERT INTO `snake_active_area` VALUES (5, '龙岩景区溪流边', 27.690000, 107.025000, 400, 4, 4, '{\"last_sighted\":\"2026-01-22\",\"terrain\":\"riverside\"}');

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
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `del_flag` tinyint UNSIGNED NULL DEFAULT 0 COMMENT '删除标志：0-正常，1-删除',
  `latin_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '拉丁学名',
  `forbidden_actions` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '严格禁止的行为',
  `serum_type` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '解毒血清类型',
  `hospital_department` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '建议就医科室',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `snake_name`(`snake_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类的急救信息，用于应急响应' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of snake_emergency_info
-- ----------------------------
INSERT INTO `snake_emergency_info` VALUES (1, '银环蛇', '金钱白花蛇', '神经毒素', '被咬后初期症状轻微，局部麻木、疼痛不明显，1-4 小时后出现神经麻痹（眼睑下垂、吞咽困难、呼吸困难）', '保持冷静，减少活动，用绷带轻轻绑扎伤口近心端，尽快就医', '注射抗银环蛇毒血清是唯一有效治疗手段', '银环蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (2, '眼镜蛇', '饭铲头', '混合毒素', '伤口剧痛，红肿明显，局部组织坏死，严重者可出现呼吸衰竭', '立即远离蛇体，用清水或肥皂水冲洗伤口，避免剧烈运动', '告知医生蛇的特征，可能需要抗眼镜蛇毒血清', '眼镜蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (3, '眼镜王蛇', '过山风', '混合毒素', '中毒症状发展迅速，剧烈疼痛，肿胀快速蔓延，可导致呼吸循环衰竭', '保持静止，避免奔跑，立即拨打急救电话', '需大量抗蛇毒血清，预后较差', '眼镜王蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (4, '五步蛇', '尖吻蝮', '血液毒素', '伤口出血不止，皮下瘀斑，血尿，严重者可出现 DIC（弥散性血管内凝血）', '加压包扎止血，避免使用止血带，尽快送医', '需要抗五步蛇毒血清和凝血因子', '五步蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (5, '竹叶青', '青竹标', '血液毒素', '局部剧痛，肿胀明显，可有水泡和血泡，淋巴结肿大', '冷敷患处，抬高患肢，避免切开排毒', '抗竹叶蛇毒血清治疗效果良好', '竹叶青_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (6, '蝮蛇', '土虺蛇', '混合毒素', '疼痛较轻，肿胀不明显，少数患者出现全身症状', '清洗消毒伤口，观察症状变化', '一般无需特殊治疗，严重者可用抗蝮蛇毒血清', '蝮蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (7, '乌梢蛇', NULL, NULL, '无毒蛇，伤口轻微疼痛，少量出血', '清洗消毒伤口，预防感染即可', '无需抗蛇毒血清，注意破伤风疫苗', '乌梢蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (8, '王锦蛇', '大王蛇', NULL, '无毒蛇，咬伤后疼痛明显，可有皮外伤', '清洗伤口，消毒包扎', '预防感染，无需抗蛇毒血清', '王锦蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (9, '菜花蛇', '黑眉锦蛇', NULL, '无毒蛇，伤口轻微，偶有感染', '肥皂水冲洗，碘伏消毒', '保持伤口清洁干燥，观察感染迹象', '菜花蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (10, '玉米蛇', NULL, NULL, '无毒宠物蛇，伤口轻微', '清水冲洗，创可贴保护', '无需特殊处理', '玉米蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (11, '太攀蛇', NULL, '神经毒素', '世界最毒蛇类，中毒后迅速出现呼吸肌麻痹，可在 1 小时内死亡', '立即加压固定患肢，尽快使用抗蛇毒血清', '必须在重症监护室治疗，需要呼吸机支持', '太攀蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (12, '赤链蛇', '火赤链', '后沟牙毒蛇，微毒', '伤口轻微疼痛，局部红肿，偶见过敏反应', '常规清洗消毒，抗过敏治疗', '一般无需抗蛇毒血清', '赤链蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (13, '蝰蛇', NULL, '血液毒素', '伤口剧痛，肿胀严重，出血倾向明显', '加压包扎，避免切开，尽快送医', '需要抗蝰蛇毒血清', '蝰蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (14, '猪鼻蛇', NULL, '后沟牙毒蛇，微毒', '伤口轻微，偶有局部过敏反应', '清洗消毒，观察过敏症状', '抗组胺药物治疗', '猪鼻蛇_1.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (15, '海岸太攀蛇', NULL, '神经毒素', '毒性极强，快速出现神经肌肉阻滞，呼吸衰竭', '立即固定患肢，人工呼吸，尽快给予抗蛇毒血清', '需要在 ICU 监护治疗', '太攀蛇_2.jpg', '2026-04-13 18:23:12', '2026-04-13 18:23:12', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (16, '金环蛇', NULL, NULL, 'AI-generated information for \'金环蛇\':\n中文通用名 + 拉丁学名：金环蛇（Bungarus fasciatus）\n毒性等级：剧毒\n毒液类型：神经毒\n\n专属急救流程：\n1. 立即远离金环蛇，避免二次咬伤，切勿尝试捕捉、击打蛇类，可留存蛇的外观特征方便后续诊疗。\n2. 立即停止活动保持静卧，将被咬伤的部位置于低于心脏的水平位置，尽可能减少肢体动作，延缓毒液扩散。\n3. 第一时间拨打120急救电话，明确告知接诊方为金环蛇咬伤，准确说明所在位置；等待救援期间，可使用弹性绷带、布条等在伤口近心端2~5cm处结扎，结扎力度以可伸入一根手指为宜，每15~20分钟松开1~2分钟，避免肢体缺血坏死。\n\n严格禁止的行为：\n1. 禁止用嘴吸吮伤口毒液，避免施救者经口腔破损处发生中毒。\n2. 禁止随意切开、挤压伤口，也不要用酒精、冰水冲洗伤口或私自涂抹草药、药膏，避免造成伤口感染或加速毒液吸收。\n3. 禁止咬伤后剧烈奔跑、活动，禁止饮酒、饮用浓茶、咖啡等兴奋性饮品，避免加快血液循环提升毒液扩散速度。\n\n对症解毒血清类型：暂无专属抗金环蛇毒血清，临床常规使用抗银环蛇毒血清治疗。\n建议就医科室：急诊科（若就诊医院设有蛇伤专科，优先就诊蛇伤专科）', NULL, NULL, '金环蛇_1.jpg', '2026-05-07 20:15:57', '2026-05-07 20:16:05', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (17, '鼠蛇', NULL, NULL, 'AI-generated information for \'鼠蛇\':\n中文通用名 + 拉丁学名：鼠蛇 Ptyas mucosus\n毒性等级：无毒\n毒液类型：无\n\n专属急救流程：\n1. 被咬伤后第一时间用流动清水或肥皂水冲洗伤口至少15分钟，尽量挤出伤口处的污血，清理残留的蛇类口腔分泌物及污物。\n2. 使用碘伏或医用酒精对伤口及周围皮肤进行规范消毒，避免创面发生感染。\n3. 若伤口较深或污染程度较高，需及时就医注射破伤风抗毒素，后续如果出现伤口红肿、疼痛加剧、发热等异常症状需立即复诊。\n\n严格禁止的行为：\n1. 禁止用嘴吮吸伤口，也不要在伤口处涂抹草药、烟灰、醋等偏方物品，避免加重感染风险。\n2. 禁止大力挤压伤口，防止污物进入深层组织，也不要在受伤后剧烈运动，避免加重局部肿胀。\n3. 禁止自行对伤口进行密闭包扎，需尽量保持创面透气，防止厌氧细菌繁殖。\n\n对症解毒血清类型：无\n建议就医科室：急诊外科、普通外科', NULL, NULL, '鼠蛇_1.jpg', '2026-05-07 20:21:21', '2026-05-07 20:21:30', 0, NULL, NULL, NULL, NULL);
INSERT INTO `snake_emergency_info` VALUES (18, '眼睛蛇', NULL, NULL, 'AI-generated information for \'眼睛蛇\':\n中文通用名 + 拉丁学名：眼镜蛇（注：您输入的“眼睛蛇”为错别字，正确通用名为眼镜蛇，也叫中华眼镜蛇、舟山眼镜蛇）Naja atra\n毒性等级：剧毒\n毒液类型：混合毒\n\n专属急救流程：\n1. 立即远离眼镜蛇活动范围，避免被二次攻击，有条件的话在安全距离拍摄蛇的外观照片，不要试图捕捉、击打蛇，方便后续就医快速确认蛇种。\n2. 立刻停止受伤肢体活动，保持伤口位置低于心脏水平面，用弹性绷带或干净布条在伤口近心端2-5厘米处结扎，松紧以可插入一根手指为宜，每15-20分钟松开1-2分钟，避免肢体缺血坏死。\n3. 第一时间拨打120急救电话，尽量保持静息状态不要奔跑，尽快前往备有对应抗蛇毒血清的医疗机构就诊。\n\n严格禁止的行为：\n1. 禁止用嘴吸吮伤口毒液，避免口腔黏膜存在微小破损时导致施救者也中毒。\n2. 禁止自行切开伤口、用酒精/碘伏等刺激性液体冲洗伤口，也不要对伤口冰敷、火烧，避免加重局部组织损伤。\n3. 禁止受伤后剧烈运动、饮酒、饮用咖啡、功能性饮料等兴奋性饮品，防止加快血液循环加速毒素扩散。\n\n对症解毒血清类型：抗眼镜蛇毒血清\n建议就医科室：急诊科，若医院开设有蛇伤专科可优先就诊蛇伤专科。', NULL, NULL, '眼睛蛇_1.jpg', '2026-05-07 20:33:32', '2026-05-07 20:33:39', 0, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for snake_info
-- ----------------------------
DROP TABLE IF EXISTS `snake_info`;
CREATE TABLE `snake_info`  (
  `snake_id` bigint NOT NULL AUTO_INCREMENT COMMENT '蛇类唯一标识，自增长',
  `snake_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '蛇类名称',
  `family` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '科名，如眼镜蛇科、蝰科',
  `genus` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '属名，如环蛇属、竹叶青蛇属',
  `latin_name` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '拉丁学名',
  `characteristics` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '蛇类特征描述',
  `toxicity_level` int NOT NULL COMMENT '毒性等级：0-无毒，1-低毒，2-有毒，3-剧毒',
  `toxin_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '毒素类型：神经毒素/血液毒素/细胞毒素/混合毒素/无毒',
  `danger_level` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '危险梯队：重度/中度/轻度/无毒',
  `habitat_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '栖息地信息',
  `distribution` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '分布省份，逗号分隔',
  `conservation_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '保护状态',
  `id` bigint NULL COMMENT '与snake_id同步(BaseEntity)',
  `created_time` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间(BaseEntity)',
  `updated_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间(BaseEntity)',
  `create_by` varchar(50) NULL COMMENT '创建人(BaseEntity)',
  `update_by` varchar(50) NULL COMMENT '更新人(BaseEntity)',
  `remark` varchar(500) NULL COMMENT '备注(BaseEntity)',
  `del_flag` int NULL DEFAULT 0 COMMENT '删除标志(BaseEntity)',
  PRIMARY KEY (`snake_id`) USING BTREE,
  UNIQUE INDEX `idx_snake_name`(`snake_name` ASC) USING BTREE,
  INDEX `idx_del_flag`(`del_flag`)
) ENGINE = InnoDB AUTO_INCREMENT = 220 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类的基本信息和特征' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of snake_info
-- ----------------------------
INSERT INTO `snake_info` VALUES (16, '大盲蛇', '盲蛇科', '东南亚盲蛇属', 'Argyrophis diardii (Schlegel, 1839)', '小型穴居蛇类，体长约20-30cm，眼退化隐于鳞下，通体光滑暗褐色，外形似蚯蚓', 0, '无毒', '无毒', '地下洞穴、腐殖土层、白蚁巢附近', '云南、广西、海南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (17, '恒春盲蛇', '盲蛇科', '东南亚盲蛇属', 'Argyrophis koshunensis (Oshima, 1916)', '小型穴居蛇类，眼退化，体光滑呈暗色，形似蚯蚓', 0, '无毒', '无毒', '土壤深层、落叶层下', '台湾（恒春半岛）', '无危');
INSERT INTO `snake_info` VALUES (18, '白头钩盲蛇', '盲蛇科', '印度盲蛇属', 'Indotyphlops albiceps (Boulenger, 1898)', '极小型穴居蛇，头部白色，体呈暗棕色，眼退化', 0, '无毒', '无毒', '土壤、石块下、落叶层', '云南；缅甸', '无危');
INSERT INTO `snake_info` VALUES (19, '钩盲蛇', '盲蛇科', '印度盲蛇属', 'Indotyphlops braminus (Daudin, 1803)', '体长10-15cm，暗褐色有光泽，形似蚯蚓，眼退化，营孤雌生殖', 0, '无毒', '无毒', '花盆、石块下、腐殖土中，常随植物贸易扩散', '华南、华中、西南各省；广泛分布于全球热带亚热带', '无危');
INSERT INTO `snake_info` VALUES (20, '贾氏盲蛇', '盲蛇科', '印度盲蛇属', 'Indotyphlops jerdoni (Boulenger, 1890)', '小型穴居蛇类，体光滑呈暗色', 0, '无毒', '无毒', '土壤深层、腐殖层', '云南；印度东北部', '无危');
INSERT INTO `snake_info` VALUES (21, '香港盲蛇', '盲蛇科', '印度盲蛇属', 'Indotyphlops lazelli (Wallach & Pauwels, 2004)', '极小型穴居蛇，香港特有种', 0, '无毒', '无毒', '土壤深层、城市绿地', '香港', '数据缺乏');
INSERT INTO `snake_info` VALUES (22, '敦煌沙蚺', '蚺科', '沙蚺属', 'Eryx dunhuangensis (Li & Wang, 1989)', '中小型蚺蛇，吻部呈铲状适于沙中挖掘，眼睛位于头部背侧', 0, '无毒', '无毒', '干旱荒漠、沙质土壤', '甘肃（敦煌）、新疆', '无危');
INSERT INTO `snake_info` VALUES (23, '红沙蚺', '蚺科', '沙蚺属', 'Eryx miliaris (Pallas, 1773)', '中小型沙栖蚺蛇，体色沙黄至红褐色，吻部铲状', 0, '无毒', '无毒', '干旱荒漠、半荒漠沙地', '新疆、甘肃；中亚', '无危');
INSERT INTO `snake_info` VALUES (24, '东疆沙蚺', '蚺科', '沙蚺属', 'Eryx orentalisxinjiangensis (Li & Wang, 1989)', '沙栖蚺蛇，适应松软沙土环境', 0, '无毒', '无毒', '干旱荒漠地带', '新疆东部', '无危');
INSERT INTO `snake_info` VALUES (25, '红尾筒蛇', '筒蛇科', '筒蛇属', 'Cylindrophis jodiae (Amarasinghe et al., 2015)', '体呈圆筒状，尾部红色，头小不明显，穴居生活', 0, '无毒', '无毒', '土壤、落叶层、腐木下', '海南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (26, '海南闪鳞蛇', '闪鳞蛇科', '闪鳞蛇属', 'Xenopeltis hainanensis (Hu & Djao, 1972)', '鳞片光滑具强烈虹彩光泽，体色暗褐，头扁平', 0, '无毒', '无毒', '低地热带森林、农田边缘土壤中', '海南', '无危');
INSERT INTO `snake_info` VALUES (27, '闪鳞蛇', '闪鳞蛇科', '闪鳞蛇属', 'Xenopeltis unicolor (Reinwardt, 1827)', '鳞片高度光滑能折射强烈结构色光，体长约60-80cm，暗褐色', 0, '无毒', '无毒', '地表下泥土、落叶层、农田', '云南、广西、海南、广东；东南亚', '无危');
INSERT INTO `snake_info` VALUES (28, '蟒', '蟒科', '蟒属', 'Python bivittatus (Kuhl, 1820)', '大型蛇类，体长可达5-7米，体背棕褐色具不规则斑纹，泄殖腔两侧有残存后肢爪', 0, '无毒', '无毒', '热带亚热带森林、溪流附近、沼泽', '云南、贵州、广西、海南、广东、福建；东南亚', '易危');
INSERT INTO `snake_info` VALUES (29, '瘰鳞蛇', '瘰鳞蛇科', '瘰鳞蛇属', 'Acrochordus granulatus (Schneider, 1799)', '皮肤松弛粗糙具颗粒状小突起，腹部无宽大盾片，尾部侧扁适于水中活动', 0, '无毒', '无毒', '河口三角洲、红树林、浅海水域', '广东、广西、海南、云南；东南亚、南亚、大洋洲', '无危');
INSERT INTO `snake_info` VALUES (30, '老挝拟须唇蛇', '闪皮蛇科', '拟须唇蛇属', 'Parafimbrios lao (Teynie et al., 2015)', '唇部具须状突起，体色暗褐，小型林栖蛇类', 0, '无毒', '无毒', '山区森林落叶层、溪流附近', '云南；老挝', '无危');
INSERT INTO `snake_info` VALUES (31, '青脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus ater', '小型穴居蛇，体背深色至黑色，脊棱明显', 0, '无毒', '无毒', '山区潮湿枯枝落叶层、土壤缝隙', '四川、贵州', '无危');
INSERT INTO `snake_info` VALUES (32, '大别山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus dabieshanensis', '小型穴居蛇类，体色暗褐', 0, '无毒', '无毒', '山区森林落叶层', '安徽（大别山区）', '无危');
INSERT INTO `snake_info` VALUES (33, '大明山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus damingensis', '小型穴居蛇，活动极其隐秘', 0, '无毒', '无毒', '山区潮湿落叶层', '广西（大明山）', '无危');
INSERT INTO `snake_info` VALUES (34, '德化脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus dehuaensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '福建（德化）', '无危');
INSERT INTO `snake_info` VALUES (35, '越北脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus emilyae', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '广西；越南北部', '无危');
INSERT INTO `snake_info` VALUES (36, '台湾脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus formosanus', '小型穴居蛇，体光滑呈暗色', 0, '无毒', '无毒', '中高海拔山区落叶层', '台湾', '无危');
INSERT INTO `snake_info` VALUES (37, '海南脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus hainanus', '小型穴居蛇类', 0, '无毒', '无毒', '热带山地森林落叶层', '海南', '无危');
INSERT INTO `snake_info` VALUES (38, '黄家岭脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus huangjietangi', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '中国南方', '无危');
INSERT INTO `snake_info` VALUES (39, '湖南脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus hunanensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区潮湿落叶层', '湖南', '无危');
INSERT INTO `snake_info` VALUES (40, '江华脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus jianghuaensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '湖南（江华）', '无危');
INSERT INTO `snake_info` VALUES (41, '井冈山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus jinggangensis', '小型穴居蛇类，山区特有种', 0, '无毒', '无毒', '中高海拔山区落叶层', '江西（井冈山）', '无危');
INSERT INTO `snake_info` VALUES (42, '美姑脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus meiguensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '四川（美姑）', '无危');
INSERT INTO `snake_info` VALUES (43, '南山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus nanshanensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区落叶层', '湖南（南山）', '无危');
INSERT INTO `snake_info` VALUES (44, '阿里山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus niger', '小型穴居蛇，体色黑褐色', 0, '无毒', '无毒', '中高海拔山区森林', '台湾（阿里山）', '无危');
INSERT INTO `snake_info` VALUES (45, '宁陕脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus ningshanensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '陕西（宁陕）', '无危');
INSERT INTO `snake_info` VALUES (46, '攀枝花脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus panzhihuaensis', '小型穴居蛇类', 0, '无毒', '无毒', '干热河谷地带落叶层', '四川（攀枝花）', '无危');
INSERT INTO `snake_info` VALUES (47, '屏边脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus pingbianensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '云南（屏边）', '无危');
INSERT INTO `snake_info` VALUES (48, '棕脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus rufescens', '小型穴居蛇，体背棕褐色', 0, '无毒', '无毒', '山区潮湿落叶层、土壤缝隙', '华南、西南各省；越南', '无危');
INSERT INTO `snake_info` VALUES (49, '沈氏脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus sheni', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '中国南方', '无危');
INSERT INTO `snake_info` VALUES (50, '黑脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus spinalis', '小型穴居蛇，体背黑色脊棱明显', 0, '无毒', '无毒', '山区潮湿落叶层', '华东、华南各省；日本', '无危');
INSERT INTO `snake_info` VALUES (51, '杨氏脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus yangdatongi', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '中国南方', '无危');
INSERT INTO `snake_info` VALUES (52, '云开脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus yunkaiensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '广东、广西（云开山脉）', '无危');
INSERT INTO `snake_info` VALUES (53, '克钦钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas andersonii', '头大钝圆，下颌齿左右不对称（右侧多于左侧），专食蜗牛', 0, '无毒', '无毒', '山区森林潮湿环境', '云南；缅甸北部', '无危');
INSERT INTO `snake_info` VALUES (54, '泰雅钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas atayal', '头大钝圆，专食蜗牛', 0, '无毒', '无毒', '中低海拔山区森林', '台湾', '无危');
INSERT INTO `snake_info` VALUES (55, '百色钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas baiseensis', '头大钝圆，专食蜗牛', 0, '无毒', '无毒', '亚热带森林', '广西（百色）', '无危');
INSERT INTO `snake_info` VALUES (56, '勐腊钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas berdmorei', '头大钝圆，专食蜗牛和蛞蝓', 0, '无毒', '无毒', '热带雨林、季雨林', '云南；缅甸、泰国', '无危');
INSERT INTO `snake_info` VALUES (57, '平鳞钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas boulengeri', '头大钝圆，鳞片平滑', 0, '无毒', '无毒', '山区森林', '华南、西南', '无危');
INSERT INTO `snake_info` VALUES (58, '中国钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas chinensis', '头大钝圆，下颌不对称', 0, '无毒', '无毒', '亚热带山区森林', '华中、华南', '无危');
INSERT INTO `snake_info` VALUES (59, '独龙江钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas dulongjiangensis', '头大钝圆，特有种', 0, '无毒', '无毒', '高黎贡山区森林', '云南（独龙江）', '无危');
INSERT INTO `snake_info` VALUES (60, '台湾钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas formosensis', '头大钝圆，专食蜗牛', 0, '无毒', '无毒', '中低海拔山区', '台湾', '无危');
INSERT INTO `snake_info` VALUES (61, '伯仲钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas geminatus', '头大钝圆', 0, '无毒', '无毒', '山区森林', '中国西南', '无危');
INSERT INTO `snake_info` VALUES (62, '观音山钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas guanyinshanensis', '头大钝圆，特有种', 0, '无毒', '无毒', '山区森林', '中国西南', '无危');
INSERT INTO `snake_info` VALUES (63, '缅甸钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas hamptoni', '头大钝圆，专食蜗牛', 0, '无毒', '无毒', '热带亚热带森林', '云南；缅甸、泰国', '无危');
INSERT INTO `snake_info` VALUES (64, '阿里山钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas komaii', '头大钝圆', 0, '无毒', '无毒', '中高海拔山区', '台湾（阿里山）', '无危');
INSERT INTO `snake_info` VALUES (65, '横斑钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas macularius', '头大钝圆，体背具横斑', 0, '无毒', '无毒', '山区森林', '中国西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (66, '横纹钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas margaritophorus', '头大钝圆，体背具横纹', 0, '无毒', '无毒', '山区森林潮湿环境', '中国西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (67, '喜山钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas monticola', '头大钝圆，高海拔种', 0, '无毒', '无毒', '高海拔山区森林', '西藏；喜马拉雅地区', '无危');
INSERT INTO `snake_info` VALUES (68, '昆明钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas niger', '头大钝圆，体色暗', 0, '无毒', '无毒', '亚热带山区森林', '云南（昆明）', '无危');
INSERT INTO `snake_info` VALUES (69, '黑顶钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas nigriceps', '头大钝圆，头顶黑色', 0, '无毒', '无毒', '山区森林', '中国西南', '无危');
INSERT INTO `snake_info` VALUES (70, '福建钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas stanleyi', '头大钝圆', 0, '无毒', '无毒', '亚热带山区森林', '福建', '无危');
INSERT INTO `snake_info` VALUES (71, '虎纹钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas tigerinus', '头大钝圆，体背具虎纹', 0, '无毒', '无毒', '山区森林', '中国西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (72, '贡山钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas vindumi', '头大钝圆，特有种', 0, '无毒', '无毒', '高黎贡山区森林', '云南（贡山）', '无危');
INSERT INTO `snake_info` VALUES (73, '雪林钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas xuelinensis', '头大钝圆', 0, '无毒', '无毒', '山区森林', '中国西南', '无危');
INSERT INTO `snake_info` VALUES (74, '云南钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas yunnanensis', '头大钝圆', 0, '无毒', '无毒', '亚热带山区森林', '云南', '无危');
INSERT INTO `snake_info` VALUES (75, '泰国圆斑蝰', '蝰科', '圆斑蝰属', 'Daboia siamensis', '体粗短，头大呈三角形，体背具圆形深色斑纹，管牙发达', 3, '血液毒素', '重度', '平原丘陵、农田、草地', '广东、广西、福建、台湾；东南亚', '无危');
INSERT INTO `snake_info` VALUES (76, '极北蝰', '蝰科', '蝰属', 'Vipera berus', '体粗短，头大三角形，体背有深色锯齿状纵纹，耐寒性强', 3, '血液毒素', '重度', '山地森林、草地、沼泽边缘', '新疆北部、黑龙江；欧洲、北亚', '无危');
INSERT INTO `snake_info` VALUES (77, '东方蝰', '蝰科', '蝰属', 'Vipera renardi', '体粗短，头呈三角形', 3, '血液毒素', '重度', '草原、半荒漠', '新疆、内蒙古；中亚、蒙古', '无危');
INSERT INTO `snake_info` VALUES (78, '黑头蝰', '蝰科', '白头蝰属', 'Azemiops feae', '头背黑色，体背紫褐色具浅色横带，管牙短小，原始蝰科成员', 2, '血液毒素', '中度', '山区森林、竹林、灌丛', '云南、贵州、四川、广西、西藏；缅甸、越南', '无危');
INSERT INTO `snake_info` VALUES (79, '白头蝰', '蝰科', '白头蝰属', 'Azemiops kharini', '头部淡黄白色，体背紫褐色具浅色横纹，罕见原始蝰科', 2, '血液毒素', '中度', '山区森林、竹林', '华南、西南山区；越南北部', '无危');
INSERT INTO `snake_info` VALUES (80, '尖吻蝮', '蝰科', '尖吻蝮属', 'Deinagkistrodon acutus', '俗称五步蛇，头大三角形吻端上翘，体背棕褐色具灰白色方斑，排毒量大', 3, '血液毒素', '重度', '山区森林、竹林、灌丛、溪沟', '华南、华中、西南各省（浙江、安徽、福建、江西、湖北、湖南、广东、广西、贵州、四川、台湾）', '无危');
INSERT INTO `snake_info` VALUES (81, '西藏竹叶青蛇', '蝰科', '喜山蝮属', 'Himalayophis tibetanus', '体背绿色，具管牙，高海拔竹叶青类群', 3, '血液毒素', '重度', '高海拔山区森林、灌丛', '西藏', '数据缺乏');
INSERT INTO `snake_info` VALUES (82, '藏南竹叶青蛇', '蝰科', '喜山蝮属', 'Himalayophis arunachalensis', '体背绿色，管牙发达', 3, '血液毒素', '重度', '山区森林', '西藏南部；印度东北部', '数据缺乏');
INSERT INTO `snake_info` VALUES (83, '兰纳竹叶青蛇', '蝰科', '坡普蝮属', 'Popeia lanna', '体背绿色，侧面有白色或红色侧线', 3, '血液毒素', '重度', '热带亚热带山区森林', '云南；泰国北部、缅甸', '无危');
INSERT INTO `snake_info` VALUES (84, '坡普竹叶青蛇', '蝰科', '坡普蝮属', 'Popeia popeiorum', '体背鲜绿色，尾端红色', 3, '血液毒素', '重度', '山区森林、灌丛', '云南；缅甸、泰国、印度', '无危');
INSERT INTO `snake_info` VALUES (85, '四川华蝮', '蝰科', '华蝮属', 'Sinovipera sichuanensis', '管牙发达，体色暗褐', 3, '血液毒素', '重度', '山区森林', '四川', '数据缺乏');
INSERT INTO `snake_info` VALUES (86, '冈氏竹叶青蛇', '蝰科', '绿蝮属', 'Viridovipera gumprechti', '体背鲜绿色，侧面具白色侧线', 3, '血液毒素', '重度', '热带亚热带山区森林', '云南；缅甸、泰国、老挝', '无危');
INSERT INTO `snake_info` VALUES (87, '墨脱竹叶青蛇', '蝰科', '绿蝮属', 'Viridovipera medoensis', '体背绿色，高海拔种', 3, '血液毒素', '重度', '高海拔亚热带森林', '西藏（墨脱）', '数据缺乏');
INSERT INTO `snake_info` VALUES (88, '福建竹叶青蛇', '蝰科', '绿蝮属', 'Viridovipera stejnegeri', '体背翠绿色，眼红色，尾焦红色，体侧有白色或红白各半侧线', 3, '血液毒素', '重度', '山区树林、竹林、灌丛、溪沟', '华东、华南、华中、西南各省', '无危');
INSERT INTO `snake_info` VALUES (89, '云南竹叶青蛇', '蝰科', '绿蝮属', 'Viridovipera yunnanensis', '体背绿色，云南特有种', 3, '血液毒素', '重度', '亚热带山区森林', '云南', '数据缺乏');
INSERT INTO `snake_info` VALUES (90, '白唇竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus albolabris', '体背翠绿色，唇部白色，尾焦红色', 3, '血液毒素', '重度', '低海拔山区树林、灌丛、农田', '华南、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (91, '饰尾竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus caudornatus', '体背绿色，尾部具装饰性花纹', 3, '血液毒素', '重度', '山区森林', '中国西南', '数据缺乏');
INSERT INTO `snake_info` VALUES (92, '台湾竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus gracilis', '体背绿色，体型纤细', 3, '血液毒素', '重度', '中高海拔山区', '台湾', '无危');
INSERT INTO `snake_info` VALUES (93, '滇南竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus guoi', '体背绿色', 3, '血液毒素', '重度', '热带山区森林', '云南南部；东南亚', '数据缺乏');
INSERT INTO `snake_info` VALUES (94, '错那竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus salazar', '体背绿色，头部具红色花纹', 3, '血液毒素', '重度', '山区森林', '西藏（错那）', '数据缺乏');
INSERT INTO `snake_info` VALUES (95, '角原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops cornutus', '头大三角形，吻端具角状突起', 3, '血液毒素', '重度', '山区森林', '中国西南', '数据缺乏');
INSERT INTO `snake_info` VALUES (96, '大别山原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops dabieshanensis', '头三角形，体背棕褐色', 3, '血液毒素', '重度', '山区森林', '安徽、湖北（大别山区）', '数据缺乏');
INSERT INTO `snake_info` VALUES (97, '喜山原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops himalayanus', '头大三角形，高海拔种', 3, '血液毒素', '重度', '高海拔山区', '西藏；喜马拉雅地区', '数据缺乏');
INSERT INTO `snake_info` VALUES (98, '菜花原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops jerdonii', '头三角形，体背黄绿色具菜花状斑纹', 3, '血液毒素', '重度', '山区森林、灌丛、草丛', '华中、西南；印度、缅甸', '无危');
INSERT INTO `snake_info` VALUES (99, '缅北原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops kaulbacki', '头大三角形', 3, '血液毒素', '重度', '山区森林', '云南；缅甸北部', '数据缺乏');
INSERT INTO `snake_info` VALUES (100, '莽山原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops mangshanensis', '俗称莽山烙铁头，体长可达2米，体背棕褐色具不规则黄绿色斑纹，极罕见', 3, '血液毒素', '重度', '亚热带原始森林', '湖南（莽山）、广东', '濒危');
INSERT INTO `snake_info` VALUES (101, '茂兰原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops maolanensis', '头大三角形', 3, '血液毒素', '重度', '喀斯特森林', '贵州（茂兰）', '数据缺乏');
INSERT INTO `snake_info` VALUES (102, '原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops mucrosquamatus', '头长三角形，体背棕褐色具不规则深色斑块，俗称烙铁头', 3, '血液毒素', '重度', '山区森林、竹林、灌丛、农田', '华中、华南、西南、台湾；东南亚', '无危');
INSERT INTO `snake_info` VALUES (103, '越北原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops trungkhanhensis', '头大三角形', 3, '血液毒素', '重度', '石灰岩山区森林', '广西；越南北部', '数据缺乏');
INSERT INTO `snake_info` VALUES (104, '乡城原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops xiangchengensis', '头大三角形，高海拔种', 3, '血液毒素', '重度', '高海拔山区森林', '四川（乡城）', '数据缺乏');
INSERT INTO `snake_info` VALUES (105, '盈江烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis jenkinsi', '头大三角形，体粗壮', 3, '血液毒素', '重度', '山区森林', '云南（盈江）；缅甸', '数据缺乏');
INSERT INTO `snake_info` VALUES (106, '台湾烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis makazayazaya', '头大三角形，体粗短', 3, '血液毒素', '重度', '中低海拔山区森林', '台湾', '无危');
INSERT INTO `snake_info` VALUES (107, '屏边烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis anitae', '头大三角形', 3, '血液毒素', '重度', '山区森林', '云南（屏边）', '数据缺乏');
INSERT INTO `snake_info` VALUES (108, '山烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis monticola', '头大三角形，体背深色', 3, '血液毒素', '重度', '中高海拔山区森林', '华中、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (109, '越南烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis tonkinensis', '头大三角形', 3, '血液毒素', '重度', '山区森林', '云南；越南', '数据缺乏');
INSERT INTO `snake_info` VALUES (110, '隅察烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis zayuensis', '头大三角形，高海拔种', 3, '血液毒素', '重度', '高海拔山区森林', '西藏（隅察）', '数据缺乏');
INSERT INTO `snake_info` VALUES (111, '若尔盖蝮', '蝰科', '亚洲蝮属', 'Gloydius angusticeps', '头三角形，体短粗，耐高海拔低温，高寒特有种', 3, '血液毒素', '重度', '高寒草甸、灌丛', '四川（若尔盖）、甘肃', '无危');
INSERT INTO `snake_info` VALUES (112, '短尾蝮', '蝰科', '亚洲蝮属', 'Gloydius brevicaudus', '头三角形，体短粗尾极短，体背灰褐色具深色圆斑', 3, '血液毒素', '重度', '平原、丘陵、低山区草地、石堆', '华东、华中、华北、西南广泛分布', '无危');
INSERT INTO `snake_info` VALUES (113, '长岛蝮', '蝰科', '亚洲蝮属', 'Gloydius changdaoensis', '头三角形，岛屿特有种', 3, '血液毒素', '重度', '海岛灌丛', '山东（长岛）', '数据缺乏');
INSERT INTO `snake_info` VALUES (114, '阿拉善蝮', '蝰科', '亚洲蝮属', 'Gloydius cognatus', '头三角形，适应干旱环境', 3, '血液毒素', '重度', '荒漠草原、戈壁', '内蒙古（阿拉善）、甘肃', '无危');
INSERT INTO `snake_info` VALUES (115, '西伯利亚蝮', '蝰科', '亚洲蝮属', 'Gloydius halys', '头三角形，耐寒能力极强，分布纬度最高的蝮蛇之一', 3, '血液毒素', '重度', '针叶林、草原、石质山坡', '新疆、内蒙古、黑龙江、吉林；蒙古、俄罗斯西伯利亚', '无危');
INSERT INTO `snake_info` VALUES (116, '澜沧蝮', '蝰科', '亚洲蝮属', 'Gloydius huangi', '头三角形，河谷特有种', 3, '血液毒素', '重度', '干热河谷灌丛', '云南（澜沧江流域）', '数据缺乏');
INSERT INTO `snake_info` VALUES (117, '中介蝮', '蝰科', '亚洲蝮属', 'Gloydius intermedius', '头三角形，体背沙黄色至灰色具深色斑块', 3, '血液毒素', '重度', '荒漠草原、石质山坡', '西北各省（新疆、甘肃、宁夏、内蒙古）；蒙古、中亚', '无危');
INSERT INTO `snake_info` VALUES (118, '九寨蝮', '蝰科', '亚洲蝮属', 'Gloydius lateralis', '头三角形，体侧具特征性花纹', 3, '血液毒素', '重度', '山区森林、灌丛', '四川（九寨沟）', '数据缺乏');
INSERT INTO `snake_info` VALUES (119, '六盘山蝮', '蝰科', '亚洲蝮属', 'Gloydius liupanensis', '头三角形', 3, '血液毒素', '重度', '山区灌丛、草地', '宁夏、甘肃（六盘山区）', '数据缺乏');
INSERT INTO `snake_info` VALUES (120, '庙岛蝮', '蝰科', '亚洲蝮属', 'Gloydius lijianlii', '头三角形，岛屿特有种', 3, '血液毒素', '重度', '海岛灌丛', '山东（庙岛群岛）', '数据缺乏');
INSERT INTO `snake_info` VALUES (121, '怒江蝮', '蝰科', '亚洲蝮属', 'Gloydius lipipengi', '头三角形', 3, '血液毒素', '重度', '河谷山区', '云南（怒江流域）', '数据缺乏');
INSERT INTO `snake_info` VALUES (122, '雪山蝮', '蝰科', '亚洲蝮属', 'Gloydius monticola', '头三角形，高海拔特有种', 3, '血液毒素', '重度', '高海拔草甸、灌丛', '四川、云南', '数据缺乏');
INSERT INTO `snake_info` VALUES (123, '秦岭蝮', '蝰科', '亚洲蝮属', 'Gloydius qinlingensis', '头三角形，山区特有种', 3, '血液毒素', '重度', '山区森林、灌丛', '陕西、甘肃（秦岭山区）', '无危');
INSERT INTO `snake_info` VALUES (124, '红斑高山蝮', '蝰科', '亚洲蝮属', 'Gloydius rubromaculatus', '头三角形，体背具红色斑块', 3, '血液毒素', '重度', '高海拔草甸', '四川、青海', '数据缺乏');
INSERT INTO `snake_info` VALUES (125, '高原蝮', '蝰科', '亚洲蝮属', 'Gloydius strauchi', '头三角形，极强耐寒能力，高寒高原特有种', 3, '血液毒素', '重度', '青藏高原高寒草甸、灌丛', '青海、西藏、四川、甘肃', '无危');
INSERT INTO `snake_info` VALUES (126, '华北蝮', '蝰科', '亚洲蝮属', 'Gloydius stejnegeri', '头三角形', 3, '血液毒素', '重度', '山区灌丛、草地', '河北、山西、北京', '数据缺乏');
INSERT INTO `snake_info` VALUES (127, '蛇岛蝮', '蝰科', '亚洲蝮属', 'Gloydius shedaoensis', '头三角形，岛屿特有种，以候鸟为主要食物', 3, '血液毒素', '重度', '海岛灌丛、岩缝', '辽宁（蛇岛）', '濒危');
INSERT INTO `snake_info` VALUES (128, '冰川蝮', '蝰科', '亚洲蝮属', 'Gloydius swild', '头三角形，极高海拔种', 3, '血液毒素', '重度', '冰川边缘高寒地带', '四川、云南', '数据缺乏');
INSERT INTO `snake_info` VALUES (129, '乌苏里蝮', '蝰科', '亚洲蝮属', 'Gloydius ussuriensis', '头三角形，体背灰褐色', 3, '血液毒素', '重度', '针叶林、混交林、草地', '黑龙江、吉林、辽宁；俄罗斯远东、朝鲜', '无危');
INSERT INTO `snake_info` VALUES (130, '卡若蝮', '蝰科', '亚洲蝮属', 'Gloydius variegatus', '头三角形', 3, '血液毒素', '重度', '山区灌丛', '西藏（卡若）', '数据缺乏');
INSERT INTO `snake_info` VALUES (131, '铅色水蛇', '水蛇科', '铅色水蛇属', 'Hypsiscopus wettsteini', '体色铅灰，鼻孔移至吻背，后沟牙，半水生', 0, '无毒', '无毒', '河口三角洲、红树林、淡水湿地', '广东、广西、海南、云南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (132, '黑斑水蛇', '水蛇科', '黑斑水蛇属', 'Myrrophis bennettii', '体背具黑色斑点，鼻孔朝上，后沟牙', 0, '无毒', '无毒', '淡水湿地、稻田、溪流', '华南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (133, '中国水蛇', '水蛇科', '黑斑水蛇属', 'Myrrophis chinensis', '体背橄榄色具黑色纵纹，鼻孔朝上，后沟牙微毒', 1, '无毒', '轻度', '淡水湿地、稻田、水沟、池塘', '华东、华南、华中各省', '无危');
INSERT INTO `snake_info` VALUES (134, '紫沙蛇', '紫沙蛇科', '紫沙蛇属', 'Psammodynastes pulverulentus', '瞳孔垂直椭圆形，体色紫褐，后沟牙具微弱毒性', 1, '无毒', '轻度', '山区森林落叶层、灌丛', '华南、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (135, '花条蛇', '花条蛇科', '花条蛇属', 'Psammophis lineolatus', '体细长，行动极快，体背淡黄色具深色纵纹，日行性视力佳', 0, '无毒', '无毒', '干旱荒漠、半荒漠', '新疆、甘肃、内蒙古；中亚', '无危');
INSERT INTO `snake_info` VALUES (136, '吐鲁番花条蛇', '花条蛇科', '花条蛇属', 'Psammophis turpanensis', '体细长，行动迅速', 0, '无毒', '无毒', '干旱荒漠', '新疆（吐鲁番）', '数据缺乏');
INSERT INTO `snake_info` VALUES (137, '西藏温泉蛇', '食螺蛇科', '温泉蛇属', 'Thermophis baileyi', '青藏高原特有蛇类，依赖地热温泉微气候生存，地质气候活化石', 0, '无毒', '无毒', '温泉附近、地热区域', '西藏', '易危');
INSERT INTO `snake_info` VALUES (138, '香格里拉温泉蛇', '食螺蛇科', '温泉蛇属', 'Thermophis shangrila', '高海拔温泉特有种', 0, '无毒', '无毒', '温泉附近', '云南（香格里拉）', '数据缺乏');
INSERT INTO `snake_info` VALUES (139, '四川温泉蛇', '食螺蛇科', '温泉蛇属', 'Thermophis zhaoermii', '高海拔温泉特有种', 0, '无毒', '无毒', '温泉附近', '四川', '数据缺乏');
INSERT INTO `snake_info` VALUES (140, '贡山两头蛇', '两头蛇科', '两头蛇属', 'Calamaria andersoni', '尾部形态与头部高度相似，受威胁时翘起尾部迷惑天敌', 0, '无毒', '无毒', '山区森林落叶层下、土壤中', '云南（贡山）', '数据缺乏');
INSERT INTO `snake_info` VALUES (141, '钝尾两头蛇', '两头蛇科', '两头蛇属', 'Calamaria septentrionalis', '尾部与头部极似，属典型拟态演化', 0, '无毒', '无毒', '山区森林土壤、落叶层', '华中、华南、西南', '无危');
INSERT INTO `snake_info` VALUES (142, '云南两头蛇', '两头蛇科', '两头蛇属', 'Calamaria yunnanensis', '尾部与头部高度相似', 0, '无毒', '无毒', '山区森林落叶层', '云南', '数据缺乏');
INSERT INTO `snake_info` VALUES (143, '黑头剑蛇', '剑蛇科', '剑蛇属', 'Sibynophis chinensis', '头部黑色，体细长，行动迅速', 0, '无毒', '无毒', '山区森林、灌丛', '华南、华中、西南', '无危');
INSERT INTO `snake_info` VALUES (144, '虎斑颈槽蛇', '水游蛇科', '颈槽蛇属', 'Rhabdophis tigrinus', '颈背具颈腺可喷射蟾蜍毒素，体背绿色具黑色虎斑，后沟牙，能通过捕食蟾蜍积累毒素', 3, '混合毒素', '重度', '平原丘陵湿地、稻田、溪沟', '华东、华中、华北、东北、西南；日本、朝鲜、俄罗斯远东', '无危');
INSERT INTO `snake_info` VALUES (145, '红脖颈槽蛇', '水游蛇科', '颈槽蛇属', 'Rhabdophis subminiatus', '颈部红色具颈腺，后沟牙，能化学盗用蟾蜍毒素', 3, '混合毒素', '重度', '平原丘陵湿地、灌丛', '华南、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (146, '草腹链蛇', '水游蛇科', '腹链蛇属', 'Amphiesma stolatum', '体背褐色具浅色纵纹，中小型无毒蛇', 0, '无毒', '无毒', '平原丘陵草地、灌丛、农田', '华南、华中、西南；南亚、东南亚', '无危');
INSERT INTO `snake_info` VALUES (147, '黄斑渔游蛇', '水游蛇科', '渔游蛇属', 'Fowlea flavipunctata', '体背具黄色斑点，半水生', 0, '无毒', '无毒', '溪流、水塘、稻田', '华南、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (148, '绿林蛇', '游蛇科', '林蛇属', 'Boiga cyanea', '体背鲜绿色，瞳孔垂直，夜行性，后沟牙微毒', 0, '无毒', '无毒', '热带亚热带森林树冠层', '云南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (149, '东伽马林蛇', '游蛇科', '林蛇属', 'Boiga gocool', '体细长，夜行性树栖', 0, '无毒', '无毒', '山区森林树冠层', '中国西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (150, '绞花林蛇', '游蛇科', '林蛇属', 'Boiga kraepelini', '体细长，体背棕褐色具黑褐色斑块，夜行性后沟牙', 0, '无毒', '无毒', '山区森林', '华南、华中、西南；越南', '无危');
INSERT INTO `snake_info` VALUES (151, '繁花林蛇', '游蛇科', '林蛇属', 'Boiga multomaculata', '体背具繁复花纹，夜行性树栖', 0, '无毒', '无毒', '山区森林树冠层', '华南、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (152, '赤链蛇', '游蛇科', '白环蛇属', 'Lycodon rufozonatus', '体背黑褐色具多数红色横纹，后沟牙，模拟剧毒环蛇的贝氏拟态', 2, '无毒', '中度', '平原丘陵山地、农田、住宅附近', '华东、华中、华北、东北、西南；日本、朝鲜、俄罗斯远东', '无危');
INSERT INTO `snake_info` VALUES (153, '双全白环蛇', '游蛇科', '白环蛇属', 'Lycodon fasciatus', '体背黑白相间环纹', 0, '无毒', '无毒', '山区森林', '华南、西南', '无危');
INSERT INTO `snake_info` VALUES (154, '黑斑白环蛇', '游蛇科', '白环蛇属', 'Lycodon neomaculatus', '体背具黑色斑纹', 0, '无毒', '无毒', '山区森林', '中国西南', '无危');
INSERT INTO `snake_info` VALUES (155, '察隅白环蛇', '游蛇科', '白环蛇属', 'Lycodon zayuensis', '体背具环纹', 0, '无毒', '无毒', '山区森林', '西藏（察隅）', '数据缺乏');
INSERT INTO `snake_info` VALUES (156, '饰纹寡头蛇', '游蛇科', '寡头蛇属', 'Oligodon ornatus', '上颌后缘齿宽扁似库克里刀，专破蛋壳吸食蛋液', 0, '无毒', '无毒', '山区森林落叶层', '华南、西南', '无危');
INSERT INTO `snake_info` VALUES (157, '三索锦蛇', '游蛇科', '颌腔蛇属', 'Coelognathus radiatus', '体侧具三条深色纵纹，大型无毒蛇', 0, '无毒', '无毒', '平原丘陵灌丛、农田', '云南、广西、广东；东南亚', '无危');
INSERT INTO `snake_info` VALUES (158, '玉斑锦蛇', '游蛇科', '玉斑蛇属', 'Euprepiophis mandarinus', '体背具黑色边缘的菱形斑块，色彩艳丽', 0, '无毒', '无毒', '山区森林、灌丛', '华东、华中、西南；缅甸', '无危');
INSERT INTO `snake_info` VALUES (159, '紫灰锦蛇', '游蛇科', '紫灰蛇属', 'Oreocryptophis porphyraceus', '体背紫灰色具深色纵纹', 0, '无毒', '无毒', '山区森林', '华南、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (160, '红纹滞卵蛇', '游蛇科', '滞卵蛇属', 'Oocatochus rufodorsatus', '体背红褐色，卵胎生繁殖策略适应寒冷环境', 0, '无毒', '无毒', '山区溪流附近、湿地', '华北、东北、华中；朝鲜、俄罗斯远东', '无危');
INSERT INTO `snake_info` VALUES (161, '王锦蛇', '游蛇科', '锦蛇属', 'Elaphe carinata', '体大粗壮可达2米，体背黑褐色杂黄色斑纹，头部有\"王\"字纹，具食蛇性和天然抗毒能力', 0, '无毒', '无毒', '平原丘陵山区', '华东、华中、华南、西南', '无危');
INSERT INTO `snake_info` VALUES (162, '白条锦蛇', '游蛇科', '锦蛇属', 'Elaphe dione', '体背灰褐色具白色纵纹', 0, '无毒', '无毒', '平原丘陵草地、农田', '华北、西北、东北、华东；中亚、朝鲜', '无危');
INSERT INTO `snake_info` VALUES (163, '黑眉锦蛇', '游蛇科', '锦蛇属', 'Elaphe taeniura', '眼后具黑色眉纹，大型无毒蛇，善攀爬', 0, '无毒', '无毒', '平原丘陵山地、住宅附近', '全国广泛分布；东南亚', '无危');
INSERT INTO `snake_info` VALUES (164, '若尔盖锦蛇', '游蛇科', '锦蛇属', 'Elaphe zoigeensis', '高海拔特有种', 0, '无毒', '无毒', '高海拔草甸灌丛', '四川（若尔盖）', '数据缺乏');
INSERT INTO `snake_info` VALUES (165, '灰腹绿锦蛇', '游蛇科', '树栖锦蛇属', 'Gonyosoma frenatum', '体背绿色，腹部灰白色，树栖型', 0, '无毒', '无毒', '山区森林树冠层', '华南、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (166, '蓝绿锦蛇', '游蛇科', '树栖锦蛇属', 'Gonyosoma coeruleum', '体背蓝绿色，树栖型', 0, '无毒', '无毒', '热带亚热带森林', '云南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (167, '环纹华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus annularis', '体背红棕色具黑色环纹，前沟牙，神经毒性', 3, '神经毒素', '重度', '山区森林落叶层', '华南、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (168, '福建华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus kelloggi', '体背红褐色具黑色横纹，前沟牙', 3, '神经毒素', '重度', '山区森林', '福建、华南', '无危');
INSERT INTO `snake_info` VALUES (169, '中华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus macclellandi', '体背红棕色具黑色环纹，色彩鲜艳，前沟牙神经毒', 3, '神经毒素', '重度', '山区森林落叶层', '华东、华南、华中、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (170, '广西华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus peinani', '体背具珊瑚蛇花纹', 3, '神经毒素', '重度', '山区森林', '广西', '无危');
INSERT INTO `snake_info` VALUES (171, '梭德氏华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus sauteri', '体背具黑红环纹', 3, '神经毒素', '重度', '中低海拔山区森林', '台湾；越南', '无危');
INSERT INTO `snake_info` VALUES (172, '斯文豪氏华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus swinhoei', '体背具珊瑚蛇花纹', 3, '神经毒素', '重度', '山区森林', '台湾', '无危');
INSERT INTO `snake_info` VALUES (173, '眼镜王蛇', '眼镜蛇科', '眼镜王蛇属', 'Ophiophagus hannah (Cantor, 1836)', '全球体型最长毒蛇，可达3-5米，颈部扩张不如眼镜蛇明显，排毒量极大，具有食蛇性，混合毒素含神经毒和细胞毒', 3, '混合毒素', '重度', '山区原始森林、竹林', '华南、西南（云南、贵州、四川、广西、广东、福建、西藏、浙江、湖南、江西、海南）；东南亚、南亚', '易危');
INSERT INTO `snake_info` VALUES (174, '舟山眼镜蛇', '眼镜蛇科', '眼镜蛇属', 'Naja atra', '颈部可扩张成扁平状，受惊竖起前身，体背黑褐色，细胞毒素为主可致组织坏死', 3, '细胞毒素', '重度', '平原丘陵山地、田野、草丛、农田', '华东、华南、华中、西南', '无危');
INSERT INTO `snake_info` VALUES (175, '西南眼镜蛇', '眼镜蛇科', '眼镜蛇属', 'Naja fuxi', '新近描述种，颈部可扩张', 3, '细胞毒素', '重度', '山区森林', '云南、四川；东南亚', '数据缺乏');
INSERT INTO `snake_info` VALUES (176, '孟加拉眼镜蛇', '眼镜蛇科', '眼镜蛇属', 'Naja kaouthia', '颈部扩张具单眼斑，体背黄褐色至黑色', 3, '细胞毒素', '重度', '平原丘陵、农田、村寨附近', '云南、广西、贵州；东南亚、南亚', '无危');
INSERT INTO `snake_info` VALUES (177, '环蛇', '眼镜蛇科', '环蛇属', 'Bungarus bungaroides', '体背黑白相间环纹，前沟牙神经毒', 3, '神经毒素', '重度', '山区森林', '西藏；喜马拉雅地区', '无危');
INSERT INTO `snake_info` VALUES (178, '金环蛇', '眼镜蛇科', '环蛇属', 'Bungarus fasciatus', '体背黑黄相间环纹，前沟牙，神经毒素', 3, '神经毒素', '重度', '平原丘陵、灌丛、水域附近', '华南、西南；东南亚、南亚', '无危');
INSERT INTO `snake_info` VALUES (179, '乌环蛇', '眼镜蛇科', '环蛇属', 'Bungarus lividus', '体背深色，前沟牙神经毒', 3, '神经毒素', '重度', '山区森林', '西藏；南亚', '无危');
INSERT INTO `snake_info` VALUES (180, '银环蛇', '眼镜蛇科', '环蛇属', 'Bungarus multicinctus', '体背黑白相间环纹，白环窄黑环宽，夜行性，中国毒性最强的蛇之一，神经毒素致呼吸麻痹', 3, '神经毒素', '重度', '平原丘陵山地溪沟、稻田、鱼塘、村舍附近', '华东、华中、华南、西南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (181, '黑环蛇', '眼镜蛇科', '环蛇属', 'Bungarus niger', '体背黑色，前沟牙神经毒', 3, '神经毒素', '重度', '山区森林', '西藏；南亚', '无危');
INSERT INTO `snake_info` VALUES (182, '素贞环蛇', '眼镜蛇科', '环蛇属', 'Bungarus suzhenae', '新近描述种（2021年），体背黑白环纹，隐存物种', 3, '神经毒素', '重度', '山区森林', '中国西南', '数据缺乏');
INSERT INTO `snake_info` VALUES (183, '云南环蛇', '眼镜蛇科', '环蛇属', 'Bungarus wanghaotingi', '体背黑白环纹', 3, '神经毒素', '重度', '山区森林', '云南；东南亚', '无危');
INSERT INTO `snake_info` VALUES (184, '蓝灰扁尾海蛇', '眼镜蛇科', '扁尾海蛇属', 'Laticauda colubrina', '体背蓝灰色具黑色环纹，尾部侧扁适于划水，鼻孔移至吻背具防水瓣膜', 3, '神经毒素', '重度', '热带浅海、珊瑚礁', '南海、东海；太平洋、印度洋热带海域', '无危');
INSERT INTO `snake_info` VALUES (185, '扁尾海蛇', '眼镜蛇科', '扁尾海蛇属', 'Laticauda laticaudata', '体背蓝灰色具黑色环纹，海生', 3, '神经毒素', '重度', '热带浅海、珊瑚礁', '南海、东海；太平洋热带海域', '无危');
INSERT INTO `snake_info` VALUES (186, '半环扁尾海蛇', '眼镜蛇科', '扁尾海蛇属', 'Laticauda semifasciata', '体背蓝灰色具不完整黑色环纹', 3, '神经毒素', '重度', '热带浅海', '东海、南海；太平洋西部', '无危');
INSERT INTO `snake_info` VALUES (187, '海蛇', '眼镜蛇科', '龟头海蛇属', 'Emydocephalus ijimae', '头部呈龟头状，完全海生，以鱼卵为食', 3, '神经毒素', '重度', '浅海珊瑚礁', '东海、南海；日本南部', '无危');
INSERT INTO `snake_info` VALUES (188, '小头海蛇', '眼镜蛇科', '小头海蛇属', 'Microcephalophis gracilis', '头极小，体细长侧扁，完全海生', 3, '神经毒素', '重度', '浅海、河口', '南海、东海；印度洋、太平洋', '无危');
INSERT INTO `snake_info` VALUES (189, '青灰海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis caerulescens', '体背青灰色，尾部侧扁，完全海生', 3, '神经毒素', '重度', '浅海大陆架', '南海、东海；印度洋', '无危');
INSERT INTO `snake_info` VALUES (190, '平颏海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis curtus', '颏部平坦，海生', 3, '神经毒素', '重度', '浅海', '南海；东南亚', '无危');
INSERT INTO `snake_info` VALUES (191, '青环海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis cyanocinctus', '体背青灰色具深色环纹，完全海生', 3, '神经毒素', '重度', '浅海大陆架、近岸水域', '中国沿海；印度洋、太平洋', '无危');
INSERT INTO `snake_info` VALUES (192, '环纹海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis fasciatus', '体背具黑色环纹，海生', 3, '神经毒素', '重度', '浅海', '南海、东海；印度洋、太平洋', '无危');
INSERT INTO `snake_info` VALUES (193, '截吻海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis jerdonii', '吻端截断状，海生', 3, '神经毒素', '重度', '浅海', '南海；印度洋', '无危');
INSERT INTO `snake_info` VALUES (194, '黑头海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis melanocephalus', '头部黑色，海生', 3, '神经毒素', '重度', '浅海', '东海、南海；日本南部、东南亚', '无危');
INSERT INTO `snake_info` VALUES (195, '淡灰海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis ornatus', '体背淡灰色具花纹，海生', 3, '神经毒素', '重度', '浅海', '南海；印度洋、太平洋', '无危');
INSERT INTO `snake_info` VALUES (196, '棘眦海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis peronii', '眼部具棘状突起，海生', 3, '神经毒素', '重度', '浅海', '南海；太平洋', '无危');
INSERT INTO `snake_info` VALUES (197, '长吻海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis platurus', '吻部较长，分布最广的海蛇之一，能在开阔大洋中生活', 3, '神经毒素', '重度', '开阔大洋、浅海', '中国沿海；全球热带亚热带海域', '无危');
INSERT INTO `snake_info` VALUES (198, '棘鳞海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis stokesii', '鳞片具棘状突起，海生', 3, '神经毒素', '重度', '浅海', '南海；印度洋、太平洋', '无危');
INSERT INTO `snake_info` VALUES (199, '海蝰', '眼镜蛇科', '海蛇属', 'Hydrophis viperinus', '蝰蛇状头部，海生', 3, '神经毒素', '重度', '浅海', '南海、东海；印度洋、太平洋', '无危');
INSERT INTO `snake_info` VALUES (200, '内陆太攀蛇', '眼镜蛇科', '太攀蛇属', 'Oxyuranus microlepidotus', '世界陆生毒性最强的蛇，LD50值极低，体色随季节变化', 3, '神经毒素', '重度', '干旱平原、草地', '澳大利亚中部', '无危');
INSERT INTO `snake_info` VALUES (201, '海岸太攀蛇', '眼镜蛇科', '太攀蛇属', 'Oxyuranus scutellatus', '体长2-3米，棕色至深橄榄色，移动速度快', 3, '神经毒素', '重度', '沿海森林、林地', '澳大利亚东北部沿海', '无危');
INSERT INTO `snake_info` VALUES (202, '黑曼巴', '眼镜蛇科', '曼巴蛇属', 'Dendroaspis polylepis', '体色灰褐至橄榄色，移动速度极快可达20km/h，高纯度神经毒素', 3, '神经毒素', '重度', '稀树草原、灌丛、岩石地带', '撒哈拉以南非洲', '无危');
INSERT INTO `snake_info` VALUES (203, '鼓腹毒蛇', '蝰科', '咝蝰属', 'Bitis arietans', '体粗短肥胖，头大三角形，体背具深色人字纹', 3, '血液毒素', '重度', '草原、半荒漠、农田', '撒哈拉以南非洲、阿拉伯半岛南部', '无危');
INSERT INTO `snake_info` VALUES (204, '三色矛头蝮', '蝰科', '矛头蝮属', 'Bothrops asper', '体色棕褐具深色三角形斑纹，美洲最大蛇伤负担物种', 3, '混合毒素', '重度', '热带雨林、农田、村庄附近', '墨西哥至南美洲西北部', '无危');
INSERT INTO `snake_info` VALUES (205, '盈江腹链蛇', '水游蛇科', '东亚腹链蛇属', 'Hebius citrinoventer', '背面深褐色，背鳞起棱，腹面具显著柠檬黄色斑纹', 0, '无毒', '无毒', '中海拔常绿阔叶林溪流边缘', '云南德宏盈江', '未予评估');
INSERT INTO `snake_info` VALUES (206, '棕网腹链蛇', '水游蛇科', '东亚腹链蛇属', 'Hebius johannis', '中等体型，背面具棕色网状斑', 0, '无毒', '无毒', '海拔1200-2750米林区溪流及水稻田', '云南、四川、贵州', '无危');
INSERT INTO `snake_info` VALUES (207, '沃氏腹链蛇', '水游蛇科', '东亚腹链蛇属', 'Hebius vogeli', '形态高度保守的隐存种', 0, '无毒', '无毒', '热带与亚热带丛林阴湿沟谷', '中越边境地区', '无危');
INSERT INTO `snake_info` VALUES (208, '台北腹链蛇', '水游蛇科', '东亚腹链蛇属', 'Hebius atemporalis', '体型细长，背部具暗色纵斑', 0, '无毒', '无毒', '亚热带阔叶林溪流', '广东、香港及周边', '无危');
INSERT INTO `snake_info` VALUES (209, '黑腹腹链蛇', '水游蛇科', '东亚腹链蛇属', 'Hebius boulengeri', '腹面深黑色或覆有大面积致密黑斑', 0, '无毒', '无毒', '热带亚热带林区', '海南、广东、福建', '无危');
INSERT INTO `snake_info` VALUES (210, '海河后棱蛇', '水游蛇科', '后棱蛇属', 'Opisthotropis haihaensis', '单枚前额鳞，第6枚上唇鳞短小', 0, '无毒', '无毒', '亚热带湿润阔叶林山地溪流', '广西钦州、十万大山', '未予评估');
INSERT INTO `snake_info` VALUES (211, '莽山后棱蛇', '水游蛇科', '后棱蛇属', 'Opisthotropis hungtai', '单枚前额鳞，第6枚上唇鳞显著延长', 0, '无毒', '无毒', '密林中的岩石溪流与底栖生境', '广东、广西', '未予评估');
INSERT INTO `snake_info` VALUES (212, '螭吻颈槽蛇', '水游蛇科', '颈槽蛇属', 'Rhabdophis chiwen', '颈部和背部皮下具吸收蟾蜍毒素的颈腺', 3, '混合毒素', '重度', '亚热带山地林区', '四川', '未予评估');
INSERT INTO `snake_info` VALUES (213, '暹罗颈槽蛇', '水游蛇科', '颈槽蛇属', 'Rhabdophis siamensis', '具橘红色颈背斑纹，雌雄两性异形显著', 3, '混合毒素', '重度', '热带亚热带丛林', '东南亚地区', '无危');
INSERT INTO `snake_info` VALUES (214, '墨脱坭蛇', '水游蛇科', '坭蛇属', 'Trachischium monticola', '鳞片极度平滑，适应深层土壤穴居生活', 0, '无毒', '无毒', '热带雨林底层土壤与落叶中', '西藏墨脱', '未予评估');
INSERT INTO `snake_info` VALUES (215, '冈氏坭蛇', '水游蛇科', '坭蛇属', 'Trachischium guentheri', '隐秘穴居特化，极度平滑鳞片与微小体型', 0, '无毒', '无毒', '深层土壤与落叶生境', '西藏聂拉木', '未予评估');
INSERT INTO `snake_info` VALUES (216, '云南环游蛇', '水游蛇科', '环游蛇属', 'Trimerodytes yunnanensis', '侧面与尾部具典型的X形斑纹', 0, '无毒', '无毒', '海拔400米以上山地水系及灌木丛水塘', '云南', '未予评估');
INSERT INTO `snake_info` VALUES (217, '新斑白环蛇', '游蛇科', '白环蛇属', 'Lycodon neomaculatus', '具黑白或黑黄相间环纹，展现典型贝氏拟态', 0, '无毒', '无毒', '陆栖夜行环境', '华南边境及中南半岛', '未予评估');
INSERT INTO `snake_info` VALUES (218, '张氏寡头蛇', '游蛇科', '寡头蛇属', 'Oligodon zhangfujii', '背鳞17-17-15排列，仅有8枚刃状特化上颌齿', 0, '无毒', '无毒', '高海拔山地森林', '西藏墨脱背崩乡', '未予评估');
INSERT INTO `snake_info` VALUES (219, '汉普顿寡头蛇', '游蛇科', '寡头蛇属', 'Oligodon hamptoni', '短小头颅内具粗大侧扁如刀刃状的后上颌齿', 0, '无毒', '无毒', '海拔1115米常绿阔叶林和禾本科灌丛', '云南腾冲高黎贡山', '未予评估');

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类与相应血清类型的匹配关系及相关信息' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of snake_serum_match
-- ----------------------------
INSERT INTO `snake_serum_match` VALUES (1, 1, '抗银环蛇毒血清', '{\"effectiveness\":\"95%\",\"version\":\"2024\"}');
INSERT INTO `snake_serum_match` VALUES (2, 2, '抗眼镜蛇毒血清', '{\"effectiveness\":\"90%\",\"version\":\"2024\"}');
INSERT INTO `snake_serum_match` VALUES (3, 3, '抗眼镜王蛇毒血清', '{\"effectiveness\":\"85%\",\"version\":\"2024\"}');
INSERT INTO `snake_serum_match` VALUES (4, 4, '抗五步蛇毒血清', '{\"effectiveness\":\"92%\",\"version\":\"2024\"}');
INSERT INTO `snake_serum_match` VALUES (5, 5, '抗竹叶青毒血清', '{\"effectiveness\":\"88%\",\"version\":\"2024\"}');
INSERT INTO `snake_serum_match` VALUES (6, 6, '抗蝮蛇毒血清', '{\"effectiveness\":\"90%\",\"version\":\"2024\"}');
INSERT INTO `snake_serum_match` VALUES (11, 11, '抗太攀蛇毒血清', '{\"effectiveness\":\"80%\",\"version\":\"2024\"}');
INSERT INTO `snake_serum_match` VALUES (13, 13, '抗蝰蛇毒血清', '{\"effectiveness\":\"87%\",\"version\":\"2024\"}');

-- ----------------------------
-- Table structure for user_action_log
-- ----------------------------
DROP TABLE IF EXISTS `user_action_log`;
CREATE TABLE `user_action_log`  (
  `log_id` bigint NOT NULL AUTO_INCREMENT COMMENT '行为记录唯一标识，自增长',
  `user_id` bigint NOT NULL COMMENT '关联用户表的 user_id，标识行为所属用户',
  `action_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '行为类型，如\"LOGIN\", \"VIEW_SNAKE\", \"RECOGNIZE\"等',
  `action_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '行为发生时间',
  `action_detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '行为详细描述',
  `action_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL COMMENT '行为相关元数据，JSON 格式',
  PRIMARY KEY (`log_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  INDEX `action_time`(`action_time` DESC) USING BTREE COMMENT '按时间查询优化'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '记录用户在系统内的各项操作行为' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_action_log
-- ----------------------------

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
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储用户基本信息' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (1, 'admin', 'admin123', 'admin@sling.com', NULL, NULL, NULL, NULL, '13800138000', '2026-04-13 18:23:11', '2026-05-18 20:14:01', '{\"role\":\"系统管理员\"}', NULL);
INSERT INTO `user_info` VALUES (2, 'moderator1', 'mod123', 'mod1@sling.com', NULL, NULL, NULL, NULL, '13800138001', '2026-04-13 18:23:11', '2026-04-13 18:23:11', '{\"role\":\"内容管理员\"}', NULL);
INSERT INTO `user_info` VALUES (3, 'user1', 'user123', 'user1@example.com', NULL, NULL, NULL, NULL, '15685593321', '2026-04-13 18:23:11', '2026-04-13 18:23:11', '{\"role\":\"普通用户\"}', NULL);
INSERT INTO `user_info` VALUES (4, 'user2', 'user123', 'user2@example.com', NULL, NULL, NULL, NULL, '15685593322', '2026-04-13 18:23:11', '2026-04-13 18:23:11', '{\"role\":\"普通用户\"}', NULL);
INSERT INTO `user_info` VALUES (5, 'vip_user', 'vip123', 'vip@example.com', NULL, NULL, NULL, NULL, '15685593323', '2026-04-13 18:23:11', '2026-04-13 18:23:11', '{\"role\":\"VIP 用户\"}', NULL);
INSERT INTO `user_info` VALUES (6, 'wechat_user1', 'wx123', NULL, 'wx_openid_001', 'wx_unionid_001', '微信用户 1', 'https://example.com/avatar1.jpg', NULL, '2026-04-13 18:23:11', '2026-04-13 18:23:11', '{\"login_type\":\"wechat\"}', NULL);
INSERT INTO `user_info` VALUES (10, 'test001', '123456', 'test001@sl.com', NULL, NULL, NULL, NULL, '13800000001', '2026-04-13 18:26:38', '2026-04-13 18:28:44', '{\nrole:????}', NULL);
INSERT INTO `user_info` VALUES (11, 'test002', '123456', 'test002@sl.com', NULL, NULL, NULL, NULL, '13800000002', '2026-04-13 18:26:38', '2026-04-13 18:26:38', '{\role:????}', NULL);
INSERT INTO `user_info` VALUES (12, 'test003', '123456', 'test003@sl.com', NULL, NULL, NULL, NULL, '13800000003', '2026-04-13 18:26:38', '2026-04-13 18:26:38', '{\role:????}', NULL);
INSERT INTO `user_info` VALUES (13, 'superadmin', 'admin123', 'admin@sl.com', NULL, NULL, NULL, NULL, '13900000000', '2026-04-13 18:26:38', '2026-04-13 18:26:38', '{\role:?????}', NULL);
INSERT INTO `user_info` VALUES (14, '1111', '123456', '', NULL, NULL, NULL, NULL, '', '2026-05-07 14:12:30', '2026-05-18 14:19:41', NULL, NULL);
INSERT INTO `user_info` VALUES (15, 'sos', 'sos123', NULL, NULL, NULL, NULL, NULL, NULL, '2026-05-18 20:27:23', '2026-05-18 20:32:36', NULL, NULL);

-- ----------------------------
-- Table structure for user_permission
-- ----------------------------
DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission`  (
  `permission_id` bigint NOT NULL AUTO_INCREMENT COMMENT '权限唯一标识，自增长',
  `user_id` bigint NOT NULL COMMENT '关联用户表的 user_id，表明该权限所属用户',
  `permission_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '权限名称，如\"查看蛇类详细信息\"',
  `permission_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '权限描述',
  PRIMARY KEY (`permission_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE,
  CONSTRAINT `fk_permission_user` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '记录用户所拥有的各项操作权限' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_permission
-- ----------------------------
INSERT INTO `user_permission` VALUES (1, 1, 'ALL_PERMISSIONS', '管理员拥有所有权限');
INSERT INTO `user_permission` VALUES (2, 2, 'CONTENT_MANAGE', '内容管理权限');
INSERT INTO `user_permission` VALUES (3, 3, 'BASIC_ACCESS', '基本访问权限');
INSERT INTO `user_permission` VALUES (4, 5, 'VIP_ACCESS', 'VIP 特殊权限');

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
  CONSTRAINT `fk_user_role_role` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user_role_user` FOREIGN KEY (`user_id`) REFERENCES `user_info` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储用户和角色的关联关系' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES (1, 1, 1, '2026-04-13 18:23:11');
INSERT INTO `user_role` VALUES (2, 2, 2, '2026-04-13 18:23:11');
INSERT INTO `user_role` VALUES (3, 3, 3, '2026-04-13 18:23:11');
INSERT INTO `user_role` VALUES (4, 4, 3, '2026-04-13 18:23:11');
INSERT INTO `user_role` VALUES (5, 5, 4, '2026-04-13 18:23:11');
INSERT INTO `user_role` VALUES (6, 6, 3, '2026-04-13 18:23:11');
INSERT INTO `user_role` VALUES (10, 13, 1, '2026-04-13 18:27:01');
INSERT INTO `user_role` VALUES (11, 10, 3, '2026-04-13 18:27:01');
INSERT INTO `user_role` VALUES (12, 11, 3, '2026-04-13 18:27:01');
INSERT INTO `user_role` VALUES (13, 12, 3, '2026-04-13 18:27:01');
INSERT INTO `user_role` VALUES (14, 15, 5, '2026-05-18 20:27:23');

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
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储蛇类活动预警区域信息' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of warning_area
-- ----------------------------
INSERT INTO `warning_area` VALUES (1, '凤凰山森林公园', '遵义市红花岗区凤凰山', '{\"type\":\"Polygon\",\"coordinates\":[[[107.01,27.68],[107.02,27.68],[107.02,27.69],[107.01,27.69],[107.01,27.68]]]}', '[{\"name\": \"银环蛇\", \"snake_id\": 1}, {\"name\": \"眼镜蛇\", \"snake_id\": 2}, {\"name\": \"竹叶青\", \"snake_id\": 5}]', 3, '2026-04-13 18:23:12');
INSERT INTO `warning_area` VALUES (2, '湘江河沿岸', '遵义市湘江河两岸绿化带', '{\"type\":\"Polygon\",\"coordinates\":[[[107.03,27.70],[107.04,27.70],[107.04,27.71],[107.03,27.71],[107.03,27.70]]]}', '[{\"name\": \"蝮蛇\", \"snake_id\": 6}, {\"name\": \"乌梢蛇\", \"snake_id\": 7}, {\"name\": \"赤链蛇\", \"snake_id\": 12}]', 2, '2026-04-13 18:23:12');
INSERT INTO `warning_area` VALUES (3, '新蒲湿地公园', '遵义市新蒲新区湿地公园', '{\"type\":\"Polygon\",\"coordinates\":[[[107.04,27.69],[107.05,27.69],[107.05,27.70],[107.04,27.70],[107.04,27.69]]]}', '[{\"name\": \"竹叶青\", \"snake_id\": 5}, {\"name\": \"王锦蛇\", \"snake_id\": 8}]', 2, '2026-04-13 18:23:12');
INSERT INTO `warning_area` VALUES (4, '大娄山自然保护区', '遵义市汇川区大娄山', '{\"type\":\"Polygon\",\"coordinates\":[[[107.00,27.75],[107.10,27.75],[107.10,27.80],[107.00,27.80],[107.00,27.75]]]}', '[{\"name\": \"银环蛇\", \"snake_id\": 1}, {\"name\": \"眼镜王蛇\", \"snake_id\": 3}, {\"name\": \"五步蛇\", \"snake_id\": 4}]', 4, '2026-04-13 18:23:12');

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储历史预警记录' ROW_FORMAT = DYNAMIC;

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
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci COMMENT = '存储预警规则配置' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of warning_rule
-- ----------------------------
INSERT INTO `warning_rule` VALUES (1, 1, 3, '【高风险预警】{area_name} 发现{count}条银环蛇活动，请避免前往！', '{\"priority\":\"high\",\"notify_methods\":[\"app\",\"sms\"]}');
INSERT INTO `warning_rule` VALUES (2, 2, 2, '【高风险预警】{area_name} 发现{count}条眼镜蛇，请注意安全！', '{\"priority\":\"high\",\"notify_methods\":[\"app\"]}');
INSERT INTO `warning_rule` VALUES (3, 3, 1, '【极高风险预警】{area_name} 发现眼镜王蛇，请立即远离并报警！', '{\"priority\":\"critical\",\"notify_methods\":[\"app\",\"sms\",\"police\"]}');
INSERT INTO `warning_rule` VALUES (4, 4, 2, '【高风险预警】{area_name} 发现五步蛇活动，请勿靠近！', '{\"priority\":\"high\",\"notify_methods\":[\"app\"]}');
INSERT INTO `warning_rule` VALUES (5, 5, 5, '【中风险预警】{area_name} 发现多条竹叶青，请注意防范！', '{\"priority\":\"medium\",\"notify_methods\":[\"app\"]}');

-- ----------------------------
-- Table structure for admin_users
-- ----------------------------
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

-- ----------------------------
-- Records of admin_users
-- ----------------------------
INSERT INTO `admin_users` VALUES (1, 'admin', 'admin123', 'admin@sling.com', '13800000000', '系统管理员', NULL, '技术部', '管理员', 1, NOW(), '127.0.0.1', 0, NULL, NOW(), NOW(), 0);

-- ----------------------------
-- Table structure for admin_roles
-- ----------------------------
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

-- ----------------------------
-- Table structure for admin_user_roles
-- ----------------------------
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

-- ----------------------------
-- Table structure for admin_operation_log
-- ----------------------------
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

-- ----------------------------
-- Table structure for emergency_help
-- ----------------------------
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

SET FOREIGN_KEY_CHECKS = 1;
