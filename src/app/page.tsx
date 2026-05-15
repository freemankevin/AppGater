'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, LayoutGrid, Sparkles } from 'lucide-react';
import { useI18n } from '@/components/I18nProvider';
import ParticleNetwork from '@/components/ParticleNetwork';
import FeatureCards from '@/components/FeatureCards';
import Header from '@/components/Header';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const { locale, t, setLocale } = useI18n();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="h-screen bg-[#f8f9fa] relative overflow-hidden flex flex-col">
      <ParticleNetwork />

      <Header />

      {/* Hero */}
      <section className="relative z-10 flex-1 flex flex-col justify-center items-center px-4">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-200 bg-emerald-50 mb-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[13px] text-emerald-700">{t.badge}</span>
          </div>

          {/* Title */}
          <h1
            className={`font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight mb-3 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-gray-900">{t.title1.split(' ')[0]} </span>
            <span className="text-emerald-500">{t.title1.split(' ')[1]}</span>
          </h1>

          {/* Tagline */}
          <p
            className={`font-display text-lg sm:text-xl text-gray-400 font-normal tracking-wide mb-10 transition-all duration-700 delay-150 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {t.tagline}
          </p>

          {/* Buttons */}
          <div
            className={`flex items-center justify-center gap-3 mb-12 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <a
              href="/tools"
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-[15px] font-medium transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md"
            >
              {t.btnPrimary}
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/tools"
              className="px-6 py-3 border border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 rounded-lg text-[15px] font-medium transition-all duration-200 bg-white flex items-center gap-2"
            >
              <LayoutGrid className="w-4 h-4" />
              {t.btnSecondary}
            </a>
          </div>

          {/* Feature bar */}
          <div
            className={`transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <FeatureCards />
          </div>
        </div>
      </section>
    </main>
  );
}
