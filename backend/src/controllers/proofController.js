const { PrismaClient } = require('@prisma/client');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { validateProof } = require('../middleware/validation');
const IPFSService = require('../services/ipfsService');

const prisma = new PrismaClient();
const ipfsService = new IPFSService();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images and PDFs only
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only image and PDF files are allowed'));
    }
  }
});

const createProof = [
  validateProof,
  upload.single('proof'),
  async (req, res) => {
    try {
      const { description, campaignId } = req.body;
      const { userId } = req.user;
      const proofFile = req.file;

      // Check if campaign exists
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId }
      });

      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }

      // Check if user is authorized (NGO or ADMIN)
      if (req.user.role !== 'NGO' && req.user.role !== 'ADMIN') {
        return res.status(403).json({ error: 'Not authorized to upload proof' });
      }

      let ipfsHash = null;
      let ipfsUrl = null;

      // Upload file to IPFS if provided
      if (proofFile) {
        try {
          const result = await ipfsService.pinFile(proofFile.path, proofFile.originalname);
          ipfsHash = result.hash;
          ipfsUrl = result.url;
          
          // Clean up local file after IPFS upload
          fs.unlinkSync(proofFile.path);
        } catch (ipfsError) {
          console.error('IPFS upload error:', ipfsError);
          // Continue without IPFS hash if upload fails
        }
      }

      const proof = await prisma.proof.create({
        data: {
          description,
          ipfsHash,
          campaignId,
          uploaderId: userId
        }
      });

      res.status(201).json({
        message: 'Proof uploaded successfully',
        proof: {
          ...proof,
          ipfsUrl
        }
      });
    } catch (error) {
      console.error('Create proof error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

const getProofs = async (req, res) => {
  try {
    const { campaignId } = req.query;

    let whereClause = {};

    if (campaignId) {
      whereClause.campaignId = campaignId;
    }

    const proofs = await prisma.proof.findMany({
      where: whereClause,
      include: {
        campaign: {
          select: {
            id: true,
            title: true
          }
        },
        uploader: {
          select: {
            id: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Add IPFS URLs to proofs
    const proofsWithUrls = proofs.map(proof => ({
      ...proof,
      ipfsUrl: proof.ipfsHash ? `https://gateway.pinata.cloud/ipfs/${proof.ipfsHash}` : null
    }));

    res.json({ proofs: proofsWithUrls });
  } catch (error) {
    console.error('Get proofs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProofById = async (req, res) => {
  try {
    const { id } = req.params;

    const proof = await prisma.proof.findUnique({
      where: { id },
      include: {
        campaign: {
          select: {
            id: true,
            title: true
          }
        },
        uploader: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    if (!proof) {
      return res.status(404).json({ error: 'Proof not found' });
    }

    // Add IPFS URL to proof
    const proofWithUrl = {
      ...proof,
      ipfsUrl: proof.ipfsHash ? `https://gateway.pinata.cloud/ipfs/${proof.ipfsHash}` : null
    };

    res.json({ proof: proofWithUrl });
  } catch (error) {
    console.error('Get proof error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createProof,
  getProofs,
  getProofById,
  upload
};