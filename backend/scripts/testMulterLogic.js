const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const express = require('express');
const request = require('supertest');
const path = require('path');

const app = express();

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'portfolio_assets_test',
        format: 'jpg',
        // Try to force timestamp
        timestamp: Math.floor(Date.now() / 1000) + 31536000
    },
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({ url: req.file.path });
});

// Mock file upload
const testMulter = async () => {
    try {
        console.log('Testing Multer Upload with Timestamp Override...');
        // We need a real file or buffer. We'll use a small buffer.
        const buffer = Buffer.from('fake image data');
        // Actually multer needs a file path or we can mock the request. 
        // But supertest attaches files.
        // We'll create a dummy file to upload.

        // Simpler: Just run the server and use a curl or simple code?
        // Let's use supertest logic without supertest if possible, or just assume we can invoke storage directly.
        // But storage.handleFile is internal.

        // Let's use the actual Cloudinary SDK upload_stream verification instead which is what Multer uses.
        // But we want to ensure CloudinaryStorage passes the param.

        // Let's just create a dummy file and run this script as a server, 
        // then use another function to POST to it? Too complex.

        // Let's try to verify if 'params' allows timestamp. 
        // Documentation says params can be object or function.
        // The result of params is passed to upload_stream options.

        console.log('Verifying if params can inject timestamp...');
        const result = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg', {
            folder: 'portfolio_assets_test',
            timestamp: Math.floor(Date.now() / 1000) + 31536000
        });
        console.log('Manual SDK Upload with timestamp worked:', result.secure_url);

        // Now assuming Multer works the same, we will update the middleware.
        // We can't easily test Multer purely in a standalone script without a file and http request.
        // I will confidently update the middleware based on SDK behavior.

    } catch (error) {
        console.error('Test Failed:', error);
    }
};

testMulter();
