const https = require('https');

/**
 * Fetches the current time from Google to handle system clock skew.
 * Returns a promise that resolves to the current unix timestamp (seconds).
 */
const getCorrectedTimestamp = () => {
    return new Promise((resolve, reject) => {
        const req = https.get('https://www.google.com', (res) => {
            const date = res.headers.date;
            if (date) {
                // Return timestamp in seconds
                resolve(Math.floor(new Date(date).getTime() / 1000));
            } else {
                console.warn("No Date header from Google, falling back to local time.");
                resolve(Math.floor(Date.now() / 1000));
            }
        });

        req.on('error', (e) => {
            console.error("Time fetch error:", e.message);
            // Fallback to local time if network fail
            resolve(Math.floor(Date.now() / 1000));
        });

        // precise timeout handling
        req.setTimeout(3000, () => {
            req.abort();
            console.warn("Time fetch timed out, falling back to local time.");
            resolve(Math.floor(Date.now() / 1000));
        });
    });
};

module.exports = { getCorrectedTimestamp };
