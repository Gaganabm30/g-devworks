const cloudinary = require('cloudinary').v2;

const cloud_name = 'dw6jnhryf';
const api_key = '533148579944397';
const api_secret = 'EP68T-YaPML8C7-3hqbcvnhQX-k';

console.log(`Cloud Name: "${cloud_name}" (Length: ${cloud_name.length})`);
console.log(`API Key: "${api_key}" (Length: ${api_key.length})`);
console.log(`API Secret: "${api_secret}" (Length: ${api_secret.length})`);

cloudinary.config({
    cloud_name: cloud_name,
    api_key: api_key,
    api_secret: api_secret,
    secure: true
});

const testUpload = async () => {
    try {
        console.log('Testing Cloudinary Connection...');
        const result = await cloudinary.uploader.upload('https://res.cloudinary.com/demo/image/upload/sample.jpg', {
            folder: 'portfolio_assets_test',
            timestamp: Math.floor(Date.now() / 1000) + 31536000 // Add 1 year just to be safe/future (or maybe just check current time first)
        });
        console.log('Upload Successful!');
        console.log('URL:', result.secure_url);
    } catch (error) {
        console.log('UPLOAD FAILED DETAILS:');
        console.log('Message:', error.message);
        if (error.http_code) console.log('HTTP Code:', error.http_code);
        // console.log('Full Error:', JSON.stringify(error, null, 2)); 
    }
};

testUpload();
