# API Reference for ImpactX Disaster Response Platform

## Table of Contents
1. [Authentication](#authentication)
2. [User Management](#user-management)
3. [Organization Management](#organization-management)
4. [Resource Tracking](#resource-tracking)
5. [Project Management](#project-management)
6. [Proposal System](#proposal-system)
7. [Voting System](#voting-system)
8. [Document Management](#document-management)
9. [Communication](#communication)
10. [Analytics](#analytics)
11. [IoT Data](#iot-data)
12. [Notifications](#notifications)
13. [Error Handling](#error-handling)

## Authentication

### POST /api/v1/auth/register
Register a new user account

**Request Body:**
```json
{
  "email": "string",
  "password": "string",
  "firstName": "string",
  "lastName": "string",
  "organization": "string",
  "role": "string" // "ngo", "volunteer", "developer", "partner"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "organization": "string",
      "role": "string",
      "createdAt": "timestamp"
    },
    "token": "jwt_token"
  }
}
```

**Status Codes:**
- 201 Created
- 400 Bad Request
- 409 Conflict (email already exists)

### POST /api/v1/auth/login
Authenticate user and receive access token

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "string",
      "email": "string",
      "firstName": "string",
      "lastName": "string",
      "organization": "string",
      "role": "string"
    },
    "token": "jwt_token"
  }
}
```

**Status Codes:**
- 200 OK
- 400 Bad Request
- 401 Unauthorized

### POST /api/v1/auth/logout
Invalidate user session

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

## User Management

### GET /api/v1/users/profile
Retrieve authenticated user's profile

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "organization": "string",
    "role": "string",
    "permissions": ["string"],
    "lastLogin": "timestamp",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### PUT /api/v1/users/profile
Update user profile information

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "firstName": "string",
  "lastName": "string",
  "organization": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "email": "string",
    "firstName": "string",
    "lastName": "string",
    "organization": "string",
    "role": "string",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 400 Bad Request
- 401 Unauthorized

### DELETE /api/v1/users/profile
Delete user account

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Account deleted successfully"
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

## Organization Management

### POST /api/v1/organizations
Create a new organization

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "type": "string", // "ngo", "government", "corporate", "academic"
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "contact": {
    "phone": "string",
    "email": "string",
    "website": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "type": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "contact": {
      "phone": "string",
      "email": "string",
      "website": "string"
    },
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden

### GET /api/v1/organizations
List organizations with optional filtering

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `type`: Filter by organization type
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "organizations": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "type": "string",
        "address": {
          "city": "string",
          "state": "string",
          "country": "string"
        },
        "contact": {
          "email": "string",
          "website": "string"
        }
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### GET /api/v1/organizations/{id}
Retrieve specific organization details

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "type": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "contact": {
      "phone": "string",
      "email": "string",
      "website": "string"
    },
    "members": [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "role": "string"
      }
    ],
    "projects": [
      {
        "id": "string",
        "title": "string",
        "status": "string"
      }
    ],
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

### PUT /api/v1/organizations/{id}
Update organization information

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "address": {
    "street": "string",
    "city": "string",
    "state": "string",
    "zipCode": "string",
    "country": "string"
  },
  "contact": {
    "phone": "string",
    "email": "string",
    "website": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "description": "string",
    "type": "string",
    "address": {
      "street": "string",
      "city": "string",
      "state": "string",
      "zipCode": "string",
      "country": "string"
    },
    "contact": {
      "phone": "string",
      "email": "string",
      "website": "string"
    },
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

### DELETE /api/v1/organizations/{id}
Delete an organization

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Organization deleted successfully"
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 403 Forbidden
- 404 Not Found

## Resource Tracking

### POST /api/v1/resources
Create a new resource record

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "type": "string", // "personnel", "equipment", "supplies", "facility"
  "quantity": "number",
  "unit": "string",
  "status": "string", // "available", "allocated", "in_transit", "unavailable"
  "location": {
    "latitude": "number",
    "longitude": "number",
    "address": "string"
  },
  "organizationId": "string",
  "projectId": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "type": "string",
    "quantity": "number",
    "unit": "string",
    "status": "string",
    "location": {
      "latitude": "number",
      "longitude": "number",
      "address": "string"
    },
    "organizationId": "string",
    "projectId": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 201 Created
- 400 Bad Request
- 401 Unauthorized

### GET /api/v1/resources
List resources with filtering and search

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `type`: Filter by resource type
- `status`: Filter by resource status
- `organizationId`: Filter by organization
- `projectId`: Filter by project
- `search`: Search by name or description
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "resources": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "quantity": "number",
        "unit": "string",
        "status": "string",
        "location": {
          "latitude": "number",
          "longitude": "number"
        },
        "organization": {
          "id": "string",
          "name": "string"
        },
        "project": {
          "id": "string",
          "title": "string"
        }
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### GET /api/v1/resources/{id}
Retrieve specific resource details

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "type": "string",
    "quantity": "number",
    "unit": "string",
    "status": "string",
    "description": "string",
    "location": {
      "latitude": "number",
      "longitude": "number",
      "address": "string"
    },
    "organization": {
      "id": "string",
      "name": "string",
      "contact": {
        "email": "string",
        "phone": "string"
      }
    },
    "project": {
      "id": "string",
      "title": "string",
      "description": "string"
    },
    "allocationHistory": [
      {
        "id": "string",
        "projectId": "string",
        "allocatedAt": "timestamp",
        "releasedAt": "timestamp"
      }
    ],
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

### PUT /api/v1/resources/{id}
Update resource information

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "string",
  "type": "string",
  "quantity": "number",
  "unit": "string",
  "status": "string",
  "description": "string",
  "location": {
    "latitude": "number",
    "longitude": "number",
    "address": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "name": "string",
    "type": "string",
    "quantity": "number",
    "unit": "string",
    "status": "string",
    "description": "string",
    "location": {
      "latitude": "number",
      "longitude": "number",
      "address": "string"
    },
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found

### DELETE /api/v1/resources/{id}
Delete a resource record

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Resource deleted successfully"
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

## Project Management

### POST /api/v1/projects
Create a new project

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string", // "planning", "active", "completed", "cancelled"
  "priority": "string", // "low", "medium", "high", "critical"
  "organizationId": "string",
  "location": {
    "latitude": "number",
    "longitude": "number",
    "address": "string"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "startDate": "date",
    "endDate": "date",
    "status": "string",
    "priority": "string",
    "organizationId": "string",
    "location": {
      "latitude": "number",
      "longitude": "number",
      "address": "string"
    },
    "progress": 0,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 201 Created
- 400 Bad Request
- 401 Unauthorized

### GET /api/v1/projects
List projects with filtering

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: Filter by project status
- `priority`: Filter by priority level
- `organizationId`: Filter by organization
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "projects": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "startDate": "date",
        "endDate": "date",
        "status": "string",
        "priority": "string",
        "organization": {
          "id": "string",
          "name": "string"
        },
        "location": {
          "latitude": "number",
          "longitude": "number"
        },
        "progress": "number"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### GET /api/v1/projects/{id}
Retrieve specific project details

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "startDate": "date",
    "endDate": "date",
    "status": "string",
    "priority": "string",
    "organization": {
      "id": "string",
      "name": "string",
      "contact": {
        "email": "string",
        "phone": "string"
      }
    },
    "location": {
      "latitude": "number",
      "longitude": "number",
      "address": "string"
    },
    "progress": "number",
    "resources": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "quantity": "number"
      }
    ],
    "teamMembers": [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "role": "string"
      }
    ],
    "milestones": [
      {
        "id": "string",
        "title": "string",
        "dueDate": "date",
        "completed": "boolean"
      }
    ],
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

### PUT /api/v1/projects/{id}
Update project information

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "startDate": "date",
  "endDate": "date",
  "status": "string",
  "priority": "string",
  "location": {
    "latitude": "number",
    "longitude": "number",
    "address": "string"
  },
  "progress": "number"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "startDate": "date",
    "endDate": "date",
    "status": "string",
    "priority": "string",
    "location": {
      "latitude": "number",
      "longitude": "number",
      "address": "string"
    },
    "progress": "number",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found

### DELETE /api/v1/projects/{id}
Delete a project

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Project deleted successfully"
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

## Proposal System

### POST /api/v1/proposals
Create a new governance proposal

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "type": "string", // "funding", "policy", "technical", "organizational"
  "categoryId": "string",
  "requestedAmount": "number",
  "duration": "number", // in days
  "organizationId": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "type": "string",
    "categoryId": "string",
    "requestedAmount": "number",
    "duration": "number",
    "organizationId": "string",
    "status": "draft",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 201 Created
- 400 Bad Request
- 401 Unauthorized

### GET /api/v1/proposals
List proposals with filtering

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `status`: Filter by proposal status (draft, submitted, voting, approved, rejected, implemented)
- `type`: Filter by proposal type
- `organizationId`: Filter by organization
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "proposals": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "type": "string",
        "organization": {
          "id": "string",
          "name": "string"
        },
        "status": "string",
        "requestedAmount": "number",
        "votingEndDate": "date",
        "voteCount": "number",
        "approvalPercentage": "number"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### GET /api/v1/proposals/{id}
Retrieve specific proposal details

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "type": "string",
    "category": {
      "id": "string",
      "name": "string"
    },
    "organization": {
      "id": "string",
      "name": "string",
      "contact": {
        "email": "string"
      }
    },
    "requestedAmount": "number",
    "duration": "number",
    "status": "string",
    "submissionDate": "date",
    "votingStartDate": "date",
    "votingEndDate": "date",
    "voteCount": "number",
    "approvalPercentage": "number",
    "votes": [
      {
        "userId": "string",
        "vote": "boolean",
        "timestamp": "timestamp"
      }
    ],
    "comments": [
      {
        "id": "string",
        "userId": "string",
        "text": "string",
        "createdAt": "timestamp"
      }
    ],
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

### PUT /api/v1/proposals/{id}
Update proposal information

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "title": "string",
  "description": "string",
  "type": "string",
  "categoryId": "string",
  "requestedAmount": "number",
  "duration": "number"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "type": "string",
    "categoryId": "string",
    "requestedAmount": "number",
    "duration": "number",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found

### DELETE /api/v1/proposals/{id}
Delete a proposal

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Proposal deleted successfully"
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

### POST /api/v1/proposals/{id}/submit
Submit a proposal for voting

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "status": "voting",
    "votingStartDate": "timestamp",
    "votingEndDate": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found

## Voting System

### POST /api/v1/votes
Cast a vote on a proposal

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "proposalId": "string",
  "vote": "boolean" // true for yes, false for no
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "proposalId": "string",
    "userId": "string",
    "vote": "boolean",
    "timestamp": "timestamp"
  }
}
```

**Status Codes:**
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 404 Not Found
- 409 Conflict (already voted)

### GET /api/v1/votes/{proposalId}
Get voting results for a proposal

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "proposalId": "string",
    "totalVotes": "number",
    "yesVotes": "number",
    "noVotes": "number",
    "approvalPercentage": "number",
    "quorumReached": "boolean",
    "results": [
      {
        "userId": "string",
        "vote": "boolean",
        "timestamp": "timestamp"
      }
    ]
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

## Document Management

### POST /api/v1/documents
Upload a new document

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
- `file`: The document file
- `title`: Document title
- `description`: Document description
- `categoryId`: Category ID
- `tags`: Comma-separated tags

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "fileName": "string",
    "fileSize": "number",
    "mimeType": "string",
    "categoryId": "string",
    "tags": ["string"],
    "uploadedBy": "string",
    "downloadUrl": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 201 Created
- 400 Bad Request
- 401 Unauthorized
- 413 Payload Too Large

### GET /api/v1/documents
List documents with filtering

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `categoryId`: Filter by category
- `tag`: Filter by tag
- `search`: Search by title or description
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "id": "string",
        "title": "string",
        "description": "string",
        "fileName": "string",
        "fileSize": "number",
        "mimeType": "string",
        "category": {
          "id": "string",
          "name": "string"
        },
        "tags": ["string"],
        "uploadedBy": {
          "id": "string",
          "firstName": "string",
          "lastName": "string"
        },
        "createdAt": "timestamp"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### GET /api/v1/documents/{id}
Retrieve specific document details

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "title": "string",
    "description": "string",
    "fileName": "string",
    "fileSize": "number",
    "mimeType": "string",
    "category": {
      "id": "string",
      "name": "string"
    },
    "tags": ["string"],
    "uploadedBy": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "organization": "string"
    },
    "downloadUrl": "string",
    "viewUrl": "string",
    "version": "number",
    "versions": [
      {
        "id": "string",
        "version": "number",
        "fileName": "string",
        "createdAt": "timestamp"
      }
    ],
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

### GET /api/v1/documents/{id}/download
Download a document

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
Binary file content with appropriate Content-Type and Content-Disposition headers

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

### DELETE /api/v1/documents/{id}
Delete a document

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Document deleted successfully"
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

## Communication

### POST /api/v1/messages
Send a new message

**Headers:**
```
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "recipientIds": ["string"],
  "subject": "string",
  "body": "string",
  "attachments": ["string"] // document IDs
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "senderId": "string",
    "recipientIds": ["string"],
    "subject": "string",
    "body": "string",
    "attachments": ["string"],
    "sentAt": "timestamp",
    "readBy": ["string"]
  }
}
```

**Status Codes:**
- 201 Created
- 400 Bad Request
- 401 Unauthorized

### GET /api/v1/messages
List messages for the authenticated user

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `folder`: Filter by folder (inbox, sent, drafts, trash)
- `unread`: Filter by read status
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "messages": [
      {
        "id": "string",
        "sender": {
          "id": "string",
          "firstName": "string",
          "lastName": "string",
          "organization": "string"
        },
        "subject": "string",
        "bodyPreview": "string",
        "attachments": "number",
        "sentAt": "timestamp",
        "isRead": "boolean"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### GET /api/v1/messages/{id}
Retrieve specific message details

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "sender": {
      "id": "string",
      "firstName": "string",
      "lastName": "string",
      "organization": "string"
    },
    "recipients": [
      {
        "id": "string",
        "firstName": "string",
        "lastName": "string",
        "organization": "string"
      }
    ],
    "subject": "string",
    "body": "string",
    "attachments": [
      {
        "id": "string",
        "title": "string",
        "fileName": "string"
      }
    ],
    "sentAt": "timestamp",
    "readAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

### PUT /api/v1/messages/{id}/read
Mark a message as read

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "isRead": true,
    "readAt": "timestamp"
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

## Analytics

### GET /api/v1/analytics/dashboard
Get dashboard analytics data

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "activeProjects": "number",
      "totalResources": "number",
      "activeVolunteers": "number",
      "organizations": "number"
    },
    "projectStatus": [
      {
        "status": "string",
        "count": "number",
        "percentage": "number"
      }
    ],
    "resourceAllocation": [
      {
        "type": "string",
        "allocated": "number",
        "available": "number"
      }
    ],
    "recentActivity": [
      {
        "type": "string",
        "description": "string",
        "timestamp": "timestamp",
        "user": {
          "firstName": "string",
          "lastName": "string"
        }
      }
    ]
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### GET /api/v1/analytics/fraud-detection
Get fraud detection analytics

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate`: Start date for analysis
- `endDate`: End date for analysis
- `confidenceThreshold`: Minimum confidence level (0-100)

**Response:**
```json
{
  "success": true,
  "data": {
    "totalTransactions": "number",
    "flaggedTransactions": "number",
    "fraudProbability": "number",
    "patterns": [
      {
        "pattern": "string",
        "occurrences": "number",
        "severity": "string"
      }
    ],
    "highRiskEntities": [
      {
        "entityType": "string",
        "entityId": "string",
        "riskScore": "number",
        "lastActivity": "timestamp"
      }
    ]
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### GET /api/v1/analytics/resource-utilization
Get resource utilization analytics

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `startDate`: Start date for analysis
- `endDate`: End date for analysis
- `resourceType`: Filter by resource type

**Response:**
```json
{
  "success": true,
  "data": {
    "utilizationRate": "number",
    "peakUsageTimes": [
      {
        "time": "string",
        "usage": "number"
      }
    ],
    "underutilizedResources": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "utilization": "number"
      }
    ],
    "overutilizedResources": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "utilization": "number"
      }
    ]
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

## IoT Data

### POST /api/v1/iot/data
Submit IoT sensor data

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "deviceId": "string",
  "sensorType": "string",
  "data": {
    "temperature": "number",
    "humidity": "number",
    "pressure": "number",
    "location": {
      "latitude": "number",
      "longitude": "number"
    }
  },
  "timestamp": "timestamp"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "deviceId": "string",
    "sensorType": "string",
    "data": {
      "temperature": "number",
      "humidity": "number",
      "pressure": "number",
      "location": {
        "latitude": "number",
        "longitude": "number"
      }
    },
    "timestamp": "timestamp",
    "processed": "boolean"
  }
}
```

**Status Codes:**
- 201 Created
- 400 Bad Request
- 401 Unauthorized

### GET /api/v1/iot/devices
List IoT devices

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `organizationId`: Filter by organization
- `status`: Filter by device status
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "devices": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "status": "string",
        "lastSeen": "timestamp",
        "location": {
          "latitude": "number",
          "longitude": "number"
        }
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### GET /api/v1/iot/data
Get IoT data with filtering

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `deviceId`: Filter by device
- `sensorType`: Filter by sensor type
- `startDate`: Start date for data
- `endDate`: End date for data
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "readings": [
      {
        "id": "string",
        "deviceId": "string",
        "deviceName": "string",
        "sensorType": "string",
        "data": {
          "temperature": "number",
          "humidity": "number"
        },
        "timestamp": "timestamp"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

## Notifications

### GET /api/v1/notifications
Get user notifications

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- `unread`: Filter by read status
- `page`: Page number (default: 1)
- `limit`: Results per page (default: 10, max: 100)

**Response:**
```json
{
  "success": true,
  "data": {
    "notifications": [
      {
        "id": "string",
        "type": "string",
        "title": "string",
        "message": "string",
        "relatedEntity": {
          "type": "string",
          "id": "string"
        },
        "createdAt": "timestamp",
        "isRead": "boolean"
      }
    ],
    "pagination": {
      "currentPage": "number",
      "totalPages": "number",
      "totalItems": "number",
      "itemsPerPage": "number"
    }
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

### PUT /api/v1/notifications/{id}/read
Mark notification as read

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "string",
    "isRead": true
  }
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized
- 404 Not Found

### PUT /api/v1/notifications/read-all
Mark all notifications as read

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "All notifications marked as read"
}
```

**Status Codes:**
- 200 OK
- 401 Unauthorized

## Error Handling

### Standard Error Response Format
All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Request validation failed
- `AUTHENTICATION_REQUIRED`: Authentication token missing or invalid
- `ACCESS_DENIED`: Insufficient permissions
- `RESOURCE_NOT_FOUND`: Requested resource does not exist
- `DUPLICATE_RESOURCE`: Resource already exists
- `INTERNAL_SERVER_ERROR`: Unexpected server error

### HTTP Status Codes
- 200 OK: Successful GET, PUT, PATCH, DELETE
- 201 Created: Successful POST
- 400 Bad Request: Invalid request parameters
- 401 Unauthorized: Missing or invalid authentication
- 403 Forbidden: Authenticated but insufficient permissions
- 404 Not Found: Resource not found
- 409 Conflict: Resource conflict
- 413 Payload Too Large: Request entity too large
- 422 Unprocessable Entity: Semantic errors in request
- 429 Too Many Requests: Rate limiting
- 500 Internal Server Error: Unexpected server error
- 503 Service Unavailable: Service temporarily unavailable

This API reference provides comprehensive documentation for all endpoints available in the ImpactX disaster response platform. All endpoints require proper authentication unless otherwise specified.