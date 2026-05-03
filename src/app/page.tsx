'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import SearchBox from '@/components/SearchBox';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import DownloadModal from '@/components/DownloadModal';
import ThemeToggle from '@/components/ThemeToggle';
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

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchCategory =
        activeCategory === 'all' || tool.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.desc.toLowerCase().includes(q) ||
        tool.publisher.toLowerCase().includes(q) ||
        tool.tags?.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [tools, activeCategory, searchQuery]);

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  return (
    <main className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-[var(--divider)] bg-surface/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/apple-touch-icon.png"
              alt="AppGater"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-display font-semibold text-[15px] tracking-tight">
              AppGater
            </span>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-ink-faint hover:text-ink transition-colors"
              title="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-16 pb-10 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            安全下载官方软件
          </h1>
          <p className="text-ink-muted text-[15px] mb-8 leading-relaxed">
            —— 每日验证链接 · 一键直达官方源 ——
          </p>
          <SearchBox
            onSearch={setSearchQuery}
            placeholder="搜索软件名称、发布者或标签..."
          />
        </div>
      </section>

      {/* Filter */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </section>

      {/* Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {filteredTools.length === 0 ? (
          <div className="text-center py-20 text-ink-faint">
            <p className="text-[15px]">未找到匹配的软件</p>
            <p className="text-[13px] mt-1">尝试更换关键词或分类</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.map((tool) => (
              <ToolCard
                key={tool.id}
                tool={tool}
                onClick={() => handleToolClick(tool)}
              />
            ))}
          </div>
        )}
      </section>

      <DownloadModal
        tool={selectedTool}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        baseUrl={typeof window !== 'undefined' ? window.location.origin : ''}
      />
    </main>
  );
}
