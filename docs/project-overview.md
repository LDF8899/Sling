# 蛇灵 (SLING) 项目概况与技术栈

## 一、项目简介

**蛇灵 (SLING)** — 智能蛇类识别与应急处理平台。面向户外工作者和爱好者，提供蛇类 AI 识别、风险预警、应急指导、医院/血清查询的一站式服务。

### 产品形态
- **微信小程序**（Uni-app）— C端用户，蛇类拍照识别、预警查看、应急指南
- **Web 管理后台**（Vue3）— 管理员，内容管理、用户管理、数据审核

---

## 二、系统架构

```
用户层:    Uni-app 小程序  +  Vue3 Web 管理台
              │
网关层:    Spring Cloud Gateway (端口 8888)
              │
基础设施:  Nacos 注册/配置中心  |  Sentinel 限流熔断  |  Seata 分布式事务
              │
服务层:    ┌───────────┬───────────┬───────────┬───────────┬───────────┬───────────┬───────────┬───────────┐
          user      recognition  warning    hospital   emergency  snake-info   admin   snake-common
          (7006)      (7003)      (8091)     (8089)     (9093)     (7004)      (8092)    (公共模块)
              │
数据层:    MySQL 8.0
```

### 微服务清单（9个模块）

| 模块 | 端口 | 职责 |
|------|------|------|
| **snake-gateway** | 8888 | API 网关，路由转发、权限校验、限流熔断 |
| **snake-common** | — | 公共模块，DTO、工具类、异常处理 |
| **user-service** | 7006 | 用户注册/登录（账号+微信双登录）、角色权限 |
| **recognition-service** | 7003 | 蛇类图片上传、AI 识别、结果返回 |
| **warning-service** | 8091 | 风险区域分析、预警信息推送 |
| **hospital-service** | 8089 | 医院查询、血清匹配、路径规划 |
| **emergency-service** | 9093 | 伤口分析、AI 问答、应急处理指南 |
| **snake-info-service** | 7004 | 蛇类百科数据库、特征库管理 |
| **admin-service** | 8092 | 后台管理、内容审核、系统配置 |

---

## 三、技术栈

### 后端

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
| MyBatis-Plus | 3.4.2 | ORM 框架 |
| Druid | 1.2.20 | 数据库连接池 |
| MySQL | 8.0 | 关系型数据库 |
| Maven | — | 项目构建管理 |

### 前端 — Web 管理后台 (vue3/)

| 技术 | 版本 | 用途 |
|------|------|------|
| Vue | 3.5.24 | 前端框架 |
| Vite (rolldown-vite) | 7.2.5 | 构建工具 |
| Element Plus | 2.12.0 | UI 组件库 |
| Pinia | 3.0.4 | 状态管理 |
| Vue Router | 4.6.3 | 路由管理 |
| Axios | 1.13.2 | HTTP 客户端 |
| markdown-it | 14.1.0 | Markdown 渲染 |

### 前端 — 微信小程序 (Uni-app/)

| 技术 | 版本 | 用途 |
|------|------|------|
| Uni-app (Dcloud) | latest | 跨端小程序框架 |
| Vue | 3.4.21 | 前端框架 |
| Pinia | 2.1.7 | 状态管理 |
| Vite | 5.2.8 | 构建工具 |

### 辅助脚本 (py/)

| 文件 | 用途 |
|------|------|
| `baidu_image_scraper.py` | 百度图片爬虫，批量采集蛇类样本图 |
| `hospital-service-py/hospital.py` | 医院服务 Python 原型 |
| `hospital-service-py/map.py` | 地图/路径规划 Python 原型 |
| `hospital-service-py/rode.py` | 道路/导航相关 Python 原型 |

---

## 四、项目目录结构

```
Sling/
├── pom.xml                    # Maven 父 POM（多模块聚合）
├── 启动脚本.bat                # 一键启动所有服务（交互式菜单）
├── 重启脚本.bat                # 服务重启脚本
├── 停止脚本.bat                # 服务停止脚本
├── deploy-to-vm.sh            # 虚拟机部署脚本
├── 项目综合介绍书.md           # 项目详细技术文档
├── 项目立项计划书.md           # 项目立项/规划文档
│
├── snake-gateway/             # API 网关
├── snake-common/              # 公共模块（DTO/Utils）
├── user-service/              # 用户服务
├── recognition-service/       # 蛇类识别服务
├── warning-service/           # 预警服务
├── hospital-service/          # 医院/血清服务
├── emergency-service/         # 应急处理服务
├── snake-info-service/        # 蛇类信息服务
├── admin-service/             # 后台管理服务
│
├── vue3/                      # Vue3 Web 管理台
├── Uni-app/                   # Uni-app 微信小程序
│
├── nacos-configs/             # Nacos 配置文件
├── database/                  # 数据库 SQL 导出
│   └── sling_complete.sql
├── sheji/                     # 设计过程文档/笔记
├── tu/                        # 蛇类样本图片库（17种蛇）
├── py/                        # Python 辅助脚本
├── logs/                      # 运行日志
├── uploads/                   # 上传文件目录
└── work/                      # Tomcat 工作目录
```

---

## 五、启动说明

### 前置条件
- JDK 17
- Maven 3.x
- Node.js 18+
- Nacos 2.x（默认路径 `D:\nacos`）
- MySQL 8.0

### 启动方式

**一键启动**：双击 `启动脚本.bat`，交互式菜单选择启动服务。

启动顺序：Nacos → Gateway → 各业务服务 → 前端

### 访问地址
| 服务 | 地址 |
|------|------|
| 前端管理台 | http://localhost:5173/ |
| API 网关 | http://localhost:8888/ |
| Nacos 控制台 | http://localhost:8848/nacos |

---

## 六、数据库

数据库文件位于 `database/sling_complete.sql`，包含完整的表结构和初始数据。

核心业务表包括：
- `user_info` / `role` / `user_role` / `user_permission` — 用户与权限
- `snake_info` / `snake_feature` — 蛇类百科与特征
- `recognition_record` — 识别记录
- `warning_info` — 预警信息
- `hospital_info` / `serum_info` — 医院与血清
- `emergency_guide` — 应急指南

---

## 七、清理说明（2026-05-07）

本次清理删除了根目录下 **50+ 冗余文件**，包括：

- **32 个** 零散 .bat 脚本（测试脚本、一次性工具、重复的启动脚本等），功能已被 `启动/重启/停止脚本` 三个核心脚本覆盖
- **2 个** .ps1 PowerShell 脚本
- **3 个** 测试 HTML 文件
- **6 个** 日志/临时文件（derby.log, mysql_*.log, qodana.yaml 等）
- **5 个** 零字节/临时配置文件
- **20 个** 冗余 .md/.txt 文档（旧版部署指南、MySQL 修复日志、优化记录等）
- **1 个** 临时测试目录 `3/`
- **1 张** 测试用图片 `test_image.jpg`

**保留的核心文件**：启动脚本.bat、重启脚本.bat、停止脚本.bat、项目综合介绍书.md、项目立项计划书.md、deploy-to-vm.sh