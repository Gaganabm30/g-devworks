const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    skills: [
        {
            name: { type: String, required: true },
            image: { type: String, required: true },
        }
    ],
});

module.exports = mongoose.model('Skill', skillSchema);
