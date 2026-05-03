'use client';

import Image from 'next/image';\nimport { X, Download } from 'lucide-react';
import { Tool, PRICE_LABELS, PLATFORM_LABELS, ARCH_LABELS } from '@/lib/types';
import { isSafeOfficialUrl } from '@/lib/download';
import { getLogoPath, getDisplayTags } from '@/lib/tools';

interface DownloadModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  baseUrl: string;
}

export default function DownloadModal({
  tool,
  isOpen,
  onClose,
  baseUrl,
}: DownloadModalProps) {
  if (!isOpen || !tool) return null;

  const logo = getLogoPath(tool);
  const isSafe = isSafeOfficialUrl(tool.official);

  const handleDownload = () => {
    window.open(`${baseUrl}/api/download?id=${tool.id}`, '_blank');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm rounded-xl border border-[var(--glass-border)] bg-surface-elevated p-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <Image
              src={logo}
              alt={tool.name}
              width={40}
              height={40}
              className="rounded-lg bg-[#1e1e1e] object-contain"
            />
            <div>
              <h3 className="font-medium text-[15px] text-ink">{tool.name}</h3>
              <p className="text-[12px] text-ink-faint">{tool.publisher}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-[var(--glass-hover-bg)] text-ink-faint hover:text-ink transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tags */}
        {(() => {
          const displayTags = getDisplayTags(tool);
          return displayTags.length > 0 ? (
            <div className="mb-4">
              <p className="text-[11px] text-ink-faint mb-1.5">标签</p>
              <div className="flex flex-wrap gap-1.5">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-1 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-ink-muted"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null;
        })()}

        {/* Platforms */}
        <div className="mb-4">
          <p className="text-[11px] text-ink-faint mb-1.5">支持平台</p>
          <div className="flex flex-wrap gap-1.5">
            {tool.platforms.map((p) => (
              <span key={p} className="text-[12px] px-2 py-1 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-ink-muted">
                {PLATFORM_LABELS[p] || p}
              </span>
            ))}
          </div>
        </div>

        {/* Architectures */}
        <div className="mb-4">
          <p className="text-[11px] text-ink-faint mb-1.5">CPU 架构</p>
          <div className="flex flex-wrap gap-1.5">
            {tool.architectures.map((a) => (
              <span key={a} className="text-[12px] px-2 py-1 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-ink-muted">
                {ARCH_LABELS[a] || a}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2.5 mb-6">
          {[
            { label: '授权方式', value: PRICE_LABELS[tool.price] },
            { label: '文件大小', value: tool.size },
            { label: '来源验证', value: (
              <span className={isSafe ? 'text-emerald-500' : 'text-amber-500'}>
                {isSafe ? '官方已验证' : '请自行确认'}
              </span>
            )},
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-1.5 border-b border-[var(--divider)] last:border-0"
            >
              <span className="text-[13px] text-ink-faint">{item.label}</span>
              <span className="text-[13px] text-ink">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-ink text-surface rounded-lg text-[13px] font-medium hover:bg-ink-muted transition-colors"
        >
          <Download className="w-4 h-4" />
          立即下载
        </button>
      </div>
    </div>
  );
}
