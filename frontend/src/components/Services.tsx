'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Globe, Bot, Brain, Server, Layout } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const icons = [Globe, Code2, Bot, Brain, Server, Layout];

const gradients = [
    'from-purple-500 to-indigo-600',
    'from-cyan-500 to-blue-600',
    'from-pink-500 to-rose-600',
    'from-emerald-500 to-green-600',
    'from-orange-500 to-amber-600',
    'from-violet-500 to-purple-600',
];

export default function Services() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { t } = useLanguage();

    return (
        <section id="services" className="relative py-20 md:py-32 gradient-bg" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">{t.services.title}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t.services.subtitle}</p>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(t.services.items as any).map((service, i: number) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="group glass-card rounded-2xl p-6 magnetic-hover relative overflow-hidden"
                            >
                                {/* Glow */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />

                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                {/* Bottom line */}
                                <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${gradients[i % gradients.length]} w-0 group-hover:w-full transition-all duration-500`} />
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
