const bcrypt = require('bcryptjs');

const generateHash = async () => {
    const password = 'gagana12345';
    const hash = await bcrypt.hash(password, 10);
    console.log('Password:', password);
    console.log('Hash:', hash);
    console.log('\nCopy this hash to MongoDB Atlas if needed');
};

generateHash();
