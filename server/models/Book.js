// models/Book.js
// This is a sample MongoDB model for a Book
// Models define the structure (schema) of documents in a collection

import mongoose from 'mongoose';

// Define the Book schema (Amazon Bestseller Dataset)
const bookSchema = new mongoose.Schema(
    {
        // ========== BASIC INFORMATION ==========
        title: {
            type: String,
            required: true,
            trim: true,
            description: 'The title of the book',
        },
        author: {
            type: String,
            required: true,
            trim: true,
            description: 'The author(s) of the book',
        },
        brand: {
            type: String,
            trim: true,
            default: '',
            description: 'The brand/publisher brand name',
        },
        manufacturer: {
            type: String,
            trim: true,
            default: '',
            description: 'The manufacturer/publisher of the book',
        },

        // ========== RANKING & REVIEWS ==========
        rank: {
            type: Number,
            required: true,
            min: 1,
            description: 'Amazon bestseller ranking (1 = top ranked)',
        },
        reviewCount: {
            type: Number,
            default: 0,
            min: 0,
            description: 'Number of reviews the book has received',
        },
        reviews: {
            type: Number,
            default: 0,
            min: 0,
            description: 'Average review rating (0-5 scale)',
        },

        // ========== PRICING & AVAILABILITY ==========
        price: {
            type: Number,
            required: true,
            min: 0,
            description: 'Price of the book in USD',
        },

        // ========== CATEGORIZATION ==========
        genre: {
            type: String,
            required: true,
            trim: true,
            description: 'Book genre/category (e.g., Fiction, Science, History)',
        },

        // ========== CONTENT DETAILS ==========
        numberOfPages: {
            type: Number,
            default: null,
            min: 1,
            description: 'Total number of pages in the book',
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);
export default Book;
