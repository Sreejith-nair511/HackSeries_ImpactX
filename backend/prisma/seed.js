// @ts-check
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed script...');
  
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log('Created admin user:', admin.email);

    // Create sample NGO user
    const ngoPassword = await bcrypt.hash('ngo123', 10);
    const ngo = await prisma.user.create({
      data: {
        email: 'ngo@example.com',
        password: ngoPassword,
        role: 'NGO',
      },
    });
    console.log('Created NGO user:', ngo.email);

    // Create sample donor user
    const donorPassword = await bcrypt.hash('donor123', 10);
    const donor = await prisma.user.create({
      data: {
        email: 'donor@example.com',
        password: donorPassword,
        role: 'DONOR',
      },
    });
    console.log('Created donor user:', donor.email);

    // Create sample oracle
    const oracle = await prisma.oracle.create({
      data: {
        name: 'Drone Oracle',
        publicKey: 'PUBLIC_KEY_PLACEHOLDER_1',
        weight: 2,
      },
    });
    console.log('Created oracle:', oracle.name);

    // Create another oracle
    const oracle2 = await prisma.oracle.create({
      data: {
        name: 'Satellite Oracle',
        publicKey: 'PUBLIC_KEY_PLACEHOLDER_2',
        weight: 3,
      },
    });
    console.log('Created oracle:', oracle2.name);

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Disconnected from database');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });