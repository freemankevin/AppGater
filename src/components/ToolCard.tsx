'use client';

import { useRef, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { Tool, PRICE_LABELS, PLATFORM_LABELS, ARCH_LABELS } from '@/lib/types';
import { getLogoPath } from '@/lib/tools';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
  compact?: boolean;
}

export default function ToolCard({ tool, onClick, compact = false }: ToolCardProps) {
  const { resolvedTheme } = useTheme();
  const logo = getLogoPath(tool, resolvedTheme === 'dark');
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) * 6;
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.005)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
  }, []);

  if (compact) {
    return (
      <div
        onClick={onClick}
        className="group flex items-center gap-4 p-4 rounded-xl border border-gray-200 bg-white cursor-pointer transition-all duration-200 hover:border-emerald-200 hover:shadow-sm"
      >
        {logo ? (
          <img
            src={logo}
            alt={tool.name}
            width={40}
            height={40}
            className="tool-logo rounded-lg shrink-0 object-contain"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        ) : (
          <span className="text-xl w-10 h-10 flex items-center justify-center shrink-0">
            {tool.icon}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-[14px] text-gray-900 truncate">
              {tool.name}
            </h3>
            <span className="text-[11px] text-gray-400 truncate">{tool.publisher}</span>
          </div>
          <p className="text-[13px] text-gray-500 truncate">{tool.desc}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {tool.platforms.map((p) => (
            <span
              key={p}
              className="text-[11px] px-2 py-0.5 rounded-md bg-gray-100 text-gray-500"
            >
              {PLATFORM_LABELS[p] || p}
            </span>
          ))}
          <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-600 font-medium border border-emerald-100">
            {PRICE_LABELS[tool.price]}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex flex-col rounded-[14px] border-[1.5px] border-black/[0.07] bg-white cursor-pointer transition-all duration-300 hover:border-emerald-500/20 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)] overflow-hidden"
      style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
    >
      {/* Accent top bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-sky-400/80 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-10" />

      {/* Shimmer */}
      <div className="absolute -top-[40%] -left-[60%] w-[60%] h-[180%] bg-gradient-to-r from-transparent via-white/[0.55] to-transparent -skew-x-12 group-hover:left-[130%] transition-[left] duration-500 ease-out z-10 pointer-events-none" />

      <div className="p-5 relative z-0">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {/* Icon */}
            <div className="w-[42px] h-[42px] rounded-[10px] flex items-center justify-center text-[20px] shrink-0 overflow-hidden transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110">
              {logo ? (
                <img
                  src={logo}
                  alt={tool.name}
                  width={42}
                  height={42}
                  className="tool-logo w-full h-full object-contain rounded-[10px]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              ) : (
                <span className="w-full h-full flex items-center justify-center">
                  {tool.icon}
                </span>
              )}
            </div>

            {/* Info */}
            <div>
              <h3 className="text-[15px] font-semibold text-[#0f1117] tracking-tight leading-tight">
                {tool.name}
              </h3>
              <div className="flex items-center gap-1.5 text-[12px] text-[#9ca3af] mt-[3px]">
                <span>{tool.publisher}</span>
                {tool.architectures.length > 0 && (
                  <>
                    <span className="inline-block w-px h-2.5 bg-black/[0.07] opacity-80" />
                    <span className="font-mono text-[10.5px] text-[#9ca3af] opacity-65 tracking-wide">
                      {tool.architectures.map((a) => ARCH_LABELS[a] || a).join(' · ')}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Menu dots */}
          <div className="w-[26px] h-[26px] rounded-[7px] flex items-center justify-center text-[#9ca3af] text-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-[#f1f3f5]">
            ⋯
          </div>
        </div>

        {/* Description */}
        <p className="text-[13.5px] text-[#6b7280] leading-[1.5] my-[14px]">
          {tool.desc}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex gap-[5px] items-center flex-nowrap">
            {tool.platforms.map((p) => (
              <span
                key={p}
                className="text-[11.5px] font-medium text-[#6b7280] px-[9px] py-1 rounded-md bg-[#f1f3f5] border border-transparent whitespace-nowrap shrink-0 transition-colors duration-200 group-hover:border-black/[0.07] group-hover:bg-[#eef0f2]"
              >
                {PLATFORM_LABELS[p] || p}
              </span>
            ))}
          </div>
          <span className={`text-[11.5px] font-semibold tracking-wide px-[11px] py-1 rounded-md border shrink-0 ${
            tool.price === 'free'
              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25'
              : 'bg-amber-500/10 text-amber-500 border-amber-500/25'
          }`}>
            {PRICE_LABELS[tool.price]}
          </span>
        </div>
      </div>
    </div>
  );
}
