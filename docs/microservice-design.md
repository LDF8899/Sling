# Sling 项目微服务设计文档

## 1. 微服务架构概述

Sling项目采用基于Spring Cloud Alibaba的微服务架构，通过Nacos进行服务注册发现和配置管理，使用Sentinel进行流量控制和熔断降级，利用Seata处理分布式事务。

### 1.1 架构图
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   小程序/前端    │    │    管理后台     │    │   运维监控      │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌─────────────▼─────────────┐
                    │                           │
                    │      snake-gateway        │
                    │      (API网关)           │
                    │                           │
                    └─────────────┬─────────────┘
                                 │
        ┌────────────────────────┼────────────────────────┐
        │                         │                        │
┌───────▼────────┐    ┌──────────▼──────────┐    ┌───────▼────────┐
│  snake-common  │    │     其他服务          │    │   数据存储      │
│   (公共组件)    │    │  (业务逻辑)          │    │   (MySQL等)    │
│                │    │                     │    │                │
│ - DTO          │    │ - user-service       │    │ - snake_info   │
│ - 工具类        │    │ - recognition-service│    │ - user_info    │
│ - 异常处理      │    │ - warning-service   │    │ - hospital_info│
│ - 配置          │    │ - hospital-service  │    │ - emergency_   │
│                │    │ - emergency-service │    │   guide        │
└────────────────┘    │ - snake-info-service │    │ - serum_info   │
                      │ - admin-service     │    │ - warning_info │
                      │                     │    └────────────────┘
                      └─────────────────────┘
```

## 2. 服务拆分原则

### 2.1 业务维度拆分
- 按照业务领域进行服务拆分，保证服务的单一职责
- 识别、预警、医院、应急、用户等业务域独立成服务
- 公共功能抽取为common服务

### 2.2 技术维度拆分
- 数据访问层与业务逻辑层分离
- 缓存、消息队列等中间件独立部署
- 监控、日志等运维功能统一管理

## 3. 服务详细设计

### 3.1 snake-gateway（网关服务）

**职责**:
- 统一入口，路由转发
- 身份认证与鉴权
- 限流与熔断
- 日志记录

**核心技术**:
- Spring Cloud Gateway
- JWT Token校验
- Sentinel限流

**关键配置**:
```yaml
spring:
  cloud:
    gateway:
      routes:
        - id: user-service
          uri: lb://user-service
          predicates:
            - Path=/user/**
        - id: recognition-service
          uri: lb://recognition-service
          predicates:
            - Path=/recognition/**
```

### 3.2 snake-common（公共服务）

**职责**:
- 提供通用的工具类
- 定义通用的DTO和常量
- 统一异常处理
- 通用配置

**关键组件**:
- `Result<T>` 通用响应封装
- `BaseEntity` 基础实体类
- `GlobalExceptionHandler` 全局异常处理器
- `Constant` 常量类

### 3.3 user-service（用户服务）

**职责**:
- 用户注册/登录
- 权限管理
- 用户信息维护

**核心接口**:
- `/user/register` - 用户注册
- `/user/login` - 用户登录
- `/user/info` - 获取用户信息
- `/user/update` - 更新用户信息

**技术实现**:
- Spring Security + JWT
- Redis存储登录状态
- BCrypt加密密码

### 3.4 recognition-service（识别服务）

**职责**:
- 蛇类图片识别
- 识别历史管理
- 与AI服务集成

**核心接口**:
- `/recognition/upload` - 上传图片进行识别
- `/recognition/history` - 识别历史记录
- `/recognition/result/{id}` - 获取识别结果

**技术实现**:
- 图片上传处理
- AI识别服务调用
- 识别结果缓存

### 3.5 snake-info-service（蛇类信息服务）

**职责**:
- 蛇类信息管理
- 蛇类知识图谱
- 蛇类特征维护

**核心接口**:
- `/snake/list` - 蛇类列表
- `/snake/detail/{id}` - 蛇类详情
- `/snake/knowledge-graph` - 知识图谱
- `/snake/search` - 搜索功能

**技术实现**:
- Elasticsearch全文搜索
- Redis缓存热点数据
- MongoDB存储非结构化信息

### 3.6 hospital-service（医院服务）

**职责**:
- 医院信息管理
- 血清库存管理
- 附近医院查询
- 路径规划

**核心接口**:
- `/hospital/list` - 医院列表
- `/hospital/nearby` - 附近医院
- `/hospital/serum/{id}` - 医院血清信息
- `/hospital/route` - 路径规划

**技术实现**:
- 地理位置索引
- 高德地图API集成
- LBS服务

### 3.7 emergency-service（应急服务）

**职责**:
- 应急求助处理
- 应急指导
- 救援资源调度

**核心接口**:
- `/emergency/report` - 提交紧急求助
- `/emergency/guide/{snakeId}` - 应急指导
- `/emergency/nearby` - 附近救援资源

**技术实现**:
- 实时位置跟踪
- 推送通知
- AI智能问答

### 3.8 warning-service（预警服务）

**职责**:
- 预警信息发布
- 预警推送
- 风险区域管理

**核心接口**:
- `/warning/publish` - 发布预警
- `/warning/list` - 预警列表
- `/warning/my-warnings` - 个人相关预警

**技术实现**:
- WebSocket实时推送
- 消息队列异步处理
- 定时任务预警刷新

### 3.9 admin-service（管理服务）

**职责**:
- 系统管理
- 数据审核
- 用户管理
- 统计分析

**核心接口**:
- `/admin/dashboard` - 管理面板
- `/admin/users` - 用户管理
- `/admin/snakes` - 蛇类信息管理
- `/admin/stats` - 统计分析

**技术实现**:
- RBAC权限模型
- 数据可视化
- 审计日志

## 4. 服务间通信

### 4.1 同步通信
使用OpenFeign进行服务间同步调用：
```java
@FeignClient(name = "snake-info-service")
public interface SnakeInfoClient {
    @GetMapping("/snake/detail/{id}")
    Result<SnakeInfoVO> getSnakeDetail(@PathVariable("id") Long snakeId);
}
```

### 4.2 异步通信
使用RocketMQ进行异步通信：
```java
@RocketMQMessageListener(topic = "emergency-topic", consumerGroup = "emergency_consumer")
public class EmergencyConsumer implements RocketMQListener<EmergencyEvent> {
    // 处理紧急事件
}
```

## 5. 数据一致性

### 5.1 分布式事务
使用Seata处理跨服务的数据一致性：
```java
@GlobalTransactional
public void createEmergencyReport(Long userId, String location, Long snakeId) {
    // 调用多个服务
    userClient.updateUserInfo(userId, location);
    snakeInfoClient.recordSnakeSight(userId, snakeId);
    emergencyClient.createReport(userId, location, snakeId);
}
```

### 5.2 最终一致性
对于非关键数据，采用消息队列实现最终一致性。

## 6. 安全设计

### 6.1 认证授权
- JWT Token认证
- OAuth2授权
- RBAC权限模型

### 6.2 数据安全
- 敏感数据加密存储
- API接口签名验证
- 数据传输HTTPS

## 7. 监控与运维

### 7.1 健康检查
各服务提供健康检查端点：
```
GET /actuator/health
```

### 7.2 链路追踪
使用SkyWalking进行分布式链路追踪。

### 7.3 日志管理
- 结构化日志输出
- 日志收集与分析
- 日志脱敏处理

## 8. 性能优化

### 8.1 缓存策略
- Redis缓存热点数据
- 本地缓存减少网络开销
- 缓存穿透、雪崩防护

### 8.2 数据库优化
- 索引优化
- 分库分表
- 读写分离

### 8.3 接口优化
- 接口聚合减少请求数
- 分页查询避免大数据量
- 异步处理耗时操作