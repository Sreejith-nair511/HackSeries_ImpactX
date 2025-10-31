# GitHub Workflows Documentation

This document explains the GitHub Actions workflows used in the ImpactX project.

## Continuous Integration (CI) Workflow

File: `.github/workflows/ci.yml`

### Trigger Events

The CI workflow is triggered on:

- Push events to `main` and `develop` branches
- Pull request events to `main` and `develop` branches

### Jobs

#### test

This job runs on `ubuntu-latest` with multiple Node.js versions:

- 18.x
- 20.x

##### Steps

1. **Checkout code**: Uses `actions/checkout@v3` to checkout the repository
2. **Setup Node.js**: Uses `actions/setup-node@v3` to setup the Node.js environment
3. **Install dependencies**: Runs `npm ci` to install dependencies
4. **Run linting**: Runs `npm run lint` to check code style
5. **Run tests**: Runs `npm test` to execute unit tests
6. **Run build**: Runs `npm run build` to build the application

### Trigger Events

The CI workflow is triggered on:

- Push events to `main` and `develop` branches
- Pull request events to `main` and `develop` branches

### Jobs

#### test

This job runs on `ubuntu-latest` with multiple Node.js versions:

- 18.x
- 20.x

##### Steps

1. **Checkout code**: Uses `actions/checkout@v3` to checkout the repository
2. **Setup Node.js**: Uses `actions/setup-node@v3` to setup the Node.js environment
3. **Install dependencies**: Runs `npm ci` to install dependencies
4. **Run linting**: Runs `npm run lint` to check code style
5. **Run tests**: Runs `npm test` to execute unit tests
6. **Run build**: Runs `npm run build` to build the application

## Release Workflow

File: `.github/workflows/release.yml`

### Trigger Events

The release workflow is triggered on:

- Push events to tags matching the pattern `v*`

### Jobs

#### release

This job runs on `ubuntu-latest` and performs the following steps:

1. **Checkout code**: Uses `actions/checkout@v3` to checkout the repository
2. **Setup Node.js**: Uses `actions/setup-node@v3` to setup the Node.js environment
3. **Install dependencies**: Runs `npm ci` to install dependencies
4. **Run tests**: Runs `npm test` to execute unit tests
5. **Build**: Runs `npm run build` to build the application
6. **Publish to npm**: Publishes the package to npm using `npm publish`
7. **Create GitHub Release**: Creates a GitHub release using `actions/create-release@v1`

## Deployment Workflow

File: `.github/workflows/deploy.yml`

### Trigger Events

The deployment workflow is triggered on:

- Push events to the `main` branch

### Jobs

#### deploy-frontend

Deploys the frontend application:

1. **Checkout code**: Uses `actions/checkout@v3` to checkout the repository
2. **Setup Node.js**: Uses `actions/setup-node@v3` to setup the Node.js environment
3. **Install frontend dependencies**: Installs dependencies in the frontend directory
4. **Build frontend**: Builds the frontend application
5. **Deploy to Vercel**: Deploys the frontend to Vercel

#### deploy-backend

Deploys the backend application:

1. **Checkout code**: Uses `actions/checkout@v3` to checkout the repository
2. **Set up Docker Buildx**: Sets up Docker Buildx for building images
3. **Login to DockerHub**: Authenticates with DockerHub
4. **Build and push backend**: Builds and pushes the backend Docker image
5. **Deploy to Kubernetes**: Deploys the backend to a Kubernetes cluster

## Adding New Workflows

To add a new workflow:

1. Create a new YAML file in `.github/workflows/`
2. Define the trigger events
3. Define the jobs and steps
4. Test the workflow
5. Document the workflow in this file

## Best Practices

1. Use matrix strategies for testing across multiple environments
2. Cache dependencies when possible to speed up workflows
3. Use official GitHub Actions when available
4. Include error handling and notifications
5. Keep workflows simple and focused
6. Document all workflows
7. Regularly review and update workflows

## Security Considerations

1. Use `GITHUB_TOKEN` for authentication when possible
2. Avoid committing sensitive information
3. Use secrets for sensitive data
4. Review third-party actions before using them
5. Keep actions up to date

## Monitoring and Debugging

1. Check workflow runs in the GitHub Actions tab
2. Review logs for failed steps
3. Use debug logging when needed
4. Set up notifications for workflow failures