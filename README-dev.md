# Transparent & Verifiable Disaster Relief Funding on Algorand

## Overview

This project implements a transparent and verifiable disaster relief funding system on the Algorand blockchain. The system ensures that donations are securely held in escrow and only released when verified proof of aid delivery is provided.

## Features

### Frontend (React + Vite + Tailwind)
- Donor dashboard for making donations
- NGO dashboard for uploading proof of aid delivery
- Admin dashboard for campaign management
- Mobile-responsive design
- Wallet integration (AlgoSigner/WalletConnect)

### Backend (Node.js + Express)
- REST API for campaigns, donations, proofs, and oracle votes
- IPFS integration for storing proof documents (Pinata/Infura)
- Algorand blockchain integration for escrow smart contracts
- Oracle adapter for multi-source verification
- JWT-based authentication and RBAC

### Blockchain (Algorand)
- TEAL smart contract for escrow management
- Multi-signature verification for fund release
- IPFS hash anchoring on-chain
- Oracle voting mechanism

### Security
- Rate limiting and input validation
- Role-based access control (RBAC)
- Secure secret management
- File upload validation

## Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: SQLite (dev) / PostgreSQL (prod)
- **Blockchain**: Algorand TestNet
- **Storage**: IPFS (Pinata/Infura)
- **Authentication**: JWT
- **Deployment**: Docker + Kubernetes/Render

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (for local development)
- Algorand Sandbox (for local blockchain testing)

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
npm install
npm run migrate
npm run dev
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### Deploy TEAL (TestNet)
```bash
cd backend
node scripts/deploy_teal.js --network testnet
```

### Run Integration Tests
```bash
npm run test:integration
```

### Docker Compose (dev)
```bash
docker-compose up --build
```

## Project Structure

```
impactx/
├── backend/
│   ├── prisma/              # Database schema and migrations
│   ├── src/
│   │   ├── controllers/     # API controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Database models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── utils/           # Utility functions
│   │   └── index.js         # App entry point
│   ├── scripts/             # Deployment and utility scripts
│   ├── contracts/           # TEAL smart contracts
│   ├── tests/               # Unit and integration tests
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── hooks/           # Custom hooks
│   │   ├── pages/           # Page components
│   │   ├── services/        # API service calls
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── docs/                    # Documentation
├── docker/                  # Docker configurations
├── .github/                 # GitHub workflows
├── .env.example
├── docker-compose.yml
├── README.md
└── architecture.md
```

## Development Workflow

1. Create feature branches from `develop`
2. Follow conventional commit messages
3. Write tests for new features
4. Ensure all tests pass before merging
5. Update documentation as needed

## Deployment

### Staging (Docker)
```bash
docker-compose up --build
```

### Production (Kubernetes/Render)
See [Deployment Guide](docs/deployment.md) for detailed instructions.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.