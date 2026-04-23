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
echo "  ==== AppGater · 开发服务器 ===="
echo ""

echo -e "${BLUE}▸ 清理缓存...${NC}"

rm -rf "$PROJECT_DIR/.next" 2>/dev/null

echo -e "${GREEN}  ✓ 缓存已清理${NC}"

echo -e "${BLUE}▸ 检查端口...${NC}"

PID=$(lsof -ti:$PORT 2>/dev/null)

if [ -n "$PID" ]; then
    echo -e "${YELLOW}  端口 $PORT 已被占用，正在关闭进程...${NC}"
    kill -9 $PID 2>/dev/null
    pkill -f "next dev" 2>/dev/null
    sleep 2
fi

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