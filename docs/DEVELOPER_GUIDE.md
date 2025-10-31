# ImpactX Developer Guide

## Introduction

Welcome to the ImpactX Developer Guide! This document provides comprehensive information for developers who want to contribute to or integrate with the ImpactX platform. ImpactX is a decentralized disaster response platform built on the Algorand blockchain that leverages AI for verification and automation.

## Getting Started

### Prerequisites

Before you begin developing for ImpactX, ensure you have the following installed:

- Node.js >= 16.x
- npm or yarn package manager
- Docker (for containerized development)
- Algorand account with testnet ALGO
- Git version control system

### Repository Structure

```
impactx/
├── frontend/           # React web application
├── backend/            # Microservices and APIs
├── smart-contracts/    # Algorand TEAL smart contracts
├── docs/              # Documentation files
├── tests/             # Unit and integration tests
└── scripts/           # Deployment and utility scripts
```

### Setting Up Development Environment

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/impactx.git
   cd impactx
   ```

2. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install
   
   # Backend services
   cd ../backend
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env` and update with your configuration:
   ```bash
   cp .env.example .env
   ```

4. Start development servers:
   ```bash
   # Frontend
   npm run dev
   
   # Backend services
   npm run start:dev
   ```

## Frontend Development

### Technology Stack

- React with Hooks
- React Router for navigation
- Tailwind CSS for styling
- i18next for internationalization
- Algorand JavaScript SDK

### Component Structure

Frontend components are organized by feature:

```
src/
├── components/         # Reusable UI components
├── pages/             # Page-level components
├── hooks/             # Custom React hooks
├── services/          # API service integrations
├── utils/             # Utility functions
└── assets/            # Images, icons, and static assets
```

### Creating New Components

1. Create a new component file in the appropriate directory:
   ```jsx
   // src/components/ExampleComponent.jsx
   import React from 'react';
   
   const ExampleComponent = ({ title, children }) => {
     return (
       <div className="p-4 bg-white rounded-lg shadow">
         <h2 className="text-xl font-bold mb-2">{title}</h2>
         <div>{children}</div>
       </div>
     );
   };
   
   export default ExampleComponent;
   ```

2. Import and use the component:
   ```jsx
   import ExampleComponent from '../components/ExampleComponent';
   
   const MyPage = () => {
     return (
       <ExampleComponent title="Hello World">
         <p>This is an example component</p>
       </ExampleComponent>
     );
   };
   ```

### State Management

ImpactX uses React's built-in state management with useState and useEffect hooks. For complex state management, we use Context API:

```jsx
// src/contexts/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useAppContext = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  const value = {
    user,
    setUser,
    notifications,
    setNotifications
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
```

## Backend Development

### Microservices Architecture

The backend consists of several microservices:

1. **Auth Service**: User authentication and authorization
2. **Verification Service**: AI-powered claim verification
3. **Fraud Detection Service**: Anomaly detection and fraud prevention
4. **Automation Service**: Smart contract orchestration
5. **Analytics Service**: Data processing and visualization
6. **Marketplace Service**: Tokenized impact credits management
7. **Governance Service**: DAO operations and proposal management

### API Design

All backend services expose RESTful APIs with the following conventions:

- Versioned endpoints: `/api/v1/`
- JSON request/response format
- Standard HTTP status codes
- Comprehensive error handling

Example API endpoint:
```javascript
// backend/services/verification/src/controllers/claimController.js
const verifyClaim = async (req, res) => {
  try {
    const { claimId } = req.params;
    const verificationResult = await verificationService.processClaim(claimId);
    
    return res.status(200).json({
      success: true,
      data: verificationResult
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

### Database Schema

ImpactX uses PostgreSQL for data storage with the following key tables:

- `users`: User accounts and profiles
- `organizations`: NGO and partner organizations
- `claims`: Disaster response claims submitted for verification
- `verifications`: AI verification results
- `transactions`: Blockchain transaction records
- `proposals`: DAO governance proposals
- `votes`: User voting records
- `tokens`: Impact token balances and transfers

### Smart Contract Development

Smart contracts are written in TEAL (Transaction Execution Approval Language) and are deployed on the Algorand blockchain.

#### Contract Structure

```
smart-contracts/
├── donation-manager.teal     # Donation processing logic
├── verification-engine.teal  # Claim verification contracts
├── governance.teal           # DAO voting and proposal management
└── marketplace.teal          # Token trading and impact credits
```

#### Example Contract

```teal
#pragma version 8

// Donation Manager Contract
// Handles donation processing and fund allocation

// Check if this is contract creation
txn ApplicationID
int 0
==
bnz create_logic

// Handle different application calls
txn OnCompletion
int NoOp
==
bnz handle_donation

handle_donation:
// Verify sender is approved NGO
callsub check_approved_ngo
bz donation_error

// Validate donation amount
txn Amount
int 1000000  // Minimum 1 ALGO
>=
bz donation_error

// Update total donations
load 0
int 1
+
store 0

b donation_success

check_approved_ngo:
// Implementation to check if sender is approved
retsub

donation_success:
int 1
return

donation_error:
err

create_logic:
// Initialization logic
int 1
return
```

## Testing

### Unit Testing

We use Jest for unit testing with the following structure:

```
tests/
├── unit/
│   ├── frontend/
│   ├── backend/
│   └── contracts/
└── integration/
```

Example unit test:
```javascript
// tests/unit/frontend/components/ExampleComponent.test.js
import { render, screen } from '@testing-library/react';
import ExampleComponent from '../../../src/components/ExampleComponent';

describe('ExampleComponent', () => {
  test('renders title correctly', () => {
    render(<ExampleComponent title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

### Integration Testing

Integration tests verify that different components work together correctly:

```javascript
// tests/integration/api/verification.test.js
describe('Verification API', () => {
  test('should process claim successfully', async () => {
    const response = await request(app)
      .post('/api/v1/verification/claims')
      .send({
        ngoId: 'ngo-123',
        projectId: 'project-456',
        evidence: {
          satelliteImages: ['img1.jpg', 'img2.jpg']
        }
      });
      
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

### Smart Contract Testing

Smart contracts are tested using the Algorand SDK:

```python
# tests/contracts/donation_manager_test.py
from algosdk import logic
from algosdk.future import transaction

def test_donation_processing():
    # Compile contract
    approval_program = compile_program(client, approval_source)
    
    # Create application
    app_id = create_app(
        client, 
        creator_private_key, 
        approval_program, 
        clear_program, 
        app_args
    )
    
    # Test donation
    txn = transaction.ApplicationNoOpTxn(
        sender=creator_address,
        sp=suggested_params,
        index=app_id,
        app_args=[b"donate", b"1000000"]
    )
    
    assert txn
```

## Deployment

### CI/CD Pipeline

Our deployment pipeline consists of the following stages:

1. **Code Quality Checks**: Linting and static analysis
2. **Unit Testing**: Automated unit test execution
3. **Integration Testing**: End-to-end integration tests
4. **Security Scanning**: Vulnerability assessment
5. **Deployment**: Automated deployment to staging/production

### Environment Configuration

Different environments use separate configuration files:

- `.env.development`: Local development settings
- `.env.staging`: Staging environment settings
- `.env.production`: Production environment settings

### Docker Deployment

All services are containerized using Docker:

```dockerfile
# backend/services/verification/Dockerfile
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

## API Documentation

### Authentication

All API endpoints require authentication using JWT tokens:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     -H "Content-Type: application/json" \
     https://api.impactx.org/api/v1/user/profile
```

### Key Endpoints

#### User Management
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User authentication
- `GET /api/v1/user/profile` - Get user profile
- `PUT /api/v1/user/profile` - Update user profile

#### Claim Verification
- `POST /api/v1/claims` - Submit new claim
- `GET /api/v1/claims/{id}` - Get claim details
- `GET /api/v1/claims/{id}/verification` - Get verification results

#### Governance
- `GET /api/v1/proposals` - List all proposals
- `POST /api/v1/proposals` - Create new proposal
- `POST /api/v1/proposals/{id}/vote` - Vote on proposal

#### Analytics
- `GET /api/v1/analytics/impact` - Get impact metrics
- `GET /api/v1/analytics/fraud` - Get fraud detection reports

## Contributing

### Code Style

We follow the Airbnb JavaScript Style Guide with some modifications:

- 2-space indentation
- Semicolon usage
- CamelCase for variables and functions
- PascalCase for components and classes

### Git Workflow

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Create a new Pull Request

### Pull Request Process

1. Ensure all tests pass
2. Update documentation if applicable
3. Follow the pull request template
4. Request review from maintainers

## Support

For development questions and support:

- GitHub Issues: Report bugs and request features
- Discord: Real-time community support
- Documentation: Comprehensive guides and API references

## License

ImpactX is licensed under the MIT License. See the LICENSE file for more information.