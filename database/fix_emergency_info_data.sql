-- ============================================
-- 补全 snake_emergency_info 空字段
-- 执行时间：2026-06-04
-- 目的：补全 forbidden_actions、serum_type、hospital_department、latin_name 字段
-- ============================================

USE sl;

-- 1. 更新拉丁学名 (latin_name)
UPDATE snake_emergency_info SET latin_name = 'Bungarus multicinctus' WHERE snake_name = '银环蛇';
UPDATE snake_emergency_info SET latin_name = 'Naja naja' WHERE snake_name = '眼镜蛇';
UPDATE snake_emergency_info SET latin_name = 'Ophiophagus hannah' WHERE snake_name = '眼镜王蛇';
UPDATE snake_emergency_info SET latin_name = 'Deinagkistrodon acutus' WHERE snake_name = '五步蛇';
UPDATE snake_emergency_info SET latin_name = 'Trimeresurus stejnegeri' WHERE snake_name = '竹叶青';
UPDATE snake_emergency_info SET latin_name = 'Gloydius brevicaudus' WHERE snake_name = '蝮蛇';
UPDATE snake_emergency_info SET latin_name = 'Ptyas dhumnades' WHERE snake_name = '乌梢蛇';
UPDATE snake_emergency_info SET latin_name = 'Elaphe carinata' WHERE snake_name = '王锦蛇';
UPDATE snake_emergency_info SET latin_name = 'Elaphe taeniura' WHERE snake_name = '菜花蛇';
UPDATE snake_emergency_info SET latin_name = 'Pantherophis guttatus' WHERE snake_name = '玉米蛇';
UPDATE snake_emergency_info SET latin_name = 'Oxyuranus microlepidotus' WHERE snake_name = '太攀蛇';
UPDATE snake_emergency_info SET latin_name = 'Lycodon rufozonatus' WHERE snake_name = '赤链蛇';
UPDATE snake_emergency_info SET latin_name = 'Vipera russelli' WHERE snake_name = '蝰蛇';
UPDATE snake_emergency_info SET latin_name = 'Heterodon nasicus' WHERE snake_name = '猪鼻蛇';
UPDATE snake_emergency_info SET latin_name = 'Oxyuranus scutellatus' WHERE snake_name = '海岸太攀蛇';

-- 2. 更新血清类型 (serum_type) - 仅限有毒蛇
UPDATE snake_emergency_info SET serum_type = '抗银环蛇毒血清' WHERE snake_name = '银环蛇';
UPDATE snake_emergency_info SET serum_type = '抗眼镜蛇毒血清' WHERE snake_name = '眼镜蛇';
UPDATE snake_emergency_info SET serum_type = '抗眼镜王蛇毒血清' WHERE snake_name = '眼镜王蛇';
UPDATE snake_emergency_info SET serum_type = '抗五步蛇毒血清' WHERE snake_name = '五步蛇';
UPDATE snake_emergency_info SET serum_type = '抗竹叶青蛇毒血清' WHERE snake_name = '竹叶青';
UPDATE snake_emergency_info SET serum_type = '抗蝮蛇毒血清' WHERE snake_name = '蝮蛇';
UPDATE snake_emergency_info SET serum_type = '抗太攀蛇毒血清' WHERE snake_name = '太攀蛇';
UPDATE snake_emergency_info SET serum_type = '抗蝰蛇毒血清' WHERE snake_name = '蝰蛇';
UPDATE snake_emergency_info SET serum_type = '抗海岸太攀蛇毒血清' WHERE snake_name = '海岸太攀蛇';
-- 无毒蛇/微毒蛇：不需要血清
UPDATE snake_emergency_info SET serum_type = '无需抗蛇毒血清' WHERE snake_name IN ('乌梢蛇', '王锦蛇', '菜花蛇', '玉米蛇', '赤链蛇', '猪鼻蛇');

-- 3. 更新建议科室 (hospital_department)
-- 有毒蛇：急诊科/蛇伤专科
UPDATE snake_emergency_info SET hospital_department = '急诊科、蛇伤专科' WHERE venom_type IN ('神经毒素', '血液毒素', '混合毒素');
-- 微毒蛇：急诊科
UPDATE snake_emergency_info SET hospital_department = '急诊科' WHERE snake_name IN ('赤链蛇', '猪鼻蛇');
-- 无毒蛇：普通外科/急诊科
UPDATE snake_emergency_info SET hospital_department = '普通外科或急诊科' WHERE snake_name IN ('乌梢蛇', '王锦蛇', '菜花蛇', '玉米蛇');

-- 4. 更新禁忌行为 (forbidden_actions) - 关键救命信息
-- 通用禁忌（所有蛇咬伤都适用）
UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口或试图放血
2. 不要用嘴吸毒（可能导致施救者中毒）
3. 不要冰敷伤口（会加重组织损伤）
4. 不要饮酒（加速毒液扩散）
5. 不要剧烈运动（加速血液循环）
6. 不要使用止血带（会导致肢体坏死）' WHERE snake_name = '银环蛇';

UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口或试图放血
2. 不要用嘴吸毒
3. 不要冰敷伤口
4. 不要饮酒
5. 不要剧烈运动
6. 不要使用止血带
7. 不要涂抹草药（可能加重感染）' WHERE snake_name = '眼镜蛇';

UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口或试图放血
2. 不要用嘴吸毒
3. 不要冰敷伤口
4. 不要饮酒
5. 不要剧烈运动
6. 不要使用止血带
7. 眼镜王蛇毒性强，不要试图捕捉或杀死蛇' WHERE snake_name = '眼镜王蛇';

UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口（五步蛇毒素会导致出血不止）
2. 不要用嘴吸毒
3. 不要冰敷伤口
4. 不要饮酒
5. 不要剧烈运动
6. 不要使用止血带（会加重出血）
7. 不要使用阿司匹林等抗凝血药物' WHERE snake_name = '五步蛇';

UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口或试图放血
2. 不要用嘴吸毒
3. 不要冰敷伤口（竹叶青咬伤可冷敷，但不要直接接触皮肤）
4. 不要饮酒
5. 不要剧烈运动
6. 不要使用止血带' WHERE snake_name = '竹叶青';

UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口或试图放血
2. 不要用嘴吸毒
3. 不要冰敷伤口
4. 不要饮酒
5. 不要剧烈运动
6. 不要使用止血带' WHERE snake_name = '蝮蛇';

UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口或试图放血
2. 不要用嘴吸毒
3. 不要冰敷伤口
4. 不要饮酒
5. 不要剧烈运动
6. 不要使用止血带
7. 太攀蛇毒性极强，不要试图捕捉或杀死蛇' WHERE snake_name = '太攀蛇';

UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口或试图放血
2. 不要用嘴吸毒
3. 不要冰敷伤口
4. 不要饮酒
5. 不要剧烈运动
6. 不要使用止血带' WHERE snake_name = '蝰蛇';

UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口或试图放血
2. 不要用嘴吸毒
3. 不要冰敷伤口
4. 不要饮酒
5. 不要剧烈运动
6. 不要使用止血带
7. 海岸太攀蛇毒性极强，不要试图捕捉或杀死蛇' WHERE snake_name = '海岸太攀蛇';

-- 无毒蛇/微毒蛇的禁忌
UPDATE snake_emergency_info SET forbidden_actions = '1. 不要过度挤压伤口（可能导致感染扩散）
2. 不要使用未经消毒的工具处理伤口' WHERE snake_name IN ('乌梢蛇', '王锦蛇', '菜花蛇', '玉米蛇');

UPDATE snake_emergency_info SET forbidden_actions = '1. 不要过度挤压伤口
2. 不要使用未经消毒的工具处理伤口
3. 微毒蛇咬伤一般无需特殊处理，但需观察过敏反应' WHERE snake_name IN ('赤链蛇', '猪鼻蛇');

-- 5. 更新无毒蛇的 venom_type
UPDATE snake_emergency_info SET venom_type = '无毒' WHERE snake_name IN ('乌梢蛇', '王锦蛇', '菜花蛇', '玉米蛇');

-- 验证更新结果
SELECT
    snake_name,
    venom_type,
    latin_name,
    serum_type,
    hospital_department,
    CASE
        WHEN forbidden_actions IS NOT NULL THEN '已填充'
        ELSE 'NULL'
    END AS forbidden_actions_status
FROM snake_emergency_info
ORDER BY id;
