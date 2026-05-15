'use client';

import { useEffect, useRef, useState } from 'react';
import { ShieldCheck, Zap, ScanSearch, Globe } from 'lucide-react';
import { useI18n } from '@/components/I18nProvider';

const FEATURES = [
  { icon: ShieldCheck, key: 'featureVerified' as const },
  { icon: Zap, key: 'featureDownload' as const },
  { icon: ScanSearch, key: 'featureSearch' as const },
  { icon: Globe, key: 'featurePlatform' as const },
];

export default function FeatureCards() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const titleKey = `${feature.key}Title` as keyof typeof t;
            return (
              <div
                key={feature.key}
                className={`flex items-center gap-2 transition-all duration-700 ${
                  visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <Icon className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[13px] text-gray-500">
                  {t[titleKey] as string}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
