# AppGater - 官方工具聚合平台

聚合全球优质开发/办公工具，每日自动检测官方链接可用性，提供安全高速的下载代理服务。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

## 特性

- 🔍 **智能搜索** - 快速找到需要的工具
- 🏷️ **分类浏览** - 开发、办公、系统、网络、媒体五大分类
- ✅ **安全验证** - 所有链接均来自官方源
- ⚡ **高速下载** - Vercel Edge Network 全球加速
- 🔄 **自动检测** - GitHub Actions 每日自动检测链接健康状态
- 📱 **响应式设计** - 完美适配各种设备

## 技术栈

- **框架**: Next.js 15 + React 18 + TypeScript
- **样式**: Tailwind CSS
- **部署**: Vercel (Edge Runtime)
- **自动化**: GitHub Actions

## 架构

```
AppGater/
├── .github/workflows/     # GitHub Actions 工作流
│   └── sync-tools.yml     # 每日链接健康检测
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── page.tsx       # 首页
│   │   ├── tool/[id]/     # 工具详情页
│   │   └── api/download/  # 下载代理 API
│   ├── components/        # React 组件
│   ├── lib/               # 工具函数
│   └── data/              # 工具数据库
├── scripts/               # 自动化脚本
└── public/                # 静态资源
```

## 下载代理原理

1. 用户点击下载按钮
2. 请求发送到 `/api/download?id={toolId}`
3. Edge Function 验证工具 ID
4. 返回 **302 重定向**到官方下载链接
5. 用户浏览器直接从官方 CDN 下载

**优势**: 零存储成本、零带宽成本、全自动维护

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建
npm run build
```

访问 http://localhost:3000

## 部署到 Vercel

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

或者通过 GitHub 导入自动部署：

1. 推送代码到 GitHub
2. 访问 https://vercel.com/new
3. 导入 GitHub 仓库
4. 一键部署

## 添加新工具

编辑 `src/data/tools.json`，添加新工具对象：

```json
{
  "id": "tool-id",
  "name": "工具名称",
  "category": "dev|office|system|network|media",
  "desc": "工具描述",
  "official": "https://official-download-link.com",
  "size": "~100MB",
  "status": "online",
  "icon": "🔧"
}
```

## 自动化脚本

### 链接健康检测

```bash
# 手动运行检测
node scripts/sync-checker.js
```

GitHub Actions 每天凌晨 2 点自动运行。

## 安全说明

- 所有下载链接均指向官方源
- 本站不存储任何文件
- 通过 302 重定向实现"代理"效果
- 每日自动验证链接有效性

## License

MIT License
