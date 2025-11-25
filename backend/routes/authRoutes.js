const express = require('express');
const { loginUser, registerAdmin } = require('../controllers/authController');
const router = express.Router();

router.post('/login', loginUser);

// TEMPORARY: Remove this after creating admin user in production
// Access this endpoint once to create admin: POST /api/auth/setup-admin
// Body: { "username": "gagugagana01@gmail.com", "password": "gagana12345" }
router.post('/setup-admin', registerAdmin);

module.exports = router;
