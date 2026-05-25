@echo off
cls
echo ================================
echo Interactive SLING Application Launcher
echo ================================

echo 1. Cleaning ports...
rem Kill Java processes (port-based cleanup below handles Node processes precisely)
taskkill /f /im java.exe >nul 2>&1

timeout /t 3 /nobreak >nul

echo Checking and releasing occupied ports...
for %%i in (8848 8888 3000 8080 8081 8082 8083 8091 8092 9093 8089 7006 7003) do (
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%%i ^| findstr LISTENING') do (
        echo Killing process on port %%i with PID %%a
        taskkill /f /pid %%a >nul 2>&1
    )
)

timeout /t 2 /nobreak >nul

echo 2. Starting Nacos server...
if not exist "D:\nacos\bin" (
    echo Error: Nacos installation not found at D:\nacos
    echo Please install Nacos first or specify correct path
    pause
    exit /b 1
)

cd /d D:\nacos\bin
start "Nacos Server" cmd /c "startup.cmd -m standalone"
cd /d C:\Users\Asuka\Desktop\1\Sling

echo Waiting for Nacos to be ready (look for 'Nacos started
































































































































































































































































































































































































































































 successfully' message)...
set "NACOS_READY=0"
for /l %%i in (1,1,120) do (
    timeout /t 2 /nobreak >nul
    :: Check if nacos.log exists before trying to read it
    if exist "D:\nacos\logs\nacos.log" (
        findstr "Nacos started successfully in stand alone mode" "D:\nacos\logs\nacos.log" >nul 2>&1
        if !errorlevel! equ 0 (
            set "NACOS_READY=1"
            echo Nacos is ready! (took %%i attempts)
            goto nacos_ready
        )
    )
)

if !NACOS_READY! equ 0 (
    echo Warning: Could not confirm Nacos startup from logs, checking port...
    for /l %%j in (1,1,30) do (
        netstat -an | findstr ":8848 " | findstr "LISTENING" >nul
        if !errorlevel! equ 0 (
            curl.exe -s --connect-timeout 5 http://localhost:8848/nacos | findstr "Nacos" >nul
            if !errorlevel! equ 0 (
                echo Nacos appears to be running on port 8848
                goto nacos_ready
            )
        )
        timeout /t 2 /nobreak >nul
    )
    echo Continuing anyway...
)

:nacos_ready

echo.
echo ================================
echo Nacos server is now running!
echo ================================
echo What would you like to do next?
echo 1. Start all remaining services (Gateway, User, Admin, Recognition, Warning, Emergency, Hospital, Frontend)
echo 2. Start only Gateway service
echo 3. Start only User service
echo 4. Start only Admin service
echo 5. Start only Recognition service
echo 6. Start only Warning service
echo 7. Start only Emergency service
echo 8. Start only Hospital service
echo 9. Start only Frontend
echo 10. Exit
echo ================================

choice /c 1234567890 /m "Enter your choice"
if errorlevel 10 goto :eof
if errorlevel 9 goto start_frontend
if errorlevel 8 goto start_hospital
if errorlevel 7 goto start_emergency
if errorlevel 6 goto start_warning
if errorlevel 5 goto start_recognition
if errorlevel 4 goto start_admin
if errorlevel 3 goto start_user
if errorlevel 2 goto start_gateway
if errorlevel 1 goto start_all

:start_all
echo Starting all remaining services...
call :start_gateway
timeout /t 8 /nobreak >nul
call :start_user
timeout /t 8 /nobreak >nul
call :start_admin
timeout /t 8 /nobreak >nul
call :start_recognition
timeout /t 8 /nobreak >nul
call :start_warning
timeout /t 8 /nobreak >nul
call :start_emergency
timeout /t 8 /nobreak >nul
call :start_hospital
timeout /t 8 /nobreak >nul
call :start_frontend
goto end

:start_gateway
echo Starting Gateway Service...
cd snake-gateway
if not exist "pom.xml" (
    echo Error: pom.xml not found in snake-gateway directory
    pause
    exit /b 1
)
start "Gateway Service" cmd /c "mvn spring-boot:run"
if errorlevel 1 (
    echo Error occurred while starting Gateway Service
    pause
    exit /b 1
)
cd ..
timeout /t 5 /nobreak >nul
goto :eof

:start_user
echo Starting User Service...
cd user-service
if not exist "pom.xml" (
    echo Error: pom.xml not found in user-service directory
    pause
    exit /b 1
)
start "User Service" cmd /c "mvn spring-boot:run"
if errorlevel 1 (
    echo Error occurred while starting User Service
    pause
    exit /b 1
)
cd ..
timeout /t 5 /nobreak >nul
goto :eof

:start_admin
echo Starting Admin Service...
cd admin-service
if not exist "pom.xml" (
    echo Error: pom.xml not found in admin-service directory
    pause
    exit /b 1
)
start "Admin Service" cmd /c "mvn spring-boot:run"
if errorlevel 1 (
    echo Error occurred while starting Admin Service
    pause
    exit /b 1
)
cd ..
timeout /t 5 /nobreak >nul
goto :eof

:start_recognition
echo Starting Recognition Service...
cd recognition-service
if not exist "pom.xml" (
    echo Error: pom.xml not found in recognition-service directory
    pause
    exit /b 1
)
start "Recognition Service" cmd /c "mvn spring-boot:run"
if errorlevel 1 (
    echo Error occurred while starting Recognition Service
    pause
    exit /b 1
)
cd ..
timeout /t 5 /nobreak >nul
goto :eof

:start_warning
echo Starting Warning Service...
cd warning-service
if not exist "pom.xml" (
    echo Error: pom.xml not found in warning-service directory
    pause
    exit /b 1
)
start "Warning Service" cmd /c "mvn spring-boot:run"
if errorlevel 1 (
    echo Error occurred while starting Warning Service
    pause
    exit /b 1
)
cd ..
timeout /t 5 /nobreak >nul
goto :eof

:start_emergency
echo Starting Emergency Service...
cd emergency-service
if not exist "pom.xml" (
    echo Error: pom.xml not found in emergency-service directory
    pause
    exit /b 1
)
start "Emergency Service" cmd /c "mvn spring-boot:run"
if errorlevel 1 (
    echo Error occurred while starting Emergency Service
    pause
    exit /b 1
)
cd ..
timeout /t 5 /nobreak >nul
goto :eof

:start_hospital
echo Starting Hospital Service...
cd hospital-service
if not exist "pom.xml" (
    echo Error: pom.xml not found in hospital-service directory
    pause
    exit /b 1
)
start "Hospital Service" cmd /c "mvn spring-boot:run"
if errorlevel 1 (
    echo Error occurred while starting Hospital Service
    pause
    exit /b 1
)
cd ..
timeout /t 5 /nobreak >nul
goto :eof

:start_frontend
echo Starting Frontend Vue Application...
cd vue3
if not exist "package.json" (
    echo Error: package.json not found in vue3 directory
    pause
    exit /b 1
)
start "Frontend" cmd /c "npm run dev"
if errorlevel 1 (
    echo Error occurred while starting Frontend
    pause
    exit /b 1
)
cd ..
timeout /t 5 /nobreak >nul
goto :eof

:end
echo.
echo ================================
echo Selected services started!
echo ================================
echo Access URLs:
echo Frontend: http://localhost:3000/
echo Gateway: http://localhost:8888/
echo Nacos: http://localhost:8848/nacos
echo Admin Service: http://localhost:8091/
echo Emergency Service: http://localhost:9093/
echo Hospital Service: http://localhost:8089/
echo ================================
pause