require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');
const fileUpload = require('express-fileupload');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');

// Connect to MongoDB
connectDB();

// Initialize express
const app = express();

// Security Middleware
// Set security HTTP headers with CDN allowances
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://js.paystack.co"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://cdn.jsdelivr.net", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://cdn.jsdelivr.net", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'", "https://api.paystack.co", "https://cdn.jsdelivr.net"]
        }
    }
}));

// Rate limiting - protect against DoS and brute force attacks
const limiter = rateLimit({
    max: 100, // 100 requests
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser with size limits to prevent huge payloads
app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static('public'));

// API Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/quiz', require('./routes/quiz'));
app.use('/api/blog', require('./routes/blog'));
app.use('/api/payment', require('./routes/payment'));

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// File upload
app.use(fileUpload({
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
    abortOnLimit: true
}));

// Cookie parser
app.use(cookieParser());

// Prevent parameter pollution
app.use(hpp());

// Trust proxy for secure cookies in production
if (process.env.NODE_ENV === 'production') {
    app.set('trust proxy', 1);
}

// Error handling middleware
app.use(errorHandler);

// Serve index.html for all other routes (client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
