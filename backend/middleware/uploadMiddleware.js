const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        console.log('Processing upload for file:', file.originalname);
        return {
            folder: 'portfolio_assets',
            allowed_formats: ['jpg', 'png', 'jpeg', 'mp4', 'mov', 'avi'],
            resource_type: 'auto',
            timestamp: Math.floor(Date.now() / 1000) + 31536000 // Future timestamp to bypass stale request error
        };
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
