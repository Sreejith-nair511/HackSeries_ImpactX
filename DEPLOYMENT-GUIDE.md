# Transparent & Verifiable Disaster Relief Funding on Algorand
## Comprehensive Deployment Guide

This guide provides detailed instructions for deploying the ImpactX platform in various environments, from local development to production systems.

## Table of Contents

1. [System Requirements](#system-requirements)
2. [Architecture Overview](#architecture-overview)
3. [Local Development Setup](#local-development-setup)
4. [Docker Deployment](#docker-deployment)
5. [Kubernetes Deployment](#kubernetes-deployment)
6. [Cloud Provider Deployment](#cloud-provider-deployment)
7. [Algorand Network Configuration](#algorand-network-configuration)
8. [IPFS Provider Configuration](#ipfs-provider-configuration)
9. [Security Configuration](#security-configuration)
10. [Monitoring and Maintenance](#monitoring-and-maintenance)
11. [Scaling Considerations](#scaling-considerations)

## System Requirements

### Minimum Requirements
- **CPU**: 2 cores
- **RAM**: 4 GB
- **Storage**: 20 GB SSD
- **Network**: 100 Mbps

### Recommended Requirements
- **CPU**: 4 cores
- **RAM**: 8 GB
- **Storage**: 50 GB SSD
- **Network**: 1 Gbps

### Software Dependencies
- Node.js v18+
- Docker v20+
- Kubernetes v1.20+ (for production)
- PostgreSQL v13+ (for production)
- Git v2.30+

## Architecture Overview

The ImpactX platform follows a microservices architecture with the following components:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Donors        │    │   NGO           │    │   Oracles       │
│                 │    │                 │    │                 │
│ ┌─────────────┐ │    │ ┌─────────────┐ │    │ ┌─────────────┐ │
│ │Wallet       │ │    │ │Dashboard    │ │    │ │Verification │ │
│ └─────────────┘ │    │ └─────────────┘ │    │ └─────────────┘ │
└─────────┬───────┘    └─────────┬───────┘    └─────────┬───────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      Frontend           │
                    │   (React + Vite)        │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │      Backend            │
                    │  (Node.js + Express)    │
                    ├─────────────────────────┤
                    │ • REST API              │
                    │ • Business Logic        │
                    │ • Oracle Adapter        │
                    │ • IPFS Integration      │
                    └────────────┬────────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         │                       │                       │
┌────────▼────────┐   ┌──────────▼──────────┐   ┌────────▼────────┐
│   PostgreSQL    │   │   Algorand Node     │   │      IPFS       │
│  (Database)     │   │  (Smart Contract)   │   │ (Pinata/Infura) │
└─────────────────┘   └─────────────────────┘   └─────────────────┘
```

## Local Development Setup

### Prerequisites Installation

1. **Install Node.js**:
   ```bash
   # Using nvm (recommended)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   nvm install 18
   nvm use 18
   ```

2. **Install Docker**:
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install docker.io docker-compose
   sudo usermod -aG docker $USER

   # macOS
   # Download Docker Desktop from https://www.docker.com/products/docker-desktop
   ```

3. **Install PostgreSQL** (optional for local development):
   ```bash
   # Ubuntu/Debian
   sudo apt install postgresql postgresql-contrib

   # macOS with Homebrew
   brew install postgresql
   ```

### Repository Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-org/impactx.git
   cd impactx
   ```

2. **Install dependencies**:
   ```bash
   # Backend
   cd backend
   npm install
   cd ..

   # Frontend
   cd frontend
   npm install
   cd ..
   ```

3. **Configure environment variables**:
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   cd ..

   # Frontend
   cd frontend
   cp .env.example .env
   # Edit .env with your configuration
   cd ..
   ```

### Database Setup

1. **Run database migrations**:
   ```bash
   cd backend
   npm run migrate
   cd ..
   ```

2. **Seed initial data** (optional):
   ```bash
   cd backend
   npm run seed
   cd ..
   ```

### Start Development Servers

1. **Start backend**:
   ```bash
   cd backend
   npm run dev
   ```

2. **Start frontend** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```

3. **Start Algorand sandbox** (in a new terminal):
   ```bash
   # If you have Algorand sandbox installed
   cd sandbox
   ./sandbox up
   ```

## Docker Deployment

### Development Environment

1. **Build and run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

2. **Access services**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - Database: localhost:5432
   - Algorand Node: http://localhost:4001

### Production Environment

1. **Build and run production services**:
   ```bash
   docker-compose -f docker-compose.prod.yml up --build
   ```

2. **Environment configuration**:
   Set the following environment variables:
   ```bash
   DB_PASSWORD=your_database_password
   ALGOD_SERVER=your_algorand_node_url
   ALGOD_PORT=443
   ALGOD_TOKEN=your_algorand_api_key
   ALGOD_NETWORK=testnet
   IPFS_PROVIDER=pinata
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_API_KEY=your_pinata_secret_api_key
   INFURA_PROJECT_ID=your_infura_project_id
   INFURA_PROJECT_SECRET=your_infura_project_secret
   JWT_SECRET=your_jwt_secret_key
   API_URL=https://your-api-domain.com
   ```

## Kubernetes Deployment

### Prerequisites

1. **Install kubectl**:
   ```bash
   # Linux
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

   # macOS
   brew install kubectl
   ```

2. **Install Helm** (optional):
   ```bash
   # Linux
   curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

   # macOS
   brew install helm
   ```

### Deployment Steps

1. **Create namespace**:
   ```bash
   kubectl apply -f k8s/namespace.yaml
   ```

2. **Deploy database**:
   ```bash
   kubectl apply -f k8s/postgres-pvc.yaml
   kubectl apply -f k8s/postgres-secret.yaml
   kubectl apply -f k8s/postgres-deployment.yaml
   ```

3. **Deploy Algorand node**:
   ```bash
   kubectl apply -f k8s/algorand-pvc.yaml
   kubectl apply -f k8s/algorand-node-deployment.yaml
   ```

4. **Deploy backend**:
   ```bash
   kubectl apply -f k8s/backend-pvc.yaml
   kubectl apply -f k8s/backend-secret.yaml
   kubectl apply -f k8s/backend-deployment.yaml
   ```

5. **Deploy frontend**:
   ```bash
   kubectl apply -f k8s/frontend-deployment.yaml
   ```

6. **Configure ingress** (if needed):
   ```bash
   # Apply ingress controller (e.g., NGINX)
   kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml

   # Apply ingress rules
   kubectl apply -f k8s/ingress.yaml
   ```

### Configuration Management

1. **Update secrets**:
   ```bash
   kubectl create secret generic backend-secret \
     --from-literal=algod-server='YOUR_ALGOD_SERVER' \
     --from-literal=algod-port='YOUR_ALGOD_PORT' \
     --from-literal=algod-token='YOUR_ALGOD_TOKEN' \
     --from-literal=algod-network='testnet' \
     --from-literal=ipfs-provider='pinata' \
     --from-literal=pinata-api-key='YOUR_PINATA_API_KEY' \
     --from-literal=pinata-secret-api-key='YOUR_PINATA_SECRET_API_KEY' \
     --from-literal=infura-project-id='YOUR_INFURA_PROJECT_ID' \
     --from-literal=infura-project-secret='YOUR_INFURA_PROJECT_SECRET' \
     --from-literal=jwt-secret='YOUR_JWT_SECRET' \
     -n impactx --dry-run=client -o yaml | kubectl apply -f -
   ```

## Cloud Provider Deployment

### Vercel (Frontend)

1. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm install -g vercel

   # Deploy
   cd frontend
   vercel --prod
   ```

2. **Environment variables**:
   Set the following in Vercel dashboard:
   - `VITE_API_URL`: Your backend API URL

### Render (Backend)

1. **Create a new web service on Render**:
   - Repository: Your ImpactX repository
   - Build command: `npm install`
   - Start command: `npm start`
   - Environment: Node.js

2. **Environment variables**:
   Configure the same variables as in the Docker production environment.

### AWS Deployment

1. **EKS Cluster Setup**:
   ```bash
   # Create EKS cluster
   eksctl create cluster --name impactx-cluster --version 1.21 --region us-west-2 --nodegroup-name standard-workers --node-type t3.medium --nodes 3 --nodes-min 1 --nodes-max 4 --managed
   ```

2. **Deploy using Kubernetes manifests**:
   Follow the Kubernetes deployment steps above.

### Google Cloud Deployment

1. **GKE Cluster Setup**:
   ```bash
   # Create GKE cluster
   gcloud container clusters create impactx-cluster --num-nodes=3 --zone=us-central1-a
   ```

2. **Deploy using Kubernetes manifests**:
   Follow the Kubernetes deployment steps above.

## Algorand Network Configuration

### TestNet Setup

1. **Get TestNet credentials**:
   - Visit https://bank.testnet.algorand.network/ to get TestNet ALGO
   - Sign up for PureStake API key at https://developer.purestake.io/

2. **Configure environment variables**:
   ```bash
   ALGOD_SERVER=https://testnet-algorand.api.purestake.io/ps2
   ALGOD_PORT=443
   ALGOD_TOKEN=your_purestake_api_key
   ALGOD_NETWORK=testnet
   ```

### MainNet Setup

1. **Get MainNet credentials**:
   - Purchase ALGO from an exchange
   - Sign up for PureStake API key for MainNet access

2. **Configure environment variables**:
   ```bash
   ALGOD_SERVER=https://mainnet-algorand.api.purestake.io/ps2
   ALGOD_PORT=443
   ALGOD_TOKEN=your_purestake_api_key
   ALGOD_NETWORK=mainnet
   ```

### Smart Contract Deployment

1. **Deploy escrow contract**:
   ```bash
   cd backend
   node scripts/deploy_teal.js --network testnet
   ```

2. **Verify deployment**:
   ```bash
   # Check deployment info
   cat deployment.json
   ```

## IPFS Provider Configuration

### Pinata Setup

1. **Create Pinata account**:
   - Visit https://www.pinata.cloud/
   - Sign up for a free account

2. **Get API keys**:
   - Go to API Keys section
   - Create a new API key with pinning permissions

3. **Configure environment variables**:
   ```bash
   IPFS_PROVIDER=pinata
   PINATA_API_KEY=your_pinata_api_key
   PINATA_SECRET_API_KEY=your_pinata_secret_api_key
   ```

### Infura Setup

1. **Create Infura account**:
   - Visit https://infura.io/
   - Sign up for a free account

2. **Create IPFS project**:
   - Go to IPFS section
   - Create a new project

3. **Get project credentials**:
   - Project ID and Secret from the project dashboard

4. **Configure environment variables**:
   ```bash
   IPFS_PROVIDER=infura
   INFURA_PROJECT_ID=your_infura_project_id
   INFURA_PROJECT_SECRET=your_infura_project_secret
   ```

## Security Configuration

### SSL/TLS Setup

1. **Obtain SSL certificate**:
   ```bash
   # Using Let's Encrypt
   sudo apt install certbot
   sudo certbot certonly --standalone -d yourdomain.com
   ```

2. **Configure reverse proxy** (Nginx example):
   ```nginx
   server {
       listen 443 ssl;
       server_name yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

       location / {
           proxy_pass http://localhost:3000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### Database Security

1. **Secure PostgreSQL**:
   ```bash
   # Edit postgresql.conf
   listen_addresses = 'localhost'
   ssl = on

   # Edit pg_hba.conf
   hostssl all all 0.0.0.0/0 md5
   ```

2. **Use strong passwords**:
   ```bash
   # Generate strong password
   openssl rand -base64 32
   ```

### API Security

1. **Rate limiting**:
   Already implemented in the backend with express-rate-limit

2. **Input validation**:
   Already implemented with express-validator

3. **JWT security**:
   ```bash
   # Use a strong JWT secret
   openssl rand -base64 32
   ```

## Monitoring and Maintenance

### Health Checks

1. **Backend health endpoint**:
   ```
   GET /api/v1/healthz
   ```

2. **Metrics endpoint**:
   ```
   GET /api/v1/metrics
   ```

### Logging

1. **Structured logging**:
   All services output JSON-formatted logs for easy parsing

2. **Log aggregation**:
   ```bash
   # Using ELK stack
   docker-compose -f docker-compose.logging.yml up
   ```

### Backup Strategy

1. **Database backups**:
   ```bash
   # PostgreSQL backup
   pg_dump -h localhost -U impactx impactx_prod > backup.sql

   # Automated backup with cron
   0 2 * * * pg_dump -h localhost -U impactx impactx_prod > /backups/impactx_$(date +%Y%m%d).sql
   ```

2. **IPFS data**:
   IPFS data is automatically replicated across the network

### Updates and Maintenance

1. **Regular updates**:
   ```bash
   # Update dependencies
   cd backend && npm update
   cd ../frontend && npm update
   ```

2. **Database migrations**:
   ```bash
   cd backend
   npm run migrate
   ```

## Scaling Considerations

### Horizontal Scaling

1. **Backend services**:
   ```bash
   # Scale backend replicas
   kubectl scale deployment backend -n impactx --replicas=3
   ```

2. **Database read replicas**:
   Configure PostgreSQL read replicas for better read performance

### Caching

1. **Redis setup**:
   ```bash
   # Add Redis to docker-compose
   docker-compose -f docker-compose.yml -f docker-compose.cache.yml up
   ```

2. **API response caching**:
   Implement caching for frequently accessed data

### Load Balancing

1. **Kubernetes service**:
   Services automatically load balance between pods

2. **External load balancer**:
   Configure cloud provider load balancer for external access

### Database Optimization

1. **Indexing**:
   ```sql
   -- Add indexes for frequently queried columns
   CREATE INDEX idx_campaigns_status ON campaigns(status);
   CREATE INDEX idx_donations_campaign_id ON donations(campaign_id);
   ```

2. **Connection pooling**:
   Configure connection pooling in the application

## Troubleshooting

### Common Issues

1. **Database connection failures**:
   - Check database credentials
   - Verify network connectivity
   - Ensure database service is running

2. **Algorand node connectivity**:
   - Verify API token
   - Check network configuration
   - Ensure node is accessible

3. **IPFS pinning failures**:
   - Check API keys
   - Verify provider configuration
   - Check file size limits

### Support

For additional support:
- Check the [GitHub Issues](https://github.com/your-org/impactx/issues)
- Join our [Discord community](https://discord.gg/impactx)
- Contact our support team at support@impactx.org

## Conclusion

This deployment guide provides comprehensive instructions for running the ImpactX platform in various environments. The platform is designed to be flexible and scalable, supporting everything from local development to enterprise production deployments.

By following these guidelines, you can successfully deploy a transparent and verifiable disaster relief funding system that leverages the power of blockchain technology to ensure accountability and trust in humanitarian aid.