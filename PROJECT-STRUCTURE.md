# Project Structure

This document provides a comprehensive overview of the ImpactX project structure.

## Root Directory

```
impactx/
├── .env.example
├── .gitignore
├── architecture.md
├── CONTRIBUTING.md
├── docker-compose.prod.yml
├── docker-compose.yml
├── IMPLEMENTATION-SUMMARY.md
├── PROJECT-STRUCTURE.md
├── README-dev.md
├── README.md
├── backend/
├── docs/
├── frontend/
├── k8s/
└── .github/
```

## Backend Directory

```
backend/
├── Dockerfile
├── Dockerfile.dev
├── package.json
├── package-lock.json
├── server.js
├── deployment.json
├── .env.example
├── prisma/
│   ├── schema.prisma
│   ├── seed.js
│   └── migrations/
├── src/
│   ├── index.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── campaignController.js
│   │   ├── donationController.js
│   │   ├── proofController.js
│   │   ├── oracleController.js
│   │   └── escrowController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── rbacMiddleware.js
│   │   ├── validationMiddleware.js
│   │   ├── uploadMiddleware.js
│   │   └── rateLimitMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Campaign.js
│   │   ├── Donation.js
│   │   ├── Proof.js
│   │   └── Oracle.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── campaignRoutes.js
│   │   ├── donationRoutes.js
│   │   ├── proofRoutes.js
│   │   ├── oracleRoutes.js
│   │   └── escrowRoutes.js
│   ├── services/
│   │   ├── ipfsService.js
│   │   ├── algorandService.js
│   │   ├── oracleAdapter.js
│   │   └── escrowService.js
│   ├── utils/
│   │   ├── authUtils.js
│   │   ├── validationUtils.js
│   │   ├── errorUtils.js
│   │   └── logger.js
├── contracts/
│   └── escrow.teal
├── scripts/
│   ├── deploy_teal.js
│   └── test_escrow.py
├── tests/
│   ├── auth.test.js
│   ├── campaign.test.js
│   ├── donation.test.js
│   ├── proof.test.js
│   ├── oracle.test.js
│   ├── escrow.test.js
│   └── integration.test.js
└── uploads/
```

## Frontend Directory

```
frontend/
├── Dockerfile
├── Dockerfile.dev
├── package.json
├── package-lock.json
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── .gitignore
├── README.md
├── public/
│   └── favicon.ico
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Dashboard/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DonorDashboard.jsx
│   │   │   ├── NGODashboard.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── Campaign/
│   │   │   ├── CampaignList.jsx
│   │   │   ├── CampaignDetail.jsx
│   │   │   └── CreateCampaign.jsx
│   │   ├── Donation/
│   │   │   ├── DonateForm.jsx
│   │   │   └── DonationHistory.jsx
│   │   ├── Proof/
│   │   │   ├── ProofUpload.jsx
│   │   │   └── ProofList.jsx
│   │   ├── Oracle/
│   │   │   └── OracleManagement.jsx
│   │   ├── Wallet/
│   │   │   ├── WalletConnect.jsx
│   │   │   └── TransactionStatus.jsx
│   │   └── UI/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       └── Spinner.jsx
│   ├── hooks/
│   │   ├── useAlgorand.js
│   │   ├── useWallet.js
│   │   ├── useAuth.js
│   │   ├── useCampaigns.js
│   │   ├── useDonations.js
│   │   └── useProofs.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Campaigns.jsx
│   │   ├── Donate.jsx
│   │   ├── Proof.jsx
│   │   └── Profile.jsx
│   ├── services/
│   │   ├── api.js
│   │   └── walletService.js
│   ├── utils/
│   │   ├── formatters.js
│   │   └── validation.js
│   └── styles/
│       └── index.css
└── cypress/
    ├── e2e/
    │   ├── donation.cy.js
    │   ├── proof-upload.cy.js
    │   └── auth.cy.js
    └── support/
        ├── commands.js
        └── e2e.js
```

## Documentation Directory

```
docs/
├── deployment.md
├── design.md
├── final-report.md
└── api/
    ├── auth-api.md
    ├── campaign-api.md
    ├── donation-api.md
    ├── proof-api.md
    ├── oracle-api.md
    └── escrow-api.md
```

## Kubernetes Directory

```
k8s/
├── README.md
├── namespace.yaml
├── postgres-deployment.yaml
├── postgres-pvc.yaml
├── postgres-secret.yaml
├── backend-deployment.yaml
├── backend-pvc.yaml
├── backend-secret.yaml
├── frontend-deployment.yaml
├── algorand-node-deployment.yaml
└── algorand-pvc.yaml
```

## GitHub Directory

```
.github/
├── workflows/
│   └── ci.yml
└── PULL_REQUEST_TEMPLATE/
    └── pull_request_template.md
```

## Key Directories and Files

### Configuration Files
- `.env.example` - Example environment variables
- `docker-compose.yml` - Development Docker Compose configuration
- `docker-compose.prod.yml` - Production Docker Compose configuration
- `backend/prisma/schema.prisma` - Database schema definition

### Smart Contracts
- `backend/contracts/escrow.teal` - Main escrow smart contract
- `backend/scripts/deploy_teal.js` - Contract deployment script

### Documentation
- `README.md` - Main project documentation
- `README-dev.md` - Developer setup guide
- `docs/design.md` - Technical design document
- `docs/deployment.md` - Deployment guide
- `CONTRIBUTING.md` - Contribution guidelines

### Testing
- `backend/tests/` - Backend unit and integration tests
- `frontend/cypress/` - Frontend E2E tests

### DevOps
- `Dockerfile` and `Dockerfile.dev` - Docker configuration files
- `k8s/` - Kubernetes deployment manifests
- `.github/workflows/ci.yml` - GitHub Actions CI workflow

This structure provides a clean, modular architecture that separates concerns and makes the project maintainable and scalable.