import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import CopyButton from '@/components/CopyButton';
import { getToolById, getTools, getLogoPath } from '@/lib/tools';
import { getStatusStyles, isSafeOfficialUrl, PRICE_LABELS } from '@/lib/download';
import { PLATFORM_LABELS, ARCH_LABELS } from '@/lib/types';

interface ToolPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const tools = await getTools();
  return tools.map((tool) => ({ id: tool.id }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { id } = await params;
  const tool = await getToolById(id);
  if (!tool) return { title: '未找到 - AppGater' };
  return {
    title: `${tool.name} — AppGater`,
    description: tool.desc,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = await params;
  const tool = await getToolById(id);
  if (!tool) notFound();

  const styles = getStatusStyles(tool.status);
  const isSafe = isSafeOfficialUrl(tool.official);
  const logo = getLogoPath(tool);

  return (
    <main className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-[var(--divider)] bg-surface/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 h-12 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[13px] text-ink-faint hover:text-ink transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-4 py-10">
        {/* Info */}
        <div className="flex items-start gap-4 mb-8">
          <img
            src={logo}
            alt={tool.name}
            className="w-16 h-16 rounded-xl bg-[var(--glass-bg)] object-contain shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display text-2xl font-bold tracking-tight">
                {tool.name}
              </h1>
              <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} title={styles.text} />
            </div>
            <p className="text-[13px] text-ink-faint mb-2">{tool.publisher}</p>
            <div className="flex flex-wrap items-center gap-2">
              {tool.platforms.map((p) => (
                <span key={p} className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-ink-muted">
                  {PLATFORM_LABELS[p] || p}
                </span>
              ))}
              {tool.architectures.map((a) => (
                <span key={a} className="text-[11px] px-2 py-0.5 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-ink-muted">
                  {ARCH_LABELS[a] || a}
                </span>
              ))}
              <span
                className={`text-[11px] font-medium ${
                  tool.price === 'free'
                    ? 'text-emerald-500'
                    : tool.price === 'paid'
                    ? 'text-amber-500'
                    : 'text-sky-500'
                }`}
              >
                {PRICE_LABELS[tool.price]}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-[15px] text-ink-muted leading-relaxed mb-8 max-w-2xl">
          {tool.desc}
        </p>

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {[
            { label: '大小', value: tool.size },
            { label: '分类', value: tool.category.toUpperCase() },
            { label: '检测', value: tool.lastChecked ? new Date(tool.lastChecked).toLocaleDateString('zh-CN') : '未检测' },
            { label: '验证', value: isSafe ? '官方已验证' : '请自行确认' },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)]">
              <p className="text-[11px] text-ink-faint mb-1">{item.label}</p>
              <p className="text-[13px] font-medium text-ink">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        {tool.tags && tool.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-8">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className="text-[12px] px-2.5 py-1 rounded-md bg-[var(--glass-bg)] border border-[var(--glass-border)] text-ink-faint"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 mb-10">
          <a
            href={`/api/download?id=${tool.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-ink text-surface rounded-lg text-[13px] font-medium hover:bg-ink-muted transition-colors"
          >
            <Download className="w-4 h-4" />
            立即下载
          </a>
          <a
            href={tool.official}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg text-[13px] text-ink-muted hover:text-ink hover:border-[var(--glass-hover-border)] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            官方网站
          </a>
        </div>

        {/* URL */}
        <div className="rounded-lg bg-[var(--glass-bg)] border border-[var(--glass-border)] p-3">
          <p className="text-[11px] text-ink-faint mb-1.5">官方下载地址</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-[var(--code-bg)] rounded-md px-3 py-2 text-[12px] text-ink-faint font-mono break-all">
              {tool.official}
            </code>
            <CopyButton text={tool.official} title="复制" />
          </div>
        </div>
      </section>
    </main>
  );
}
