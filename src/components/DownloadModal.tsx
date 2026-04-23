'use client';

import { useState } from 'react';
import { Tool } from '@/lib/types';
import { isSafeOfficialUrl } from '@/lib/download';

interface DownloadModalProps {
  tool: Tool | null;
  isOpen: boolean;
  onClose: () => void;
  baseUrl: string;
}

export default function DownloadModal({ tool, isOpen, onClose, baseUrl }: DownloadModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !tool) return null;

  const handleStartDownload = () => {
    const downloadUrl = `${baseUrl}/api/download?id=${tool.id}`;
    window.open(downloadUrl, '_blank');
    onClose();
  };

  const handleCopyOfficialLink = async () => {
    try {
      await navigator.clipboard.writeText(tool.official);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // 复制失败
    }
  };

  const isSafe = isSafeOfficialUrl(tool.official);

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-gray-800 rounded-2xl max-w-lg w-full p-6 border border-gray-700">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{tool.name}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {isSafe ? '官方来源验证通过' : '请仔细确认来源安全性'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isSafe ? 'bg-blue-600/20 text-blue-400' : 'bg-yellow-600/20 text-yellow-400'}`}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-white">安全验证</p>
              <p className="text-xs text-gray-500">
                {isSafe ? '链接指向官方域名，无篡改' : '请自行验证链接安全性'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
            <div className="w-10 h-10 bg-green-600/20 rounded-lg flex items-center justify-center text-green-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-white">高速下载</p>
              <p className="text-xs text-gray-500">Edge 网络加速 + 智能分流</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg">
            <div className="w-10 h-10 bg-purple-600/20 rounded-lg flex items-center justify-center text-purple-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm text-white">文件大小</p>
              <p className="text-xs text-gray-500">{tool.size}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleStartDownload}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            立即下载
          </button>
          <button
            onClick={handleCopyOfficialLink}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm font-medium transition-all text-white"
          >
            {copied ? '已复制' : '复制官方链接'}
          </button>
        </div>

        <p className="text-xs text-gray-600 mt-4 text-center">
          下载由 AppGater 代理加速，文件来源：官方服务器
        </p>
      </div>
    </div>
  );
}
