// index.js
// Main server file - Entry point for the backend application

import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { corsMiddleware } from './middleware/cors.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import routes from './routes/index.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Get port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// =====================
// MIDDLEWARE SETUP
// =====================

// 1. CORS Middleware - Allow requests from frontend
app.use(corsMiddleware);

// 2. JSON Parser Middleware - Parse incoming JSON requests
app.use(express.json());

// 3. URL Encoded Parser - Parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// =====================
// ROUTES
// =====================

// Use main routes
app.use('/api', routes);

// =====================
// ERROR HANDLING
// =====================

// Middleware for 404 errors
app.use(notFound);

// Error handling middleware (must be last)
app.use(errorHandler);

// =====================
// SERVER START
// =====================

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        // Start the server
        app.listen(PORT, () => {
            console.log(`\n🚀 BookPulse Server is running on http://localhost:${PORT}`);
            console.log(`📝 API Base URL: http://localhost:${PORT}/api`);
            console.log(`💚 Health Check: http://localhost:${PORT}/api/health\n`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

// Call the startup function
startServer();
