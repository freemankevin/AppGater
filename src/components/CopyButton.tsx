'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  title?: string;
}

export default function CopyButton({ text, title = 'Copy' }: CopyButtonProps) {
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
      className="p-2 rounded-lg bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-50 hover:border-gray-300 transition-colors"
      title={copied ? 'Copied' : title}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}
