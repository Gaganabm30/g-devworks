const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const readline = require('readline');

dotenv.config();

// User Schema (same as in models/User.js)
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function createAdminUser() {
    try {
        // Connect to MongoDB
        if (!process.env.MONGO_URI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ Connected to MongoDB\n');

        // Get user input
        const email = await question('Enter admin email: ');
        const password = await question('Enter admin password: ');

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('\n❌ User with this email already exists!');
            process.exit(1);
        }

        // Create new user
        const user = new User({ email, password });
        await user.save();

        console.log('\n✅ Admin user created successfully!');
        console.log('Email:', email);
        console.log('\nYou can now login at /admin/login');

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    } finally {
        rl.close();
    }
}

createAdminUser();
