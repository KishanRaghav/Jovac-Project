@echo off
color 0A
echo ========================================
echo  SETUP FRESH GITHUB REPOSITORY
echo ========================================
echo.
echo This will prepare your project for a clean
echo push to the NEW empty GitHub repository.
echo.
echo IMPORTANT: Make sure you have:
echo 1. Deleted the old repository on GitHub
echo 2. Created a NEW empty repository
echo.
pause

cd /d "%~dp0"

echo.
echo ========================================
echo  STEP 1: CLEAN UP NESTED GIT FOLDERS
echo ========================================
echo.

REM Remove .git from Backend (STS created this)
if exist "Backend\Student-Management-System\.git" (
    echo Removing nested .git from Backend...
    rd /s /q "Backend\Student-Management-System\.git"
    echo Done!
) else (
    echo No nested .git in Backend - Good!
)

REM Remove gitignore from Backend
if exist "Backend\Student-Management-System\.gitignore" (
    del /f /q "Backend\Student-Management-System\.gitignore"
)

REM Remove gitattributes from Backend
if exist "Backend\Student-Management-System\.gitattributes" (
    del /f /q "Backend\Student-Management-System\.gitattributes"
)

REM Remove .git from Frontend
if exist "Frontend\student-management-frontend\.git" (
    echo Removing nested .git from Frontend...
    rd /s /q "Frontend\student-management-frontend\.git"
    echo Done!
) else (
    echo No nested .git in Frontend - Good!
)

REM Remove gitignore from Frontend
if exist "Frontend\student-management-frontend\.gitignore" (
    del /f /q "Frontend\student-management-frontend\.gitignore"
)

echo.
echo ========================================
echo  STEP 2: CLEAN GIT CACHE
echo ========================================
echo.

echo Removing existing Git tracking...
if exist ".git" (
    rd /s /q ".git"
    echo Old .git removed!
)

echo.
echo ========================================
echo  STEP 3: INITIALIZE FRESH GIT REPO
echo ========================================
echo.

echo Initializing new Git repository...
git init
git branch -M main
echo Done!

echo.
echo ========================================
echo  STEP 4: ADD ALL FILES
echo ========================================
echo.

echo Adding all project files...
git add .
echo Done!

echo.
echo ========================================
echo  STEP 5: CREATE FIRST COMMIT
echo ========================================
echo.

git commit -m "Initial commit: Student Management System with complete update feature fixes"
echo.
echo Commit includes:
echo - Backend: Spring Boot app with all fixes
echo - Frontend: React app with all fixes
echo - Fixed field mapping issues
echo - Integer conversion for marks
echo - Phone number validation
echo - Role-based permissions
echo - All launcher scripts
echo.

echo.
echo ========================================
echo  STEP 6: ADD REMOTE REPOSITORY
echo ========================================
echo.
echo Enter your NEW GitHub repository URL
echo Example: https://github.com/KishanRaghav/Jovac-Project.git
echo.
set /p repo_url="Repository URL: "

if "%repo_url%"=="" (
    echo ERROR: No URL provided!
    pause
    exit /b
)

echo.
echo Adding remote repository...
git remote add origin %repo_url%
echo Done!

echo.
echo ========================================
echo  STEP 7: PUSH TO GITHUB
echo ========================================
echo.
echo Ready to push to: %repo_url%
echo.
set /p confirm="Type 'PUSH' to confirm: "

if /i "%confirm%"=="PUSH" (
    echo.
    echo Pushing to GitHub...
    echo.
    git push -u origin main
    echo.
    if %errorlevel% equ 0 (
        echo ========================================
        echo  SUCCESS! PROJECT UPLOADED TO GITHUB
        echo ========================================
        echo.
        echo Your project is now on GitHub!
        echo.
        echo Repository: %repo_url%
        echo.
        echo What's included:
        echo - Backend folder with ALL Java source code
        echo - Frontend folder with ALL React source code
        echo - All launcher scripts
        echo - README.md
        echo - .gitignore
        echo.
        echo Visit your repository on GitHub to verify!
        echo.
    ) else (
        echo ========================================
        echo  PUSH FAILED
        echo ========================================
        echo.
        echo Common issues:
        echo 1. Not logged into GitHub
        echo 2. Repository doesn't exist
        echo 3. Wrong URL
        echo.
        echo Solutions:
        echo - Use GitHub Desktop for easy login
        echo - Verify repository URL on GitHub
        echo - Use Personal Access Token if needed
        echo.
    )
) else (
    echo.
    echo Cancelled. Run this script again when ready.
    echo.
)

echo.
pause
