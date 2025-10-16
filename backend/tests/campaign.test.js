const request = require('supertest');
const app = require('../src/index');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

describe('Campaign API', () => {
  let authToken;
  let testUser;

  beforeAll(async () => {
    // Create a test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    testUser = await prisma.user.create({
      data: {
        email: 'campaign@test.com',
        password: hashedPassword,
        role: 'NGO'
      }
    });

    // Generate auth token
    authToken = jwt.sign(
      { userId: testUser.id, email: testUser.email, role: testUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.campaign.deleteMany({
      where: {
        creatorId: testUser.id
      }
    });
    
    await prisma.user.delete({
      where: {
        id: testUser.id
      }
    });
    
    await prisma.$disconnect();
  });

  describe('POST /api/v1/campaigns', () => {
    it('should create a new campaign successfully', async () => {
      const campaignData = {
        title: 'Test Campaign',
        description: 'This is a test campaign',
        goal: 1000,
        ngoAddress: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12'
      };

      const response = await request(app)
        .post('/api/v1/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send(campaignData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Campaign created successfully');
      expect(response.body.campaign).toHaveProperty('id');
      expect(response.body.campaign).toHaveProperty('title', campaignData.title);
      expect(response.body.campaign).toHaveProperty('description', campaignData.description);
      expect(response.body.campaign).toHaveProperty('goal', campaignData.goal);
      expect(response.body.campaign).toHaveProperty('ngoAddress', campaignData.ngoAddress);
    });

    it('should fail to create campaign without authentication', async () => {
      const campaignData = {
        title: 'Test Campaign',
        description: 'This is a test campaign',
        goal: 1000,
        ngoAddress: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12'
      };

      const response = await request(app)
        .post('/api/v1/campaigns')
        .send(campaignData)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });

    it('should fail to create campaign with invalid data', async () => {
      const campaignData = {
        title: '', // Invalid: empty title
        description: 'This is a test campaign',
        goal: -100, // Invalid: negative goal
        ngoAddress: 'invalid' // Invalid: too short
      };

      const response = await request(app)
        .post('/api/v1/campaigns')
        .set('Authorization', `Bearer ${authToken}`)
        .send(campaignData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
    });
  });

  describe('GET /api/v1/campaigns', () => {
    it('should retrieve all campaigns', async () => {
      const response = await request(app)
        .get('/api/v1/campaigns')
        .expect(200);

      expect(response.body).toHaveProperty('campaigns');
      expect(Array.isArray(response.body.campaigns)).toBe(true);
    });
  });

  describe('GET /api/v1/campaigns/:id', () => {
    let campaignId;

    beforeAll(async () => {
      // Create a test campaign
      const campaign = await prisma.campaign.create({
        data: {
          title: 'Test Campaign for GET',
          description: 'This is a test campaign for GET request',
          goal: 500,
          ngoAddress: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12',
          creatorId: testUser.id
        }
      });
      campaignId = campaign.id;
    });

    it('should retrieve a specific campaign by ID', async () => {
      const response = await request(app)
        .get(`/api/v1/campaigns/${campaignId}`)
        .expect(200);

      expect(response.body).toHaveProperty('campaign');
      expect(response.body.campaign).toHaveProperty('id', campaignId);
      expect(response.body.campaign).toHaveProperty('title', 'Test Campaign for GET');
    });

    it('should return 404 for non-existent campaign', async () => {
      const response = await request(app)
        .get('/api/v1/campaigns/nonexistent-id')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Campaign not found');
    });
  });
});