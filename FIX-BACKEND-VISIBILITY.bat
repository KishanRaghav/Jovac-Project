@echo off
color 0E
echo ========================================
echo  FIX BACKEND FOLDER NOT SHOWING ON GITHUB
echo ========================================
echo.
echo This will fix the issue where Backend folder
echo appears empty on GitHub.
echo.
pause

cd /d "%~dp0"

echo.
echo [1/5] Checking for nested .git folders...
echo.

REM Check Backend folder
if exist "Backend\Student-Management-System\.git" (
    echo Found .git folder in Backend/Student-Management-System
    echo Removing it...
    rd /s /q "Backend\Student-Management-System\.git"
    echo Done!
) else (
    echo No .git folder found in Backend - Good!
)

REM Check Frontend folder
if exist "Frontend\student-management-frontend\.git" (
    echo Found .git folder in Frontend/student-management-frontend
    echo Removing it...
    rd /s /q "Frontend\student-management-frontend\.git"
    echo Done!
) else (
    echo No .git folder found in Frontend - Good!
)

echo.
echo [2/5] Removing git cache for Backend folder...
git rm -r --cached Backend/Student-Management-System 2>nul
echo Done!

echo.
echo [3/5] Adding Backend folder back...
git add Backend/Student-Management-System/
echo Done!

echo.
echo [4/5] Current status:
git status
echo.
pause

echo.
echo [5/5] Creating commit...
git commit -m "Fix: Backend folder now visible on GitHub - Removed nested git repository"
echo.

echo ========================================
echo  FIX COMPLETE!
echo ========================================
echo.
echo The Backend folder should now be visible.
echo.
echo Next step: Push to GitHub
echo Run: PUSH-TO-GITHUB.bat
echo.
pause
