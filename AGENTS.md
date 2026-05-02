# AppGater - AI Agent 项目指南

> AppGater 是一个简洁优雅的软件市场 Web 平台，提供官方软件的评分、下载量展示与安全高速的下载代理服务。
> 本项目为中文项目，所有代码注释、界面文案及文档均以中文为主。

---

## 项目概览

| 项目 | 说明 |
|------|------|
| **名称** | AppGater |
| **版本** | 2.0.0 |
| **许可证** | MIT |
| **技术栈** | Next.js 16 + React 19 + TypeScript 5 + Tailwind CSS 3 |
| **部署目标** | Vercel (Edge Runtime) |
| **数据存储** | 静态 JSON 文件 (`src/data/tools.json`) |
| **界面语言** | 中文 (zh-CN) |

### 核心功能

- **智能搜索** — 按软件名称、发布者、标签实时过滤
- **分类浏览** — 开发环境、办公效率、系统工具、网络工具、媒体处理五大分类
- **下载代理** — 通过 `/api/download?id={toolId}` 返回 302 重定向到官方源
- **链接健康检测** — GitHub Actions 每日自动检测所有官方链接可用性
- **软件评分与下载量** — 展示用户评分和累计下载/点击量
- **免费/付费标识** — 清晰标注软件授权方式
- **官方认证** — 可信发布者显示认证徽章
- **响应式设计** — 完美适配桌面和移动设备

---

## 项目结构

```
AppGater/
├── .github/workflows/
│   └── sync-tools.yml          # GitHub Actions: 每日链接健康检测
├── scripts/
│   └── sync-checker.js         # 链接健康检测脚本
├── public/
│   ├── fonts/                  # 本地字体文件
│   │   ├── HankenGrotesk-VariableFont_wght.ttf
│   │   ├── Inter-VariableFont_opsz,wght.ttf
│   │   ├── JetBrainsMono-VariableFont_wght.ttf
│   │   └── NotoSansSC-VariableFont_wght.ttf
│   ├── logo/                   # 软件 Logo (SVG)
│   └── favicon 系列图标
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # 根布局 (本地字体, SEO 元数据)
│   │   ├── page.tsx            # 首页 (Client Component)
│   │   ├── globals.css         # 全局样式 (Tailwind + 本地字体)
│   │   ├── not-found.tsx       # 404 页面
│   │   ├── tool/[id]/
│   │   │   └── page.tsx        # 工具详情页 (Server Component, SSG)
│   │   └── api/download/
│   │       └── route.ts        # 下载代理 API (Edge Runtime)
│   ├── components/             # React 组件
│   │   ├── SearchBox.tsx       # 搜索输入框 (lucide-react)
│   │   ├── CategoryFilter.tsx  # 分类筛选按钮组
│   │   ├── ToolCard.tsx        # 软件卡片 (VS Code Marketplace 风格)
│   │   ├── DownloadModal.tsx   # 下载弹窗
│   │   └── CopyButton.tsx      # 复制到剪贴板按钮
│   ├── data/
│   │   └── tools.json          # 软件数据库 (由脚本维护)
│   └── lib/                    # 工具函数
│       ├── types.ts            # TypeScript 类型定义
│       ├── tools.ts            # 数据访问层 (加载/搜索/筛选/格式化)
│       ├── download.ts         # 下载链接生成与安全验证
│       └── animations.ts       # CSS 动画辅助函数
├── next.config.ts              # Next.js 配置
├── tailwind.config.ts          # Tailwind CSS 配置 (自定义设计令牌)
├── postcss.config.mjs          # PostCSS 配置
├── tsconfig.json               # TypeScript 配置
├── vercel.json                 # Vercel 部署配置
├── package.json                # 依赖管理
└── startup.sh                  # 本地开发启动脚本
```

---

## 构建与运行命令

```bash
# 安装依赖
npm install

# 启动开发服务器 (端口 8240)
npm run dev
# 或使用启动脚本
./startup.sh

# 生产构建
npm run build

# 启动生产服务器
npm run start

# 代码检查
npm run lint
```

---

## 设计规范

### 设计风格

- **Railway Design** — 克制过度设计，避免过度配色
- **OpenAI 风格参考** — 大量留白、黑白灰为主、简洁、质感、玻璃化、优雅大方
- **VS Code Marketplace 卡片** — 软件卡片展示图标、名称、发布者、评分、下载量、授权方式

### 颜色体系

使用 Tailwind 自定义颜色令牌：

| 令牌 | 值 | 用途 |
|------|-----|------|
| `bg-surface` | `#0a0a0a` | 页面背景 |
| `bg-surface-elevated` | `#141414` | 卡片/ elevated 表面 |
| `bg-surface-hover` | `#1a1a1a` | 悬停状态 |
| `border-surface-border` | `#262626` | 边框 |
| `text-ink` | `#ffffff` | 主文本 |
| `text-ink-muted` | `#a3a3a3` | 次要文本 |
| `text-ink-faint` | `#525252` | 辅助文本 |

**禁止使用**彩虹渐变、高饱和度阴影、大面积蓝色/紫色渐变。

### 字体

使用本地字体文件：

| 字体 | 用途 | Tailwind 类 |
|------|------|-------------|
| Hanken Grotesk | 标题/Display | `font-display` |
| Inter | 英文正文 | `font-sans` |
| Noto Sans SC | 中文正文 | `font-sans` |
| JetBrains Mono | 代码/等宽 | `font-mono` |

### 图标

- **Lucide React** — 主要图标库 (搜索、星星、下载、复制等)
- **Font Awesome** — 辅助图标 (通过 `@fortawesome/react-fontawesome`)

### 玻璃态效果

- 使用 `.glass` 和 `.glass-strong` 工具类
- 背景透明度 `3% ~ 6%`
- 边框透明度 `6% ~ 8%`
- 模糊 `12px`

### 间距与留白

- 页面最大宽度 `max-w-7xl`
- section 间距 `py-12 ~ py-20`
- 卡片内边距 `p-5`
- 网格间距 `gap-4`

---

## 代码规范

### 文件行数限制

**单个代码文件不得超过 400 行。** 超过必须按模块拆分：

```
❌ bad: 一个 600 行的 page.tsx
✅ good:
  page.tsx          (200 行，主页面结构)
  sections/Hero.tsx (80 行)
  sections/Grid.tsx (120 行)
```

### TypeScript 规范

- 使用严格模式 (`"strict": true`)
- 路径别名 `@/*` 映射到 `./src/*`
- 模块解析 `"moduleResolution": "bundler"`
- JSX 转换 `"jsx": "react-jsx"`
- 目标 `ES2017`

### 引号风格

- TypeScript/TSX 文件中使用 **单引号** (`'`)
- JSX 属性中使用 **双引号** (`"`)

### 组件规范

- 客户端组件文件顶部必须标注 `'use client';`
- 组件使用默认导出 (`export default function ComponentName`)
- Props 接口命名为 `{ComponentName}Props`
- 优先使用函数声明而非函数表达式

### 文件组织

- 页面放在 `src/app/` 下，按路由结构组织
- 可复用组件放在 `src/components/`
- 类型定义集中在 `src/lib/types.ts`
- 数据访问逻辑集中在 `src/lib/tools.ts`
- 超过 400 行的页面拆分为 `sections/` 或 `parts/` 子目录

---

## 软件数据格式

`src/data/tools.json` 中的每个软件对象遵循以下格式：

```json
{
  "id": "vscode",
  "name": "VSCode",
  "category": "dev",
  "desc": "微软官方代码编辑器",
  "official": "https://code.visualstudio.com/download",
  "size": "~80MB",
  "status": "online",
  "icon": "💻",
  "logo": "/logo/vscode.svg",
  "lastChecked": "2026-04-30T05:25:39.392Z",
  "healthStatus": "online",
  "httpStatus": 200,
  "responseTime": 97,
  "rating": 4.9,
  "downloadCount": 2450000,
  "price": "free",
  "publisher": "Microsoft",
  "verified": true,
  "tags": ["编辑器", "IDE", "微软"]
}
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | string | 全局唯一标识 |
| `name` | string | 软件名称 |
| `category` | string | 分类：`dev`/`office`/`system`/`network`/`media` |
| `desc` | string | 简短描述 |
| `official` | string | 官方下载链接 |
| `size` | string | 文件大小 |
| `status` | string | 在线状态 |
| `logo` | string | Logo 路径，如 `/logo/{id}.svg` |
| `rating` | number | 1-5 评分 |
| `downloadCount` | number | 累计下载/点击次数 |
| `price` | string | `free`/`paid`/`freemium` |
| `publisher` | string | 发布者名称 |
| `verified` | boolean | 是否官方认证 |
| `tags` | string[] | 标签数组 |

### 添加新软件

1. 编辑 `src/data/tools.json`，添加符合格式的对象
2. 创建对应的 Logo SVG 到 `public/logo/{id}.svg`
3. 确保 `id` 全局唯一
4. 运行 `node scripts/sync-checker.js` 验证 JSON 格式

---

## 自动化与 CI/CD

### 链接健康检测 (`scripts/sync-checker.js`)

Node.js 脚本，对所有工具的 `official` URL 执行 HTTP `HEAD` 请求：

| 配置项 | 值 |
|--------|-----|
| 超时时间 | 15 秒 |
| 重试次数 | 2 次 |
| 重试间隔 | 1 秒 |
| 在线判定 | HTTP 2xx/3xx 且响应时间 ≤ 5000ms |
| 缓慢判定 | HTTP 2xx/3xx 但响应时间 > 5000ms |
| 离线判定 | HTTP 4xx/5xx、网络错误或超时 |

脚本更新 `src/data/tools.json` 中的 `lastChecked`、`healthStatus`、`httpStatus`、`responseTime`、`status` 字段（**不覆盖** `rating`、`downloadCount`、`price`、`publisher`、`verified`、`tags`）。

### GitHub Actions (`.github/workflows/sync-tools.yml`)

- **触发时机**: 每天凌晨 2 点 UTC，支持手动触发
- **权限**: `contents: write`
- **流程**: 检出 → 设置 Node.js → 安装依赖 → 运行检测 → 自动提交
- **提交消息**: `chore: daily link health check [YYYY-MM-DD]`

---

## 测试与验证

**本项目目前没有自动化测试。** 变更后手动验证：

1. **本地开发**: `npm run dev`，访问 `http://localhost:8240`
2. **构建验证**: `npm run build`，确保无 TypeScript/ESLint 错误
3. **关键路径验证**:
   - 首页搜索与分类筛选
   - 软件卡片显示（图标、名称、发布者、评分、下载量、授权方式、认证徽章）
   - 点击卡片弹出下载弹窗
   - 点击"立即下载"触发 `/api/download?id=` 重定向
   - 工具详情页 (`/tool/{id}`) 正确渲染
   - 404 页面正常显示
4. **行数检查**: 确保修改后的文件不超过 400 行

---

## 部署说明

### Vercel 部署

- `vercel.json` 配置了下载路径重写和 API 缓存头
- API 路由使用 Edge Runtime
- 图片已设置为 `unoptimized: true`

### 环境变量

本项目**不需要**任何环境变量即可运行。

---

## 安全注意事项

- **不存储任何文件**: 仅存储软件元数据，所有下载通过 302 重定向到官方源
- **官方域名白名单**: `src/lib/download.ts` 中的 `isSafeOfficialUrl()` 包含可信域名列表
- **链接可用性**: 每日自动检测，离线工具 API 返回 503
- **缓存控制**: 下载 API 设置 `Cache-Control: public, max-age=3600`

---

## 关键依赖版本

| 依赖 | 版本 | 说明 |
|------|------|------|
| next | 16.2.4 | React 框架 |
| react | ^19.2.5 | UI 库 |
| react-dom | ^19.2.5 | React DOM |
| typescript | ^5.0.0 | 类型系统 |
| tailwindcss | ^3.4.0 | CSS 框架 |
| lucide-react | latest | 图标库 |
| @fortawesome/react-fontawesome | latest | Font Awesome React 绑定 |
| @fortawesome/free-solid-svg-icons | latest | Font Awesome 实心图标 |
| @fortawesome/free-regular-svg-icons | latest | Font Awesome 常规图标 |
