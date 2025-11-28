/**
 * Global API Service
 * This service provides mock data for all API calls
 * to ensure the application works properly when deployed
 */

class APIService {
  constructor() {
    // Always use mock mode
    this.mockMode = true;
  }

  // Generic API request method that returns mock data
  async request(endpoint, options = {}) {
    console.log('Mock API request to:', endpoint);
    
    // Return mock response based on endpoint
    if (endpoint.includes('/donations')) {
      return this.getMockDonations();
    } else if (endpoint.includes('/campaigns')) {
      return this.getMockCampaigns();
    } else if (endpoint.includes('/auth/login')) {
      return this.getMockLogin();
    } else if (endpoint.includes('/auth/register')) {
      return this.getMockRegister();
    }
    
    // Default mock response
    return {
      ok: true,
      data: { message: 'Mock response' },
      error: null
    };
  }

  // GET request
  async get(endpoint) {
    return await this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return await this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(endpoint, data) {
    return await this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return await this.request(endpoint, { method: 'DELETE' });
  }

  // Mock data methods
  getMockDonations() {
    return {
      ok: true,
      data: [
        { id: 1, amount: 1000, campaignId: 1, date: '2023-06-15', donor: 'Anonymous' },
        { id: 2, amount: 500, campaignId: 2, date: '2023-06-10', donor: 'John Doe' },
        { id: 3, amount: 2500, campaignId: 1, date: '2023-06-05', donor: 'Jane Smith' }
      ],
      error: null
    };
  }

  getMockCampaigns() {
    return {
      ok: true,
      data: [
        { 
          id: 1, 
          title: 'Flood Relief in Kerala', 
          description: 'Support flood victims in Kerala with emergency supplies and shelter', 
          goal: 100000, 
          raised: 75000, 
          endDate: '2023-12-31',
          image: '/placeholder-image.jpg'
        },
        { 
          id: 2, 
          title: 'Earthquake Recovery in Manipur', 
          description: 'Help rebuild communities affected by the recent earthquake', 
          goal: 50000, 
          raised: 30000, 
          endDate: '2023-11-30',
          image: '/placeholder-image.jpg'
        }
      ],
      error: null
    };
  }

  getMockLogin() {
    return {
      ok: true,
      data: {
        token: 'mock-jwt-token',
        user: { 
          id: 1, 
          email: 'user@example.com', 
          role: 'DONOR',
          name: 'Mock User'
        }
      },
      error: null
    };
  }

  getMockRegister() {
    return {
      ok: true,
      data: {
        token: 'mock-jwt-token',
        user: { 
          id: 1, 
          email: 'user@example.com', 
          role: 'DONOR',
          name: 'Mock User'
        }
      },
      error: null
    };
  }

  // Donation-specific methods
  async createDonation(amount, campaignId = null) {
    console.log('Mock creating donation:', { amount, campaignId });
    return {
      ok: true,
      data: { 
        id: Math.floor(Math.random() * 1000), 
        amount, 
        campaignId, 
        date: new Date().toISOString().split('T')[0],
        donor: 'Current User'
      },
      error: null
    };
  }

  async getDonations() {
    return this.getMockDonations();
  }

  async getDonationById(id) {
    const donations = await this.getDonations();
    const donation = donations.data.find(d => d.id === parseInt(id));
    return {
      ok: true,
      data: donation || null,
      error: donation ? null : 'Donation not found'
    };
  }

  // Campaign-specific methods
  async getCampaigns() {
    return this.getMockCampaigns();
  }

  async getCampaignById(id) {
    const campaigns = await this.getCampaigns();
    const campaign = campaigns.data.find(c => c.id === parseInt(id));
    return {
      ok: true,
      data: campaign || null,
      error: campaign ? null : 'Campaign not found'
    };
  }

  // Auth-specific methods
  async login(email, password) {
    console.log('Mock login attempt:', { email });
    return this.getMockLogin();
  }

  async register(email, password, role = 'DONOR') {
    console.log('Mock registration attempt:', { email, role });
    return this.getMockRegister();
  }

  // Auto-initialize authentication (no-op in mock mode)
  async initialize() {
    console.log('Mock API service initialized');
  }
}

// Create singleton instance
const apiService = new APIService();

// Initialize authentication when the service is first imported
apiService.initialize();

// Export for use in other modules
export default apiService;