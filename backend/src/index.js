const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const { apiLimiter, sanitizeInput } = require('./middleware/security');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Apply global rate limiting
app.use(apiLimiter);

// Apply XSS sanitization
app.use(sanitizeInput);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/campaigns', require('./routes/campaignRoutes'));
app.use('/api/v1/donations', require('./routes/donationRoutes'));
app.use('/api/v1/proofs', require('./routes/proofRoutes'));
app.use('/api/v1/oracle', require('./routes/oracleRoutes'));

app.get('/', (req, res) => {
  res.json({ message: 'ImpactX API is running' });
});

// Health check endpoint
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;