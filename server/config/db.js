// config/db.js
// This file handles MongoDB connection using Mongoose

import mongoose from 'mongoose';

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookpulse';

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('✅ MongoDB Connected Successfully!');
        return true;
    } catch (error) {
        console.error('❌ MongoDB Connection Failed:', error.message);
        // Exit the process if connection fails
        process.exit(1);
    }
};

export default connectDB;
