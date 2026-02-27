'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Eye, Clock } from 'lucide-react';
import { messagesAPI } from '@/lib/api';

interface Message {
    id: string;
    name: string;
    email: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export default function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

    const fetchMessages = async () => {
        try {
            const res = await messagesAPI.getAll();
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const handleRead = async (msg: Message) => {
        setSelectedMessage(msg);
        if (!msg.read) {
            try {
                await messagesAPI.markRead(msg.id);
                setMessages((prev) =>
                    prev.map((m) => (m.id === msg.id ? { ...m, read: true } : m))
                );
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Rostdan o'chirmoqchimisiz?")) return;
        try {
            await messagesAPI.delete(id);
            if (selectedMessage?.id === id) setSelectedMessage(null);
            fetchMessages();
        } catch (err) {
            console.error(err);
        }
    };

    const unreadCount = messages.filter((m) => !m.read).length;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="loading-spinner" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">Xabarlar</h1>
                <p className="text-muted-foreground">
                    {messages.length} xabar, {unreadCount} o&apos;qilmagan
                </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-6">
                {/* Messages List */}
                <div className="lg:col-span-2 glass-card rounded-2xl overflow-hidden">
                    <div className="max-h-[70vh] overflow-y-auto divide-y divide-border">
                        {messages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                                <Mail className="w-10 h-10 mb-3 opacity-50" />
                                <p className="text-sm">Hozircha xabar yo&apos;q</p>
                            </div>
                        ) : (
                            messages.map((msg, i) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.03 }}
                                    onClick={() => handleRead(msg)}
                                    className={`p-4 cursor-pointer transition-all hover:bg-accent/50 ${selectedMessage?.id === msg.id ? 'bg-accent' : ''
                                        } ${!msg.read ? 'border-l-2 border-l-primary' : ''}`}
                                >
                                    <div className="flex items-start justify-between gap-2 mb-1">
                                        <p className={`text-sm ${!msg.read ? 'font-semibold' : 'font-medium'} truncate`}>
                                            {msg.name}
                                        </p>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                            {new Date(msg.createdAt).toLocaleDateString('uz-UZ')}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{msg.email}</p>
                                    <p className="text-xs text-muted-foreground truncate mt-1">{msg.message}</p>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Message Detail */}
                <div className="lg:col-span-3">
                    {selectedMessage ? (
                        <motion.div
                            key={selectedMessage.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="glass-card rounded-2xl p-6"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-bold">{selectedMessage.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(selectedMessage.createdAt).toLocaleString('uz-UZ')}
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(selectedMessage.id)}
                                    className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="p-4 rounded-xl bg-secondary/30 text-sm leading-relaxed whitespace-pre-wrap">
                                {selectedMessage.message}
                            </div>
                        </motion.div>
                    ) : (
                        <div className="glass-card rounded-2xl p-12 flex flex-col items-center justify-center text-muted-foreground">
                            <Eye className="w-10 h-10 mb-3 opacity-50" />
                            <p className="text-sm">Xabarni tanlang</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
