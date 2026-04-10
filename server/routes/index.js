// routes/index.js
// This file contains all basic routes for the API

import express from 'express';

const router = express.Router();

// Test route - This will return a success message
router.get('/', (req, res) => {
    try {
        res.json({
            success: true,
            message: 'Backend Running',
            timestamp: new Date().toISOString(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error in root route',
            error: error.message,
        });
    }
});

// Health check route - useful for monitoring
router.get('/health', (req, res) => {
    try {
        res.json({
            success: true,
            status: 'Server is healthy',
            uptime: process.uptime(),
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Health check failed',
            error: error.message,
        });
    }
});

export default router;
