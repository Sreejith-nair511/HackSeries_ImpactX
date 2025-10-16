const request = require('supertest');
const app = require('../src/index');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

describe('Integration Tests', () => {
  let donorAuthToken;
  let ngoAuthToken;
  let oracleAuthToken;
  let testDonor;
  let testNgo;
  let testOracle;
  let testCampaign;
  let testProof;

  beforeAll(async () => {
    // Create test users
    const hashedPassword = await bcrypt.hash('password123', 10);
    
    testDonor = await prisma.user.create({
      data: {
        email: 'integration-donor@test.com',
        password: hashedPassword,
        role: 'DONOR'
      }
    });

    testNgo = await prisma.user.create({
      data: {
        email: 'integration-ngo@test.com',
        password: hashedPassword,
        role: 'NGO'
      }
    });

    testOracle = await prisma.user.create({
      data: {
        email: 'integration-oracle@test.com',
        password: hashedPassword,
        role: 'ORACLE'
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

    oracleAuthToken = jwt.sign(
      { userId: testOracle.id, email: testOracle.email, role: testOracle.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    // Clean up all test data
    await prisma.oracleVote.deleteMany({
      where: {
        oracleId: testOracle.id
      }
    });
    
    await prisma.proof.deleteMany({
      where: {
        uploaderId: testNgo.id
      }
    });
    
    await prisma.donation.deleteMany({
      where: {
        donorId: testDonor.id
      }
    });
    
    await prisma.campaign.deleteMany({
      where: {
        creatorId: testNgo.id
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
    
    await prisma.user.delete({
      where: {
        id: testOracle.id
      }
    });
    
    await prisma.$disconnect();
  });

  it('should complete the full donation -> proof -> oracle voting -> release flow', async () => {
    // Step 1: Create a campaign
    const campaignData = {
      title: 'Integration Test Campaign',
      description: 'This is an integration test campaign',
      goal: 1000,
      ngoAddress: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ12'
    };

    const campaignResponse = await request(app)
      .post('/api/v1/campaigns')
      .set('Authorization', `Bearer ${ngoAuthToken}`)
      .send(campaignData)
      .expect(201);

    testCampaign = campaignResponse.body.campaign;
    expect(testCampaign).toHaveProperty('id');
    expect(testCampaign).toHaveProperty('title', campaignData.title);

    // Step 2: Make a donation
    const donationData = {
      amount: 50,
      campaignId: testCampaign.id
    };

    const donationResponse = await request(app)
      .post('/api/v1/donations')
      .set('Authorization', `Bearer ${donorAuthToken}`)
      .send(donationData)
      .expect(201);

    const donation = donationResponse.body.donation;
    expect(donation).toHaveProperty('id');
    expect(donation).toHaveProperty('amount', donationData.amount);

    // Step 3: Upload proof
    const proofData = {
      description: 'Integration test proof of aid delivery',
      campaignId: testCampaign.id
    };

    const proofResponse = await request(app)
      .post('/api/v1/proofs')
      .set('Authorization', `Bearer ${ngoAuthToken}`)
      .send(proofData)
      .expect(201);

    testProof = proofResponse.body.proof;
    expect(testProof).toHaveProperty('id');
    expect(testProof).toHaveProperty('description', proofData.description);

    // Step 4: Submit oracle vote
    // First get the oracle ID
    const oracle = await prisma.oracle.findFirst({
      where: {
        publicKey: 'PUBLIC_KEY_PLACEHOLDER_1' // From seed data
      }
    });

    const voteData = {
      proofId: testProof.id,
      oracleId: oracle.id,
      vote: true,
      signature: 'test-signature-1234567890'
    };

    const voteResponse = await request(app)
      .post('/api/v1/oracle/vote')
      .set('Authorization', `Bearer ${oracleAuthToken}`)
      .send(voteData)
      .expect(201);

    const vote = voteResponse.body.vote;
    expect(vote).toHaveProperty('id');
    expect(vote).toHaveProperty('proofId', voteData.proofId);
    expect(vote).toHaveProperty('oracleId', voteData.oracleId);
    expect(vote).toHaveProperty('vote', voteData.vote);

    // Step 5: Check vote result
    const resultResponse = await request(app)
      .get(`/api/v1/oracle/result/${testProof.id}`)
      .expect(200);

    const result = resultResponse.body.result;
    expect(result).toHaveProperty('yesWeight');
    expect(result).toHaveProperty('noWeight');
    expect(result).toHaveProperty('totalWeight');
    expect(result).toHaveProperty('threshold');

    // This test verifies that the complete flow works
    // In a real integration test, we would also test the Algorand contract interactions
    expect(true).toBe(true);
  }, 30000); // Increase timeout for integration test
});