const express = require('express');
const {
  createDonation,
  getDonations,
  getDonationById
} = require('../controllers/donationController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Protected routes
router.post('/', authenticateToken, authorizeRole(['DONOR']), createDonation);
router.get('/', authenticateToken, getDonations);
router.get('/:id', authenticateToken, getDonationById);

module.exports = router;