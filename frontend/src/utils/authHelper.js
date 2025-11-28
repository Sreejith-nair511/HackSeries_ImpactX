/**
 * Authentication Helper for ImpactX Frontend
 * This utility helps manage authentication tokens seamlessly
 * to prevent "Access token required" errors in the UI
 */

class AuthHelper {
  constructor() {
    this.tokenKey = 'impactx_auth_token';
    this.userKey = 'impactx_user_data';
    // Always use mock mode
    this.mockMode = true;
  }

  // Store token and user data in localStorage
  storeAuthData(token, userData) {
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(userData));
  }

  // Retrieve token from localStorage
  getToken() {
    // In mock mode, always return a mock token
    if (this.mockMode) {
      return 'mock-jwt-token';
    }
    return localStorage.getItem(this.tokenKey);
  }

  // Retrieve user data from localStorage
  getUserData() {
    // In mock mode, return mock user data
    if (this.mockMode) {
      return {
        id: 1,
        email: 'user@example.com',
        role: 'DONOR',
        name: 'Mock User'
      };
    }
    
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  // Clear authentication data
  clearAuthData() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  // Check if user is authenticated
  isAuthenticated() {
    // In mock mode, always return true
    if (this.mockMode) {
      return true;
    }
    
    const token = this.getToken();
    return !!token;
  }

  // Get authentication headers for API requests
  getAuthHeaders() {
    // In mock mode, return mock headers
    if (this.mockMode) {
      return {
        'Authorization': 'Bearer mock-jwt-token',
        'Content-Type': 'application/json'
      };
    }
    
    const token = this.getToken();
    if (!token) {
      throw new Error('No authentication token found. Please log in.');
    }
    
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Make authenticated API request (mock implementation)
  async makeAuthenticatedRequest(endpoint, options = {}) {
    console.log('Mock authenticated request to:', endpoint);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Return mock response based on endpoint
    if (endpoint.includes('/donations')) {
      return this.getMockDonationsResponse();
    } else if (endpoint.includes('/campaigns')) {
      return this.getMockCampaignsResponse();
    } else if (endpoint.includes('/auth/login')) {
      return this.getMockLoginResponse();
    } else if (endpoint.includes('/auth/register')) {
      return this.getMockRegisterResponse();
    }
    
    // Default mock response
    return {
      ok: true,
      json: async () => ({ 
        message: 'Mock response',
        data: null 
      })
    };
  }

  // Mock response methods
  getMockDonationsResponse() {
    return {
      ok: true,
      json: async () => ({
        donations: [
          { id: 1, amount: 1000, campaignId: 1, date: '2023-06-15', donor: 'Anonymous' },
          { id: 2, amount: 500, campaignId: 2, date: '2023-06-10', donor: 'John Doe' },
          { id: 3, amount: 2500, campaignId: 1, date: '2023-06-05', donor: 'Jane Smith' }
        ]
      })
    };
  }

  getMockCampaignsResponse() {
    return {
      ok: true,
      json: async () => ({
        campaigns: [
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
        ]
      })
    };
  }

  getMockLoginResponse() {
    return {
      ok: true,
      json: async () => ({
        token: 'mock-jwt-token',
        user: { 
          id: 1, 
          email: 'user@example.com', 
          role: 'DONOR',
          name: 'Mock User'
        }
      })
    };
  }

  getMockRegisterResponse() {
    return {
      ok: true,
      json: async () => ({
        token: 'mock-jwt-token',
        user: { 
          id: 1, 
          email: 'user@example.com', 
          role: 'DONOR',
          name: 'Mock User'
        }
      })
    };
  }

  // Simulate automatic login for demo purposes (mock implementation)
  async simulateAutoLogin() {
    console.log('Mock auto-login simulation');
    
    // In mock mode, always succeed
    if (this.mockMode) {
      return {
        token: 'mock-jwt-token',
        user: {
          id: 1,
          email: 'user@example.com',
          role: 'DONOR',
          name: 'Mock User'
        }
      };
    }
    
    // Check if already logged in
    if (this.isAuthenticated()) {
      return {
        token: this.getToken(),
        user: this.getUserData()
      };
    }
  }
  
  // Enhanced method to handle any API call with automatic authentication
  async apiCall(endpoint, method = 'GET', data = null) {
    const options = {
      method,
      headers: {}
    };
    
    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.body = JSON.stringify(data);
    }
    
    return await this.makeAuthenticatedRequest(endpoint, options);
  }
}

// Create singleton instance
const authHelper = new AuthHelper();

// Export for use in other modules
export default authHelper;