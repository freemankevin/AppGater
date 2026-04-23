'use client';

import { Tool } from '@/lib/types';
import { getStatusStyles } from '@/lib/download';

interface ToolCardProps {
  tool: Tool;
  onClick: () => void;
}

export default function ToolCard({ tool, onClick }: ToolCardProps) {
  const styles = getStatusStyles(tool.status);

  return (
    <div
      onClick={onClick}
      className="bg-gray-800 border border-gray-700 rounded-xl p-5 cursor-pointer group hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{tool.icon}</div>
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${styles.dot} ${tool.status === 'online' ? 'animate-pulse' : ''}`}></span>
          <span className="text-xs text-gray-500">{styles.text}</span>
        </div>
      </div>

      <h4 className="font-bold text-lg mb-1 text-white group-hover:text-blue-400 transition-colors">
        {tool.name}
      </h4>
      <p className="text-sm text-gray-400 mb-3 line-clamp-2">{tool.desc}</p>

      <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-700">
        <span>{tool.size}</span>
        <span className="flex items-center gap-1 text-blue-400 group-hover:translate-x-1 transition-transform">
          下载
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </div>
  );
}
