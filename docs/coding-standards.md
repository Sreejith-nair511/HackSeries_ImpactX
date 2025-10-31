# Coding Standards

This document outlines the coding standards and best practices for the ImpactX disaster response platform development team.

## JavaScript/ES6 Standards

### Variable Declaration

- Use `const` for variables that won't be reassigned
- Use `let` for variables that will be reassigned
- Avoid `var` entirely

```javascript
// Good
const apiUrl = 'https://api.example.com';
let currentUser = null;

// Bad
var apiUrl = 'https://api.example.com';
```

### Function Declarations

- Prefer arrow functions for anonymous functions
- Use function declarations for named functions
- Keep functions small and focused on a single responsibility

```javascript
// Good
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Implementation
};

function initializeApp() {
  // Implementation
}

// Bad
var calculateDistance = function(lat1, lon1, lat2, lon2) {
  // Implementation
};
```

### Object and Array Literals

- Use literal syntax for object and array creation
- Use dot notation for property access when possible
- Use bracket notation for dynamic property access

```javascript
// Good
const user = {
  name: 'John Doe',
  age: 30
};

const items = [1, 2, 3];

// Bad
const user = new Object();
const items = new Array();
```

## React Standards

### Component Structure

- Use functional components with hooks when possible
- Destructure props at the beginning of components
- Place hooks at the top of functional components

```javascript
// Good
const UserProfile = ({ userId, isActive }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId);
  }, [userId]);
  
  // Component implementation
};

// Bad
class UserProfile extends Component {
  // Class component when functional would suffice
}
```

### Component Naming

- Use PascalCase for component names
- Use camelCase for prop names
- Name files with the same name as the component

### JSX Formatting

- Use parentheses around multiline JSX
- Place closing tag on a new line for multiline components
- Omit values for boolean props

```javascript
// Good
const button = (
  <Button 
    onClick={handleClick}
    disabled
  >
    Click Me
  </Button>
);

// Bad
const button = <Button onClick={handleClick} disabled={true}>Click Me</Button>;
```

## Internationalization (i18n) Standards

### Translation Key Naming

- Use descriptive, hierarchical key names
- Separate words with camelCase
- Organize keys by feature or module

```json
{
  "dashboard": {
    "welcomeMessage": "Welcome to your dashboard",
    "lastLogin": "Last login: {{date}}"
  },
  "alerts": {
    "severeWeather": "Severe Weather Alert"
  }
}
```

### Using Translations in Components

- Import the translation hook or function
- Use translation keys instead of hardcoded strings
- Pass variables for dynamic content

```javascript
import { useTranslation } from 'react-i18next';

const AlertComponent = ({ alertLevel }) => {
  const { t } = useTranslation();
  
  return (
    <div className={`alert alert-${alertLevel}`}>
      {t(`alerts.${alertLevel}`)}
    </div>
  );
};
```

## CSS/Styling Standards

### Class Naming

- Use BEM (Block Element Modifier) methodology
- Use lowercase and hyphens for separation
- Be descriptive but concise

```css
/* Good */
.alert-box { }
.alert-box__title { }
.alert-box--urgent { }

/* Bad */
.alertBox { }
.alert_box_title { }
.red-text { }
```

### CSS Organization

- Group related styles together
- Order properties consistently (position, display, dimensions, colors, typography, etc.)
- Use comments to separate sections

## File Organization

### Directory Structure

- Group related files together
- Use descriptive directory names
- Separate concerns (components, utilities, services, etc.)

### File Naming

- Use kebab-case for file names
- Use descriptive names that reflect the file's purpose
- Match component file names to component names

```
src/
├── components/
│   ├── AlertBanner.jsx
│   └── UserDashboard.jsx
├── utils/
│   ├── date-helper.js
│   └── api-client.js
└── services/
    ├── auth-service.js
    └── notification-service.js
```

## Documentation Standards

### Commenting

- Write JSDoc comments for all functions
- Explain the "why" not just the "what"
- Keep comments up to date with code changes

```javascript
/**
 * Calculates the distance between two geographical coordinates
 * @param {number} lat1 - Latitude of first point
 * @param {number} lon1 - Longitude of first point
 * @param {number} lat2 - Latitude of second point
 * @param {number} lon2 - Longitude of second point
 * @returns {number} Distance in kilometers
 */
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Implementation
};
```

### README Files

- Every major directory should have a README.md
- Include purpose, usage examples, and important notes
- Keep documentation current with implementation changes

## Git Commit Standards

### Commit Message Format

- Use present tense ("Add feature" not "Added feature")
- Capitalize the first letter
- Keep the first line under 72 characters
- Use the body for detailed explanations when necessary

```
Add user authentication service

Implement JWT-based authentication with refresh token support.
Includes login, logout, and token refresh functionality.
```

### Commit Granularity

- Make small, focused commits
- Each commit should represent a single logical change
- Avoid mixing unrelated changes in the same commit

## Testing Standards

### Test File Structure

- Place test files adjacent to the code they test
- Use `.test.js` suffix for test files
- Mirror the directory structure of source files

```
src/
├── utils/
│   ├── date-helper.js
│   └── date-helper.test.js
```

### Test Descriptions

- Use clear, descriptive test names
- Follow the "Given-When-Then" pattern
- Test one behavior per test case

```javascript
// Good
it('should return true for valid email addresses', () => {
  expect(validateEmail('user@example.com')).toBe(true);
});

// Bad
it('should work', () => {
  expect(validateEmail('user@example.com')).toBe(true);
});
```

## Code Review Standards

### Review Process

- All code must be reviewed before merging
- Reviewers should check for adherence to these standards
- Provide constructive feedback with explanations
- Address all review comments before merging

### Common Review Items

- Code clarity and readability
- Performance considerations
- Security implications
- Test coverage
- Documentation updates