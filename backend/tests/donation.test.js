const request = require('supertest');
const app = require('../src/index');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

describe('Donation API', () => {
  let donorAuthToken;
  let ngoAuthToken;
  let testDonor;
  let testNgo;
  let testCampaign;

  beforeAll(async () => {
    // Create test users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    testDonor = await prisma.user.create({
      data: {
        email: 'donor@test.com',
        password: hashedPassword,
        role: 'DONOR'
      }
    });

    testNgo = await prisma.user.create({
      data: {
        email: 'ngo@test.com',
        password: hashedPassword,
        role: 'NGO'
      }
    });

    // Generate auth tokens
    donorAuthToken = jwt.sign(
      { userId: testDonor.id, email: testDonor.email, role: testDonor.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    ngoAuthToken = jwt.sign(
      { userId: testNgo.id, email: testNgo.email, role: testNgo.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Create a test campaign
    testCampaign = await prisma.campaign.create({
      data: {
        title: 'Test Campaign for Donations',
        description: 'This is a test campaign for donations',
        goal: 1000,
        ngoAddress: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12',
        creatorId: testNgo.id
      }
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.donation.deleteMany({
      where: {
        donorId: testDonor.id
      }
    });
    
    await prisma.campaign.delete({
      where: {
        id: testCampaign.id
      }
    });
    
    await prisma.user.delete({
      where: {
        id: testDonor.id
      }
    });
    
    await prisma.user.delete({
      where: {
        id: testNgo.id
      }
    });
    
    await prisma.$disconnect();
  });

  describe('POST /api/v1/donations', () => {
    it('should create a new donation successfully', async () => {
      const donationData = {
        amount: 50,
        campaignId: testCampaign.id
      };

      const response = await request(app)
        .post('/api/v1/donations')
        .set('Authorization', `Bearer ${donorAuthToken}`)
        .send(donationData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Donation created successfully');
      expect(response.body.donation).toHaveProperty('id');
      expect(response.body.donation).toHaveProperty('amount', donationData.amount);
      expect(response.body.donation).toHaveProperty('campaignId', donationData.campaignId);
      expect(response.body.donation).toHaveProperty('donorId', testDonor.id);
    });

    it('should fail to create donation without authentication', async () => {
      const donationData = {
        amount: 50,
        campaignId: testCampaign.id
      };

      const response = await request(app)
        .post('/api/v1/donations')
        .send(donationData)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });

    it('should fail to create donation with invalid data', async () => {
      const donationData = {
        amount: -50, // Invalid: negative amount
        campaignId: '' // Invalid: empty campaignId
      };

      const response = await request(app)
        .post('/api/v1/donations')
        .set('Authorization', `Bearer ${donorAuthToken}`)
        .send(donationData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    it('should fail to create donation for non-existent campaign', async () => {
      const donationData = {
        amount: 50,
        campaignId: 'non-existent-campaign-id'
      };

      const response = await request(app)
        .post('/api/v1/donations')
        .set('Authorization', `Bearer ${donorAuthToken}`)
        .send(donationData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Campaign not found');
    });
  });

  describe('GET /api/v1/donations', () => {
    it('should retrieve donations for authenticated donor', async () => {
      const response = await request(app)
        .get('/api/v1/donations')
        .set('Authorization', `Bearer ${donorAuthToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('donations');
      expect(Array.isArray(response.body.donations)).toBe(true);
    });

    it('should fail to retrieve donations without authentication', async () => {
      const response = await request(app)
        .get('/api/v1/donations')
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });
  });
});