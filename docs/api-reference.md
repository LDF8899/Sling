# Sling 项目API参考文档

## 1. 项目概述

Sling是一个基于微服务架构的蛇类管理与应急服务平台，包含多个微服务模块，每个模块提供特定的API接口。

## 2. 服务端点

### 网关服务
- **地址**: http://localhost:8888
- **功能**: 统一路由、认证授权、限流熔断

### 用户服务 (user-service)
- **地址**: http://localhost:7006
- **前缀**: `/user`

#### 用户认证API
```
POST /user/login - 用户登录
POST /user/register - 用户注册
GET /user/info - 获取用户信息
POST /user/logout - 用户登出
```

### 蛇类识别服务 (recognition-service)
- **地址**: http://localhost:7003
- **前缀**: `/recognition`

#### 蛇类识别API
```
POST /recognition/upload - 上传蛇类图片进行识别
GET /recognition/history - 获取识别历史记录
GET /recognition/detail/{id} - 获取识别详情
```

### 预警服务 (warning-service)
- **地址**: http://localhost:8091
- **前缀**: `/warning`

#### 预警管理API
```
GET /warning/list - 获取预警列表
GET /warning/detail/{id} - 获取预警详情
POST /warning/create - 创建预警
PUT /warning/update/{id} - 更新预警
DELETE /warning/delete/{id} - 删除预警
```

### 医院服务 (hospital-service)
- **地址**: http://localhost:8089
- **前缀**: `/hospital`

#### 医院查询API
```
GET /hospital/list - 获取医院列表
GET /hospital/detail/{id} - 获取医院详情
GET /hospital/nearby - 获取附近医院
GET /hospital/serum/{hospitalId} - 获取医院血清库存
POST /hospital/search - 搜索医院
```

### 应急服务 (emergency-service)
- **地址**: http://localhost:9093
- **前缀**: `/emergency`

#### 应急处理API
```
GET /emergency/guide/{snakeId} - 获取应急处理指南
POST /emergency/report - 提交紧急求助
GET /emergency/history - 获取求助历史
GET /emergency/nearby-rescue - 获取附近救援点
```

### 蛇类信息服务 (snake-info-service)
- **地址**: http://localhost:7004
- **前缀**: `/snake`

#### 蛇类信息API
```
GET /snake/list - 获取蛇类列表
GET /snake/detail/{id} - 获取蛇类详情
GET /snake/features/{id} - 获取蛇类特征
GET /snake/knowledge-graph - 获取蛇类知识图谱
GET /snake/search - 搜索蛇类
```

### 管理服务 (admin-service)
- **地址**: http://localhost:8092
- **前缀**: `/admin`

#### 管理API
```
GET /admin/dashboard - 管理面板数据
GET /admin/users - 获取用户列表
PUT /admin/user/status - 更新用户状态
GET /admin/snakes - 获取蛇类管理列表
POST /admin/snake/create - 创建蛇类信息
PUT /admin/snake/update/{id} - 更新蛇类信息
DELETE /admin/snake/delete/{id} - 删除蛇类信息
GET /admin/recognition/stats - 识别统计
GET /admin/emergency/stats - 应急统计
```

## 3. 通用响应格式

所有API响应均遵循以下格式：

```json
{
  "code": 200,
  "message": "success",
  "data": {},
  "timestamp": "2026-05-19T13:45:30"
}
```

### 响应码说明
- `200`: 成功
- `400`: 请求参数错误
- `401`: 未认证
- `403`: 无权限
- `404`: 资源不存在
- `500`: 服务器内部错误

## 4. 认证机制

大部分API需要认证，通过HTTP头传递Token：
```
Authorization: Bearer <token>
```

## 5. 限流策略

所有API接口均有访问频率限制，具体限制根据接口重要性有所不同。

## 6. 错误处理

当API调用失败时，会返回相应的错误码和错误信息，客户端应根据错误码进行相应处理。