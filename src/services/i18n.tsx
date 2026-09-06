import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { LanguageCode, LanguageConfig, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, getLanguageConfig } from '../config/languages';
import { LOCALES, TranslationSchema } from '../locales';

interface LanguageContextType {
  currentLanguage: LanguageCode;
  languageConfig: LanguageConfig;
  setLanguage: (lang: LanguageCode) => void;
  t: (path: string, params?: Record<string, string | number>) => string;
  strings: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'kaarigar_language_preference';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguageState] = useState<LanguageCode>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
      if (stored && SUPPORTED_LANGUAGES.some((l) => l.id === stored)) {
        return stored;
      }
    } catch {
      // Ignore localStorage error (e.g. private mode)
    }
    return DEFAULT_LANGUAGE;
  });

  const setLanguage = (lang: LanguageCode) => {
    setCurrentLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore
    }
  };

  const languageConfig = useMemo(() => getLanguageConfig(currentLanguage), [currentLanguage]);

  const strings = useMemo(() => {
    return LOCALES[currentLanguage] || LOCALES[DEFAULT_LANGUAGE] || LOCALES.en;
  }, [currentLanguage]);

  const t = useMemo(() => {
    return (path: string, params?: Record<string, string | number>): string => {
      const parts = path.split('.');
      let current: any = strings;
      let fallback: any = LOCALES.en;

      for (const part of parts) {
        if (current && typeof current === 'object' && part in current) {
          current = current[part];
        } else {
          current = undefined;
        }

        if (fallback && typeof fallback === 'object' && part in fallback) {
          fallback = fallback[part];
        } else {
          fallback = undefined;
        }
      }

      let result = typeof current === 'string' ? current : typeof fallback === 'string' ? fallback : path;

      if (params) {
        Object.entries(params).forEach(([key, val]) => {
          result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(val));
        });
      }

      return result;
    };
  }, [strings]);

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        languageConfig,
        setLanguage,
        t,
        strings,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  return useLanguage();
};
