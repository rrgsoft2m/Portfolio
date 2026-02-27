'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, FolderKanban, MessageSquare, TrendingUp, Eye } from 'lucide-react';
import { visitorsAPI, projectsAPI, messagesAPI } from '@/lib/api';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar,
} from 'recharts';

interface StatsData {
    totalVisitors: number;
    uniqueVisitors: number;
    dailyStats: { date: string; count: number }[];
    topPages: { page: string; count: number }[];
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [projectsCount, setProjectsCount] = useState(0);
    const [messagesCount, setMessagesCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [visitorRes, projectsRes, messagesRes] = await Promise.all([
                    visitorsAPI.getStats().catch(() => ({ data: null })),
                    projectsAPI.getAll().catch(() => ({ data: [] })),
                    messagesAPI.getAll().catch(() => ({ data: [] })),
                ]);
                if (visitorRes.data) setStats(visitorRes.data);
                setProjectsCount(projectsRes.data?.length || 0);
                setMessagesCount(messagesRes.data?.length || 0);
            } catch (err) {
                console.error('Dashboard fetch error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const statCards = [
        { label: 'Jami tashriflar', value: stats?.totalVisitors || 0, icon: Eye, color: 'from-purple-500 to-indigo-600' },
        { label: 'Unique tashrifchilar', value: stats?.uniqueVisitors || 0, icon: Users, color: 'from-cyan-500 to-blue-600' },
        { label: 'Loyihalar', value: projectsCount, icon: FolderKanban, color: 'from-pink-500 to-rose-600' },
        { label: 'Xabarlar', value: messagesCount, icon: MessageSquare, color: 'from-emerald-500 to-green-600' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="loading-spinner" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Sayt statistikasi va umumiy ko&apos;rinish</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {statCards.map((card, i) => (
                    <motion.div
                        key={card.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card rounded-2xl p-5"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                                <card.icon className="w-5 h-5 text-white" />
                            </div>
                            <TrendingUp className="w-4 h-4 text-green-500" />
                        </div>
                        <p className="text-2xl md:text-3xl font-bold">{card.value}</p>
                        <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* Daily Visitors Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-card rounded-2xl p-6"
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-primary" />
                        Kunlik tashriflar
                    </h3>
                    <div className="h-64">
                        {stats?.dailyStats && stats.dailyStats.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats.dailyStats}>
                                    <defs>
                                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="hsl(262, 83%, 58%)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                                    <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                                    <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '12px',
                                            fontSize: '13px',
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="count"
                                        stroke="hsl(262, 83%, 58%)"
                                        fillOpacity={1}
                                        fill="url(#colorVisitors)"
                                        strokeWidth={2}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                Hozircha ma&apos;lumot yo&apos;q
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Top Pages Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card rounded-2xl p-6"
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <Eye className="w-5 h-5 text-primary" />
                        Eng ko&apos;p ko&apos;rilgan sahifalar
                    </h3>
                    <div className="h-64">
                        {stats?.topPages && stats.topPages.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={stats.topPages} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" className="opacity-20" />
                                    <XAxis type="number" tick={{ fontSize: 11 }} />
                                    <YAxis dataKey="page" type="category" tick={{ fontSize: 11 }} width={100} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'hsl(var(--card))',
                                            border: '1px solid hsl(var(--border))',
                                            borderRadius: '12px',
                                            fontSize: '13px',
                                        }}
                                    />
                                    <Bar dataKey="count" fill="hsl(262, 83%, 58%)" radius={[0, 6, 6, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                                Hozircha ma&apos;lumot yo&apos;q
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
