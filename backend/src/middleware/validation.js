const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('role')
    .isIn(['ADMIN', 'NGO', 'ORACLE', 'DONOR'])
    .withMessage('Invalid role'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }
    next();
  }
];

const validateLogin = [
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('password')
    .notEmpty()
    .withMessage('Password is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }
    next();
  }
];

const validateCampaign = [
  body('title')
    .notEmpty()
    .isLength({ max: 100 })
    .withMessage('Title is required and must be less than 100 characters'),
  body('description')
    .notEmpty()
    .isLength({ max: 1000 })
    .withMessage('Description is required and must be less than 1000 characters'),
  body('goal')
    .isFloat({ min: 0.000001 })
    .withMessage('Goal must be a positive number'),
  body('ngoAddress')
    .notEmpty()
    .isLength({ min: 58, max: 58 })
    .withMessage('Invalid NGO address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }
    next();
  }
];

const validateDonation = [
  body('amount')
    .isFloat({ min: 0.000001 })
    .withMessage('Amount must be a positive number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }
    next();
  }
];

const validateProof = [
  body('description')
    .notEmpty()
    .isLength({ max: 1000 })
    .withMessage('Description is required and must be less than 1000 characters'),
  body('campaignId')
    .notEmpty()
    .withMessage('Campaign ID is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }
    next();
  }
];

const validateOracleVote = [
  body('proofId')
    .notEmpty()
    .withMessage('Proof ID is required'),
  body('oracleId')
    .notEmpty()
    .withMessage('Oracle ID is required'),
  body('vote')
    .isBoolean()
    .withMessage('Vote must be a boolean value'),
  body('signature')
    .notEmpty()
    .withMessage('Signature is required'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array() 
      });
    }
    next();
  }
];

module.exports = {
  validateRegistration,
  validateLogin,
  validateCampaign,
  validateDonation,
  validateProof,
  validateOracleVote
};