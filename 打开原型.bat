@echo off
chcp 65001 >nul
setlocal

cd /d "%~dp0"
set "PORT=5177"
set "URL=http://127.0.0.1:%PORT%/"

echo.
echo 保利物业商城 V1.5 前端原型
echo 当前目录: %CD%
echo 计划启动地址: %URL%
echo.

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo 未找到 npm.cmd。请先安装 Node.js，或在已配置 Node.js 的终端中运行本文件。
  echo.
  pause
  exit /b 1
)

netstat -ano | findstr /R /C:":%PORT% .*LISTENING" >nul
if not errorlevel 1 (
  echo 端口 %PORT% 已被占用，Vite 将不会自动换端口。
  echo.
  echo 处理方式:
  echo 1. 关闭正在占用 %PORT% 的本地服务后，再双击本文件。
  echo 2. 或在命令行手动运行: npm.cmd run dev -- --port 其它端口 --strictPort
  echo.
  pause
  exit /b 1
)

echo 正在启动 Vite，本窗口请保持打开。
echo 浏览器会自动打开: %URL%
echo.

start "" powershell -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -Command "Start-Sleep -Seconds 2; Start-Process '%URL%'"
npm.cmd run dev -- --port %PORT% --strictPort

echo.
echo Vite 服务已停止。
pause
