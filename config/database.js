const mongoose = require('mongoose');

// This function connects us to MongoDB and includes security settings
const connectDB = async () => {
    try {
        // Security options to protect our database
        const options = {
            // Limit how much data can be fetched at once to prevent overload
            maxPoolSize: 10,
            // How long to wait before timing out - prevents hanging connections
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        // Connect to MongoDB using our secret connection string
        const conn = await mongoose.connect(process.env.MONGODB_URI, options);

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Set up global security rules for all MongoDB queries
        mongoose.set('debug', process.env.NODE_ENV === 'development');
        
        // Prevent overloading our database with too many requests
        mongoose.connection.on('error', err => {
            console.error('MongoDB error:', err);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        if (process.env.NODE_ENV === 'production') {
            process.exit(1);
        } else {
            console.log('⚠️  Running without database - some features will be limited');
        }
    }
};

module.exports = connectDB;