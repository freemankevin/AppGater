#!/bin/bash

PORT=8240
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"

GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

clear

echo ""
echo "  ==== Axis · 开发服务器 ===="
echo ""

echo -e "${BLUE}▸ 清理缓存...${NC}"

rm -rf "$PROJECT_DIR/.next" 2>/dev/null

echo -e "${GREEN}  ✓ 缓存已清理${NC}"

echo -e "${BLUE}▸ 检查端口...${NC}"

cleanup_port() {
    local port=$1
    local pids=""

    if command -v lsof >/dev/null 2>&1; then
        pids=$(lsof -ti:$port 2>/dev/null)
    elif command -v fuser >/dev/null 2>&1; then
        pids=$(fuser $port/tcp 2>/dev/null | tr -d ' ')
    elif command -v netstat >/dev/null 2>&1 && command -v taskkill >/dev/null 2>&1; then
        pids=$(netstat -ano 2>/dev/null | grep ":$port " | grep "LISTENING" | awk '{print $5}' | sort -u)
    elif command -v netstat >/dev/null 2>&1; then
        pids=$(netstat -tlnp 2>/dev/null | grep ":$port " | awk '{print $7}' | cut -d'/' -f1 | sort -u)
    fi

    if [ -n "$pids" ]; then
        echo -e "${YELLOW}  端口 $port 已被占用，正在关闭进程...${NC}"
        for pid in $pids; do
            if [ -n "$pid" ] && [ "$pid" != "-" ]; then
                kill -9 $pid 2>/dev/null || taskkill //F //PID $pid 2>/dev/null
            fi
        done
        pkill -f "next dev" 2>/dev/null
        sleep 2
    fi
}

cleanup_port $PORT

echo -e "${GREEN}  ✓ 端口 $PORT 可用${NC}"

echo -e "${BLUE}▸ 检查依赖...${NC}"

if [ ! -d "$PROJECT_DIR/node_modules" ]; then
    echo -e "${YELLOW}  未安装依赖，正在安装...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}  ✗ 依赖安装失败${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}  ✓ 依赖已就绪${NC}"

echo -e "${BLUE}▸ 启动服务器...${NC}"
echo ""

cd "$PROJECT_DIR"

export PORT=$PORT

npm run dev 2>&1 | grep --line-buffered -v "verbose" | grep --line-buffered -v "npm info" | grep --line-buffered -v "npm verbose" | grep --line-buffered -v "logfile" | grep --line-buffered -v "Warning"