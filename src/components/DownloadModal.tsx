'use client';

import { useState, useEffect } from 'react';
import { X, Download, ExternalLink } from 'lucide-react';
import { Tool, PRICE_LABELS, PLATFORM_LABELS, ARCH_LABELS } from '@/lib/types';
import { isSafeOfficialUrl } from '@/lib/download';
import { getDisplayTags } from '@/lib/tools';
import SafeLogo from '@/components/SafeLogo';
import { useI18n } from '@/components/I18nProvider';

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
  const { t } = useI18n();

  const [selectedPlatform, setSelectedPlatform] = useState<string>('');
  const [selectedArch, setSelectedArch] = useState<string>('');

  useEffect(() => {
    if (tool) {
      setSelectedPlatform(tool.platforms[0] || '');
      setSelectedArch(tool.architectures[0] || '');
    }
  }, [tool?.id]);

  if (!isOpen || !tool) return null;

  const isSafe = isSafeOfficialUrl(tool.official);

  const platforms = tool.platforms.length > 0 ? tool.platforms : ['windows'];
  const architectures = tool.architectures.length > 0 ? tool.architectures : ['x86'];

  const currentPlatform = selectedPlatform || platforms[0];
  const currentArch = selectedArch || architectures[0];

  const handleDownload = () => {
    const url = `${baseUrl}/api/download?id=${tool.id}&platform=${currentPlatform}&arch=${currentArch}`;
    window.open(url, '_blank');
    onClose();
  };

  const handleOfficial = () => {
    window.open(tool.official, '_blank');
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-5 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <SafeLogo tool={tool} size={40} className="rounded-lg" />
            <div>
              <h3 className="font-medium text-[15px] text-gray-900">{tool.name}</h3>
              <p className="text-[12px] text-gray-400">{tool.publisher}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-50 text-gray-400 hover:text-gray-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tags */}
        {(() => {
          const displayTags = getDisplayTags(tool);
          return displayTags.length > 0 ? (
            <div className="mb-4">
              <p className="text-[11px] text-gray-400 mb-1.5">Tags</p>
              <div className="flex flex-wrap gap-1.5">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2 py-1 rounded-md bg-white border border-gray-200 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null;
        })()}

        {/* Platform Selector */}
        <div className="mb-4">
          <p className="text-[11px] text-gray-400 mb-1.5">{t.selectPlatform}</p>
          <div className="flex flex-wrap gap-1.5">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPlatform(p)}
                className={`text-[12px] px-2.5 py-1.5 rounded-md border transition-all duration-200 ${
                  currentPlatform === p
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {PLATFORM_LABELS[p] || p}
              </button>
            ))}
          </div>
        </div>

        {/* Architecture Selector */}
        <div className="mb-4">
          <p className="text-[11px] text-gray-400 mb-1.5">{t.selectArch}</p>
          <div className="flex flex-wrap gap-1.5">
            {architectures.map((a) => (
              <button
                key={a}
                onClick={() => setSelectedArch(a)}
                className={`text-[12px] px-2.5 py-1.5 rounded-md border transition-all duration-200 ${
                  currentArch === a
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : 'bg-white border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                {ARCH_LABELS[a] || a}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2.5 mb-6">
          {[
            { label: 'License', value: PRICE_LABELS[tool.price] },
            { label: 'Size', value: tool.size },
            {
              label: 'Source',
              value: (
                <span className={isSafe ? 'text-emerald-500' : 'text-amber-500'}>
                  {isSafe ? 'Verified' : 'Unverified'}
                </span>
              ),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0"
            >
              <span className="text-[13px] text-gray-400">{item.label}</span>
              <span className="text-[13px] text-gray-900">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-emerald-500 text-white rounded-lg text-[13px] font-medium hover:bg-emerald-600 transition-colors shadow-sm"
        >
          <Download className="w-4 h-4" />
          {t.downloadFor} {PLATFORM_LABELS[currentPlatform] || currentPlatform} ({ARCH_LABELS[currentArch] || currentArch})
        </button>

        {/* Official page link */}
        <button
          onClick={handleOfficial}
          className="w-full mt-2.5 flex items-center justify-center gap-1 text-[12px] text-gray-400 hover:text-gray-500 transition-colors"
        >
          {t.officialPage}
          <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
