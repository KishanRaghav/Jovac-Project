@echo off
title Fix Database and Start System
color 0B

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║     DATABASE FIX AND COMPLETE SYSTEM STARTUP               ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

:: Step 1: Clean up ports
echo [STEP 1] Cleaning up old processes...
echo.

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    echo   → Stopping backend process (PID %%a)
    taskkill /F /PID %%a >nul 2>&1
)

for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo   → Stopping frontend process (PID %%a)
    taskkill /F /PID %%a >nul 2>&1
)

echo   ✓ Old processes cleaned!
echo.

:: Step 2: Fix Database
echo [STEP 2] Cleaning database tables...
echo.
echo   → Removing old tables from 'student' database...

mysql -u root -pkishanONmySqLHAI#3 -e "USE student; SET FOREIGN_KEY_CHECKS = 0; DROP TABLE IF EXISTS student; DROP TABLE IF EXISTS students; DROP TABLE IF EXISTS user_roles; DROP TABLE IF EXISTS users; SET FOREIGN_KEY_CHECKS = 1;" 2>nul

echo   ✓ Database cleaned! Tables will be recreated automatically.
echo.

:: Step 3: Start Backend
echo [STEP 3] Starting Backend Server...
echo   This will create the database tables automatically.
echo   Please wait 20-25 seconds...
echo.

cd Backend\Student-Management-System
start "Backend Server - DO NOT CLOSE" cmd /k "title Backend Server && color 0A && echo ================================ && echo    BACKEND SERVER STARTING... && echo ================================ && echo. && mvnw.cmd spring-boot:run"

echo   ✓ Backend starting in separate window
echo.

:: Step 4: Wait for backend
echo [STEP 4] Waiting for backend to initialize...
echo.
echo   ⏳ Please wait:

timeout /t 7 /nobreak >nul
echo      20 seconds...

timeout /t 7 /nobreak >nul
echo      13 seconds...

timeout /t 7 /nobreak >nul
echo       6 seconds...

timeout /t 4 /nobreak >nul

echo.
echo   ✓ Backend should be ready now!
echo.

:: Step 5: Start Frontend
echo [STEP 5] Starting Frontend Application...
echo.

cd ..\..\Frontend\student-management-frontend
start "Frontend Server - DO NOT CLOSE" cmd /k "title Frontend Server && color 0C && echo ================================ && echo   FRONTEND SERVER STARTING... && echo ================================ && echo. && npm start"

echo   ✓ Frontend starting in separate window
echo.

:: Step 6: Summary
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                                                            ║
echo ║                  ✓✓✓ ALL FIXED! ✓✓✓                       ║
echo ║                                                            ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo   📊 What was done:
echo   ✓ Cleaned old processes
echo   ✓ Fixed database tables
echo   ✓ Started backend (with fresh tables)
echo   ✓ Started frontend
echo.
echo   🌐 YOUR APPLICATION:
echo   → Backend:  http://localhost:8080 (API)
echo   → Frontend: http://localhost:3000 (USE THIS!)
echo.
echo   ⚠️  IMPORTANT - Wait 30 seconds then:
echo   1. Open browser
echo   2. Go to: http://localhost:3000
echo   3. Register a new account
echo   4. Login and use the system!
echo.
echo   💡 REMEMBER:
echo   ✓ Keep both terminal windows open
echo   ✓ Use http://localhost:3000 (NOT :8080)
echo.
echo ════════════════════════════════════════════════════════════
echo.
echo   Press any key to close this window...
pause >nul
