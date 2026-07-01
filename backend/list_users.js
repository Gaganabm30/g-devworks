const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');

async function listUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        const users = await User.find({}, 'email role');
        console.log('Existing users in database:');
        console.log('='.repeat(50));
        users.forEach((user, index) => {
            console.log(`${index + 1}. Email: ${user.email}`);
            console.log(`   Role: ${user.role || 'admin'}`);
            console.log('-'.repeat(50));
        });

        console.log(`\nTotal users: ${users.length}`);

        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

listUsers();
