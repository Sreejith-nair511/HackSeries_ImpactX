# Kubernetes Deployment for ImpactX

This directory contains Kubernetes manifests to deploy the ImpactX application in a Kubernetes cluster.

## Prerequisites

- A Kubernetes cluster (minikube, k3s, or cloud provider)
- kubectl CLI configured to access your cluster
- Docker images built for backend and frontend services

## Building Docker Images

Before deploying to Kubernetes, you need to build the Docker images:

```bash
# Build backend image
docker build -t impactx-backend:latest -f backend/Dockerfile .

# Build frontend image
docker build -t impactx-frontend:latest -f frontend/Dockerfile .
```

If you're using minikube, make sure to build the images in the minikube Docker environment:

```bash
# Set Docker environment to minikube
eval $(minikube docker-env)

# Build images
docker build -t impactx-backend:latest -f backend/Dockerfile .
docker build -t impactx-frontend:latest -f frontend/Dockerfile .
```

## Deploying to Kubernetes

1. Apply the namespace:
   ```bash
   kubectl apply -f namespace.yaml
   ```

2. Apply the PostgreSQL deployment:
   ```bash
   kubectl apply -f postgres-pvc.yaml
   kubectl apply -f postgres-secret.yaml
   kubectl apply -f postgres-deployment.yaml
   ```

3. Apply the Algorand node deployment:
   ```bash
   kubectl apply -f algorand-pvc.yaml
   kubectl apply -f algorand-node-deployment.yaml
   ```

4. Apply the backend deployment:
   ```bash
   kubectl apply -f backend-pvc.yaml
   kubectl apply -f backend-secret.yaml
   kubectl apply -f backend-deployment.yaml
   ```

5. Apply the frontend deployment:
   ```bash
   kubectl apply -f frontend-deployment.yaml
   ```

## Accessing the Application

To access the application, you can use port forwarding:

```bash
# Port forward the frontend service
kubectl port-forward svc/frontend -n impactx 3000:3000

# Port forward the backend service
kubectl port-forward svc/backend -n impactx 5000:5000
```

Or if you have an Ingress controller configured, you can access the application at `http://impactx.local`.

## Configuration

### Secrets

The application uses Kubernetes secrets for sensitive configuration. You should update the secret files with your actual values:

- `postgres-secret.yaml` - Database credentials
- `backend-secret.yaml` - Backend configuration including Algorand and IPFS credentials

To update a secret, you can use kubectl:

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
  -n impactx --dry-run=client -o yaml > backend-secret.yaml
```

## Monitoring and Health Checks

The deployments include readiness and liveness probes:

- Backend: `/api/v1/healthz` endpoint
- Frontend: `/` endpoint

You can check the status of your deployments:

```bash
kubectl get pods -n impactx
kubectl get services -n impactx
kubectl describe pod <pod-name> -n impactx
```

## Scaling

To scale the application, you can update the number of replicas:

```bash
kubectl scale deployment backend -n impactx --replicas=3
kubectl scale deployment frontend -n impactx --replicas=3
```

## Updating the Application

To update the application with new Docker images:

1. Build new images with updated tags
2. Update the deployment files with the new image tags
3. Apply the updated deployments:
   ```bash
   kubectl apply -f backend-deployment.yaml
   kubectl apply -f frontend-deployment.yaml
   ```

## Cleaning Up

To remove all resources:

```bash
kubectl delete -f .
```