# 救助端功能开发记录

**日期**: 2026-05-18  
**分支**: 无（本地开发）

---

## 概述

新增救助端（救助调度系统），实现"用户端提交求助 → 救助端接收处理"的完整闭环。

---

## 一、后端改动

### 1. emergency-service（3 个文件）

| 文件 | 改动说明 |
|------|----------|
| `emergency-service/.../service/EmergencyHelpService.java` | 新增 5 个接口：`getEmergencyHelpList`（分页筛选）、`getEmergencyHelpCount`（计数）、`getEmergencyHelpStats`（状态统计）、`getLatestEmergencyHelps`（实时轮询）、`updateStatus`（状态更新） |
| `emergency-service/.../service/impl/EmergencyHelpServiceImpl.java` | 上述 5 个方法的实现，使用 MyBatis-Plus QueryWrapper |
| `emergency-service/.../controller/EmergencyHelpController.java` | 新增 4 个 API 端点 |

**新增 API**：

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/emergency/help/list?status=&type=&page=&size=` | 分页列表（支持状态/类型筛选） |
| GET | `/api/emergency/help/stats` | 各状态统计数 |
| GET | `/api/emergency/help/latest?since=` | 指定时间后的新求助（轮询用） |
| PUT | `/api/emergency/help/{id}/status?status=` | 更新求助状态 |

### 2. user-service（1 个文件）

| 文件 | 改动说明 |
|------|----------|
| `user-service/.../controller/UserController.java` | `/api/user/login` 接口改为接收 Map 参数，支持 `role` 字段；后端校验用户是否拥有所选角色 |

---

## 二、数据库改动

### role 表新增角色

```sql
INSERT INTO `role` VALUES (5, 'RESCUER', '救助人员，处理紧急求助调度', NOW());
```

增量脚本：`database/add_rescuer_role.sql`

### 测试账号

| 用户名 | 密码 | 角色 |
|--------|------|------|
| sos | sos123 | RESCUER（救助人员） |

---

## 三、前端改动

### 新建文件

| 文件 | 说明 |
|------|------|
| `vue3/src/views/RescueDashboard.vue` | 救助调度主页面，约 350 行 |
| `database/add_rescuer_role.sql` | 增量迁移脚本 |

### 修改文件

| 文件 | 改动说明 |
|------|----------|
| `vue3/src/views/Login.vue` | 新增三角色 Tab（普通用户/救助人员/管理员）；登录时传 `role` 字段；按所选 Tab 跳转不同页面 |
| `vue3/src/store/user.js` | 新增 `isRescuer` getter |
| `vue3/src/router/index.js` | 新增 `/rescue` 路由（requiresAdmin 放行 RESCUER）；路由守卫更新 |
| `vue3/src/views/Dashboard.vue` | 首页新增"救助调度"功能卡片；`routeMap` 新增 rescue |
| `vue3/src/services/api.js` | `emergencyApi` 新增 5 个救助端 API 方法 |
| `database/sling_complete.sql` | 新增 RESCUER 角色 INSERT |

---

## 四、功能详情

### RescueDashboard.vue 页面功能

- **统计卡片**：全部 / 待处理 / 处理中 / 已解决，点击可筛选列表
- **左侧列表**：分页求助列表，显示类型、位置、描述、时间
- **右侧详情**：选中求助完整信息 + 状态流转按钮
- **右侧地图**：高德地图标记求助位置分布
- **实时轮询**：每 5 秒拉取新求助，浏览器 Notification API 桌面通知
- **暗色模式**：完整深色主题支持

### 状态流转

```
待处理 (pending) → [接单处理] → 处理中 (processing) → [标记已解决] → 已解决 (resolved)
                                                      ← [重新打开] ←
```

### 角色登录流程

```
登录页 → 选择身份 Tab → 输入用户名密码 → 登录
                                            ↓
                 POST /api/user/login { username, password, role }
                                            ↓
                        后端校验: 用户存在? 密码正确? 拥有该角色?
                                            ↓
                    前端根据所选 Tab 跳转:
                      普通用户 → /dashboard
                      救助人员 → /rescue
                      管理员   → /admin
```

---

## 五、数据流

```
用户端 EmergencyForm → POST /api/emergency/help/submit → 数据库 (emergency_help)
                                                              ↓
救助端 RescueDashboard  ← GET /api/emergency/help/list   ← (轮询 5s)
                        ← PUT /api/emergency/help/{id}/status  (接单/解决)
```

---

## 六、修复的问题

1. `EmergencyHelpServiceImpl.java` 缺少 `import java.util.Map;` → 编译失败
2. `selectCount` 返回 `Long`，`(int)` 强转失败 → 改为 `.intValue()`
3. `EmergencyHelpController.java` 缺少 `import java.util.Date;`
