'use client';

import { FiGithub } from 'react-icons/fi';
import { useI18n } from '@/components/I18nProvider';

interface HeaderProps {
  sticky?: boolean;
}

export default function Header({ sticky = false }: HeaderProps) {
  const { locale, setLocale } = useI18n();

  const wrapperClass = sticky
    ? 'sticky top-0 z-40 relative border-b border-black/[0.07]'
    : 'shrink-0 z-40 relative';

  return (
    <header className={wrapperClass}>
      <div className="absolute inset-0 backdrop-blur-xl bg-[#f8f9fa]/80" />
      <div className="relative w-full px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="font-mono text-[15px] font-medium tracking-wide text-gray-900">
            <span className="text-emerald-500">AX</span>
            <span className="mx-1">·</span>
            IS
          </span>
        </a>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setLocale(locale === 'en' ? 'zh' : 'en')}
            className="flex items-center gap-1 px-2 py-1.5 text-[13px] text-gray-500 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-100/80"
            title={locale === 'en' ? 'Switch to Chinese' : 'Switch to English'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-3.5 h-3.5"
            >
              <path d="m5 8 6 6" />
              <path d="m4 14 6-6 2-3" />
              <path d="M2 5h12" />
              <path d="M7 2h1" />
              <path d="m22 22-5-10-5 10" />
              <path d="M14 18h6" />
            </svg>
            <span>{locale === 'en' ? '中' : 'En'}</span>
          </button>
          <a
            href="https://github.com/freemankevin/Axis"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
            title="GitHub"
          >
            <FiGithub className="w-4 h-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
