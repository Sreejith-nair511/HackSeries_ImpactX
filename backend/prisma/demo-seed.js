const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  // Clear existing data in correct order to avoid foreign key constraint violations
  await prisma.donation.deleteMany();
  await prisma.oracleVote.deleteMany();
  await prisma.proof.deleteMany();
  await prisma.escrow.deleteMany();
  await prisma.oracle.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.user.deleteMany();

  console.log('Existing data cleared');

  // Create users with different roles
  const saltRounds = 10;
  const donorPassword = await bcrypt.hash('Password123!', saltRounds);
  const ngoPassword = await bcrypt.hash('Password123!', saltRounds);
  const adminPassword = await bcrypt.hash('Password123!', saltRounds);
  const oraclePassword = await bcrypt.hash('Password123!', saltRounds);

  const donor = await prisma.user.create({
    data: {
      email: 'donor@example.com',
      password: donorPassword,
      role: 'DONOR'
    }
  });

  const ngo = await prisma.user.create({
    data: {
      email: 'ngo@example.com',
      password: ngoPassword,
      role: 'NGO'
    }
  });

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  });

  const oracle1 = await prisma.user.create({
    data: {
      email: 'oracle1@example.com',
      password: oraclePassword,
      role: 'ORACLE'
    }
  });

  const oracle2 = await prisma.user.create({
    data: {
      email: 'oracle2@example.com',
      password: oraclePassword,
      role: 'ORACLE'
    }
  });

  const oracle3 = await prisma.user.create({
    data: {
      email: 'oracle3@example.com',
      password: oraclePassword,
      role: 'ORACLE'
    }
  });

  console.log('Users created');

  // Create oracles (verification entities)
  const ndrfOracle = await prisma.oracle.create({
    data: {
      name: 'National Disaster Response Force',
      publicKey: 'NDRF-PUB-KEY-123456789',
      weight: 3,
      active: true
    }
  });

  const isroOracle = await prisma.oracle.create({
    data: {
      name: 'ISRO Satellite Data',
      publicKey: 'ISRO-PUB-KEY-987654321',
      weight: 2,
      active: true
    }
  });

  const droneOracle = await prisma.oracle.create({
    data: {
      name: 'Drone Surveillance Team',
      publicKey: 'DRONE-PUB-KEY-456789123',
      weight: 1,
      active: true
    }
  });

  console.log('Oracles created');

  // Create campaigns with realistic Indian disaster scenarios
  const keralaFloods = await prisma.campaign.create({
    data: {
      title: 'Kerala Flood Relief 2025',
      description: 'Providing emergency aid and rehabilitation support to flood-affected families in Kerala. This campaign focuses on immediate relief through food, shelter, and medical assistance, followed by long-term rebuilding efforts.',
      goal: 5000000,
      ngoAddress: 'Kerala-Relief-Fund-Address-12345',
      status: 'active',
      creatorId: ngo.id
    }
  });

  const rajasthanDrought = await prisma.campaign.create({
    data: {
      title: 'Rajasthan Drought Support',
      description: 'Water conservation and distribution in drought-prone areas of Rajasthan. This campaign aims to provide sustainable water solutions and support farming communities affected by prolonged drought conditions.',
      goal: 3000000,
      ngoAddress: 'Rajasthan-Water-Initiative-Address-67890',
      status: 'active',
      creatorId: ngo.id
    }
  });

  const uttarakhandEarthquake = await prisma.campaign.create({
    data: {
      title: 'Uttarakhand Earthquake Recovery',
      description: 'Rebuilding homes and infrastructure after the recent earthquake in Uttarakhand. This campaign focuses on reconstructing damaged homes, schools, and community centers to help communities rebuild their lives.',
      goal: 8000000,
      ngoAddress: 'Uttarakhand-Reconstruction-Trust-Address-54321',
      status: 'completed',
      creatorId: ngo.id
    }
  });

  console.log('Campaigns created');

  // Create escrows for campaigns
  await prisma.escrow.create({
    data: {
      campaignId: keralaFloods.id,
      appId: 123456789,
      escrowAddress: 'ESCROW-ADDRESS-KERALA-98765',
      balance: 3750000,
      status: 'active'
    }
  });

  await prisma.escrow.create({
    data: {
      campaignId: rajasthanDrought.id,
      appId: 987654321,
      escrowAddress: 'ESCROW-ADDRESS-RAJASTHAN-45678',
      balance: 2850000,
      status: 'active'
    }
  });

  await prisma.escrow.create({
    data: {
      campaignId: uttarakhandEarthquake.id,
      appId: 456789123,
      escrowAddress: 'ESCROW-ADDRESS-UTTARAKHAND-32165',
      balance: 0,
      status: 'completed'
    }
  });

  console.log('Escrows created');

  // Create donations with realistic amounts
  const donations = [
    { amount: 50000, donorId: donor.id, campaignId: keralaFloods.id },
    { amount: 100000, donorId: donor.id, campaignId: keralaFloods.id },
    { amount: 25000, donorId: donor.id, campaignId: keralaFloods.id },
    { amount: 75000, donorId: donor.id, campaignId: rajasthanDrought.id },
    { amount: 150000, donorId: donor.id, campaignId: rajasthanDrought.id },
    { amount: 200000, donorId: donor.id, campaignId: uttarakhandEarthquake.id },
    { amount: 500000, donorId: donor.id, campaignId: uttarakhandEarthquake.id },
    { amount: 1000000, donorId: donor.id, campaignId: uttarakhandEarthquake.id }
  ];

  for (const donationData of donations) {
    await prisma.donation.create({
      data: donationData
    });
  }

  console.log('Donations created');

  // Create proofs with realistic descriptions
  const keralaProof = await prisma.proof.create({
    data: {
      description: 'Distribution of emergency relief kits to 500 families in Alappuzha district. Each kit contains food supplies for 1 week, clean water packets, and basic medical supplies.',
      ipfsHash: 'QmTJzHx8J4Zp1Cv5kx8q9J2k3m4n5p6q7r8s9t0u1v2w3x4y5z6',
      campaignId: keralaFloods.id,
      uploaderId: ngo.id,
      status: 'verified'
    }
  });

  const rajasthanProof = await prisma.proof.create({
    data: {
      description: 'Installation of 5 community water purification systems in Jaisalmer district. Each system can serve up to 200 families daily with clean drinking water.',
      ipfsHash: 'QmR9zGx7K5N4M3L2P1O0n9m8l7k6j5h4g3f2d1s0a9z8y7x6w5',
      campaignId: rajasthanDrought.id,
      uploaderId: ngo.id,
      status: 'pending'
    }
  });

  const uttarakhandProof = await prisma.proof.create({
    data: {
      description: 'Completion of 50 rebuilt homes in Chamoli district. All homes constructed with earthquake-resistant materials and designs, each house can accommodate a family of 5.',
      ipfsHash: 'QmP5O4N3M2L1K0J9I8H7G6F5D4C3B2A1z0y9x8w7v6u5t4s3r2',
      campaignId: uttarakhandEarthquake.id,
      uploaderId: ngo.id,
      status: 'verified'
    }
  });

  console.log('Proofs created');

  // Create oracle votes for proofs
  // Kerala proof - all oracles vote positive
  await prisma.oracleVote.create({
    data: {
      proofId: keralaProof.id,
      oracleId: ndrfOracle.id,
      vote: true,
      signature: 'NDRF-SIGNATURE-FOR-KERALA-PROOF-12345'
    }
  });

  await prisma.oracleVote.create({
    data: {
      proofId: keralaProof.id,
      oracleId: isroOracle.id,
      vote: true,
      signature: 'ISRO-SIGNATURE-FOR-KERALA-PROOF-67890'
    }
  });

  await prisma.oracleVote.create({
    data: {
      proofId: keralaProof.id,
      oracleId: droneOracle.id,
      vote: true,
      signature: 'DRONE-SIGNATURE-FOR-KERALA-PROOF-54321'
    }
  });

  // Rajasthan proof - mixed votes
  await prisma.oracleVote.create({
    data: {
      proofId: rajasthanProof.id,
      oracleId: ndrfOracle.id,
      vote: true,
      signature: 'NDRF-SIGNATURE-FOR-RAJASTHAN-PROOF-98765'
    }
  });

  await prisma.oracleVote.create({
    data: {
      proofId: rajasthanProof.id,
      oracleId: isroOracle.id,
      vote: false,
      signature: 'ISRO-SIGNATURE-FOR-RAJASTHAN-PROOF-43210'
    }
  });

  await prisma.oracleVote.create({
    data: {
      proofId: rajasthanProof.id,
      oracleId: droneOracle.id,
      vote: true,
      signature: 'DRONE-SIGNATURE-FOR-RAJASTHAN-PROOF-87654'
    }
  });

  // Uttarakhand proof - all oracles vote positive
  await prisma.oracleVote.create({
    data: {
      proofId: uttarakhandProof.id,
      oracleId: ndrfOracle.id,
      vote: true,
      signature: 'NDRF-SIGNATURE-FOR-UTTARAKHAND-PROOF-32109'
    }
  });

  await prisma.oracleVote.create({
    data: {
      proofId: uttarakhandProof.id,
      oracleId: isroOracle.id,
      vote: true,
      signature: 'ISRO-SIGNATURE-FOR-UTTARAKHAND-PROOF-76543'
    }
  });

  await prisma.oracleVote.create({
    data: {
      proofId: uttarakhandProof.id,
      oracleId: droneOracle.id,
      vote: true,
      signature: 'DRONE-SIGNATURE-FOR-UTTARAKHAND-PROOF-21098'
    }
  });

  console.log('Oracle votes created');

  console.log('Demo data seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });