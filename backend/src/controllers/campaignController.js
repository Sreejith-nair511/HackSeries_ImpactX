const { PrismaClient } = require('@prisma/client');
const { validateCampaign } = require('../middleware/validation');

const prisma = new PrismaClient();

const createCampaign = [
  validateCampaign,
  async (req, res) => {
    try {
      const { title, description, goal, ngoAddress } = req.body;
      const { userId } = req.user;

      const campaign = await prisma.campaign.create({
        data: {
          title,
          description,
          goal: parseFloat(goal),
          ngoAddress,
          creatorId: userId
        }
      });

      res.status(201).json({
        message: 'Campaign created successfully',
        campaign
      });
    } catch (error) {
      console.error('Create campaign error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

const getCampaigns = async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      where: {
        status: 'active'
      },
      include: {
        creator: {
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

    res.json({ campaigns });
  } catch (error) {
    console.error('Get campaigns error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCampaignById = async (req, res) => {
  try {
    const { id } = req.params;

    const campaign = await prisma.campaign.findUnique({
      where: { id },
      include: {
        creator: {
          select: {
            id: true,
            email: true
          }
        },
        donations: {
          select: {
            id: true,
            amount: true,
            donor: {
              select: {
                id: true,
                email: true
              }
            },
            createdAt: true
          }
        },
        proofs: {
          select: {
            id: true,
            description: true,
            ipfsHash: true,
            status: true,
            createdAt: true
          }
        }
      }
    });

    if (!campaign) {
      return res.status(404).json({ error: 'Campaign not found' });
    }

    res.json({ campaign });
  } catch (error) {
    console.error('Get campaign error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateCampaign = [
  validateCampaign,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, goal, ngoAddress, status } = req.body;

      // Check if campaign exists and user is the creator
      const existingCampaign = await prisma.campaign.findUnique({
        where: { id }
      });

      if (!existingCampaign) {
        return res.status(404).json({ error: 'Campaign not found' });
      }

      if (existingCampaign.creatorId !== req.user.userId) {
        return res.status(403).json({ error: 'Not authorized to update this campaign' });
      }

      const campaign = await prisma.campaign.update({
        where: { id },
        data: {
          title,
          description,
          goal: goal ? parseFloat(goal) : undefined,
          ngoAddress,
          status
        }
      });

      res.json({
        message: 'Campaign updated successfully',
        campaign
      });
    } catch (error) {
      console.error('Update campaign error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
];

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign
};