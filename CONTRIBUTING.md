# Contributing to ImpactX

Thank you for your interest in contributing to ImpactX! We welcome contributions from the community to help improve this transparent and verifiable disaster relief funding system.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [How to Contribute](#how-to-contribute)
4. [Development Workflow](#development-workflow)
5. [Coding Standards](#coding-standards)
6. [Testing](#testing)
7. [Documentation](#documentation)
8. [Pull Request Process](#pull-request-process)
9. [Community](#community)

## Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/impactx.git
   ```
3. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. Install dependencies for both frontend and backend:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

## How to Contribute

There are many ways to contribute to ImpactX:

- Report bugs and issues
- Suggest new features
- Improve documentation
- Write code to fix issues or add new features
- Review pull requests
- Help with testing

## Development Workflow

We follow the GitFlow branching model:

1. **Main Branch**: `main` - Production-ready code
2. **Development Branch**: `develop` - Integration branch for features
3. **Feature Branches**: `feature/feature-name` - New features
4. **Bugfix Branches**: `bugfix/issue-name` - Bug fixes
5. **Release Branches**: `release/version` - Release preparation

### Branch Naming Convention

- Features: `feature/short-description`
- Bug fixes: `bugfix/issue-number-short-description`
- Hot fixes: `hotfix/issue-number-short-description`

### Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Example:
```
feat(backend): add oracle voting endpoint

Implement the POST /api/v1/oracle/vote endpoint to accept
cryptographically signed votes from oracles.

Closes #123
```

## Coding Standards

### Backend (Node.js/Express)

1. **Language**: JavaScript (ES6+) with JSDoc annotations
2. **Style Guide**: Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
3. **Error Handling**: Use async/await with proper error handling
4. **Validation**: Use express-validator for input validation
5. **Security**: Implement helmet, rate limiting, and CORS protection
6. **Logging**: Use structured JSON logging

### Frontend (React/Vite)

1. **Language**: JavaScript (ES6+) with JSDoc annotations
2. **Style Guide**: Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
3. **Component Structure**: Use functional components with hooks
4. **State Management**: Use React Context or Redux for complex state
5. **Styling**: Use Tailwind CSS classes
6. **Accessibility**: Follow WCAG guidelines

### Database (Prisma)

1. **Schema**: Follow normalization principles
2. **Migrations**: Create migration files for schema changes
3. **Seeding**: Provide seed data for development

### Smart Contracts (TEAL)

1. **Comments**: Heavily comment TEAL code for readability
2. **Security**: Follow Algorand smart contract security best practices
3. **Testing**: Provide unit tests for all contract logic
4. **Documentation**: Document all contract interfaces

## Testing

### Backend Testing

1. **Unit Tests**: Test individual functions and modules
2. **Integration Tests**: Test API endpoints and database interactions
3. **Test Framework**: Jest
4. **Coverage**: Maintain at least 80% test coverage

Run tests:
```bash
cd backend
npm test
npm run test:watch
npm run test:coverage
```

### Frontend Testing

1. **Unit Tests**: Test React components and hooks
2. **Integration Tests**: Test user flows and interactions
3. **E2E Tests**: Cypress for end-to-end testing
4. **Test Framework**: Jest for unit tests, Cypress for E2E

Run tests:
```bash
cd frontend
npm test
npm run cypress:run
```

### Smart Contract Testing

1. **Unit Tests**: Test TEAL logic with goal commands
2. **Integration Tests**: Test contract interactions with algosdk
3. **Test Framework**: Custom TEAL testing scripts

Run tests:
```bash
cd backend
npm run test:teal
```

## Documentation

1. **Code Documentation**: Use JSDoc for all functions and classes
2. **API Documentation**: Document all REST API endpoints
3. **User Guides**: Update README files for new features
4. **Technical Documentation**: Update docs/ for architectural changes

## Pull Request Process

1. **Create PR**: Open a pull request against the `develop` branch
2. **Description**: Provide a clear description of changes
3. **Screenshots**: Include screenshots for UI changes
4. **Tests**: Ensure all tests pass
5. **Review**: Request review from maintainers
6. **CI**: Wait for CI checks to pass
7. **Merge**: Squash and merge after approval

### PR Template

```markdown
## Description

Brief description of the changes.

## Related Issue

Fixes #123

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?

Description of testing performed.

## Screenshots (if appropriate)

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
```

## Community

### Communication Channels

- **GitHub Issues**: For bug reports and feature requests
- **GitHub Discussions**: For general questions and discussions
- **Email**: For private inquiries

### Recognition

Contributors will be recognized in:

1. **GitHub Contributors List**
2. **Project Documentation**
3. **Release Notes**

Thank you for contributing to ImpactX and helping make disaster relief funding more transparent and verifiable!