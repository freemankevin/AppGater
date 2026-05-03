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

const PUBLISHER_ALIASES: Record<string, string[]> = {
  microsoft: ['微软'],
  google: ['谷歌'],
  adobe: ['adobe'],
  docker: ['docker'],
  oracle: ['oracle'],
  openjdk: ['openjdk'],
};

export function getDisplayTags(tool: Tool): string[] {
  if (!tool.tags || tool.tags.length === 0) return [];

  const p = tool.publisher.toLowerCase();
  const publisherParts = p.split(/\s*\/\s*|\s+/);

  return tool.tags.filter((tag) => {
    const t = tag.toLowerCase();

    // 完全匹配
    if (t === p) return false;

    // 互相包含
    if (p.includes(t) || t.includes(p)) return false;

    // 分段匹配
    for (const part of publisherParts) {
      if (part.length > 1 && (part === t || t.includes(part) || part.includes(t))) {
        return false;
      }
    }

    // 别名匹配
    for (const [key, aliases] of Object.entries(PUBLISHER_ALIASES)) {
      if (p.includes(key) || publisherParts.some((part) => part === key)) {
        if (aliases.includes(t)) return false;
      }
      if (t === key || aliases.includes(t)) {
        if (publisherParts.some((part) => part === key) || p.includes(key)) {
          return false;
        }
      }
    }

    return true;
  });
}
