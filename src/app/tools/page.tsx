'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Search, LayoutGrid, List } from 'lucide-react';
import { useI18n } from '@/components/I18nProvider';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import DownloadModal from '@/components/DownloadModal';
import Header from '@/components/Header';
import AmbientOrbs from '@/components/AmbientOrbs';
import ParticleNetwork from '@/components/ParticleNetwork';
import { Tool, ToolCategory } from '@/lib/types';
import { getCategories } from '@/lib/tools';
import toolsData from '@/data/tools.json';

export default function ToolsPage() {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
        tool.tags?.some((tag) => tag.toLowerCase().includes(q));
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen bg-[#f8f9fa] relative">
      {/* Background layers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <AmbientOrbs />
        <ParticleNetwork />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(circle, #cbd5e1 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      <div className="relative z-10">
        <Header sticky />

        {/* Hero */}
        <section className="pt-16 pb-10 px-4 animate-fade-up">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 mb-6 animate-fade-up" style={{ animationDelay: '0.05s' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
              <span className="text-[12px] font-medium text-emerald-700">
                Verified Daily
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight text-gray-900 mb-3 animate-fade-up" style={{ animationDelay: '0.15s' }}>
              {t.toolsTitle}
            </h1>

            {/* Subtitle */}
            <p className="text-[14px] text-gray-400 mb-10 animate-fade-up" style={{ animationDelay: '0.25s' }}>
              {t.toolsSubtitle}
            </p>

            {/* Search Box */}
            <div className="max-w-xl mx-auto animate-fade-up" style={{ animationDelay: '0.35s' }}>
              <div
                className={`relative flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm transition-all duration-300 ${
                  searchFocused
                    ? 'border-2 border-emerald-400/50 shadow-[0_0_20px_rgba(16,185,129,0.15)]'
                    : 'border border-gray-200'
                }`}
              >
                <Search className={`w-4 h-4 shrink-0 transition-colors duration-300 ${searchFocused ? 'text-emerald-500' : 'text-gray-400'}`} />
                <input
                  ref={inputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  placeholder="Search software..."
                  className="flex-1 bg-transparent text-[14px] text-gray-900 placeholder-gray-400 focus:outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[11px] font-sans text-gray-400 bg-gray-50/80 border border-gray-100">
                  <span className="text-[10px]">⌘</span>K
                </kbd>
              </div>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="pb-8 px-4 animate-fade-up" style={{ animationDelay: '0.45s' }}>
          <div className="max-w-3xl mx-auto flex justify-center">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
        </section>

        {/* Tool Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 animate-fade-up" style={{ animationDelay: '0.55s' }}>
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] text-gray-400">
              Showing <span className="font-semibold text-gray-600">{filteredTools.length}</span> tools
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-400 hover:text-gray-600 border border-gray-200'
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'list'
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-400 hover:text-gray-600 border border-gray-200'
                }`}
              >
                <List className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {filteredTools.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-[15px]">{t.noTools}</p>
              <p className="text-[13px] mt-1">{t.tryDifferent}</p>
            </div>
          ) : (
            <div
              className={`grid gap-4 ${
                viewMode === 'grid'
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                  : 'grid-cols-1'
              }`}
            >
              {filteredTools.map((tool, i) => (
                <div
                  key={tool.id}
                  className="animate-fade-in-up"
                  style={{
                    animationDelay: `${Math.min(i * 40, 600)}ms`,
                    animationFillMode: 'both',
                  }}
                >
                  <ToolCard
                    tool={tool}
                    onClick={() => handleToolClick(tool)}
                    compact={viewMode === 'list'}
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <DownloadModal
        tool={selectedTool}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        baseUrl={typeof window !== 'undefined' ? window.location.origin : ''}
      />
    </main>
  );
}
