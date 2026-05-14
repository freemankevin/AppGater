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
      'onlyoffice.com',
      'sumatrapdfreader.org',
      'pdfgear.com',
      'mypublicwifi.com',
      'podman.io',
      'ruby-lang.org',
      'facepunch.com',
    ];
    return safeDomains.some(domain => {
      const host = parsed.hostname.toLowerCase();
      return host === domain || host.endsWith(`.${domain}`);
    });
  } catch {
    return false;
  }
}

export function getStatusStyles(status: string) {
  switch (status) {
    case 'online':
      return {
        dot: 'bg-status-online',
        text: 'Online',
        border: 'border-status-online/30',
      };
    case 'slow':
      return {
        dot: 'bg-status-slow',
        text: 'Slow',
        border: 'border-status-slow/30',
      };
    case 'offline':
      return {
        dot: 'bg-status-offline',
        text: 'Offline',
        border: 'border-status-offline/30',
      };
    default:
      return {
        dot: 'bg-ink-faint',
        text: 'Unknown',
        border: 'border-ink-faint/30',
      };
  }
}

export { PRICE_LABELS };
