'use client';

import { ToolCategory, CategoryInfo } from '@/lib/types';

interface CategoryFilterProps {
  categories: CategoryInfo[];
  activeCategory: ToolCategory;
  onCategoryChange: (category: ToolCategory) => void;
}

export default function CategoryFilter({ categories, activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-6">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onCategoryChange(cat.id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeCategory === cat.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
