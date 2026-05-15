/**
 * Logo mapping for all tools.
 * Uses Simple Icons CDN (https://cdn.simpleicons.org/) for most brands.
 * Format: { slug, light, dark }
 * - slug: simple-icons brand slug
 * - light: hex color for light mode (defaults to brand color from simple-icons)
 * - dark: hex color for dark mode (usually 'FFFFFF' or a light brand color)
 *
 * For brands not in Simple Icons, use directUrls with light/dark SVG URLs.
 */

export interface LogoConfig {
  /** Simple Icons slug */
  slug?: string;
  /** Color for light mode (hex without #, or empty for default brand color) */
  light?: string;
  /** Color for dark mode (hex without #) */
  dark?: string;
  /** Direct SVG URLs when not in Simple Icons */
  directUrls?: {
    light: string;
    dark: string;
  };
}

export const LOGO_MAP: Record<string, LogoConfig> = {
  // ─── Development ───
  vscode:              { slug: 'visualstudiocode', light: '007ACC', dark: 'FFFFFF' },
  podman:              { slug: 'podman', light: '892CA0', dark: 'FFFFFF' },
  'podman-desktop':    { slug: 'podman', light: '892CA0', dark: 'FFFFFF' },
  nodejs:              { slug: 'nodedotjs', light: '339933', dark: 'FFFFFF' },
  python:              { slug: 'python', light: '3776AB', dark: 'FFFFFF' },
  git:                 { slug: 'git', light: 'F05032', dark: 'FFFFFF' },
  go:                  { slug: 'go', light: '00ADD8', dark: 'FFFFFF' },
  ruby:                { slug: 'ruby', light: 'CC342D', dark: 'FFFFFF' },
  'rust-lang':         { slug: 'rust', light: '000000', dark: 'FFFFFF' },
  java:                { slug: 'openjdk', light: '437291', dark: 'FFFFFF' },
  pycharm:             { slug: 'pycharm', light: '000000', dark: 'FFFFFF' },
  tortoisegit:         { slug: 'git', light: 'F05032', dark: 'FFFFFF' },
  hugo:                { slug: 'hugo', light: 'FF4088', dark: 'FFFFFF' },
  excalidraw:          { slug: 'excalidraw', light: '6965DB', dark: 'FFFFFF' },
  chromedriver:        { slug: 'googlechrome', light: '4285F4', dark: 'FFFFFF' },
  msys2:               { slug: 'windows', light: '0078D4', dark: 'FFFFFF' },
  dbeaver:             { slug: 'dbeaver', light: '382923', dark: 'FFFFFF' },
  tabby:               { slug: 'tabby', light: '1E6E73', dark: 'FFFFFF' },
  curl:                { slug: 'curl', light: '073551', dark: 'FFFFFF' },
  jq:                  { slug: 'json', light: '000000', dark: 'FFFFFF' },
  'github-cli':        { slug: 'github', light: '181717', dark: 'FFFFFF' },
  'visual-studio':     { slug: 'visualstudio', light: '5C2D91', dark: 'FFFFFF' },
  'another-redis-desktop-manager': { slug: 'redis', light: 'DC382D', dark: 'FFFFFF' },
  httpie:              { slug: 'httpie', light: 'FF0000', dark: 'FFFFFF' },

  // ─── Office ───
  office:              { slug: 'onlyoffice', light: '444444', dark: 'FFFFFF' },
  typora:              { slug: 'typora', light: '000000', dark: 'FFFFFF' },
  sublime:             { slug: 'sublimetext', light: 'FF9800', dark: 'FFFFFF' },
  wps:                 { slug: 'wpsoffice', light: '000000', dark: 'FFFFFF' },
  'microsoft-office':  { slug: 'microsoftoffice', light: 'D83B01', dark: 'FFFFFF' },
  'office-deployment-tool': { slug: 'microsoftoffice', light: 'D83B01', dark: 'FFFFFF' },
  'baidu-translate':   { slug: 'baidu', light: '2932E1', dark: 'FFFFFF' },

  // ─── Network ───
  ftp:                 { slug: 'filezilla', light: 'BF0000', dark: 'FFFFFF' },
  wget:                { slug: 'gnu', light: '000000', dark: 'FFFFFF' },
  packet:              { slug: 'wireshark', light: '1679A7', dark: 'FFFFFF' },
  chrome:              { slug: 'googlechrome', light: '4285F4', dark: 'FFFFFF' },
  firefox:             { slug: 'firefox', light: 'FF7139', dark: 'FFFFFF' },
  nmap:                { slug: 'nmap', light: '000000', dark: 'FFFFFF' },
  zap:                 { slug: 'zaproxy', light: '000000', dark: 'FFFFFF' },
  transmission:        { slug: 'transmission', light: '000000', dark: 'FFFFFF' },
  'tencent-meeting':   { slug: 'tencentqq', light: '000000', dark: 'FFFFFF' },
  dingtalk:            { slug: 'dingtalk', light: '000000', dark: 'FFFFFF' },
  'opera-gx':          { slug: 'opera', light: 'FF1B2D', dark: 'FFFFFF' },
  wechat:              { slug: 'wechat', light: '07C160', dark: 'FFFFFF' },
  'microsoft-edge':    { slug: 'microsoftedge', light: '0078D7', dark: 'FFFFFF' },

  // ─── System ───
  qgis:                { slug: 'qgis', light: '589632', dark: 'FFFFFF' },
  avast:               { slug: 'avast', light: '000000', dark: 'FFFFFF' },
  avira:               { slug: 'avira', light: '000000', dark: 'FFFFFF' },
  'vmware-workstation':{ slug: 'vmware', light: '000000', dark: 'FFFFFF' },
  rufus:               { slug: 'rufus', light: '000000', dark: 'FFFFFF' },
  virtualbox:          { slug: 'virtualbox', light: '000000', dark: 'FFFFFF' },
  'sogou-pinyin':      { slug: 'sogou', light: '000000', dark: 'FFFFFF' },
  'google-pinyin':     { slug: 'google', light: '4285F4', dark: 'FFFFFF' },
  powertoys:           { slug: 'windows', light: '0078D4', dark: 'FFFFFF' },
  rime:                { slug: 'rime', light: '000000', dark: 'FFFFFF' },
  bandizip:            { slug: 'bandisoft', light: '000000', dark: 'FFFFFF' },

  // ─── Media ───
  screen:              { slug: 'obsstudio', light: '302E31', dark: 'FFFFFF' },
  video:               { slug: 'vlcmediaplayer', light: 'FF8800', dark: 'FFFFFF' },
  squoosh:             { slug: 'googlechrome', light: '4285F4', dark: 'FFFFFF' },
};

/**
 * Build the SVG logo URL for a given tool ID and theme.
 */
export function getLogoUrl(toolId: string, isDark: boolean): string | null {
  const config = LOGO_MAP[toolId];
  if (!config) return null;

  if (config.directUrls) {
    return isDark ? config.directUrls.dark : config.directUrls.light;
  }

  if (config.slug) {
    const color = isDark
      ? (config.dark || 'FFFFFF')
      : (config.light || '');
    return `https://cdn.simpleicons.org/${config.slug}/${color}`;
  }

  return null;
}

/**
 * Check if a tool has a mapped SVG logo.
 */
export function hasMappedLogo(toolId: string): boolean {
  return toolId in LOGO_MAP;
}
