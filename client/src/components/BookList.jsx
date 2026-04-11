import React from 'react';
import { motion } from 'framer-motion';
import BookCard from './BookCard';

/**
 * Premium BookList Component
 * 
 * Displays a responsive grid of books with:
 * - Animated shimmer skeleton loading
 * - Beautiful empty state UI
 * - Staggered card animations
 * - Smooth fade transitions
 */
const BookList = ({ books, isLoading }) => {
    // Premium Skeleton Card with shimmer
    const SkeletonCard = () => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full rounded-3xl overflow-hidden"
        >
            <div className="h-full bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl p-6 space-y-4">
                {/* Header Shimmer */}
                <motion.div
                    animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="h-12 rounded-2xl bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%]"
                />

                {/* Title Shimmer */}
                <motion.div
                    animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
                    className="h-6 rounded-lg bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] w-3/4"
                />

                {/* Author Shimmer */}
                <motion.div
                    animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    className="h-4 rounded-lg bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] w-1/2"
                />

                {/* Spacer */}
                <div className="h-px bg-white/10" />

                {/* Rating Shimmer */}
                <motion.div
                    animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                    className="h-8 rounded-lg bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%]"
                />

                {/* Price Shimmer */}
                <motion.div
                    animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    className="h-24 rounded-2xl bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 bg-[length:200%_100%] mt-auto"
                />
            </div>
        </motion.div>
    );

    // Loading State
    if (isLoading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full"
            >
                {/* Loading Header */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8 px-4 py-3 rounded-full bg-white/5 border border-white/10 w-fit"
                >
                    <p className="text-indigo-300 text-sm font-semibold flex items-center gap-2">
                        <motion.span
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        >
                            ⚡
                        </motion.span>
                        Loading bestsellers...
                    </p>
                </motion.div>

                {/* Skeleton Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[...Array(12)].map((_, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: index * 0.08,
                                duration: 0.6,
                                type: 'spring',
                                stiffness: 100,
                            }}
                        >
                            <SkeletonCard />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        );
    }

    // Empty State
    if (books.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="flex flex-col items-center justify-center py-24 text-center"
            >
                {/* Icon */}
                <motion.div
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-9xl mb-8"
                >
                    📚
                </motion.div>

                {/* Title */}
                <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl font-black text-white mb-4"
                >
                    No Books Found
                </motion.h3>

                {/* Description */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-300 text-lg mb-8 max-w-md"
                >
                    Try a different search term or explore other genres to discover amazing reads
                </motion.p>

                {/* Suggestions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="px-6 py-4 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/50"
                >
                    <p className="text-indigo-300 text-sm font-semibold">
                        💡 Tip: Try searching for popular titles like "Harry Potter" or select a specific genre
                    </p>
                </motion.div>
            </motion.div>
        );
    }

    // Books Grid
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
        >
            {/* Results Header */}
            <motion.div
                className="mb-10 flex items-center justify-between"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                <motion.div
                    className="px-4 py-3 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border border-indigo-400/50 backdrop-blur"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}
                >
                    <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-purple-300 font-black text-lg">
                        {books.length} book{books.length !== 1 ? 's' : ''} found
                    </p>
                </motion.div>
            </motion.div>

            {/* Books Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book, index) => (
                    <motion.div
                        key={book._id}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            delay: (index % 12) * 0.08,
                            duration: 0.6,
                            type: 'spring',
                            stiffness: 100,
                            damping: 20,
                        }}
                    >
                        <BookCard book={book} />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default BookList;