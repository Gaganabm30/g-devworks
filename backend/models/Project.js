const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tags: [{ type: String }],
    category: { type: String, required: true },
    github: { type: String, required: true },
    webapp: { type: String, required: true },
    member: [
        {
            name: String,
            img: String,
            linkedin: String,
            github: String,
        }
    ],
});

module.exports = mongoose.model('Project', projectSchema);
