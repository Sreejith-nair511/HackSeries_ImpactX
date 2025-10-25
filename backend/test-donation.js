const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testDonation() {
  try {
    // Login first
    const loginResponse = await fetch('http://localhost:5000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'donor@example.com',
        password: 'Password123!'
      }),
    });

    const loginData = await loginResponse.json();
    console.log('Login Response:', loginData);
    
    if (!loginResponse.ok) {
      console.log('Login failed');
      return;
    }
    
    const token = loginData.token;
    console.log('Token:', token);
    
    // Get campaigns
    const campaignsResponse = await fetch('http://localhost:5000/api/v1/campaigns');
    const campaignsData = await campaignsResponse.json();
    console.log('Campaigns:', campaignsData.campaigns[0]);
    
    // Create donation without campaignId
    console.log('\n--- Creating donation without campaignId ---');
    const donationResponse1 = await fetch('http://localhost:5000/api/v1/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: 100
      }),
    });
    
    const donationData1 = await donationResponse1.json();
    console.log('Donation Response (no campaignId):', donationData1);
    console.log('Donation Status:', donationResponse1.status);
    
    // Create donation with campaignId
    console.log('\n--- Creating donation with campaignId ---');
    const donationResponse2 = await fetch('http://localhost:5000/api/v1/donations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        amount: 100,
        campaignId: campaignsData.campaigns[0].id
      }),
    });
    
    const donationData2 = await donationResponse2.json();
    console.log('Donation Response (with campaignId):', donationData2);
    console.log('Donation Status:', donationResponse2.status);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

testDonation();