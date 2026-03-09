@echo off
chcp 65001 >nul
echo ========== 迅风兑换码 - 一键部署 ==========
echo.

REM 检查 Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Node.js，请先安装: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/2] 安装 Vercel CLI...
call npx vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    call npm install -g vercel
)

echo [2/2] 部署到 Vercel...
call npx vercel --prod --yes

if %errorlevel% equ 0 (
    echo.
    echo ========== 部署完成 ==========
    echo 首次部署会提示登录 Vercel，按提示操作即可。
) else (
    echo.
    echo 部署失败，请检查网络或 Vercel 账号。
)

pause
