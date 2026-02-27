'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Briefcase, Mail } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
    const { t } = useLanguage();
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentText, setCurrentText] = useState('');

    const typingTexts = t.hero.typingTexts as readonly string[];

    useEffect(() => {
        const fullText = typingTexts[textIndex % typingTexts.length];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setCurrentText(fullText.substring(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
                if (charIndex === fullText.length) {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                setCurrentText(fullText.substring(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
                if (charIndex === 0) {
                    setIsDeleting(false);
                    setTextIndex((prev) => (prev + 1) % typingTexts.length);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, typingTexts]);

    // Reset typing when language changes
    useEffect(() => {
        setTextIndex(0);
        setCharIndex(0);
        setIsDeleting(false);
        setCurrentText('');
    }, [t]);

    const scrollTo = (id: string) => {
        document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/30 rounded-full blur-[120px] animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-[100px] animate-float" style={{ animationDelay: '4s' }} />

            <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-muted-foreground mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    {t.hero.badge}
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-4"
                >
                    <span className="gradient-text">RRGSOFT</span>
                </motion.h1>

                {/* Typing Effect */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-xl sm:text-2xl md:text-3xl font-light text-muted-foreground mb-8 h-10"
                >
                    <span className="text-foreground font-medium">{currentText}</span>
                    <span className="animate-pulse text-primary">|</span>
                </motion.div>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.6 }}
                    className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {t.hero.description}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <motion.button
                        onClick={() => scrollTo('#projects')}
                        className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl neon-glow"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Briefcase className="w-5 h-5" />
                        {t.hero.btnProjects}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    </motion.button>

                    <motion.button
                        onClick={() => scrollTo('#contact')}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl glass font-semibold text-lg hover:bg-accent transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Mail className="w-5 h-5" />
                        {t.hero.btnContact}
                    </motion.button>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.button
                onClick={() => scrollTo('#about')}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                <ArrowDown className="w-6 h-6" />
            </motion.button>
        </section>
    );
}
