@echo off
echo Starting hospital-service...

cd /d "C:\Users\Asuka\Desktop\1\Sling\hospital-service"

set SERVER_PORT=8089
mvn spring-boot:run

pause