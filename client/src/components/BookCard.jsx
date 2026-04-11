import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Premium BookCard Component
 * 
 * Hyper-interactive book card with:
 * - 3D tilt effect based on mouse position
 * - Glassmorphism design
 * - Advanced hover animations
 * - Staggered element animations
 * - Smooth transitions and micro-interactions
 */
const BookCard = ({ book }) => {
    const cardRef = useRef(null);
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Handle 3D tilt effect
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rotateXValue = (mouseY - centerY) * 0.05;
        const rotateYValue = (centerX - mouseX) * 0.05;

        setRotateX(rotateXValue);
        setRotateY(rotateYValue);
    };

    const handleMouseLeave = () => {
        setRotateX(0);
        setRotateY(0);
        setIsHovered(false);
    };

    // Star rating
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<span key={i} className="text-amber-300 drop-shadow-lg text-lg">★</span>);
            } else if (i === fullStars && hasHalfStar) {
                stars.push(<span key={i} className="text-amber-300 drop-shadow-lg text-lg">½</span>);
            } else {
                stars.push(<span key={i} className="text-gray-500 text-lg">★</span>);
            }
        }
        return stars;
    };

    const getRatingGradient = (rating) => {
        if (rating >= 4.5) return 'from-emerald-500 to-teal-600';
        if (rating >= 4) return 'from-blue-500 to-cyan-600';
        if (rating >= 3) return 'from-amber-500 to-orange-600';
        return 'from-gray-500 to-gray-600';
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
            className="h-full perspective"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={() => setIsHovered(true)}
            style={{
                transformStyle: 'preserve-3d',
                transform: isHovered
                    ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
                    : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
            }}
        >
            <motion.div
                className="relative h-full rounded-3xl overflow-hidden group"
                animate={{
                    boxShadow: isHovered
                        ? '0 20px 60px rgba(99, 102, 241, 0.4), inset 0 0 60px rgba(99, 102, 241, 0.1)'
                        : '0 10px 40px rgba(0, 0, 0, 0.2)',
                }}
                whileHover={{ y: -12 }}
                transition={{ duration: 0.3 }}
            >
                {/* Premium Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-slate-900/20 backdrop-blur-xl" />
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/0 to-slate-900/0 group-hover:from-indigo-500/10 group-hover:via-purple-500/10 group-hover:to-slate-900/20 transition-all duration-500" />

                {/* Glow Background */}
                <motion.div
                    animate={{ opacity: isHovered ? 0.3 : 0.1 }}
                    className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"
                />

                {/* Content Container */}
                <div className="relative z-10 h-full flex flex-col bg-gradient-to-br from-slate-900/50 via-slate-900/40 to-slate-900/60 backdrop-blur-xl border border-white/20 hover:border-white/40 transition-all">
                    {/* Genre Badge Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="px-4 py-3 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-b border-white/10"
                    >
                        <motion.span
                            whileHover={{ scale: 1.1, rotate: 2 }}
                            className="inline-block bg-gradient-to-r from-indigo-400 to-purple-400 text-slate-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg"
                        >
                            {book.genre}
                        </motion.span>
                    </motion.div>

                    {/* Card Content */}
                    <div className="p-5 flex-1 flex flex-col">
                        {/* Title */}
                        <motion.h3
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.15 }}
                            className="text-lg font-bold text-white mb-2 line-clamp-2 leading-tight group-hover:text-indigo-300 transition-colors"
                        >
                            {book.title}
                        </motion.h3>

                        {/* Author */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-sm text-gray-300 mb-4 line-clamp-1"
                        >
                            by <span className="font-semibold text-indigo-300">{book.author || 'Unknown Author'}</span>
                        </motion.p>

                        {/* Divider */}
                        <motion.div
                            animate={{ scaleX: isHovered ? 1 : 0.8 }}
                            className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-4"
                        />

                        {/* Rating Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                            className="mb-4"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex gap-1">{renderStars(book.reviews || 0)}</div>
                                <motion.span
                                    className={`px-3 py-1 rounded-lg bg-gradient-to-r ${getRatingGradient(
                                        book.reviews || 0
                                    )} text-white text-sm font-bold shadow-lg`}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {(book.reviews || 0).toFixed(1)}
                                </motion.span>
                            </div>
                            {book.reviewCount && (
                                <p className="text-xs text-gray-400">
                                    {book.reviewCount > 1000
                                        ? `${(book.reviewCount / 1000).toFixed(1)}K ratings`
                                        : `${book.reviewCount} ratings`}
                                </p>
                            )}
                        </motion.div>

                        {/* Price Badge - Premium */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="mt-auto mb-4"
                            whileHover={{ scale: 1.02 }}
                        >
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-4 shadow-2xl border border-indigo-400/50 group-hover:border-indigo-300 transition-all">
                                <p className="text-indigo-200 text-xs font-semibold mb-1 uppercase tracking-wider">
                                    Price
                                </p>
                                <p className="text-3xl font-black text-white">
                                    ${book.price?.toFixed(2) || '0.00'}
                                </p>
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.35 }}
                        className="px-4 py-4 bg-gradient-to-r from-white/5 to-white/0 border-t border-white/10"
                    >
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                        >
                            <span>Explore</span>
                            <motion.svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                animate={{ x: isHovered ? 4 : 0 }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </motion.svg>
                        </motion.button>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default BookCard;