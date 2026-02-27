'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Footer() {
    const { t } = useLanguage();
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-border py-10 glass-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div>
                        <span className="text-2xl font-black gradient-text">RRGSOFT</span>
                        <p className="text-xs text-muted-foreground mt-1">Full Stack Developer</p>
                    </div>

                    {/* Links */}
                    <nav className="flex items-center gap-6">
                        {[
                            { href: '#home', label: t.footer.links.home },
                            { href: '#about', label: t.footer.links.about },
                            { href: '#projects', label: t.footer.links.projects },
                            { href: '#contact', label: t.footer.links.contact },
                        ].map((link) => (
                            <button
                                key={link.href}
                                onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {link.label}
                            </button>
                        ))}
                    </nav>

                    {/* Copyright */}
                    <p className="text-sm text-muted-foreground">
                        © {year} RRGSOFT. {t.footer.rights} ♥
                    </p>
                </div>
            </div>
        </footer>
    );
}
