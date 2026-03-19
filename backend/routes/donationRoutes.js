const express = require('express');
const router = express.Router();
const {
    createDonation,
    getMyDonations,
    getAvailableDonations,
    requestDonation,
    getMyRequests,
    completeDonation
} = require('../controllers/donationController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, authorize('donor'), createDonation);

router.route('/my-donations')
    .get(protect, authorize('donor'), getMyDonations);

router.route('/available')
    .get(protect, authorize('ngo', 'admin'), getAvailableDonations);

router.route('/:id/request')
    .post(protect, authorize('ngo'), requestDonation);

router.route('/my-requests')
    .get(protect, authorize('ngo'), getMyRequests);

router.route('/:id/complete')
    .put(protect, authorize('ngo'), completeDonation);

module.exports = router;
