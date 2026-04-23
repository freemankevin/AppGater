'use client';

import { useState, useMemo } from 'react';
import SearchBox from '@/components/SearchBox';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import DownloadModal from '@/components/DownloadModal';
import { Tool, ToolCategory } from '@/lib/types';
import { getCategories, getCategoryName } from '@/lib/tools';
import toolsData from '@/data/tools.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tools = toolsData as Tool[];
  const categories = getCategories();

  // 过滤工具
  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchCategory = activeCategory === 'all' || tool.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [tools, activeCategory, searchQuery]);

  // 统计在线工具数量
  const onlineCount = useMemo(() => {
    return tools.filter((t) => t.status === 'online').length;
  }, [tools]);

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/apple-touch-icon.png"
              alt="AppGater"
              className="w-10 h-10 rounded-xl"
            />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">AppGater</h1>
              <p className="text-xs text-gray-400">官方工具安全下载站</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              服务正常
            </span>
            <span>
              共收录 <strong className="text-white">{tools.length}</strong> 款工具
            </span>
          </div>
        </div>
      </header>

      {/* Hero Search */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">找到你需要的官方工具</h2>
          <p className="text-gray-400 mb-8">
            聚合全球优质开发/办公工具，每日自动检测官方链接可用性
          </p>

          <SearchBox
            onSearch={setSearchQuery}
            placeholder="搜索工具名称，如 VSCode、Docker、Python..."
          />

          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-300">
            {getCategoryName(activeCategory)} ({filteredTools.length})
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span> 在线
            <span className="w-2 h-2 bg-yellow-500 rounded-full ml-3"></span> 缓慢
            <span className="w-2 h-2 bg-red-500 rounded-full ml-3"></span> 异常
          </div>
        </div>

        {filteredTools.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">没有找到匹配的工具</p>
            <p className="text-sm mt-2">尝试使用其他关键词搜索</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} onClick={() => handleToolClick(tool)} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>AppGater - 官方工具聚合平台</p>
          <p className="mt-2">所有文件均来自官方源，本站仅提供导航服务</p>
        </div>
      </footer>

      {/* Download Modal */}
      <DownloadModal
        tool={selectedTool}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        baseUrl={typeof window !== 'undefined' ? window.location.origin : ''}
      />
    </main>
  );
}
