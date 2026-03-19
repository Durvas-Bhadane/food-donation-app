const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['donor', 'ngo', 'admin'],
        required: true,
        default: 'donor'
    },
    address: {
        type: String,
        required: function () { return this.role === 'ngo' || this.role === 'donor'; }
    },
    city: {
        type: String,
        required: function () { return this.role === 'ngo' || this.role === 'donor'; }
    },
    contactNumber: {
        type: String,
        required: function () { return this.role === 'ngo' || this.role === 'donor'; }
    },
    ngoCertificate: {
        type: String, // URL to uploaded image (optional)
        default: ''
    },
    isApproved: {
        type: Boolean,
        default: function () { return this.role === 'donor' ? true : false; } // Admin approves NGOs
    }
}, { timestamps: true });

// Pre-save middleware to hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
