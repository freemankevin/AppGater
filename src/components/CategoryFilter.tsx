'use client';

import { ToolCategory, CategoryInfo } from '@/lib/types';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  activeCategory: ToolCategory;
  onCategoryChange: (category: ToolCategory) => void;
  className?: string;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
  className = '',
}: CategoryFilterProps) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
            activeCategory === cat.id
              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.08)]'
              : 'text-ink-muted hover:text-ink border border-transparent hover:bg-[var(--glass-hover-bg)]'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
