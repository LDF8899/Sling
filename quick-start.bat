@echo off
setlocal
cls
echo ================================
echo SLING - Quick Start (Core Only)
echo ================================
echo.
echo Starting: Docker + Nacos + Gateway + Frontend
echo.

set BASE=C:\Users\Asuka\Desktop\1\Sling

rem Docker
echo [1/4] Docker...
docker compose -f D:\middleware\docker-compose.yml -p middleware --profile core up -d >nul 2>&1
timeout /t 8 /nobreak >nul
echo    Done.

rem Nacos
echo [2/4] Nacos...
start "Nacos" cmd /k "cd /d D:\nacos\bin && startup.cmd -m standalone"
timeout /t 10 /nobreak >nul
echo    Done.

rem Gateway
echo [3/4] Gateway...
start "Gateway" cmd /k "cd /d %BASE%\snake-gateway && mvn spring-boot:run"
timeout /t 8 /nobreak >nul
echo    Done.

rem Frontend
echo [4/4] Frontend...
start "Frontend" cmd /k "cd /d %BASE%\vue3 && npm run dev"
echo    Done.

echo.
echo ================================
echo Ready!
echo   Gateway : http://localhost:8888
echo   Nacos   : http://localhost:8848/nacos
echo   Frontend: http://localhost:3000
echo ================================
echo.
echo Start other services manually:
echo   cd snake-info-service ^&^& mvn spring-boot:run
echo   cd user-service ^&^& mvn spring-boot:run
echo   cd admin-service ^&^& mvn spring-boot:run
echo   ...
echo ================================
pause
