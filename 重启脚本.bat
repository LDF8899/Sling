@echo off
cls
echo ================================
echo SLING Application Restarter
echo ================================

echo What would you like to restart?
echo 1. Restart all services
echo 2. Restart Gateway
echo 3. Restart SnakeInfo
echo 4. Restart User
echo 5. Restart Admin
echo 6. Restart Recognition
echo 7. Restart Warning
echo 8. Restart Emergency
echo 9. Restart Hospital
echo 0. Restart Frontend
echo A. Exit
echo ================================

choice /c 1234567890a /m "Enter your choice"
if errorlevel 11 goto :eof
if errorlevel 10 goto restart_frontend
if errorlevel 9 goto restart_hospital
if errorlevel 8 goto restart_emergency
if errorlevel 7 goto restart_warning
if errorlevel 6 goto restart_recognition
if errorlevel 5 goto restart_admin
if errorlevel 4 goto restart_user
if errorlevel 3 goto restart_snakeinfo
if errorlevel 2 goto restart_gateway
if errorlevel 1 goto restart_all

:restart_gateway
call :kill_port 8888
timeout /t 2 /nobreak >nul
start "Gateway" wt --title "Gateway (8888)" cmd /k "cd /d C:\Users\Asuka\Desktop\1\Sling\snake-gateway && mvn spring-boot:run"
echo Gateway restarted.
goto end

:restart_snakeinfo
call :kill_port 7002
timeout /t 2 /nobreak >nul
start "SnakeInfo" wt --title "SnakeInfo (7002)" cmd /k "cd /d C:\Users\Asuka\Desktop\1\Sling\snake-info-service && mvn spring-boot:run"
echo SnakeInfo restarted.
goto end

:restart_user
call :kill_port 7006
timeout /t 2 /nobreak >nul
start "User" wt --title "User (7006)" cmd /k "cd /d C:\Users\Asuka\Desktop\1\Sling\user-service && mvn spring-boot:run"
echo User restarted.
goto end

:restart_admin
call :kill_port 8092
timeout /t 2 /nobreak >nul
start "Admin" wt --title "Admin (8092)" cmd /k "cd /d C:\Users\Asuka\Desktop\1\Sling\admin-service && mvn spring-boot:run"
echo Admin restarted.
goto end

:restart_recognition
call :kill_port 7003
timeout /t 2 /nobreak >nul
start "Recognition" wt --title "Recognition (7003)" cmd /k "cd /d C:\Users\Asuka\Desktop\1\Sling\recognition-service && mvn spring-boot:run"
echo Recognition restarted.
goto end

:restart_warning
call :kill_port 7005
timeout /t 2 /nobreak >nul
start "Warning" wt --title "Warning (7005)" cmd /k "cd /d C:\Users\Asuka\Desktop\1\Sling\warning-service && mvn spring-boot:run"
echo Warning restarted.
goto end

:restart_emergency
call :kill_port 9093
timeout /t 2 /nobreak >nul
start "Emergency" wt --title "Emergency (9093)" cmd /k "cd /d C:\Users\Asuka\Desktop\1\Sling\emergency-service && mvn spring-boot:run"
echo Emergency restarted.
goto end

:restart_hospital
call :kill_port 8089
timeout /t 2 /nobreak >nul
start "Hospital" wt --title "Hospital (8089)" cmd /k "cd /d C:\Users\Asuka\Desktop\1\Sling\hospital-service && mvn spring-boot:run"
echo Hospital restarted.
goto end

:restart_frontend
call :kill_port 3000
timeout /t 2 /nobreak >nul
start "Frontend" wt --title "Frontend (3000)" cmd /k "cd /d C:\Users\Asuka\Desktop\1\Sling\vue3 && npm run dev"
echo Frontend restarted.
goto end

:restart_all
echo Restarting all services...
call :kill_port 8888
call :kill_port 7002
call :kill_port 7003
call :kill_port 7005
call :kill_port 7006
call :kill_port 8089
call :kill_port 8092
call :kill_port 9093
call :kill_port 3000
timeout /t 3 /nobreak >nul

set "BASE=C:\Users\Asuka\Desktop\1\Sling"
start "Gateway" wt --title "Gateway (8888)" cmd /k "cd /d %BASE%\snake-gateway && mvn spring-boot:run"
timeout /t 8 /nobreak >nul
start "SnakeInfo" wt --title "SnakeInfo (7002)" cmd /k "cd /d %BASE%\snake-info-service && mvn spring-boot:run"
timeout /t 8 /nobreak >nul
start "User" wt --title "User (7006)" cmd /k "cd /d %BASE%\user-service && mvn spring-boot:run"
timeout /t 8 /nobreak >nul
start "Admin" wt --title "Admin (8092)" cmd /k "cd /d %BASE%\admin-service && mvn spring-boot:run"
timeout /t 8 /nobreak >nul
start "Recognition" wt --title "Recognition (7003)" cmd /k "cd /d %BASE%\recognition-service && mvn spring-boot:run"
timeout /t 8 /nobreak >nul
start "Warning" wt --title "Warning (7005)" cmd /k "cd /d %BASE%\warning-service && mvn spring-boot:run"
timeout /t 8 /nobreak >nul
start "Emergency" wt --title "Emergency (9093)" cmd /k "cd /d %BASE%\emergency-service && mvn spring-boot:run"
timeout /t 8 /nobreak >nul
start "Hospital" wt --title "Hospital (8089)" cmd /k "cd /d %BASE%\hospital-service && mvn spring-boot:run"
timeout /t 8 /nobreak >nul
start "Frontend" wt --title "Frontend (3000)" cmd /k "cd /d %BASE%\vue3 && npm run dev"
echo All services restarted.
goto end

:kill_port
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :%1 ^| findstr LISTENING') do (
    taskkill /f /pid %%a >nul 2>&1
)
goto :eof

:end
echo.
echo ================================
echo Done!
echo ================================
pause
