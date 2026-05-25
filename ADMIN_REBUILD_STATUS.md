# Admin 重构状态 — 2026-05-18

## 已完成

### 后端
1. **snake-common** — 添加 JwtUtil + AdminAuthInterceptor + jjwt 依赖
2. **admin-service** (8092) — 完全重建
   - DashboardController: GET /api/admin/dashboard（聚合统计）
   - AdminController: BCrypt 密码 + 自动升级旧明文密码
   - AdminUserController: 管理员 CRUD + 角色 + 状态切换 + 改密
   - SystemConfigController: 系统配置分组读写
   - AdminLogController: 修复 username/日期筛选
   - 删除旧的 JwtUtil/AdminAuthInterceptor，改用 common

3. **user-service** (7006)
   - User 实体加 status 字段
   - 新增 POST /api/user/batch-delete
   - getUserList 返回 activeCount + newToday
   - adminLogin 返回真实 JWT
   - WebConfig 注册 common interceptor，删除旧的本地副本

4. **snake-info-service** (7002)
   - SnakeAdminController: GET/POST/PUT/DELETE /snake/admin/*
   - EmergencyInfoAdminController: GET/POST/PUT/DELETE /snake/admin/emergency/*
   - WebConfig 注册 JWT interceptor

5. **hospital-service** (8089)
   - HospitalAdminController: GET/POST/PUT/DELETE /api/hospital/admin/*
   - 血清库存: GET /api/hospital/admin/serum/list + PUT update
   - WebConfig 注册 JWT interceptor

6. **warning-service** (7005)
   - WarningAdminController: 三块（areas CRUD, records 只读, rules 编辑）
   - WebConfig 注册 JWT interceptor

7. **emergency-service** (9093)
   - WebConfig 注册 JWT interceptor
   - SOS 管理复用已有的 EmergencyHelpController

### 数据库
- 创建 system_config 表 + 14 条默认配置
- user_info 表加 status 列

### 前端
- **api.js** — 完全重写：adminApi, userApi, snakeAdminApi, hospitalAdminApi, warningAdminApi, sosAdminApi
- **router/index.js** — 用 AdminLayout 包裹所有 /admin/* 子路由，去掉 ContentManagement，新增全部模块路由
- **AdminLayout.vue** — 新布局（自定义 SVG 图标，暗色侧边栏，无 Element Plus 默认图标）
- **AdminDashboard.vue** — 真实统计卡片 + 系统状态 + 快捷操作
- **UserManagement.vue** — C 端用户管理（统计卡片、搜索、CRUD、批量删除、角色分配）
- **AdminUserManagement.vue** — 管理员 CRUD（状态开关、角色分配、密码修改）
- **SnakeManagement.vue** — 蛇类百科 CRUD（毒性等级色标、科属搜索）
- **EmergencyInfoManagement.vue** — 急救信息 CRUD（详情对话框彩色分区）
- **HospitalManagement.vue** — 医院 CRUD + 血清库存管理（两个 Tab）
- **WarningManagement.vue** — 预警区域/记录/规则（三个 Tab）
- **SOSManagement.vue** — SOS 求助面板（统计卡片、状态色标、30 秒自动刷新）
- **SystemConfig.vue** — 系统配置三 Tab（基础/安全/邮件）
- **LogManagement.vue** — 操作日志（类型色标、日期范围筛选）

## 未完成 / 待处理

### 可选优化
5. **WebConfig 循环依赖** — 每个服务的 WebConfig 同时注入 AdminAuthInterceptor 又提供 @Bean AdminAuthInterceptor，Spring 可能报循环依赖。如果要修：把 @Bean 移到单独的 AuthConfig 类
6. **gateway 路由** — snake-admin 路由用 `/snake/admin/**`，但 gateway 把 `/snake/**` 转到 snake-info-service，确认路径可达
7. **EmergencyInfoAdminController** — 用原生 JDBC，没有用 MyBatis-Plus。如果需要 snake_emergency_info 的 Mapper/Entity，可以在 snake-info-service 补充
8. **血清创建** — HospitalAdminController 只有 updateSerum，没有 createSerum，看是否需要

### 可选优化
9. Vue 页面太多长文件（有些 1200+ 行），后续可拆分组件
10. snake-info 的 Redis 同步 — snake-info-service 有 RedisSyncRunner，新增/编辑蛇类后缓存不会自动更新

## 新对话继续工作建议

```
1. 启动所有后端服务，修复编译错误
2. 启动前端，修复 import 错误
3. 用 admin/admin123 登录测试完整流程
4. 逐个模块验证 CRUD 功能
```

---

**2026-05-19 更新 - 循环依赖修复完成**

问题：hospital/warning/emergency/snake-info 的 WebConfig 同时注入 AdminAuthInterceptor 又通过 @Bean 创建，导致循环依赖报错。

修复：每个服务新建 AuthConfig.java 单独提供 @Bean JwtUtil 和 @Bean AdminAuthInterceptor，WebConfig 只保留注入和拦截器注册。

文件变更：
- admin-service: 新建 AuthConfig.java，WebConfig 移除 @Bean
- user-service: 新建 AuthConfig.java，WebConfig 移除 @Bean
- hospital-service: 新建 AuthConfig.java，WebConfig 移除 @Bean
- warning-service: 新建 AuthConfig.java，WebConfig 移除 @Bean
- emergency-service: 新建 AuthConfig.java，WebConfig 移除 @Bean
- snake-info-service: 新建 AuthConfig.java，WebConfig 移除 @Bean

额外修复：user-service AdminController import 路径错误 (com.sling.user.util.JwtUtil → com.sling.common.security.JwtUtil)

所有服务编译通过，启动验证 hospital-service ✓ warning-service ✓ emergency-service ✓
