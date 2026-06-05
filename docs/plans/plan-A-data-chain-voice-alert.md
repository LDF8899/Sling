# 方案A+B 实施计划书

> 识别→急救→医院数据链打通 + 声音警报

**创建时间**: 2026-06-04
**预计工期**: 10-12 天
**目标**: 让用户拍照识别蛇后，自动展示急救信息、血清匹配、有血清的医院，并在救助端收到求助时发出声音警报

---

## 一、当前问题

### 1.1 数据链断裂

```
用户拍照 → AI识别返回蛇名 → ❌ 到这里就断了
                                    ↓ 没有关联
                         snake_emergency_info（急救信息）
                         snake_serum_match（血清匹配）
                         serum_inventory + hospital_info（有血清的医院）
```

**现状**：
- `recognition-service` 识别后只返回 AI 的 markdown 文本，没有调用其他服务
- `RecognitionRecord.snakeId` 字段始终为 null，识别结果和 snake_info 没有关联
- 用户识别后看不到急救信息、血清匹配、推荐医院

### 1.2 救助端缺乏声音警报

**现状**：
- 救助端采用 5 秒轮询 + 浏览器 Notification
- 没有声音提醒，救命信息可能被忽略
- 求助详情没有携带用户的识别信息

### 1.3 数据不完整

**现状**：
- `snake_emergency_info` 表有 4 个字段全是 NULL：`forbidden_actions`、`serum_type`、`hospital_department`、`latin_name`
- 只有 15 条急救信息，覆盖不全

---

## 二、改动清单

### 2.1 后端：各服务提供查询接口

| 服务 | 新增接口 | 说明 |
|------|----------|------|
| snake-info-service | `GET /api/snake-info/by-name/{name}` | 按蛇名查蛇类信息 |
| emergency-service | `GET /api/emergency/guide/by-snake/{snakeName}` | 按蛇名查急救信息 |
| hospital-service | `GET /api/hospital/with-serum/{snakeId}` | 查有该蛇血清的医院列表 |

### 2.2 后端：recognition-service 新增 Feign 调用

**新增文件**：
- `SnakeInfoFeignClient.java` — 调用 snake-info-service 查蛇类信息
- `EmergencyFeignClient.java` — 调用 emergency-service 查急救信息
- `HospitalFeignClient.java` — 调用 hospital-service 查血清医院

**修改 `RecognitionServiceImpl.identifySnake`**：
- 识别后自动关联数据
- 返回 `RecognitionVO` 包含：AI原始文本 + 蛇类百科 + 急救信息 + 医院列表

### 2.3 前端：识别结果页改造

**小程序端 `recognition.vue`**：识别成功后展示卡片链

```
┌─────────────────────────────────┐
│  🔍 识别结果：银环蛇            │
│  置信度：95% | 剧毒              │
├─────────────────────────────────┤
│  ⚠️ 急救信息                     │
│  毒液类型：神经毒素              │
│  症状：呼吸困难、眼睑下垂...     │
│  急救措施：1.保持冷静 2.制动...  │
│  ❌ 禁忌：不要切开伤口...        │
├─────────────────────────────────┤
│  💉 需要血清：抗银环蛇毒血清     │
├─────────────────────────────────┤
│  🏥 附近有血清的医院             │
│  ┌─────────────────────────┐    │
│  │ 遵义医科大学第二附属医院  │    │
│  │ 库存：10支 | 距离：3.2km │    │
│  │ [一键导航] [拨打电话]    │    │
│  └─────────────────────────┘    │
├─────────────────────────────────┤
│  🆘 [紧急求助] 按钮             │
└─────────────────────────────────┘
```

### 2.4 求助提交时携带识别信息

**修改 `EmergencyHelp` 实体**，新增字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `snake_name` | varchar(100) | 识别出的蛇名 |
| `snake_id` | bigint | 关联 snake_info |
| `recognition_record_id` | bigint | 关联识别记录 |
| `toxicity_level` | int | 毒性等级（方便救助端快速判断） |

### 2.5 救助端：声音警报 + 详情增强

**声音警报**：
- 在 `public/` 目录下添加音频文件：`alert-urgent.mp3`（蛇咬伤）、`alert-normal.mp3`（普通求助）
- 新求助到达时播放对应声音
- 蛇咬伤求助 = 最大音量 + 急促警报

**详情面板增强**：
- 展示识别信息：蛇种、毒性、识别时间、置信度
- 展示推荐血清：血清类型 + 有库存的医院
- 展示急救要点：症状、急救措施、禁忌

### 2.6 后端：求助接口返回关联数据

**修改 `EmergencyHelpController.getDetail`**：
- 如果有关联的识别记录，查询完整信息
- 返回 `EmergencyDetailVO` 包含：求助信息 + 蛇类信息 + 医院列表

---

## 三、数据补全（必须先做）

在实施上述功能前，需要先补全 `snake_emergency_info` 的空字段：

```sql
-- 更新 forbidden_actions（禁忌行为）
UPDATE snake_emergency_info SET forbidden_actions = '1. 不要切开伤口\n2. 不要用嘴吸毒\n3. 不要冰敷\n4. 不要饮酒' 
WHERE snake_name IN ('银环蛇','眼镜蛇','眼镜王蛇','五步蛇','竹叶青','蝮蛇');

-- 更新 serum_type（血清类型）
UPDATE snake_emergency_info SET serum_type = '抗银环蛇毒血清' WHERE snake_name = '银环蛇';
UPDATE snake_emergency_info SET serum_type = '抗眼镜蛇毒血清' WHERE snake_name = '眼镜蛇';
-- ... 其余蛇种

-- 更新 hospital_department（建议科室）
UPDATE snake_emergency_info SET hospital_department = '急诊科/蛇伤专科' WHERE venom_type IS NOT NULL;
```

---

## 四、实施顺序

| 优先级 | 任务 | 预计工期 | 依赖 |
|--------|------|----------|------|
| P0 | 补全 snake_emergency_info 数据 | 1天 | 无 |
| P1 | 各服务提供查询接口 | 2天 | 无 |
| P1 | recognition-service 新增 Feign 调用 | 2天 | P1 |
| P1 | 前端识别结果页改造 | 2天 | P1 |
| P2 | 求助实体新增字段 + 提交改造 | 1天 | P1 |
| P2 | 救助端详情面板增强 | 2天 | P2 |
| P3 | 声音警报 + 通知增强 | 1天 | 无 |

**总工期：约 10-12 天**

---

## 五、技术要点

### 5.1 Feign 调用配置

在 `recognition-service` 的 `pom.xml` 中添加：
```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-openfeign</artifactId>
</dependency>
```

在启动类添加 `@EnableFeignClients` 注解。

### 5.2 声音警报实现

```javascript
// 新求助到达时
const playAlert = (type) => {
  const audio = new Audio()
  if (type === 'snake_bite') {
    audio.src = '/alert-urgent.mp3'  // 蛇咬伤 = 急促警报
    audio.volume = 1.0               // 最大音量
  } else {
    audio.src = '/alert-normal.mp3'  // 普通求助
    audio.volume = 0.7
  }
  audio.play()
}
```

### 5.3 前端卡片组件

识别结果页需要新增组件：
- `SnakeInfoCard.vue` — 蛇类信息卡片
- `EmergencyInfoCard.vue` — 急救信息卡片
- `HospitalListCard.vue` — 医院列表卡片

---

## 六、验收标准

1. **识别结果页**：拍照识别后，自动展示蛇类信息、急救信息、血清匹配、有血清的医院列表
2. **求助提交**：提交求助时自动携带识别信息（蛇名、毒性、识别记录ID）
3. **救助端详情**：查看求助详情时，能看到用户的识别信息、推荐血清、急救要点
4. **声音警报**：新求助到达时播放声音，蛇咬伤求助使用急促警报
5. **浏览器通知**：新求助到达时弹出系统通知，蛇咬伤求助通知不自动关闭
