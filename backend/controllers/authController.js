const User = require('../models/User');
const bcrypt = require('bcryptjs');

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    console.log('Login attempt for:', username);
    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isMatch = await user.matchPassword(password);
        console.log('Password match result:', isMatch);

        if (isMatch) {
            res.json({
                _id: user._id,
                username: user.username,
                isAdmin: true // Explicitly flag as admin for frontend logic if needed
            });
        } else {
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: error.message });
    }
};

// Initial Admin Setup (Run once or manually)
exports.registerAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userExists = await User.findOne({ username });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        const user = await User.create({ username, password });
        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
