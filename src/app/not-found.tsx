import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-display text-6xl font-bold tracking-tight mb-4">404</h1>
        <p className="text-ink-muted text-lg mb-8">页面不存在</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[13px] text-ink-muted hover:text-ink hover:border-[var(--glass-hover-border)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          返回首页
        </Link>
      </div>
    </main>
  );
}
