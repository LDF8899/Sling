/*
 Navicat Premium Dump SQL

 Source Server         : boot_movie
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : sling

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 12/01/2026 14:07:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for emergency_qa_cache
-- ----------------------------
DROP TABLE IF EXISTS `emergency_qa_cache`;
CREATE TABLE `emergency_qa_cache`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `question` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of emergency_qa_cache
-- ----------------------------
INSERT INTO `emergency_qa_cache` VALUES (1, 'test question', 'test answer', '2026-01-07 11:46:19', '2026-01-07 11:46:19');
INSERT INTO `emergency_qa_cache` VALUES (2, '\"被菜花蛇咬了怎么办\"', '被菜花蛇咬伤后的应急处理，需结合其**无毒蛇**的特性（菜花蛇通常指黑眉锦蛇、王锦蛇，均为无毒蛇），重点关注**伤口清洁消毒+预防感染**，具体步骤如下：\n\n\n### **一、立即采取的基础处理**  \n#### 1. 保持冷静，脱离风险  \n- 确认蛇已远离，避免二次咬伤；  \n- 不要剧烈奔跑或活动（若误判为有毒蛇，剧烈运动可能加速毒液扩散，但菜花蛇无毒，此步骤主要为避免伤口牵拉加重损伤）。  \n\n#### 2. 彻底清洗伤口  \n- 用**流动清水或肥皂水**冲洗伤口至少15分钟，去除蛇口腔残留的细菌、污垢；  \n- 若没有清水，可用干净的矿泉水、生理盐水替代。  \n\n#### 3. 消毒伤口  \n- 用**碘伏或医用酒精**消毒伤口周围皮肤（注意：不要直接涂在伤口内部，以免刺激组织）；  \n- 若没有消毒用品，可继续用清水冲洗，尽快前往医院处理。  \n\n#### 4. 止血与保护伤口  \n- 若伤口轻微出血，用干净纱布/棉签轻轻按压止血（不要用力挤压伤口，避免组织损伤）；  \n- 不要包扎过紧（以免影响血液循环），保持伤口透气。  \n\n\n### **二、需要就医的情况**  \n即使菜花蛇无毒，以下情况仍需及时去医院：  \n1. **伤口较深**：可能需要缝合或打破伤风疫苗（尤其是生锈物品划伤过的蛇牙，或伤口有异物残留）；  \n2. **感染迹象**：伤口红肿、疼痛加剧、发热、流脓、周围皮肤发紫等；  \n3. **过敏反应**：少数人可能对蛇口腔分泌物过敏，出现皮疹、瘙痒、呼吸困难等症状；  \n4. **不确定蛇种**：若无法100%确认是菜花蛇（如误认有毒蛇），需按有毒蛇咬伤初步处理后立即就医（如：保持静止，减少活动，尽快到医院告知医生蛇的特征）。  \n\n\n### **三、绝对禁止的行为**  \n- ❌ 用嘴吸伤口：口腔细菌会加重感染，且若误为有毒蛇，施救者可能中毒；  \n- ❌ 用土、草药、牙膏等敷伤口：易导致感染或延误治疗；  \n- ❌ 剧烈挤压伤口：可能破坏组织，增加感染风险；  \n- ❌ 自行挑破水泡或伤口：易引发二次感染。  \n\n\n### **四、菜花蛇与有毒蛇的简易区分（辅助判断）**  \n- **菜花蛇特征**：头部多为椭圆形（非三角形），身体花纹呈黄色/菜花状斑块，尾巴细长，行动敏捷；  \n- **有毒蛇特征**：头部多为三角形（部分无毒蛇也可能呈三角形，需谨慎），尾巴短粗，花纹鲜艳（如五步蛇、竹叶青），但最稳妥的方式是**不确定就就医**。  \n\n\n### **总结**  \n菜花蛇咬伤本身无生命危险，但需重视**伤口清洁与感染预防**。若出现感染或不确定蛇种，及时就医是最安全的选择。记住：无毒蛇咬伤的核心是“防感染”，有毒蛇咬伤的核心是“防毒液扩散+及时抗毒”。', '2026-01-07 11:49:17', '2026-01-07 11:49:17');

-- ----------------------------
-- Table structure for hospital_info
-- ----------------------------
DROP TABLE IF EXISTS `hospital_info`;
CREATE TABLE `hospital_info`  (
  `hospital_id` bigint NOT NULL AUTO_INCREMENT,
  `hospital_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10, 6) NULL DEFAULT NULL,
  `longitude` decimal(10, 6) NULL DEFAULT NULL,
  `contact_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `hospital_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `emergency_department` tinyint(1) NULL DEFAULT 1,
  `created_time` datetime NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `del_flag` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`hospital_id`) USING BTREE,
  INDEX `idx_location`(`latitude` ASC, `longitude` ASC) USING BTREE,
  INDEX `idx_type`(`hospital_type` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of hospital_info
-- ----------------------------
INSERT INTO `hospital_info` VALUES (20, '遵义医科大学第二附属医院', '新龙大道西150米', 27.694486, 107.043478, '0851-27596113;0851-27596114', '综合医院', 1, '2025-12-31 08:52:08', '2025-12-31 08:52:08', 0);
INSERT INTO `hospital_info` VALUES (21, '遵义新蒲永康中医院', '长征大道与娄山路交叉口西140米', 27.705478, 107.036984, '18685202139', '中医院', 1, '2025-12-31 08:52:08', '2025-12-31 08:52:08', 0);
INSERT INTO `hospital_info` VALUES (22, '遵义新蒲康兴医院', '播州大道与奥体路交汇处天鹅湖康郡1-2号楼', 27.724318, 107.039192, '0851-28766120', '综合医院', 1, '2025-12-31 08:52:08', '2025-12-31 08:52:08', 0);
INSERT INTO `hospital_info` VALUES (23, '新蒲瑞德医院', '林达阳光新城2号楼2-3号', 27.706456, 107.032616, '0851-28657120', '综合医院', 1, '2025-12-31 08:52:08', '2025-12-31 08:52:08', 0);
INSERT INTO `hospital_info` VALUES (24, '新蒲镇卫生院接种点', '新蒲镇明星路19号', 27.711373, 107.030373, '', '社区医院', 1, '2025-12-31 08:52:08', '2025-12-31 08:52:08', 0);

-- ----------------------------
-- Table structure for recognition_record
-- ----------------------------
DROP TABLE IF EXISTS `recognition_record`;
CREATE TABLE `recognition_record`  (
  `record_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `snake_id` bigint NULL DEFAULT NULL,
  `image_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `recognition_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `recognition_result` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `recognition_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`record_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of recognition_record
-- ----------------------------

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `role_id` bigint NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`) USING BTREE,
  UNIQUE INDEX `role_name`(`role_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------

-- ----------------------------
-- Table structure for serum_inventory
-- ----------------------------
DROP TABLE IF EXISTS `serum_inventory`;
CREATE TABLE `serum_inventory`  (
  `inventory_id` bigint NOT NULL AUTO_INCREMENT,
  `hospital_id` bigint NOT NULL,
  `snake_id` bigint NOT NULL,
  `serum_amount` int NOT NULL,
  `serum_expiry_date` date NULL DEFAULT NULL,
  `inventory_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`inventory_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of serum_inventory
-- ----------------------------

-- ----------------------------
-- Table structure for snake_active_area
-- ----------------------------
DROP TABLE IF EXISTS `snake_active_area`;
CREATE TABLE `snake_active_area`  (
  `area_id` bigint NOT NULL AUTO_INCREMENT,
  `area_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10, 6) NULL DEFAULT NULL,
  `longitude` decimal(10, 6) NULL DEFAULT NULL,
  `radius` int NULL DEFAULT NULL,
  `snake_id` bigint NOT NULL,
  `active_count` int NULL DEFAULT 0,
  `area_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`area_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of snake_active_area
-- ----------------------------

-- ----------------------------
-- Table structure for snake_emergency_info
-- ----------------------------
DROP TABLE IF EXISTS `snake_emergency_info`;
CREATE TABLE `snake_emergency_info`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `snake_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `snake_alias` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `venom_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `symptom_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `emergency_treatment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `medical_attention` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `image_url` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `del_flag` tinyint UNSIGNED NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `snake_name`(`snake_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of snake_emergency_info
-- ----------------------------
INSERT INTO `snake_emergency_info` VALUES (28, '银环蛇', NULL, NULL, '通过AI生成的关于\'银环蛇\'的信息:\n以下是关于银环蛇的结构化详细介绍，涵盖核心信息便于识别与理解：\n\n\n### **一、基本信息**  \n- **学名**：*Bungarus multicinctus*  \n- **分类地位**：  \n  动物界 → 脊索动物门 → 爬行纲 → 有鳞目 → 眼镜蛇科 → 环蛇属 → 银环蛇种  \n\n\n### **二、形态特征（识别要点）**  \n银环蛇是典型的剧毒蛇，外观具有高度辨识度：  \n1. **体色环纹**：身体布满黑白相间的环纹，**白环窄（约1-2鳞片宽）、黑环宽（约3-5鳞片宽）**，环纹贯穿全身（包括腹部）；尾部环纹更密集，尾部短而钝圆（区别于无毒的白环蛇，后者尾部细长、白环更宽）。  \n2. **头部与体型**：头部椭圆形，与颈部界限不明显；成体体长约1-1.5米，最长可达1.8米；背鳞平滑无棱，背鳞行数为15行（中段）。  \n3. **瞳孔**：圆形（区别于蝮蛇类的竖瞳）。  \n\n\n### **三、分布范围**  \n- **中国境内**：主要分布于南方湿润区域，包括云南、广西、广东、福建、台湾、江西、湖南、湖北、浙江、安徽、贵州等省份。  \n- **境外**：东南亚的缅甸、越南、老挝、泰国、柬埔寨等国家。  \n\n\n### **四、生活习性**  \n1. **栖息地**：偏好潮湿环境，常见于平原、丘陵、山地的溪沟边、稻田、鱼塘、草丛、竹林或住宅附近的阴暗角落。  \n2. **活动规律**：**夜行性**（夜晚20:00-24:00活动最频繁），白天多隐藏于石缝、泥土下或草丛中。  \n3. **食性**：肉食性，主要捕食鱼类（鳝鱼、泥鳅）、蛙类、蜥蜴、鼠类，尤其喜食其他蛇类（包括无毒蛇和小型毒蛇）。  \n4. **行为特点**：性情温和，通常不主动攻击人类；但若被踩踏、抓捕或惊扰，会迅速反击（攻击方式为“咬后即松”，但毒性极强）。  \n5. **繁殖**：卵生，每年3-5月交配，6-8月产卵（每窝5-15枚），孵化期约45-60天，幼蛇孵化后即可独立生活。  \n\n\n### **五、毒性与安全提示**  \n- **毒性强度**：中国毒性最强的毒蛇之一，毒液为**神经毒素**，LD₅₀（半数致死量）约0.08mg/kg（皮下注射），仅需少量毒液即可致命。  \n- **中毒症状**：被咬后初期症状轻微（局部麻木、疼痛不明显），易被忽视；1-4小时后出现神经麻痹（眼睑下垂、吞咽困难、呼吸困难），严重时呼吸衰竭死亡。  \n- **急救建议**：立即远离蛇体，保持冷静（减少毒素扩散），用绷带轻轻绑扎伤口近心端（避免过紧），尽快就医并注射**抗银环蛇毒血清**（唯一有效治疗手段）。  \n\n\n### **六、保护现状**  \n- 中国**“三有”保护动物**（《国家保护的有益的或者有重要经济、科学研究价值的陆生野生动物名录》）；  \n- 禁止非法捕捉、杀害、买卖或食用，违者将承担法律责任。  \n\n\n### **关键识别误区**  \n需与无毒的**白环蛇**（如黑背白环蛇）区分：  \n- 银环蛇：白环窄、黑环宽，尾部短钝，头部椭圆，夜行性；  \n- 白环蛇：白环宽、黑环窄，尾部细长，头部较尖，多昼行。  \n\n若在野外遇到黑白环纹蛇类，应保持距离，避免接触。\n\n\n以上信息覆盖银环蛇的核心属性，有助于快速识别与安全应对。', NULL, NULL, '银环蛇_1.jpg', '2025-12-26 15:36:38', '2025-12-26 15:36:54', 0);
INSERT INTO `snake_emergency_info` VALUES (29, '玉米蛇', NULL, NULL, '通过AI生成的关于\'玉米蛇\'的信息:\n以下是关于玉米蛇的结构化详细介绍，涵盖核心信息及识别要点：\n\n\n### **一、基本信息**  \n- **学名**：*Pantherophis guttatus*（原属*Elaphe*属，后分类调整至豹斑蛇属*Pantherophis*）  \n- **分类地位**：  \n  动物界 → 脊索动物门 → 爬行纲 → 有鳞目 → 游蛇科 → 豹斑蛇属 → 玉米蛇种  \n- **俗称**：玉米锦蛇、红鼠蛇（因捕食老鼠及体色特征得名）  \n\n\n### **二、形态特征（识别核心）**  \n1. **体型**：中型蛇类，成体体长1.2-1.8米，少数个体可达2米；身体细长，比例匀称。  \n2. **颜色与花纹**：  \n   - 野生型：背部以橙色/棕色为底色，布有红色/棕色的“鞍状斑纹”（边缘黑色）；腹部为黑白相间的方格纹（类似玉米芯图案，是命名关键）。  \n   - 人工变异种：经选育出现白化、焦糖、暴风雪、薰衣草等数十种颜色/花纹变异（如全白无纹、粉色带纹等），是宠物市场热门品种。  \n3. **鳞片与瞳孔**：  \n   - 鳞片光滑无棱，触感细腻；  \n   - 瞳孔圆形（有毒蛇多为竖瞳，此为无毒蛇的典型特征）。  \n4. **其他**：头部略呈三角形（但非剧毒蛇的典型“三角头”），颈部可区分，尾部逐渐变细。\n\n\n### **三、分布与栖息地**  \n- **原生分布**：北美洲东南部，包括美国（佛罗里达、乔治亚、卡罗来纳州等）、墨西哥东北部。  \n- **栖息地**：  \n  偏好温暖湿润环境，常见于森林边缘、农田、草地、沼泽附近，也常靠近人类居住区（如谷仓、仓库，因啮齿类丰富）；多栖息于地下洞穴、岩石缝隙、落叶堆或树洞中。\n\n\n### **四、生活习性**  \n1. **食性**：  \n   - 肉食性，主食啮齿类（老鼠、田鼠），次食鸟类、鸟蛋、蜥蜴、蛙类；  \n   - 捕猎方式：缠绕窒息（绞杀）猎物（无毒蛇的典型捕猎手段）。  \n2. **活动规律**：  \n   - 黄昏/夜间活动为主（夜行性），白天躲于隐蔽处避暑；  \n   - 变温动物：适宜活动温度25-30℃，冬季（10℃以下）进入冬眠（持续2-3个月）。  \n3. **行为特点**：  \n   - 性情温顺，极少主动攻击人类；遇威胁时会逃跑，或发出嘶嘶声、蜷缩身体，但通常不咬人（除非被强行抓握）；  \n   - 擅长攀爬（可上树捕食鸟蛋）和掘穴（利用前鳞挖掘土壤）。  \n4. **繁殖**：  \n   - 卵生，繁殖季为春季（3-5月）；  \n   - 雌蛇每窝产卵10-30枚（孵化期60-90天，温度越高孵化越快）；  \n   - 幼蛇孵化后独立生活，体长约30厘米，以小老鼠、昆虫幼虫为食。\n\n\n### **五、与人类的关系**  \n1. **毒性**：完全无毒，对人类无威胁。  \n2. **生态价值**：控制啮齿类种群数量（如老鼠），减少农作物损害及疾病传播。  \n3. **宠物价值**：  \n   - 全球最受欢迎的宠物蛇之一（因颜色多样、性格温顺、饲养简单）；  \n   - 人工繁殖技术成熟，宠物市场的个体几乎均为人工培育，不影响野生种群。  \n4. **保护现状**：野生种群因栖息地破坏略有下降，但未列入濒危物种（IUCN红色名录：无危）。\n\n\n### **识别要点总结**  \n- **关键特征**：腹部黑白方格纹、圆形瞳孔、光滑鳞片、温顺性情；  \n- **区分误区**：与赤链蛇（国内常见）外形相似，但玉米蛇腹部方格纹更明显，且原产于北美（国内宠物市场可见人工个体）。  \n\n以上信息可帮助快速识别玉米蛇，并了解其生态与饲养价值。\n\n\n**注意**：若在野外遇到类似蛇类，请勿随意捕捉，应优先观察其特征（尤其是瞳孔和腹部花纹），确认无毒后保持距离即可。人工饲养需', NULL, NULL, '玉米蛇_1.jpg', '2026-01-07 09:34:23', '2026-01-07 09:34:42', 0);
INSERT INTO `snake_emergency_info` VALUES (30, '太攀蛇', NULL, NULL, '通过AI生成的关于\'太攀蛇\'的信息:\n### 太攀蛇（Taipan）详细介绍  \n太攀蛇是澳大利亚及新几内亚地区特有的剧毒蛇类，属于眼镜蛇科太攀蛇属（**Oxyuranus**），包含3个已确认物种：内陆太攀蛇、海岸太攀蛇、中陆太攀蛇。以下以结构化方式展开：\n\n\n#### **一、学名与分类**  \n| 分类层级 | 名称 |  \n|----------|------|  \n| 界       | 动物界（Animalia） |  \n| 门       | 脊索动物门（Chordata） |  \n| 纲       | 爬行纲（Reptilia） |  \n| 目       | 有鳞目（Squamata） |  \n| 科       | 眼镜蛇科（Elapidae） |  \n| 属       | 太攀蛇属（**Oxyuranus**） |  \n| 物种     | 1. 内陆太攀蛇（**Oxyuranus microlepidotus**）<br>2. 海岸太攀蛇（**Oxyuranus scutellatus**）<br>3. 中陆太攀蛇（**Oxyuranus temporalis**，2007年发现） |  \n\n\n#### **二、形态特征**  \n太攀蛇体型修长，鳞片光滑，不同物种形态差异显著：  \n\n| 物种         | 体型               | 颜色特征                     | 鳞片特点               |  \n|--------------|--------------------|------------------------------|------------------------|  \n| **内陆太攀蛇** | 1.8-2.5米（最长3米） | 淡褐色→橄榄绿，腹部乳白/淡黄色 | 鳞片细小（命名“microlepidotus”意为“细鳞”） |  \n| **海岸太攀蛇** | 2-3米（最长3.3米）   | 棕色→深橄榄色，腹部黄白色     | 鳞片较大，颈部可扩张成扁平状 |  \n| **中陆太攀蛇** | 1.5-2米            | 浅棕色→灰色，头部有深色条纹   | 介于前两者之间         |  \n\n\n#### **三、毒性特征**  \n太攀蛇是世界上毒性最强的陆生蛇类之一，毒液以**神经毒素**为主，辅以肌毒素和凝血毒素：  \n\n- **内陆太攀蛇**：  \n  - LD₅₀（腹腔注射）：0.025 mg/kg（全球陆生蛇类最低，毒性是眼镜王蛇的50倍）；  \n  - 一次排毒量：110-400 mg（足以杀死100-200名成年人）；  \n  - 症状：快速出现神经麻痹、呼吸衰竭、肌肉坏死，若不及时治疗，1小时内可致死。  \n\n- **海岸太攀蛇**：  \n  - LD₅₀：0.09 mg/kg（毒性略低于内陆种，但仍属顶级剧毒）；  \n  - 一次排毒量：100-300 mg，症状类似内陆种，但局部组织损伤更明显。  \n\n- **中陆太攀蛇**：毒性接近内陆太攀蛇，数据较少。  \n\n\n#### **四、分布区域**  \n| 物种         | 分布范围                     |  \n|--------------|------------------------------|  \n| 内陆太攀蛇   | 澳大利亚中部干旱区（昆士兰西部、新南威尔士西部、南澳北部） |  \n| 海岸太攀蛇   | 澳大利亚东北部沿海（昆士兰、北领地北部）+ 新几内亚南部 |  \n| 中陆太攀蛇   | 澳大利亚昆士兰西北部（仅限一小块区域） |  \n\n\n#### **五、生活习性**  \n##### **1. 栖息地**  \n- 内陆太攀蛇：干旱草原', NULL, NULL, '太攀蛇_1.jpg', '2026-01-07 11:51:52', '2026-01-07 11:52:01', 0);

-- ----------------------------
-- Table structure for snake_info
-- ----------------------------
DROP TABLE IF EXISTS `snake_info`;
CREATE TABLE `snake_info`  (
  `snake_id` bigint NOT NULL AUTO_INCREMENT,
  `snake_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `characteristics` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `toxicity_level` int NOT NULL,
  `habitat_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `conservation_status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`snake_id`) USING BTREE,
  UNIQUE INDEX `idx_snake_name`(`snake_name` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of snake_info
-- ----------------------------

-- ----------------------------
-- Table structure for snake_serum_match
-- ----------------------------
DROP TABLE IF EXISTS `snake_serum_match`;
CREATE TABLE `snake_serum_match`  (
  `match_id` bigint NOT NULL AUTO_INCREMENT,
  `snake_id` bigint NOT NULL,
  `serum_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `match_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`match_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of snake_serum_match
-- ----------------------------

-- ----------------------------
-- Table structure for user_action_log
-- ----------------------------
DROP TABLE IF EXISTS `user_action_log`;
CREATE TABLE `user_action_log`  (
  `log_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `action_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `action_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `action_detail` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `action_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`log_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_action_log
-- ----------------------------

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info`  (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_login_time` timestamp NULL DEFAULT NULL,
  `extra_info` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '用户头像URL地址',
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_info
-- ----------------------------
INSERT INTO `user_info` VALUES (7, 'user1', '888', '1957045865@qq.com', '15685593321', '2025-12-26 15:30:15', '2026-01-08 16:30:17', NULL, '/uploads/avatar/avatar_7_1767858680901.jpg');

-- ----------------------------
-- Table structure for user_permission
-- ----------------------------
DROP TABLE IF EXISTS `user_permission`;
CREATE TABLE `user_permission`  (
  `permission_id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `permission_description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`permission_id`) USING BTREE,
  INDEX `user_id`(`user_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_permission
-- ----------------------------

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `role_id` bigint NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `uk_user_role`(`user_id` ASC, `role_id` ASC) USING BTREE,
  INDEX `role_id`(`role_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user_role
-- ----------------------------

-- ----------------------------
-- Table structure for warning_area
-- ----------------------------
DROP TABLE IF EXISTS `warning_area`;
CREATE TABLE `warning_area`  (
  `area_id` bigint NOT NULL AUTO_INCREMENT,
  `area_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `boundary_coordinates` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `snake_species` json NULL,
  `warning_level` int NULL DEFAULT 1,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`area_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of warning_area
-- ----------------------------

-- ----------------------------
-- Table structure for warning_record
-- ----------------------------
DROP TABLE IF EXISTS `warning_record`;
CREATE TABLE `warning_record`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `area_id` bigint NOT NULL,
  `warning_content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `warning_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` int NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `area_id`(`area_id` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of warning_record
-- ----------------------------

-- ----------------------------
-- Table structure for warning_rule
-- ----------------------------
DROP TABLE IF EXISTS `warning_rule`;
CREATE TABLE `warning_rule`  (
  `rule_id` bigint NOT NULL AUTO_INCREMENT,
  `snake_id` bigint NOT NULL,
  `active_threshold` int NOT NULL,
  `warning_message` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `rule_metadata` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  PRIMARY KEY (`rule_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of warning_rule
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
