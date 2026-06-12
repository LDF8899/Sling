@echo off
setlocal EnableDelayedExpansion
cls
echo ================================
echo SLING - Windows Launcher
echo ================================

rem === Step 1: Clean ports ===
echo [1/5] Cleaning ports...
for %%p in (5672 6379 7002 7003 7005 7006 7010 8089 8092 8848 8888 9093 15672 27017) do (
    for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :%%p ^| findstr LISTENING') do (
        taskkill /f /pid %%a >nul 2>&1
    )
)
timeout /t 2 /nobreak >nul
echo    Ports cleaned.

rem === Step 2: Docker ===
echo [2/5] Checking Docker...
docker info >nul 2>&1
if errorlevel 1 (
    echo    Starting Docker Desktop...
    start "" "C:\Program Files\Docker\Docker\Docker Desktop.exe"
    echo    Waiting for Docker...
    :wait_docker
    timeout /t 3 /nobreak >nul
    docker info >nul 2>&1
    if errorlevel 1 goto wait_docker
    echo    Docker ready!
)

echo    Starting containers...
docker compose -f D:\middleware\docker-compose.yml -p middleware --profile core up -d >nul 2>&1
timeout /t 10 /nobreak >nul
echo    Containers started.

rem === Step 3: Nacos ===
echo [3/5] Starting Nacos...
start "Nacos" cmd /k "cd /d D:\nacos\bin && startup.cmd -m standalone"
timeout /t 15 /nobreak >nul
echo    Nacos starting...

rem === Step 4: Services ===
echo [4/5] Starting services...

set BASE=C:\Users\Asuka\Desktop\1\Sling

start "Gateway" cmd /k "cd /d %BASE%\snake-gateway && mvn spring-boot:run"
echo    Gateway (8888)
timeout /t 8 /nobreak >nul

start "SnakeInfo" cmd /k "cd /d %BASE%\snake-info-service && mvn spring-boot:run"
echo    SnakeInfo (7002)
timeout /t 8 /nobreak >nul

start "User" cmd /k "cd /d %BASE%\user-service && mvn spring-boot:run"
echo    User (7006)
timeout /t 8 /nobreak >nul

start "Admin" cmd /k "cd /d %BASE%\admin-service && mvn spring-boot:run"
echo    Admin (8092)
timeout /t 8 /nobreak >nul

start "Recognition" cmd /k "cd /d %BASE%\recognition-service && mvn spring-boot:run"
echo    Recognition (7003)
timeout /t 8 /nobreak >nul

start "Warning" cmd /k "cd /d %BASE%\warning-service && mvn spring-boot:run"
echo    Warning (7005)
timeout /t 8 /nobreak >nul

start "Emergency" cmd /k "cd /d %BASE%\emergency-service && mvn spring-boot:run"
echo    Emergency (9093)
timeout /t 8 /nobreak >nul

start "Hospital" cmd /k "cd /d %BASE%\hospital-service && mvn spring-boot:run"
echo    Hospital (8089)
timeout /t 8 /nobreak >nul

start "Agent" cmd /k "cd /d %BASE%\agent-service && mvn spring-boot:run"
echo    Agent (7010)
timeout /t 8 /nobreak >nul

start "Frontend" cmd /k "cd /d %BASE%\vue3 && npm run dev"
echo    Frontend (3000)

rem === Done ===
echo.
echo [5/5] All services launched!
echo ================================
echo  Docker: MySQL(3307) Redis(6379) RabbitMQ(5672) MongoDB(27017)
echo  Nacos : http://localhost:8848/nacos
echo  API   : http://localhost:8888/
echo  Admin : http://localhost:8092/
echo  Web   : http://localhost:3000/
echo ================================
pause
