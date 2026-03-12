'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { translations, type Locale } from './translations';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const SUPPORTED_LOCALES: Locale[] = ['ko', 'en', 'ja', 'zh'];
const STORAGE_KEY = 'media-converter-locale';

function detectLocale(): Locale {
  // 1. localStorage에서 저장된 설정 확인
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED_LOCALES.includes(saved as Locale)) {
      return saved as Locale;
    }
  }

  // 2. 브라우저 언어 감지
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language || '';
    const prefix = lang.slice(0, 2).toLowerCase();

    if (prefix === 'ko') return 'ko';
    if (prefix === 'ja') return 'ja';
    if (prefix === 'zh') return 'zh';
  }

  // 3. 기본값: 영어
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setLocaleState(detectLocale());
    setMounted(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string>): string => {
      let text = translations[locale]?.[key] || translations['en']?.[key] || key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, v);
        });
      }
      return text;
    },
    [locale]
  );

  // SSR hydration mismatch 방지: 마운트 전에는 en으로 렌더링
  if (!mounted) {
    return (
      <I18nContext.Provider
        value={{
          locale: 'en',
          setLocale,
          t: (key: string, vars?: Record<string, string>) => {
            let text = translations['en']?.[key] || key;
            if (vars) {
              Object.entries(vars).forEach(([k, v]) => {
                text = text.replace(`{${k}}`, v);
              });
            }
            return text;
          },
        }}
      >
        {children}
      </I18nContext.Provider>
    );
  }

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

