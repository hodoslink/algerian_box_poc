import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'en' | 'fr';

interface LanguageContextType {
  lang: Lang;
  toggleLang: () => void;
  t: (en: string, fr: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('en');

  const toggleLang = () => setLang(l => (l === 'en' ? 'fr' : 'en'));
  const t = (en: string, fr: string) => (lang === 'en' ? en : fr);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
