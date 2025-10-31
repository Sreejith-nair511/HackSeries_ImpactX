# Deployment Guide for ImpactX Disaster Response Platform

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Configuration](#database-configuration)
4. [Service Deployment](#service-deployment)
5. [Frontend Deployment](#frontend-deployment)
6. [Load Balancer Configuration](#load-balancer-configuration)
7. [SSL Certificate Setup](#ssl-certificate-setup)
8. [Monitoring and Logging](#monitoring-and-logging)
9. [Backup and Recovery](#backup-and-recovery)
10. [Disaster Recovery](#disaster-recovery)
11. [Performance Tuning](#performance-tuning)
12. [Security Hardening](#security-hardening)
13. [Testing and Validation](#testing-and-validation)
14. [Rollback Procedures](#rollback-procedures)

## Prerequisites

### Hardware Requirements
- **Production Environment**:
  - Minimum 32GB RAM per server
  - 100GB free disk space (SSD recommended)
  - Octa-core processor or better
  - Redundant network interfaces
  - UPS power protection

- **Staging Environment**:
  - Minimum 16GB RAM per server
  - 50GB free disk space
  - Quad-core processor
  - Network connectivity
  - Backup power supply

- **Development Environment**:
  - Minimum 8GB RAM
  - 20GB free disk space
  - Quad-core processor
  - Stable internet connection

### Software Dependencies
#### Operating System
- Ubuntu 20.04 LTS or newer
- CentOS 8 or newer
- Red Hat Enterprise Linux 8 or newer

#### Runtime Environments
- Node.js v16.x or higher
- Python 3.8+ (for certain scripts and tools)
- Docker v20.x or higher
- Kubernetes v1.20+ (for containerized deployments)
- MongoDB v5.x or higher
- Redis v6.x or higher
- NGINX v1.18+ (for reverse proxy and load balancing)

#### Development Tools
- Git v2.30+
- Docker Compose v1.29+
- kubectl v1.20+
- Helm v3.5+
- Terraform v1.0+ (for infrastructure as code)

#### Monitoring Tools
- Prometheus v2.30+
- Grafana v8.0+
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Alertmanager v0.23+

## Environment Setup

### Production Environment
1. **Server Provisioning**:
   ```bash
   # Example using Terraform for AWS infrastructure
   terraform init
   terraform plan -var-file="production.tfvars"
   terraform apply -var-file="production.tfvars"
   ```

2. **Network Configuration**:
   - Configure security groups and firewall rules
   - Set up VPC and subnets
   - Configure DNS records
   - Set up VPN for administrative access

3. **OS Hardening**:
   ```bash
   # Update system packages
   sudo apt update && sudo apt upgrade -y
   
   # Install security packages
   sudo apt install fail2ban ufw -y
   
   # Configure firewall
   sudo ufw enable
   sudo ufw default deny incoming
   sudo ufw default allow outgoing
   ```

### Staging Environment
1. **Server Provisioning**:
   ```bash
   # Example using Docker for local staging
   docker-machine create --driver digitalocean \
     --digitalocean-access-token=YOUR_TOKEN \
     impactx-staging
   ```

2. **Environment Configuration**:
   - Set up staging subdomain (staging.impactx.org)
   - Configure staging database
   - Set up monitoring for staging environment

### Development Environment
1. **Local Setup**:
   ```bash
   # Clone repository
   git clone https://github.com/your-org/impactx.git
   cd impactx
   
   # Install dependencies
   npm install
   ```

2. **Docker Development Environment**:
   ```bash
   # Start development environment
   docker-compose -f docker-compose.dev.yml up -d
   ```

## Database Configuration

### MongoDB Setup
1. **Installation**:
   ```bash
   # On Ubuntu/Debian
   wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
   echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/5.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-5.0.list
   sudo apt-get update
   sudo apt-get install -y mongodb-org
   ```

2. **Configuration**:
   ```yaml
   # /etc/mongod.conf
   storage:
     dbPath: /var/lib/mongodb
     journal:
       enabled: true
   
   systemLog:
     destination: file
     logAppend: true
     path: /var/log/mongodb/mongod.log
   
   net:
     port: 27017
     bindIp: 127.0.0.1,server_ip
   
   replication:
     replSetName: impactxReplicaSet
   ```

3. **Replica Set Initialization**:
   ```javascript
   // Connect to MongoDB shell
   mongo
   
   // Initialize replica set
   rs.initiate({
     _id: "impactxReplicaSet",
     members: [
       { _id: 0, host: "mongo1:27017" },
       { _id: 1, host: "mongo2:27017" },
       { _id: 2, host: "mongo3:27017" }
     ]
   })
   ```

### Redis Setup
1. **Installation**:
   ```bash
   # On Ubuntu/Debian
   sudo apt update
   sudo apt install redis-server -y
   ```

2. **Configuration**:
   ```conf
   # /etc/redis/redis.conf
   bind 127.0.0.1 server_ip
   port 6379
   requirepass your_redis_password
   maxmemory 2gb
   maxmemory-policy allkeys-lru
   appendonly yes
   ```

3. **Security Configuration**:
   ```bash
   # Enable Redis authentication
   sudo sed -i 's/# requirepass foobared/requirepass your_redis_password/' /etc/redis/redis.conf
   
   # Restart Redis service
   sudo systemctl restart redis
   ```

## Service Deployment

### Microservices Architecture
The ImpactX platform follows a microservices architecture with the following services:

1. **User Service** (Port 3001)
2. **Resource Service** (Port 3002)
3. **Communication Service** (Port 3003)
4. **Analytics Service** (Port 3004)
5. **Governance Service** (Port 3005)
6. **Document Service** (Port 3006)
7. **Notification Service** (Port 3007)
8. **IoT Service** (Port 3008)
9. **Blockchain Service** (Port 3009)

### Docker Deployment
1. **Build Service Images**:
   ```bash
   # Build all services
   ./scripts/build-services.sh
   ```

2. **Docker Compose Configuration**:
   ```yaml
   # docker-compose.yml
   version: '3.8'
   
   services:
     user-service:
       image: impactx/user-service:latest
       ports:
         - "3001:3001"
       environment:
         - DB_HOST=mongodb://mongo1:27017,mongo2:27017,mongo3:27017
         - REDIS_URL=redis://redis:6379
       depends_on:
         - mongodb
         - redis
   
     # ... other services
   
     mongodb:
       image: mongo:5.0
       ports:
         - "27017:27017"
       volumes:
         - mongo_data:/data/db
   
     redis:
       image: redis:6.2
       ports:
         - "6379:6379"
       command: redis-server --requirepass your_redis_password
   
   volumes:
     mongo_data:
   ```

3. **Start Services**:
   ```bash
   # Start all services
   docker-compose up -d
   
   # Check service status
   docker-compose ps
   ```

### Kubernetes Deployment
1. **Helm Chart Deployment**:
   ```bash
   # Add Helm repository
   helm repo add impactx https://your-org.github.io/impactx-helm-charts
   
   # Install ImpactX platform
   helm install impactx-platform impactx/impactx-platform \
     --namespace impactx \
     --create-namespace \
     --set mongodb.auth.rootPassword=your_mongo_password \
     --set redis.auth.password=your_redis_password
   ```

2. **Manual Kubernetes Deployment**:
   ```bash
   # Create namespace
   kubectl create namespace impactx
   
   # Deploy services
   kubectl apply -f kubernetes/manifests/ -n impactx
   
   # Check deployment status
   kubectl get pods -n impactx
   kubectl get services -n impactx
   ```

## Frontend Deployment

### Build Process
1. **Environment Configuration**:
   ```bash
   # Create production environment file
   cp .env.example .env.production
   ```

2. **Build Frontend**:
   ```bash
   # Navigate to frontend directory
   cd frontend
   
   # Install dependencies
   npm install
   
   # Build for production
   npm run build:prod
   ```

### Deployment Options
1. **Static File Deployment**:
   ```bash
   # Copy build files to web server
   scp -r build/* user@webserver:/var/www/impactx/
   ```

2. **Docker Deployment**:
   ```dockerfile
   # Dockerfile for frontend
   FROM nginx:alpine
   
   COPY build/ /usr/share/nginx/html/
   
   COPY nginx.conf /etc/nginx/nginx.conf
   
   EXPOSE 80
   
   CMD ["nginx", "-g", "daemon off;"]
   ```

3. **Kubernetes Deployment**:
   ```yaml
   # frontend-deployment.yaml
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: impactx-frontend
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: impactx-frontend
     template:
       metadata:
         labels:
           app: impactx-frontend
       spec:
         containers:
         - name: frontend
           image: impactx/frontend:latest
           ports:
           - containerPort: 80
   ---
   apiVersion: v1
   kind: Service
   metadata:
     name: impactx-frontend-service
   spec:
     selector:
       app: impactx-frontend
     ports:
     - port: 80
       targetPort: 80
     type: LoadBalancer
   ```

## Load Balancer Configuration

### NGINX Configuration
```nginx
# /etc/nginx/sites-available/impactx
upstream backend {
    server user-service:3001;
    server resource-service:3002;
    server communication-service:3003;
    server analytics-service:3004;
    server governance-service:3005;
    server document-service:3006;
    server notification-service:3007;
    server iot-service:3008;
    server blockchain-service:3009;
}

server {
    listen 80;
    server_name impactx.org www.impactx.org;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name impactx.org www.impactx.org;
    
    ssl_certificate /etc/ssl/certs/impactx.crt;
    ssl_certificate_key /etc/ssl/private/impactx.key;
    
    # SSL configuration
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    
    location / {
        root /var/www/impactx;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Load Balancer Health Checks
```bash
# Configure health check endpoints for each service
# Example for user service
curl -f http://user-service:3001/health || exit 1
```

## SSL Certificate Setup

### Let's Encrypt Certificate
1. **Install Certbot**:
   ```bash
   sudo apt install certbot python3-certbot-nginx -y
   ```

2. **Obtain Certificate**:
   ```bash
   sudo certbot --nginx -d impactx.org -d www.impactx.org
   ```

3. **Automatic Renewal**:
   ```bash
   # Test renewal
   sudo certbot renew --dry-run
   
   # Add to crontab for automatic renewal
   echo "0 12 * * * /usr/bin/certbot renew --quiet" | sudo crontab -
   ```

### Custom Certificate
1. **Install Certificate**:
   ```bash
   # Copy certificate files
   sudo cp impactx.crt /etc/ssl/certs/
   sudo cp impactx.key /etc/ssl/private/
   
   # Set proper permissions
   sudo chmod 644 /etc/ssl/certs/impactx.crt
   sudo chmod 600 /etc/ssl/private/impactx.key
   ```

## Monitoring and Logging

### Prometheus Configuration
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'impactx-services'
    static_configs:
      - targets: [
          'user-service:3001',
          'resource-service:3002',
          'communication-service:3003',
          'analytics-service:3004',
          'governance-service:3005',
          'document-service:3006',
          'notification-service:3007',
          'iot-service:3008',
          'blockchain-service:3009'
        ]
```

### Grafana Dashboard
1. **Import Pre-built Dashboards**:
   - System metrics dashboard
   - Application performance dashboard
   - Database performance dashboard
   - API response time dashboard

2. **Custom Metrics**:
   ```javascript
   // Example custom metric in Node.js service
   const prometheus = require('prometheus-client');
   
   const httpRequestDuration = new prometheus.Histogram({
     name: 'http_request_duration_seconds',
     help: 'Duration of HTTP requests in seconds',
     labelNames: ['method', 'route', 'status_code']
   });
   ```

### ELK Stack Configuration
1. **Elasticsearch Configuration**:
   ```yaml
   # elasticsearch.yml
   cluster.name: impactx-logging
   node.name: elasticsearch-node-1
   network.host: 0.0.0.0
   discovery.type: single-node
   ```

2. **Logstash Configuration**:
   ```ruby
   # logstash.conf
   input {
     beats {
       port => 5044
     }
   }
   
   filter {
     if [service] =~ /.*-service/ {
       json {
         source => "message"
       }
     }
   }
   
   output {
     elasticsearch {
       hosts => ["elasticsearch:9200"]
       index => "impactx-logs-%{+YYYY.MM.dd}"
     }
   }
   ```

3. **Filebeat Configuration**:
   ```yaml
   # filebeat.yml
   filebeat.inputs:
   - type: log
     enabled: true
     paths:
       - /var/log/impactx/*.log
   
   output.logstash:
     hosts: ["logstash:5044"]
   ```

## Backup and Recovery

### Database Backup
1. **MongoDB Backup Script**:
   ```bash
   #!/bin/bash
   # backup-mongodb.sh
   
   DATE=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/backup/mongodb"
   
   # Create backup
   mongodump --host mongodb://mongo1:27017,mongo2:27017,mongo3:27017 \
     --username backup_user \
     --password backup_password \
     --out $BACKUP_DIR/$DATE
   
   # Compress backup
   tar -czf $BACKUP_DIR/${DATE}.tar.gz $BACKUP_DIR/$DATE
   
   # Remove uncompressed backup
   rm -rf $BACKUP_DIR/$DATE
   
   # Remove backups older than 30 days
   find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
   ```

2. **Automated Backup Schedule**:
   ```cron
   # Daily backup at 2 AM
   0 2 * * * /scripts/backup-mongodb.sh
   
   # Weekly full backup on Sundays at 1 AM
   0 1 * * 0 /scripts/backup-mongodb-full.sh
   ```

### File Backup
1. **Application Files Backup**:
   ```bash
   #!/bin/bash
   # backup-files.sh
   
   DATE=$(date +%Y%m%d_%H%M%S)
   BACKUP_DIR="/backup/files"
   
   # Backup configuration files
   tar -czf $BACKUP_DIR/configs_$DATE.tar.gz /etc/impactx/
   
   # Backup application files
   tar -czf $BACKUP_DIR/app_$DATE.tar.gz /var/www/impactx/
   
   # Remove backups older than 30 days
   find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
   ```

## Disaster Recovery

### Recovery Plan
1. **Data Recovery**:
   ```bash
   # Restore MongoDB from backup
   tar -xzf /backup/mongodb/20230101_020000.tar.gz -C /tmp/
   mongorestore --host mongodb://mongo1:27017,mongo2:27017,mongo3:27017 \
     --username backup_user \
     --password backup_password \
     /tmp/20230101_020000/
   ```

2. **Application Recovery**:
   ```bash
   # Restore application files
   tar -xzf /backup/files/app_20230101_020000.tar.gz -C /
   
   # Restart services
   docker-compose down
   docker-compose up -d
   ```

3. **Failover Process**:
   - Detect primary site failure
   - Activate secondary site
   - Update DNS records
   - Notify stakeholders
   - Monitor recovery progress

## Performance Tuning

### Database Optimization
1. **MongoDB Indexes**:
   ```javascript
   // Create compound indexes for common queries
   db.users.createIndex({ "organization": 1, "role": 1 })
   db.resources.createIndex({ "location": "2dsphere", "status": 1 })
   db.projects.createIndex({ "status": 1, "priority": 1 })
   ```

2. **Query Optimization**:
   ```javascript
   // Use projection to limit returned fields
   db.users.find({ organization: "ngo123" }, { firstName: 1, lastName: 1, email: 1 })
   
   // Implement pagination for large datasets
   db.projects.find({ status: "active" }).skip(0).limit(10)
   ```

### Caching Strategy
1. **Redis Caching**:
   ```javascript
   const redis = require('redis');
   const client = redis.createClient({
     host: 'redis',
     port: 6379,
     password: 'your_redis_password'
   });
   
   // Cache frequently accessed data
   app.get('/api/users/:id', async (req, res) => {
     const cacheKey = `user:${req.params.id}`;
     
     // Check cache first
     const cached = await client.get(cacheKey);
     if (cached) {
       return res.json(JSON.parse(cached));
     }
     
     // Fetch from database if not in cache
     const user = await User.findById(req.params.id);
     
     // Store in cache with 1 hour expiration
     await client.setex(cacheKey, 3600, JSON.stringify(user));
     
     res.json(user);
   });
   ```

### Load Testing
1. **Artillery Test Script**:
   ```yaml
   # load-test.yml
   config:
     target: "https://impactx.org"
     phases:
       - duration: 60
         arrivalRate: 5
       - duration: 120
         arrivalRate: 10
     defaults:
       headers:
         content-type: "application/json"
   
   scenarios:
     - name: "User Authentication"
       flow:
         - post:
             url: "/api/v1/auth/login"
             json:
               email: "test@example.com"
               password: "password123"
         - get:
             url: "/api/v1/users/profile"
             headers:
               Authorization: "Bearer {{ token }}"
   ```

2. **Run Load Test**:
   ```bash
   artillery run load-test.yml
   ```

## Security Hardening

### Network Security
1. **Firewall Configuration**:
   ```bash
   # UFW rules for ImpactX services
   sudo ufw allow ssh
   sudo ufw allow 'Nginx Full'
   sudo ufw allow from 10.0.0.0/8 to any port 27017
   sudo ufw allow from 10.0.0.0/8 to any port 6379
   sudo ufw enable
   ```

2. **Intrusion Detection**:
   ```bash
   # Install and configure Fail2Ban
   sudo apt install fail2ban -y
   
   # Create custom jail for ImpactX
   sudo cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
   sudo nano /etc/fail2ban/jail.local
   ```

### Application Security
1. **Rate Limiting**:
   ```javascript
   const rateLimit = require('express-rate-limit');
   
   const apiLimiter = rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // limit each IP to 100 requests per windowMs
     message: "Too many requests from this IP, please try again later."
   });
   
   app.use('/api/', apiLimiter);
   ```

2. **Input Validation**:
   ```javascript
   const { body, validationResult } = require('express-validator');
   
   app.post('/api/users', [
     body('email').isEmail().normalizeEmail(),
     body('password').isLength({ min: 12 }),
     body('firstName').trim().isLength({ min: 1, max: 50 })
   ], (req, res) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }
     // Process request
   });
   ```

## Testing and Validation

### Automated Testing
1. **Integration Tests**:
   ```javascript
   // integration.test.js
   describe('User Service Integration', () => {
     beforeAll(async () => {
       // Setup test database
       await setupTestDatabase();
     });
     
     afterAll(async () => {
       // Cleanup
       await cleanupTestDatabase();
     });
     
     test('should create a new user', async () => {
       const userData = {
         email: 'test@example.com',
         password: 'password123',
         firstName: 'Test',
         lastName: 'User'
       };
       
       const response = await request(app)
         .post('/api/v1/users')
         .send(userData);
       
       expect(response.status).toBe(201);
       expect(response.body.data.user.email).toBe(userData.email);
     });
   });
   ```

2. **End-to-End Tests**:
   ```javascript
   // e2e.test.js
   describe('User Registration Flow', () => {
     test('should complete user registration', async () => {
       // Navigate to registration page
       await page.goto('https://impactx.org/register');
       
       // Fill registration form
       await page.type('#email', 'test@example.com');
       await page.type('#password', 'password123');
       await page.type('#firstName', 'Test');
       await page.type('#lastName', 'User');
       
       // Submit form
       await page.click('#submit-button');
       
       // Verify successful registration
       await page.waitForSelector('#dashboard');
       const dashboard = await page.$('#dashboard');
       expect(dashboard).toBeTruthy();
     });
   });
   ```

### Health Checks
1. **Service Health Endpoint**:
   ```javascript
   // health.js
   app.get('/health', async (req, res) => {
     const healthCheck = {
       uptime: process.uptime(),
       message: 'OK',
       timestamp: Date.now(),
       services: {}
     };
     
     try {
       // Check database connection
       await mongoose.connection.db.admin().ping();
       healthCheck.services.database = 'OK';
     } catch (error) {
       healthCheck.services.database = 'ERROR';
       healthCheck.message = 'Database connection failed';
     }
     
     try {
       // Check Redis connection
       await redisClient.ping();
       healthCheck.services.redis = 'OK';
     } catch (error) {
       healthCheck.services.redis = 'ERROR';
       healthCheck.message = 'Redis connection failed';
     }
     
     res.status(healthCheck.message === 'OK' ? 200 : 503).send(healthCheck);
   });
   ```

## Rollback Procedures

### Version Control Strategy
1. **Git Tagging**:
   ```bash
   # Create release tag
   git tag -a v1.2.0 -m "Release version 1.2.0"
   git push origin v1.2.0
   ```

2. **Docker Image Tagging**:
   ```bash
   # Build and tag Docker images
   docker build -t impactx/user-service:v1.2.0 .
   docker push impactx/user-service:v1.2.0
   ```

### Rollback Process
1. **Database Rollback**:
   ```bash
   # Restore from specific backup
   mongorestore --host mongodb://mongo1:27017,mongo2:27017,mongo3:27017 \
     --username backup_user \
     --password backup_password \
     --drop \
     /backup/mongodb/20230101_020000/
   ```

2. **Application Rollback**:
   ```bash
   # Rollback to previous version using Docker
   docker service update \
     --image impactx/user-service:v1.1.0 \
     impactx_user-service
   
   # Or using Kubernetes
   kubectl set image deployment/impactx-user-service \
     user-service=impactx/user-service:v1.1.0
   ```

3. **Configuration Rollback**:
   ```bash
   # Restore configuration from version control
   git checkout v1.1.0 -- config/
   ```

This deployment guide provides a comprehensive overview of deploying the ImpactX disaster response platform in various environments. Following these procedures will ensure a secure, scalable, and maintainable deployment that meets the demanding requirements of disaster response scenarios.