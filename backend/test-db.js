const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testDB() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users in database:', users);
    
    const donor = await prisma.user.findUnique({
      where: { email: 'donor@example.com' }
    });
    console.log('Donor user:', donor);
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

testDB();