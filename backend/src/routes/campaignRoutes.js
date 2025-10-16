const express = require('express');
const {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign
} = require('../controllers/campaignController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getCampaigns);
router.get('/:id', getCampaignById);

// Protected routes
router.post('/', authenticateToken, authorizeRole(['ADMIN', 'NGO']), createCampaign);
router.put('/:id', authenticateToken, authorizeRole(['ADMIN', 'NGO']), updateCampaign);

module.exports = router;