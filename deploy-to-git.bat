@echo off
chcp 65001 >nul
echo ========== 部署到 Git ==========
echo.

REM 检查 Git
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo [错误] 未检测到 Git，请先安装: https://git-scm.com/download/win
    echo.
    echo 安装完成后，重新运行此脚本。
    exit /b 1
)

cd /d "%~dp0"

REM 检查是否已初始化
if not exist ".git" (
    echo [1/4] 初始化 Git 仓库...
    git init
    echo.
)

echo [2/4] 添加文件...
git add .
echo.

echo [3/4] 提交...
git commit -m "deploy: 迅风兑换码原型与文档" 2>nul
if %errorlevel% neq 0 (
    git status
    echo.
    echo 无新变更或已提交。若需修改提交信息，请手动执行: git commit -m "你的说明"
) else (
    echo 提交成功。
)
echo.

echo [4/4] 推送到远程
git branch -M main 2>nul
git remote -v 2>nul | findstr "origin" >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo 尚未配置远程仓库。请先在 GitHub 创建仓库，然后执行：
    echo.
    echo   git remote add origin https://github.com/你的用户名/仓库名.git
    echo   git push -u origin main
    echo.
    echo 或使用 GitHub CLI: gh repo create 仓库名 --public --source=. --push
) else (
    git push -u origin main 2>&1
    if %errorlevel% equ 0 (
        echo.
        echo ========== 已推送到 Git ==========
    ) else (
        echo.
        echo 推送失败，请检查远程地址与网络。首次推送需配置: git remote add origin 你的仓库URL
    )
)

echo.
