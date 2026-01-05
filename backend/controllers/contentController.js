const Skill = require('../models/Skill');
const Achievement = require('../models/Achievement');
const Project = require('../models/Project');
const Education = require('../models/Education');
const cloudinary = require('../config/cloudinary');

// Helper to handle image uploads
const handleImageUpload = async (imageString) => {
    if (!imageString) return '';
    // Check if it's already a URL (e.g., from Cloudinary)
    if (imageString.startsWith('http')) return imageString;

    // It's a Base64 string, upload to Cloudinary
    try {
        const uploadResponse = await cloudinary.uploader.upload(imageString, {
            upload_preset: 'ml_default', // Optional, can remove if not using presets
            folder: 'portfolio',
        });
        return uploadResponse.secure_url;
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error('Image upload failed');
    }
};

// Skills
exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addSkill = async (req, res) => {
    try {
        const { skills, ...otherData } = req.body;

        // Process images inside the 'skills' array
        let processedSkills = [];
        if (skills && Array.isArray(skills)) {
            processedSkills = await Promise.all(skills.map(async (skill) => {
                if (skill.image) {
                    const imageUrl = await handleImageUpload(skill.image);
                    return { ...skill, image: imageUrl };
                }
                return skill;
            }));
        }

        const newSkill = new Skill({ ...otherData, skills: processedSkills });
        const savedSkill = await newSkill.save();
        res.status(201).json(savedSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ message: 'Skill deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateSkill = async (req, res) => {
    try {
        const { skills, ...otherData } = req.body;

        let processedSkills = skills;
        if (skills && Array.isArray(skills)) {
            processedSkills = await Promise.all(skills.map(async (skill) => {
                if (skill.image) {
                    const imageUrl = await handleImageUpload(skill.image);
                    return { ...skill, image: imageUrl };
                }
                return skill;
            }));
        }

        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            { ...otherData, skills: processedSkills },
            { new: true }
        );
        res.json(updatedSkill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Achievements
exports.getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addAchievement = async (req, res) => {
    try {
        let { img, ...otherData } = req.body;
        if (img) {
            img = await handleImageUpload(img);
        }
        const newAchievement = new Achievement({ ...otherData, img });
        const savedAchievement = await newAchievement.save();
        res.status(201).json(savedAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteAchievement = async (req, res) => {
    try {
        await Achievement.findByIdAndDelete(req.params.id);
        res.json({ message: 'Achievement deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateAchievement = async (req, res) => {
    try {
        let { img, ...otherData } = req.body;
        if (img) {
            img = await handleImageUpload(img);
        }
        const updatedAchievement = await Achievement.findByIdAndUpdate(
            req.params.id,
            { ...otherData, img },
            { new: true }
        );
        res.json(updatedAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Projects
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addProject = async (req, res) => {
    try {
        let { image, ...otherData } = req.body;
        if (image) {
            image = await handleImageUpload(image);
        }
        const newProject = new Project({ ...otherData, image });
        const savedProject = await newProject.save();
        res.status(201).json(savedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProject = async (req, res) => {
    try {
        let { image, ...otherData } = req.body;
        if (image) {
            image = await handleImageUpload(image);
        }
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { ...otherData, image },
            { new: true }
        );
        res.json(updatedProject);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Education
exports.getEducation = async (req, res) => {
    try {
        const education = await Education.find();
        res.json(education);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addEducation = async (req, res) => {
    try {
        let { img, ...otherData } = req.body;
        if (img) {
            img = await handleImageUpload(img);
        }
        const newEducation = new Education({ ...otherData, img });
        const savedEducation = await newEducation.save();
        res.status(201).json(savedEducation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteEducation = async (req, res) => {
    try {
        await Education.findByIdAndDelete(req.params.id);
        res.json({ message: 'Education deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateEducation = async (req, res) => {
    try {
        let { img, ...otherData } = req.body;
        if (img) {
            img = await handleImageUpload(img);
        }
        const updatedEducation = await Education.findByIdAndUpdate(
            req.params.id,
            { ...otherData, img },
            { new: true }
        );
        res.json(updatedEducation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await require('../models/Message').find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.addMessage = async (req, res) => {
    try {
        const newMessage = new require('../models/Message')(req.body);
        const savedMessage = await newMessage.save();
        res.status(201).json(savedMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteMessage = async (req, res) => {
    try {
        await require('../models/Message').findByIdAndDelete(req.params.id);
        res.json({ message: 'Message deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
