import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BookList from './components/BookList';
import SearchBar from './components/SearchBar';
import GenreFilter from './components/GenreFilter';
import './App.css';

/**
 * Main App Component
 * 
 * This is the main dashboard for BookPulse.
 * Responsibilities:
 * 1. Fetch books from backend API
 * 2. Manage search and filter state
 * 3. Filter books based on search term and selected genre
 * 4. Handle loading and error states
 * 5. Render the complete dashboard UI
 * 
 * Features:
 * - Real-time search by title
 * - Genre-based filtering
 * - Responsive design
 * - Loading skeleton
 * - Error handling
 */
function App() {
  // State Management
  const [allBooks, setAllBooks] = useState([]);           // All books from API
  const [filteredBooks, setFilteredBooks] = useState([]); // Filtered books for display
  const [searchTerm, setSearchTerm] = useState('');        // Current search term
  const [selectedGenre, setSelectedGenre] = useState('');  // Currently selected genre
  const [genres, setGenres] = useState([]);                // All unique genres
  const [isLoading, setIsLoading] = useState(true);        // Loading state
  const [error, setError] = useState(null);                // Error message

  // API Configuration
  const API_URL = 'http://localhost:5001/api/books';

  /**
   * Fetch Books from Backend API
   * 
   * Called on component mount (useEffect)
   * - Fetches all books from the backend
   * - Extracts unique genres
   * - Handles errors gracefully
   */
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // Extract books from API response
      const books = data.data || [];
      setAllBooks(books);
      setFilteredBooks(books);

      // Extract unique genres and sort them
      const uniqueGenres = [...new Set(books.map((book) => book.genre))].sort();
      setGenres(uniqueGenres);

      setIsLoading(false);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message);
      setIsLoading(false);
    }
  };

  /**
   * Fetch Books on Component Mount
   * Runs once when component first renders
   */
  useEffect(() => {
    fetchBooks();
  }, []);

  /**
   * Filter Books Logic
   * 
   * This effect runs whenever searchTerm or selectedGenre changes.
   * It filters the allBooks array based on:
   * 1. Search term (case-insensitive title matching)
   * 2. Selected genre (exact match)
   * 
   * Then updates filteredBooks state
   */
  useEffect(() => {
    let filtered = allBooks;

    // Filter by search term (search in title and author)
    if (searchTerm.trim()) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter((book) =>
        book.title.toLowerCase().includes(lowerSearchTerm) ||
        (book.author && book.author.toLowerCase().includes(lowerSearchTerm))
      );
    }

    // Filter by genre
    if (selectedGenre) {
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }

    setFilteredBooks(filtered);
  }, [searchTerm, selectedGenre, allBooks]);

  /**
   * Handle Search Input Change
   * Updates searchTerm state
   */
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  /**
   * Handle Genre Selection Change
   * Updates selectedGenre state
   */
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  // Error State UI
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
        <motion.div
          className="min-h-screen flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-red-100"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6 text-center"
            >
              ⚠️
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 text-center">Error Loading Books</h2>
            <p className="text-red-600 mb-4 text-center text-sm">{error}</p>
            <p className="text-sm text-gray-600 mb-6 text-center">
              Make sure the backend server is running on <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:5001</code>
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchBooks}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-lg"
            >
              Try Again
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100">
      {/* Sticky Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-blue-600 to-purple-600 text-white shadow-2xl backdrop-blur-md bg-opacity-95"
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3 mb-3"
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="text-4xl"
            >
              📚
            </motion.span>
            <div>
              <h1 className="text-4xl font-black tracking-tight">BookPulse</h1>
              <p className="text-blue-100 text-sm font-medium">Amazon Bestseller Intelligence Dashboard</p>
            </div>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-blue-100 flex items-center gap-2"
          >
            <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse"></span>
            Exploring <span className="font-bold">{allBooks.length.toLocaleString()}</span> bestselling books
          </motion.p>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Filters Card - Premium Design */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-gray-100/50 backdrop-blur-sm"
        >
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"
          >
            <span className="text-2xl">🔍</span>
            Search & Discover
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <GenreFilter
              genres={genres}
              selectedGenre={selectedGenre}
              onGenreChange={handleGenreChange}
            />
          </div>

          {/* Clear Filters Button - Enhanced */}
          {(searchTerm || selectedGenre) && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex gap-3 flex-wrap"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGenre('');
                }}
                className="bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear All Filters
              </motion.button>

              {/* Active Filters Display */}
              <div className="flex gap-2 flex-wrap">
                {searchTerm && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-semibold flex items-center gap-2"
                  >
                    🔤 {searchTerm}
                  </motion.span>
                )}
                {selectedGenre && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="px-4 py-2 rounded-full bg-purple-100 text-purple-800 text-sm font-semibold flex items-center gap-2"
                  >
                    📖 {selectedGenre}
                  </motion.span>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Books Grid Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <BookList books={filteredBooks} isLoading={isLoading} />
        </motion.div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-12 mt-20 border-t border-gray-700"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <p className="text-white font-bold mb-2 flex items-center gap-2">
                <span>📚</span> BookPulse
              </p>
              <p className="text-sm text-gray-400">
                Discover the world's best-selling books on Amazon
              </p>
            </div>
            <div>
              <p className="text-white font-bold mb-2">📊 Stats</p>
              <p className="text-sm text-gray-400">
                {allBooks.length.toLocaleString()} books • {genres.length} genres • Updated daily
              </p>
            </div>
            <div>
              <p className="text-white font-bold mb-2">⚡ Powered By</p>
              <p className="text-sm text-gray-400">
                React, Tailwind CSS, Framer Motion & Express.js with MongoDB
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
            <p>BookPulse © 2026 | Amazon Bestseller Intelligence</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
