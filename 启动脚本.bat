@echo off
setlocal EnableDelayedExpansion
cls
echo ================================
echo SLING - Windows Terminal Unified Launcher
echo ================================

rem === Check Windows Terminal ===
where wt >nul 2>&1
if errorlevel 1 (
    echo Error: Windows Terminal not found.
    echo Windows 11 should have it pre-installed.
    echo Install from Microsoft Store if missing.
    pause
    exit /b 1
)

rem === Step 1: Clean ports (port-based only, no blanket kill) ===
echo [1/4] Cleaning ports...
for %%i in (8848 8888 3000 7002 7003 7005 7006 8089 8092 9093) do (
    for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :%%i ^| findstr LISTENING') do (
        echo    Killing PID %%a on port %%i
        taskkill /f /pid %%a >nul 2>&1
    )
)
timeout /t 2 /nobreak >nul
echo    Ports cleaned.

rem === Step 2: Check Redis ===
echo [2/4] Checking Redis...
netstat -an 2>nul | findstr ":6379 " | findstr "LISTENING" >nul 2>&1
if !errorlevel! equ 0 (
    echo    Redis is running on port 6379.
) else (
    echo    Redis not detected. Attempting to start Docker container...
    docker start redis >nul 2>&1
    timeout /t 3 /nobreak >nul
    netstat -an 2>nul | findstr ":6379 " | findstr "LISTENING" >nul 2>&1
    if !errorlevel! equ 0 (
        echo    Redis started successfully.
    ) else (
        echo    Warning: Redis still not running. snake-info-service sync may fail.
    )
)

rem === Step 3: Start Nacos ===
echo [3/4] Starting Nacos...
if not exist "D:\nacos\bin\startup.cmd" (
    echo Error: Nacos not found at D:\nacos
    pause
    exit /b 1
)

start "Nacos" wt --title "Nacos (8848)" cmd /k "cd /d D:\nacos\bin && echo Starting Nacos... && startup.cmd -m standalone"

echo    Waiting for Nacos to be ready...
set "NACOS_OK=0"
for /l %%i in (1,1,60) do (
    if !NACOS_OK! equ 0 (
        timeout /t 2 /nobreak >nul
        netstat -an 2>nul | findstr ":8848 " | findstr "LISTENING" >nul 2>&1
        if !errorlevel! equ 0 (
            set "NACOS_OK=1"
            echo    Nacos ready! (attempt %%i)
        )
    )
)

if !NACOS_OK! equ 0 (
    echo    Warning: Nacos may not be fully ready, continuing anyway...
)

rem === Step 4: Start services in WT tabs ===
echo [4/4] Starting services...

set "BASE=C:\Users\Asuka\Desktop\1\Sling"
set "DELAY=8"

rem Gateway must start first and register to Nacos before others
start "Gateway" wt --title "Gateway (8888)" cmd /k "cd /d %BASE%\snake-gateway && echo Starting Gateway... && mvn spring-boot:run"
echo    Gateway (8888) started.
timeout /t %DELAY% /nobreak >nul

start "SnakeInfo" wt --title "SnakeInfo (7002)" cmd /k "cd /d %BASE%\snake-info-service && echo Starting Snake Info Service... && mvn spring-boot:run"
echo    SnakeInfo (7002) started.
timeout /t %DELAY% /nobreak >nul

start "User" wt --title "User (7006)" cmd /k "cd /d %BASE%\user-service && echo Starting User Service... && mvn spring-boot:run"
echo    User (7006) started.
timeout /t %DELAY% /nobreak >nul

start "Admin" wt --title "Admin (8092)" cmd /k "cd /d %BASE%\admin-service && echo Starting Admin Service... && mvn spring-boot:run"
echo    Admin (8092) started.
timeout /t %DELAY% /nobreak >nul

start "Recognition" wt --title "Recognition (7003)" cmd /k "cd /d %BASE%\recognition-service && echo Starting Recognition Service... && mvn spring-boot:run"
echo    Recognition (7003) started.
timeout /t %DELAY% /nobreak >nul

start "Warning" wt --title "Warning (7005)" cmd /k "cd /d %BASE%\warning-service && echo Starting Warning Service... && mvn spring-boot:run"
echo    Warning (7005) started.
timeout /t %DELAY% /nobreak >nul

start "Emergency" wt --title "Emergency (9093)" cmd /k "cd /d %BASE%\emergency-service && echo Starting Emergency Service... && mvn spring-boot:run"
echo    Emergency (9093) started.
timeout /t %DELAY% /nobreak >nul

start "Hospital" wt --title "Hospital (8089)" cmd /k "cd /d %BASE%\hospital-service && echo Starting Hospital Service... && mvn spring-boot:run"
echo    Hospital (8089) started.
timeout /t %DELAY% /nobreak >nul

start "Frontend" wt --title "Frontend (3000)" cmd /k "cd /d %BASE%\vue3 && echo Starting Frontend... && npm run dev"
echo    Frontend (3000) started.

rem === Done ===
echo.
echo ================================
echo  All services launched!
echo ================================
echo  Windows Terminal tabs:
echo    Redis (Docker): http://localhost:6379
echo    Nacos         : http://localhost:8848/nacos
echo    Gateway       : http://localhost:8888/
echo    SnakeInfo     : http://localhost:7002/
echo    User          : http://localhost:7006/
echo    Admin         : http://localhost:8092/
echo    Recognition   : http://localhost:7003/
echo    Warning       : http://localhost:7005/
echo    Emergency     : http://localhost:9093/
echo    Hospital      : http://localhost:8089/
echo    Frontend      : http://localhost:3000/
echo ================================
echo  Use Ctrl+Tab in Windows Terminal to switch tabs.
echo ================================
pause
