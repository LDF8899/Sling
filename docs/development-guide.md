# Sling 项目开发指南

## 1. 环境准备

### 1.1 开发环境要求
- **JDK**: 17+
- **Maven**: 3.6+
- **Node.js**: 18+
- **Nacos**: 2.x
- **MySQL**: 8.0
- **Git**: 最新版
- **IDE**: IntelliJ IDEA 或 VS Code

### 1.2 环境搭建步骤

#### 1.2.1 后端环境
1. 安装 JDK 17 并配置 JAVA_HOME
2. 安装 Maven 并配置环境变量
3. 安装并启动 Nacos Server
4. 安装并启动 MySQL 8.0
5. 克隆项目代码到本地

#### 1.2.2 前端环境
1. 安装 Node.js 18+
2. 安装 HBuilderX（用于 Uni-app 开发）
3. 安装 Vite 构建工具

## 2. 项目结构

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

## 3. 启动顺序

### 3.1 本地开发环境启动
1. 启动 Nacos Server（端口 8848）
2. 启动 MySQL 8.0
3. 启动 snake-gateway 服务（端口 8888）
4. 启动各业务服务
5. 启动前端开发服务器

### 3.2 一键启动
运行根目录下的 `启动脚本.bat`，选择相应选项启动服务。

## 4. 数据库配置

### 4.1 初始化数据库
1. 创建数据库 `sling_db`
2. 执行 `database/sling_complete.sql` 初始化表结构和数据

### 4.2 数据库连接配置
在各服务的 [application.yml](file:///c:/Users/Asuka/Desktop/1/Sling/snake-info-service/src/main/resources/application.yml) 文件中配置数据库连接信息。

## 5. 代码规范

### 5.1 Java 代码规范
- 遵循阿里巴巴 Java 开发规约
- 类名采用大驼峰命名法
- 方法名和变量名采用小驼峰命名法
- 常量全部大写，单词间用下划线分隔

### 5.2 前端代码规范
- Vue 组件文件以 `.vue` 结尾
- CSS 类名使用 kebab-case
- JS 变量遵循小驼峰命名法

## 6. 微服务开发

### 6.1 新增微服务
1. 在父 [pom.xml](file:///c:/Users/Asuka/Desktop/1/Sling/pom.xml) 中添加模块
2. 创建新的服务模块目录
3. 添加必要的依赖（Spring Boot、Spring Cloud、Nacos 等）
4. 配置 [application.yml](file:///c:/Users/Asuka/Desktop/1/Slink/snake-info-service/src/main/resources/application.yml) 文件
5. 编写业务逻辑

### 6.2 服务间通信
- 使用 OpenFeign 进行服务间调用
- 配置负载均衡策略
- 实现服务熔断和降级

## 7. API 文档规范

### 7.1 接口命名
- 使用 RESTful 风格
- GET /api/v1/snakes/{id} - 获取蛇类信息
- POST /api/v1/snakes - 创建蛇类信息
- PUT /api/v1/snakes/{id} - 更新蛇类信息
- DELETE /api/v1/snakes/{id} - 删除蛇类信息

### 7.2 接口返回格式
```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

## 8. 部署说明

### 8.1 本地部署
1. 打包各微服务：`mvn clean package -DskipTests`
2. 运行打包后的 jar 文件：`java -jar service-name.jar`
3. 启动前端：`npm run serve` 或 `npm run build`

### 8.2 服务器部署
使用 `deploy-to-vm.sh` 脚本进行服务器部署。

## 9. 问题排查

### 9.1 常见问题
- Nacos 未启动：检查端口 8848 是否被占用
- 数据库连接失败：检查数据库配置和网络连接
- 服务无法注册：检查 Nacos 配置和服务名

### 9.2 日志查看
- 服务日志：在各服务的日志目录下查看
- Nacos 日志：在 Nacos 安装目录下的 logs 目录
- MySQL 日志：根据 MySQL 配置查看对应日志文件