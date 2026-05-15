'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="p-2 w-8 h-8" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 text-gray-400 hover:text-gray-900 transition-colors"
      title={isDark ? 'Light mode' : 'Dark mode'}
    >
      {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
}
