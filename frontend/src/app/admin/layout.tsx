'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard, FolderKanban, FileText, MessageSquare,
    LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const sidebarLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Loyihalar', icon: FolderKanban },
    { href: '/admin/content', label: 'Kontent', icon: FileText },
    { href: '/admin/messages', label: 'Xabarlar', icon: MessageSquare },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const token = localStorage.getItem('rrgsoft_token');
        const userData = localStorage.getItem('rrgsoft_user');
        if (!token) {
            router.push('/admin/login');
            return;
        }
        if (userData) setUser(JSON.parse(userData));
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('rrgsoft_token');
        localStorage.removeItem('rrgsoft_user');
        router.push('/admin/login');
    };

    // Don't render layout for login page
    if (pathname === '/admin/login') return children;

    return (
        <div className="min-h-screen bg-background flex">
            {/* Sidebar (desktop) */}
            <aside className="hidden lg:flex lg:flex-col w-64 border-r border-border glass-card">
                {/* Logo */}
                <div className="p-6 border-b border-border">
                    <Link href="/admin/dashboard" className="text-2xl font-black gradient-text">
                        RRGSOFT
                    </Link>
                    <p className="text-xs text-muted-foreground mt-1">Admin Panel</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-4 space-y-1">
                    {sidebarLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive
                                        ? 'bg-primary text-primary-foreground shadow-lg'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                    }`}
                            >
                                <link.icon className="w-5 h-5" />
                                {link.label}
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* User */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 px-4 py-3">
                        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                            <span className="text-sm font-bold text-primary">
                                {user?.name?.charAt(0) || 'A'}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                            title="Chiqish"
                        >
                            <LogOut className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-50 glass-card border-b border-border">
                <div className="flex items-center justify-between px-4 h-14">
                    <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg hover:bg-accent">
                        <Menu className="w-5 h-5" />
                    </button>
                    <span className="font-bold gradient-text">RRGSOFT Admin</span>
                    <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-accent text-muted-foreground">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
                        />
                        <motion.aside
                            initial={{ x: -280 }}
                            animate={{ x: 0 }}
                            exit={{ x: -280 }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="lg:hidden fixed top-0 left-0 bottom-0 z-50 w-64 glass-card border-r border-border"
                        >
                            <div className="flex items-center justify-between p-6 border-b border-border">
                                <span className="text-xl font-black gradient-text">RRGSOFT</span>
                                <button onClick={() => setSidebarOpen(false)} className="p-1">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <nav className="p-4 space-y-1">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                                }`}
                                        >
                                            <link.icon className="w-5 h-5" />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 lg:overflow-y-auto">
                <div className="pt-14 lg:pt-0 p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
