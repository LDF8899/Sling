#Requires -Version 5.1
$ErrorActionPreference = "Continue"
$BASE = "C:\Users\Asuka\Desktop\1\Sling"

function Wait-Port {
    param([int]$Port, [int]$Timeout = 120, [string]$Name = "Service")
    $elapsed = 0
    while ($elapsed -lt $Timeout) {
        $listening = netstat -ano | findstr "LISTENING" | findstr ":$Port "
        if ($listening) {
            Write-Host "   ✓ $Name ($Port) ready" -ForegroundColor Green
            return $true
        }
        Start-Sleep -Seconds 2
        $elapsed += 2
        Write-Host "   waiting $Name... ${elapsed}s" -ForegroundColor DarkGray
    }
    Write-Host "   ✗ $Name ($Port) timeout!" -ForegroundColor Red
    return $false
}

Clear-Host
Write-Host "================================" -ForegroundColor Cyan
Write-Host "SLING - Launcher" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Step 1: Clean ports
Write-Host "[1/5] Cleaning ports..." -ForegroundColor Cyan
$ports = @(5672, 6379, 7002, 7003, 7005, 7006, 7010, 8089, 8092, 8848, 8888, 9093, 15672, 27017)
foreach ($port in $ports) {
    Get-NetTCPConnection -LocalPort $port -ErrorAction SilentlyContinue | ForEach-Object {
        Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue
    }
}
Start-Sleep -Seconds 2
Write-Host "   Done." -ForegroundColor Green

# Step 2: Docker
Write-Host "[2/5] Starting Docker containers..." -ForegroundColor Cyan
docker compose -f "D:\middleware\docker-compose.yml" -p middleware --profile core up -d 2>$null
Wait-Port -Port 3307 -Timeout 60 -Name "MySQL"
Wait-Port -Port 6379 -Timeout 30 -Name "Redis"
Wait-Port -Port 27017 -Timeout 30 -Name "MongoDB"
Wait-Port -Port 5672 -Timeout 30 -Name "RabbitMQ"

# Step 3: Nacos (must be ready before any service)
Write-Host "[3/5] Starting Nacos..." -ForegroundColor Cyan
Start-Process cmd -ArgumentList "/k", "cd /d D:\nacos\bin && startup.cmd -m standalone" -WindowStyle Normal
Wait-Port -Port 8848 -Timeout 120 -Name "Nacos"

# Step 4: Gateway (must register to Nacos before other services)
Write-Host "[4/5] Starting Gateway..." -ForegroundColor Cyan
Start-Process cmd -ArgumentList "/k", "cd /d $BASE\snake-gateway && mvn spring-boot:run" -WindowStyle Normal
Wait-Port -Port 8888 -Timeout 90 -Name "Gateway"

# Step 5: Other services
Write-Host "[5/5] Starting services..." -ForegroundColor Cyan

$services = @(
    @{Name="SnakeInfo";   Port=7002; Dir="snake-info-service"},
    @{Name="User";        Port=7006; Dir="user-service"},
    @{Name="Admin";       Port=8092; Dir="admin-service"},
    @{Name="Recognition"; Port=7003; Dir="recognition-service"},
    @{Name="Warning";     Port=7005; Dir="warning-service"},
    @{Name="Emergency";   Port=9093; Dir="emergency-service"},
    @{Name="Hospital";    Port=8089; Dir="hospital-service"},
    @{Name="Agent";       Port=7010; Dir="agent-service"}
)

foreach ($svc in $services) {
    $path = Join-Path $BASE $svc.Dir
    Start-Process cmd -ArgumentList "/k", "cd /d $path && mvn spring-boot:run" -WindowStyle Minimized
    Write-Host "   $($svc.Name) ($($svc.Port)) started" -ForegroundColor Gray
    Start-Sleep -Seconds 3
}

# Frontend
Start-Process cmd -ArgumentList "/k", "cd /d $BASE\vue3 && npm run dev" -WindowStyle Minimized
Write-Host "   Frontend (3000) started" -ForegroundColor Gray

Write-Host ""
Write-Host "================================" -ForegroundColor Green
Write-Host " All launched!" -ForegroundColor Green
Write-Host " Gateway  : http://localhost:8888" -ForegroundColor White
Write-Host " Nacos    : http://localhost:8848/nacos" -ForegroundColor White
Write-Host " Admin    : http://localhost:8092" -ForegroundColor White
Write-Host " Frontend : http://localhost:3000" -ForegroundColor White
Write-Host "================================" -ForegroundColor Green
Start-Sleep -Seconds 3
