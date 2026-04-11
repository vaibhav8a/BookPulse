// routes/books.js
// This file contains all CRUD (Create, Read, Update, Delete) operations for books
// Each route handles a specific HTTP method and action

import express from 'express';
import Book from '../models/Book.js';

const router = express.Router();

// =====================================================
// GET ALL BOOKS
// =====================================================
// Route: GET /api/books
// Purpose: Retrieve all books from the database
// Response: Array of book objects

router.get('/', async (req, res, next) => {
    try {
        console.log('📚 Fetching all books...');

        // Query all books from database
        const books = await Book.find();

        console.log(`✅ Retrieved ${books.length} books`);

        // Return success response with books data
        res.json({
            success: true,
            message: 'Books retrieved successfully',
            count: books.length,
            data: books,
        });
    } catch (error) {
        // Pass error to error handling middleware
        next(error);
    }
});

// =====================================================
// GET SINGLE BOOK BY ID
// =====================================================
// Route: GET /api/books/:id
// Purpose: Retrieve a specific book by its MongoDB ID
// Response: Single book object or 404 if not found

router.get('/:id', async (req, res, next) => {
    try {
        const bookId = req.params.id;
        console.log(`📖 Fetching book with ID: ${bookId}`);

        // Find book by ID in database
        const book = await Book.findById(bookId);

        // Check if book exists
        if (!book) {
            console.log(`❌ Book not found: ${bookId}`);
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        console.log(`✅ Found book: ${book.title}`);

        // Return success response with book data
        res.json({
            success: true,
            message: 'Book retrieved successfully',
            data: book,
        });
    } catch (error) {
        // Check if error is due to invalid MongoDB ID format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID format',
            });
        }
        // Pass other errors to error handling middleware
        next(error);
    }
});

// =====================================================
// CREATE NEW BOOK
// =====================================================
// Route: POST /api/books
// Purpose: Add a new book to the database
// Request Body: { title, author, description, price, rating, category }
// Response: Newly created book object with ID

router.post('/', async (req, res, next) => {
    try {
        console.log('📝 Creating new book...');
        console.log('📥 Received data:', req.body);

        // Extract book data from request body
        const { title, author, description, price, rating, category } = req.body;

        // Validate required fields
        if (!title || !author || !price) {
            console.log('❌ Validation error: Missing required fields');
            return res.status(400).json({
                success: false,
                message: 'Missing required fields: title, author, and price are required',
            });
        }

        // Create new book object with data from request
        const newBook = new Book({
            title,
            author,
            description: description || '',
            price,
            rating: rating || 0,
            category: category || 'General',
        });

        // Save book to database
        const savedBook = await newBook.save();

        console.log(`✅ Book created successfully: ${savedBook._id}`);

        // Return success response with created book
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: savedBook,
        });
    } catch (error) {
        // Check for validation errors from Mongoose
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages,
            });
        }
        // Pass other errors to error handling middleware
        next(error);
    }
});

// =====================================================
// UPDATE BOOK
// =====================================================
// Route: PUT /api/books/:id
// Purpose: Update an existing book's information
// Request Body: { title, author, description, price, rating, category }
// Response: Updated book object

router.put('/:id', async (req, res, next) => {
    try {
        const bookId = req.params.id;
        console.log(`✏️  Updating book with ID: ${bookId}`);
        console.log('📥 Update data:', req.body);

        // Find book by ID and update with new data
        // { new: true } returns the updated book instead of the old one
        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            req.body,
            { new: true, runValidators: true } // runValidators ensures schema validation
        );

        // Check if book exists
        if (!updatedBook) {
            console.log(`❌ Book not found: ${bookId}`);
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        console.log(`✅ Book updated successfully: ${updatedBook._id}`);

        // Return success response with updated book
        res.json({
            success: true,
            message: 'Book updated successfully',
            data: updatedBook,
        });
    } catch (error) {
        // Check if error is due to invalid MongoDB ID format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID format',
            });
        }
        // Check for validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: messages,
            });
        }
        // Pass other errors to error handling middleware
        next(error);
    }
});

// =====================================================
// DELETE BOOK
// =====================================================
// Route: DELETE /api/books/:id
// Purpose: Remove a book from the database
// Response: Deleted book object

router.delete('/:id', async (req, res, next) => {
    try {
        const bookId = req.params.id;
        console.log(`🗑️  Deleting book with ID: ${bookId}`);

        // Find book by ID and delete it
        const deletedBook = await Book.findByIdAndDelete(bookId);

        // Check if book existed
        if (!deletedBook) {
            console.log(`❌ Book not found: ${bookId}`);
            return res.status(404).json({
                success: false,
                message: 'Book not found',
            });
        }

        console.log(`✅ Book deleted successfully: ${deletedBook._id}`);

        // Return success response with deleted book info
        res.json({
            success: true,
            message: 'Book deleted successfully',
            data: deletedBook,
        });
    } catch (error) {
        // Check if error is due to invalid MongoDB ID format
        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: 'Invalid book ID format',
            });
        }
        // Pass other errors to error handling middleware
        next(error);
    }
});

// Export router for use in main server file
export default router;
