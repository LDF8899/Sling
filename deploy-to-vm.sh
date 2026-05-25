#!/bin/bash

# ========================================
# Sling 项目虚拟机部署脚本 (Linux 版本)
# ========================================
# 用途：在虚拟机上自动部署 Sling 项目
# 使用方式：bash deploy-to-vm.sh
# ========================================

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置变量
VM_IP="192.168.201.129"
PROJECT_NAME="sling"
DEPLOY_DIR="/opt/sling"
NACOS_DIR="/opt/nacos"
MYSQL_ROOT_PASSWORD="123456"

# 打印函数
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查是否以 root 运行
check_root() {
    if [ "$EUID" -ne 0 ]; then 
        print_error "请使用 sudo 运行此脚本"
        exit 1
    fi
}

# 检查系统要求
check_requirements() {
    print_info "检查系统要求..."
    
    # 检查 Java
    if ! command -v java &> /dev/null; then
        print_warning "Java 未安装，正在安装 OpenJDK 17..."
        apt update && apt install -y openjdk-17-jdk
    else
        JAVA_VERSION=$(java -version 2>&1 | head -n 1)
        print_success "Java 已安装：$JAVA_VERSION"
    fi
    
    # 检查 Maven
    if ! command -v mvn &> /dev/null; then
        print_warning "Maven 未安装，正在安装..."
        apt install -y maven
    else
        MVN_VERSION=$(mvn -version 2>&1 | head -n 1)
        print_success "Maven 已安装：$MVN_VERSION"
    fi
    
    # 检查 Node.js
    if ! command -v node &> /dev/null; then
        print_warning "Node.js 未安装，正在安装..."
        curl -fsSL https://deb.nodesource.com/setup_lts.x | bash -
        apt install -y nodejs
    else
        NODE_VERSION=$(node --version)
        print_success "Node.js 已安装：$NODE_VERSION"
    fi
    
    # 检查 MySQL
    if ! command -v mysql &> /dev/null; then
        print_warning "MySQL 未安装，正在安装..."
        apt install -y mysql-server
        systemctl start mysql
        systemctl enable mysql
        
        # 设置 root 密码
        mysql -u root -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '$MYSQL_ROOT_PASSWORD'; FLUSH PRIVILEGES;"
        print_success "MySQL 安装完成"
    else
        print_success "MySQL 已安装"
    fi
    
    # 检查 Nacos
    if [ ! -d "$NACOS_DIR" ]; then
        print_warning "Nacos 未安装，正在下载..."
        mkdir -p $NACOS_DIR
        cd /tmp
        wget https://github.com/alibaba/nacos/releases/download/v2.2.3/nacos-server-2.2.3.tar.gz
        tar -xzf nacos-server-2.2.3.tar.gz -C $NACOS_DIR --strip-components=1
        print_success "Nacos 安装完成"
    else
        print_success "Nacos 已安装"
    fi
}

# 初始化数据库
init_database() {
    print_info "初始化数据库..."
    
    mysql -u root -p"$MYSQL_ROOT_PASSWORD" << EOF
CREATE DATABASE IF NOT EXISTS sling DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sling;
-- 这里会导入 SQL 文件，稍后手动执行
EOF
    
    print_success "数据库创建完成"
}

# 复制项目文件
copy_project_files() {
    print_info "复制项目文件到 $DEPLOY_DIR..."
    
    mkdir -p $DEPLOY_DIR
    
    # 假设项目文件在 /mnt/hgfs/共享文件夹 或通过 scp 传输
    # 这里根据实际情况调整
    if [ -d "/mnt/hgfs/Sling" ]; then
        cp -r /mnt/hgfs/Sling/* $DEPLOY_DIR/
    elif [ -d "/shared/Sling" ]; then
        cp -r /shared/Sling/* $DEPLOY_DIR/
    else
        print_warning "未找到共享文件夹，请手动复制项目文件到 $DEPLOY_DIR"
        return 1
    fi
    
    print_success "项目文件复制完成"
}

# 修改配置文件
update_config_files() {
    print_info "修改配置文件..."
    
    cd $DEPLOY_DIR
    
    # 替换所有配置文件中的 localhost 为虚拟机 IP
    find . -name "application.yml" -type f -exec sed -i "s/localhost:/$VM_IP:/g" {} \;
    find . -name "application-common-dev.yml" -type f -exec sed -i "s/localhost:/$VM_IP:/g" {} \;
    
    # 特别处理 MySQL 连接
    find . -name "application.yml" -type f -exec sed -i "s/jdbc:mysql:\/\/localhost/jdbc:mysql:\/\/$VM_IP/g" {} \;
    
    # 特别处理 Nacos 地址
    find . -name "application.yml" -type f -exec sed -i "s/server-addr: localhost/server-addr: $VM_IP/g" {} \;
    
    print_success "配置文件修改完成"
}

# 编译项目
build_project() {
    print_info "编译项目..."
    
    cd $DEPLOY_DIR
    
    # 清理旧的构建文件
    mvn clean
    
    # 编译打包（跳过测试）
    mvn package -DskipTests -q
    
    print_success "项目编译完成"
}

# 启动服务
start_services() {
    print_info "启动服务..."
    
    # 启动 Nacos
    print_info "启动 Nacos..."
    cd $NACOS_DIR/bin
    ./startup.sh -m standalone
    sleep 30
    
    # 检查 Nacos 是否启动成功
    if curl -s http://$VM_IP:8848/nacos | grep -q "Nacos"; then
        print_success "Nacos 启动成功"
    else
        print_warning "Nacos 可能未正常启动，请检查日志"
    fi
    
    # 启动各个微服务
    cd $DEPLOY_DIR
    
    SERVICES=(
        "snake-gateway/target/snake-gateway-1.0-SNAPSHOT.jar"
        "user-service/target/user-service-1.0-SNAPSHOT.jar"
        "admin-service/target/admin-service-1.0-SNAPSHOT.jar"
        "recognition-service/target/recognition-service-1.0-SNAPSHOT.jar"
        "warning-service/target/warning-service-1.0-SNAPSHOT.jar"
        "emergency-service/target/emergency-service-1.0-SNAPSHOT.jar"
        "hospital-service/target/hospital-service-1.0-SNAPSHOT.jar"
        "snake-info-service/target/snake-info-service-1.0-SNAPSHOT.jar"
    )
    
    for service in "${SERVICES[@]}"; do
        if [ -f "$service" ]; then
            print_info "启动 $service..."
            nohup java -jar -Xms512m -Xmx1024m "$service" > "${service%.jar}.log" 2>&1 &
            sleep 5
        else
            print_warning "未找到：$service"
        fi
    done
    
    print_success "所有后端服务已启动"
}

# 构建并启动前端
setup_frontend() {
    print_info "构建前端..."
    
    cd $DEPLOY_DIR/vue3
    
    # 安装依赖
    npm install
    
    # 修改 API 地址
    if [ -f "src/services/api.js" ]; then
        sed -i "s|http://localhost:8888|http://$VM_IP:8888|g" src/services/api.js
    fi
    
    # 构建生产版本
    npm run build
    
    print_success "前端构建完成"
    
    # 可选：启动开发服务器或使用 Nginx
    print_info "如需启动前端开发服务器，请执行:"
    print_info "cd $DEPLOY_DIR/vue3 && npm run dev -- --host 0.0.0.0"
}

# 显示访问信息
show_access_info() {
    echo ""
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}部署完成！访问信息如下:${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo ""
    echo "Nacos 控制台：http://$VM_IP:8848/nacos"
    echo "API 网关：http://$VM_IP:8888"
    echo "前端页面：http://$VM_IP:5173 (如果启动了前端)"
    echo ""
    echo "服务进程查看:"
    echo "  jps -l"
    echo ""
    echo "日志查看:"
    echo "  tail -f $DEPLOY_DIR/*/target/*.log"
    echo ""
    echo -e "${GREEN}========================================${NC}"
}

# 主函数
main() {
    print_info "开始部署 Sling 项目到虚拟机..."
    echo ""
    
    check_root
    check_requirements
    init_database
    copy_project_files
    update_config_files
    build_project
    start_services
    setup_frontend
    show_access_info
    
    print_success "部署完成!"
}

# 执行主函数
main "$@"
