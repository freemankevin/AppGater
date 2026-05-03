'use client';

import { ToolCategory, CategoryInfo } from '@/lib/types';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  activeCategory: ToolCategory;
  onCategoryChange: (category: ToolCategory) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-3.5 py-1.5 rounded-lg text-[13px] font-medium transition-colors ${
            activeCategory === cat.id
              ? 'bg-[var(--glass-active-bg)] text-ink border border-[var(--glass-active-border)]'
              : 'text-ink-muted hover:text-ink border border-transparent'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
