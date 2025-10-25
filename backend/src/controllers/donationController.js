const { PrismaClient } = require('@prisma/client');
const { validateDonation } = require('../middleware/validation');

const prisma = new PrismaClient();

const createDonation = [
  validateDonation,
  async (req, res) => {
    try {
      const { amount, campaignId } = req.body;
      const { user } = req;

      console.log('Creating donation with user:', user);

      // Check if user is authenticated
      if (!user) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Check if campaign exists (if provided)
      if (campaignId) {
        const campaign = await prisma.campaign.findUnique({
          where: { id: campaignId }
        });

        if (!campaign) {
          return res.status(404).json({ error: 'Campaign not found' });
        }
      }

      // Create the donation record
      const donationData = {
        amount: parseFloat(amount),
        donorId: user.id,
        status: 'completed' // Default to completed for demo purposes
      };

      // Add campaignId if provided
      if (campaignId) {
        donationData.campaignId = campaignId;
      }

      console.log('Donation data to create:', donationData);

      const donation = await prisma.donation.create({
        data: donationData,
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
    const { user } = req;

    // Check if user is authenticated
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    let whereClause = {};

    // If user is not admin, only show their own donations
    if (user.role !== 'ADMIN') {
      whereClause.donorId = user.id;
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
    const { user } = req;

    // Check if user is authenticated
    if (!user) {
      return res.status(401).json({ error: 'Authentication required' });
    }

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
    if (user.role !== 'ADMIN' && donation.donorId !== user.id) {
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