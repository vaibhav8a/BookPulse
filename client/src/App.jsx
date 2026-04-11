import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import Header from './components/Header';
import './App.css';

/**
 * Premium BookPulse App Component
 * 
 * A high-end SaaS-style dashboard with:
 * - Advanced animations (Framer Motion)
 * - Premium glassmorphism design
 * - Interactive micro-interactions
 * - Smooth transitions and staggered animations
 * - Rich visual feedback
 */
function App() {
  // State Management
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [genres, setGenres] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);

  const API_URL = 'http://localhost:5001/api/books';

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      const books = data.data || [];
      setAllBooks(books);
      setFilteredBooks(books);
      const uniqueGenres = [...new Set(books.map(b => b.genre))].sort();
      setGenres(uniqueGenres);
      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Update active filters display
  useEffect(() => {
    const filters = [];
    if (searchTerm) filters.push({ type: 'search', value: searchTerm });
    if (selectedGenre) filters.push({ type: 'genre', value: selectedGenre });
    setActiveFilters(filters);
  }, [searchTerm, selectedGenre]);

  // Filter books with memoization
  const filteredBooksResult = useMemo(() => {
    let filtered = allBooks;

    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(b =>
        b.title.toLowerCase().includes(lower) ||
        (b.author && b.author.toLowerCase().includes(lower))
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(b => b.genre === selectedGenre);
    }

    return filtered;
  }, [searchTerm, selectedGenre, allBooks]);

  useEffect(() => {
    setFilteredBooks(filteredBooksResult);
  }, [filteredBooksResult]);

  const handleSearchChange = (value) => setSearchTerm(value);
  const handleGenreChange = (genre) => setSelectedGenre(genre);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedGenre('');
  };

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl p-8 border border-red-500/20 backdrop-blur-xl">
            <motion.div
              animate={{ scale: [1, 1.2, 1], y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-7xl mb-6 text-center"
            >
              ⚠️
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-3 text-center">Connection Error</h2>
            <p className="text-red-300 mb-4 text-center text-sm">{error}</p>
            <p className="text-sm text-gray-400 mb-6 text-center">
              Backend should run on <code className="bg-slate-700 px-2 py-1 rounded text-cyan-300">localhost:5001</code>
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(239, 68, 68, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchBooks}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
            >
              Retry Connection
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Main Premium UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.1, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl"
        />
      </div>

      {/* Header */}
      <Header allBooksCount={allBooks.length} />

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Filters Section - Premium Glassmorphism */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-white mb-8 flex items-center gap-3"
            >
              <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-lg">
                🔍
              </span>
              Discover Your Next Read
            </motion.h2>

            {/* Search & Filter Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <GenreFilter
                  genres={genres}
                  selectedGenre={selectedGenre}
                  onGenreChange={handleGenreChange}
                />
              </motion.div>
            </div>

            {/* Active Filters & Clear Button */}
            <AnimatePresence>
              {activeFilters.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap items-center gap-3 pt-6 border-t border-white/10"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearAllFilters}
                    className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all flex items-center gap-2 border border-white/20"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear Filters
                  </motion.button>

                  {/* Active Filter Tags */}
                  <div className="flex flex-wrap gap-2">
                    {searchTerm && (
                      <motion.span
                        layoutId="search-tag"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium"
                      >
                        🔤 Search: {searchTerm}
                      </motion.span>
                    )}
                    {selectedGenre && (
                      <motion.span
                        layoutId="genre-tag"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium"
                      >
                        📖 Genre: {selectedGenre}
                      </motion.span>
                    )}
                  </div>

                  {/* Results Count */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="ml-auto px-4 py-2 rounded-lg bg-white/5 text-white/80 text-sm font-medium"
                  >
                    {filteredBooks.length} result{filteredBooks.length !== 1 ? 's' : ''}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Books Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <BookList books={filteredBooks} isLoading={isLoading} />
        </motion.div>
      </main>

      {/* Premium Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 bg-black/40 backdrop-blur-xl border-t border-white/10 py-12 mt-24"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring' }}>
              <p className="text-white font-bold mb-2 flex items-center gap-2">
                <span className="text-2xl">📚</span> BookPulse
              </p>
              <p className="text-gray-300 text-sm">
                Premium Amazon bestseller discovery platform
              </p>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring' }}>
              <p className="text-white font-bold mb-2">📊 Catalog</p>
              <p className="text-gray-300 text-sm">
                {allBooks.length.toLocaleString()} books • {genres.length} genres
              </p>
            </motion.div>
            <motion.div whileHover={{ x: 5 }} transition={{ type: 'spring' }}>
              <p className="text-white font-bold mb-2">⚡ Tech Stack</p>
              <p className="text-gray-300 text-sm">
                React • Framer Motion • Tailwind • Express.js
              </p>
            </motion.div>
          </div>
          <div className="border-t border-white/10 pt-6 text-center">
            <p className="text-gray-400 text-sm">© 2026 BookPulse. Premium bestseller intelligence.</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
