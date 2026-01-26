const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    img: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    company: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    skills: {
        type: [String],
        default: [],
    },
    doc: {
        type: String,
    },
});

module.exports = mongoose.model('Experience', experienceSchema);
