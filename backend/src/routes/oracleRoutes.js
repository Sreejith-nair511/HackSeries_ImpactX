const express = require('express');
const {
  submitOracleVote,
  getOracleVotes,
  getVoteResult
} = require('../controllers/oracleController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', getOracleVotes);
router.get('/result/:proofId', getVoteResult);

// Protected routes
router.post('/vote', authenticateToken, authorizeRole(['ORACLE']), submitOracleVote);

module.exports = router;