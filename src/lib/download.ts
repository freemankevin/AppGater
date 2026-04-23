import { Tool } from './types';

// 生成代理下载链接
export function generateDownloadUrl(tool: Tool, baseUrl: string): string {
  return `${baseUrl}/api/download?id=${tool.id}`;
}

// 验证工具链接是否安全（简单域名验证）
export function isSafeOfficialUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    // 检查是否是常见官方域名
    const safeDomains = [
      'microsoft.com',
      'github.com',
      'docker.com',
      'nodejs.org',
      'python.org',
      'jetbrains.com',
      'oracle.com',
      'adobe.com',
      'videolan.org',
      'wireshark.org',
      'filezilla-project.org',
      'obsproject.com',
      'go.dev',
      'git-scm.com',
      'code.visualstudio.com',
    ];
    return safeDomains.some(domain => parsed.hostname.includes(domain));
  } catch {
    return false;
  }
}

// 获取工具状态样式
export function getStatusStyles(status: string) {
  switch (status) {
    case 'online':
      return {
        dot: 'bg-green-500',
        text: '官方在线',
        bg: 'bg-green-500/20',
        border: 'border-green-500/30',
      };
    case 'slow':
      return {
        dot: 'bg-yellow-500',
        text: '响应缓慢',
        bg: 'bg-yellow-500/20',
        border: 'border-yellow-500/30',
      };
    case 'offline':
      return {
        dot: 'bg-red-500',
        text: '链接异常',
        bg: 'bg-red-500/20',
        border: 'border-red-500/30',
      };
    default:
      return {
        dot: 'bg-gray-500',
        text: '状态未知',
        bg: 'bg-gray-500/20',
        border: 'border-gray-500/30',
      };
  }
}
