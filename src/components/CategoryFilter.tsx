'use client';

import { useRef, useCallback } from 'react';
import {
  LayoutGrid,
  Code2,
  Briefcase,
  MonitorCog,
  Globe,
  ImagePlay,
  LucideIcon,
} from 'lucide-react';
import { ToolCategory, CategoryInfo } from '@/lib/types';

const ICON_MAP: Record<ToolCategory, LucideIcon> = {
  all: LayoutGrid,
  dev: Code2,
  office: Briefcase,
  system: MonitorCog,
  network: Globe,
  media: ImagePlay,
};

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
  const btnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const rippleRefs = useRef<Map<string, HTMLSpanElement>>(new Map());

  const handleClick = useCallback((catId: ToolCategory, e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const ripple = rippleRefs.current.get(catId);

    if (ripple) {
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.remove('animate-ripple');
      void ripple.offsetWidth;
      ripple.classList.add('animate-ripple');
    }

    onCategoryChange(catId);
  }, [onCategoryChange]);

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {categories.map((cat) => {
        const Icon = ICON_MAP[cat.id];
        const isActive = activeCategory === cat.id;

        return (
          <button
            key={cat.id}
            ref={(el) => {
              if (el) btnRefs.current.set(cat.id, el);
            }}
            onClick={(e) => handleClick(cat.id, e)}
            className={`relative inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-300 overflow-hidden ${
              isActive
                ? 'bg-emerald-500 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span
              ref={(el) => {
                if (el) rippleRefs.current.set(cat.id, el);
              }}
              className="absolute rounded-full bg-white/30 pointer-events-none scale-0"
              style={{ transform: 'scale(0)' }}
            />
            <Icon className="w-3.5 h-3.5 relative z-10" />
            <span className="relative z-10">{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
