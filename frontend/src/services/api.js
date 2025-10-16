class ApiService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }
      
      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(email, password, role) {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, role }),
    });
  }

  // Campaign endpoints
  async getCampaigns() {
    return this.request('/api/v1/campaigns');
  }

  async getCampaign(id) {
    return this.request(`/api/v1/campaigns/${id}`);
  }

  async createCampaign(campaignData) {
    return this.request('/api/v1/campaigns', {
      method: 'POST',
      body: JSON.stringify(campaignData),
    });
  }

  // Donation endpoints
  async getDonations() {
    return this.request('/api/v1/donations');
  }

  async createDonation(donationData) {
    return this.request('/api/v1/donations', {
      method: 'POST',
      body: JSON.stringify(donationData),
    });
  }

  // Proof endpoints
  async getProofs() {
    return this.request('/api/v1/proofs');
  }

  async createProof(proofData) {
    return this.request('/api/v1/proofs', {
      method: 'POST',
      body: JSON.stringify(proofData),
    });
  }

  // Oracle endpoints
  async getOracleVotes() {
    return this.request('/api/v1/oracle');
  }

  async submitOracleVote(voteData) {
    return this.request('/api/v1/oracle/vote', {
      method: 'POST',
      body: JSON.stringify(voteData),
    });
  }

  async getVoteResult(proofId) {
    return this.request(`/api/v1/oracle/result/${proofId}`);
  }
}

export default new ApiService();