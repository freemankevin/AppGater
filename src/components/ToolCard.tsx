'use client';

import { Tool, PRICE_LABELS, PLATFORM_LABELS, ARCH_LABELS } from '@/lib/types';
import { getStatusStyles } from '@/lib/download';
import { getLogoPath } from '@/lib/tools';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const styles = getStatusStyles(tool.status);
  const logo = getLogoPath(tool);
  const isOffline = tool.status === 'offline';

  return (
    <div
      onClick={onClick}
      className={`group relative flex flex-col rounded-xl border border-[var(--glass-border)] bg-[var(--glass-bg)] cursor-pointer transition-all duration-200 hover:bg-[var(--glass-hover-bg)] hover:border-[var(--glass-hover-border)] ${
        isOffline ? 'opacity-50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-3.5 p-4 pb-0">
        <Image
          src={logo}
          alt={tool.name}
          width={44}
          height={44}
          className="rounded-lg shrink-0 object-contain bg-[#1e1e1e]"
        />
        <div className="flex-1 min-w-0 pt-0.5">
          <div className="flex items-center gap-1.5">
            <h3 className="font-medium text-[15px] text-ink truncate leading-tight">
              {tool.name}
            </h3>
            <span
              className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}
              title={styles.text}
            />
          </div>
          <p className="text-[12px] text-ink-faint truncate mt-0.5">
            {tool.publisher}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[13px] text-ink-muted leading-relaxed px-4 pt-3 pb-4 line-clamp-2">
        {tool.desc}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto px-4 py-3 border-t border-[var(--divider)]">
        <div className="flex items-center gap-1.5">
          {tool.platforms.map((p) => (
            <span
              key={p}
              className="text-[11px] px-1.5 py-0.5 rounded bg-[var(--glass-bg)] text-ink-muted border border-[var(--glass-border)]"
            >
              {PLATFORM_LABELS[p] || p}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2">
          {tool.architectures.map((a) => (
            <span key={a} className="text-[11px] text-ink-muted">
              {ARCH_LABELS[a] || a}
            </span>
          ))}
          <span className="text-[11px] text-ink-faint">·</span>
          <span
            className={`text-[11px] font-medium ${
              tool.price === 'free'
                ? 'text-emerald-500'
                : tool.price === 'paid'
                ? 'text-amber-500'
                : 'text-sky-500'
            }`}
          >
            {PRICE_LABELS[tool.price]}
          </span>
        </div>
      </div>
    </div>
  );
}
