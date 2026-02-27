'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Save, CheckCircle, AlertCircle } from 'lucide-react';
import { siteContentAPI } from '@/lib/api';

interface ContentItem {
    value: string;
    type: string;
    id: string;
}

export default function AdminContent() {
    const [content, setContent] = useState<Record<string, ContentItem>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    useEffect(() => {
        siteContentAPI.getAll().then((res) => {
            setContent(res.data);
            setLoading(false);
        }).catch(() => setLoading(false));
    }, []);

    const updateValue = (key: string, value: string) => {
        setContent((prev) => ({
            ...prev,
            [key]: { ...prev[key], value },
        }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates: Record<string, string> = {};
            Object.entries(content).forEach(([key, item]) => {
                updates[key] = item.value;
            });
            await siteContentAPI.update(updates);
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus('idle'), 3000);
        } finally {
            setSaving(false);
        }
    };

    const groupedContent = {
        'Hero Section': Object.entries(content).filter(([k]) => k.startsWith('hero_')),
        'Men Haqimda': Object.entries(content).filter(([k]) => k.startsWith('about_')),
        "Bog'lanish": Object.entries(content).filter(([k]) => ['phone', 'email'].includes(k)),
        'SEO': Object.entries(content).filter(([k]) => k.startsWith('seo_')),
        'Ko\'nikmalar': Object.entries(content).filter(([k]) => k.startsWith('skill_')),
        'Xizmatlar': Object.entries(content).filter(([k]) => k.startsWith('service_')),
    };

    const formatLabel = (key: string) => {
        return key
            .replace(/^(hero_|about_|seo_|skill_|service_)/, '')
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (c) => c.toUpperCase());
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="loading-spinner" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Sayt Kontenti</h1>
                    <p className="text-muted-foreground">Barcha textlarni boshqaring</p>
                </div>
                <div className="flex items-center gap-3">
                    {status === 'success' && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-green-500 text-sm">
                            <CheckCircle className="w-4 h-4" /> Saqlandi
                        </motion.span>
                    )}
                    {status === 'error' && (
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-red-500 text-sm">
                            <AlertCircle className="w-4 h-4" /> Xatolik
                        </motion.span>
                    )}
                    <motion.button
                        onClick={handleSave}
                        disabled={saving}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground font-medium text-sm disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {saving ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        Saqlash
                    </motion.button>
                </div>
            </div>

            {Object.entries(groupedContent).map(([group, items]) => (
                items.length > 0 && (
                    <motion.div
                        key={group}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="glass-card rounded-2xl p-6"
                    >
                        <h3 className="text-lg font-semibold mb-4">{group}</h3>
                        <div className="space-y-4">
                            {items.map(([key, item]) => (
                                <div key={key}>
                                    <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
                                        {formatLabel(key)}
                                    </label>
                                    {item.value.length > 80 ? (
                                        <textarea
                                            value={item.value}
                                            onChange={(e) => updateValue(key, e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all text-sm resize-none"
                                        />
                                    ) : (
                                        <input
                                            value={item.value}
                                            onChange={(e) => updateValue(key, e.target.value)}
                                            className="w-full px-4 py-2.5 rounded-xl bg-secondary/50 border border-border focus:border-primary outline-none transition-all text-sm"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )
            ))}
        </div>
    );
}
