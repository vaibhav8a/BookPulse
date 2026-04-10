// middleware/errorHandler.js
// This file defines error handling middleware
// Any unhandled errors are caught and formatted here

// Custom error handler middleware
export const errorHandler = (err, req, res, next) => {
    // Log error to console for debugging
    console.error('❌ Error:', err.message);

    // Determine status code (default to 500 - Internal Server Error)
    const statusCode = err.statusCode || 500;

    // Send error response
    res.status(statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err : {}, // Show full error in dev, hide in production
    });
};

// Middleware to catch 404 errors (route not found)
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
};
