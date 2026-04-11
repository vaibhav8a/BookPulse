// ============================================================
// importBooks.js
// CSV Import Script for Amazon Bestseller Dataset
// Imports books from CSV file into MongoDB
// ============================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Book from './models/Book.js';

// ============================================================
// SETUP: Initialize environment and paths
// ============================================================

// Load environment variables from .env file
dotenv.config();

// Get current directory (needed for ES modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define path to CSV file
const csvFilePath = path.join(__dirname, '../data/books.csv');

// ============================================================
// CONFIGURATION
// ============================================================

// Colors for console output
const colors = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m',
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Log function with colors and emojis
 * @param {string} message - Message to log
 * @param {string} type - Type: 'info', 'success', 'error', 'warning'
 */
function log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString();

    switch (type) {
        case 'success':
            console.log(`${colors.green}✅ [${timestamp}] ${message}${colors.reset}`);
            break;
        case 'error':
            console.log(`${colors.red}❌ [${timestamp}] ${message}${colors.reset}`);
            break;
        case 'warning':
            console.log(`${colors.yellow}⚠️  [${timestamp}] ${message}${colors.reset}`);
            break;
        case 'info':
            console.log(`${colors.blue}ℹ️  [${timestamp}] ${message}${colors.reset}`);
            break;
        case 'section':
            console.log(`\n${colors.cyan}${colors.bright}═══ ${message} ═══${colors.reset}`);
            break;
        default:
            console.log(`[${timestamp}] ${message}`);
    }
}

/**
 * Convert value to proper type based on field name
 * @param {string} fieldName - Name of the field
 * @param {string|number} value - Value to convert
 * @returns {*} Converted value
 */
function convertValue(fieldName, value) {
    // Handle empty or null values
    if (value === null || value === undefined || value === '') {
        return null;
    }

    // Convert string value to appropriate type
    switch (fieldName) {
        case 'rank':
        case 'price':
        case 'reviewCount':
        case 'reviews':
        case 'numberOfPages':
            // These should be numbers
            const numValue = parseFloat(value);
            return isNaN(numValue) ? null : numValue;

        case 'title':
        case 'author':
        case 'brand':
        case 'manufacturer':
        case 'genre':
            // These should be strings
            return String(value).trim();

        default:
            return value;
    }
}

/**
 * Map CSV row to Book schema format
 * @param {Object} row - CSV row object
 * @returns {Object} Mapped book object
 */
function mapCsvToBook(row) {
    return {
        title: convertValue('title', row.Title),
        author: convertValue('author', row.Author),
        brand: convertValue('brand', row.Brand || ''),
        manufacturer: convertValue('manufacturer', row.Manufacturer || ''),
        rank: convertValue('rank', row.Rank),
        reviewCount: convertValue('reviewCount', row['Review Count'] || row.ReviewCount || 0),
        reviews: convertValue('reviews', row.Reviews || 0),
        price: convertValue('price', row.Price),
        genre: convertValue('genre', row.Genre),
        numberOfPages: convertValue('numberOfPages', row['Number of Pages'] || row.NumberofPages),
    };
}

/**
 * Validate book data before insertion
 * @param {Object} book - Book object to validate
 * @returns {Object} { isValid: boolean, errors: string[] }
 */
function validateBook(book) {
    const errors = [];

    // Check required fields
    if (!book.title || book.title.trim() === '') {
        errors.push('Missing title');
    }
    if (!book.author || book.author.trim() === '') {
        errors.push('Missing author');
    }
    if (!book.rank || book.rank < 1) {
        errors.push('Invalid rank (must be >= 1)');
    }
    if (book.price === null || book.price < 0) {
        errors.push('Invalid price (must be >= 0)');
    }
    if (!book.genre || book.genre.trim() === '') {
        errors.push('Missing genre');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Connect to MongoDB
 * @returns {Promise<void>}
 */
async function connectDatabase() {
    try {
        log('Connecting to MongoDB...', 'info');

        await mongoose.connect(process.env.MONGODB_URI);

        log('Connected to MongoDB successfully', 'success');
    } catch (error) {
        log(`Failed to connect to MongoDB: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Clear existing books from database
 * @returns {Promise<number>} Number of books deleted
 */
async function clearBooks() {
    try {
        log('Clearing old books from database...', 'info');

        const result = await Book.deleteMany({});

        log(`Deleted ${result.deletedCount} old books`, 'success');

        return result.deletedCount;
    } catch (error) {
        log(`Error clearing books: ${error.message}`, 'error');
        throw error;
    }
}

/**
 * Import books from CSV file
 * @returns {Promise<Object>} Import statistics
 */
async function importBooksFromCsv() {
    return new Promise((resolve, reject) => {
        log(`Reading CSV from: ${csvFilePath}`, 'info');

        // Check if file exists
        if (!fs.existsSync(csvFilePath)) {
            log(`CSV file not found: ${csvFilePath}`, 'error');
            reject(new Error(`CSV file not found: ${csvFilePath}`));
            return;
        }

        const stats = {
            total: 0,
            imported: 0,
            failed: 0,
            errors: [],
        };

        // Create read stream from CSV file
        const readStream = fs.createReadStream(csvFilePath);

        // Parse CSV using csv-parser
        readStream
            .pipe(csv())
            .on('data', async (row) => {
                stats.total++;

                try {
                    // Map CSV row to Book schema
                    const bookData = mapCsvToBook(row);

                    // Validate book data
                    const { isValid, errors } = validateBook(bookData);

                    if (!isValid) {
                        stats.failed++;
                        stats.errors.push({
                            row: stats.total,
                            title: bookData.title,
                            errors,
                        });
                        return;
                    }

                    // Create and save book to MongoDB
                    const book = new Book(bookData);
                    await book.save();

                    stats.imported++;
                } catch (error) {
                    stats.failed++;
                    stats.errors.push({
                        row: stats.total,
                        error: error.message,
                    });
                }
            })
            .on('end', () => {
                log('CSV file reading completed', 'success');
                resolve(stats);
            })
            .on('error', (error) => {
                log(`Error reading CSV: ${error.message}`, 'error');
                reject(error);
            });
    });
}

/**
 * Print import summary
 * @param {Object} stats - Import statistics
 * @param {number} deletedCount - Number of books deleted
 */
function printSummary(stats, deletedCount) {
    console.log(`\n${colors.cyan}${colors.bright}╔════════════════════════════════════════════════════╗${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}║          📊 IMPORT SUMMARY                          ║${colors.reset}`);
    console.log(`${colors.cyan}${colors.bright}╚════════════════════════════════════════════════════╝${colors.reset}\n`);

    console.log(`${colors.bright}Previous Data:${colors.reset}`);
    console.log(`  Deleted: ${colors.yellow}${deletedCount}${colors.reset} old books\n`);

    console.log(`${colors.bright}Import Results:${colors.reset}`);
    console.log(`  Total Records: ${colors.cyan}${stats.total}${colors.reset}`);
    console.log(`  ✅ Imported: ${colors.green}${stats.imported}${colors.reset}`);
    console.log(`  ❌ Failed: ${colors.red}${stats.failed}${colors.reset}`);

    if (stats.errors.length > 0 && stats.errors.length <= 10) {
        console.log(`\n${colors.bright}Error Details:${colors.reset}`);
        stats.errors.forEach((err, index) => {
            if (err.errors) {
                console.log(`  Row ${err.row}: ${err.title}`);
                err.errors.forEach(e => console.log(`    - ${e}`));
            } else {
                console.log(`  Row ${err.row}: ${err.error}`);
            }
        });
    } else if (stats.errors.length > 10) {
        console.log(`\n${colors.yellow}First 10 errors:${colors.reset}`);
        stats.errors.slice(0, 10).forEach((err, index) => {
            if (err.errors) {
                console.log(`  Row ${err.row}: ${err.title}`);
                err.errors.forEach(e => console.log(`    - ${e}`));
            } else {
                console.log(`  Row ${err.row}: ${err.error}`);
            }
        });
        console.log(`  ${colors.yellow}... and ${stats.errors.length - 10} more errors${colors.reset}`);
    }

    console.log(`\n${colors.bright}Success Rate:${colors.reset} ${colors.green}${((stats.imported / stats.total) * 100).toFixed(2)}%${colors.reset}\n`);
}

/**
 * Main function - orchestrate the import process
 */
async function main() {
    try {
        log('Starting CSV Import Process', 'section');

        // Step 1: Connect to database
        await connectDatabase();

        // Step 2: Clear old books
        const deletedCount = await clearBooks();

        // Step 3: Import books from CSV
        log('Starting to import books from CSV...', 'info');
        const stats = await importBooksFromCsv();

        // Step 4: Print summary
        printSummary(stats, deletedCount);

        // Step 5: Disconnect from database
        log('Disconnecting from MongoDB...', 'info');
        await mongoose.disconnect();
        log('Disconnected from MongoDB', 'success');

        // Exit with appropriate code
        if (stats.failed > 0) {
            log(`Import completed with ${stats.failed} errors`, 'warning');
            process.exit(1);
        } else {
            log('Import completed successfully!', 'success');
            process.exit(0);
        }
    } catch (error) {
        log(`Fatal error: ${error.message}`, 'error');

        // Disconnect if connected
        if (mongoose.connection.readyState !== 0) {
            await mongoose.disconnect();
        }

        process.exit(1);
    }
}

// ============================================================
// ENTRY POINT
// ============================================================

main();
