/**
 * Global API Service
 * This service ensures all API calls are properly authenticated
 * to prevent "Access token required" errors
 */

import authHelper from '../utils/authHelper';

class APIService {
  constructor() {
    this.baseURL = 'http://localhost:5000/api/v1';
  }

  // Generic API request method with automatic authentication
  async request(endpoint, options = {}) {
    // Ensure we have the correct base URL
    const url = endpoint.startsWith('http') ? endpoint : `${this.baseURL}${endpoint}`;
    
    return await authHelper.makeAuthenticatedRequest(url, options);
  }

  // GET request
  async get(endpoint) {
    return await this.request(endpoint, { method: 'GET' });
  }

  // POST request
  async post(endpoint, data) {
    return await this.request(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  // PUT request
  async put(endpoint, data) {
    return await this.request(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  // DELETE request
  async delete(endpoint) {
    return await this.request(endpoint, { method: 'DELETE' });
  }

  // Donation-specific methods
  async createDonation(amount, campaignId = null) {
    const donationData = { amount };
    if (campaignId) {
      donationData.campaignId = campaignId;
    }
    
    return await this.post('/donations', donationData);
  }

  async getDonations() {
    return await this.get('/donations');
  }

  async getDonationById(id) {
    return await this.get(`/donations/${id}`);
  }

  // Campaign-specific methods
  async getCampaigns() {
    return await this.get('/campaigns');
  }

  async getCampaignById(id) {
    return await this.get(`/campaigns/${id}`);
  }

  // Auth-specific methods
  async login(email, password) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Login failed');
    }

    const data = await response.json();
    authHelper.storeAuthData(data.token, data.user);
    return data;
  }

  async register(email, password, role = 'DONOR') {
    const response = await fetch(`${this.baseURL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, role })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Registration failed');
    }

    const data = await response.json();
    authHelper.storeAuthData(data.token, data.user);
    return data;
  }

  // Auto-initialize authentication
  async initialize() {
    try {
      // This will automatically handle authentication
      await authHelper.simulateAutoLogin();
    } catch (error) {
      console.warn('Auto-initialization failed, but this is normal for first-time users:', error);
    }
  }
}

// Create singleton instance
const apiService = new APIService();

// Initialize authentication when the service is first imported
apiService.initialize();

// Export for use in other modules
export default apiService;