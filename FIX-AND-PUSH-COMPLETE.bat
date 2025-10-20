@echo off
color 0A
echo ========================================
echo  FIX BACKEND VISIBILITY AND PUSH TO GITHUB
echo ========================================
echo.
echo This will:
echo 1. Remove any nested .git folders
echo 2. Fix Backend folder visibility issue
echo 3. Push everything to GitHub
echo.
echo Repository: https://github.com/KishanRaghav/Jovac-Project.git
echo.
pause

cd /d "%~dp0"

echo.
echo ========================================
echo  STEP 1: REMOVE NESTED GIT REPOSITORIES
echo ========================================
echo.

REM Remove .git from Backend if exists
if exist "Backend\Student-Management-System\.git" (
    echo Removing .git from Backend...
    rd /s /q "Backend\Student-Management-System\.git"
    del /f /q "Backend\Student-Management-System\.gitignore" 2>nul
    del /f /q "Backend\Student-Management-System\.gitattributes" 2>nul
    echo Done!
) else (
    echo No .git in Backend - Good!
)

REM Remove .git from Frontend if exists
if exist "Frontend\student-management-frontend\.git" (
    echo Removing .git from Frontend...
    rd /s /q "Frontend\student-management-frontend\.git"
    del /f /q "Frontend\student-management-frontend\.gitignore" 2>nul
    echo Done!
) else (
    echo No .git in Frontend - Good!
)

echo.
echo ========================================
echo  STEP 2: REMOVE GIT CACHE
echo ========================================
echo.

echo Clearing cache for Backend...
git rm -r --cached Backend/Student-Management-System 2>nul
git rm -r --cached Frontend/student-management-frontend 2>nul
echo Done!

echo.
echo ========================================
echo  STEP 3: ADD ALL FILES
echo ========================================
echo.

echo Adding all files...
git add .
git add Backend/Student-Management-System/ -f
git add Frontend/student-management-frontend/ -f
echo Done!

echo.
echo ========================================
echo  STEP 4: CHECK STATUS
echo ========================================
echo.
git status
echo.
pause

echo.
echo ========================================
echo  STEP 5: CREATE COMMIT
echo ========================================
echo.

git commit -m "Fix: Complete project with visible Backend and Frontend code - All update feature fixes included"

echo.
echo Commit includes:
echo - Backend source code (now visible!)
echo - Frontend source code with all fixes
echo - Field mapping corrections
echo - Integer conversion for marks
echo - Phone validation fixes
echo - Role permission updates
echo.

echo.
echo ========================================
echo  STEP 6: PUSH TO GITHUB
echo ========================================
echo.
echo This will REPLACE the remote repository
echo.
set /p confirm="Type 'REPLACE' to confirm: "

if /i "%confirm%"=="REPLACE" (
    echo.
    echo Pushing to https://github.com/KishanRaghav/Jovac-Project.git
    echo.
    git push origin main --force
    echo.
    if %errorlevel% equ 0 (
        echo ========================================
        echo  SUCCESS! REPOSITORY UPDATED
        echo ========================================
        echo.
        echo Backend folder is now visible on GitHub!
        echo.
        echo Visit: https://github.com/KishanRaghav/Jovac-Project
        echo.
        echo You should now see:
        echo - Backend/ folder with all Java code
        echo - Frontend/ folder with all React code
        echo - All launcher scripts
        echo - README.md
        echo.
    ) else (
        echo ========================================
        echo  PUSH FAILED
        echo ========================================
        echo.
        echo Please check the error above.
        echo.
    )
) else (
    echo.
    echo Cancelled. No changes pushed to GitHub.
    echo.
)

echo.
pause
