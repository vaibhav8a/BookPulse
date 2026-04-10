// middleware/cors.js
// This file configures CORS (Cross-Origin Resource Sharing)
// CORS allows requests from frontend (different port) to backend

import cors from 'cors';

// Define allowed origins
const corsOptions = {
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Vite default port
    credentials: true, // Allow cookies to be sent with requests
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

// Export CORS middleware
export const corsMiddleware = cors(corsOptions);
