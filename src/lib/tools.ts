import { Tool, ToolCategory, CATEGORIES } from './types';

// 从 JSON 文件加载工具数据
export async function getTools(): Promise<Tool[]> {
  try {
    const tools = await import('../data/tools.json');
    return tools.default as Tool[];
  } catch {
    return [];
  }
}

// 根据 ID 获取单个工具
export async function getToolById(id: string): Promise<Tool | null> {
  const tools = await getTools();
  return tools.find(tool => tool.id === id) || null;
}

// 根据分类筛选工具
export async function getToolsByCategory(category: ToolCategory): Promise<Tool[]> {
  const tools = await getTools();
  if (category === 'all') return tools;
  return tools.filter(tool => tool.category === category);
}

// 搜索工具
export async function searchTools(query: string): Promise<Tool[]> {
  const tools = await getTools();
  const lowerQuery = query.toLowerCase();
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.desc.toLowerCase().includes(lowerQuery)
  );
}

// 获取所有分类
export function getCategories() {
  return CATEGORIES;
}

// 获取分类名称
export function getCategoryName(categoryId: ToolCategory): string {
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category?.name || '全部';
}
