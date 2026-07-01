const cron = require('node-cron');
const axios = require('axios');

// Self-ping to keep Render free tier alive
// Runs every 10 minutes to prevent the server from spinning down (Render spins down after 15 min of inactivity)
const startKeepAlive = () => {
    // Get the deployed URL from environment or use a default
    const BACKEND_URL = process.env.BACKEND_URL || 'https://g-devworks.onrender.com';

    // Only run keep-alive in production
    if (process.env.NODE_ENV === 'production' || process.env.RENDER) {
        // Schedule task to run every 10 minutes
        // Format: */10 * * * * (every 10 minutes)
        cron.schedule('*/10 * * * *', async () => {
            try {
                const response = await axios.get(`${BACKEND_URL}/`);
                console.log(`[Keep-Alive] Pinged server at ${new Date().toISOString()} - Status: ${response.status}`);
            } catch (error) {
                console.error(`[Keep-Alive] Failed to ping server: ${error.message}`);
            }
        });

        console.log('[Keep-Alive] Service started - Will ping every 10 minutes to prevent spin-down');
    } else {
        console.log('[Keep-Alive] Service disabled in development mode');
    }
};

module.exports = { startKeepAlive };
