# API Documentation

This document provides comprehensive documentation for the ImpactX disaster response platform APIs, including endpoints, request/response formats, authentication, and error handling.

## Overview

The ImpactX API provides programmatic access to disaster response data and functionality, enabling integration with external systems and custom applications.

## Base URL

```
https://api.impactx.example.com/v1
```

For local development:
```
http://localhost:3001/api/v1
```

## Authentication

### API Keys

Most API endpoints require authentication via API keys. API keys can be obtained through the admin dashboard.

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  https://api.impactx.example.com/v1/reports
```

### OAuth 2.0

For user-specific operations, OAuth 2.0 authentication is required:

```bash
curl -H "Authorization: Bearer USER_ACCESS_TOKEN" \
  https://api.impactx.example.com/v1/user/profile
```

## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Anonymous requests**: 100 requests per hour
- **Authenticated requests**: 1000 requests per hour
- **Admin requests**: 5000 requests per hour

Exceeding rate limits will result in a 429 Too Many Requests response.

## Response Format

All API responses are returned in JSON format with the following structure:

```json
{
  "success": true,
  "data": {},
  "meta": {},
  "errors": []
}
```

### Success Responses

```json
{
  "success": true,
  "data": {
    "id": 123,
    "name": "Sample Report"
  },
  "meta": {
    "timestamp": "2023-01-01T12:00:00Z"
  }
}
```

### Error Responses

```json
{
  "success": false,
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Invalid input data",
      "details": {
        "field": "email",
        "reason": "Invalid email format"
      }
    }
  ]
}
```

## HTTP Status Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Unprocessable Entity |
| 429 | Too Many Requests |
| 500 | Internal Server Error |
| 503 | Service Unavailable |

## Endpoints

### Reports

#### Get Reports

Retrieve a list of disaster reports with optional filtering.

```
GET /reports
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | Filter by report type (fire, flood, earthquake, etc.) |
| status | string | Filter by report status (active, resolved, pending) |
| region | string | Filter by region code |
| limit | integer | Number of results to return (default: 20, max: 100) |
| offset | integer | Offset for pagination |
| sort | string | Sort field (created_at, updated_at, severity) |
| order | string | Sort order (asc, desc) |

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.impactx.example.com/v1/reports?type=fire&status=active&limit=10"
```

**Example Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "12345",
      "type": "fire",
      "severity": "high",
      "status": "active",
      "location": {
        "latitude": 40.7128,
        "longitude": -74.0060,
        "address": "123 Main St, New York, NY"
      },
      "description": "Building fire reported",
      "reported_at": "2023-01-01T12:00:00Z",
      "updated_at": "2023-01-01T12:05:00Z",
      "reporter": {
        "id": "user789",
        "name": "John Doe"
      }
    }
  ],
  "meta": {
    "total": 1,
    "limit": 10,
    "offset": 0
  }
}
```

#### Get Report by ID

Retrieve a specific report by its ID.

```
GET /reports/{id}
```

**Example Request:**

```bash
curl -H "Authorization: Bearer YOUR_API_KEY" \
  "https://api.impactx.example.com/v1/reports/12345"
```

#### Create Report

Create a new disaster report.

```
POST /reports
```

**Request Body:**

```json
{
  "type": "fire",
  "severity": "high",
  "location": {
    "latitude": 40.7128,
    "longitude": -74.0060,
    "address": "123 Main St, New York, NY"
  },
  "description": "Building fire reported",
  "contact": {
    "name": "John Doe",
    "phone": "+1234567890",
    "email": "john@example.com"
  }
}
```

**Example Request:**

```bash
curl -X POST \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"type":"fire","severity":"high","location":{"latitude":40.7128,"longitude":-74.0060,"address":"123 Main St, New York, NY"},"description":"Building fire reported","contact":{"name":"John Doe","phone":"+1234567890","email":"john@example.com"}}' \
  "https://api.impactx.example.com/v1/reports"
```

#### Update Report

Update an existing report.

```
PUT /reports/{id}
```

#### Delete Report

Delete a report.

```
DELETE /reports/{id}
```

### Resources

#### Get Resources

Retrieve available emergency resources.

```
GET /resources
```

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| type | string | Filter by resource type (shelter, food, medical) |
| region | string | Filter by region code |
| status | string | Filter by availability status (available, limited, unavailable) |

#### Get Resource by ID

```
GET /resources/{id}
```

#### Create Resource

```
POST /resources
```

#### Update Resource

```
PUT /resources/{id}
```

#### Delete Resource

```
DELETE /resources/{id}
```

### Alerts

#### Get Alerts

Retrieve current emergency alerts.

```
GET /alerts
```

#### Create Alert

```
POST /alerts
```

#### Update Alert

```
PUT /alerts/{id}
```

#### Delete Alert

```
DELETE /alerts/{id}
```

### Users

#### Get User Profile

```
GET /user/profile
```

#### Update User Profile

```
PUT /user/profile
```

#### Get User Preferences

```
GET /user/preferences
```

#### Update User Preferences

```
PUT /user/preferences
```

### Regions

#### Get Regions

```
GET /regions
```

#### Get Region by ID

```
GET /regions/{id}
```

### Statistics

#### Get Dashboard Statistics

```
GET /statistics/dashboard
```

#### Get Report Statistics

```
GET /statistics/reports
```

#### Get Resource Statistics

```
GET /statistics/resources
```

## Webhooks

The ImpactX platform supports webhooks for real-time notifications.

### Event Types

| Event | Description |
|-------|-------------|
| report.created | A new report has been created |
| report.updated | A report has been updated |
| report.resolved | A report has been resolved |
| alert.issued | A new alert has been issued |
| resource.updated | A resource status has changed |

### Webhook Configuration

Webhooks can be configured in the admin dashboard with the following settings:

- **URL**: The endpoint that will receive webhook events
- **Events**: Select which events to receive
- **Secret**: Optional secret for verifying webhook authenticity

### Webhook Payload

Webhook payloads follow this structure:

```json
{
  "event": "report.created",
  "timestamp": "2023-01-01T12:00:00Z",
  "data": {
    // Event-specific data
  },
  "signature": "sha256-hex-signature"
}
```

### Webhook Verification

To verify webhook authenticity, compute the HMAC signature using your webhook secret:

```javascript
const crypto = require('crypto');

function verifyWebhook(payload, signature, secret) {
  const expectedSignature = 'sha256=' + crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
    
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

## Error Handling

### Common Error Responses

#### Validation Errors

```json
{
  "success": false,
  "errors": [
    {
      "code": "VALIDATION_ERROR",
      "message": "Validation failed",
      "details": [
        {
          "field": "email",
          "message": "Email is required"
        },
        {
          "field": "location.latitude",
          "message": "Latitude must be between -90 and 90"
        }
      ]
    }
  ]
}
```

#### Authentication Errors

```json
{
  "success": false,
  "errors": [
    {
      "code": "UNAUTHORIZED",
      "message": "Invalid API key"
    }
  ]
}
```

#### Rate Limiting Errors

```json
{
  "success": false,
  "errors": [
    {
      "code": "RATE_LIMIT_EXCEEDED",
      "message": "Rate limit exceeded. Try again in 60 seconds."
    }
  ]
}
```

## SDKs and Libraries

### JavaScript/Node.js

```javascript
const ImpactX = require('impactx-sdk');

const client = new ImpactX({
  apiKey: 'YOUR_API_KEY',
  baseUrl: 'https://api.impactx.example.com/v1'
});

// Get reports
const reports = await client.reports.list({
  type: 'fire',
  status: 'active'
});
```

### Python

```python
from impactx import ImpactXClient

client = ImpactXClient(
    api_key='YOUR_API_KEY',
    base_url='https://api.impactx.example.com/v1'
)

# Get reports
reports = client.reports.list(
    type='fire',
    status='active'
)
```

### Java

```java
import com.impactx.client.ImpactXClient;

ImpactXClient client = new ImpactXClient.Builder()
    .apiKey("YOUR_API_KEY")
    .baseUrl("https://api.impactx.example.com/v1")
    .build();

// Get reports
List<Report> reports = client.reports().list(
    new ReportsListRequest()
        .type("fire")
        .status("active")
);
```

## Best Practices

### Pagination

When retrieving large datasets, always use pagination:

```bash
# Good - Using pagination
GET /reports?limit=20&offset=0
GET /reports?limit=20&offset=20

# Bad - Retrieving all data at once
GET /reports
```

### Filtering

Use filtering to reduce data transfer:

```bash
# Good - Filtering at the API level
GET /reports?type=fire&status=active

# Bad - Retrieving all data and filtering client-side
GET /reports
```

### Caching

Implement appropriate caching strategies:

- Cache static data (regions, resource types) for longer periods
- Cache frequently accessed dynamic data for shorter periods
- Respect cache headers in API responses

### Error Handling

Always handle API errors gracefully:

```javascript
try {
  const reports = await client.reports.list();
  // Process reports
} catch (error) {
  if (error.code === 'RATE_LIMIT_EXCEEDED') {
    // Wait and retry
    await new Promise(resolve => setTimeout(resolve, 60000));
    return await client.reports.list();
  }
  throw error;
}
```

## Versioning

The ImpactX API uses semantic versioning. Breaking changes will result in a new major version number.

Current version: v1

## Changelog

### v1.2.0 (2023-06-01)

- Added resource management endpoints
- Improved filtering capabilities
- Added webhook support

### v1.1.0 (2023-03-15)

- Added user preference endpoints
- Enhanced error response format
- Improved rate limiting

### v1.0.0 (2023-01-01)

- Initial API release
- Report management endpoints
- Alert system endpoints
- Basic user management

## Support

For API support, contact:
- Email: api-support@impactx.example.com
- Phone: +1 (555) 123-4567

## Terms of Use

Use of the ImpactX API is subject to the Terms of Service available at https://impactx.example.com/terms

## Privacy

API usage is governed by our Privacy Policy available at https://impactx.example.com/privacy