export interface Tool {
  id: string;
  name: string;
  category: ToolCategory;
  desc: string;
  official: string;
  size: string;
  status: 'online' | 'slow' | 'offline';
  icon: string;
  lastChecked?: string;
  healthStatus?: 'online' | 'offline';
  httpStatus?: number;
}

export type ToolCategory = 'all' | 'dev' | 'office' | 'system' | 'network' | 'media';

export interface CategoryInfo {
  id: ToolCategory;
  name: string;
  nameEn: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', name: '全部', nameEn: 'All' },
  { id: 'dev', name: '开发环境', nameEn: 'Development' },
  { id: 'office', name: '办公效率', nameEn: 'Office' },
  { id: 'system', name: '系统工具', nameEn: 'System' },
  { id: 'network', name: '网络工具', nameEn: 'Network' },
  { id: 'media', name: '媒体处理', nameEn: 'Media' },
];
