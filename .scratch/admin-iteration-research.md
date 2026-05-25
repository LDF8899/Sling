# Admin模块迭代研究笔记

## 状态
**已中断，需要继续请从头梳理**

## 数据库实际结构（不依赖项目SQL文件）

### admin_users 表
- 字段：admin_id(PK), username, password(BCrypt), email, phone, real_name, avatar, department, position, status(1=启用), last_login_time, last_login_ip, two_factor_enabled, totp_secret, create_time, update_time, del_flag(0=正常)
- 数据：admin/admin123 (BCrypt加密), 1条记录

### admin_roles 表
- 字段：role_id(PK), role_name, role_code(UNI), role_description, permissions(JSON), status, create_time, update_time
- 数据：SUPER_ADMIN(超级管理员), CONTENT_ADMIN(内容管理员), USER_ADMIN(用户管理员)

### admin_user_roles 表
- 字段：id(PK), admin_user_id, role_id, del_flag, create_time
- 当前：**空表**，没有角色关联数据

### user_info 表（普通用户）
- 字段：user_id(PK), username(UNI), password, email, phone, status(1), create_time, last_login_time, avatar_url, extra_info等

### snake_info 表
- 字段：snake_id, snake_name(UNI), family, genus, latin_name, characteristics, toxicity_level, toxin_type, danger_level(varchar存1-5), habitat_info, distribution, conservation_status

### snake_emergency_info 表（急救信息）
- 字段：id, snake_name(UNI), snake_alias, venom_type, symptom_description, emergency_treatment, medical_attention, image_url, del_flag, latin_name, forbidden_actions, serum_type, hospital_department
- 数据：18条记录

### hospital_info 表
- 字段：hospital_id, hospital_name, address, latitude, longitude, contact_info, hospital_type, serum_availability(tinyint), emergency_department(tinyint), snake_venom_treatment(tinyint), snake_venom_keywords, del_flag
- 数据：5条记录

### serum_inventory 表
- 字段：inventory_id(PK), hospital_id, snake_id, serum_amount, serum_expiry_date, inventory_metadata

### warning_area 表
- 字段：area_id(PK), area_name, description, boundary_coordinates(JSON), snake_species(JSON), warning_level(int), create_time
- 数据：3条记录

### warning_record 表
- 字段：id(PK), area_id, warning_content, warning_time, is_valid(int)
- 数据：3条记录

## API层发现的问题

### 1. AdminUserManagement.vue
**前端问题：**
- 使用 `adminApi.getAdminUsers()` → GET `/api/admin/users`
- 响应取 `data.data.list` / `data.data.total`
- `adminApi.getAdminUser(id)` → GET `/api/admin/users/{id}`, 取 `data.data.user` 和 `data.data.roles`
- `adminApi.toggleAdminStatus(id, {status})` → PUT `/api/admin/users/{id}/status`
- `adminApi.changeAdminPassword(id, {newPassword})` → PUT `/api/admin/users/{id}/password`
- 角色关联获取：从 GET `/api/admin/users/{id}` 返回 roles，但 `admin_user_roles` 表是空的

**潜在问题：**
- `AdminUserRoleService.getUserRoles()` 取出的 roles 列表为空（因为数据库没有数据）
- 需要在 `admin_user_roles` 表中插入关联数据

### 2. UserManagement.vue（普通用户管理）
**API端点：**
- `userApi.getUserList(params)` → GET `/api/user/list`
- `userApi.getUserInfo(id)` → GET `/api/user/info/{id}`
- `userApi.deleteUser(id)` → DELETE `/api/user/delete/{id}`
- `userApi.batchDeleteUsers(userIds)` → POST `/api/user/batch-delete`
- `userApi.updateUser(data)` → PUT `/api/user/update`
- `userApi.getAllRoles()` → GET `/api/user/roles`

### 3. SnakeManagement.vue
**API端点：**
- `snakeAdminApi.getList(params)` → GET `/api/snake/admin/list`
- `snakeAdminApi.getSnake(id)` → GET `/api/snake/admin/{id}`
- `snakeAdminApi.createSnake(data)` → POST `/api/snake/admin`
- `snakeAdminApi.updateSnake(id, data)` → PUT `/api/snake/admin/{id}`
- `snakeAdminApi.deleteSnake(id)` → DELETE `/api/snake/admin/{id}`
- `snakeAdminApi.getFamilies()` → GET `/api/snake/admin/families`

**snake_info 字段映射：**
- `dangerLevel` 前端期望 number，但数据库是 varchar → 需要类型转换
- `dangerLevel` 使用 `el-input-number` (min=1, max=5)

### 4. EmergencyInfoManagement.vue
**API端点：**
- `snakeAdminApi.getEmergencyList(params)` → GET `/api/emergency/admin/list`
- `snakeAdminApi.getEmergency(id)` → GET `/api/emergency/admin/{id}`
- `snakeAdminApi.createEmergency(data)` → POST `/api/emergency/admin`
- `snakeAdminApi.updateEmergency(id, data)` → PUT `/api/emergency/admin/{id}`
- `snakeAdminApi.deleteEmergency(id)` → DELETE `/api/emergency/admin/{id}`

### 5. HospitalManagement.vue
**API端点：**
- `hospitalAdminApi.getList(params)` → GET `/api/hospital/admin/list`
- `hospitalAdminApi.getHospital(id)` → GET `/api/hospital/admin/{id}`
- `hospitalAdminApi.createHospital(data)` → POST `/api/hospital/admin`
- `hospitalAdminApi.updateHospital(id, data)` → PUT `/api/hospital/admin/{id}`
- `hospitalAdminApi.deleteHospital(id)` → DELETE `/api/hospital/admin/{id}`
- `hospitalAdminApi.getSerumList(params)` → GET `/api/hospital/admin/serum/list`
- `hospitalAdminApi.updateSerum(id, data)` → PUT `/api/hospital/admin/serum/{id}`

**数据库字段映射问题：**
- 前端用 `latitude`/`longitude`，但数据库是 `latitude`/`longitude` (OK)
- 前端用 `emergencyDepartment` (boolean)，数据库是 `emergency_department` (tinyint 0/1) → **需要转换**
- 前端用 `hospitalForm.serumAvailability`，但表里没有这个字段，只有 `serum_availability` 和 `snake_venom_treatment`
- 血清库存关联表是 `serum_inventory`，不是hospital表直接字段

### 6. WarningManagement.vue
**API端点：**
- `warningAdminApi.getAreas(params)` → GET `/api/warning/admin/areas`
- `warningAdminApi.getArea(id)` → GET `/api/warning/admin/areas/{id}`
- `warningAdminApi.createArea(data)` → POST `/api/warning/admin/areas`
- `warningAdminApi.updateArea(id, data)` → PUT `/api/warning/admin/areas/{id}`
- `warningAdminApi.deleteArea(id)` → DELETE `/api/warning/admin/areas/{id}`
- `warningAdminApi.getRecords(params)` → GET `/api/warning/admin/records`
- `warningAdminApi.getRules(params)` → GET `/api/warning/admin/rules`
- `warningAdminApi.updateRule(id, data)` → PUT `/api/warning/admin/rules/{id}`

**数据库字段映射：**
- `warning_area.snake_species` 是 JSON 数组 `[{name, snake_id}]`
- `warning_area.boundary_coordinates` 是 JSON

### 7. SOSManagement.vue
**问题：SOS表（emergency_help）不存在！**
- 数据库只有 `emergency_qa_cache` 和 `snake_emergency_info`
- API期望：`sosAdminApi.getList()` → GET `/api/emergency/help/list`
- 数据库无对应表，此模块无法工作

### 8. SystemConfig.vue
**API端点：**
- `adminApi.getConfigs()` → GET `/api/admin/config`
- `adminApi.getConfigsByGroup(group)` → GET `/api/admin/config/{group}`
- `adminApi.saveConfigs(group, data)` → PUT `/api/admin/config/{group}`

**表：** `system_config` (config_key, config_value, config_group)

### 9. LogManagement.vue
**API端点：**
- `adminApi.getLogs(params)` → GET `/api/admin/logs`
- `adminApi.getLogDetail(id)` → GET `/api/admin/logs/{id}`

**表：** `admin_operation_log`

## 关键发现

1. **SOS模块**：数据库没有 `emergency_help` 或类似SOS表，需要用户确认是否要创建
2. **admin_user_roles**：空表，导致管理员角色分配功能无法显示关联角色
3. **HospitalManagement**：前端字段名与数据库不完全匹配（emergencyDepartment等）
4. **SnakeManagement**：danger_level在数据库是varchar，前端用number，需类型处理

## 启动建议

需要先确保：
1. 后端各service能正常启动并连接数据库
2. Nacos正常运行（服务注册）
3. MySQL数据库数据完整

测试建议：先启动后端，逐一访问API确认返回数据格式，再测试前端页面。