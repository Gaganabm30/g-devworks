const cloudinary = require('../config/cloudinary');

const testUpload = async () => {
    try {
        console.log('Testing Cloudinary Connection...');
        console.log('Cloud Name:', process.env.CLOUDINARY_CLOUD_NAME);
        console.log('API Key:', process.env.CLOUDINARY_API_KEY ? 'Loaded' : 'Missing');
        console.log('API Secret:', process.env.CLOUDINARY_API_SECRET ? 'Loaded' : 'Missing');

        const result = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg', {
            folder: 'portfolio_assets_test'
        });
        console.log('Upload Successful!');
        console.log('URL:', result.secure_url);
        console.log('Public ID:', result.public_id);
    } catch (error) {
        console.error('Upload Failed:', error);
    }
};

testUpload();
