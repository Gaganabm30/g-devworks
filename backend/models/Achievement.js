const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    img: { type: String }, // Base64 or URL
    tags: { type: [String] },
}, { timestamps: true });

module.exports = mongoose.model('Achievement', achievementSchema);
