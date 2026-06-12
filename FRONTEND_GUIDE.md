# 🐍 蛇灵 SLING — 前端开发指南

> 给前端优化同事的快速上手文档，涵盖项目概况、页面导航、API 导航、设计系统和关键文件索引。

---

## 一、项目概况

**蛇灵（SLING）** 是一个智能蛇类安全助手平台，核心功能包括：蛇类 AI 识别、急救指南、附近有蛇毒血清的医院查找、蛇类风险预警、SOS 紧急求助。

### 架构总览

```
┌─────────────────────────────────────────────────────────┐
│                      前端层                              │
│  ┌──────────────────┐   ┌─────────────────────────────┐ │
│  │  Uni-app 移动端    │   │  Vue 3 Web SPA              │ │
│  │  (微信小程序/H5)   │   │  (C端用户 + Admin管理后台)   │ │
│  │  端口: 微信开发者工具│   │  端口: 3000                 │ │
│  └────────┬─────────┘   └──────────┬──────────────────┘ │
└───────────┼─────────────────────────┼────────────────────┘
            │                         │
            ▼                         ▼
┌─────────────────────────────────────────────────────────┐
│              Snake Gateway（网关）端口: 8888              │
│              统一路由，JWT 鉴权                           │
└─────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│                   后端微服务层                            │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│  │ user-service │ │ snake-info   │ │ recognition      │ │
│  │ 端口 7006    │ │ 端口 7002    │ │ 端口 7003        │ │
│  └──────────────┘ └──────────────┘ └──────────────────┘ │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────────┐ │
│  │ hospital     │ │ emergency    │ │ warning          │ │
│  │ 端口 8089    │ │ 端口 9093    │ │ 端口 7005        │ │
│  └──────────────┘ └──────────────┘ └──────────────────┘ │
│  ┌──────────────┐ ┌──────────────┐                      │
│  │ admin        │ │ agent        │                      │
│  │ 端口 8092    │ │ 端口 7010    │                      │
│  └──────────────┘ └──────────────┘                      │
└─────────────────────────────────────────────────────────┘
```

### 技术栈速查

| 层面 | Uni-app 移动端 | Vue 3 Web |
|------|---------------|-----------|
| 框架 | Uni-app (Vue 3 Composition API) | Vue 3.5 (`<script setup>`) |
| 构建 | Vite + @dcloudio/vite-plugin-uni | Vite (rolldown-vite 7.2) |
| UI 库 | 自定义 CSS 组件 | Element Plus 2.14 |
| 状态管理 | Pinia + persistedstate | Pinia 3.0 + persistedstate |
| HTTP | uni.request（原生） | axios |
| 路由 | pages.json 声明式 | vue-router 4.6 |
| 特殊依赖 | — | three.js, cytoscape, AMap, mediapipe, STOMP/WebSocket |
| 设计风格 | 毛玻璃(Glassmorphism) | 杉林溪水 Design Token + 日夜切换 |

---

## 二、页面导航地图

### 2.1 Uni-app 移动端（10 个页面 + 5 Tab）

**底部 Tab 栏：**

| Tab | 页面路径 | 图标 | 功能 |
|-----|---------|------|------|
| 🏠 首页 | `pages/index/index` | home | 首页仪表盘，功能入口 |
| 📷 识别 | `pages/recognition/recognition` | scan | 拍照/选图 AI 识别蛇类 |
| 🏥 应急 | `pages/emergency/emergency` | first-aid | 急救指南、AI 问答、伤口分析 |
| 🗺 医院 | `pages/hospital/hospital` | hospital | 附近有蛇毒血清的医院地图 |
| 👤 我的 | `pages/profile/profile` | user | 个人中心、收藏、设置 |

**非 Tab 页面（通过点击跳转）：**

| 页面路径 | 功能 |
|---------|------|
| `pages/login/login` | 登录/注册 |
| `pages/warning/warning` | 预警信息详情（从首页进入） |
| `pages/exhibition/exhibition` | 科普展览（从首页进入） |
| `pages/favorites/favorites` | 我的收藏（从个人中心进入） |
| `pages/snake-detail/snake-detail` | 蛇类详情（从识别结果/百科进入） |

**导航组件：**
- 自定义毛玻璃导航栏：`Uni-app/components/GlassNavbar.vue`
- Tab 栏配置：`Uni-app/pages.json` → `tabBar` 字段

---

### 2.2 Vue 3 Web — C 端用户页面（9 个路由）

**布局结构：** `CAppLayout` = 顶部导航栏(CAppNavbar) + 内容区 + 侧边工具(CAppSideTools) + 底部(CAppFooter)

| 路由 | 组件文件 | 功能 |
|------|---------|------|
| `/dashboard` | `views/Dashboard.vue` | C 端首页仪表盘 |
| `/recognition` | `views/Recognition.vue` | 蛇类识别（上传图片） |
| `/warning` | `views/Warning.vue` | 风险预警地图 |
| `/emergency` | `views/Emergency.vue` | 急救指南 + SOS 求助 |
| `/hospital` | `views/HospitalMapView.vue` | 医院地图（高德地图） |
| `/graph` | `views/KnowledgeGraph.vue` | 蛇类知识图谱（cytoscape） |
| `/profile` | `views/Profile.vue` | 个人中心 |
| `/rescue` | `views/RescueDashboard.vue` | 救助调度中心（需管理员权限） |

**公共页面（无需登录）：**

| 路由 | 组件文件 | 功能 |
|------|---------|------|
| `/login` | `views/Login.vue` | 登录 |
| `/register` | `views/Register.vue` | 注册 |
| `/forgot-password` | `views/ForgotPassword.vue` | 忘记密码 |

**导航组件文件：**

| 文件 | 功能 |
|------|------|
| `components/layout/CAppLayout.vue` | C 端整体布局（日夜主题切换） |
| `components/layout/CAppNavbar.vue` | 顶部导航栏（Logo + SOS 按钮 + 主题切换 + 用户菜单） |
| `components/layout/CAppFooter.vue` | 底部链接 |
| `components/layout/CAppSideTools.vue` | 右侧浮动工具（主题切换 + SOS） |

---

### 2.3 Vue 3 Web — Admin 管理后台（11 个路由）

**布局结构：** `AdminLayout` = 左侧深绿侧边栏(240px) + 顶部面包屑栏 + 内容区

| 路由 | 组件文件 | 功能 |
|------|---------|------|
| `/admin` | `views/AdminDashboard.vue` | 管理仪表盘（统计概览） |
| `/admin/users` | `views/admin/UserManagement.vue` | C 端用户管理 |
| `/admin/admins` | `views/admin/AdminUserManagement.vue` | 管理员账号管理 |
| `/admin/snakes` | `views/admin/SnakeManagement.vue` | 蛇类百科数据管理 |
| `/admin/emergency` | `views/admin/EmergencyInfoManagement.vue` | 急救信息管理 |
| `/admin/hospitals` | `views/admin/HospitalManagement.vue` | 医院管理 |
| `/admin/warnings` | `views/admin/WarningManagement.vue` | 预警区域管理 |
| `/admin/sos` | `views/admin/SOSManagement.vue` | SOS 求助处理 |
| `/admin/config` | `views/admin/SystemConfig.vue` | 系统配置 |
| `/admin/logs` | `views/admin/LogManagement.vue` | 操作日志 |
| `/admin/serum` | `views/admin/SerumSupplyChain.vue` | 血清供应链 |

**侧边栏菜单结构：**

```
🐍 蛇灵管理
├── 📊 概览
│   └── 仪表盘
├── 👥 用户管理
│   ├── C端用户
│   └── 管理员
├── 📚 数据管理
│   ├── 蛇类百科
│   ├── 急救信息
│   ├── 医院管理
│   └── 预警管理
├── 🚨 应急处理
│   └── SOS求助
└── ⚙️ 系统
    ├── 系统配置
    └── 操作日志
```

---

## 三、API 导航

> 所有请求通过 Gateway (`/api/**`) 路由到对应微服务。
> Uni-app 直接请求 `http://{IP}:8888`，Vue 3 通过 Vite proxy 转发到 `localhost:8888`。

### 3.1 按模块分类的 API 速查表

#### 🔐 用户认证 (user-service)

| 方法 | 路径 | 说明 | 使用端 |
|------|------|------|--------|
| POST | `/api/user/login` | 用户登录 | Uni-app / Vue3 |
| POST | `/api/user/register` | 用户注册 | Uni-app / Vue3 |
| POST | `/api/user/wechat-login` | 微信小程序登录 | Uni-app |
| POST | `/api/user/admin/login` | 管理员登录 | Uni-app / Vue3 |
| GET | `/api/user/info/{id}` | 获取用户信息 | Uni-app / Vue3 |
| PUT | `/api/user/update` | 更新用户资料 | Uni-app / Vue3 |
| PUT | `/api/user/change-password` | 修改密码 | Uni-app / Vue3 |
| POST | `/api/user/upload-avatar` | 上传头像（multipart） | Uni-app |
| POST | `/api/user/avatar/upload` | 上传头像（Vue3 路径） | Vue3 |
| GET | `/api/user/list` | 用户列表（分页） | Vue3 Admin |
| POST | `/api/user/create` | 创建用户 | Vue3 Admin |
| DELETE | `/api/user/delete/{id}` | 删除用户 | Vue3 Admin |
| POST | `/api/user/batch-delete` | 批量删除用户 | Vue3 Admin |
| GET | `/api/user/roles` | 获取所有角色 | Vue3 Admin |
| GET | `/api/user/roles/{userId}` | 获取用户角色 | Vue3 |
| POST | `/api/user/assign-roles` | 分配角色 | Vue3 Admin |
| GET | `/api/user/permissions/{userId}` | 获取用户权限 | Vue3 |

#### 🐍 蛇类信息 (snake-info-service)

| 方法 | 路径 | 说明 | 使用端 |
|------|------|------|--------|
| GET | `/snake/list` | 所有蛇类列表 | 公开 |
| GET | `/snake/{id}` | 按 ID 获取蛇类 | 公开 |
| GET | `/snake/by-name/{name}` | 按名称精确查询 | 公开 |
| GET | `/snake/search` | 模糊搜索蛇类 | 公开 |
| GET | `/snake/toxicity/{level}` | 按毒性等级筛选 | 公开 |
| GET | `/snake/conservation/{status}` | 按保护等级筛选 | 公开 |
| GET | `/snake/graph/overview` | 知识图谱概览 | Vue3 |
| GET | `/snake/graph/family/{family}` | 科属子图谱 | Vue3 |
| GET | `/snake/graph/full` | 完整知识图谱 | Vue3 |
| GET | `/snake/graph/detail/{id}` | 单条蛇详情图谱 | Vue3 |
| GET | `/api/snake/admin/list` | 蛇类管理列表（分页） | Vue3 Admin |
| GET | `/api/snake/admin/count` | 蛇类总数 | Vue3 Admin |
| GET | `/api/snake/admin/families` | 科属列表 | Vue3 Admin |
| POST | `/api/snake/admin` | 新增蛇类 | Vue3 Admin |
| PUT | `/api/snake/admin/{id}` | 更新蛇类 | Vue3 Admin |
| DELETE | `/api/snake/admin/{id}` | 删除蛇类 | Vue3 Admin |
| GET | `/api/snake/admin/emergency/list` | 急救信息列表 | Vue3 Admin |
| POST | `/api/snake/admin/emergency` | 新增急救信息 | Vue3 Admin |
| PUT | `/api/snake/admin/emergency/{id}` | 更新急救信息 | Vue3 Admin |
| DELETE | `/api/snake/admin/emergency/{id}` | 删除急救信息 | Vue3 Admin |

#### 📷 蛇类识别 (recognition-service)

| 方法 | 路径 | 说明 | 使用端 |
|------|------|------|--------|
| POST | `/api/recognition/identify` | AI 识别蛇类（基础结果） | Uni-app / Vue3 |
| POST | `/api/recognition/identify-full` | AI 识别（完整：蛇信息+急救+医院） | Uni-app |
| GET | `/api/recognition/records/user/{userId}` | 用户识别记录 | Uni-app / Vue3 |
| GET | `/api/recognition/records/user/{userId}/count` | 用户识别次数 | Vue3 |

#### 🚨 应急急救 (emergency-service)

| 方法 | 路径 | 说明 | 使用端 |
|------|------|------|--------|
| GET | `/api/emergency/guide/{snakeName}` | 按蛇名查急救指南 | Uni-app / Vue3 |
| GET | `/api/emergency/guide/details/{snakeName}` | 蛇类详细信息 | Uni-app / Vue3 |
| GET | `/api/emergency/guide/list` | 所有急救指南 | Uni-app |
| POST | `/api/emergency/guide/ask` | AI 急救问答 | Uni-app / Vue3 |
| POST | `/api/emergency/guide/by-symptoms` | 按症状匹配蛇种 | Vue3 |
| POST | `/api/emergency/image/analyze` | AI 伤口图片分析 | Uni-app / Vue3 |
| POST | `/api/emergency/help/submit` | 提交 SOS 求助 | Uni-app / Vue3 |
| GET | `/api/emergency/help/history` | SOS 历史记录 | Vue3 |
| GET | `/api/emergency/help/detail/{id}` | SOS 详情 | Vue3 Admin |
| GET | `/api/emergency/help/list` | SOS 列表（分页） | Vue3 Admin |
| GET | `/api/emergency/help/stats` | SOS 统计 | Vue3 Admin |
| GET | `/api/emergency/help/latest` | 最新 SOS（轮询） | Vue3 |
| PUT | `/api/emergency/help/{id}/status` | 更新 SOS 状态 | Vue3 Admin |
| POST | `/api/emergency/help/alert/{id}` | 触发告警 | Vue3 Admin |

#### 🏥 医院服务 (hospital-service)

| 方法 | 路径 | 说明 | 使用端 |
|------|------|------|--------|
| POST | `/api/hospital/search` | 搜索附近医院 | Uni-app / Vue3 |
| POST | `/api/hospital/snake-venom/nearby` | 查找附近有蛇毒血清的医院 | Uni-app / Vue3 |
| GET | `/api/hospital/with-serum/{snakeId}` | 查有特定血清的医院 | Vue3 |
| GET | `/api/hospital/nearby-with-serum` | Redis GEO 搜索血清医院 | Agent |
| GET | `/api/hospital/geocode` | 地址 → 坐标 | Uni-app / Vue3 |
| GET | `/api/hospital/reverse-geocode` | 坐标 → 地址 | Uni-app / Vue3 |
| POST | `/api/hospital/route/driving` | 驾车路线规划 | Uni-app / Vue3 |
| POST | `/api/hospital/route/walking` | 步行路线规划 | Uni-app / Vue3 |
| GET | `/api/hospital/admin/list` | 医院管理列表 | Vue3 Admin |
| POST | `/api/hospital/admin` | 新增医院 | Vue3 Admin |
| PUT | `/api/hospital/admin/{id}` | 更新医院 | Vue3 Admin |
| DELETE | `/api/hospital/admin/{id}` | 删除医院 | Vue3 Admin |
| GET | `/api/hospital/admin/serum/list` | 血清库存列表 | Vue3 Admin |
| PUT | `/api/hospital/admin/serum/{id}` | 更新血清库存 | Vue3 Admin |

#### ⚠️ 预警系统 (warning-service)

| 方法 | 路径 | 说明 | 使用端 |
|------|------|------|--------|
| GET | `/api/warning/active-area/map` | 风险区域地图数据 | Uni-app / Vue3 |
| GET | `/api/warning/recent` | 最近预警列表 | Uni-app / Vue3 |
| GET | `/api/warning/check-proximity` | 检查是否在风险区域内 | Vue3 |
| GET | `/api/warning/active-area/detail/{id}` | 风险区域详情 | Vue3 |
| POST | `/api/warning/real-time` | AI 实时预警（基于位置+季节） | Uni-app / Vue3 |
| GET | `/api/warning/convert-location` | 坐标转地址（高德） | Uni-app / Vue3 |
| GET | `/api/warning/region-tree` | 地区树 | Vue3 |
| GET | `/api/warning/by-region` | 按地区查预警 | Vue3 |
| GET | `/api/warning/admin/areas` | 预警区域列表 | Vue3 Admin |
| POST | `/api/warning/admin/areas` | 新增预警区域 | Vue3 Admin |
| PUT | `/api/warning/admin/areas/{id}` | 更新预警区域 | Vue3 Admin |
| DELETE | `/api/warning/admin/areas/{id}` | 删除预警区域 | Vue3 Admin |
| GET | `/api/warning/admin/records` | 预警记录 | Vue3 Admin |
| GET | `/api/warning/admin/rules` | 预警规则 | Vue3 Admin |
| PUT | `/api/warning/admin/rules/{id}` | 更新预警规则 | Vue3 Admin |

#### 🆘 救助调度 (warning-service 中的 rescue 模块)

| 方法 | 路径 | 说明 | 使用端 |
|------|------|------|--------|
| GET | `/api/rescue/regions/tree` | 地区树 | Vue3 Rescue |
| GET | `/api/rescue/regions` | 地区列表 | Vue3 Rescue |
| POST | `/api/rescue/regions` | 新增地区 | Vue3 Rescue |
| PUT | `/api/rescue/regions/{id}` | 更新地区 | Vue3 Rescue |
| DELETE | `/api/rescue/regions/{id}` | 删除地区 | Vue3 Rescue |
| GET | `/api/rescue/serum` | 按地区查血清 | Vue3 Rescue |
| POST | `/api/rescue/serum` | 新增血清（需二级密码） | Vue3 Rescue |
| PUT | `/api/rescue/serum/{id}` | 更新血清（需二级密码） | Vue3 Rescue |
| DELETE | `/api/rescue/serum/{id}` | 删除血清（需二级密码） | Vue3 Rescue |
| GET | `/api/rescue/warning/areas` | 救助端预警区域 | Vue3 Rescue |
| POST | `/api/rescue/warning/areas` | 新增预警区域（需二级密码） | Vue3 Rescue |
| POST | `/api/rescue/warning/verify-password` | 验证二级密码 | Vue3 Rescue |

#### 📊 管理后台 (admin-service)

| 方法 | 路径 | 说明 | 使用端 |
|------|------|------|--------|
| POST | `/api/admin/login` | 管理员登录 | Vue3 Admin |
| GET | `/api/admin/dashboard` | 仪表盘统计 | Vue3 Admin |
| GET | `/api/admin/users` | 管理员列表 | Vue3 Admin |
| POST | `/api/admin/users` | 新增管理员 | Vue3 Admin |
| PUT | `/api/admin/users/{id}` | 更新管理员 | Vue3 Admin |
| DELETE | `/api/admin/users/{id}` | 删除管理员 | Vue3 Admin |
| PUT | `/api/admin/users/{id}/password` | 修改密码 | Vue3 Admin |
| PUT | `/api/admin/users/{id}/status` | 启用/禁用 | Vue3 Admin |
| GET | `/api/admin/roles` | 角色列表 | Vue3 Admin |
| GET | `/api/admin/config` | 系统配置 | Vue3 Admin |
| PUT | `/api/admin/config/{group}` | 保存配置组 | Vue3 Admin |
| GET | `/api/admin/logs` | 操作日志 | Vue3 Admin |
| GET | `/api/admin/logs/{id}` | 日志详情 | Vue3 Admin |

#### 🤖 Agent 智能体 (agent-service)

| 方法 | 路径 | 说明 | 使用端 |
|------|------|------|--------|
| POST | `/api/agent/decide` | 手动触发 Agent 决策 | 调试 |
| GET | `/api/agent/replay/{helpId}` | 事件溯源回放 | 调试 |
| GET | `/api/agent/events/recent` | 最近事件 | 调试 |
| GET | `/api/agent/health` | 健康检查 | 调试 |

---

### 3.2 API 文件位置索引

| 文件 | 说明 |
|------|------|
| `Uni-app/utils/api.js` | 移动端所有 API（uni.request） |
| `vue3/src/services/api.js` | Web 端所有 API（axios，按模块导出） |
| `vue3/src/config.js` | API 基础地址配置 |
| `vue3/src/services/locationService.js` | 浏览器定位 + 距离计算 |
| `vue3/src/composables/useWebSocket.js` | STOMP WebSocket（实时 SOS 通知） |
| `Uni-app/utils/websocket.js` | 移动端 WebSocket |
| `Uni-app/utils/helpers.js` | 图片 URL 代理、文件大小格式化等工具函数 |

---

## 四、设计系统

### 4.1 Vue 3 Design Token — "杉林溪水"

设计 Token 目录：`vue3/src/assets/tokens/`

| Token 文件 | 内容 | 用法示例 |
|-----------|------|---------|
| `colors.css` | 绿色系 9 阶、蓝色系 8 阶、品牌渐变、中性色、语义色、日夜主题色 | `var(--color-primary-500)` |
| `typography.css` | Inter 字体、9 级字号(xs→5xl)、5 级字重、3 级行高 | `var(--font-size-lg)` |
| `spacing.css` | 12 级间距(4px→96px)、容器最大宽度 | `var(--space-4)` |
| `shadows.css` | 5 级阴影 + 品牌色阴影 | `var(--shadow-md)` |
| `radius.css` | 5 级圆角(6px→9999px 胶囊) | `var(--radius-lg)` |
| `transitions.css` | 4 种过渡曲线 | `var(--transition-spring)` |

**日夜主题切换：**
- 切换机制：根元素 `data-theme="day"` / `data-theme="night"`
- 自动检测：6:00-18:00 为日间模式，其余为夜间模式
- 状态管理：`vue3/src/store/theme.js`

**Element Plus 主题覆盖：**
- 文件：`vue3/src/assets/element-theme.scss`
- 主色：`#059669`（绿色）
- 字体：Inter
- 圆角：全局统一

### 4.2 自定义 S 前缀组件

目录：`vue3/src/components/ui/`

| 组件 | Props | 用途 |
|------|-------|------|
| `SButton.vue` | `variant`(primary/secondary/danger/ghost), `size`(sm/md/lg), `loading` | 通用按钮 |
| `SCard.vue` | `hoverable`, `shadow` | 卡片容器 |
| `SHero.vue` | `variant`(green/blue/mix) | 首页大图区域 |
| `SPageHeader.vue` | `title`, `subtitle` | 页面标题栏 |
| `SStatCard.vue` | `icon`, `value`, `label`, `trend` | 统计数据卡片 |

### 4.3 Uni-app 移动端设计系统

定义在 `Uni-app/App.vue` 全局样式中：

| CSS 变量 | 值 | 用途 |
|---------|-----|------|
| `--primary` | `#10b981` | 主色（绿） |
| `--primary-gradient` | `linear-gradient(135deg, #10b981, #059669)` | 主色渐变 |
| `--danger` | `#ef4444` | 危险/紧急 |
| `--glass-bg` | `rgba(255,255,255,0.85)` | 毛玻璃背景 |
| `--glass-blur` | `blur(20px)` | 毛玻璃模糊 |

全局组件类：
- `.glass-card` — 毛玻璃卡片
- `.gradient-btn` — 渐变按钮
- `.input-field` — 输入框
- `.flex-center` / `.flex-between` — Flex 布局
- `.fade-in` / `.pulse` — 动画

---

## 五、关键文件速查

### 5.1 入口与配置

| 文件 | 说明 |
|------|------|
| `Uni-app/main.js` | 移动端入口 |
| `Uni-app/pages.json` | 移动端路由 + Tab 配置 |
| `Uni-app/manifest.json` | 小程序 AppID 等配置 |
| `Uni-app/App.vue` | 全局样式 + 生命周期 |
| `vue3/src/main.js` | Web 端入口（注册 Element Plus、Pinia、Router） |
| `vue3/src/router/index.js` | 所有路由 + 导航守卫 |
| `vue3/vite.config.js` | 构建配置 + 代理 + 路径别名 |
| `vue3/index.html` | HTML 入口 |

### 5.2 布局与导航

| 文件 | 说明 |
|------|------|
| `vue3/src/components/layout/CAppLayout.vue` | C 端整体布局 |
| `vue3/src/components/layout/CAppNavbar.vue` | C 端顶部导航 |
| `vue3/src/components/layout/CAppFooter.vue` | C 端底部 |
| `vue3/src/components/layout/CAppSideTools.vue` | C 端侧边工具 |
| `vue3/src/views/admin/AdminLayout.vue` | Admin 整体布局（侧边栏 + 顶栏） |
| `Uni-app/components/GlassNavbar.vue` | 移动端毛玻璃导航栏 |

### 5.3 状态管理

| 文件 | 说明 |
|------|------|
| `vue3/src/store/user.js` | Web 用户状态（token、角色、登录态） |
| `vue3/src/store/theme.js` | Web 日夜主题状态 |
| `Uni-app/store/user.js` | 移动端用户状态 |

### 5.4 页面组件

**C 端页面：** `vue3/src/views/Dashboard.vue`, `Recognition.vue`, `Warning.vue`, `Emergency.vue`, `HospitalMapView.vue`, `KnowledgeGraph.vue`, `Profile.vue`, `RescueDashboard.vue`

**Admin 页面：** `vue3/src/views/AdminDashboard.vue`, `views/admin/UserManagement.vue`, `AdminUserManagement.vue`, `SnakeManagement.vue`, `EmergencyInfoManagement.vue`, `HospitalManagement.vue`, `WarningManagement.vue`, `SOSManagement.vue`, `SystemConfig.vue`, `LogManagement.vue`, `SerumSupplyChain.vue`

**Uni-app 页面：** `Uni-app/pages/` 下每个子目录对应一个页面

---

## 六、启动开发环境

### 前置条件
- Node.js 18+
- Java 17+（后端微服务）
- MySQL、Redis（后端依赖）
- 微信开发者工具（小程序调试）

### 启动步骤

```bash
# 1. 启动后端（先启动 Gateway，再启动各微服务）
# 参考项目根目录的 启动脚本.bat

# 2. 启动 Vue 3 Web 前端
cd vue3
npm install
npm run dev          # 访问 http://localhost:3000

# 3. 启动 Uni-app 移动端
cd Uni-app
npm install
npm run dev:mp-weixin   # 微信小程序
npm run dev:h5          # H5 模式
```

### 测试账号
- 管理员登录：`/login` 页面或直接访问 `/admin` 会跳转登录
- C 端用户：注册新账号或使用已有账号

---

## 七、前端优化工作建议

### 优先级排序

| 优先级 | 区域 | 原因 |
|--------|------|------|
| ⭐⭐⭐ | Dashboard（首页仪表盘） | 用户第一印象，日/夜主题均已支持 |
| ⭐⭐⭐ | Recognition（识别页） | 核心功能，交互复杂 |
| ⭐⭐ | Emergency（急救页） | AI 问答 + SOS 表单 + 伤口分析 |
| ⭐⭐ | Hospital（医院地图） | 高德地图集成，交互丰富 |
| ⭐⭐ | Warning（预警页） | 地图 + 列表混合展示 |
| ⭐ | Admin 各管理页面 | 后台功能，优先级略低 |
| ⭐ | Uni-app 各页面 | 移动端独立优化 |

### 设计风格参考

当前设计风格为 **"杉林溪水"** ——自然绿色系 + 毛玻璃 + 渐变。如需调整风格，设计库位于 `D:/AAAAClaude Code/CODE/design-md/`（71 个品牌风格可参考）。推荐参考：
- **Claude** — 温暖编辑风（如果想更柔和）
- **Linear** — 极简紫（如果想更现代）
- **Vercel** — 黑白极简（如果想更干净）
