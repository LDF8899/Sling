@echo off
cls
echo ================================
echo SLING Application Stopper
echo ================================

echo What would you like to do?
echo 1. Stop all services
echo 2. Stop only backend services (keep Nacos + Redis + Frontend)
echo 3. Stop only frontend
echo 4. Stop all and release ports
echo 5. Exit
echo ================================

choice /c 12345 /m "Enter your choice"
if errorlevel 5 goto :eof
if errorlevel 4 goto stop_all_release
if errorlevel 3 goto stop_frontend
if errorlevel 2 goto stop_backends
if errorlevel 1 goto stop_all

:stop_all
echo Stopping all services...
for %%i in (8888 3000 7002 7003 7005 7006 8089 8092 9093) do (
    for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :%%i ^| findstr LISTENING') do (
        echo    Killing PID %%a on port %%i
        taskkill /f /pid %%a >nul 2>&1
    )
)
echo All services stopped.
goto end

:stop_backends
echo Stopping backend services...
for %%i in (8888 7002 7003 7005 7006 8089 8092 9093) do (
    for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :%%i ^| findstr LISTENING') do (
        echo    Killing PID %%a on port %%i
        taskkill /f /pid %%a >nul 2>&1
    )
)
echo Backend services stopped.
goto end

:stop_frontend
echo Stopping frontend...
for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :3000 ^| findstr LISTENING') do (
    echo    Killing PID %%a on port 3000
    taskkill /f /pid %%a >nul 2>&1
)
echo Frontend stopped.
goto end

:stop_all_release
echo Stopping all and releasing ports...
for %%i in (8848 8888 3000 6379 7002 7003 7005 7006 8089 8092 9093) do (
    for /f "tokens=5" %%a in ('netstat -ano 2^>nul ^| findstr :%%i ^| findstr LISTENING') do (
        echo    Killing PID %%a on port %%i
        taskkill /f /pid %%a >nul 2>&1
    )
)
echo All services stopped and ports released.
goto end

:end
echo.
echo ================================
echo Done!
echo ================================
pause
