'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  Zap,
  ScanSearch,
  Globe,
  Sparkles,
} from 'lucide-react';
import CategoryFilter from '@/components/CategoryFilter';
import ToolCard from '@/components/ToolCard';
import DownloadModal from '@/components/DownloadModal';
import { Tool, ToolCategory } from '@/lib/types';
import { getCategories } from '@/lib/tools';
import toolsData from '@/data/tools.json';

interface FeatureItem {
  icon: React.ElementType;
  stat: string;
  label: string;
  title: string;
  desc: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: ShieldCheck,
    stat: '240+',
    label: 'Applications',
    title: 'Verified Links',
    desc: 'Every download URL checked against official sources daily.',
  },
  {
    icon: Zap,
    stat: 'Daily',
    label: 'Link Checks',
    title: 'One-Click Download',
    desc: 'Redirect-free access to official release pages.',
  },
  {
    icon: ScanSearch,
    stat: '100%',
    label: 'Official Sources',
    title: 'Smart Search',
    desc: 'Find apps by name, publisher, platform or tag instantly.',
  },
  {
    icon: Globe,
    stat: 'Free',
    label: 'Always',
    title: 'Multi-Platform',
    desc: 'macOS, Linux, Windows — x86 and arm64 covered.',
  },
];

function useAnimatedValue(target: number, duration = 1500, start = 0) {
  const [value, setValue] = useState(start);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    startTime.current = null;
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const progress = Math.min((timestamp - startTime.current) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(start + (target - start) * ease));
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return value;
}

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const tools = toolsData as Tool[];
  const categories = getCategories();

  const animatedApps = useAnimatedValue(240);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchCategory =
        activeCategory === 'all' || tool.category === activeCategory;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.desc.toLowerCase().includes(q) ||
        tool.publisher.toLowerCase().includes(q) ||
        tool.tags?.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [tools, activeCategory, searchQuery]);

  const handleToolClick = (tool: Tool) => {
    setSelectedTool(tool);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTool(null);
  };

  return (
    <main className="min-h-screen bg-surface overflow-hidden">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-emerald-500/[0.04] rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-emerald-400/[0.03] rounded-full blur-[120px] animate-float" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[400px] bg-emerald-300/[0.02] rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-surface/70 border-b border-[var(--glass-border)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/apple-touch-icon.png"
              alt="AppGater"
              width={28}
              height={28}
              className="rounded-lg"
            />
            <span className="font-display font-semibold text-[15px] tracking-tight">
              AppGater
            </span>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-ink-faint hover:text-ink transition-colors"
            title="GitHub"
          >
            <FontAwesomeIcon icon={faGithub} className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 sm:pt-24 pb-8 px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-emerald-500/10 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[13px] text-ink-muted">
              Daily link verification · 100% official sources
            </span>
          </div>

          {/* Title */}
          <h1
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-ink block">Safe Software</span>
            <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-shift block mt-1">
              Downloads
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-ink-muted text-[15px] sm:text-base max-w-md mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            One-click access to verified, official sources. No redirects. No
            malware. Ever.
          </p>

          {/* Search Box */}
          <div
            className={`max-w-xl mx-auto mb-6 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-emerald-500/10 rounded-xl blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
              <div className="relative flex items-center gap-2 p-1.5 glass rounded-xl border-emerald-500/10 focus-within:border-emerald-500/30 transition-all duration-300">
                <Search className="w-4 h-4 text-ink-faint ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, publisher or tags..."
                  className="flex-1 bg-transparent text-[14px] text-ink placeholder-ink-faint focus:outline-none py-2"
                />
                <button className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg text-[13px] font-medium transition-all duration-200 flex items-center gap-1.5 shrink-0 shadow-[0_0_16px_rgba(16,185,129,0.25)] hover:shadow-[0_0_24px_rgba(16,185,129,0.35)] hover:scale-[1.02] active:scale-[0.98]">
                  Browse
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div
            className={`flex justify-center mb-16 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          {/* Features Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {FEATURES.map((feature, i) => (
              <div
                key={feature.title}
                className="group p-5 glass rounded-xl border-emerald-500/5 hover:border-emerald-500/20 hover:bg-emerald-500/[0.02] transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${500 + i * 80}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-500/15 transition-all duration-300">
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="font-display text-2xl font-bold text-ink">
                    {feature.stat === '240+'
                      ? `${animatedApps}+`
                      : feature.stat}
                  </span>
                </div>
                <div className="text-[11px] uppercase tracking-wider text-ink-faint mb-2">
                  {feature.label}
                </div>
                <h3 className="text-[14px] font-medium text-ink mb-1">
                  {feature.title}
                </h3>
                <p className="text-[12px] text-ink-muted leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tool Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-20">
        {filteredTools.length === 0 ? (
          <div className="text-center py-20 text-ink-faint">
            <p className="text-[15px]">No tools found</p>
            <p className="text-[13px] mt-1">
              Try different keywords or category
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredTools.map((tool, i) => (
              <div
                key={tool.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${Math.min(i * 40, 600)}ms`, animationFillMode: 'both' }}
              >
                <ToolCard tool={tool} onClick={() => handleToolClick(tool)} />
              </div>
            ))}
          </div>
        )}
      </section>

      <DownloadModal
        tool={selectedTool}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        baseUrl={typeof window !== 'undefined' ? window.location.origin : ''}
      />
    </main>
  );
}
