const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const readline = require('readline');
const User = require('./models/User');

dotenv.config();

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function resetPassword() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        const users = await User.find({}, 'email');
        console.log('Available Users:');
        users.forEach((u, i) => console.log(`${i + 1}. ${u.email}`));
        console.log('');

        const email = await question('Enter email of user to reset password: ');

        const user = await User.findOne({ email });
        if (!user) {
            console.log('❌ User not found!');
            process.exit(1);
        }

        const newPassword = await question('Enter new password: ');

        user.password = newPassword; // Will be hashed by pre-save hook
        await user.save();

        console.log(`\n✅ Password for ${email} has been reset successfully!`);
        console.log('You can now login with this new password.');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    } finally {
        rl.close();
    }
}

resetPassword();
