const mongoose = require('mongoose');

const donationSchema = mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    foodType: {
        type: String, // e.g., 'Cooked Food', 'Raw Groceries', 'Packaged Food'
        required: true
    },
    quantity: {
        type: String, // e.g., 'Enough for 10 people', '5 Kg'
        required: true
    },
    expiryTime: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    image: {
        type: String, // URL to uploaded image
        default: ''
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'assigned', 'completed'],
        default: 'pending' // Admin approves -> approved -> NGO requests -> admin assigns -> assigned -> NGO picks up -> completed
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);
module.exports = Donation;
