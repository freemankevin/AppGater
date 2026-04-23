import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CopyButton from '@/components/CopyButton';
import { getToolById, getTools } from '@/lib/tools';
import { getStatusStyles, isSafeOfficialUrl } from '@/lib/download';

interface ToolPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const tools = await getTools();
  return tools.map((tool) => ({
    id: tool.id,
  }));
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { id } = await params;
  const tool = await getToolById(id);
  
  if (!tool) {
    return {
      title: '工具未找到 - AppGater',
    };
  }

  return {
    title: `${tool.name} - 官方下载 - AppGater`,
    description: tool.desc,
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { id } = await params;
  const tool = await getToolById(id);

  if (!tool) {
    notFound();
  }

  const styles = getStatusStyles(tool.status);
  const isSafe = isSafeOfficialUrl(tool.official);

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl font-bold text-white">
              A
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">AppGater</h1>
              <p className="text-xs text-gray-400">官方工具安全下载站</p>
            </div>
          </Link>
          <Link
            href="/"
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回首页
          </Link>
        </div>
      </header>

      {/* Tool Detail */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-white transition-colors">首页</Link>
            <span>/</span>
            <span className="text-white">{tool.name}</span>
          </nav>

          {/* Tool Info Card */}
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="text-6xl">{tool.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles.bg} ${styles.border} border`}>
                    {styles.text}
                  </span>
                </div>
                <p className="text-gray-400 text-lg">{tool.desc}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-500 text-sm mb-1">文件大小</p>
                <p className="text-white font-semibold">{tool.size}</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-500 text-sm mb-1">分类</p>
                <p className="text-white font-semibold capitalize">{tool.category}</p>
              </div>
              <div className="bg-gray-900/50 rounded-xl p-4">
                <p className="text-gray-500 text-sm mb-1">最后检测</p>
                <p className="text-white font-semibold">
                  {tool.lastChecked
                    ? new Date(tool.lastChecked).toLocaleDateString('zh-CN')
                    : '未检测'}
                </p>
              </div>
            </div>

            {/* Security Notice */}
            <div className={`p-4 rounded-xl mb-6 ${isSafe ? 'bg-green-500/10 border border-green-500/30' : 'bg-yellow-500/10 border border-yellow-500/30'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSafe ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {isSafe ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-white">安全验证</p>
                  <p className={`text-sm ${isSafe ? 'text-green-400' : 'text-yellow-400'}`}>
                    {isSafe
                      ? '该工具链接指向官方域名，已通过安全验证'
                      : '请仔细验证链接安全性后再下载'}
                  </p>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={`/api/download?id=${tool.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                立即下载（代理加速）
              </a>
              <a
                href={tool.official}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                访问官方页面
              </a>
            </div>
          </div>

          {/* Official URL Display */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-2">官方下载地址</p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-900 rounded-lg px-4 py-3 text-sm text-gray-300 font-mono break-all">
                {tool.official}
              </code>
              <CopyButton text={tool.official} title="复制链接" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 mt-auto">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>AppGater - 官方工具聚合平台</p>
          <p className="mt-2">所有文件均来自官方源，本站仅提供导航服务</p>
        </div>
      </footer>
    </main>
  );
}
