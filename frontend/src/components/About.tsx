'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Briefcase, Trophy } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const skills = [
    { name: 'Python & Django', level: 90, color: 'from-green-400 to-emerald-600' },
    { name: 'Vibe Coding', level: 95, color: 'from-purple-400 to-violet-600' },
    { name: 'HTML & CSS', level: 95, color: 'from-orange-400 to-red-500' },
    { name: 'JavaScript', level: 70, color: 'from-yellow-400 to-amber-600' },
    { name: 'React & Node.js', level: 70, color: 'from-cyan-400 to-blue-600' },
    { name: 'C++ / C#', level: 60, color: 'from-pink-400 to-rose-600' },
    { name: 'PHP & Laravel', level: 60, color: 'from-indigo-400 to-purple-600' },
    { name: 'WordPress', level: 60, color: 'from-teal-400 to-cyan-600' },
];

export default function About() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const { t } = useLanguage();

    const stats = [
        { icon: Briefcase, label: t.about.stats.experience, value: '5+' },
        { icon: Users, label: t.about.stats.clients, value: '450+' },
        { icon: Award, label: t.about.stats.projects, value: '190+' },
        { icon: Trophy, label: t.about.stats.awards, value: '10+' },
    ];

    return (
        <section id="about" className="relative py-20 md:py-32" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">{t.about.title}</span>
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full" />
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="glass-card rounded-2xl p-6 text-center magnetic-hover"
                        >
                            <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                            <div className="text-3xl md:text-4xl font-black gradient-text mb-1">{stat.value}</div>
                            <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* About Content */}
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.3 }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold mb-6">
                            <span className="text-primary">{t.about.name}</span>
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-6 text-base md:text-lg">
                            {t.about.bio1}
                        </p>
                        <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                            {t.about.bio2}
                        </p>
                    </motion.div>

                    {/* Skills */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.5 }}
                        className="space-y-4"
                    >
                        {skills.map((skill, i) => (
                            <div key={skill.name}>
                                <div className="flex justify-between mb-1.5">
                                    <span className="text-sm font-medium">{skill.name}</span>
                                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                                </div>
                                <div className="h-3 rounded-full bg-secondary overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={isInView ? { width: `${skill.level}%` } : {}}
                                        transition={{ duration: 1.2, delay: 0.8 + i * 0.1, ease: 'easeOut' }}
                                        className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[gradient-x_3s_ease_infinite] bg-[length:200%_100%]" />
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
