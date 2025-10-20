@echo off
title Check System Prerequisites
color 0B

echo.
echo ============================================================
echo    SYSTEM PREREQUISITES CHECK
echo ============================================================
echo.

echo [1/5] Checking Java...
java -version 2>&1 | findstr "version"
if %errorlevel% neq 0 (
    echo [FAILED] Java is not installed!
    echo Download from: https://www.oracle.com/java/technologies/downloads/
) else (
    echo [OK] Java is installed
)
echo.

echo [2/5] Checking Node.js...
node -v
if %errorlevel% neq 0 (
    echo [FAILED] Node.js is not installed!
    echo Download from: https://nodejs.org/
) else (
    echo [OK] Node.js is installed
)
echo.

echo [3/5] Checking npm...
npm -v
if %errorlevel% neq 0 (
    echo [FAILED] npm is not installed!
) else (
    echo [OK] npm is installed
)
echo.

echo [4/5] Checking MySQL...
tasklist | findstr "mysqld" >nul
if %errorlevel% neq 0 (
    echo [FAILED] MySQL is not running!
    echo Please start MySQL service
) else (
    echo [OK] MySQL is running
)
echo.

echo [5/5] Checking Ports...
echo.
echo Checking port 8080 (Backend)...
netstat -ano | findstr :8080 >nul
if %errorlevel% equ 0 (
    echo [WARNING] Port 8080 is in use
) else (
    echo [OK] Port 8080 is available
)

echo.
echo Checking port 3000 (Frontend)...
netstat -ano | findstr :3000 >nul
if %errorlevel% equ 0 (
    echo [WARNING] Port 3000 is in use
) else (
    echo [OK] Port 3000 is available
)

echo.
echo ============================================================
echo    CHECK COMPLETE
echo ============================================================
echo.
echo If all checks passed, you can run start-app.bat
echo.
pause
