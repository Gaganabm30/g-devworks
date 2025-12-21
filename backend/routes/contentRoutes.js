const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getSkills,
    addSkill,
    deleteSkill,
    updateSkill,
    getAchievements,
    addAchievement,
    deleteAchievement,
    updateAchievement,
    getProjects,
    addProject,
    deleteProject,
    updateProject,
    getEducation,
    addEducation,
    deleteEducation,
    updateEducation,
    getMessages,
    addMessage,
    deleteMessage,
} = require('../controllers/contentController');

const upload = require('../middleware/uploadMiddleware');

// Skills
router.get('/skills', getSkills);
router.post('/skills', protect, addSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

// Education
router.get('/education', getEducation);
router.post('/education', protect, upload.single('img'), addEducation);
router.put('/education/:id', protect, upload.single('img'), updateEducation);
router.delete('/education/:id', protect, deleteEducation);

// Achievements
router.get('/achievements', getAchievements);
router.post('/achievements', protect, upload.single('img'), addAchievement);
router.put('/achievements/:id', protect, upload.single('img'), updateAchievement);
router.delete('/achievements/:id', protect, deleteAchievement);

// Projects
router.get('/projects', getProjects);
router.post('/projects', protect, upload.single('image'), addProject);
router.put('/projects/:id', protect, upload.single('image'), updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Messages
router.get('/messages', protect, getMessages);
router.post('/messages', addMessage); // Public access to send
router.delete('/messages/:id', protect, deleteMessage);

module.exports = router;
