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
    getResume,
    addResume,
    deleteResume,
    updateResume,
    viewResume,
} = require('../controllers/contentController');

// Skills
router.get('/skills', getSkills);
router.post('/skills', protect, addSkill);
router.put('/skills/:id', protect, updateSkill);
router.delete('/skills/:id', protect, deleteSkill);

// Education
router.get('/education', getEducation);
router.post('/education', protect, addEducation);
router.put('/education/:id', protect, updateEducation);
router.delete('/education/:id', protect, deleteEducation);

// Achievements
router.get('/achievements', getAchievements);
router.post('/achievements', protect, addAchievement);
router.put('/achievements/:id', protect, updateAchievement);
router.delete('/achievements/:id', protect, deleteAchievement);

// Projects
router.get('/projects', getProjects);
router.post('/projects', protect, addProject);
router.put('/projects/:id', protect, updateProject);
router.delete('/projects/:id', protect, deleteProject);

// Messages
router.get('/messages', protect, getMessages);
router.post('/messages', addMessage); // Public access to send
router.delete('/messages/:id', protect, deleteMessage);

// Resume
router.get('/resume', getResume);
router.get('/resume/view/:id', viewResume); // Public: serves PDF bytes directly
router.post('/resume', protect, addResume);
router.put('/resume/:id', protect, updateResume);
router.delete('/resume/:id', protect, deleteResume);

module.exports = router;
