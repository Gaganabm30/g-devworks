const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    date: { type: String, required: true },
    grade: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String },
});

module.exports = mongoose.model('Education', educationSchema);
