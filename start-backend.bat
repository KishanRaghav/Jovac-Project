@echo off
echo ========================================
echo   Starting Backend Server (Port 8080)
echo ========================================
echo.

cd "Backend\Student-Management-System"

echo Checking if port 8080 is already in use...
netstat -ano | findstr :8080 > nul
if %errorlevel% equ 0 (
    echo WARNING: Port 8080 is already in use!
    echo Attempting to kill the process...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
        taskkill /F /PID %%a 2>nul
    )
    timeout /t 2 /nobreak > nul
)

echo Starting Spring Boot Backend...
echo.
call mvn spring-boot:run

pause
