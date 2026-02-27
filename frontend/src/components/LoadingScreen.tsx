'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
                >
                    <div className="text-center">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <motion.h1
                                className="text-5xl md:text-7xl font-black gradient-text"
                                animate={{
                                    textShadow: [
                                        '0 0 10px rgba(139, 92, 246, 0.5)',
                                        '0 0 30px rgba(139, 92, 246, 0.8)',
                                        '0 0 10px rgba(139, 92, 246, 0.5)',
                                    ],
                                }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            >
                                RRGSOFT
                            </motion.h1>
                        </motion.div>

                        {/* Loading bar */}
                        <div className="w-48 h-1 bg-secondary rounded-full overflow-hidden mx-auto">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 rounded-full"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.8, ease: 'easeInOut' }}
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
