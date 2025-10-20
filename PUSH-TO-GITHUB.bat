@echo off
color 0A
echo ========================================
echo  REPLACE GITHUB REPOSITORY
echo  https://github.com/KishanRaghav/Jovac-Project.git
echo ========================================
echo.

cd /d "%~dp0"

echo This will REPLACE the entire remote repository with your latest version!
echo.
pause

echo.
echo [1/5] Checking Git configuration...
git remote -v
echo.

REM Check if remote exists, if not add it
git remote get-url origin >nul 2>&1
if %errorlevel% neq 0 (
    echo Remote 'origin' not found. Adding it now...
    git remote add origin https://github.com/KishanRaghav/Jovac-Project.git
    echo Done!
) else (
    echo Remote already configured.
    echo Setting remote URL to ensure it's correct...
    git remote set-url origin https://github.com/KishanRaghav/Jovac-Project.git
)
echo.

echo [2/5] Current Git Status:
echo.
git status
echo.
pause

echo.
echo [3/5] Adding all changes...
git add .
echo Done!
echo.

echo [4/5] Creating commit...
git commit -m "Fix: Student update feature - Complete rewrite with field mapping, integer conversion, phone validation, and role permissions"
echo.
echo Commit created with message:
echo "Fix: Student update feature - Complete rewrite"
echo - Fixed field name mismatches between backend and frontend
echo - Added integer conversion for marks field
echo - Made phone number optional with proper validation
echo - Updated permissions to allow ADMIN and USER roles
echo - Enhanced error logging and validation
echo - Cleaned up unnecessary debug files
echo.

echo [5/5] Force Pushing to GitHub...
echo.
echo ⚠️  WARNING: This will REPLACE the entire remote repository!
echo All previous commits will be replaced with this version.
echo.
set /p confirm="Type 'REPLACE' to confirm: "

if /i "%confirm%"=="REPLACE" (
    echo.
    echo Force pushing to https://github.com/KishanRaghav/Jovac-Project.git
    echo Please wait...
    echo.
    git push origin main --force
    echo.
    if %errorlevel% equ 0 (
        echo ========================================
        echo  ✓ SUCCESS! Repository REPLACED
        echo ========================================
        echo.
        echo Your repository has been updated:
        echo https://github.com/KishanRaghav/Jovac-Project
        echo.
        echo The old project has been completely replaced
        echo with your latest Student Management System.
        echo.
        echo Next steps:
        echo 1. Visit: https://github.com/KishanRaghav/Jovac-Project
        echo 2. Verify all files are updated
        echo 3. Update README if needed
        echo.
    ) else (
        echo ========================================
        echo  ✗ PUSH FAILED
        echo ========================================
        echo.
        echo Possible issues:
        echo 1. Not logged into GitHub
        echo 2. No internet connection
        echo 3. Authentication failed
        echo.
        echo To fix authentication:
        echo - Use GitHub Desktop, OR
        echo - Use Personal Access Token as password
        echo.
    )
) else (
    echo.
    echo ========================================
    echo  CANCELLED - No changes made
    echo ========================================
    echo.
    echo Your local repository is unchanged.
    echo Run this script again when ready to push.
    echo.
)

echo.
pause
