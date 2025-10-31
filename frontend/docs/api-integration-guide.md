# API Integration Guide

## Overview

The ImpactX disaster response platform provides a comprehensive API for integrating with external systems, services, and applications. This guide details the available API endpoints, authentication methods, data formats, and integration patterns to enable seamless connectivity with the platform.

## API Architecture

### RESTful Design
The ImpactX API follows RESTful principles for consistent and predictable interactions:

- Resource-based URLs
- Standard HTTP methods (GET, POST, PUT, DELETE)
- JSON request/response format
- Standard HTTP status codes
- HATEOAS for discoverability

### API Versions
The platform maintains versioned APIs for backward compatibility:

```
https://api.impactx.org/v1/
https://api.impactx.org/v2/
```

### Rate Limiting
API rate limits ensure fair usage and system stability:

- Anonymous requests: 100 requests/hour
- Authenticated requests: 1,000 requests/hour
- Premium accounts: 10,000 requests/hour
- Enterprise accounts: Custom limits

## Authentication

### API Keys
API keys provide simple authentication for server-to-server integrations:

```javascript
// Example API key usage
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};

fetch('https://api.impactx.org/v1/campaigns', {
  method: 'GET',
  headers: headers
})
.then(response => response.json())
.then(data => console.log(data));
```

### OAuth 2.0 Integration
OAuth 2.0 enables secure user authorization for third-party applications:

```javascript
// OAuth 2.0 authorization flow
const oauthConfig = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'https://yourapp.com/callback',
  scope: 'read_campaigns write_reports'
};

// Authorization URL
const authUrl = `https://api.impactx.org/oauth/authorize?client_id=${oauthConfig.clientId}&redirect_uri=${oauthConfig.redirectUri}&scope=${oauthConfig.scope}&response_type=code`;

// Token exchange
const getToken = async (authorizationCode) => {
  const response = await fetch('https://api.impactx.org/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `grant_type=authorization_code&code=${authorizationCode}&client_id=${oauthConfig.clientId}&client_secret=${oauthConfig.clientSecret}&redirect_uri=${oauthConfig.redirectUri}`
  });
  
  return response.json();
};
```

### JWT Tokens
JSON Web Tokens provide stateless authentication:

```javascript
// JWT token validation
const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      valid: true,
      user: decoded.user,
      expires: decoded.exp
    };
  } catch (error) {
    return {
      valid: false,
      error: error.message
    };
  }
};
```

## Core API Endpoints

### Disaster Campaigns

#### List Campaigns
Retrieve a list of active disaster relief campaigns:

```http
GET /v1/campaigns
```

**Parameters:**
- `status` (optional): Filter by campaign status (active, completed, pending)
- `region` (optional): Filter by geographical region
- `disaster_type` (optional): Filter by disaster type
- `limit` (optional): Number of results (default: 20, max: 100)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "campaigns": [
    {
      "id": "camp_1234567890",
      "name": "Kerala Flood Relief 2023",
      "description": "Emergency relief for families affected by monsoon floods in Kerala",
      "disaster_type": "flood",
      "region": "Kerala, India",
      "status": "active",
      "funds_raised": 2500000,
      "funds_goal": 5000000,
      "created_at": "2023-07-15T10:30:00Z",
      "updated_at": "2023-07-20T14:45:00Z",
      "verification_score": 95.5,
      "ngo_partner": "Kerala Relief Foundation"
    }
  ],
  "total": 42,
  "limit": 20,
  "offset": 0
}
```

#### Get Campaign Details
Retrieve detailed information about a specific campaign:

```http
GET /v1/campaigns/{campaign_id}
```

**Response:**
```json
{
  "id": "camp_1234567890",
  "name": "Kerala Flood Relief 2023",
  "description": "Emergency relief for families affected by monsoon floods in Kerala",
  "disaster_type": "flood",
  "region": "Kerala, India",
  "status": "active",
  "funds_raised": 2500000,
  "funds_goal": 5000000,
  "funds_allocated": 2000000,
  "funds_remaining": 500000,
  "created_at": "2023-07-15T10:30:00Z",
  "updated_at": "2023-07-20T14:45:00Z",
  "verification_score": 95.5,
  "ngo_partner": "Kerala Relief Foundation",
  "contact_info": {
    "email": "info@keralarelieffoundation.org",
    "phone": "+91-484-1234567",
    "website": "https://keralarelieffoundation.org"
  },
  "blockchain_info": {
    "contract_address": "algo_1234567890",
    "token_symbol": "IMPX",
    "total_transactions": 1247
  },
  "verification_evidence": [
    {
      "type": "satellite_imagery",
      "url": "https://impactx.org/evidence/camp_1234567890/satellite_001.jpg",
      "timestamp": "2023-07-18T09:15:00Z",
      "verifier": "Satellite Analytics Inc."
    }
  ]
}
```

#### Create Campaign
Create a new disaster relief campaign:

```http
POST /v1/campaigns
```

**Request Body:**
```json
{
  "name": "Rajasthan Drought Relief 2023",
  "description": "Water and food security for drought-affected communities in Rajasthan",
  "disaster_type": "drought",
  "region": "Rajasthan, India",
  "funds_goal": 3000000,
  "ngo_partner": "Rajasthan Water Initiative",
  "contact_info": {
    "email": "relief@rajasthanwater.org",
    "phone": "+91-141-9876543",
    "website": "https://rajasthanwater.org"
  }
}
```

### Disaster Reports

#### Submit Disaster Report
Submit a new disaster report through the API:

```http
POST /v1/reports
```

**Request Body:**
```json
{
  "disaster_type": "flood",
  "location": {
    "latitude": 9.9312,
    "longitude": 76.2673,
    "description": "Central Kerala, near Kochi"
  },
  "severity": "severe",
  "affected_population": 50000,
  "description": "Heavy monsoon rains causing widespread flooding in low-lying areas",
  "media_urls": [
    "https://example.com/flood_photo_001.jpg",
    "https://example.com/flood_video_001.mp4"
  ],
  "reporter_info": {
    "name": "Local Disaster Coordinator",
    "contact": "+91-9876543210",
    "organization": "Kerala Disaster Management Authority"
  }
}
```

#### Get Report Status
Check the status of a submitted disaster report:

```http
GET /v1/reports/{report_id}
```

**Response:**
```json
{
  "id": "rep_0987654321",
  "disaster_type": "flood",
  "location": {
    "latitude": 9.9312,
    "longitude": 76.2673,
    "description": "Central Kerala, near Kochi"
  },
  "severity": "severe",
  "affected_population": 50000,
  "description": "Heavy monsoon rains causing widespread flooding in low-lying areas",
  "status": "verified",
  "verification_evidence": [
    {
      "type": "satellite_imagery",
      "analysis": "Confirmed flooding in reported areas",
      "confidence": 98.2
    }
  ],
  "related_campaigns": [
    "camp_1234567890"
  ],
  "submitted_at": "2023-07-19T16:30:00Z",
  "verified_at": "2023-07-20T08:45:00Z",
  "reporter_info": {
    "name": "Local Disaster Coordinator",
    "organization": "Kerala Disaster Management Authority"
  }
}
```

### Fund Transactions

#### Get Transaction History
Retrieve blockchain transaction history for a campaign:

```http
GET /v1/campaigns/{campaign_id}/transactions
```

**Response:**
```json
{
  "transactions": [
    {
      "id": "txn_1234567890abcdef",
      "type": "donation",
      "amount": 5000,
      "currency": "USDC",
      "from": "donor_0987654321",
      "to": "camp_1234567890",
      "timestamp": "2023-07-20T10:15:30Z",
      "blockchain": "algorand",
      "confirmation_status": "confirmed",
      "transaction_hash": "algo_tx_1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef"
    }
  ],
  "total": 1247,
  "limit": 50,
  "offset": 0
}
```

#### Initiate Fund Transfer
Initiate a fund transfer from a campaign to an NGO:

```http
POST /v1/campaigns/{campaign_id}/transfers
```

**Request Body:**
```json
{
  "amount": 100000,
  "currency": "USDC",
  "recipient_address": "algo_recipient_1234567890",
  "purpose": "Emergency relief supplies",
  "verification_required": true
}
```

### User Management

#### Get User Profile
Retrieve user profile information:

```http
GET /v1/users/{user_id}
```

**Response:**
```json
{
  "id": "user_1234567890",
  "name": "John Smith",
  "email": "john.smith@example.com",
  "role": "donor",
  "created_at": "2023-01-15T09:30:00Z",
  "last_login": "2023-07-20T14:20:00Z",
  "donation_history": {
    "total_donations": 15,
    "total_amount": 7500,
    "preferred_causes": ["flood", "earthquake", "drought"]
  },
  "blockchain_addresses": [
    {
      "chain": "algorand",
      "address": "algo_addr_1234567890"
    },
    {
      "chain": "ethereum",
      "address": "eth_addr_1234567890"
    }
  ]
}
```

#### Update User Profile
Update user profile information:

```http
PUT /v1/users/{user_id}
```

**Request Body:**
```json
{
  "name": "John A. Smith",
  "preferred_causes": ["flood", "earthquake", "drought", "cyclone"],
  "notification_preferences": {
    "email": true,
    "sms": false,
    "push": true
  }
}
```

## Webhook Integration

### Event Notifications
Webhooks provide real-time notifications for platform events:

```javascript
// Webhook endpoint example
app.post('/webhook/impactx', (req, res) => {
  const event = req.body;
  
  switch (event.type) {
    case 'campaign.created':
      handleCampaignCreated(event.data);
      break;
    case 'donation.received':
      handleDonationReceived(event.data);
      break;
    case 'verification.completed':
      handleVerificationCompleted(event.data);
      break;
    case 'fund.transfer':
      handleFundTransfer(event.data);
      break;
    default:
      console.log('Unknown event type:', event.type);
  }
  
  res.status(200).send('OK');
});

const handleCampaignCreated = (campaignData) => {
  // Process new campaign creation
  console.log('New campaign created:', campaignData.name);
  
  // Send notification to relevant stakeholders
  notifyStakeholders(campaignData);
};

const handleDonationReceived = (donationData) => {
  // Process new donation
  console.log('New donation received:', donationData.amount);
  
  // Update donor records
  updateDonorRecords(donationData);
};
```

### Webhook Configuration
Configure webhooks through the API:

```http
POST /v1/webhooks
```

**Request Body:**
```json
{
  "url": "https://yourapp.com/webhook/impactx",
  "events": [
    "campaign.created",
    "donation.received",
    "verification.completed",
    "fund.transfer"
  ],
  "secret": "your_webhook_secret"
}
```

## Error Handling

### Standard Error Responses
The API returns consistent error responses:

```json
{
  "error": {
    "code": "CAMPAIGN_NOT_FOUND",
    "message": "The requested campaign could not be found",
    "details": {
      "campaign_id": "camp_1234567890"
    },
    "timestamp": "2023-07-20T15:30:00Z"
  }
}
```

### Common Error Codes
- `INVALID_REQUEST`: Malformed request or missing required parameters
- `UNAUTHORIZED`: Missing or invalid authentication credentials
- `FORBIDDEN`: Insufficient permissions for the requested operation
- `NOT_FOUND`: Requested resource does not exist
- `RATE_LIMITED`: API rate limit exceeded
- `INTERNAL_ERROR`: Unexpected server error

## SDKs and Libraries

### JavaScript SDK
Official JavaScript SDK for browser and Node.js:

```javascript
import { ImpactXClient } from '@impactx/sdk';

const client = new ImpactXClient({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://api.impactx.org'
});

// Get campaigns
const campaigns = await client.campaigns.list({
  status: 'active',
  limit: 10
});

// Create campaign
const newCampaign = await client.campaigns.create({
  name: 'New Disaster Relief Campaign',
  // ... other campaign data
});
```

### Python SDK
Official Python SDK:

```python
from impactx import ImpactXClient

client = ImpactXClient(
    api_key='YOUR_API_KEY',
    base_url='https://api.impactx.org'
)

# Get campaigns
campaigns = client.campaigns.list(status='active', limit=10)

# Create campaign
new_campaign = client.campaigns.create(
    name='New Disaster Relief Campaign',
    # ... other campaign data
)
```

### Mobile SDKs
Native mobile SDKs for iOS and Android:

```swift
// iOS Swift
import ImpactXSDK

let client = ImpactXClient(apiKey: "YOUR_API_KEY")

client.campaigns.list(status: "active", limit: 10) { result in
    switch result {
    case .success(let campaigns):
        print("Campaigns: \(campaigns)")
    case .failure(let error):
        print("Error: \(error)")
    }
}
```

```kotlin
// Android Kotlin
import org.impactx.sdk.ImpactXClient

val client = ImpactXClient("YOUR_API_KEY")

client.campaigns.list(status = "active", limit = 10) { result ->
    when (result) {
        is Result.Success -> println("Campaigns: ${result.data}")
        is Result.Error -> println("Error: ${result.exception}")
    }
}
```

## Best Practices

### API Usage Guidelines
- Implement exponential backoff for rate limiting
- Cache responses when appropriate
- Use HTTPS for all API requests
- Validate all API responses
- Handle errors gracefully
- Monitor API usage and performance

### Security Recommendations
- Store API keys securely
- Use OAuth 2.0 for user-specific data
- Implement proper input validation
- Enable logging for security monitoring
- Regularly rotate API keys
- Use webhook secrets for verification

### Performance Optimization
- Use pagination for large result sets
- Implement connection pooling
- Compress large responses
- Use CDN for static assets
- Optimize database queries
- Implement caching strategies

## Integration Examples

### Donation Portal Integration
Example integration for a donation portal:

```javascript
class DonationPortal {
  constructor() {
    this.client = new ImpactXClient({ apiKey: process.env.IMPACTX_API_KEY });
  }
  
  async displayCampaigns() {
    try {
      const campaigns = await this.client.campaigns.list({
        status: 'active',
        limit: 20
      });
      
      this.renderCampaigns(campaigns.campaigns);
    } catch (error) {
      console.error('Failed to fetch campaigns:', error);
      this.showError('Unable to load campaigns. Please try again later.');
    }
  }
  
  async processDonation(campaignId, amount, donorInfo) {
    try {
      // Create donation record
      const donation = await this.client.donations.create({
        campaign_id: campaignId,
        amount: amount,
        donor_info: donorInfo,
        payment_method: 'credit_card'
      });
      
      // Process payment
      const paymentResult = await this.processPayment(donation);
      
      if (paymentResult.success) {
        // Confirm donation
        await this.client.donations.confirm(donation.id, {
          transaction_hash: paymentResult.transactionHash
        });
        
        return { success: true, donation: donation };
      } else {
        throw new Error('Payment processing failed');
      }
    } catch (error) {
      console.error('Donation processing failed:', error);
      return { success: false, error: error.message };
    }
  }
}
```

### NGO Management System Integration
Example integration for NGO management systems:

```javascript
class NGOIntegration {
  constructor() {
    this.client = new ImpactXClient({ apiKey: process.env.IMPACTX_API_KEY });
  }
  
  async syncCampaigns() {
    try {
      // Get NGO's campaigns
      const campaigns = await this.client.campaigns.list({
        ngo_partner: this.ngoId,
        limit: 100
      });
      
      // Sync with local database
      await this.database.syncCampaigns(campaigns.campaigns);
      
      return campaigns.campaigns;
    } catch (error) {
      console.error('Campaign sync failed:', error);
      throw error;
    }
  }
  
  async submitVerificationReport(campaignId, evidence) {
    try {
      // Upload evidence files
      const uploadedFiles = await this.uploadEvidenceFiles(evidence.files);
      
      // Submit verification report
      const report = await this.client.reports.create({
        campaign_id: campaignId,
        type: 'verification',
        evidence: uploadedFiles,
        notes: evidence.notes
      });
      
      return report;
    } catch (error) {
      console.error('Verification report submission failed:', error);
      throw error;
    }
  }
}
```

## Future API Enhancements

### GraphQL API
Planned GraphQL API for more flexible data querying:

```graphql
query {
  campaigns(status: "active", limit: 10) {
    id
    name
    description
    funds_raised
    funds_goal
    verification_score
    ngo_partner {
      name
      contact_info {
        email
        phone
      }
    }
    recent_donations(limit: 5) {
      amount
      donor_name
      timestamp
    }
  }
}
```

### Real-time APIs
WebSocket-based real-time APIs for live updates:

```javascript
const ws = new WebSocket('wss://api.impactx.org/v1/ws');

ws.onopen = () => {
  // Subscribe to campaign updates
  ws.send(JSON.stringify({
    type: 'subscribe',
    channel: 'campaign_updates',
    campaign_id: 'camp_1234567890'
  }));
};

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  
  switch (update.type) {
    case 'funds_updated':
      updateFundsDisplay(update.data);
      break;
    case 'verification_completed':
      showVerificationNotification(update.data);
      break;
  }
};
```

## Conclusion

The ImpactX API provides comprehensive access to the platform's disaster response functionality, enabling seamless integration with external systems and applications. With robust authentication, consistent error handling, and extensive documentation, the API supports a wide range of integration scenarios while maintaining security and performance standards.

The platform's commitment to backward compatibility, regular updates, and developer support ensures that integrations remain stable and up-to-date with the latest features and improvements. Whether building donation portals, NGO management systems, or custom disaster response applications, the ImpactX API provides the tools and flexibility needed to create impactful solutions.