const { PrismaClient } = require('@prisma/client');
const { validateDonation } = require('../middleware/validation');

const prisma = new PrismaClient();

const createDonation = [
  validateDonation,
  async (req, res) => {
    try {
      const { amount, campaignId } = req.body;
      const { userId } = req.user;

      // Check if campaign exists
      const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId }
      });

      if (!campaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }

      const donation = await prisma.donation.create({
        data: {
          amount: parseFloat(amount),
          donorId: userId,
          campaignId
        }
      });

      res.status(201).json({
        message: 'Donation created successfully',
        donation
      });
    } catch (error) {
      console.error('Create donation error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

const getDonations = async (req, res) => {
  try {
    const { campaignId } = req.query;
    const { userId, role } = req.user;

    let whereClause = {};

    // If user is not admin, only show their own donations
    if (role !== 'ADMIN') {
      whereClause.donorId = userId;
    }

    // If campaignId is provided, filter by campaign
    if (campaignId) {
      whereClause.campaignId = campaignId;
    }

    const donations = await prisma.donation.findMany({
      where: whereClause,
      include: {
        donor: {
          select: {
            id: true,
            email: true
          }
        },
        campaign: {
          select: {
            id: true,
            title: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json({ donations });
  } catch (error) {
    console.error('Get donations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getDonationById = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, role } = req.user;

    const donation = await prisma.donation.findUnique({
      where: { id },
      include: {
        donor: {
          select: {
            id: true,
            email: true
          }
        },
        campaign: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });

    if (!donation) {
      return res.status(404).json({ error: 'Donation not found' });
    }

    // Check if user is authorized to view this donation
    if (role !== 'ADMIN' && donation.donorId !== userId) {
      return res.status(403).json({ error: 'Not authorized to view this donation' });
    }

    res.json({ donation });
  } catch (error) {
    console.error('Get donation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createDonation,
  getDonations,
  getDonationById
};