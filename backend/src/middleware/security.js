const rateLimit = require('express-rate-limit');
const xss = require('xss');

// Rate limiting for auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for general API endpoints
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// XSS sanitization middleware
const sanitizeInput = (req, res, next) => {
  // Sanitize query parameters
  for (const key in req.query) {
    if (typeof req.query[key] === 'string') {
      req.query[key] = xss(req.query[key]);
    }
  }
  
  // Sanitize body parameters
  for (const key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = xss(req.body[key]);
    }
  }
  
  // Sanitize URL parameters
  for (const key in req.params) {
    if (typeof req.params[key] === 'string') {
      req.params[key] = xss(req.params[key]);
    }
  }
  
  next();
};

// File upload security middleware
const fileUploadSecurity = (req, res, next) => {
  // Check if file uploads are allowed for this route
  if (req.file || req.files) {
    // Add additional file security checks here if needed
    // For example, check file types, sizes, etc.
  }
  
  next();
};

module.exports = {
  authLimiter,
  apiLimiter,
  sanitizeInput,
  fileUploadSecurity
};