// Simple test script to verify API endpoints
// Using built-in fetch API (Node.js 18+)

async function testAPI() {
  console.log('Testing Disaster Relief Escrow API...\n');
  
  // Test health check endpoint
  try {
    const healthResponse = await fetch('http://localhost:5000/');
    const healthData = await healthResponse.json();
    console.log('Health Check:', healthData);
  } catch (error) {
    console.error('Health Check Failed:', error.message);
  }
  
  // Test escrow status endpoint
  try {
    const statusResponse = await fetch('http://localhost:5000/api/escrow-status');
    const statusData = await statusResponse.json();
    console.log('\nEscrow Status:', statusData);
  } catch (error) {
    console.error('Escrow Status Failed:', error.message);
  }
  
  // Test proofs endpoint
  try {
    const proofsResponse = await fetch('http://localhost:5000/api/proofs');
    const proofsData = await proofsResponse.json();
    console.log('\nProofs:', proofsData);
  } catch (error) {
    console.error('Proofs Failed:', error.message);
  }
  
  console.log('\nAPI Test Complete!');
}

testAPI();