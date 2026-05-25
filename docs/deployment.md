# Sling 项目部署手册

## 1. 部署架构

Sling项目采用微服务架构，包含多个服务组件，需要按照一定顺序进行部署。

## 2. 环境要求

### 2.1 服务器要求
- **操作系统**: Linux (推荐 Ubuntu 20.04+/CentOS 7+) 或 Windows Server
- **内存**: 最少 8GB RAM（推荐 16GB+）
- **CPU**: 4 核及以上
- **磁盘**: 50GB 可用空间
- **网络**: 稳定的互联网连接

### 2.2 软件依赖
- **Java**: JDK 17+
- **Maven**: 3.6+
- **Node.js**: 18+
- **Nacos**: 2.x（用于服务发现和配置管理）
- **MySQL**: 8.0（用于数据持久化）
- **Redis**: 7.x（用于缓存）
- **Docker**: 可选（用于容器化部署）

## 3. 部署步骤

### 3.1 基础环境部署

#### 3.1.1 安装 Java 和 Maven
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install openjdk-17-jdk maven

# CentOS/RHEL
sudo yum install java-17-openjdk-devel maven
```

#### 3.1.2 安装并启动 MySQL
```bash
# Ubuntu/Debian
sudo apt install mysql-server
sudo systemctl start mysql
sudo systemctl enable mysql

# CentOS/RHEL
sudo yum install mysql-server
sudo systemctl start mysqld
sudo systemctl enable mysqld
```

#### 3.1.3 安装并启动 Nacos
```bash
# 下载 Nacos
wget https://github.com/alibaba/nacos/releases/download/2.1.0/nacos-server-2.1.0.tar.gz
tar -xvf nacos-server-2.1.0.tar.gz
cd nacos/bin

# 启动 Nacos（单机模式）
./startup.sh -m standalone
```

### 3.2 数据库初始化

1. 创建数据库
```sql
CREATE DATABASE sling_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

2. 执行数据库脚本
```bash
mysql -u root -p sling_db < database/sling_complete.sql
```

### 3.3 服务部署

#### 3.3.1 后端服务部署

1. 克隆代码并构建
```bash
git clone https://github.com/your-org/sling.git
cd sling
mvn clean package -DskipTests
```

2. 按顺序启动服务
```bash
# 1. 启动网关服务
java -jar snake-gateway/target/snake-gateway.jar &

# 2. 启动公共组件
# 无额外操作（作为依赖存在）

# 3. 启动业务服务（可并行启动）
java -jar user-service/target/user-service.jar &
java -jar snake-info-service/target/snake-info-service.jar &
java -jar recognition-service/target/recognition-service.jar &
java -jar hospital-service/target/hospital-service.jar &
java -jar warning-service/target/warning-service.jar &
java -jar emergency-service/target/emergency-service.jar &
java -jar admin-service/target/admin-service.jar &
```

#### 3.3.2 前端部署

1. 部署 Web 管理后台
```bash
cd vue3
npm install
npm run build
# 将 dist 目录部署到 Web 服务器（如 Nginx）
```

2. 部署 Uni-app 前端
```bash
cd Uni-app
npm install
# 构建为相应平台（如 H5、小程序等）
```

### 3.4 Nginx 配置（可选）

如果需要使用 Nginx 代理前端请求：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # 前端静态文件
    location / {
        root /path/to/vue3/dist;
        try_files $uri $uri/ /index.html;
    }

    # API 请求代理到网关
    location /api/ {
        proxy_pass http://localhost:8888/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

## 4. Docker 部署（可选）

### 4.1 构建 Docker 镜像
```bash
# 构建后端服务镜像
docker build -t sling/gateway -f snake-gateway/Dockerfile .
docker build -t sling/user-service -f user-service/Dockerfile .
# ... 为其他服务构建镜像

# 构建前端镜像
docker build -t sling/frontend -f vue3/Dockerfile .
```

### 4.2 使用 Docker Compose 部署
```yaml
version: '3.8'

services:
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: your_password
      MYSQL_DATABASE: sling_db
    volumes:
      - ./database/sling_complete.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "3306:3306"

  nacos:
    image: nacos/nacos-server:latest
    environment:
      MODE: standalone
    ports:
      - "8848:8848"

  gateway:
    image: sling/gateway
    depends_on:
      - nacos
    ports:
      - "8888:8888"

  user-service:
    image: sling/user-service
    depends_on:
      - nacos
      - mysql

  # ... 其他服务
```

## 5. 配置说明

### 5.1 服务配置
各服务的配置文件位于 `src/main/resources/application.yml`，需要根据部署环境修改：
- 数据库连接信息
- Nacos 地址
- 端口号（避免冲突）
- Redis 配置

### 5.2 环境变量
- `SPRING_PROFILES_ACTIVE`: 指定运行环境（dev/test/prod）
- `MYSQL_HOST`, `MYSQL_PORT`: 数据库连接地址
- `NACOS_ADDR`: Nacos 服务地址

## 6. 监控和日志

### 6.1 日志管理
- 各服务日志位于 `logs/` 目录
- 可配置日志轮转和归档策略

### 6.2 健康检查
- 网关: http://localhost:8888/actuator/health
- 各微服务: http://localhost:{port}/actuator/health

## 7. 启停脚本

### 7.1 启动脚本
使用项目提供的 `启动脚本.bat` 或 `deploy-to-vm.sh`。

### 7.2 停止脚本
使用 `停止脚本.bat` 或手动 kill 进程。

## 8. 故障排除

### 8.1 常见问题
- 服务无法注册到 Nacos：检查网络连通性和 Nacos 状态
- 数据库连接失败：检查数据库服务状态和连接参数
- 端口冲突：检查端口占用情况并修改配置

### 8.2 诊断命令
```bash
# 检查端口占用
netstat -tulpn | grep :8888

# 检查服务状态
curl http://localhost:8888/actuator/health

# 查看日志
tail -f logs/spring.log
```