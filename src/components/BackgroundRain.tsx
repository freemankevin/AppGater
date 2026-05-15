'use client';

import { useState, useEffect } from 'react';

const CHARS = '01<>{}[]/|&¬~!?+-=.:;✓';
const COLUMN_COUNT = 14;

interface RainColumn {
  id: number;
  left: string;
  duration: number;
  delay: number;
  chars: string[];
  opacity: number;
  fontSize: number;
}

function generateColumns(): RainColumn[] {
  const cols: RainColumn[] = [];
  for (let i = 0; i < COLUMN_COUNT; i++) {
    const length = 10 + Math.floor(Math.random() * 12);
    const chars = Array.from({ length }, () => CHARS[Math.floor(Math.random() * CHARS.length)]);
    cols.push({
      id: i,
      left: `${5 + Math.random() * 90}%`,
      duration: 18 + Math.random() * 22,
      delay: Math.random() * 20,
      chars,
      opacity: 0.08 + Math.random() * 0.08,
      fontSize: 12 + Math.floor(Math.random() * 5),
    });
  }
  return cols;
}

export default function BackgroundRain() {
  const [columns, setColumns] = useState<RainColumn[]>([]);

  useEffect(() => {
    setColumns(generateColumns());
  }, []);

  if (columns.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
      {columns.map((col) => (
        <div
          key={col.id}
          className="absolute top-0 flex flex-col items-center font-mono text-emerald-400 leading-tight"
          style={{
            left: col.left,
            fontSize: col.fontSize,
            opacity: col.opacity,
            animation: `rain-drop ${col.duration}s linear ${col.delay}s infinite`,
          }}
        >
          {col.chars.map((char, i) => {
            const charOpacity =
              i === 0 ? 1 : i === 1 ? 0.7 : i === 2 ? 0.45 : Math.max(0.08, 0.35 - i * 0.03);
            return (
              <span key={i} style={{ opacity: charOpacity }}>
                {char}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
