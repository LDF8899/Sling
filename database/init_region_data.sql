-- 区域初始化数据
-- 三级结构：大区(1) → 省/市(2) → 具体区域(3)

-- ============================================
-- 1. 大区（7个）
-- ============================================
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level) VALUES
('华东地区', NULL, 1, 119.00, 31.00, 5),
('华南地区', NULL, 1, 113.00, 23.00, 5),
('华中地区', NULL, 1, 112.00, 30.00, 5),
('华北地区', NULL, 1, 116.00, 40.00, 5),
('西南地区', NULL, 1, 104.00, 30.00, 5),
('西北地区', NULL, 1, 108.00, 36.00, 5),
('东北地区', NULL, 1, 125.00, 43.00, 5);

-- ============================================
-- 2. 省/市
-- ============================================

-- 华东地区
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '江苏', region_id, 2, 118.76, 32.06, 7 FROM region WHERE name='华东地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '浙江', region_id, 2, 120.15, 30.26, 7 FROM region WHERE name='华东地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '安徽', region_id, 2, 117.33, 31.73, 7 FROM region WHERE name='华东地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '福建', region_id, 2, 119.30, 26.08, 7 FROM region WHERE name='华东地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '江西', region_id, 2, 115.89, 28.68, 7 FROM region WHERE name='华东地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '山东', region_id, 2, 117.02, 36.67, 7 FROM region WHERE name='华东地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '上海', region_id, 2, 121.47, 31.23, 8 FROM region WHERE name='华东地区' AND level=1;

-- 华南地区
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '广东', region_id, 2, 113.26, 23.13, 7 FROM region WHERE name='华南地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '广西', region_id, 2, 108.32, 22.81, 7 FROM region WHERE name='华南地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '海南', region_id, 2, 110.35, 20.02, 7 FROM region WHERE name='华南地区' AND level=1;

-- 华中地区
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '湖北', region_id, 2, 114.34, 30.54, 7 FROM region WHERE name='华中地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '湖南', region_id, 2, 112.93, 28.22, 7 FROM region WHERE name='华中地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '河南', region_id, 2, 113.65, 34.76, 7 FROM region WHERE name='华中地区' AND level=1;

-- 华北地区
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '北京', region_id, 2, 116.40, 39.90, 8 FROM region WHERE name='华北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '天津', region_id, 2, 117.20, 39.13, 8 FROM region WHERE name='华北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '河北', region_id, 2, 114.51, 38.04, 7 FROM region WHERE name='华北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '山西', region_id, 2, 112.55, 37.87, 7 FROM region WHERE name='华北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '内蒙古', region_id, 2, 111.75, 40.84, 6 FROM region WHERE name='华北地区' AND level=1;

-- 西南地区
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '四川', region_id, 2, 104.06, 30.57, 7 FROM region WHERE name='西南地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '重庆', region_id, 2, 106.55, 29.56, 8 FROM region WHERE name='西南地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '贵州', region_id, 2, 106.71, 26.57, 7 FROM region WHERE name='西南地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '云南', region_id, 2, 102.71, 25.04, 7 FROM region WHERE name='西南地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '西藏', region_id, 2, 91.12, 29.65, 6 FROM region WHERE name='西南地区' AND level=1;

-- 西北地区
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '陕西', region_id, 2, 108.95, 34.27, 7 FROM region WHERE name='西北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '甘肃', region_id, 2, 103.83, 36.06, 7 FROM region WHERE name='西北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '青海', region_id, 2, 101.78, 36.62, 7 FROM region WHERE name='西北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '宁夏', region_id, 2, 106.27, 38.47, 7 FROM region WHERE name='西北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '新疆', region_id, 2, 87.62, 43.79, 6 FROM region WHERE name='西北地区' AND level=1;

-- 东北地区
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '辽宁', region_id, 2, 123.43, 41.80, 7 FROM region WHERE name='东北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '吉林', region_id, 2, 125.32, 43.90, 7 FROM region WHERE name='东北地区' AND level=1;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '黑龙江', region_id, 2, 126.66, 45.74, 7 FROM region WHERE name='东北地区' AND level=1;

-- ============================================
-- 3. 具体区域（蛇伤高发重点区域）
-- ============================================

-- 浙江
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '杭州西部山区', region_id, 3, 119.44, 30.05, 10 FROM region WHERE name='浙江' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '温州山区', region_id, 3, 120.69, 27.83, 10 FROM region WHERE name='浙江' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '丽水山区', region_id, 3, 119.91, 28.45, 10 FROM region WHERE name='浙江' AND level=2;

-- 福建
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '南平山区', region_id, 3, 118.17, 26.64, 10 FROM region WHERE name='福建' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '三明山区', region_id, 3, 117.61, 26.23, 10 FROM region WHERE name='福建' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '龙岩山区', region_id, 3, 117.02, 25.08, 10 FROM region WHERE name='福建' AND level=2;

-- 广东
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '梅州山区', region_id, 3, 116.12, 24.29, 10 FROM region WHERE name='广东' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '韶关山区', region_id, 3, 113.60, 24.81, 10 FROM region WHERE name='广东' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '清远山区', region_id, 3, 113.05, 23.68, 10 FROM region WHERE name='广东' AND level=2;

-- 广西
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '百色山区', region_id, 3, 106.62, 23.90, 10 FROM region WHERE name='广西' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '河池山区', region_id, 3, 108.06, 24.69, 10 FROM region WHERE name='广西' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '桂林山区', region_id, 3, 110.29, 25.27, 10 FROM region WHERE name='广西' AND level=2;

-- 湖南
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '湘西山区', region_id, 3, 109.74, 28.31, 10 FROM region WHERE name='湖南' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '张家界山区', region_id, 3, 110.48, 29.12, 10 FROM region WHERE name='湖南' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '邵阳山区', region_id, 3, 111.47, 27.24, 10 FROM region WHERE name='湖南' AND level=2;

-- 四川
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '凉山州', region_id, 3, 102.26, 27.89, 10 FROM region WHERE name='四川' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '宜宾山区', region_id, 3, 104.63, 28.77, 10 FROM region WHERE name='四川' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '泸州山区', region_id, 3, 105.44, 28.87, 10 FROM region WHERE name='四川' AND level=2;

-- 云南
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '西双版纳', region_id, 3, 100.80, 22.00, 10 FROM region WHERE name='云南' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '普洱山区', region_id, 3, 100.97, 22.78, 10 FROM region WHERE name='云南' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '红河州', region_id, 3, 103.37, 23.36, 10 FROM region WHERE name='云南' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '德宏州', region_id, 3, 98.58, 24.43, 10 FROM region WHERE name='云南' AND level=2;

-- 贵州
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '黔东南山区', region_id, 3, 107.98, 26.58, 10 FROM region WHERE name='贵州' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '铜仁山区', region_id, 3, 109.19, 27.72, 10 FROM region WHERE name='贵州' AND level=2;

-- 江西
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '赣州山区', region_id, 3, 114.94, 25.83, 10 FROM region WHERE name='江西' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '吉安山区', region_id, 3, 114.99, 27.09, 10 FROM region WHERE name='江西' AND level=2;

-- 安徽
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '黄山山区', region_id, 3, 118.17, 30.08, 10 FROM region WHERE name='安徽' AND level=2;
INSERT INTO region (name, parent_id, level, center_lng, center_lat, zoom_level)
SELECT '池州山区', region_id, 3, 117.49, 30.67, 10 FROM region WHERE name='安徽' AND level=2;

SELECT CONCAT('区域数据初始化完成，共 ', (SELECT COUNT(*) FROM region), ' 条记录') AS result;
