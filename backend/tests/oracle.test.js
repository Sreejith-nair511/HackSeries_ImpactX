const request = require('supertest');
const app = require('../src/index');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

describe('Oracle API', () => {
  let oracleAuthToken;
  let testOracle;
  let testProof;

  beforeAll(async () => {
    // Create test user with ORACLE role
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    testOracle = await prisma.user.create({
      data: {
        email: 'oracle@test.com',
        password: hashedPassword,
        role: 'ORACLE'
      }
    });

    // Generate auth token
    oracleAuthToken = jwt.sign(
      { userId: testOracle.id, email: testOracle.email, role: testOracle.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Create a test oracle
    const testOracleRecord = await prisma.oracle.create({
      data: {
        name: 'Test Oracle',
        publicKey: 'TEST_PUBLIC_KEY_1234567890',
        weight: 2
      }
    });

    // Create a test proof
    testProof = await prisma.proof.create({
      data: {
        description: 'Test proof for oracle voting',
        campaignId: 'test-campaign-id',
        uploaderId: testOracle.id
      }
    });
  });

  afterAll(async () => {
    // Clean up test data
    await prisma.oracleVote.deleteMany({
      where: {
        oracleId: testOracle.id
      }
    });
    
    await prisma.proof.delete({
      where: {
        id: testProof.id
      }
    });
    
    await prisma.oracle.deleteMany({
      where: {
        publicKey: 'TEST_PUBLIC_KEY_1234567890'
      }
    });
    
    await prisma.user.delete({
      where: {
        id: testOracle.id
      }
    });
    
    await prisma.$disconnect();
  });

  describe('POST /api/v1/oracle/vote', () => {
    it('should submit an oracle vote successfully', async () => {
      // First get the oracle ID
      const oracle = await prisma.oracle.findFirst({
        where: {
          publicKey: 'TEST_PUBLIC_KEY_1234567890'
        }
      });

      const voteData = {
        proofId: testProof.id,
        oracleId: oracle.id,
        vote: true,
        signature: 'test-signature-1234567890'
      };

      const response = await request(app)
        .post('/api/v1/oracle/vote')
        .set('Authorization', `Bearer ${oracleAuthToken}`)
        .send(voteData)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Oracle vote submitted successfully');
      expect(response.body.vote).toHaveProperty('id');
      expect(response.body.vote).toHaveProperty('proofId', voteData.proofId);
      expect(response.body.vote).toHaveProperty('oracleId', voteData.oracleId);
      expect(response.body.vote).toHaveProperty('vote', voteData.vote);
      expect(response.body.vote).toHaveProperty('signature', voteData.signature);
    });

    it('should fail to submit vote without authentication', async () => {
      const voteData = {
        proofId: testProof.id,
        oracleId: 'test-oracle-id',
        vote: true,
        signature: 'test-signature'
      };

      const response = await request(app)
        .post('/api/v1/oracle/vote')
        .send(voteData)
        .expect(401);

      expect(response.body).toHaveProperty('error', 'Access token required');
    });

    it('should fail to submit vote with invalid data', async () => {
      const voteData = {
        proofId: '', // Invalid: empty proofId
        oracleId: '', // Invalid: empty oracleId
        vote: 'invalid', // Invalid: not boolean
        signature: '' // Invalid: empty signature
      };

      const response = await request(app)
        .post('/api/v1/oracle/vote')
        .set('Authorization', `Bearer ${oracleAuthToken}`)
        .send(voteData)
        .expect(400);

      expect(response.body).toHaveProperty('error', 'Validation failed');
    });
  });

  describe('GET /api/v1/oracle', () => {
    it('should retrieve all oracle votes', async () => {
      const response = await request(app)
        .get('/api/v1/oracle')
        .expect(200);

      expect(response.body).toHaveProperty('votes');
      expect(Array.isArray(response.body.votes)).toBe(true);
    });
  });

  describe('GET /api/v1/oracle/result/:proofId', () => {
    it('should retrieve vote result for a proof', async () => {
      const response = await request(app)
        .get(`/api/v1/oracle/result/${testProof.id}`)
        .expect(200);

      expect(response.body).toHaveProperty('result');
      expect(response.body.result).toHaveProperty('yesWeight');
      expect(response.body.result).toHaveProperty('noWeight');
      expect(response.body.result).toHaveProperty('totalWeight');
      expect(response.body.result).toHaveProperty('threshold');
      expect(response.body.result).toHaveProperty('approved');
      expect(response.body.result).toHaveProperty('rejected');
      expect(response.body.result).toHaveProperty('pending');
    });
  });
});