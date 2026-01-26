const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const { startKeepAlive } = require('./utils/keepAlive');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// CORS Configuration
const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Database Connection
const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err.message);
        process.exit(1);
    }
};
connectDB();

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api', require('./routes/contentRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Portfolio Backend is Running');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);

    // Start keep-alive service to prevent Render from spinning down
    startKeepAlive();
});
