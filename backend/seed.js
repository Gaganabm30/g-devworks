const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        const adminEmail = 'gagugagana01@gmail.com';
        const adminPassword = 'gagana12345';

        const user = await User.findOne({ email: adminEmail });

        if (user) {
            user.password = adminPassword;
            await user.save();
            console.log('Admin user updated successfully');
        } else {
            await User.create({
                email: adminEmail,
                password: adminPassword,
                role: 'admin',
            });
            console.log('Admin user created successfully');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
        throw error;
    }
};

const run = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
        await seedAdmin();
        process.exit();
    } catch (err) {
        console.error('Execution Error:', err);
        process.exit(1);
    }
};

run();
