const cloudinary = require('cloudinary').v2;

// Set env var directly
process.env.CLOUDINARY_URL = 'cloudinary://533148579944397:EP68T-YaPML8C7-3hqbcvnhQX-k@dw6jnhrfy';

const testUpload = async () => {
    try {
        console.log('Testing Cloudinary with CLOUDINARY_URL...');

        // Force config load
        const config = cloudinary.config();
        console.log('Parsed Config Cloud Name:', config.cloud_name);
        console.log('Parsed Config API Key:', config.api_key);
        // Don't log full secret, just length
        console.log('Parsed Config API Secret Length:', config.api_secret ? config.api_secret.length : 0);

        const result = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg', {
            folder: 'portfolio_assets_test'
        });
        console.log('Upload Successful!');
        console.log('URL:', result.secure_url);
    } catch (error) {
        console.log('UPLOAD FAILED:');
        console.log(error);
    }
};

testUpload();
