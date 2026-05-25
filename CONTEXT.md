# 蛇灵 (SLING) — 项目全局概览

## 项目简介

智能蛇类识别与应急处理平台，面向户外工作者和爱好者，提供蛇类AI识别、风险预警、应急指导、医院/血清查询的一站式服务。

## 技术栈

- 前端：Vue3 Web 管理后台 + Uni-app 微信小程序
- 后端：Spring Cloud Alibaba 微服务，Java 17
- 数据库：MySQL 8.0，MyBatis-Plus
- 缓存：Redis 7.2（Docker），用于蛇类急救数据高速查询 + 医院 Geo 索引
- 架构理念：离线救命（本地 JSON）+ 云端增强（Redis + LLM）

## 模块概览

| 模块 | 端口 | 职责 |
|------|------|------|
| snake-gateway | 8888 | API 网关 |
| user-service | 7006 | 用户服务 |
| recognition-service | 7003 | 蛇类识别 |
| warning-service | 8091 | 风险预警 |
| hospital-service | 8089 | 医院查询 |
| emergency-service | 9093 | 应急服务 |
| snake-info-service | 7004 | 蛇类百科 |
| admin-service | 8092 | 后台管理 |

## 进度

- [x] 项目初始化，9 个微服务模块搭建完成
- [x] 数据库设计（16 张表），snake_info 已录入 204 种蛇（18科）
- [x] Agent Skills 配置（本地 markdown issue 追踪、中文分诊标签）
- [x] Redis Spring Boot 集成（snake-common 含 RedisConfig/RedisService，snake-info-service 含 RedisSyncRunner）
- [x] 蛇类科普知识图谱（SnakeGraphController + Cytoscape.js 前端）
- [x] 启动脚本优化（端口统一、Redis 自动检测、snake-info-service 纳入）
- [ ] snake_info 数据补全（目标 355 种，当前 204 种）
- [ ] snake_emergency_info 急救信息补全（当前 18 条，字段大量 NULL）
- [ ] 医院血清数据补全（当前 5 条）
- [ ] 小程序本地 JSON 离线数据生成
- [ ] recognition-service 改造（识别后从 Redis 取急救卡片）

## 关键文档

- [数据库设计文档](docs/数据库设计文档.md)
- [Redis 数据结构设计](docs/Redis数据结构设计.md)
- [待补充蛇种清单](sheji/待补充蛇种清单.md)

## 子上下文

- [Vue3 管理后台](vue3/CONTEXT.md)
- [微信小程序](Uni-app/CONTEXT.md)
- [Spring Cloud 后端](CONTEXT-后端.md)
