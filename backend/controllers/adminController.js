const User = require('../models/User');
const Donation = require('../models/Donation');
const NGORequest = require('../models/NGORequest');

// @desc    Get dashboard statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const totalDonors = await User.countDocuments({ role: 'donor' });
        const totalNGOs = await User.countDocuments({ role: 'ngo' });
        const totalDonations = await Donation.countDocuments();

        // Quantify impact (assume 1 donation is roughly 5 meals if not specified or specified simply by count of completed)
        const completedDonationsCount = await Donation.countDocuments({ status: 'completed' });
        const aggregateMeals = completedDonationsCount * 5; // Placeholder logic based on an average

        res.json({
            totalDonors,
            totalNGOs,
            totalDonations,
            completedDonations: completedDonationsCount,
            mealsServed: aggregateMeals,
            foodSavedKg: completedDonationsCount * 2.5 // Placeholder metric 2.5kg per donation avg
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users (donors and ngos)
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: { $ne: 'admin' } }).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve or Reject NGO
// @route   PUT /api/admin/users/:id/approve
// @access  Private/Admin
const approveNGO = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (user && user.role === 'ngo') {
            user.isApproved = req.body.isApproved; // true or false
            const updatedUser = await user.save();
            res.json({ message: `NGO ${req.body.isApproved ? 'Approved' : 'Rejected'}`, user: updatedUser });
        } else {
            res.status(404).json({ message: 'NGO not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all donations
// @route   GET /api/admin/donations
// @access  Private/Admin
const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find()
            .populate('donor', 'name email address city')
            .populate('assignedTo', 'name')
            .sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve/Reject new donation created by donor
// @route   PUT /api/admin/donations/:id/approve
// @access  Private/Admin
const verifyDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (donation) {
            donation.status = req.body.status; // 'approved' or 'rejected'
            const updatedDonation = await donation.save();
            res.json(updatedDonation);
        } else {
            res.status(404).json({ message: 'Donation not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get NGO Requests for donations
// @route   GET /api/admin/requests
// @access  Private/Admin
const getNGORequests = async (req, res) => {
    try {
        const requests = await NGORequest.find()
            .populate('ngo', 'name contactNumber')
            .populate('donation', 'foodType quantity address')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Assign donation to an NGO Request (Approve pick up)
// @route   PUT /api/admin/requests/:id/assign
// @access  Private/Admin
const assignDonation = async (req, res) => {
    try {
        const request = await NGORequest.findById(req.params.id).populate('donation');

        if (!request) {
            return res.status(404).json({ message: 'Request not found' });
        }

        // Update Request
        request.status = 'approved';
        await request.save();

        // Update Donation Status and Assign To
        request.donation.status = 'assigned';
        request.donation.assignedTo = request.ngo;
        await request.donation.save();

        // Reject other requests for the same donation
        await NGORequest.updateMany(
            { donation: request.donation._id, _id: { $ne: request._id } },
            { $set: { status: 'rejected' } }
        );

        res.json({ message: 'Donation successfully assigned', request });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// @desc    Delete a donation
// @route   DELETE /api/admin/donations/:id
// @access  Private/Admin
const deleteDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        // Also remove any NGO requests linked to this donation
        await NGORequest.deleteMany({ donation: donation._id });
        await Donation.findByIdAndDelete(req.params.id);

        res.json({ message: 'Donation removed successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAdminStats,
    getUsers,
    approveNGO,
    getAllDonations,
    verifyDonation,
    getNGORequests,
    assignDonation,
    deleteDonation
};
