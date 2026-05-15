'use client';

import { Star } from 'lucide-react';
import { Tool } from '@/lib/types';
import SafeLogo from '@/components/SafeLogo';
import { useI18n } from '@/components/I18nProvider';

interface ToolsMarqueeProps {
  tools: Tool[];
}

function MarqueeRow({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const duplicated = [...tools, ...tools];
  return (
    <div className="flex overflow-hidden">
      <div
        className={`flex gap-3 shrink-0 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {duplicated.map((tool, i) => {
          return (
            <div
              key={`${tool.id}-${i}`}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-gray-200 bg-white backdrop-blur-sm shrink-0 hover:bg-gray-50 transition-colors cursor-default"
            >
              <SafeLogo tool={tool} size={20} className="rounded" />
              <span className="text-[13px] text-gray-900 font-medium whitespace-nowrap">
                {tool.name}
              </span>
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star className="w-3 h-3 fill-current" />
                <span className="text-[11px] font-medium">{tool.rating}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ToolsMarquee({ tools }: ToolsMarqueeProps) {
  const { t } = useI18n();

  const popular = tools
    .filter((t) => t.status === 'online' && (t.rating ?? 0) >= 4.8)
    .slice(0, 12);

  if (popular.length < 4) return null;

  const mid = Math.ceil(popular.length / 2);
  const row1 = popular.slice(0, mid);
  const row2 = popular.slice(mid);

  return (
    <section className="relative z-10 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-[13px] text-gray-400 mb-6 tracking-wide uppercase">
          {t.popularTools}
        </p>
        <div className="space-y-3">
          <MarqueeRow tools={row1} />
          <MarqueeRow tools={row2} reverse />
        </div>
      </div>
    </section>
  );
}
