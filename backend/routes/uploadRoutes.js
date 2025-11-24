const express = require('express');
const multer = require('multer');
const router = express.Router();
const https = require('https');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Use memory storage to handle buffer manually
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

function getNetworkTime() {
    return new Promise((resolve, reject) => {
        https.get('https://www.google.com', (res) => {
            if (res.headers.date) {
                resolve(new Date(res.headers.date).getTime());
            } else {
                // Fallback to system time if header missing (unlikely)
                resolve(Date.now());
            }
        }).on('error', (e) => {
            console.error('Network time fetch failed:', e);
            // Fallback to system time
            resolve(Date.now());
        });
    });
}

router.post('/', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const networkTime = await getNetworkTime();
        const timestamp = Math.floor(networkTime / 1000);

        const signature = cloudinary.utils.api_sign_request({
            folder: 'portfolio_uploads',
            timestamp: timestamp
        }, process.env.CLOUDINARY_API_SECRET);

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'portfolio_uploads',
                timestamp: timestamp,
                signature: signature,
                api_key: process.env.CLOUDINARY_API_KEY
            },
            (error, result) => {
                if (error) {
                    console.error('Cloudinary Upload Error:', error);
                    return res.status(500).send('Upload failed');
                }
                res.send(result.secure_url);
            }
        );

        // Write buffer to stream
        const bufferStream = require('stream').Readable.from(req.file.buffer);
        bufferStream.pipe(uploadStream);

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
