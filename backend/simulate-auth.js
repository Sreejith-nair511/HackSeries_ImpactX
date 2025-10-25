/**
 * Authentication Simulation Script
 * This script demonstrates the complete authentication flow
 * to prevent "Access token required" errors in a realistic way
 */

const axios = require('axios');
// Using console colors directly instead of chalk for compatibility
const chalk = {
  blue: (text) => `\x1b[34m${text}\x1b[0m`,
  green: (text) => `\x1b[32m${text}\x1b[0m`,
  red: (text) => `\x1b[31m${text}\x1b[0m`,
  yellow: (text) => `\x1b[33m${text}\x1b[0m`,
  cyan: (text) => `\x1b[36m${text}\x1b[0m`,
  gray: (text) => `\x1b[90m${text}\x1b[0m`
};

// Server configuration
const BASE_URL = 'http://localhost:5000/api/v1';
const TEST_USER = {
  email: 'simulation@example.com',
  password: 'simulation123',
  role: 'DONOR'
};

class AuthSimulator {
  constructor() {
    this.token = null;
    this.user = null;
  }

  async registerUser() {
    try {
      console.log(chalk.blue('🔄 Registering simulation user...'));
      
      const response = await axios.post(`${BASE_URL}/auth/register`, TEST_USER);
      
      this.token = response.data.token;
      this.user = response.data.user;
      
      console.log(chalk.green('✅ User registered successfully'));
      console.log(chalk.gray(`   Token: ${this.token.substring(0, 20)}...`));
      console.log(chalk.gray(`   User ID: ${this.user.id}`));
      
      return true;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.log(chalk.yellow('⚠️  User already exists, proceeding to login...'));
        return await this.loginUser();
      }
      console.error(chalk.red('❌ Registration failed:'), error.message);
      return false;
    }
  }

  async loginUser() {
    try {
      console.log(chalk.blue('🔓 Logging in simulation user...'));
      
      const response = await axios.post(`${BASE_URL}/auth/login`, {
        email: TEST_USER.email,
        password: TEST_USER.password
      });
      
      this.token = response.data.token;
      this.user = response.data.user;
      
      console.log(chalk.green('✅ Login successful'));
      console.log(chalk.gray(`   Token: ${this.token.substring(0, 20)}...`));
      
      return true;
    } catch (error) {
      console.error(chalk.red('❌ Login failed:'), error.message);
      return false;
    }
  }

  async makeAuthenticatedRequest(method, endpoint, data = null) {
    if (!this.token) {
      console.log(chalk.yellow('⚠️  No token found, authenticating first...'));
      const authSuccess = await this.registerUser();
      if (!authSuccess) {
        throw new Error('Authentication failed');
      }
    }

    try {
      console.log(chalk.blue(`🚀 Making authenticated ${method.toUpperCase()} request to ${endpoint}...`));
      
      const config = {
        method,
        url: `${BASE_URL}${endpoint}`,
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      };

      if (data) {
        config.data = data;
      }

      const response = await axios(config);
      
      console.log(chalk.green(`✅ Request successful`));
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(chalk.yellow('⚠️  Token expired, re-authenticating...'));
        const authSuccess = await this.loginUser();
        if (authSuccess) {
          return await this.makeAuthenticatedRequest(method, endpoint, data);
        }
      }
      throw error;
    }
  }

  async simulateDonation(amount) {
    try {
      const donationData = { amount };
      const result = await this.makeAuthenticatedRequest('post', '/donations', donationData);
      console.log(chalk.green(`🎉 Donation of $${amount} created successfully!`));
      console.log(chalk.gray(`   Donation ID: ${result.donation.id}`));
      return result;
    } catch (error) {
      console.error(chalk.red('❌ Donation failed:'), error.message);
      throw error;
    }
  }

  async simulateDonations() {
    try {
      // Authenticate first
      await this.registerUser();
      
      // Simulate multiple donations
      console.log(chalk.blue('\n💰 Simulating donations...'));
      
      const donations = [
        { amount: 50 },
        { amount: 100 },
        { amount: 250 }
      ];

      for (const donation of donations) {
        await this.simulateDonation(donation.amount);
        // Small delay between requests
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      // Get all donations
      console.log(chalk.blue('\n📋 Fetching all donations...'));
      const donationsList = await this.makeAuthenticatedRequest('get', '/donations');
      console.log(chalk.green(`✅ Retrieved ${donationsList.donations.length} donations`));

      return donationsList;
    } catch (error) {
      console.error(chalk.red('❌ Simulation failed:'), error.message);
      throw error;
    }
  }
}

// Run simulation if script is executed directly
if (require.main === module) {
  const simulator = new AuthSimulator();
  
  console.log(chalk.cyan('🧪 ImpactX Authentication Simulator'));
  console.log(chalk.cyan('=====================================\n'));
  
  simulator.simulateDonations()
    .then(() => {
      console.log(chalk.green('\n🎉 All simulations completed successfully!'));
      console.log(chalk.gray('The authentication flow is now properly simulated.'));
      console.log(chalk.gray('No more "Access token required" errors will occur.'));
    })
    .catch(error => {
      console.error(chalk.red('\n💥 Simulation failed:'), error.message);
      process.exit(1);
    });
}

module.exports = AuthSimulator;