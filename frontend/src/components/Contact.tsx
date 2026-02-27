'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Send, MapPin, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';
import { messagesAPI } from '@/lib/api';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Contact() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');
    const { t } = useLanguage();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        try {
            await messagesAPI.send({ name: formData.name, email: formData.email, message: `[Tel: ${formData.phone}]\n${formData.message}` });
            setStatus('success');
            setFormData({ name: '', phone: '', email: '', message: '' });
            setTimeout(() => setStatus('idle'), 5000);
        } catch (err: unknown) {
            setStatus('error');
            const axiosErr = err as { response?: { data?: { error?: string } } };
            setErrorMsg(axiosErr.response?.data?.error || t.contact.form.error);
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="relative py-20 md:py-32 gradient-bg" ref={ref}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">{t.contact.title}</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">{t.contact.subtitle}</p>
                    <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full mt-4" />
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div>
                            <h3 className="text-2xl font-bold mb-6">{t.contact.infoTitle}</h3>
                            <p className="text-muted-foreground mb-8">{t.contact.infoBio}</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{t.contact.phone}</p>
                                    <p className="font-medium">+998 94 585 14 94</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{t.contact.email}</p>
                                    <p className="font-medium">rrgsoft5@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">{t.contact.location}</p>
                                    <p className="font-medium">{t.contact.locationValue}</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.4 }}
                    >
                        <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-5">
                            {/* Name */}
                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium mb-2">
                                    {t.contact.form.name}
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder={t.contact.form.namePlaceholder}
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="contact-phone" className="block text-sm font-medium mb-2">
                                    {t.contact.form.phone}
                                </label>
                                <input
                                    id="contact-phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder={t.contact.form.phonePlaceholder}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium mb-2">
                                    {t.contact.form.email}
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                    placeholder={t.contact.form.emailPlaceholder}
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium mb-2">
                                    {t.contact.form.message}
                                </label>
                                <textarea
                                    id="contact-message"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                                    placeholder={t.contact.form.messagePlaceholder}
                                />
                            </div>

                            {/* Status */}
                            {status === 'success' && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-500 text-sm">
                                    <CheckCircle className="w-4 h-4" />
                                    {t.contact.form.success}
                                </motion.div>
                            )}
                            {status === 'error' && (
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-500 text-sm">
                                    <AlertCircle className="w-4 h-4" />
                                    {errorMsg}
                                </motion.div>
                            )}

                            <motion.button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg transition-all duration-300 hover:shadow-xl disabled:opacity-50 neon-glow"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {status === 'loading' ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        {t.contact.form.send}
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
