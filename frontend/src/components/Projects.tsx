'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { projectsAPI } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';
import { Locale } from '@/lib/i18n';

interface Project {
    id: string;
    title: string;
    description: string | null;
    image: string | null;
    link: string | null;
    category: string | null;
    featured: boolean;
    // multilingual fields (optional, from DB)
    titleRu?: string | null;
    titleEn?: string | null;
    descriptionRu?: string | null;
    descriptionEn?: string | null;
}

// Fallback projects with 3-language support
const fallbackProjects: Project[] = [
    {
        id: '1',
        title: "O'ynab O'rganamiz",
        titleRu: "Играя Учимся",
        titleEn: "Learn by Playing",
        description: "Bolalar uchun interaktiv o'quv platformasi. O'yin orqali matematika va mantiqiy fikrlash.",
        descriptionRu: "Интерактивная учебная платформа для детей. Математика и логика через игру.",
        descriptionEn: "Interactive learning platform for kids. Math and logic through fun games.",
        image: null, link: 'https://rrgsoft.uz', category: 'Web App', featured: true,
    },
    {
        id: '2',
        title: 'Sakra Bolakay',
        titleRu: 'Sakra Bolakay',
        titleEn: 'Sakra Bolakay',
        description: "Bolalar uchun mo'ljallangan o'yinchoq va rivojlantiruvchi o'yinlar platformasi.",
        descriptionRu: "Платформа развивающих игр и игрушек для детей.",
        descriptionEn: "A toy and educational games platform designed for children.",
        image: null, link: 'https://rrgsoft.uz', category: 'Mobile App', featured: true,
    },
    {
        id: '3',
        title: 'Delphi E.Darslik',
        titleRu: 'Delphi Э.Учебник',
        titleEn: 'Delphi E.Textbook',
        description: "Delphi dasturlash tili bo'yicha elektron darslik.",
        descriptionRu: "Электронный учебник по языку программирования Delphi.",
        descriptionEn: "An electronic textbook for the Delphi programming language.",
        image: null, link: 'https://rrgsoft.uz', category: 'Education', featured: true,
    },
    {
        id: '4',
        title: 'rrgsoft.uz',
        titleRu: 'rrgsoft.uz',
        titleEn: 'rrgsoft.uz',
        description: "Shaxsiy portfolio va xizmatlar veb sayti.",
        descriptionRu: "Персональный портфолио и веб-сайт услуг.",
        descriptionEn: "Personal portfolio and services website.",
        image: null, link: 'https://rrgsoft.uz', category: 'Website', featured: true,
    },
    {
        id: '5',
        title: 'boyavut.uz',
        titleRu: 'boyavut.uz',
        titleEn: 'boyavut.uz',
        description: "Boyavut tumani uchun rasmiy veb portal.",
        descriptionRu: "Официальный веб-портал Баяутского района.",
        descriptionEn: "Official web portal for Boyovut district.",
        image: null, link: 'https://boyavut.uz', category: 'Website', featured: true,
    },
    {
        id: '6',
        title: "Ingliz tilini o'rganamiz",
        titleRu: "Изучаем Английский",
        titleEn: "Learn English",
        description: "Ingliz tilini o'rganish uchun interaktiv dastur.",
        descriptionRu: "Интерактивная программа для изучения английского языка.",
        descriptionEn: "An interactive app to learn the English language.",
        image: null, link: 'https://rrgsoft.uz', category: 'Education', featured: true,
    },
];

const categoryColors: Record<string, string> = {
    'Web App': 'from-purple-500 to-indigo-500',
    'Mobile App': 'from-pink-500 to-rose-500',
    'Education': 'from-cyan-500 to-blue-500',
    'Website': 'from-emerald-500 to-green-500',
};

// Category labels in 3 languages
const categoryLabels: Record<Locale, Record<string, string>> = {
    uz: {
        'Web App': 'Veb Ilova',
        'Mobile App': 'Mobil Ilova',
        'Education': "Ta'lim",
        'Website': 'Veb Sayt',
    },
    ru: {
        'Web App': 'Веб-приложение',
        'Mobile App': 'Мобильное приложение',
        'Education': 'Образование',
        'Website': 'Веб-сайт',
    },
    en: {
        'Web App': 'Web App',
        'Mobile App': 'Mobile App',
        'Education': 'Education',
        'Website': 'Website',
    },
};

// Helper to get localized field from a project
function getLocalizedField(project: Project, field: 'title' | 'description', locale: Locale): string {
    if (locale === 'ru') {
        const val = field === 'title' ? project.titleRu : project.descriptionRu;
        if (val) return val;
    }
    if (locale === 'en') {
        const val = field === 'title' ? project.titleEn : project.descriptionEn;
        if (val) return val;
    }
    return (field === 'title' ? project.title : project.description) ?? '';
}

export default function Projects() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [projects, setProjects] = useState<Project[]>(fallbackProjects);
    const { t, locale } = useLanguage();

    useEffect(() => {
        projectsAPI.getAll().then((res) => {
            if (res.data && res.data.length > 0) {
                setProjects(res.data);
            }
        }).catch(() => { });
    }, []);

    return (
        <section id="projects" className="relative py-20 md:py-32" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">{t.projects.title}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        {t.projects.subtitle}
                    </p>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
                </motion.div>

                {/* Projects Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {projects.filter(p => p.featured).map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="group relative glass-card rounded-2xl overflow-hidden magnetic-hover"
                        >
                            {/* Image / Gradient Placeholder */}
                            <div className="relative h-48 overflow-hidden">
                                {project.image ? (
                                    <img
                                        src={project.image.startsWith('http') ? project.image : `${process.env.NEXT_PUBLIC_API_URL}${project.image}`}
                                        alt={getLocalizedField(project, 'title', locale)}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className={`w-full h-full bg-gradient-to-br ${categoryColors[project.category || 'Website'] || 'from-purple-500 to-indigo-500'} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
                                        <span className="text-4xl font-black text-white/80">
                                            {getLocalizedField(project, 'title', locale).charAt(0)}
                                        </span>
                                    </div>
                                )}
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                {/* Category Badge */}
                                {project.category && (
                                    <div className="absolute top-3 right-3">
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-black/50 backdrop-blur-sm text-white">
                                            {categoryLabels[locale][project.category] || project.category}
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                                    {getLocalizedField(project, 'title', locale)}
                                </h3>
                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                    {getLocalizedField(project, 'description', locale)}
                                </p>

                                {/* Actions */}
                                {project.link && (
                                    <motion.a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                        whileHover={{ x: 5 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        {t.projects.visitSite}
                                    </motion.a>
                                )}
                            </div>

                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ boxShadow: 'inset 0 0 30px rgba(139, 92, 246, 0.1)' }}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
