'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Locale } from '@/lib/i18n';

interface LanguageContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: typeof translations.uz;
}

const LanguageContext = createContext<LanguageContextType>({
    locale: 'uz',
    setLocale: () => { },
    t: translations.uz,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>('uz');

    useEffect(() => {
        const saved = localStorage.getItem('rrgsoft_locale') as Locale | null;
        if (saved && ['uz', 'ru', 'en'].includes(saved)) {
            setLocaleState(saved);
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('rrgsoft_locale', newLocale);
    };

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t: (translations as any)[locale] }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
