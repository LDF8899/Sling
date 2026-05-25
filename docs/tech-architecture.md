# Sling 项目技术架构

## 1. 整体架构模式

Sling项目采用前后端分离的微服务架构。前端分为移动端（Uni-app）和 Web 管理端（Vue3），后端基于 Spring Cloud 微服务生态。

### 关键技术决策
- 使用 Spring Cloud Alibaba 实现微服务治理
- 统一网关入口（snake-gateway）处理路由与鉴权
- 配置中心集中管理（Nacos）
- 多端适配：移动端使用 Uni-app，Web 端使用 Vue3 + Vite

### 架构模式与设计模式
- **架构模式**：微服务架构、分层架构（Controller/Service/Mapper）、网关模式
- **设计模式**：单例模式（Spring Bean）、工厂模式（MyBatis Plus）、观察者模式（可能用于预警推送）

### 组件交互
- 客户端请求 -> Snake Gateway -> 注册中心 (Nacos) -> 具体业务微服务 -> 数据库
- 前端通过 Axios 调用后端 API

## 2. 技术栈详述

### 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Java | 17 | 编程语言 |
| Spring Boot | 2.7.0 | 应用框架 |
| Spring Cloud | 2021.0.3 | 微服务框架 |
| Spring Cloud Alibaba | 2021.0.1.0 | 阿里微服务套件 |
| Nacos | 2.x | 服务注册发现 + 配置中心 |
| Sentinel | 1.8.6 | 流量控制、熔断降级 |
| Seata | 1.7.1 | 分布式事务 |
| OpenFeign | — | 声明式服务间调用 |
| Spring Cloud Gateway | — | API 网关 |
| MyBatis-Plus | 3.5.3.1 | ORM 框架 |
| Druid | 1.2.20 | 数据库连接池 |
| MySQL | 8.0 | 关系型数据库 |
| Maven | — | 项目构建管理 |

### 前端技术栈

#### Web 管理后台 (vue3/)
| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5.24 | 前端框架 |
| Vite (rolldown-vite) | 7.2.5 | 构建工具 |
| Element Plus | 2.12.0 | UI 组件库 |
| Pinia | 3.0.4 | 状态管理 |
| Vue Router | 4.6.3 | 路由管理 |
| Axios | 1.13.2 | HTTP 客户端 |
| markdown-it | 14.1.0 | Markdown 渲染 |

#### 微信小程序 (Uni-app/)
| 技术 | 版本 | 用途 |
|------|------|------|
| Uni-app (DCloud) | latest | 跨端小程序框架 |
| Vue | 3.4.21 | 前端框架 |
| Pinia | 2.1.7 | 状态管理 |
| Vite | 5.2.8 | 构建工具 |

## 3. 微服务模块详解

### snake-gateway (端口 8888)
API网关，负责路由转发、权限校验、限流熔断等功能。

### snake-common
公共模块，包含DTO、工具类、异常处理等通用组件。

### user-service (端口 7006)
用户服务，处理用户注册/登录（账号+微信双登录）、角色权限管理。

### recognition-service (端口 7003)
蛇类识别服务，负责蛇类图片上传、AI识别、结果返回。

### warning-service (端口 8091)
预警服务，负责风险区域分析、预警信息推送。

### hospital-service (端口 8089)
医院服务，提供医院查询、血清匹配、路径规划功能。

### emergency-service (端口 9093)
应急服务，提供伤口分析、AI问答、应急处理指南。

### snake-info-service (端口 7004)
蛇类信息服务，提供蛇类百科数据库、特征库管理。

### admin-service (端口 8092)
管理服务，提供后台管理、内容审核、系统配置功能。

## 4. 数据库设计

数据库文件位于 `database/sling_complete.sql`，包含完整的表结构和初始数据。

### 核心业务表
- `user_info` / `role` / `user_role` / `user_permission` — 用户与权限
- `snake_info` / `snake_feature` — 蛇类百科与特征
- `recognition_record` — 识别记录
- `warning_info` — 预警信息
- `hospital_info` / `serum_info` — 医院与血清
- `emergency_guide` — 应急指南

## 5. 开发与部署

### 开发环境要求
- JDK 17+
- Maven 3.6+
- Node.js 16+ (推荐)
- Git
- IDE (IntelliJ IDEA / VS Code)

### 构建命令
- 后端：`mvn clean package -DskipTests`
- 前端 (Vue3)：`cd vue3 && npm run build`
- 前端 (Uni-app)：需 HBuilderX 或 CLI 命令打包

### 部署方式
- 使用 `启动脚本.bat` 启动本地服务
- 服务器部署使用 `deploy-to-vm.sh` 脚本
- 各微服务有独立启动脚本 `start-service.bat`