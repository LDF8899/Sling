/*
 * SLING 项目 - 蛇类物种数据初始化脚本
 * 数据来源：《全球及中国蛇类系统分类、地域分布与毒理学综合研究报告》
 * 生成日期：2026-05-11
 * 说明：包含中国分布的19科蛇类物种数据及报告中提及的全球代表性毒蛇
 *
 * 毒性等级映射：
 *   0 = 无毒
 *   1 = 轻度（微毒，局部反应）
 *   2 = 中度（系统性症状，致死率较低）
 *   3 = 重度（高度致命风险）
 */

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

USE `sl`;

-- =============================================
-- 1. 清除现有蛇类数据
-- =============================================
DELETE FROM `snake_info`;

-- =============================================
-- 2. 扩展 snake_info 表结构（如尚未存在）
-- =============================================
-- 添加科名字段
SET @col_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'sl' AND TABLE_NAME = 'snake_info' AND COLUMN_NAME = 'family');
SET @sql = IF(@col_exists = 0,
    'ALTER TABLE `snake_info` ADD COLUMN `family` varchar(100) DEFAULT NULL COMMENT ''科名'' AFTER `snake_name`',
    'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 添加属名字段
SET @col_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'sl' AND TABLE_NAME = 'snake_info' AND COLUMN_NAME = 'genus');
SET @sql = IF(@col_exists = 0,
    'ALTER TABLE `snake_info` ADD COLUMN `genus` varchar(100) DEFAULT NULL COMMENT ''属名'' AFTER `family`',
    'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 添加拉丁学名字段
SET @col_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'sl' AND TABLE_NAME = 'snake_info' AND COLUMN_NAME = 'latin_name');
SET @sql = IF(@col_exists = 0,
    'ALTER TABLE `snake_info` ADD COLUMN `latin_name` varchar(200) DEFAULT NULL COMMENT ''拉丁学名'' AFTER `genus`',
    'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 添加毒素类型字段
SET @col_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'sl' AND TABLE_NAME = 'snake_info' AND COLUMN_NAME = 'toxin_type');
SET @sql = IF(@col_exists = 0,
    'ALTER TABLE `snake_info` ADD COLUMN `toxin_type` varchar(50) DEFAULT NULL COMMENT ''毒素类型：神经毒素/血液毒素/细胞毒素/混合毒素/无毒'' AFTER `toxicity_level`',
    'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 添加危险梯队字段
SET @col_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'sl' AND TABLE_NAME = 'snake_info' AND COLUMN_NAME = 'danger_level');
SET @sql = IF(@col_exists = 0,
    'ALTER TABLE `snake_info` ADD COLUMN `danger_level` varchar(20) DEFAULT NULL COMMENT ''危险梯队：重度/中度/轻度/无毒'' AFTER `toxin_type`',
    'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- 添加分布信息字段
SET @col_exists = (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = 'sl' AND TABLE_NAME = 'snake_info' AND COLUMN_NAME = 'distribution');
SET @sql = IF(@col_exists = 0,
    'ALTER TABLE `snake_info` ADD COLUMN `distribution` varchar(500) DEFAULT NULL COMMENT ''分布信息'' AFTER `habitat_info`',
    'SELECT 1');
PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET FOREIGN_KEY_CHECKS = 1;

-- =============================================
-- 3. 插入蛇类物种数据
-- =============================================

-- ============================================================
-- 第一部分：盲蛇超科与早期基干类群（无毒）
-- ============================================================

-- 盲蛇科 Typhlopidae - 东南亚盲蛇属 Argyrophis
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('大盲蛇', '盲蛇科', '东南亚盲蛇属', 'Argyrophis diardii (Schlegel, 1839)', '小型穴居蛇类，体长约20-30cm，眼退化隐于鳞下，通体光滑暗褐色，外形似蚯蚓', 0, '无毒', '无毒', '地下洞穴、腐殖土层、白蚁巢附近', '云南、广西、海南；东南亚', '无危'),
('恒春盲蛇', '盲蛇科', '东南亚盲蛇属', 'Argyrophis koshunensis (Oshima, 1916)', '小型穴居蛇类，眼退化，体光滑呈暗色，形似蚯蚓', 0, '无毒', '无毒', '土壤深层、落叶层下', '台湾（恒春半岛）', '无危');

-- 盲蛇科 Typhlopidae - 印度盲蛇属 Indotyphlops
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('白头钩盲蛇', '盲蛇科', '印度盲蛇属', 'Indotyphlops albiceps (Boulenger, 1898)', '极小型穴居蛇，头部白色，体呈暗棕色，眼退化', 0, '无毒', '无毒', '土壤、石块下、落叶层', '云南；缅甸', '无危'),
('钩盲蛇', '盲蛇科', '印度盲蛇属', 'Indotyphlops braminus (Daudin, 1803)', '体长10-15cm，暗褐色有光泽，形似蚯蚓，眼退化，营孤雌生殖', 0, '无毒', '无毒', '花盆、石块下、腐殖土中，常随植物贸易扩散', '华南、华中、西南各省；广泛分布于全球热带亚热带', '无危'),
('贾氏盲蛇', '盲蛇科', '印度盲蛇属', 'Indotyphlops jerdoni (Boulenger, 1890)', '小型穴居蛇类，体光滑呈暗色', 0, '无毒', '无毒', '土壤深层、腐殖层', '云南；印度东北部', '无危'),
('香港盲蛇', '盲蛇科', '印度盲蛇属', 'Indotyphlops lazelli (Wallach & Pauwels, 2004)', '极小型穴居蛇，香港特有种', 0, '无毒', '无毒', '土壤深层、城市绿地', '香港', '数据缺乏');

-- 蚶科 Boidae - 沙蚺属 Eryx
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('敦煌沙蚺', '蚺科', '沙蚺属', 'Eryx dunhuangensis (Li & Wang, 1989)', '中小型蚺蛇，吻部呈铲状适于沙中挖掘，眼睛位于头部背侧', 0, '无毒', '无毒', '干旱荒漠、沙质土壤', '甘肃（敦煌）、新疆', '无危'),
('红沙蚺', '蚺科', '沙蚺属', 'Eryx miliaris (Pallas, 1773)', '中小型沙栖蚺蛇，体色沙黄至红褐色，吻部铲状', 0, '无毒', '无毒', '干旱荒漠、半荒漠沙地', '新疆、甘肃；中亚', '无危'),
('东疆沙蚺', '蚺科', '沙蚺属', 'Eryx orentalisxinjiangensis (Li & Wang, 1989)', '沙栖蚺蛇，适应松软沙土环境', 0, '无毒', '无毒', '干旱荒漠地带', '新疆东部', '无危');

-- 筒蛇科 Cylindrophiidae - 筒蛇属 Cylindrophis
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('红尾筒蛇', '筒蛇科', '筒蛇属', 'Cylindrophis jodiae (Amarasinghe et al., 2015)', '体呈圆筒状，尾部红色，头小不明显，穴居生活', 0, '无毒', '无毒', '土壤、落叶层、腐木下', '海南；东南亚', '无危');

-- 闪鳞蛇科 Xenopeltidae - 闪鳞蛇属 Xenopeltis
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('海南闪鳞蛇', '闪鳞蛇科', '闪鳞蛇属', 'Xenopeltis hainanensis (Hu & Djao, 1972)', '鳞片光滑具强烈虹彩光泽，体色暗褐，头扁平', 0, '无毒', '无毒', '低地热带森林、农田边缘土壤中', '海南', '无危'),
('闪鳞蛇', '闪鳞蛇科', '闪鳞蛇属', 'Xenopeltis unicolor (Reinwardt, 1827)', '鳞片高度光滑能折射强烈结构色光，体长约60-80cm，暗褐色', 0, '无毒', '无毒', '地表下泥土、落叶层、农田', '云南、广西、海南、广东；东南亚', '无危');

-- 蟒科 Pythonidae - 蟒属 Python
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('蟒', '蟒科', '蟒属', 'Python bivittatus (Kuhl, 1820)', '大型蛇类，体长可达5-7米，体背棕褐色具不规则斑纹，泄殖腔两侧有残存后肢爪', 0, '无毒', '无毒', '热带亚热带森林、溪流附近、沼泽', '云南、贵州、广西、海南、广东、福建；东南亚', '易危');

-- 瘰鳞蛇科 Acrochordidae - 瘰鳞蛇属 Acrochordus
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('瘰鳞蛇', '瘰鳞蛇科', '瘰鳞蛇属', 'Acrochordus granulatus (Schneider, 1799)', '皮肤松弛粗糙具颗粒状小突起，腹部无宽大盾片，尾部侧扁适于水中活动', 0, '无毒', '无毒', '河口三角洲、红树林、浅海水域', '广东、广西、海南、云南；东南亚、南亚、大洋洲', '无危');


-- ============================================================
-- 第二部分：闪皮蛇科与钝头蛇科（无毒）
-- ============================================================

-- 闪皮蛇科 Xenodermidae - 拟须唇蛇属 Parafimbrios
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('老挝拟须唇蛇', '闪皮蛇科', '拟须唇蛇属', 'Parafimbrios lao (Teynie et al., 2015)', '唇部具须状突起，体色暗褐，小型林栖蛇类', 0, '无毒', '无毒', '山区森林落叶层、溪流附近', '云南；老挝', '无危');

-- 闪皮蛇科 Xenodermidae - 脊蛇属 Achalinus（22种）
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('青脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus ater', '小型穴居蛇，体背深色至黑色，脊棱明显', 0, '无毒', '无毒', '山区潮湿枯枝落叶层、土壤缝隙', '四川、贵州', '无危'),
('大别山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus dabieshanensis', '小型穴居蛇类，体色暗褐', 0, '无毒', '无毒', '山区森林落叶层', '安徽（大别山区）', '无危'),
('大明山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus damingensis', '小型穴居蛇，活动极其隐秘', 0, '无毒', '无毒', '山区潮湿落叶层', '广西（大明山）', '无危'),
('德化脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus dehuaensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '福建（德化）', '无危'),
('越北脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus emilyae', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '广西；越南北部', '无危'),
('台湾脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus formosanus', '小型穴居蛇，体光滑呈暗色', 0, '无毒', '无毒', '中高海拔山区落叶层', '台湾', '无危'),
('海南脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus hainanus', '小型穴居蛇类', 0, '无毒', '无毒', '热带山地森林落叶层', '海南', '无危'),
('黄家岭脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus huangjietangi', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '中国南方', '无危'),
('湖南脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus hunanensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区潮湿落叶层', '湖南', '无危'),
('江华脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus jianghuaensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '湖南（江华）', '无危'),
('井冈山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus jinggangensis', '小型穴居蛇类，山区特有种', 0, '无毒', '无毒', '中高海拔山区落叶层', '江西（井冈山）', '无危'),
('美姑脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus meiguensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '四川（美姑）', '无危'),
('南山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus nanshanensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区落叶层', '湖南（南山）', '无危'),
('阿里山脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus niger', '小型穴居蛇，体色黑褐色', 0, '无毒', '无毒', '中高海拔山区森林', '台湾（阿里山）', '无危'),
('宁陕脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus ningshanensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '陕西（宁陕）', '无危'),
('攀枝花脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus panzhihuaensis', '小型穴居蛇类', 0, '无毒', '无毒', '干热河谷地带落叶层', '四川（攀枝花）', '无危'),
('屏边脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus pingbianensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '云南（屏边）', '无危'),
('棕脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus rufescens', '小型穴居蛇，体背棕褐色', 0, '无毒', '无毒', '山区潮湿落叶层、土壤缝隙', '华南、西南各省；越南', '无危'),
('沈氏脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus sheni', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林土壤层', '中国南方', '无危'),
('黑脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus spinalis', '小型穴居蛇，体背黑色脊棱明显', 0, '无毒', '无毒', '山区潮湿落叶层', '华东、华南各省；日本', '无危'),
('杨氏脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus yangdatongi', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '中国南方', '无危'),
('云开脊蛇', '闪皮蛇科', '脊蛇属', 'Achalinus yunkaiensis', '小型穴居蛇类', 0, '无毒', '无毒', '山区森林落叶层', '广东、广西（云开山脉）', '无危');

-- 钝头蛇科 Pareidae - 钝头蛇属 Pareas（22种）
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('克钦钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas andersonii', '头大钝圆，下颌齿左右不对称（右侧多于左侧），专食蜗牛', 0, '无毒', '无毒', '山区森林潮湿环境', '云南；缅甸北部', '无危'),
('泰雅钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas atayal', '头大钝圆，专食蜗牛', 0, '无毒', '无毒', '中低海拔山区森林', '台湾', '无危'),
('百色钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas baiseensis', '头大钝圆，专食蜗牛', 0, '无毒', '无毒', '亚热带森林', '广西（百色）', '无危'),
('勐腊钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas berdmorei', '头大钝圆，专食蜗牛和蛞蝓', 0, '无毒', '无毒', '热带雨林、季雨林', '云南；缅甸、泰国', '无危'),
('平鳞钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas boulengeri', '头大钝圆，鳞片平滑', 0, '无毒', '无毒', '山区森林', '华南、西南', '无危'),
('中国钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas chinensis', '头大钝圆，下颌不对称', 0, '无毒', '无毒', '亚热带山区森林', '华中、华南', '无危'),
('独龙江钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas dulongjiangensis', '头大钝圆，特有种', 0, '无毒', '无毒', '高黎贡山区森林', '云南（独龙江）', '无危'),
('台湾钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas formosensis', '头大钝圆，专食蜗牛', 0, '无毒', '无毒', '中低海拔山区', '台湾', '无危'),
('伯仲钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas geminatus', '头大钝圆', 0, '无毒', '无毒', '山区森林', '中国西南', '无危'),
('观音山钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas guanyinshanensis', '头大钝圆，特有种', 0, '无毒', '无毒', '山区森林', '中国西南', '无危'),
('缅甸钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas hamptoni', '头大钝圆，专食蜗牛', 0, '无毒', '无毒', '热带亚热带森林', '云南；缅甸、泰国', '无危'),
('阿里山钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas komaii', '头大钝圆', 0, '无毒', '无毒', '中高海拔山区', '台湾（阿里山）', '无危'),
('横斑钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas macularius', '头大钝圆，体背具横斑', 0, '无毒', '无毒', '山区森林', '中国西南；东南亚', '无危'),
('横纹钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas margaritophorus', '头大钝圆，体背具横纹', 0, '无毒', '无毒', '山区森林潮湿环境', '中国西南；东南亚', '无危'),
('喜山钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas monticola', '头大钝圆，高海拔种', 0, '无毒', '无毒', '高海拔山区森林', '西藏；喜马拉雅地区', '无危'),
('昆明钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas niger', '头大钝圆，体色暗', 0, '无毒', '无毒', '亚热带山区森林', '云南（昆明）', '无危'),
('黑顶钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas nigriceps', '头大钝圆，头顶黑色', 0, '无毒', '无毒', '山区森林', '中国西南', '无危'),
('福建钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas stanleyi', '头大钝圆', 0, '无毒', '无毒', '亚热带山区森林', '福建', '无危'),
('虎纹钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas tigerinus', '头大钝圆，体背具虎纹', 0, '无毒', '无毒', '山区森林', '中国西南；东南亚', '无危'),
('贡山钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas vindumi', '头大钝圆，特有种', 0, '无毒', '无毒', '高黎贡山区森林', '云南（贡山）', '无危'),
('雪林钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas xuelinensis', '头大钝圆', 0, '无毒', '无毒', '山区森林', '中国西南', '无危'),
('云南钝头蛇', '钝头蛇科', '钝头蛇属', 'Pareas yunnanensis', '头大钝圆', 0, '无毒', '无毒', '亚热带山区森林', '云南', '无危');


-- ============================================================
-- 第三部分：蝰科 Viperidae（管牙类毒蛇 - 血液毒素为主）
-- ============================================================

-- 圆斑蝰属 Daboia
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('泰国圆斑蝰', '蝰科', '圆斑蝰属', 'Daboia siamensis', '体粗短，头大呈三角形，体背具圆形深色斑纹，管牙发达', 3, '血液毒素', '重度', '平原丘陵、农田、草地', '广东、广西、福建、台湾；东南亚', '无危');

-- 蝰属 Vipera
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('极北蝰', '蝰科', '蝰属', 'Vipera berus', '体粗短，头大三角形，体背有深色锯齿状纵纹，耐寒性强', 3, '血液毒素', '重度', '山地森林、草地、沼泽边缘', '新疆北部、黑龙江；欧洲、北亚', '无危'),
('东方蝰', '蝰科', '蝰属', 'Vipera renardi', '体粗短，头呈三角形', 3, '血液毒素', '重度', '草原、半荒漠', '新疆、内蒙古；中亚、蒙古', '无危');

-- 白头蝰属 Azemiops
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('黑头蝰', '蝰科', '白头蝰属', 'Azemiops feae', '头背黑色，体背紫褐色具浅色横带，管牙短小，原始蝰科成员', 2, '血液毒素', '中度', '山区森林、竹林、灌丛', '云南、贵州、四川、广西、西藏；缅甸、越南', '无危'),
('白头蝰', '蝰科', '白头蝰属', 'Azemiops kharini', '头部淡黄白色，体背紫褐色具浅色横纹，罕见原始蝰科', 2, '血液毒素', '中度', '山区森林、竹林', '华南、西南山区；越南北部', '无危');

-- 尖吻蝮属 Deinagkistrodon
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('尖吻蝮', '蝰科', '尖吻蝮属', 'Deinagkistrodon acutus', '俗称五步蛇，头大三角形吻端上翘，体背棕褐色具灰白色方斑，排毒量大', 3, '血液毒素', '重度', '山区森林、竹林、灌丛、溪沟', '华南、华中、西南各省（浙江、安徽、福建、江西、湖北、湖南、广东、广西、贵州、四川、台湾）', '无危');

-- 喜山蝮属 Himalayophis
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('西藏竹叶青蛇', '蝰科', '喜山蝮属', 'Himalayophis tibetanus', '体背绿色，具管牙，高海拔竹叶青类群', 3, '血液毒素', '重度', '高海拔山区森林、灌丛', '西藏', '数据缺乏'),
('藏南竹叶青蛇', '蝰科', '喜山蝮属', 'Himalayophis arunachalensis', '体背绿色，管牙发达', 3, '血液毒素', '重度', '山区森林', '西藏南部；印度东北部', '数据缺乏');

-- 坡普蝮属 Popeia
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('兰纳竹叶青蛇', '蝰科', '坡普蝮属', 'Popeia lanna', '体背绿色，侧面有白色或红色侧线', 3, '血液毒素', '重度', '热带亚热带山区森林', '云南；泰国北部、缅甸', '无危'),
('坡普竹叶青蛇', '蝰科', '坡普蝮属', 'Popeia popeiorum', '体背鲜绿色，尾端红色', 3, '血液毒素', '重度', '山区森林、灌丛', '云南；缅甸、泰国、印度', '无危');

-- 华蝮属 Sinovipera
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('四川华蝮', '蝰科', '华蝮属', 'Sinovipera sichuanensis', '管牙发达，体色暗褐', 3, '血液毒素', '重度', '山区森林', '四川', '数据缺乏');

-- 绿蝮属 Viridovipera
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('冈氏竹叶青蛇', '蝰科', '绿蝮属', 'Viridovipera gumprechti', '体背鲜绿色，侧面具白色侧线', 3, '血液毒素', '重度', '热带亚热带山区森林', '云南；缅甸、泰国、老挝', '无危'),
('墨脱竹叶青蛇', '蝰科', '绿蝮属', 'Viridovipera medoensis', '体背绿色，高海拔种', 3, '血液毒素', '重度', '高海拔亚热带森林', '西藏（墨脱）', '数据缺乏'),
('福建竹叶青蛇', '蝰科', '绿蝮属', 'Viridovipera stejnegeri', '体背翠绿色，眼红色，尾焦红色，体侧有白色或红白各半侧线', 3, '血液毒素', '重度', '山区树林、竹林、灌丛、溪沟', '华东、华南、华中、西南各省', '无危'),
('云南竹叶青蛇', '蝰科', '绿蝮属', 'Viridovipera yunnanensis', '体背绿色，云南特有种', 3, '血液毒素', '重度', '亚热带山区森林', '云南', '数据缺乏');

-- 竹叶青蛇属 Trimeresurus
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('白唇竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus albolabris', '体背翠绿色，唇部白色，尾焦红色', 3, '血液毒素', '重度', '低海拔山区树林、灌丛、农田', '华南、西南；东南亚', '无危'),
('饰尾竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus caudornatus', '体背绿色，尾部具装饰性花纹', 3, '血液毒素', '重度', '山区森林', '中国西南', '数据缺乏'),
('台湾竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus gracilis', '体背绿色，体型纤细', 3, '血液毒素', '重度', '中高海拔山区', '台湾', '无危'),
('滇南竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus guoi', '体背绿色', 3, '血液毒素', '重度', '热带山区森林', '云南南部；东南亚', '数据缺乏'),
('错那竹叶青蛇', '蝰科', '竹叶青蛇属', 'Trimeresurus salazar', '体背绿色，头部具红色花纹', 3, '血液毒素', '重度', '山区森林', '西藏（错那）', '数据缺乏');

-- 原矛头蝮属 Protobothrops
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('角原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops cornutus', '头大三角形，吻端具角状突起', 3, '血液毒素', '重度', '山区森林', '中国西南', '数据缺乏'),
('大别山原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops dabieshanensis', '头三角形，体背棕褐色', 3, '血液毒素', '重度', '山区森林', '安徽、湖北（大别山区）', '数据缺乏'),
('喜山原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops himalayanus', '头大三角形，高海拔种', 3, '血液毒素', '重度', '高海拔山区', '西藏；喜马拉雅地区', '数据缺乏'),
('菜花原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops jerdonii', '头三角形，体背黄绿色具菜花状斑纹', 3, '血液毒素', '重度', '山区森林、灌丛、草丛', '华中、西南；印度、缅甸', '无危'),
('缅北原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops kaulbacki', '头大三角形', 3, '血液毒素', '重度', '山区森林', '云南；缅甸北部', '数据缺乏'),
('莽山原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops mangshanensis', '俗称莽山烙铁头，体长可达2米，体背棕褐色具不规则黄绿色斑纹，极罕见', 3, '血液毒素', '重度', '亚热带原始森林', '湖南（莽山）、广东', '濒危'),
('茂兰原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops maolanensis', '头大三角形', 3, '血液毒素', '重度', '喀斯特森林', '贵州（茂兰）', '数据缺乏'),
('原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops mucrosquamatus', '头长三角形，体背棕褐色具不规则深色斑块，俗称烙铁头', 3, '血液毒素', '重度', '山区森林、竹林、灌丛、农田', '华中、华南、西南、台湾；东南亚', '无危'),
('越北原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops trungkhanhensis', '头大三角形', 3, '血液毒素', '重度', '石灰岩山区森林', '广西；越南北部', '数据缺乏'),
('乡城原矛头蝮', '蝰科', '原矛头蝮属', 'Protobothrops xiangchengensis', '头大三角形，高海拔种', 3, '血液毒素', '重度', '高海拔山区森林', '四川（乡城）', '数据缺乏');

-- 烙铁头蛇属 Ovophis
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('盈江烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis jenkinsi', '头大三角形，体粗壮', 3, '血液毒素', '重度', '山区森林', '云南（盈江）；缅甸', '数据缺乏'),
('台湾烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis makazayazaya', '头大三角形，体粗短', 3, '血液毒素', '重度', '中低海拔山区森林', '台湾', '无危'),
('屏边烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis anitae', '头大三角形', 3, '血液毒素', '重度', '山区森林', '云南（屏边）', '数据缺乏'),
('山烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis monticola', '头大三角形，体背深色', 3, '血液毒素', '重度', '中高海拔山区森林', '华中、西南；东南亚', '无危'),
('越南烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis tonkinensis', '头大三角形', 3, '血液毒素', '重度', '山区森林', '云南；越南', '数据缺乏'),
('隅察烙铁头蛇', '蝰科', '烙铁头蛇属', 'Ovophis zayuensis', '头大三角形，高海拔种', 3, '血液毒素', '重度', '高海拔山区森林', '西藏（隅察）', '数据缺乏');

-- 亚洲蝮属 Gloydius（20种）
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('若尔盖蝮', '蝰科', '亚洲蝮属', 'Gloydius angusticeps', '头三角形，体短粗，耐高海拔低温，高寒特有种', 3, '血液毒素', '重度', '高寒草甸、灌丛', '四川（若尔盖）、甘肃', '无危'),
('短尾蝮', '蝰科', '亚洲蝮属', 'Gloydius brevicaudus', '头三角形，体短粗尾极短，体背灰褐色具深色圆斑', 3, '血液毒素', '重度', '平原、丘陵、低山区草地、石堆', '华东、华中、华北、西南广泛分布', '无危'),
('长岛蝮', '蝰科', '亚洲蝮属', 'Gloydius changdaoensis', '头三角形，岛屿特有种', 3, '血液毒素', '重度', '海岛灌丛', '山东（长岛）', '数据缺乏'),
('阿拉善蝮', '蝰科', '亚洲蝮属', 'Gloydius cognatus', '头三角形，适应干旱环境', 3, '血液毒素', '重度', '荒漠草原、戈壁', '内蒙古（阿拉善）、甘肃', '无危'),
('西伯利亚蝮', '蝰科', '亚洲蝮属', 'Gloydius halys', '头三角形，耐寒能力极强，分布纬度最高的蝮蛇之一', 3, '血液毒素', '重度', '针叶林、草原、石质山坡', '新疆、内蒙古、黑龙江、吉林；蒙古、俄罗斯西伯利亚', '无危'),
('澜沧蝮', '蝰科', '亚洲蝮属', 'Gloydius huangi', '头三角形，河谷特有种', 3, '血液毒素', '重度', '干热河谷灌丛', '云南（澜沧江流域）', '数据缺乏'),
('中介蝮', '蝰科', '亚洲蝮属', 'Gloydius intermedius', '头三角形，体背沙黄色至灰色具深色斑块', 3, '血液毒素', '重度', '荒漠草原、石质山坡', '西北各省（新疆、甘肃、宁夏、内蒙古）；蒙古、中亚', '无危'),
('九寨蝮', '蝰科', '亚洲蝮属', 'Gloydius lateralis', '头三角形，体侧具特征性花纹', 3, '血液毒素', '重度', '山区森林、灌丛', '四川（九寨沟）', '数据缺乏'),
('六盘山蝮', '蝰科', '亚洲蝮属', 'Gloydius liupanensis', '头三角形', 3, '血液毒素', '重度', '山区灌丛、草地', '宁夏、甘肃（六盘山区）', '数据缺乏'),
('庙岛蝮', '蝰科', '亚洲蝮属', 'Gloydius lijianlii', '头三角形，岛屿特有种', 3, '血液毒素', '重度', '海岛灌丛', '山东（庙岛群岛）', '数据缺乏'),
('怒江蝮', '蝰科', '亚洲蝮属', 'Gloydius lipipengi', '头三角形', 3, '血液毒素', '重度', '河谷山区', '云南（怒江流域）', '数据缺乏'),
('雪山蝮', '蝰科', '亚洲蝮属', 'Gloydius monticola', '头三角形，高海拔特有种', 3, '血液毒素', '重度', '高海拔草甸、灌丛', '四川、云南', '数据缺乏'),
('秦岭蝮', '蝰科', '亚洲蝮属', 'Gloydius qinlingensis', '头三角形，山区特有种', 3, '血液毒素', '重度', '山区森林、灌丛', '陕西、甘肃（秦岭山区）', '无危'),
('红斑高山蝮', '蝰科', '亚洲蝮属', 'Gloydius rubromaculatus', '头三角形，体背具红色斑块', 3, '血液毒素', '重度', '高海拔草甸', '四川、青海', '数据缺乏'),
('高原蝮', '蝰科', '亚洲蝮属', 'Gloydius strauchi', '头三角形，极强耐寒能力，高寒高原特有种', 3, '血液毒素', '重度', '青藏高原高寒草甸、灌丛', '青海、西藏、四川、甘肃', '无危'),
('华北蝮', '蝰科', '亚洲蝮属', 'Gloydius stejnegeri', '头三角形', 3, '血液毒素', '重度', '山区灌丛、草地', '河北、山西、北京', '数据缺乏'),
('蛇岛蝮', '蝰科', '亚洲蝮属', 'Gloydius shedaoensis', '头三角形，岛屿特有种，以候鸟为主要食物', 3, '血液毒素', '重度', '海岛灌丛、岩缝', '辽宁（蛇岛）', '濒危'),
('冰川蝮', '蝰科', '亚洲蝮属', 'Gloydius swild', '头三角形，极高海拔种', 3, '血液毒素', '重度', '冰川边缘高寒地带', '四川、云南', '数据缺乏'),
('乌苏里蝮', '蝰科', '亚洲蝮属', 'Gloydius ussuriensis', '头三角形，体背灰褐色', 3, '血液毒素', '重度', '针叶林、混交林、草地', '黑龙江、吉林、辽宁；俄罗斯远东、朝鲜', '无危'),
('卡若蝮', '蝰科', '亚洲蝮属', 'Gloydius variegatus', '头三角形', 3, '血液毒素', '重度', '山区灌丛', '西藏（卡若）', '数据缺乏');


-- ============================================================
-- 第四部分：独立小科（水蛇科、紫沙蛇科、花条蛇科、食螺蛇科、两头蛇科等）
-- ============================================================

-- 水蛇科 Homalopsidae
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('铅色水蛇', '水蛇科', '铅色水蛇属', 'Hypsiscopus wettsteini', '体色铅灰，鼻孔移至吻背，后沟牙，半水生', 0, '无毒', '无毒', '河口三角洲、红树林、淡水湿地', '广东、广西、海南、云南；东南亚', '无危'),
('黑斑水蛇', '水蛇科', '黑斑水蛇属', 'Myrrophis bennettii', '体背具黑色斑点，鼻孔朝上，后沟牙', 0, '无毒', '无毒', '淡水湿地、稻田、溪流', '华南；东南亚', '无危'),
('中国水蛇', '水蛇科', '黑斑水蛇属', 'Myrrophis chinensis', '体背橄榄色具黑色纵纹，鼻孔朝上，后沟牙微毒', 1, '无毒', '轻度', '淡水湿地、稻田、水沟、池塘', '华东、华南、华中各省', '无危');

-- 紫沙蛇科 Psammodynastidae
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('紫沙蛇', '紫沙蛇科', '紫沙蛇属', 'Psammodynastes pulverulentus', '瞳孔垂直椭圆形，体色紫褐，后沟牙具微弱毒性', 1, '无毒', '轻度', '山区森林落叶层、灌丛', '华南、西南；东南亚', '无危');

-- 花条蛇科 Psammophiidae
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('花条蛇', '花条蛇科', '花条蛇属', 'Psammophis lineolatus', '体细长，行动极快，体背淡黄色具深色纵纹，日行性视力佳', 0, '无毒', '无毒', '干旱荒漠、半荒漠', '新疆、甘肃、内蒙古；中亚', '无危'),
('吐鲁番花条蛇', '花条蛇科', '花条蛇属', 'Psammophis turpanensis', '体细长，行动迅速', 0, '无毒', '无毒', '干旱荒漠', '新疆（吐鲁番）', '数据缺乏');

-- 食螺蛇科 Dipsadidae
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('西藏温泉蛇', '食螺蛇科', '温泉蛇属', 'Thermophis baileyi', '青藏高原特有蛇类，依赖地热温泉微气候生存，地质气候活化石', 0, '无毒', '无毒', '温泉附近、地热区域', '西藏', '易危'),
('香格里拉温泉蛇', '食螺蛇科', '温泉蛇属', 'Thermophis shangrila', '高海拔温泉特有种', 0, '无毒', '无毒', '温泉附近', '云南（香格里拉）', '数据缺乏'),
('四川温泉蛇', '食螺蛇科', '温泉蛇属', 'Thermophis zhaoermii', '高海拔温泉特有种', 0, '无毒', '无毒', '温泉附近', '四川', '数据缺乏');

-- 两头蛇科 Calamariidae
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('贡山两头蛇', '两头蛇科', '两头蛇属', 'Calamaria andersoni', '尾部形态与头部高度相似，受威胁时翘起尾部迷惑天敌', 0, '无毒', '无毒', '山区森林落叶层下、土壤中', '云南（贡山）', '数据缺乏'),
('钝尾两头蛇', '两头蛇科', '两头蛇属', 'Calamaria septentrionalis', '尾部与头部极似，属典型拟态演化', 0, '无毒', '无毒', '山区森林土壤、落叶层', '华中、华南、西南', '无危'),
('云南两头蛇', '两头蛇科', '两头蛇属', 'Calamaria yunnanensis', '尾部与头部高度相似', 0, '无毒', '无毒', '山区森林落叶层', '云南', '数据缺乏');

-- 斜鳞蛇科 Pseudoxenodontidae 与剑蛇科 Sibynophiidae
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('黑头剑蛇', '剑蛇科', '剑蛇属', 'Sibynophis chinensis', '头部黑色，体细长，行动迅速', 0, '无毒', '无毒', '山区森林、灌丛', '华南、华中、西南', '无危');


-- ============================================================
-- 第五部分：水游蛇科 Natricidae（半水生中小型蛇类）
-- ============================================================

INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('虎斑颈槽蛇', '水游蛇科', '颈槽蛇属', 'Rhabdophis tigrinus', '颈背具颈腺可喷射蟾蜍毒素，体背绿色具黑色虎斑，后沟牙，能通过捕食蟾蜍积累毒素', 3, '混合毒素', '重度', '平原丘陵湿地、稻田、溪沟', '华东、华中、华北、东北、西南；日本、朝鲜、俄罗斯远东', '无危'),
('红脖颈槽蛇', '水游蛇科', '颈槽蛇属', 'Rhabdophis subminiatus', '颈部红色具颈腺，后沟牙，能化学盗用蟾蜍毒素', 3, '混合毒素', '重度', '平原丘陵湿地、灌丛', '华南、西南；东南亚', '无危'),
('草腹链蛇', '水游蛇科', '腹链蛇属', 'Amphiesma stolatum', '体背褐色具浅色纵纹，中小型无毒蛇', 0, '无毒', '无毒', '平原丘陵草地、灌丛、农田', '华南、华中、西南；南亚、东南亚', '无危'),
('黄斑渔游蛇', '水游蛇科', '渔游蛇属', 'Fowlea flavipunctata', '体背具黄色斑点，半水生', 0, '无毒', '无毒', '溪流、水塘、稻田', '华南、西南；东南亚', '无危');


-- ============================================================
-- 第六部分：游蛇科 Colubridae（大型陆生/树栖蛇类）
-- ============================================================

-- 林蛇属 Boiga（后沟牙微毒）
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('绿林蛇', '游蛇科', '林蛇属', 'Boiga cyanea', '体背鲜绿色，瞳孔垂直，夜行性，后沟牙微毒', 0, '无毒', '无毒', '热带亚热带森林树冠层', '云南；东南亚', '无危'),
('东伽马林蛇', '游蛇科', '林蛇属', 'Boiga gocool', '体细长，夜行性树栖', 0, '无毒', '无毒', '山区森林树冠层', '中国西南；东南亚', '无危'),
('绞花林蛇', '游蛇科', '林蛇属', 'Boiga kraepelini', '体细长，体背棕褐色具黑褐色斑块，夜行性后沟牙', 0, '无毒', '无毒', '山区森林', '华南、华中、西南；越南', '无危'),
('繁花林蛇', '游蛇科', '林蛇属', 'Boiga multomaculata', '体背具繁复花纹，夜行性树栖', 0, '无毒', '无毒', '山区森林树冠层', '华南、西南；东南亚', '无危');

-- 白环蛇属 Lycodon
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('赤链蛇', '游蛇科', '白环蛇属', 'Lycodon rufozonatus', '体背黑褐色具多数红色横纹，后沟牙，模拟剧毒环蛇的贝氏拟态', 2, '无毒', '中度', '平原丘陵山地、农田、住宅附近', '华东、华中、华北、东北、西南；日本、朝鲜、俄罗斯远东', '无危'),
('双全白环蛇', '游蛇科', '白环蛇属', 'Lycodon fasciatus', '体背黑白相间环纹', 0, '无毒', '无毒', '山区森林', '华南、西南', '无危'),
('黑斑白环蛇', '游蛇科', '白环蛇属', 'Lycodon neomaculatus', '体背具黑色斑纹', 0, '无毒', '无毒', '山区森林', '中国西南', '无危'),
('察隅白环蛇', '游蛇科', '白环蛇属', 'Lycodon zayuensis', '体背具环纹', 0, '无毒', '无毒', '山区森林', '西藏（察隅）', '数据缺乏');

-- 寡头蛇属 Oligodon
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('饰纹寡头蛇', '游蛇科', '寡头蛇属', 'Oligodon ornatus', '上颌后缘齿宽扁似库克里刀，专破蛋壳吸食蛋液', 0, '无毒', '无毒', '山区森林落叶层', '华南、西南', '无危');

-- 锦蛇及关联类群
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('三索锦蛇', '游蛇科', '颌腔蛇属', 'Coelognathus radiatus', '体侧具三条深色纵纹，大型无毒蛇', 0, '无毒', '无毒', '平原丘陵灌丛、农田', '云南、广西、广东；东南亚', '无危'),
('玉斑锦蛇', '游蛇科', '玉斑蛇属', 'Euprepiophis mandarinus', '体背具黑色边缘的菱形斑块，色彩艳丽', 0, '无毒', '无毒', '山区森林、灌丛', '华东、华中、西南；缅甸', '无危'),
('紫灰锦蛇', '游蛇科', '紫灰蛇属', 'Oreocryptophis porphyraceus', '体背紫灰色具深色纵纹', 0, '无毒', '无毒', '山区森林', '华南、西南；东南亚', '无危'),
('红纹滞卵蛇', '游蛇科', '滞卵蛇属', 'Oocatochus rufodorsatus', '体背红褐色，卵胎生繁殖策略适应寒冷环境', 0, '无毒', '无毒', '山区溪流附近、湿地', '华北、东北、华中；朝鲜、俄罗斯远东', '无危'),
('王锦蛇', '游蛇科', '锦蛇属', 'Elaphe carinata', '体大粗壮可达2米，体背黑褐色杂黄色斑纹，头部有"王"字纹，具食蛇性和天然抗毒能力', 0, '无毒', '无毒', '平原丘陵山区', '华东、华中、华南、西南', '无危'),
('白条锦蛇', '游蛇科', '锦蛇属', 'Elaphe dione', '体背灰褐色具白色纵纹', 0, '无毒', '无毒', '平原丘陵草地、农田', '华北、西北、东北、华东；中亚、朝鲜', '无危'),
('黑眉锦蛇', '游蛇科', '锦蛇属', 'Elaphe taeniura', '眼后具黑色眉纹，大型无毒蛇，善攀爬', 0, '无毒', '无毒', '平原丘陵山地、住宅附近', '全国广泛分布；东南亚', '无危'),
('若尔盖锦蛇', '游蛇科', '锦蛇属', 'Elaphe zoigeensis', '高海拔特有种', 0, '无毒', '无毒', '高海拔草甸灌丛', '四川（若尔盖）', '数据缺乏'),
('灰腹绿锦蛇', '游蛇科', '树栖锦蛇属', 'Gonyosoma frenatum', '体背绿色，腹部灰白色，树栖型', 0, '无毒', '无毒', '山区森林树冠层', '华南、西南；东南亚', '无危'),
('蓝绿锦蛇', '游蛇科', '树栖锦蛇属', 'Gonyosoma coeruleum', '体背蓝绿色，树栖型', 0, '无毒', '无毒', '热带亚热带森林', '云南；东南亚', '无危');


-- ============================================================
-- 第七部分：眼镜蛇科 Elapidae（前沟牙神经毒素代表）
-- ============================================================

-- 华珊瑚蛇属 Sinomicrurus
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('环纹华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus annularis', '体背红棕色具黑色环纹，前沟牙，神经毒性', 3, '神经毒素', '重度', '山区森林落叶层', '华南、西南；东南亚', '无危'),
('福建华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus kelloggi', '体背红褐色具黑色横纹，前沟牙', 3, '神经毒素', '重度', '山区森林', '福建、华南', '无危'),
('中华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus macclellandi', '体背红棕色具黑色环纹，色彩鲜艳，前沟牙神经毒', 3, '神经毒素', '重度', '山区森林落叶层', '华东、华南、华中、西南；东南亚', '无危'),
('广西华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus peinani', '体背具珊瑚蛇花纹', 3, '神经毒素', '重度', '山区森林', '广西', '无危'),
('梭德氏华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus sauteri', '体背具黑红环纹', 3, '神经毒素', '重度', '中低海拔山区森林', '台湾；越南', '无危'),
('斯文豪氏华珊瑚蛇', '眼镜蛇科', '华珊瑚蛇属', 'Sinomicrurus swinhoei', '体背具珊瑚蛇花纹', 3, '神经毒素', '重度', '山区森林', '台湾', '无危');

-- 眼镜王蛇属 Ophiophagus
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('眼镜王蛇', '眼镜蛇科', '眼镜王蛇属', 'Ophiophagus hannah (Cantor, 1836)', '全球体型最长毒蛇，可达3-5米，颈部扩张不如眼镜蛇明显，排毒量极大，具有食蛇性，混合毒素含神经毒和细胞毒', 3, '混合毒素', '重度', '山区原始森林、竹林', '华南、西南（云南、贵州、四川、广西、广东、福建、西藏、浙江、湖南、江西、海南）；东南亚、南亚', '易危');

-- 眼镜蛇属 Naja
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('舟山眼镜蛇', '眼镜蛇科', '眼镜蛇属', 'Naja atra', '颈部可扩张成扁平状，受惊竖起前身，体背黑褐色，细胞毒素为主可致组织坏死', 3, '细胞毒素', '重度', '平原丘陵山地、田野、草丛、农田', '华东、华南、华中、西南', '无危'),
('西南眼镜蛇', '眼镜蛇科', '眼镜蛇属', 'Naja fuxi', '新近描述种，颈部可扩张', 3, '细胞毒素', '重度', '山区森林', '云南、四川；东南亚', '数据缺乏'),
('孟加拉眼镜蛇', '眼镜蛇科', '眼镜蛇属', 'Naja kaouthia', '颈部扩张具单眼斑，体背黄褐色至黑色', 3, '细胞毒素', '重度', '平原丘陵、农田、村寨附近', '云南、广西、贵州；东南亚、南亚', '无危');

-- 环蛇属 Bungarus
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('环蛇', '眼镜蛇科', '环蛇属', 'Bungarus bungaroides', '体背黑白相间环纹，前沟牙神经毒', 3, '神经毒素', '重度', '山区森林', '西藏；喜马拉雅地区', '无危'),
('金环蛇', '眼镜蛇科', '环蛇属', 'Bungarus fasciatus', '体背黑黄相间环纹，前沟牙，神经毒素', 3, '神经毒素', '重度', '平原丘陵、灌丛、水域附近', '华南、西南；东南亚、南亚', '无危'),
('乌环蛇', '眼镜蛇科', '环蛇属', 'Bungarus lividus', '体背深色，前沟牙神经毒', 3, '神经毒素', '重度', '山区森林', '西藏；南亚', '无危'),
('银环蛇', '眼镜蛇科', '环蛇属', 'Bungarus multicinctus', '体背黑白相间环纹，白环窄黑环宽，夜行性，中国毒性最强的蛇之一，神经毒素致呼吸麻痹', 3, '神经毒素', '重度', '平原丘陵山地溪沟、稻田、鱼塘、村舍附近', '华东、华中、华南、西南；东南亚', '无危'),
('黑环蛇', '眼镜蛇科', '环蛇属', 'Bungarus niger', '体背黑色，前沟牙神经毒', 3, '神经毒素', '重度', '山区森林', '西藏；南亚', '无危'),
('素贞环蛇', '眼镜蛇科', '环蛇属', 'Bungarus suzhenae', '新近描述种（2021年），体背黑白环纹，隐存物种', 3, '神经毒素', '重度', '山区森林', '中国西南', '数据缺乏'),
('云南环蛇', '眼镜蛇科', '环蛇属', 'Bungarus wanghaotingi', '体背黑白环纹', 3, '神经毒素', '重度', '山区森林', '云南；东南亚', '无危');

-- 扁尾海蛇属 Laticauda
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('蓝灰扁尾海蛇', '眼镜蛇科', '扁尾海蛇属', 'Laticauda colubrina', '体背蓝灰色具黑色环纹，尾部侧扁适于划水，鼻孔移至吻背具防水瓣膜', 3, '神经毒素', '重度', '热带浅海、珊瑚礁', '南海、东海；太平洋、印度洋热带海域', '无危'),
('扁尾海蛇', '眼镜蛇科', '扁尾海蛇属', 'Laticauda laticaudata', '体背蓝灰色具黑色环纹，海生', 3, '神经毒素', '重度', '热带浅海、珊瑚礁', '南海、东海；太平洋热带海域', '无危'),
('半环扁尾海蛇', '眼镜蛇科', '扁尾海蛇属', 'Laticauda semifasciata', '体背蓝灰色具不完整黑色环纹', 3, '神经毒素', '重度', '热带浅海', '东海、南海；太平洋西部', '无危');

-- 龟头海蛇属 Emydocephalus
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('海蛇', '眼镜蛇科', '龟头海蛇属', 'Emydocephalus ijimae', '头部呈龟头状，完全海生，以鱼卵为食', 3, '神经毒素', '重度', '浅海珊瑚礁', '东海、南海；日本南部', '无危');

-- 小头海蛇属 Microcephalophis
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('小头海蛇', '眼镜蛇科', '小头海蛇属', 'Microcephalophis gracilis', '头极小，体细长侧扁，完全海生', 3, '神经毒素', '重度', '浅海、河口', '南海、东海；印度洋、太平洋', '无危');

-- 海蛇属 Hydrophis（11种）
INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('青灰海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis caerulescens', '体背青灰色，尾部侧扁，完全海生', 3, '神经毒素', '重度', '浅海大陆架', '南海、东海；印度洋', '无危'),
('平颏海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis curtus', '颏部平坦，海生', 3, '神经毒素', '重度', '浅海', '南海；东南亚', '无危'),
('青环海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis cyanocinctus', '体背青灰色具深色环纹，完全海生', 3, '神经毒素', '重度', '浅海大陆架、近岸水域', '中国沿海；印度洋、太平洋', '无危'),
('环纹海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis fasciatus', '体背具黑色环纹，海生', 3, '神经毒素', '重度', '浅海', '南海、东海；印度洋、太平洋', '无危'),
('截吻海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis jerdonii', '吻端截断状，海生', 3, '神经毒素', '重度', '浅海', '南海；印度洋', '无危'),
('黑头海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis melanocephalus', '头部黑色，海生', 3, '神经毒素', '重度', '浅海', '东海、南海；日本南部、东南亚', '无危'),
('淡灰海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis ornatus', '体背淡灰色具花纹，海生', 3, '神经毒素', '重度', '浅海', '南海；印度洋、太平洋', '无危'),
('棘眦海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis peronii', '眼部具棘状突起，海生', 3, '神经毒素', '重度', '浅海', '南海；太平洋', '无危'),
('长吻海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis platurus', '吻部较长，分布最广的海蛇之一，能在开阔大洋中生活', 3, '神经毒素', '重度', '开阔大洋、浅海', '中国沿海；全球热带亚热带海域', '无危'),
('棘鳞海蛇', '眼镜蛇科', '海蛇属', 'Hydrophis stokesii', '鳞片具棘状突起，海生', 3, '神经毒素', '重度', '浅海', '南海；印度洋、太平洋', '无危'),
('海蝰', '眼镜蛇科', '海蛇属', 'Hydrophis viperinus', '蝰蛇状头部，海生', 3, '神经毒素', '重度', '浅海', '南海、东海；印度洋、太平洋', '无危');


-- ============================================================
-- 第八部分：报告中提及的全球代表性毒蛇
-- ============================================================

INSERT INTO `snake_info` (snake_name, family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level, habitat_info, distribution, conservation_status) VALUES
('内陆太攀蛇', '眼镜蛇科', '太攀蛇属', 'Oxyuranus microlepidotus', '世界陆生毒性最强的蛇，LD50值极低，体色随季节变化', 3, '神经毒素', '重度', '干旱平原、草地', '澳大利亚中部', '无危'),
('海岸太攀蛇', '眼镜蛇科', '太攀蛇属', 'Oxyuranus scutellatus', '体长2-3米，棕色至深橄榄色，移动速度快', 3, '神经毒素', '重度', '沿海森林、林地', '澳大利亚东北部沿海', '无危'),
('黑曼巴', '眼镜蛇科', '曼巴蛇属', 'Dendroaspis polylepis', '体色灰褐至橄榄色，移动速度极快可达20km/h，高纯度神经毒素', 3, '神经毒素', '重度', '稀树草原、灌丛、岩石地带', '撒哈拉以南非洲', '无危'),
('鼓腹毒蛇', '蝰科', '咝蝰属', 'Bitis arietans', '体粗短肥胖，头大三角形，体背具深色人字纹', 3, '血液毒素', '重度', '草原、半荒漠、农田', '撒哈拉以南非洲、阿拉伯半岛南部', '无危'),
('三色矛头蝮', '蝰科', '矛头蝮属', 'Bothrops asper', '体色棕褐具深色三角形斑纹，美洲最大蛇伤负担物种', 3, '混合毒素', '重度', '热带雨林、农田、村庄附近', '墨西哥至南美洲西北部', '无危');


-- =============================================
-- 4. 完成验证
-- =============================================
SET FOREIGN_KEY_CHECKS = 1;

SELECT CONCAT('成功插入 ', COUNT(*), ' 条蛇类物种数据') AS result FROM `snake_info`;
