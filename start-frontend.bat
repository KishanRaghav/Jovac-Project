@echo off
echo ========================================
echo   Starting Frontend Server (Port 3000)
echo ========================================
echo.

cd "Frontend\student-management-frontend"

echo Checking if port 3000 is already in use...
netstat -ano | findstr :3000 > nul
if %errorlevel% equ 0 (
    echo WARNING: Port 3000 is already in use!
    echo Attempting to kill the process...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
        taskkill /F /PID %%a 2>nul
    )
    timeout /t 2 /nobreak > nul
)

echo Starting React Frontend...
echo.
call npm start

pause
