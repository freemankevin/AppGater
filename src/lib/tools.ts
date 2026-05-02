import { Tool, ToolCategory, CATEGORIES } from './types';

export async function getTools(): Promise<Tool[]> {
  try {
    const tools = await import('../data/tools.json');
    return tools.default as Tool[];
  } catch {
    return [];
  }
}

export async function getToolById(id: string): Promise<Tool | null> {
  const tools = await getTools();
  return tools.find(tool => tool.id === id) || null;
}

export async function getToolsByCategory(category: ToolCategory): Promise<Tool[]> {
  const tools = await getTools();
  if (category === 'all') return tools;
  return tools.filter(tool => tool.category === category);
}

export async function searchTools(query: string): Promise<Tool[]> {
  const tools = await getTools();
  const lowerQuery = query.toLowerCase();
  return tools.filter(tool =>
    tool.name.toLowerCase().includes(lowerQuery) ||
    tool.desc.toLowerCase().includes(lowerQuery) ||
    tool.publisher.toLowerCase().includes(lowerQuery)
  );
}

export function getCategories() {
  return CATEGORIES;
}

export function getCategoryName(categoryId: ToolCategory): string {
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category?.name || '全部';
}

export function getLogoPath(tool: Tool): string {
  return tool.logo || `/logo/${tool.id}.svg`;
}
