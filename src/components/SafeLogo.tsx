'use client';

import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Tool } from '@/lib/types';
import { getLogoUrl } from '@/lib/logo-map';

interface SafeLogoProps {
  tool: Tool;
  size: number;
  className?: string;
}

export default function SafeLogo({ tool, size, className = '' }: SafeLogoProps) {
  const [failed, setFailed] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  const logoUrl = getLogoUrl(tool.id, isDark);

  if (!logoUrl || failed) {
    return (
      <span
        className={`flex items-center justify-center shrink-0 ${className}`}
        style={{ width: size, height: size, fontSize: size * 0.6 }}
      >
        {tool.icon}
      </span>
    );
  }

  return (
    <img
      src={logoUrl}
      alt={tool.name}
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`}
      onError={() => setFailed(true)}
    />
  );
}
