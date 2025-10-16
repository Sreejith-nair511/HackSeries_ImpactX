const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// In-memory storage for proof uploads (mock database)
let proofUploads = [];

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Disaster Relief Escrow API is running' });
});

// Upload proof of aid delivery
app.post('/api/upload-proof', upload.single('proof'), (req, res) => {
  try {
    const { description } = req.body;
    const proofFile = req.file;

    // Store proof information
    const proofData = {
      id: Date.now().toString(),
      description,
      fileName: proofFile ? proofFile.filename : null,
      filePath: proofFile ? proofFile.path : null,
      uploadDate: new Date().toISOString()
    };

    proofUploads.push(proofData);

    res.status(201).json({
      message: 'Proof uploaded successfully',
      proof: proofData
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload proof' });
  }
});

// Get all proof uploads
app.get('/api/proofs', (req, res) => {
  res.json({ proofs: proofUploads });
});

// Handle donations
app.post('/api/donate', (req, res) => {
  try {
    const { amount } = req.body;
    
    // In a real implementation, this would interact with the Algorand blockchain
    console.log(`Processing donation of ${amount} ALGO`);
    
    // Mock successful donation
    res.status(200).json({
      message: 'Donation processed successfully',
      amount: amount,
      transactionId: 'MOCK_TX_ID_' + Date.now()
    });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ error: 'Failed to process donation' });
  }
});

// Get escrow status
app.get('/api/escrow-status', (req, res) => {
  // Mock escrow status - in a real implementation, this would interact with the Algorand blockchain
  res.json({
    balance: 1000, // Mock balance in microAlgos
    approvalStatus: 'pending', // 'pending' or 'approved'
    ngoAddress: 'NGO_ADDRESS_PLACEHOLDER'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});