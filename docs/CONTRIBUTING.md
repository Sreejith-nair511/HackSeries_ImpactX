# Contributing to ImpactX Disaster Response Platform

## Table of Contents
1. [Introduction](#introduction)
2. [Code of Conduct](#code-of-conduct)
3. [Getting Started](#getting-started)
4. [Development Process](#development-process)
5. [Coding Standards](#coding-standards)
6. [Testing Guidelines](#testing-guidelines)
7. [Documentation Standards](#documentation-standards)
8. [Commit Message Guidelines](#commit-message-guidelines)
9. [Pull Request Process](#pull-request-process)
10. [Issue Reporting](#issue-reporting)
11. [Security Vulnerabilities](#security-vulnerabilities)
12. [Community Engagement](#community-engagement)
13. [Recognition and Credits](#recognition-and-credits)

## Introduction

Thank you for your interest in contributing to the ImpactX disaster response platform! ImpactX is an open-source project designed to coordinate disaster response efforts among NGOs, volunteers, developers, and government agencies. Our mission is to save lives and reduce suffering during natural and man-made disasters through technology.

This document provides guidelines for contributing to the ImpactX platform. By participating in this project, you agree to abide by our [Code of Conduct](#code-of-conduct) and follow these contribution guidelines.

Contributions can take many forms:
- Code improvements and new features
- Bug fixes
- Documentation enhancements
- Translation and localization
- User experience improvements
- Security enhancements
- Performance optimizations
- Testing and quality assurance
- Community support and engagement

We welcome contributions from everyone, regardless of their experience level. Whether you're a seasoned developer, a designer, a technical writer, or someone passionate about disaster response, there's a way for you to contribute.

## Code of Conduct

All contributors are expected to follow our Code of Conduct, which promotes a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, level of experience, nationality, personal appearance, race, religion, or sexual identity and orientation.

Key principles include:
- Using welcoming and inclusive language
- Being respectful of differing viewpoints and experiences
- Gracefully accepting constructive criticism
- Focusing on what is best for the community
- Showing empathy towards other community members

Unacceptable behavior includes:
- The use of sexualized language or imagery
- Personal attacks
- Trolling or insulting/derogatory comments
- Public or private harassment
- Publishing others' private information without explicit permission
- Other conduct which could reasonably be considered inappropriate in a professional setting

Violations of the Code of Conduct may result in temporary or permanent expulsion from the project. If you witness or experience unacceptable behavior, please report it to the project maintainers at conduct@impactx.org.

## Getting Started

### Prerequisites
Before you begin contributing, ensure you have the following tools installed:
- Git (version 2.30 or higher)
- Node.js (version 16.x or higher)
- npm (version 8.x or higher)
- Docker (for containerized development)
- MongoDB (version 5.x or higher)
- Redis (version 6.x or higher)
- Python (version 3.8 or higher, for certain scripts)

### Development Environment Setup
1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/ImpactX.git
   cd ImpactX
   ```

3. Install dependencies:
   ```bash
   # Backend services
   cd backend/services/user-service
   npm install
   
   # Frontend
   cd ../../frontend
   npm install
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Start development environment:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

### Project Structure
```
ImpactX/
├── backend/
│   ├── services/
│   │   ├── user-service/
│   │   ├── resource-service/
│   │   ├── communication-service/
│   │   ├── analytics-service/
│   │   ├── governance-service/
│   │   ├── document-service/
│   │   ├── notification-service/
│   │   ├── iot-service/
│   │   └── blockchain-service/
│   ├── shared/
│   └── utils/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   └── assets/
│   └── package.json
├── docs/
├── scripts/
├── docker/
├── kubernetes/
└── README.md
```

## Development Process

### Branching Strategy
We follow a GitFlow-like branching model:
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/*` - Feature development branches
- `bugfix/*` - Bug fix branches
- `release/*` - Release preparation branches
- `hotfix/*` - Emergency production fixes

### Creating a Feature Branch
1. Ensure your `develop` branch is up to date:
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Make your changes and commit them following our [commit message guidelines](#commit-message-guidelines)

### Development Workflow
1. Write code following our [coding standards](#coding-standards)
2. Add or update tests as needed
3. Ensure all tests pass:
   ```bash
   npm test
   ```
4. Update documentation if necessary
5. Commit your changes
6. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Create a pull request

## Coding Standards

### JavaScript/Node.js Standards
We follow the Airbnb JavaScript Style Guide with some modifications:

1. **Code Formatting**
   - Use 2 spaces for indentation
   - Use single quotes for strings
   - No trailing whitespace
   - Line length should not exceed 100 characters
   - Use semicolons

2. **Naming Conventions**
   - Use camelCase for variables and functions
   - Use PascalCase for constructors and classes
   - Use UPPER_CASE for constants
   - Use descriptive names

3. **Function Design**
   - Keep functions small and focused
   - Use pure functions when possible
   - Avoid global variables
   - Handle errors appropriately

4. **Error Handling**
   - Always handle asynchronous errors
   - Use try/catch for synchronous operations
   - Provide meaningful error messages
   - Log errors appropriately

Example:
```javascript
// Good
class UserService {
  async createUser(userData) {
    try {
      // Validate input
      if (!userData.email || !userData.password) {
        throw new Error('Email and password are required');
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      
      // Create user
      const user = new User({
        ...userData,
        password: hashedPassword
      });
      
      return await user.save();
    } catch (error) {
      logger.error('Error creating user:', error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
}

// Avoid
function create_user(email,pass){
  var user=new User({email:email,password:pass});
  return user.save();
}
```

### React/Frontend Standards
1. **Component Structure**
   - Use functional components with hooks
   - Keep components small and focused
   - Use prop-types for type checking
   - Follow the container/presentational pattern when appropriate

2. **State Management**
   - Use useState and useEffect hooks
   - Consider Redux for complex state
   - Keep state as local as possible
   - Use context for global state when Redux is overkill

3. **Styling**
   - Use Tailwind CSS for styling
   - Follow responsive design principles
   - Ensure accessibility compliance
   - Use CSS modules for component-specific styles

Example:
```jsx
// Good
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const UserRegistrationForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = t('emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('emailInvalid');
    }
    
    if (!formData.password) {
      newErrors.password = t('passwordRequired');
    } else if (formData.password.length < 8) {
      newErrors.password = t('passwordTooShort');
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          {t('email')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${
            errors.email ? 'border-red-300' : ''
          }`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>
      
      {/* Other form fields */}
      
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {t('register')}
      </button>
    </form>
  );
};

export default UserRegistrationForm;
```

### Database Design Standards
1. **Schema Design**
   - Use meaningful collection and field names
   - Normalize data appropriately
   - Add indexes for frequently queried fields
   - Use proper data types

2. **Query Optimization**
   - Use projections to limit returned fields
   - Implement proper indexing
   - Avoid N+1 query problems
   - Use aggregation pipelines for complex queries

3. **Security**
   - Never store passwords in plain text
   - Use field-level validation
   - Implement proper access controls
   - Sanitize user input

## Testing Guidelines

### Test Types
1. **Unit Tests**
   - Test individual functions and components
   - Aim for high code coverage (>80%)
   - Use Jest for JavaScript testing
   - Mock external dependencies

2. **Integration Tests**
   - Test service interactions
   - Validate API endpoints
   - Test database operations
   - Use Supertest for API testing

3. **End-to-End Tests**
   - Test complete user workflows
   - Use Cypress for browser testing
   - Test across different browsers
   - Simulate real user scenarios

4. **Performance Tests**
   - Load testing with Artillery
   - Stress testing under high load
   - Monitor resource usage
   - Identify bottlenecks

### Test Structure
```javascript
// Good test structure
describe('UserService', () => {
  describe('createUser', () => {
    beforeEach(() => {
      // Setup test data
    });
    
    afterEach(() => {
      // Clean up test data
    });
    
    test('should create a new user with valid data', async () => {
      // Arrange
      const userData = {
        email: 'test@example.com',
        password: 'securePassword123',
        firstName: 'Test',
        lastName: 'User'
      };
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result).toHaveProperty('id');
      expect(result.email).toBe(userData.email);
      expect(result.firstName).toBe(userData.firstName);
    });
    
    test('should throw error for invalid email', async () => {
      // Arrange
      const invalidData = {
        email: 'invalid-email',
        password: 'securePassword123',
        firstName: 'Test',
        lastName: 'User'
      };
      
      // Act & Assert
      await expect(userService.createUser(invalidData))
        .rejects
        .toThrow('Invalid email format');
    });
  });
});
```

### Test Data Management
- Use factories for generating test data
- Clean up test data after each test
- Use separate test databases
- Avoid hardcoded test data

## Documentation Standards

### Code Documentation
1. **JSDoc Comments**
   - Document all public functions and classes
   - Include parameter and return types
   - Provide usage examples
   - Keep documentation up to date

```javascript
/**
 * Creates a new user account
 * @param {Object} userData - User information
 * @param {string} userData.email - User's email address
 * @param {string} userData.password - User's password
 * @param {string} userData.firstName - User's first name
 * @param {string} userData.lastName - User's last name
 * @returns {Promise<Object>} Created user object
 * @throws {Error} If user creation fails
 * @example
 * const user = await createUser({
 *   email: 'test@example.com',
 *   password: 'securePassword123',
 *   firstName: 'Test',
 *   lastName: 'User'
 * });
 */
async function createUser(userData) {
  // Implementation
}
```

2. **Inline Comments**
   - Explain complex logic
   - Clarify non-obvious code
   - Use sparingly
   - Keep comments up to date

### User Documentation
1. **README Updates**
   - Update installation instructions
   - Document new features
   - Include configuration changes
   - Provide usage examples

2. **API Documentation**
   - Document all endpoints
   - Include request/response examples
   - Specify error codes
   - Keep in sync with code

3. **User Guides**
   - Write for different user roles
   - Include screenshots where helpful
   - Provide step-by-step instructions
   - Update for feature changes

## Commit Message Guidelines

We follow the Conventional Commits specification to ensure consistent and informative commit messages.

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Commit Types
- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies
- **ci**: Changes to our CI configuration files and scripts
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### Examples
```
feat(user-service): add user registration endpoint

Implement user registration with email validation and password hashing.
Include input validation and error handling.

Closes #123
```

```
fix(auth): resolve JWT expiration issue

Fix bug where JWT tokens were expiring immediately after creation.
Update expiration time calculation to use correct time units.

Fixes #456
```

```
docs(readme): update installation instructions

Add Docker Compose setup instructions
Include environment variable configuration
Update troubleshooting section
```

## Pull Request Process

### Before Submitting
1. Ensure your code follows our [coding standards](#coding-standards)
2. All tests pass locally
3. Documentation is updated
4. Commit messages follow our guidelines
5. Branch is up to date with `develop`

### Pull Request Template
When creating a pull request, include:
1. **Description**: Clear explanation of changes
2. **Related Issues**: Link to any related GitHub issues
3. **Testing**: Description of how changes were tested
4. **Screenshots**: If UI changes are included
5. **Checklist**: 
   - [ ] Code follows style guidelines
   - [ ] Tests have been added/updated
   - [ ] Documentation has been updated
   - [ ] Commit messages follow guidelines

### Review Process
1. Automated checks run on all PRs
2. Code review by at least one maintainer
3. Security review for sensitive changes
4. Performance review for critical paths
5. Merge after approval and passing checks

### Merging
- Use squash and merge for most PRs
- Maintain clean commit history
- Ensure PR title follows commit message guidelines
- Delete branch after merging

## Issue Reporting

### Before Creating an Issue
1. Check existing issues to avoid duplicates
2. Ensure you're using the latest version
3. Try to reproduce on a clean installation
4. Gather relevant information (logs, screenshots, etc.)

### Issue Template
When creating an issue, include:
1. **Summary**: Brief description of the problem
2. **Steps to Reproduce**: Clear steps to reproduce the issue
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**: 
   - OS version
   - Browser version (for frontend issues)
   - ImpactX version
   - Node.js version
6. **Additional Context**: Any other relevant information

### Issue Labels
We use labels to categorize and prioritize issues:
- **bug**: Confirmed bugs
- **feature**: Feature requests
- **enhancement**: Improvements to existing features
- **documentation**: Documentation issues
- **security**: Security-related issues
- **performance**: Performance issues
- **help wanted**: Good issues for new contributors
- **good first issue**: Issues suitable for beginners

## Security Vulnerabilities

### Reporting Security Issues
If you discover a security vulnerability, please report it responsibly:
1. Do NOT create a public GitHub issue
2. Email security@impactx.org with details
3. Include steps to reproduce the vulnerability
4. Provide potential impact assessment
5. Give us reasonable time to address before public disclosure

### Security Best Practices
When contributing code, follow these security practices:
1. **Input Validation**: Always validate and sanitize user input
2. **Authentication**: Implement proper authentication and authorization
3. **Data Protection**: Encrypt sensitive data at rest and in transit
4. **Error Handling**: Avoid exposing sensitive information in error messages
5. **Dependencies**: Keep dependencies up to date and audit for vulnerabilities

### Security Review Process
Security-sensitive changes undergo additional review:
1. Code review by security team members
2. Static analysis scanning
3. Dynamic analysis testing
4. Penetration testing for critical features
5. Third-party security audit for major releases

## Community Engagement

### Communication Channels
- **GitHub**: Primary development platform
- **Slack**: Real-time chat for contributors
- **Mailing List**: Announcements and discussions
- **Twitter**: Project updates and news
- **Community Forum**: User discussions and support

### Community Events
- **Monthly Contributors Meeting**: Virtual meeting for contributors
- **Hackathons**: Periodic hackathons focused on new features
- **Workshops**: Training sessions on specific topics
- **Conference Presentations**: Speaking at relevant conferences

### Mentorship Program
We offer a mentorship program to help new contributors:
- Pair new contributors with experienced mentors
- Provide guidance on project architecture
- Help with code reviews and feedback
- Support career development in open source

## Recognition and Credits

### Contributor Recognition
We value and recognize all contributions:
- **GitHub Contributors Page**: Lists all code contributors
- **Release Notes**: Credit contributors in each release
- **Annual Report**: Highlight significant contributions
- **Social Media**: Feature contributor spotlights

### Contribution Tiers
We recognize different levels of contribution:
1. **Code Contributors**: Those who submit code changes
2. **Documentation Contributors**: Those who improve documentation
3. **Community Contributors**: Those who help the community
4. **Translation Contributors**: Those who provide translations
5. **Financial Contributors**: Those who support the project financially

### Awards and Recognition
- **Monthly Contributor Award**: Recognize outstanding monthly contributions
- **Impact Award**: Recognize contributions that significantly impact users
- **Community Builder Award**: Recognize community engagement efforts
- **Innovation Award**: Recognize creative solutions and new features

This contributing guide is a living document that evolves with our community. We encourage all contributors to help improve it by submitting suggestions and updates.

Thank you for being part of the ImpactX community and helping us build technology that saves lives during disasters!