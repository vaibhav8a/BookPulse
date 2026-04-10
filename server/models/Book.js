// models/Book.js
// This is a sample MongoDB model for a Book
// Models define the structure (schema) of documents in a collection

import mongoose from 'mongoose';

// Define the Book schema
const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        author: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        bestsellerRank: {
            type: Number,
            default: null,
        },
        category: {
            type: String,
            default: 'General',
        },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt
    }
);

// Create and export the Book model
const Book = mongoose.model('Book', bookSchema);
export default Book;
