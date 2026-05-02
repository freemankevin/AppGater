import { Tool, PRICE_LABELS } from './types';

export function generateDownloadUrl(tool: Tool, baseUrl: string): string {
  return `${baseUrl}/api/download?id=${tool.id}`;
}

export function isSafeOfficialUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
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
      'typora.io',
      'sublimetext.com',
      'crystalmark.info',
      'qgis.org',
      'connectify.me',
      'eternallybored.org',
      'screentogif.com',
      'colorpicker.fr',
      'docs.microsoft.com',
    ];
    return safeDomains.some(domain => parsed.hostname.includes(domain));
  } catch {
    return false;
  }
}

export function getStatusStyles(status: string) {
  switch (status) {
    case 'online':
      return {
        dot: 'bg-status-online',
        text: '官方在线',
        border: 'border-status-online/30',
      };
    case 'slow':
      return {
        dot: 'bg-status-slow',
        text: '响应缓慢',
        border: 'border-status-slow/30',
      };
    case 'offline':
      return {
        dot: 'bg-status-offline',
        text: '链接异常',
        border: 'border-status-offline/30',
      };
    default:
      return {
        dot: 'bg-ink-faint',
        text: '状态未知',
        border: 'border-ink-faint/30',
      };
  }
}

export { PRICE_LABELS };
