'use client';

import { useState, useEffect } from 'react';

interface SearchPlaceholderProps {
  placeholders: string[];
  interval?: number;
}

export default function SearchPlaceholder({
  placeholders,
  interval = 3000,
}: SearchPlaceholderProps) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % placeholders.length);
        setFade(true);
      }, 300);
    }, interval);
    return () => clearInterval(timer);
  }, [placeholders.length, interval]);

  return (
    <span
      className="transition-opacity duration-300"
      style={{ opacity: fade ? 1 : 0 }}
    >
      {placeholders[index]}
    </span>
  );
}
