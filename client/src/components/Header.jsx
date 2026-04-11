import React, { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Premium Header Component
 * 
 * Sticky header with:
 * - Glassmorphism design
 * - Advanced animations
 * - Scroll detection
 * - Premium branding
 */
const Header = ({ allBooksCount }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
            className={`sticky top-0 z-40 transition-all duration-500 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-xl shadow-2xl' : 'bg-gradient-to-b from-slate-900 to-slate-900/0'
                } border-b border-white/10`}
        >
            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    {/* Logo & Title */}
                    <motion.div
                        className="flex items-center gap-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Logo Animation */}
                        <motion.div
                            animate={{
                                rotate: 360,
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                rotate: { duration: 30, repeat: Infinity, ease: 'linear' },
                                scale: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                            }}
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-2xl shadow-lg"
                        >
                            📚
                        </motion.div>

                        {/* Text */}
                        <div>
                            <h1 className="text-3xl font-black text-white tracking-tight">BookPulse</h1>
                            <p className="text-indigo-300 text-sm font-medium">Bestseller Intelligence</p>
                        </div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="hidden md:flex items-center gap-6"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition-all"
                        >
                            <p className="text-gray-300 text-xs font-semibold">TOTAL BOOKS</p>
                            <motion.p
                                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.4, type: 'spring' }}
                            >
                                {allBooksCount.toLocaleString()}
                            </motion.p>
                        </motion.div>

                        {/* Live Indicator */}
                        <motion.div
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500/20 border border-green-500/30"
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <motion.span
                                className="w-2 h-2 bg-green-400 rounded-full"
                                animate={{ opacity: [1, 0.5, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <p className="text-green-300 text-xs font-semibold">LIVE</p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Gradient Divider */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent origin-left"
            />
        </motion.header>
    );
};

export default Header;
