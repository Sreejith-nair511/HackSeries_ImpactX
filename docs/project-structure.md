# Project Structure

This document provides an overview of the ImpactX project structure.

## Root Directory

```
impactx/
├── .github/                 # GitHub configuration
│   └── workflows/           # GitHub Actions workflows
├── backend/                 # Backend application
├── config/                  # Configuration files
├── docs/                    # Documentation files
├── frontend/                # Frontend application
├── k8s/                     # Kubernetes manifests
├── scripts/                 # Utility scripts
├── .gitignore               # Git ignore file
├── README.md                # Main README file
├── package.json             # Root package.json
└── docker-compose.yml       # Docker Compose configuration
```

## Backend Directory

```
backend/
├── contracts/               # Algorand smart contracts
│   └── escrow.teal          # Escrow smart contract
├── src/                     # Backend source code
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # Data models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   └── server.js            # Main server file
├── prisma/                  # Prisma ORM configuration
├── package.json             # Backend package.json
└── README.md                # Backend README
```

## Frontend Directory

```
frontend/
├── src/                     # Frontend source code
│   ├── assets/              # Static assets
│   ├── components/          # React components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Page components
│   ├── services/            # API services
│   ├── utils/               # Utility functions
│   ├── locales/             # Translation files
│   ├── App.jsx              # Main App component
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Public assets
├── package.json             # Frontend package.json
└── README.md                # Frontend README
```

## Configuration Directory

```
config/
├── translation.config.js     # Translation configuration
└── README.md                # Configuration README
```

## Documentation Directory

```
docs/
├── translation.md           # Translation process documentation
├── scripts.md               # Scripts documentation
├── utils.md                 # Utility functions documentation
├── configuration.md         # Configuration documentation
├── development.md           # Development workflow documentation
├── commit-strategy.md       # Commit strategy documentation
├── CONTRIBUTING.md          # Contribution guidelines
├── CODE_OF_CONDUCT.md       # Code of conduct
├── github-workflows.md      # GitHub workflows documentation
├── project-structure.md     # Project structure documentation
└── README.md                # Documentation README
```

## Kubernetes Directory

```
k8s/
├── deployment.yaml          # Main deployment manifest
├── service.yaml             # Service manifest
├── ingress.yaml             # Ingress manifest
├── configmap.yaml           # ConfigMap manifest
└── secret.yaml              # Secret manifest
```

## Scripts Directory

```
scripts/
├── validate-translations.js # Translation validation script
├── test-translations.js     # Translation test script
└── README.md                # Scripts README
```

## GitHub Directory

```
.github/
├── workflows/               # GitHub Actions workflows
│   ├── ci.yml               # Continuous integration workflow
│   ├── release.yml          # Release workflow
│   └── deploy.yml           # Deployment workflow
├── ISSUE_TEMPLATE.md        # Issue template
└── PULL_REQUEST_TEMPLATE.md # Pull request template
```

## Key Files

### package.json

The root package.json contains scripts for managing the entire project.

### docker-compose.yml

Docker Compose configuration for running the application locally.

### .gitignore

Specifies files and directories that should be ignored by Git.

## Naming Conventions

### Directories

- Use lowercase letters
- Use hyphens to separate words
- Use descriptive names

### Files

- Use lowercase letters
- Use hyphens to separate words
- Use appropriate file extensions
- Use README.md for directory documentation

### Components

- Use PascalCase for React components
- Use camelCase for utility functions
- Use kebab-case for file names

## Best Practices

1. Keep the project structure flat when possible
2. Use descriptive names for directories and files
3. Group related files in directories
4. Document the project structure
5. Follow consistent naming conventions
6. Keep documentation up to date
7. Use README.md files in each directory
8. Separate concerns between frontend and backend
9. Keep configuration separate from code
10. Use scripts for automation

## Adding New Directories

When adding new directories to the project:

1. Follow the existing naming conventions
2. Add a README.md file to document the directory
3. Update this document to reflect the new structure
4. Ensure the directory has a clear purpose
5. Group related functionality together

## Modifying the Structure

When modifying the project structure:

1. Update this document
2. Update any relevant documentation
3. Update configuration files as needed
4. Ensure all paths are updated correctly
5. Test the application after changes