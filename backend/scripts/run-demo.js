#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 ImpactX Platform - Complete Demo Setup');
console.log('==========================================\n');

try {
  // 1. Ensure we're in the backend directory
  const backendDir = path.join(__dirname, '..');
  process.chdir(backendDir);
  console.log('📂 Working in backend directory');

  // 2. Check if database exists, if not create it
  console.log('\n🔧 Setting up database...');
  try {
    execSync('npx prisma migrate dev --name init_demo --skip-seed', { stdio: 'inherit' });
    console.log('✅ Database schema applied');
  } catch (error) {
    console.log('⚠️  Database migration skipped (might already exist)');
  }

  // 3. Seed the database with demo data
  console.log('\n🌱 Seeding database with demo data...');
  execSync('npm run demo-seed', { stdio: 'inherit' });
  console.log('✅ Demo data seeded successfully');

  // 4. Start the backend server
  console.log('\n📡 Starting backend server...');
  console.log('Backend server will start on http://localhost:5000');
  console.log('Use Ctrl+C to stop the server\n');
  
  // Start the server in the background
  const serverProcess = execSync('npm run dev', { stdio: 'inherit' });
  
  // 5. Instructions for frontend
  console.log('\n🌐 Frontend Setup Instructions:');
  console.log('1. Open a new terminal');
  console.log('2. Navigate to the frontend directory:');
  console.log('   cd ../frontend');
  console.log('3. Install dependencies if not already done:');
  console.log('   npm install');
  console.log('4. Start the frontend server:');
  console.log('   npm run dev');
  console.log('5. Open your browser to http://localhost:5173');
  
  // 6. Demo credentials
  console.log('\n🔐 Demo Credentials:');
  console.log('Donor Account:');
  console.log('  Email: donor@example.com');
  console.log('  Password: Password123!');
  console.log('\nNGO Account:');
  console.log('  Email: ngo@example.com');
  console.log('  Password: Password123!');
  console.log('\nAdmin Account:');
  console.log('  Email: admin@example.com');
  console.log('  Password: Password123!');
  console.log('\nOracle Accounts:');
  console.log('  Email: oracle1@example.com, oracle2@example.com, oracle3@example.com');
  console.log('  Password: Password123! (same for all)');
  
  // 7. Demo scenarios
  console.log('\n🎬 Demo Scenarios:');
  console.log('1. As a Donor:');
  console.log('   - Login with donor credentials');
  console.log('   - Navigate to Donate page');
  console.log('   - Connect wallet (simulated)');
  console.log('   - Make donations to campaigns');
  console.log('   - View donation history');
  console.log('\n2. As an NGO:');
  console.log('   - Login with NGO credentials');
  console.log('   - Create new campaigns');
  console.log('   - Upload proof documents');
  console.log('   - View campaign status');
  console.log('\n3. As an Oracle:');
  console.log('   - Login with oracle credentials');
  console.log('   - Review proof submissions');
  console.log('   - Submit verification votes');
  console.log('\n4. As an Admin:');
  console.log('   - Login with admin credentials');
  console.log('   - View all campaigns and donations');
  console.log('   - Manage users and oracles');
  
  // 8. Algorand blockchain simulation
  console.log('\n🔗 Algorand Blockchain Features:');
  console.log('- Simulated wallet connections (MyAlgo, WalletConnect)');
  console.log('- Simulated transactions with realistic IDs');
  console.log('- Escrow smart contracts for fund holding');
  console.log('- Multi-signature verification process');
  console.log('- Transparent transaction history');
  
  // 9. Data verification features
  console.log('\n🔍 Verification Features:');
  console.log('- Multi-oracle verification system');
  console.log('- IPFS storage for proof documents');
  console.log('- Blockchain anchoring of document hashes');
  console.log('- Weighted voting mechanism');
  console.log('- Real-time verification status updates');
  
  console.log('\n🎉 Demo setup complete!');
  console.log('The backend server is now running.');
  console.log('Follow the frontend instructions above to complete the setup.');

} catch (error) {
  console.error('❌ Error during demo setup:', error.message);
  process.exit(1);
}