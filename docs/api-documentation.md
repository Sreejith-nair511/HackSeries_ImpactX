# API Documentation

## Overview

The ImpactX API provides programmatic access to platform functionality, enabling developers to integrate humanitarian aid data, verification services, and impact metrics into their own applications. This documentation covers all available endpoints, authentication methods, and usage guidelines.

## Authentication

### API Keys

1. **Obtaining Keys**
   - Available through developer portal
   - Tiered access based on verification level
   - Rate limits vary by key tier

2. **Key Management**
   - Secure storage requirements
   - Rotation best practices
   - Revocation procedures

3. **Rate Limiting**
   - Anonymous: 100 requests/hour
   - Authenticated: 10,000 requests/hour
   - Premium: 100,000 requests/hour

### OAuth 2.0 Integration

1. **Authorization Flow**
   - Authorization code grant type
   - PKCE support for mobile applications
   - Refresh token mechanisms

2. **Scopes and Permissions**
   - Granular access control
   - User consent requirements
   - Scope modification procedures

3. **Token Management**
   - JWT format for access tokens
   - Standard expiration times
   - Token introspection endpoints

## Core Endpoints

### Disaster Data API

#### GET /api/v1/disasters

Retrieve information about ongoing and past disasters.

**Parameters:**
- `type` (optional): Filter by disaster type (flood, earthquake, etc.)
- `country` (optional): Filter by country code
- `start_date` (optional): Filter by start date (ISO 8601)
- `end_date` (optional): Filter by end date (ISO 8601)
- `limit` (optional): Number of results (default: 50, max: 1000)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "disasters": [
    {
      "id": "disaster_12345",
      "type": "flood",
      "name": "Kerala Floods 2023",
      "country": "IN",
      "start_date": "2023-08-01T00:00:00Z",
      "end_date": "2023-09-15T00:00:00Z",
      "affected_population": 1250000,
      "verified_funds": 50000000,
      "status": "active"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

#### GET /api/v1/disasters/{id}

Retrieve detailed information about a specific disaster.

**Response:**
```json
{
  "id": "disaster_12345",
  "type": "flood",
  "name": "Kerala Floods 2023",
  "country": "IN",
  "start_date": "2023-08-01T00:00:00Z",
  "end_date": "2023-09-15T00:00:00Z",
  "coordinates": {
    "lat": 10.8505,
    "lng": 76.2711
  },
  "affected_population": 1250000,
  "verified_funds": 50000000,
  "funds_disbursed": 42000000,
  "status": "active",
  "verification_score": 92.5,
  "impact_metrics": {
    "houses_restored": 45000,
    "people_relocated": 18000,
    "infrastructure_repaired": 120
  }
}
```

### Funding Transparency API

#### GET /api/v1/funding

Retrieve funding information for humanitarian projects.

**Parameters:**
- `disaster_id` (optional): Filter by disaster
- `ngo_id` (optional): Filter by NGO
- `status` (optional): Filter by funding status (pending, verified, released)
- `limit` (optional): Number of results (default: 50, max: 1000)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "funding": [
    {
      "id": "fund_67890",
      "disaster_id": "disaster_12345",
      "ngo_id": "ngo_54321",
      "amount_usd": 250000,
      "status": "verified",
      "verification_score": 95.2,
      "release_date": "2023-08-15T10:30:00Z",
      "blockchain_tx": "0x7f8a9b2c4d6e8f1a0b2c4d6e8f1a0b2c4d6e8f1a0b2c4d6e8f1a0b2c4d6e8f1a"
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

#### GET /api/v1/funding/{id}

Retrieve detailed funding information.

**Response:**
```json
{
  "id": "fund_67890",
  "disaster_id": "disaster_12345",
  "ngo_id": "ngo_54321",
  "amount_usd": 250000,
  "status": "verified",
  "verification_score": 95.2,
  "release_date": "2023-08-15T10:30:00Z",
  "blockchain_tx": "0x7f8a9b2c4d6e8f1a0b2c4d6e8f1a0b2c4d6e8f1a0b2c4d6e8f1a0b2c4d6e8f1a",
  "verification_evidence": {
    "satellite_images": ["ipfs://QmHash1", "ipfs://QmHash2"],
    "ngo_reports": ["ipfs://QmHash3"],
    "iot_data": ["sensor_123", "sensor_456"],
    "community_feedback": 87.5
  },
  "disbursement_schedule": [
    {
      "milestone": "Initial setup",
      "percentage": 20,
      "amount_usd": 50000,
      "completed_date": "2023-08-20T09:15:00Z"
    },
    {
      "milestone": "Infrastructure repair",
      "percentage": 50,
      "amount_usd": 125000,
      "completed_date": "2023-09-05T14:22:00Z"
    },
    {
      "milestone": "Community restoration",
      "percentage": 30,
      "amount_usd": 75000,
      "status": "pending"
    }
  ]
}
```

### Impact Metrics API

#### GET /api/v1/impact

Retrieve aggregated impact metrics across all projects.

**Parameters:**
- `start_date` (optional): Filter by start date (ISO 8601)
- `end_date` (optional): Filter by end date (ISO 8601)
- `region` (optional): Filter by geographic region
- `sdg` (optional): Filter by Sustainable Development Goal
- `limit` (optional): Number of results (default: 50, max: 1000)
- `offset` (optional): Pagination offset

**Response:**
```json
{
  "metrics": [
    {
      "id": "metric_11111",
      "disaster_id": "disaster_12345",
      "indicator": "people_housed",
      "value": 125000,
      "unit": "people",
      "confidence": 94.2,
      "verification_sources": ["satellite", "ngo", "iot"],
      "sdg_alignment": ["SDG_11", "SDG_1"]
    }
  ],
  "total": 1,
  "limit": 50,
  "offset": 0
}
```

#### GET /api/v1/impact/{id}

Retrieve detailed impact metric information.

**Response:**
```json
{
  "id": "metric_11111",
  "disaster_id": "disaster_12345",
  "indicator": "people_housed",
  "value": 125000,
  "unit": "people",
  "confidence": 94.2,
  "verification_sources": ["satellite", "ngo", "iot"],
  "sdg_alignment": ["SDG_11", "SDG_1"],
  "methodology": {
    "data_collection": "Combination of satellite imagery analysis and ground surveys",
    "validation_process": "Triangulation with NGO reports and IoT sensor data",
    "margin_of_error": "±2.1%"
  },
  "historical_trend": [
    {
      "date": "2023-08-15T00:00:00Z",
      "value": 45000
    },
    {
      "date": "2023-08-30T00:00:00Z",
      "value": 87000
    },
    {
      "date": "2023-09-15T00:00:00Z",
      "value": 125000
    }
  ]
}
```

## Webhook Integration

### Event Notifications

1. **Disaster Updates**
   - New disaster creation
   - Status changes
   - Funding updates

2. **Verification Events**
   - New verification completion
   - Verification score updates
   - Evidence submission

3. **Funding Events**
   - Fund release notifications
   - Disbursement updates
   - Blockchain transaction confirmations

### Webhook Configuration

#### POST /api/v1/webhooks

Register a new webhook endpoint.

**Request Body:**
```json
{
  "url": "https://your-service.com/webhook",
  "events": ["disaster.updated", "funding.released"],
  "secret": "your-webhook-secret"
}
```

#### DELETE /api/v1/webhooks/{id}

Remove a webhook endpoint.

### Payload Format

All webhook payloads follow this structure:

```json
{
  "id": "wh_12345",
  "timestamp": "2023-09-20T14:30:00Z",
  "event": "disaster.updated",
  "data": {
    // Event-specific data
  },
  "signature": "hmac-sha256-signature"
}
```

## Error Handling

### HTTP Status Codes

- `200`: Success
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests
- `500`: Internal Server Error
- `503`: Service Unavailable

### Error Response Format

```json
{
  "error": {
    "code": "invalid_parameter",
    "message": "The 'limit' parameter must be between 1 and 1000",
    "details": {
      "parameter": "limit",
      "value": "1500"
    }
  }
}
```

## Rate Limiting

### Limits by Tier

1. **Anonymous Access**
   - 100 requests per hour
   - IP-based limiting
   - Basic disaster and funding data only

2. **Authenticated Access**
   - 10,000 requests per hour
   - Full API access
   - Higher data resolution

3. **Premium Access**
   - 100,000 requests per hour
   - Priority processing
   - Enhanced data access

### Response Headers

All API responses include rate limiting headers:

- `X-RateLimit-Limit`: Request limit for the current period
- `X-RateLimit-Remaining`: Requests remaining in the current period
- `X-RateLimit-Reset`: Unix timestamp when the limit resets

## SDKs and Libraries

### Official SDKs

1. **JavaScript/Node.js**
   ```javascript
   const impactx = require('impactx-sdk');
   const client = new impactx.Client('your-api-key');
   
   const disasters = await client.disasters.list();
   ```

2. **Python**
   ```python
   from impactx import Client
   
   client = Client(api_key='your-api-key')
   disasters = client.disasters.list()
   ```

3. **Java**
   ```java
   import org.impactx.sdk.Client;
   
   Client client = new Client("your-api-key");
   DisasterList disasters = client.disasters().list();
   ```

### Community Libraries

- Ruby gem
- Go package
- PHP library
- .NET assembly

## Best Practices

### Efficient Data Retrieval

1. **Pagination**
   - Use limit and offset parameters
   - Implement cursor-based pagination for large datasets
   - Cache results when appropriate

2. **Filtering**
   - Apply filters to reduce data transfer
   - Use date ranges for time-series data
   - Combine multiple filters for precise results

3. **Caching**
   - Implement client-side caching
   - Respect cache headers in responses
   - Use ETags for conditional requests

### Security Considerations

1. **API Key Protection**
   - Never expose keys in client-side code
   - Use environment variables for storage
   - Rotate keys regularly

2. **Data Validation**
   - Validate all API responses
   - Handle errors gracefully
   - Implement retry logic with exponential backoff

3. **Compliance**
   - Follow data protection regulations
   - Implement proper user consent mechanisms
   - Maintain audit logs of API usage

This API documentation provides developers with the information needed to integrate ImpactX data and services into their applications, enabling greater transparency and effectiveness in humanitarian aid efforts.