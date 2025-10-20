@echo off
cls
color 0A
echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                                                               ║
echo ║       🎓 STUDENT MANAGEMENT SYSTEM - STARTING...            ║
echo ║                                                               ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.

echo [Step 1] Cleaning up old processes...
echo ════════════════════════════════════════════════════════════════
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    echo Killing process on port 8080 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :3000 ^| findstr LISTENING') do (
    echo Killing process on port 3000 (PID: %%a)
    taskkill /F /PID %%a >nul 2>&1
)
echo ✅ Ports cleared
echo.

echo [Step 2] Starting Backend Server...
echo ════════════════════════════════════════════════════════════════
cd "Backend\Student-Management-System"
start "🔴 BACKEND SERVER - DO NOT CLOSE" cmd /k ".\mvnw.cmd spring-boot:run"
cd ..\..
echo ✅ Backend server starting on port 8080
echo.

echo [Step 3] Waiting for backend to initialize...
echo ════════════════════════════════════════════════════════════════
timeout /t 30 /nobreak >nul
echo ✅ Backend should be ready now
echo.

echo [Step 4] Starting Frontend Server...
echo ════════════════════════════════════════════════════════════════
cd "Frontend\student-management-frontend"
start "🔵 FRONTEND SERVER - DO NOT CLOSE" cmd /k "npm start"
cd ..\..
echo ✅ Frontend server starting on port 3000
echo.

echo.
echo ╔═══════════════════════════════════════════════════════════════╗
echo ║                  ✅ SERVERS STARTED!                         ║
echo ╚═══════════════════════════════════════════════════════════════╝
echo.
echo 📋 WHAT'S HAPPENING:
echo ────────────────────────────────────────────────────────────────
echo   • Backend server is starting on http://localhost:8080
echo   • Frontend server is starting on http://localhost:3000
echo   • Your browser will open automatically in about 15 seconds
echo.
echo ⚠️  IMPORTANT:
echo ────────────────────────────────────────────────────────────────
echo   • DO NOT CLOSE the two new windows that opened
echo   • Wait about 30-40 seconds for everything to load
echo   • The browser will open to http://localhost:3000
echo.
echo 🔐 LOGIN INFORMATION:
echo ────────────────────────────────────────────────────────────────
echo   • If you don't have an account, click "Register"
echo   • Choose account type:
echo       - Regular User: Can add/edit own students only
echo       - Administrator: Full access to all operations
echo.
echo ══════════════════════════════════════════════════════════════
echo.
timeout /t 15 /nobreak >nul
start http://localhost:3000
echo.
echo Browser opened! You can now close this window.
echo.
pause
