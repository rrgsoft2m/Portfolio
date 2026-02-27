'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Locale } from '@/lib/i18n';

const localeLabels: Record<Locale, string> = {
    uz: "O'Z",
    ru: 'RU',
    en: 'EN',
};

const localeFlags: Record<Locale, string> = {
    uz: '🇺🇿',
    ru: '🇷🇺',
    en: '🇬🇧',
};

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { locale, setLocale, t } = useLanguage();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#home', label: t.nav.home },
        { href: '#about', label: t.nav.about },
        { href: '#services', label: t.nav.services },
        { href: '#projects', label: t.nav.projects },
        { href: '#contact', label: t.nav.contact },
    ];

    const handleNavClick = (href: string) => {
        setMobileOpen(false);
        setLangOpen(false);
        // Small delay so mobile menu animation finishes before scroll
        setTimeout(() => {
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    };

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass-card shadow-lg' : 'bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <motion.button
                        onClick={() => handleNavClick('#home')}
                        className="text-2xl md:text-3xl font-black gradient-text"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        RRGSOFT
                    </motion.button>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.button
                                key={link.href}
                                onClick={() => handleNavClick(link.href)}
                                className="px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {link.label}
                            </motion.button>
                        ))}

                        {/* Language Switcher */}
                        <div className="relative ml-1">
                            <motion.button
                                onClick={() => setLangOpen(!langOpen)}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors text-sm font-medium"
                                whileTap={{ scale: 0.95 }}
                            >
                                <Globe className="w-4 h-4" />
                                <span>{localeFlags[locale]} {localeLabels[locale]}</span>
                            </motion.button>
                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 top-full mt-2 glass-card rounded-xl overflow-hidden shadow-xl min-w-[120px]"
                                    >
                                        {(Object.entries(localeLabels) as [Locale, string][]).map(([loc, label]) => (
                                            <button
                                                key={loc}
                                                onClick={() => { setLocale(loc); setLangOpen(false); }}
                                                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-accent ${locale === loc ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                                            >
                                                <span>{localeFlags[loc]}</span>
                                                <span>{label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Theme toggle */}
                        {mounted && (
                            <motion.button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="ml-1 p-2 rounded-lg bg-accent hover:bg-accent/80 transition-colors"
                                whileHover={{ rotate: 180 }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-indigo-600" />
                                )}
                            </motion.button>
                        )}
                    </div>

                    {/* Mobile Header Right */}
                    <div className="flex md:hidden items-center gap-1">
                        {/* Mobile Lang Switcher */}
                        <div className="relative">
                            <button
                                onClick={() => setLangOpen(!langOpen)}
                                className="p-2 rounded-lg bg-accent text-sm font-bold"
                            >
                                {localeFlags[locale]}
                            </button>
                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 8 }}
                                        className="absolute right-0 top-full mt-2 glass-card rounded-xl overflow-hidden shadow-xl min-w-[110px] z-50"
                                    >
                                        {(Object.entries(localeLabels) as [Locale, string][]).map(([loc, label]) => (
                                            <button
                                                key={loc}
                                                onClick={() => { setLocale(loc); setLangOpen(false); }}
                                                className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors hover:bg-accent ${locale === loc ? 'text-primary font-semibold' : 'text-muted-foreground'}`}
                                            >
                                                <span>{localeFlags[loc]}</span>
                                                <span>{label}</span>
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {mounted && (
                            <motion.button
                                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                className="p-2 rounded-lg bg-accent"
                                whileTap={{ scale: 0.9 }}
                            >
                                {theme === 'dark' ? (
                                    <Sun className="w-5 h-5 text-yellow-400" />
                                ) : (
                                    <Moon className="w-5 h-5 text-indigo-600" />
                                )}
                            </motion.button>
                        )}
                        <motion.button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg bg-accent"
                            whileTap={{ scale: 0.9 }}
                        >
                            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden glass-card border-t border-border overflow-hidden"
                    >
                        <div className="px-4 py-4 space-y-1">
                            {navLinks.map((link, i) => (
                                <motion.button
                                    key={link.href}
                                    onClick={() => handleNavClick(link.href)}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="block w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                                >
                                    {link.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
