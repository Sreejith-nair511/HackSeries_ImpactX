# Deployment Guide

This guide provides detailed instructions for deploying the ImpactX application in different environments.

## Table of Contents

1. [Local Development](#local-development)
2. [Docker Deployment](#docker-deployment)
3. [Kubernetes Deployment](#kubernetes-deployment)
4. [Environment Configuration](#environment-configuration)
5. [Database Migration](#database-migration)
6. [Smart Contract Deployment](#smart-contract-deployment)
7. [Monitoring and Health Checks](#monitoring-and-health-checks)

## Local Development

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (for production environment testing)
- Algorand Sandbox (for local blockchain testing)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   ```
   Update the values in `.env` according to your environment.

4. Run database migrations:
   ```bash
   npm run migrate
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the example environment file and configure it:
   ```bash
   cp .env.example .env
   ```
   Update the values in `.env` according to your environment.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Docker Deployment

### Prerequisites

- Docker
- Docker Compose

### Development Deployment

To run the application in development mode using Docker Compose:

```bash
docker-compose up --build
```

This will start all services:
- PostgreSQL database
- Backend API
- Frontend application
- Algorand sandbox node

### Production Deployment

To run the application in production mode:

```bash
docker-compose -f docker-compose.prod.yml up --build
```

In production mode:
- Uses production-ready Docker images
- Expects environment variables to be set
- Uses persistent volumes for data storage

### Stopping the Services

To stop the services:

```bash
# For development
docker-compose down

# For production
docker-compose -f docker-compose.prod.yml down
```

To stop the services and remove volumes:

```bash
# For development
docker-compose down -v

# For production
docker-compose -f docker-compose.prod.yml down -v
```

## Kubernetes Deployment

### Prerequisites

- A Kubernetes cluster (minikube, k3s, or cloud provider)
- kubectl CLI configured to access your cluster
- Docker images built for backend and frontend services

### Deployment Steps

1. Apply the namespace:
   ```bash
   kubectl apply -f k8s/namespace.yaml
   ```

2. Apply the PostgreSQL deployment:
   ```bash
   kubectl apply -f k8s/postgres-pvc.yaml
   kubectl apply -f k8s/postgres-secret.yaml
   kubectl apply -f k8s/postgres-deployment.yaml
   ```

3. Apply the Algorand node deployment:
   ```bash
   kubectl apply -f k8s/algorand-pvc.yaml
   kubectl apply -f k8s/algorand-node-deployment.yaml
   ```

4. Apply the backend deployment:
   ```bash
   kubectl apply -f k8s/backend-pvc.yaml
   kubectl apply -f k8s/backend-secret.yaml
   kubectl apply -f k8s/backend-deployment.yaml
   ```

5. Apply the frontend deployment:
   ```bash
   kubectl apply -f k8s/frontend-deployment.yaml
   ```

### Accessing the Application

To access the application, you can use port forwarding:

```bash
# Port forward the frontend service
kubectl port-forward svc/frontend -n impactx 3000:3000

# Port forward the backend service
kubectl port-forward svc/backend -n impactx 5000:5000
```

## Environment Configuration

### Backend Environment Variables

The backend requires the following environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| DATABASE_URL | PostgreSQL database connection string | postgresql://user:password@host:port/database |
| ALGOD_SERVER | Algorand node server address | http://algorand-node:4001 |
| ALGOD_PORT | Algorand node port | 4001 |
| ALGOD_TOKEN | Algorand node API token | aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa |
| ALGOD_NETWORK | Algorand network | testnet |
| IPFS_PROVIDER | IPFS provider | pinata or infura |
| PINATA_API_KEY | Pinata API key | your-pinata-api-key |
| PINATA_SECRET_API_KEY | Pinata secret API key | your-pinata-secret-api-key |
| INFURA_PROJECT_ID | Infura project ID | your-infura-project-id |
| INFURA_PROJECT_SECRET | Infura project secret | your-infura-project-secret |
| JWT_SECRET | JWT secret for authentication | your-super-secret-jwt-key |
| PORT | Server port | 5000 |

### Frontend Environment Variables

The frontend requires the following environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:5000 |

## Database Migration

### Running Migrations

To run database migrations in development:

```bash
cd backend
npm run migrate
```

To run database migrations in production:

```bash
cd backend
npm run migrate:prod
```

### Seeding Data

To seed the database with initial data:

```bash
cd backend
npm run seed
```

## Smart Contract Deployment

### Deploying to TestNet

To deploy the TEAL smart contract to Algorand TestNet:

```bash
cd backend
node scripts/deploy_teal.js --network testnet
```

### Deploying to MainNet

To deploy the TEAL smart contract to Algorand MainNet:

```bash
cd backend
node scripts/deploy_teal.js --network mainnet
```

The deployment script will output the application ID and escrow address.

## Monitoring and Health Checks

### Health Check Endpoints

The backend provides health check endpoints:

- `/api/v1/healthz` - Basic health check
- `/api/v1/metrics` - Prometheus-compatible metrics

### Logs

All services output structured JSON logs that can be collected and analyzed by logging solutions like ELK stack or cloud logging services.

### Monitoring

For production deployments, consider setting up:

1. **Application Performance Monitoring (APM)**:
   - Track API response times
   - Monitor database query performance
   - Track blockchain interaction performance

2. **Infrastructure Monitoring**:
   - CPU and memory usage
   - Disk space utilization
   - Network I/O

3. **Alerting**:
   - Set up alerts for critical errors
   - Configure notifications for performance degradation
   - Monitor blockchain node health

## Troubleshooting

### Common Issues

1. **Database Connection Issues**:
   - Verify database credentials in `.env`
   - Check if the database service is running
   - Ensure network connectivity between services

2. **Algorand Node Connection Issues**:
   - Verify Algorand node configuration
   - Check if the node is running and accessible
   - Ensure API token is correct

3. **IPFS Pinning Issues**:
   - Verify IPFS provider credentials
   - Check if the provider service is accessible
   - Ensure file size limits are not exceeded

### Getting Help

If you encounter issues not covered in this guide:

1. Check the application logs for error messages
2. Verify all environment variables are correctly set
3. Ensure all services are running and accessible
4. Consult the [README-dev.md](../README-dev.md) for additional information