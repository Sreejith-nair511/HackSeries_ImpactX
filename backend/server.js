const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Generate extensive mock data
function generateMockData() {
  const campaigns = [];
  const donations = [];
  const proofs = [];
  const users = [];
  
  // Generate 50 campaigns
  const disasterTypes = ['Flood', 'Earthquake', 'Cyclone', 'Drought', 'Landslide', 'Fire'];
  const ngos = [
    'National Disaster Response Force',
    'State Disaster Management Authority',
    'Red Cross Society',
    'UNICEF',
    'World Food Programme',
    'Oxfam',
    'CARE International',
    'Save the Children',
    'ActionAid',
    'Plan International'
  ];
  const locations = [
    'Kerala', 'Rajasthan', 'Uttarakhand', 'Assam', 'Odisha', 
    'Bihar', 'Gujarat', 'Maharashtra', 'Tamil Nadu', 'West Bengal',
    'Andhra Pradesh', 'Telangana', 'Karnataka', 'Madhya Pradesh', 'Chhattisgarh'
  ];
  
  for (let i = 1; i <= 50; i++) {
    const disasterType = disasterTypes[Math.floor(Math.random() * disasterTypes.length)];
    const ngo = ngos[Math.floor(Math.random() * ngos.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const goal = Math.floor(Math.random() * 10000000) + 1000000; // 10L to 1Cr
    const raised = Math.floor(Math.random() * goal);
    const status = raised >= goal ? 'completed' : 'active';
    
    campaigns.push({
      id: i,
      title: `${location} ${disasterType} Relief Campaign ${i}`,
      description: `Providing emergency aid and long-term recovery support for families affected by the ${disasterType.toLowerCase()} in ${location}. This campaign focuses on immediate relief through food, shelter, and medical assistance, followed by reconstruction efforts.`,
      goal: goal,
      raised: raised,
      image: `https://picsum.photos/seed/campaign${i}/800/400`,
      ngo: ngo,
      status: status,
      startDate: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      endDate: status === 'completed' ? `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}` : null
    });
  }
  
  // Generate 500 donations
  const donors = [
    'Anonymous Donor', 'Corporate Foundation', 'Individual Contributor', 
    'Government Grant', 'International Aid', 'Community Fund', 'Charity Organization'
  ];
  
  for (let i = 1; i <= 500; i++) {
    const campaignId = Math.floor(Math.random() * 50) + 1;
    const amount = Math.floor(Math.random() * 100000) + 1000; // 1000 to 1L
    const donor = donors[Math.floor(Math.random() * donors.length)];
    
    donations.push({
      id: i,
      campaignId: campaignId,
      amount: amount,
      donor: donor,
      date: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      message: `Supporting relief efforts for campaign ${campaignId}`
    });
  }
  
  // Generate 150 proofs
  const proofTitles = [
    'Food Distribution', 'Medical Camp', 'Shelter Construction', 
    'Water Supply Restoration', 'School Reconstruction', 
    'Road Repair', 'Bridge Construction', 'Emergency Evacuation'
  ];
  
  for (let i = 1; i <= 150; i++) {
    const campaignId = Math.floor(Math.random() * 50) + 1;
    const title = proofTitles[Math.floor(Math.random() * proofTitles.length)];
    
    proofs.push({
      id: i,
      campaignId: campaignId,
      title: `${title} - Phase ${Math.floor(Math.random() * 3) + 1}`,
      description: `Successfully completed ${title.toLowerCase()} activities benefiting approximately ${Math.floor(Math.random() * 500) + 100} families in the affected region.`,
      date: `2023-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      imageUrl: `https://picsum.photos/seed/proof${i}/600/300`
    });
  }
  
  // Generate 20 users
  const roles = ['admin', 'ngo', 'volunteer', 'donor'];
  for (let i = 1; i <= 20; i++) {
    users.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      role: roles[Math.floor(Math.random() * roles.length)]
    });
  }
  
  return { campaigns, donations, proofs, users };
}

// Initialize mock data
let { campaigns, donations, proofs, users } = generateMockData();

// Routes

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Disaster Relief Escrow API is running' });
});

// Get all campaigns with pagination
app.get('/api/campaigns', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedCampaigns = campaigns.slice(startIndex, endIndex);
  const totalPages = Math.ceil(campaigns.length / limit);
  
  res.json({ 
    campaigns: paginatedCampaigns,
    pagination: {
      currentPage: page,
      totalPages: totalPages,
      totalItems: campaigns.length,
      itemsPerPage: limit
    }
  });
});

// Get campaign by ID
app.get('/api/campaigns/:id', (req, res) => {
  const campaign = campaigns.find(c => c.id == req.params.id);
  if (campaign) {
    res.json({ campaign });
  } else {
    res.status(404).json({ error: 'Campaign not found' });
  }
});

// Create new campaign
app.post('/api/campaigns', (req, res) => {
  const { title, description, goal, image, ngo } = req.body;
  const newCampaign = {
    id: campaigns.length + 1,
    title,
    description,
    goal: parseFloat(goal),
    raised: 0,
    image,
    ngo,
    status: "active",
    startDate: new Date().toISOString().split('T')[0],
    endDate: null
  };
  campaigns.push(newCampaign);
  res.status(201).json({ campaign: newCampaign });
});

// Get donations for a campaign
app.get('/api/campaigns/:id/donations', (req, res) => {
  const campaignDonations = donations.filter(d => d.campaignId == req.params.id);
  res.json({ donations: campaignDonations });
});

// Make a donation
app.post('/api/campaigns/:id/donate', (req, res) => {
  const { amount, donor, message } = req.body;
  const campaign = campaigns.find(c => c.id == req.params.id);
  
  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }
  
  const newDonation = {
    id: donations.length + 1,
    campaignId: parseInt(req.params.id),
    amount: parseFloat(amount),
    donor: donor || "Anonymous",
    date: new Date().toISOString().split('T')[0],
    message: message || ""
  };
  
  donations.push(newDonation);
  campaign.raised += parseFloat(amount);
  
  res.status(201).json({ donation: newDonation });
});

// Get proofs for a campaign
app.get('/api/campaigns/:id/proofs', (req, res) => {
  const campaignProofs = proofs.filter(p => p.campaignId == req.params.id);
  res.json({ proofs: campaignProofs });
});

// Upload proof of aid delivery
app.post('/api/campaigns/:id/proofs', upload.single('proof'), (req, res) => {
  try {
    const { title, description } = req.body;
    const proofFile = req.file;
    
    const newProof = {
      id: proofs.length + 1,
      campaignId: parseInt(req.params.id),
      title,
      description,
      fileName: proofFile ? proofFile.filename : null,
      filePath: proofFile ? proofFile.path : null,
      date: new Date().toISOString().split('T')[0]
    };
    
    proofs.push(newProof);
    
    res.status(201).json({
      message: 'Proof uploaded successfully',
      proof: newProof
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload proof' });
  }
});

// User authentication (mock)
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  // In a real app, you would validate credentials
  const user = users.find(u => u.email === email);
  
  if (user) {
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      token: 'mock-jwt-token-' + Date.now()
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Get user profile
app.get('/api/users/profile', (req, res) => {
  // In a real app, you would extract user from token
  res.json({ user: users[0] });
});

// Handle donations
app.post('/api/donate', (req, res) => {
  try {
    const { amount } = req.body;
    
    // Mock successful donation
    res.status(200).json({
      message: 'Donation processed successfully',
      amount: amount,
      transactionId: 'MOCK_TX_ID_' + Date.now()
    });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ error: 'Failed to process donation' });
  }
});

// Get escrow status
app.get('/api/escrow-status', (req, res) => {
  // Mock escrow status
  res.json({
    balance: 1000, // Mock balance in microAlgos
    approvalStatus: 'pending', // 'pending' or 'approved'
    ngoAddress: 'NGO_ADDRESS_PLACEHOLDER'
  });
});

// Get statistics
app.get('/api/stats', (req, res) => {
  const totalCampaigns = campaigns.length;
  const activeCampaigns = campaigns.filter(c => c.status === 'active').length;
  const completedCampaigns = campaigns.filter(c => c.status === 'completed').length;
  const totalFundsRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0);
  const totalDonations = donations.length;
  
  res.json({
    totalCampaigns,
    activeCampaigns,
    completedCampaigns,
    totalFundsRaised,
    totalDonations
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Loaded ${campaigns.length} campaigns, ${donations.length} donations, ${proofs.length} proofs, and ${users.length} users`);
});