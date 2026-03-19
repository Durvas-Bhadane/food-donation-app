const mongoose = require('mongoose');

const ngoRequestSchema = mongoose.Schema({
    ngo: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    donation: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Donation'
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'], // Admin approves the pickup request
        default: 'pending'
    },
    requestMessage: {
        type: String,
        default: ''
    }
}, { timestamps: true });

const NGORequest = mongoose.model('NGORequest', ngoRequestSchema);
module.exports = NGORequest;
