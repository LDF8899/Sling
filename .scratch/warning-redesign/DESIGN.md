# 预警系统重构设计

## 一、需求总结

| 维度 | 决策 |
|------|------|
| 救助端页面 | 融合到现有 RescueDashboard，增加预警管理 Tab |
| 角色权限 | 护林员：高危标记；医护：血清记录；两方都能查看，编辑需二级密码 |
| 二级密码 | 按角色共享（护林员一个密码，医护一个密码），系统配置 |
| 区域层级 | 三级：大区 → 省/市 → 具体区域，全部自建 |
| 血清记录 | 区域+医院关联（某区域附近的医院有哪些血清库存） |
| 用户端 | 自动定位 + 手动选择地区，两者结合 |

---

## 二、用户端（/warning）交互流程

```
用户打开 /warning
  │
  ├─ 自动获取 GPS 定位
  │   ├─ 调用 checkProximity → 命中预警区域 → 顶部高亮警告
  │   └─ 地图中心定位到当前位置，显示周边预警区域
  │
  └─ 或手动选择地区（大区 → 省/市 → 具体区域）
      └─ 地图跳转到选中区域，显示该区域所有预警
```

**页面布局：**
- 左侧：地区选择器（三级联动）+ 当前区域危险等级卡片
- 右侧：地图（AMap），显示预警区域多边形、标记点
- 底部/弹窗：预警详情（蛇种、防护建议、附近血清库存）

---

## 三、救助端（RescueDashboard）交互流程

```
护林员/医护登录 → /rescue
  │
  ├─ Tab 1: 求助调度（现有功能，不变）
  │
  └─ Tab 2: 预警管理（新增）
      │
      ├─ 左侧：三级区域树（大区 → 省/市 → 具体区域）
      │   └─ 点击某区域 → 右侧地图定位到该区域
      │
      ├─ 右侧：地图 + 操作面板
      │   ├─ 查看模式：显示该区域所有预警多边形
      │   └─ 编辑模式（需二级密码）：
      │       ├─ 护林员：绘制/编辑预警区域、设置危险等级、标记蛇种
      │       └─ 医护人员：管理该区域关联医院的血清库存
      │
      └─ 底部：预警记录时间线
```

---

## 四、数据库设计

### 4.1 新增表：region（区域层级）

```sql
CREATE TABLE `region` (
  `region_id`    BIGINT NOT NULL AUTO_INCREMENT,
  `name`         VARCHAR(50) NOT NULL COMMENT '区域名称',
  `parent_id`    BIGINT DEFAULT NULL COMMENT '父区域ID，NULL表示顶级大区',
  `level`        TINYINT NOT NULL COMMENT '层级：1=大区, 2=省/市, 3=具体区域',
  `center_lng`   DECIMAL(10,6) DEFAULT NULL COMMENT '中心经度',
  `center_lat`   DECIMAL(10,6) DEFAULT NULL COMMENT '中心纬度',
  `zoom_level`   INT DEFAULT 10 COMMENT '地图缩放级别',
  `create_time`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`region_id`),
  KEY `idx_parent` (`parent_id`),
  FOREIGN KEY (`parent_id`) REFERENCES `region`(`region_id`)
) COMMENT='区域层级表';
```

### 4.2 新增表：serum_inventory（血清库存）

```sql
CREATE TABLE `serum_inventory` (
  `inventory_id`  BIGINT NOT NULL AUTO_INCREMENT,
  `hospital_id`   BIGINT NOT NULL COMMENT '医院ID',
  `region_id`     BIGINT NOT NULL COMMENT '关联区域ID（具体区域）',
  `snake_id`      BIGINT DEFAULT NULL COMMENT '对应蛇种（NULL表示通用血清）',
  `serum_name`    VARCHAR(100) NOT NULL COMMENT '血清名称',
  `stock_count`   INT DEFAULT 0 COMMENT '库存数量',
  `expiry_date`   DATE DEFAULT NULL COMMENT '有效期',
  `updated_by`    BIGINT DEFAULT NULL COMMENT '更新人ID',
  `update_time`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  KEY `idx_region` (`region_id`),
  KEY `idx_hospital` (`hospital_id`)
) COMMENT='血清库存表（区域+医院关联）';
```

### 4.3 新增表：rescuer_secondary_password（二级密码）

```sql
CREATE TABLE `rescuer_secondary_password` (
  `id`          BIGINT NOT NULL AUTO_INCREMENT,
  `role`        VARCHAR(20) NOT NULL COMMENT '角色：forester / medic',
  `password`    VARCHAR(255) NOT NULL COMMENT '加密后的密码',
  `create_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `update_time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_role` (`role`)
) COMMENT='救助端二级密码（按角色共享）';
```

### 4.4 修改表：warning_area（增加区域关联）

```sql
ALTER TABLE `warning_area`
  ADD COLUMN `region_id` BIGINT DEFAULT NULL COMMENT '关联区域ID（具体区域）' AFTER `area_name`,
  ADD COLUMN `created_by` BIGINT DEFAULT NULL COMMENT '创建人ID' AFTER `create_time`,
  ADD COLUMN `creator_role` VARCHAR(20) DEFAULT NULL COMMENT '创建人角色：forester/medic' AFTER `created_by`,
  ADD COLUMN `updated_at` TIMESTAMP NULL COMMENT '最后更新时间' AFTER `creator_role`;

ALTER TABLE `warning_area`
  ADD KEY `idx_region` (`region_id`);
```

---

## 五、API 设计

### 5.1 区域管理 API（新增）

```
GET    /api/rescue/regions                    # 获取区域树（全部或指定层级）
POST   /api/rescue/regions                    # 创建区域
PUT    /api/rescue/regions/{id}               # 更新区域
DELETE /api/rescue/regions/{id}               # 删除区域
```

### 5.2 预警区域 API（增强现有）

```
GET    /api/rescue/warning/areas?regionId=xx  # 获取某区域下的预警区域
POST   /api/rescue/warning/areas              # 创建预警区域（含绘制的多边形）
PUT    /api/rescue/warning/areas/{id}         # 更新预警区域
DELETE /api/rescue/warning/areas/{id}         # 删除预警区域
POST   /api/rescue/warning/verify-password    # 验证二级密码
```

### 5.3 血清库存 API（新增）

```
GET    /api/rescue/serum?regionId=xx          # 获取某区域的血清库存
POST   /api/rescue/serum                      # 新增血清记录
PUT    /api/rescue/serum/{id}                 # 更新血清记录
DELETE /api/rescue/serum/{id}                 # 删除血清记录
```

### 5.4 用户端 API（增强现有）

```
GET    /api/warning/region-tree               # 获取区域树（供用户选择地区）
GET    /api/warning/by-region?regionId=xx     # 获取某区域的预警信息
GET    /api/warning/serum-nearby?regionId=xx  # 获取某区域附近血清库存
# check-proximity, active-area/map 等现有接口不变
```

---

## 六、前端页面设计

### 6.1 RescueDashboard 重构

```
┌─────────────────────────────────────────────────────┐
│  救助端控制台                          [护林员/医护] │
├──────────┬──────────────────────────────────────────┤
│          │                                          │
│  Tab:    │  求助调度（现有功能）                     │
│  ┌────┐  │                                          │
│  │调度│  ├──────────────────────────────────────────┤
│  ├────┤  │                                          │
│  │预警│  │  预警管理                                 │
│  └────┘  │  ┌──────────┬───────────────────────────┤
│          │  │ 区域树    │  地图（AMap）              │
│          │  │          │                           │
│          │  │ ▼ 华南    │  ┌─────────────────────┐  │
│          │  │  ▼ 广东   │  │                     │  │
│          │  │   深圳    │  │   预警多边形 + 标记  │  │
│          │  │   广州    │  │                     │  │
│          │  │  ▼ 广西   │  │                     │  │
│          │  │   南宁    │  └─────────────────────┘  │
│          │  │          │                           │
│          │  │ [+新建]  │  操作面板：                │
│          │  │          │  [绘制区域] [标记高危]     │
│          │  │          │  [血清管理] [预警记录]     │
│          │  └──────────┴───────────────────────────┤
│          │  底部：预警记录时间线                     │
└──────────┴──────────────────────────────────────────┘
```

**关键交互：**
1. 二级密码验证：点击编辑类操作时弹出密码输入框，验证通过后 30 分钟内免重复输入
2. 地图绘制：使用 AMap.MouseTool 绘制多边形，保存为 GeoJSON
3. 角色差异化：护林员看到「标记高危」按钮，医护人员看到「血清管理」按钮，但都能查看全部信息

### 6.2 用户端 /warning 重构

```
┌─────────────────────────────────────────────────────┐
│  蛇类风险预警                                        │
├──────────┬──────────────────────────────────────────┤
│ 地区选择 │  地图（AMap）                             │
│          │                                          │
│ [华南 ▼] │  ┌──────────────────────────────────┐    │
│ [广东 ▼] │  │                                  │    │
│ [深圳 ▼] │  │   预警多边形（红/橙/黄/绿）       │    │
│          │  │   ● 当前位置                      │    │
│ ──────── │  │                                  │    │
│ 当前区域  │  └──────────────────────────────────┘    │
│ 危险等级  │                                          │
│ ┌──────┐ │  预警详情卡片：                           │
│ │ ■ 高危│ │  区域名 / 蛇种 / 防护建议                │
│ │ 眼镜蛇│ │  附近血清：XX医院（3km）有抗眼镜蛇血清   │
│ │ 银环蛇│ │                                          │
│ └──────┘ │                                          │
└──────────┴──────────────────────────────────────────┘
```

---

## 七、实现步骤（建议顺序）

| 步骤 | 内容 | 涉及文件 |
|------|------|----------|
| 1 | 数据库：创建 region、serum_inventory、rescuer_secondary_password 表，修改 warning_area | sling_complete.sql |
| 2 | 后端：Region 实体/Mapper/Service/Controller | warning-service 新增 |
| 3 | 后端：SerumInventory 实体/Mapper/Service/Controller | warning-service 新增 |
| 4 | 后端：二级密码验证接口 | warning-service 新增 |
| 5 | 后端：增强 WarningAdminController（增加 regionId 筛选） | warning-service 修改 |
| 6 | 后端：用户端新增 region-tree 和 by-region 接口 | warning-service 修改 |
| 7 | 前端 API：新增 rescueRegionApi、rescueSerumApi | api.js |
| 8 | 前端：RescueDashboard 重构（增加预警管理 Tab） | RescueDashboard.vue |
| 9 | 前端：/warning 重构（地区选择器 + 定位结合） | Warning.vue |
| 10 | 前端：WarningAlert 组件适配新数据结构 | WarningAlert.vue |

**备注：**
- 现有 warning_area 的 4 条 seed 数据清空，全部通过新系统重建
- 实现顺序：全链路逐步推进（数据库 → 后端 → 前端）
