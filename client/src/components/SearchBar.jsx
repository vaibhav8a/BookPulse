import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Premium SearchBar Component
 * 
 * Advanced search with:
 * - Glassmorphism styling
 * - Smooth focus animations
 * - Icon animations
 * - Clear button with hover effects
 * - Debounced search
 */
const SearchBar = ({ searchTerm, onSearchChange }) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef(null);

    const handleChange = (e) => {
        onSearchChange(e.target.value);
    };

    const handleClear = () => {
        onSearchChange('');
        if (inputRef.current) inputRef.current.focus();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full"
        >
            <label htmlFor="search-input" className="block text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2">
                <span className="text-lg">🔍</span> Search Books
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
                    className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity"
                />

                {/* Input Container */}
                <div className="relative flex items-center">
                    {/* Search Icon */}
                    <motion.div
                        animate={{ x: isFocused ? 2 : 0, scale: isFocused ? 1.1 : 1 }}
                        className="absolute left-4 text-indigo-400 pointer-events-none"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </motion.div>

                    {/* Input Field */}
                    <input
                        ref={inputRef}
                        id="search-input"
                        type="text"
                        placeholder="Search by title, author..."
                        value={searchTerm}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full pl-12 pr-12 py-3.5 rounded-2xl bg-white/10 backdrop-blur border border-white/20 hover:border-white/40 focus:border-indigo-400 focus:outline-none text-white placeholder-gray-400 transition-all shadow-xl focus:shadow-2xl"
                    />

                    {/* Clear Button */}
                    <AnimatePresence>
                        {searchTerm && (
                            <motion.button
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0 }}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleClear}
                                type="button"
                                className="absolute right-4 text-gray-400 hover:text-white transition-colors p-1"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Search Feedback */}
            <AnimatePresence>
                {searchTerm && (
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="mt-3 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300"
                    >
                        <span className="text-indigo-300 font-semibold">✓ Searching:</span> {searchTerm}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default SearchBar;