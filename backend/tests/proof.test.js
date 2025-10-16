const request = require('supertest');
const app = require('../src/index');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

describe('Proof API', () => {
  let ngoAuthToken;
  let testNgo;
  let testCampaign;

  beforeAll(async () => {
    // Create test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    testNgo = await prisma.user.create({
      data: {
        email: 'ngo-proof@test.com',
        password: hashedPassword,
        role: 'NGO'
      }
    });

    // Generate auth token
    ngoAuthToken = jwt.sign(
      { userId: testNgo.id, email: testNgo.email, role: testNgo.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Create a test campaign
    testCampaign = await prisma.campaign.create({
      data: {
        title: 'Test Campaign for Proofs',
        description: 'This is a test campaign for proofs',
        goal: 1000,
        ngoAddress: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12',
        creatorId: testNgo.id
      }
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.proof.deleteMany({
      where: {
        uploaderId: testNgo.id
      }
    });
    
    await prisma.campaign.delete({
      where: {
        id: testCampaign.id
      }
    });
    
    await prisma.user.delete({
      where: {
        id: testNgo.id
      }
    });
    
    await prisma.$disconnect();
  });

  describe('POST /api/v1/proofs', () => {
    it('should create a new proof successfully', async () => {
      const proofData = {
        description: 'Test proof of aid delivery',
        campaignId: testCampaign.id
      };

      const response = await request(app)
        .post('/api/v1/proofs')
        .set('Authorization', `Bearer ${ngoAuthToken}`)
        .send(proofData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Proof uploaded successfully');
      expect(response.body.proof).toHaveProperty('id');
      expect(response.body.proof).toHaveProperty('description', proofData.description);
      expect(response.body.proof).toHaveProperty('campaignId', proofData.campaignId);
      expect(response.body.proof).toHaveProperty('uploaderId', testNgo.id);
    });

    it('should fail to create proof without authentication', async () => {
      const proofData = {
        description: 'Test proof of aid delivery',
        campaignId: testCampaign.id
      };

      const response = await request(app)
        .post('/api/v1/proofs')
        .send(proofData)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });

    it('should fail to create proof with invalid data', async () => {
      const proofData = {
        description: '', // Invalid: empty description
        campaignId: '' // Invalid: empty campaignId
      };

      const response = await request(app)
        .post('/api/v1/proofs')
        .set('Authorization', `Bearer ${ngoAuthToken}`)
        .send(proofData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    it('should fail to create proof for non-existent campaign', async () => {
      const proofData = {
        description: 'Test proof of aid delivery',
        campaignId: 'non-existent-campaign-id'
      };

      const response = await request(app)
        .post('/api/v1/proofs')
        .set('Authorization', `Bearer ${ngoAuthToken}`)
        .send(proofData)
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Campaign not found');
    });
  });

  describe('GET /api/v1/proofs', () => {
    it('should retrieve all proofs', async () => {
      const response = await request(app)
        .get('/api/v1/proofs')
        .expect(200);

      expect(response.body).toHaveProperty('proofs');
      expect(Array.isArray(response.body.proofs)).toBe(true);
    });
  });

  describe('GET /api/v1/proofs/:id', () => {
    let proofId;

    beforeAll(async () => {
      // Create a test proof
      const proof = await prisma.proof.create({
        data: {
          description: 'Test proof for GET request',
          campaignId: testCampaign.id,
          uploaderId: testNgo.id
        }
      });
      proofId = proof.id;
    });

    it('should retrieve a specific proof by ID', async () => {
      const response = await request(app)
        .get(`/api/v1/proofs/${proofId}`)
        .expect(200);

      expect(response.body).toHaveProperty('proof');
      expect(response.body.proof).toHaveProperty('id', proofId);
      expect(response.body.proof).toHaveProperty('description', 'Test proof for GET request');
    });

    it('should return 404 for non-existent proof', async () => {
      const response = await request(app)
        .get('/api/v1/proofs/nonexistent-id')
        .expect(404);

      expect(response.body).toHaveProperty('error', 'Proof not found');
    });
  });
});