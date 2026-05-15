import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, ExternalLink } from 'lucide-react';
import CopyButton from '@/components/CopyButton';
import Header from '@/components/Header';
import SafeLogo from '@/components/SafeLogo';
import { getToolById, getTools, getDisplayTags } from '@/lib/tools';
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
  if (!tool) return { title: 'Not Found - Axis' };
  return {
    title: `${tool.name} — Axis`,
    description: tool.desc,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = await params;
  const tool = await getToolById(id);
  if (!tool) notFound();

  const styles = getStatusStyles(tool.status);
  const isSafe = isSafeOfficialUrl(tool.official);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header sticky />

      <section className="max-w-3xl mx-auto px-4 py-10">
        <div className="mb-8">
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-[13px] text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        {/* Info */}
        <div className="flex items-start gap-4 mb-8">
          <SafeLogo tool={tool} size={64} className="tool-logo rounded-xl" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="font-display text-2xl font-bold tracking-tight">
                {tool.name}
              </h1>
              <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} title={styles.text} />
            </div>
            <p className="text-[13px] text-gray-400 mb-2">{tool.publisher}</p>
            <div className="flex flex-wrap items-center gap-2">
              {tool.platforms.map((p) => (
                <span key={p} className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-500">
                  {PLATFORM_LABELS[p] || p}
                </span>
              ))}
              {tool.architectures.map((a) => (
                <span key={a} className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-gray-200 text-gray-500">
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
        <p className="text-[15px] text-gray-500 leading-relaxed mb-8 max-w-2xl">
          {tool.desc}
        </p>

        {/* Meta */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
          {[
            { label: 'Size', value: tool.size },
            { label: 'Category', value: tool.category.toUpperCase() },
            { label: 'Checked', value: tool.lastChecked ? new Date(tool.lastChecked).toLocaleDateString('en-US') : 'Not checked' },
            { label: 'Verification', value: isSafe ? 'Verified' : 'Unverified' },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg bg-white border border-gray-200">
              <p className="text-[11px] text-gray-400 mb-1">{item.label}</p>
              <p className="text-[13px] font-medium text-gray-900">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Tags */}
        {(() => {
          const displayTags = getDisplayTags(tool);
          return displayTags.length > 0 ? (
            <div className="mb-8">
              <p className="text-[11px] text-gray-400 mb-2">Tags</p>
              <div className="flex flex-wrap gap-2">
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] px-2.5 py-1 rounded-md bg-white border border-gray-200 text-gray-500"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ) : null;
        })()}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2 mb-10">
          <a
            href={`/api/download?id=${tool.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gray-900 text-white rounded-lg text-[13px] font-medium hover:bg-gray-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
          <a
            href={tool.official}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-[13px] text-gray-500 hover:text-gray-900 hover:border-gray-300 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Homepage
          </a>
        </div>

        {/* URL */}
        <div className="rounded-lg bg-white border border-gray-200 p-3">
          <p className="text-[11px] text-gray-400 mb-1.5">Download URL</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 bg-gray-100 rounded-md px-3 py-2 text-[12px] text-gray-400 font-mono break-all">
              {tool.official}
            </code>
            <CopyButton text={tool.official} title="Copy" />
          </div>
        </div>
      </section>
    </main>
  );
}
