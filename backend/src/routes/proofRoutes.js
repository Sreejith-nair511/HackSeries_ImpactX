const express = require('express');
const {
  createProof,
  getProofs,
  getProofById
} = require('../controllers/proofController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getProofs);
router.get('/:id', getProofById);

// Protected routes
router.post('/', authenticateToken, authorizeRole(['NGO', 'ADMIN']), createProof);

module.exports = router;