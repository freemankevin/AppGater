'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  title?: string;
}

export default function CopyButton({ text, title = '复制' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="p-2 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] text-ink-muted hover:text-ink hover:bg-[var(--glass-hover-bg)] hover:border-[var(--glass-hover-border)] transition-colors"
      title={copied ? '已复制' : title}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}
