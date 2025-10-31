# Deployment Guide

## Overview

This guide provides detailed instructions for deploying the ImpactX platform in various environments, from local development to production-scale Kubernetes clusters. It covers system requirements, installation procedures, configuration options, and troubleshooting tips.

## System Requirements

### Hardware Specifications

#### Minimum Requirements
- **CPU**: 4 cores
- **RAM**: 8 GB
- **Storage**: 50 GB SSD
- **Network**: 100 Mbps connection

#### Recommended Specifications
- **CPU**: 8 cores
- **RAM**: 16 GB
- **Storage**: 200 GB SSD
- **Network**: 1 Gbps connection

#### High Availability Setup
- **CPU**: 16 cores (across multiple nodes)
- **RAM**: 32 GB (across multiple nodes)
- **Storage**: 1 TB SSD (distributed storage)
- **Network**: 10 Gbps connection

### Software Dependencies

#### Operating Systems
- **Linux**: Ubuntu 20.04 LTS or CentOS 8
- **Container Platforms**: Docker Engine 20.10+
- **Orchestration**: Kubernetes 1.21+

#### Runtime Environments
- **Node.js**: Version 16.x LTS
- **Python**: Version 3.9+
- **Go**: Version 1.17+
- **Java**: Version 11 LTS

#### Database Systems
- **PostgreSQL**: Version 13+
- **MongoDB**: Version 5.0+
- **Redis**: Version 6.2+

#### Blockchain Components
- **Algorand Node**: Latest stable release
- **Polygon Node**: Latest stable release
- **Stellar Node**: Latest stable release

## Local Development Setup

### Prerequisites Installation

1. **Install Docker**
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install docker.io docker-compose
   
   # CentOS/RHEL
   sudo yum install docker docker-compose
   
   # Start Docker service
   sudo systemctl start docker
   sudo systemctl enable docker
   ```

2. **Install Node.js**
   ```bash
   # Using Node Version Manager (NVM)
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   nvm install --lts
   nvm use --lts
   ```

3. **Install Python Dependencies**
   ```bash
   # Install Python 3.9
   sudo apt install python3.9 python3.9-venv python3.9-dev
   
   # Create virtual environment
   python3.9 -m venv impactx-env
   source impactx-env/bin/activate
   
   # Install required packages
   pip install -r requirements.txt
   ```

### Repository Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/impactx/impactx-platform.git
   cd impactx-platform
   ```

2. **Environment Configuration**
   ```bash
   # Copy example environment files
   cp .env.example .env
   cp frontend/.env.example frontend/.env
   cp backend/.env.example backend/.env
   
   # Edit configuration files
   nano .env
   nano frontend/.env
   nano backend/.env
   ```

3. **Install Dependencies**
   ```bash
   # Backend dependencies
   cd backend
   npm install
   
   # Frontend dependencies
   cd ../frontend
   npm install
   
   # Return to root directory
   cd ..
   ```

### Starting Development Services

1. **Launch with Docker Compose**
   ```bash
   # Start all services
   docker-compose up --build
   
   # Start services in detached mode
   docker-compose up -d --build
   
   # View logs
   docker-compose logs -f
   ```

2. **Access Development Environment**
   - **Frontend**: http://localhost:3000
   - **Backend API**: http://localhost:5000
   - **Database**: PostgreSQL on port 5432
   - **Redis**: Port 6379
   - **MongoDB**: Port 27017

3. **Development Workflow**
   ```bash
   # Run backend in development mode
   cd backend
   npm run dev
   
   # Run frontend in development mode
   cd ../frontend
   npm run dev
   
   # Run tests
   npm test
   
   # Run linting
   npm run lint
   ```

## Staging Environment Deployment

### Infrastructure Preparation

1. **Server Provisioning**
   ```bash
   # Create staging servers (example with AWS CLI)
   aws ec2 run-instances \
     --image-id ami-0abcdef1234567890 \
     --count 3 \
     --instance-type t3.medium \
     --key-name impactx-staging \
     --security-group-ids sg-0123456789abcdef0 \
     --subnet-id subnet-0123456789abcdef0
   ```

2. **Network Configuration**
   ```bash
   # Configure load balancer
   aws elb create-load-balancer \
     --load-balancer-name impactx-staging \
     --listeners Protocol=HTTP,LoadBalancerPort=80,InstanceProtocol=HTTP,InstancePort=3000 \
     --availability-zones us-west-2a us-west-2b
   ```

3. **DNS Setup**
   ```bash
   # Configure staging domain
   aws route53 change-resource-record-sets \
     --hosted-zone-id Z1234567890ABCDEF \
     --change-batch file://staging-dns.json
   ```

### Application Deployment

1. **Build and Push Docker Images**
   ```bash
   # Build images
   docker-compose -f docker-compose.staging.yml build
   
   # Tag images
   docker tag impactx_frontend:latest impactx/frontend:staging-latest
   docker tag impactx_backend:latest impactx/backend:staging-latest
   
   # Push to container registry
   docker push impactx/frontend:staging-latest
   docker push impactx/backend:staging-latest
   ```

2. **Deploy to Staging Servers**
   ```bash
   # Deploy using docker-compose
   docker-compose -f docker-compose.staging.yml up -d
   
   # Verify deployment
   docker-compose -f docker-compose.staging.yml ps
   ```

3. **Configuration Management**
   ```bash
   # Apply staging environment variables
   docker-compose -f docker-compose.staging.yml exec backend envsubst < .env.staging > /app/.env
   
   # Restart services with new configuration
   docker-compose -f docker-compose.staging.yml restart
   ```

## Production Deployment

### Kubernetes Cluster Setup

1. **Cluster Creation**
   ```bash
   # Create cluster with kops (example)
   kops create cluster \
     --name=impactx.prod.example.com \
     --zones=us-west-2a,us-west-2b,us-west-2c \
     --node-count=3 \
     --node-size=t3.large \
     --master-size=t3.medium \
     --dns-zone=example.com
   ```

2. **Helm Chart Installation**
   ```bash
   # Add ImpactX Helm repository
   helm repo add impactx https://helm.impactx.org
   
   # Update repository
   helm repo update
   
   # Install ImpactX chart
   helm install impactx-prod impactx/impactx-platform \
     --namespace impactx-prod \
     --create-namespace \
     --values values-production.yaml
   ```

3. **Persistent Storage Configuration**
   ```yaml
   # storage-class.yaml
   apiVersion: storage.k8s.io/v1
   kind: StorageClass
   metadata:
     name: impactx-storage
   provisioner: kubernetes.io/aws-ebs
   parameters:
     type: gp3
     fsType: ext4
   ```
   ```bash
   kubectl apply -f storage-class.yaml
   ```

### Service Configuration

1. **Ingress Controller Setup**
   ```yaml
   # ingress.yaml
   apiVersion: networking.k8s.io/v1
   kind: Ingress
   metadata:
     name: impactx-ingress
     annotations:
       kubernetes.io/ingress.class: nginx
       cert-manager.io/cluster-issuer: letsencrypt-prod
   spec:
     tls:
     - hosts:
       - impactx.org
       secretName: impactx-tls
     rules:
     - host: impactx.org
       http:
         paths:
         - path: /
           pathType: Prefix
           backend:
             service:
               name: impactx-frontend
               port:
                 number: 80
   ```
   ```bash
   kubectl apply -f ingress.yaml
   ```

2. **Database Configuration**
   ```yaml
   # postgres.yaml
   apiVersion: apps/v1
   kind: StatefulSet
   metadata:
     name: impactx-postgres
   spec:
     serviceName: "postgres"
     replicas: 3
     selector:
       matchLabels:
         app: postgres
     template:
       metadata:
         labels:
           app: postgres
       spec:
         containers:
         - name: postgres
           image: postgres:13
           ports:
           - containerPort: 5432
           env:
           - name: POSTGRES_DB
             value: "impactx"
           - name: POSTGRES_USER
             valueFrom:
               secretKeyRef:
                 name: postgres-secret
                 key: username
           - name: POSTGRES_PASSWORD
             valueFrom:
               secretKeyRef:
                 name: postgres-secret
                 key: password
           volumeMounts:
           - name: postgres-storage
             mountPath: /var/lib/postgresql/data
     volumeClaimTemplates:
     - metadata:
         name: postgres-storage
       spec:
         accessModes: [ "ReadWriteOnce" ]
         storageClassName: "impactx-storage"
         resources:
           requests:
             storage: 100Gi
   ```

3. **Blockchain Node Deployment**
   ```yaml
   # algorand-node.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: algorand-node
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: algorand-node
     template:
       metadata:
         labels:
           app: algorand-node
       spec:
         containers:
         - name: algorand
           image: algorand/node:latest
           ports:
           - containerPort: 8080
           volumeMounts:
           - name: algorand-data
             mountPath: /algod/data
           env:
           - name: ALGOD_TOKEN
             valueFrom:
               secretKeyRef:
                 name: algorand-secret
                 key: token
         volumes:
         - name: algorand-data
           persistentVolumeClaim:
             claimName: algorand-pvc
   ```

### Monitoring and Logging

1. **Prometheus Setup**
   ```yaml
   # prometheus-config.yaml
   global:
     scrape_interval: 15s
   scrape_configs:
   - job_name: 'impactx-backend'
     static_configs:
     - targets: ['impactx-backend:5000']
   - job_name: 'impactx-frontend'
     static_configs:
     - targets: ['impactx-frontend:3000']
   - job_name: 'postgresql'
     static_configs:
     - targets: ['impactx-postgres:9187']
   ```

2. **Grafana Dashboard**
   ```bash
   # Install Grafana
   helm install grafana grafana/grafana \
     --namespace monitoring \
     --set adminPassword=secure-password \
     --set ingress.enabled=true \
     --set ingress.hosts[0]=grafana.impactx.org
   ```

3. **Log Aggregation**
   ```yaml
   # fluentd-config.yaml
   <source>
     @type tail
     path /var/log/containers/impactx-*.log
     pos_file /var/log/fluentd-containers.log.pos
     tag kubernetes.*
     read_from_head true
     <parse>
       @type json
       time_format %Y-%m-%dT%H:%M:%S.%NZ
     </parse>
   </source>
   
   <match kubernetes.**>
     @type elasticsearch
     host elasticsearch.logging.svc.cluster.local
     port 9200
     logstash_format true
   </match>
   ```

## Backup and Disaster Recovery

### Automated Backups

1. **Database Backup Script**
   ```bash
   #!/bin/bash
   # backup-database.sh
   
   DATE=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/backups/database"
   
   # Create backup directory
   mkdir -p $BACKUP_DIR
   
   # Backup PostgreSQL
   pg_dump -h postgres -U impactx -d impactx > $BACKUP_DIR/impactx_$DATE.sql
   
   # Compress backup
   gzip $BACKUP_DIR/impactx_$DATE.sql
   
   # Upload to cloud storage
   aws s3 cp $BACKUP_DIR/impactx_$DATE.sql.gz s3://impactx-backups/database/
   
   # Remove local backup older than 30 days
   find $BACKUP_DIR -name "impactx_*.sql.gz" -mtime +30 -delete
   ```

2. **Blockchain Node Backup**
   ```bash
   # backup-blockchain.sh
   
   DATE=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/backups/blockchain"
   
   # Stop node temporarily
   docker-compose stop algorand-node
   
   # Create backup
   tar -czf $BACKUP_DIR/algorand_$DATE.tar.gz /var/lib/algorand/data
   
   # Restart node
   docker-compose start algorand-node
   
   # Upload to cloud storage
   aws s3 cp $BACKUP_DIR/algorand_$DATE.tar.gz s3://impactx-backups/blockchain/
   ```

### Recovery Procedures

1. **Database Restoration**
   ```bash
   # restore-database.sh
   
   # Download backup
   aws s3 cp s3://impactx-backups/database/impactx_20231201_120000.sql.gz /tmp/
   
   # Decompress
   gunzip /tmp/impactx_20231201_120000.sql.gz
   
   # Restore
   psql -h postgres -U impactx -d impactx < /tmp/impactx_20231201_120000.sql
   ```

2. **Blockchain Node Recovery**
   ```bash
   # restore-blockchain.sh
   
   # Download backup
   aws s3 cp s3://impactx-backups/blockchain/algorand_20231201_120000.tar.gz /tmp/
   
   # Stop node
   docker-compose stop algorand-node
   
   # Restore data
   tar -xzf /tmp/algorand_20231201_120000.tar.gz -C /var/lib/algorand/
   
   # Start node
   docker-compose start algorand-node
   ```

## Security Considerations

### Network Security

1. **Firewall Configuration**
   ```bash
   # UFW configuration
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   sudo ufw allow ssh
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw allow 5432/tcp from 10.0.0.0/8
   sudo ufw enable
   ```

2. **TLS/SSL Setup**
   ```bash
   # Install Certbot
   sudo apt install certbot python3-certbot-nginx
   
   # Obtain certificate
   sudo certbot --nginx -d impactx.org -d www.impactx.org
   
   # Auto-renewal
   sudo crontab -e
   # Add: 0 12 * * * /usr/bin/certbot renew --quiet
   ```

### Access Control

1. **SSH Security**
   ```bash
   # /etc/ssh/sshd_config
   Port 2222
   PermitRootLogin no
   PasswordAuthentication no
   PubkeyAuthentication yes
   AuthorizedKeysFile .ssh/authorized_keys
   ```

2. **Database Security**
   ```sql
   -- Create application user with limited permissions
   CREATE USER impactx_app WITH PASSWORD 'strong-password';
   GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO impactx_app;
   GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO impactx_app;
   ```

## Performance Optimization

### Database Tuning

1. **PostgreSQL Configuration**
   ```conf
   # postgresql.conf
   shared_buffers = 2GB
   effective_cache_size = 6GB
   maintenance_work_mem = 512MB
   checkpoint_completion_target = 0.9
   wal_buffers = 16MB
   default_statistics_target = 100
   random_page_cost = 1.1
   effective_io_concurrency = 200
   work_mem = 16MB
   min_wal_size = 2GB
   max_wal_size = 8GB
   ```

2. **Connection Pooling**
   ```yaml
   # pgbouncer.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: pgbouncer
   spec:
     replicas: 2
     selector:
       matchLabels:
         app: pgbouncer
     template:
       metadata:
         labels:
           app: pgbouncer
       spec:
         containers:
         - name: pgbouncer
           image: bitnami/pgbouncer:latest
           ports:
           - containerPort: 5432
           env:
           - name: POSTGRESQL_HOST
             value: "impactx-postgres"
           - name: POSTGRESQL_PORT
             value: "5432"
           - name: POSTGRESQL_USERNAME
             valueFrom:
               secretKeyRef:
                 name: postgres-secret
                 key: username
           - name: POSTGRESQL_PASSWORD
             valueFrom:
               secretKeyRef:
                 name: postgres-secret
                 key: password
           - name: PGBOUNCER_DATABASE
             value: "impactx"
           - name: PGBOUNCER_POOL_MODE
             value: "transaction"
   ```

### Caching Strategy

1. **Redis Configuration**
   ```conf
   # redis.conf
   maxmemory 2gb
   maxmemory-policy allkeys-lru
   save 900 1
   save 300 10
   save 60 10000
   tcp-keepalive 300
   timeout 300
   ```

2. **CDN Integration**
   ```javascript
   // frontend/src/config/cdn.js
   const CDN_CONFIG = {
     provider: 'cloudflare',
     zoneId: 'your-zone-id',
     apiKey: process.env.CLOUDFLARE_API_KEY,
     cacheRules: [
       {
         pattern: '/static/*',
         ttl: 86400 // 24 hours
       },
       {
         pattern: '/api/data/*',
         ttl: 3600 // 1 hour
       }
     ]
   };
   
   module.exports = CDN_CONFIG;
   ```

This deployment guide provides comprehensive instructions for setting up the ImpactX platform in various environments. By following these procedures, you can ensure a secure, scalable, and high-performing deployment that meets the needs of humanitarian aid distribution.