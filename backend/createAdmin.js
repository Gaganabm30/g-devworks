const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdminUser = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Check if admin already exists
        const existingAdmin = await User.findOne({ username: 'gagugagana01@gmail.com' });
        if (existingAdmin) {
            console.log('Admin user already exists! Updating password...');
            existingAdmin.password = 'gagana12345';
            await existingAdmin.save();
            console.log('Admin password updated successfully!');
            console.log('Username: gagugagana01@gmail.com');
            console.log('Password: gagana12345');
            process.exit(0);
        }

        // Create admin user with your credentials
        const admin = await User.create({
            username: 'gagugagana01@gmail.com',
            password: 'gagana12345'
        });

        console.log('Admin user created successfully!');
        console.log('Username: gagugagana01@gmail.com');
        console.log('Password: gagana12345');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdminUser();
