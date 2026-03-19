const Donation = require('../models/Donation');
const NGORequest = require('../models/NGORequest');

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private/Donor
const createDonation = async (req, res) => {
    try {
        const { foodType, quantity, expiryTime, address, city, image, description } = req.body;

        const donation = new Donation({
            donor: req.user._id,
            foodType,
            quantity,
            expiryTime,
            address,
            city,
            image,
            description,
            status: 'pending' // Admin must approve
        });

        const createdDonation = await donation.save();
        res.status(201).json(createdDonation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get donor's donations
// @route   GET /api/donations/my-donations
// @access  Private/Donor
const getMyDonations = async (req, res) => {
    try {
        const donations = await Donation.find({ donor: req.user._id }).sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all available APPROVED donations
// @route   GET /api/donations/available
// @access  Private/NGO
const getAvailableDonations = async (req, res) => {
    try {
        // Find all approved donations (frontend will show expired badge)
        const donations = await Donation.find({ status: 'approved' })
            .populate('donor', 'name contactNumber address city')
            .sort({ createdAt: -1 });
        res.json(donations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    NGO requests a donation pickup
// @route   POST /api/donations/:id/request
// @access  Private/NGO
const requestDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (!donation) {
            return res.status(404).json({ message: 'Donation not found' });
        }

        if (donation.status !== 'approved') {
            return res.status(400).json({ message: 'Donation is not available for pickup' });
        }

        const existingRequest = await NGORequest.findOne({ ngo: req.user._id, donation: donation._id });
        if (existingRequest) {
            return res.status(400).json({ message: 'You have already requested this donation' });
        }

        const request = new NGORequest({
            ngo: req.user._id,
            donation: donation._id,
            requestMessage: req.body.requestMessage || ''
        });

        const createdRequest = await request.save();
        res.status(201).json(createdRequest);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get NGO's requests
// @route   GET /api/donations/my-requests
// @access  Private/NGO
const getMyRequests = async (req, res) => {
    try {
        const requests = await NGORequest.find({ ngo: req.user._id })
            .populate('donation')
            .sort({ createdAt: -1 });
        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    NGO marks donation as picked up / completed
// @route   PUT /api/donations/:id/complete
// @access  Private/NGO
const completeDonation = async (req, res) => {
    try {
        const donation = await Donation.findById(req.params.id);

        if (donation && donation.assignedTo.toString() === req.user._id.toString()) {
            donation.status = 'completed';
            const updatedDonation = await donation.save();
            res.json(updatedDonation);
        } else {
            res.status(404).json({ message: 'Donation not found or not assigned to you' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createDonation,
    getMyDonations,
    getAvailableDonations,
    requestDonation,
    getMyRequests,
    completeDonation
};
