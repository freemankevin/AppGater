'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation, Locale, Translations } from '@/lib/i18n';

interface I18nContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (l: Locale) => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: getTranslation('en'),
  setLocale: () => {},
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem('axis-locale') as Locale | null;
    if (saved === 'zh' || saved === 'en') {
      setLocaleState(saved);
    }
  }, []);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    localStorage.setItem('axis-locale', l);
  };

  const t = getTranslation(locale);

  return (
    <I18nContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
