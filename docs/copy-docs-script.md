# 文档整理脚本

以下是从项目根目录整理到docs目录的文档：

## 已整理的文档

1. [项目概述](./project-overview.md) - 从PROJECT_OVERVIEW.md提取
2. [技术架构](./tech-architecture.md) - 从PROJECT_OVERVIEW.md提取
3. [开发指南](./development-guide.md) - 基于项目信息创建
4. [API文档](./api-reference.md) - 基于项目API结构创建
5. [数据库设计](./database-design.md) - 基于数据库结构创建
6. [部署手册](./deployment.md) - 基于部署信息创建
7. [项目规划](./roadmap.md) - 从下一步规划书提取
8. [动物识别分析](./animal-identification-analysis.md) - 从分析报告转换
9. [微服务设计](./microservice-design.md) - 基于微服务架构创建

## 原始文档来源

- PROJECT_OVERVIEW.md - 项目概况与技术栈
- 项目立项计划书.md - 项目初始规划
- 下一步规划书.md - 项目后续规划
- 项目综合介绍书.md - 详细技术文档
- ANIMAL_IDENTIFICATION_SYSTEMS_ANALYSIS.md - 相关开源项目分析

## 文档目录结构

```
docs/
├── README.md                 # 文档中心主页
├── project-overview.md       # 项目概述
├── tech-architecture.md      # 技术架构
├── development-guide.md      # 开发指南
├── api-reference.md          # API文档
├── database-design.md        # 数据库设计
├── deployment.md             # 部署手册
├── roadmap.md                # 项目规划
├── animal-identification-analysis.md  # 动物识别系统分析
├── microservice-design.md    # 微服务设计
├── copy-docs-script.md       # 文档整理脚本
└── structure.txt             # 结构说明
```

## 文档维护指南

1. 所有项目文档应放置在docs/目录下
2. 使用Markdown格式编写文档
3. 保持文档与代码同步更新
4. 定期审查和更新文档内容