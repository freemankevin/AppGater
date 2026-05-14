export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  desc: string;
  official: string;
  size: string;
  status: 'online' | 'slow' | 'offline';
  icon: string;
  logo?: string;
  lastChecked?: string;
  healthStatus?: 'online' | 'offline';
  httpStatus?: number;
  responseTime?: number;
  price: 'free' | 'paid' | 'freemium';
  publisher: string;
  verified: boolean;
  tags?: string[];
  platforms: string[];
  architectures: string[];
}

export type ToolCategory = 'all' | 'dev' | 'office' | 'system' | 'network' | 'media';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', name: 'All' },
  { id: 'dev', name: 'Development' },
  { id: 'office', name: 'Office' },
  { id: 'system', name: 'System' },
  { id: 'network', name: 'Network' },
  { id: 'media', name: 'Media' },
];

export const PRICE_LABELS: Record<string, string> = {
  free: 'Free',
  paid: 'Paid',
  freemium: 'Freemium',
};

export const PLATFORM_LABELS: Record<string, string> = {
  mac: 'macOS',
  linux: 'Linux',
  windows: 'Windows',
};

export const ARCH_LABELS: Record<string, string> = {
  x86: 'x86',
  arm64: 'arm64',
};
