const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Donation = require('./models/Donation');
const NGORequest = require('./models/NGORequest');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/annadata', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const importData = async () => {
    try {
        await User.deleteMany();
        await Donation.deleteMany();
        await NGORequest.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const adminUser = new User({
            name: 'System Admin',
            email: 'admin@annadata.in',
            password: hashedPassword, // explicitly hashed here vs pre-save? Actually User model has pre-save.
            // Wait, pre-save hook runs on User.create or new User().save()
            role: 'admin',
            address: 'Admin HQ',
            city: 'New Delhi',
            contactNumber: '0000000000',
            isApproved: true
        });

        // Let's use create so the pre-save hook hashes the raw password properly.
        await User.create({
            name: 'System Admin',
            email: 'admin@annadata.in',
            password: 'admin', // use simple password for testing
            role: 'admin',
            address: 'Admin HQ',
            city: 'New Delhi',
            contactNumber: '0000000000',
            isApproved: true
        });

        console.log('Sample Admin created. Email: admin@annadata.in, Password: admin');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
