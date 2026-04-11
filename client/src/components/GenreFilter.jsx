import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Premium GenreFilter Component
 * 
 * Advanced genre selector with:
 * - Glassmorphism styling
 * - Smooth animations
 * - Icon animations
 * - Focus effects
 */
const GenreFilter = ({ genres, selectedGenre, onGenreChange }) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
        >
            <label htmlFor="genre-select" className="block text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                <span className="text-lg">📚</span> Genre
            </label>

            <motion.div
                animate={{
                    boxShadow: isFocused
                        ? '0 0 30px rgba(99, 102, 241, 0.5), inset 0 0 30px rgba(99, 102, 241, 0.1)'
                        : '0 0 20px rgba(99, 102, 241, 0.1)',
                }}
                className="relative group"
            >
                {/* Background Glow */}
                <motion.div
                    animate={{ opacity: isFocused ? 1 : 0 }}
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity"
                />

                {/* Select Container */}
                <div className="relative">
                    <select
                        id="genre-select"
                        value={selectedGenre}
                        onChange={(e) => onGenreChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full px-4 py-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 hover:border-white/40 focus:border-purple-400 focus:outline-none text-white transition-all shadow-xl focus:shadow-2xl appearance-none cursor-pointer pr-12"
                    >
                        <option value="" className="bg-slate-800">All Genres ({genres.length})</option>
                        {genres.map((genre) => (
                            <option key={genre} value={genre} className="bg-slate-800">
                                {genre}
                            </option>
                        ))}
                    </select>

                    {/* Dropdown Icon */}
                    <motion.div
                        className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-purple-400"
                        animate={{ rotate: isFocused ? 180 : 0, scale: isFocused ? 1.2 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </motion.div>
                </div>
            </motion.div>

            {/* Genre Selection Feedback */}
            <AnimatePresence>
                {selectedGenre && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300"
                    >
                        <span className="text-purple-300 font-semibold">✓ Filtered by:</span> {selectedGenre}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default GenreFilter;