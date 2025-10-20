@echo off
title Student Management System - Launcher
color 0A

echo.
echo ============================================================
echo    STUDENT MANAGEMENT SYSTEM - PROFESSIONAL LAUNCHER
echo ============================================================
echo    Developer: Kishan Raghav
echo    Stack: Spring Boot + React + MySQL + JWT
echo ============================================================
echo.

echo [1/4] Checking prerequisites...
echo.

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java is not installed or not in PATH!
    echo Please install Java 17 or higher.
    pause
    exit /b 1
)
echo [OK] Java is installed

REM Check if Node.js is installed
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js 14 or higher.
    pause
    exit /b 1
)
echo [OK] Node.js is installed

REM Check if npm is installed
npm -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed!
    pause
    exit /b 1
)
echo [OK] npm is installed

echo.
echo [2/4] Cleaning up existing processes...
echo.

REM Kill existing processes on port 8080 (Backend)
echo Checking port 8080 (Backend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080') do (
    echo Stopping process on port 8080...
    taskkill /F /PID %%a >nul 2>&1
)

REM Kill existing processes on port 3000 (Frontend)
echo Checking port 3000 (Frontend)...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000') do (
    echo Stopping process on port 3000...
    taskkill /F /PID %%a >nul 2>&1
)

timeout /t 2 /nobreak > nul

echo.
echo [3/4] Starting Backend Server (Spring Boot)...
echo.

start "Backend - Spring Boot (Port 8080)" cmd /k "cd Backend\Student-Management-System && mvn spring-boot:run"

echo Waiting for backend to initialize (30 seconds)...
timeout /t 30 /nobreak

echo.
echo [4/4] Starting Frontend Server (React)...
echo.

start "Frontend - React (Port 3000)" cmd /k "cd Frontend\student-management-frontend && npm start"

echo.
echo ============================================================
echo    SERVERS STARTING...
echo ============================================================
echo.
echo    Backend:  http://localhost:8080
echo    Swagger:  http://localhost:8080/swagger-ui/index.html
echo    Frontend: http://localhost:3000
echo.
echo    Two new windows will open:
echo    1. Backend Server (Spring Boot)
echo    2. Frontend Server (React)
echo.
echo    Wait for both servers to fully start...
echo    The frontend will automatically open in your browser!
echo.
echo ============================================================
echo.

echo Opening browser in 15 seconds...
timeout /t 15 /nobreak

start http://localhost:3000

echo.
echo [SUCCESS] Application launched successfully!
echo.
echo To stop the servers, close both terminal windows.
echo.
pause
