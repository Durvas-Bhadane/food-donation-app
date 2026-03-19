const express = require('express');
const router = express.Router();
const {
    getAdminStats,
    getUsers,
    approveNGO,
    getAllDonations,
    verifyDonation,
    getNGORequests,
    assignDonation,
    deleteDonation
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/stats')
    .get(protect, authorize('admin'), getAdminStats);

router.route('/users')
    .get(protect, authorize('admin'), getUsers);

router.route('/users/:id/approve')
    .put(protect, authorize('admin'), approveNGO);

router.route('/donations')
    .get(protect, authorize('admin'), getAllDonations);

router.route('/donations/:id/approve')
    .put(protect, authorize('admin'), verifyDonation);

router.route('/donations/:id')
    .delete(protect, authorize('admin'), deleteDonation);

router.route('/requests')
    .get(protect, authorize('admin'), getNGORequests);

router.route('/requests/:id/assign')
    .put(protect, authorize('admin'), assignDonation);

module.exports = router;
