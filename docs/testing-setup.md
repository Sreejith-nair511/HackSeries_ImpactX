# Testing Setup Documentation

## Overview

This document provides information about the testing setup for the ImpactX frontend application. We use Jest as our testing framework with React Testing Library for component testing.

## Test Framework

- **Jest**: JavaScript testing framework
- **React Testing Library**: For testing React components
- **Jest DOM**: Custom matchers for DOM assertions

## Configuration Files

### jest.config.js

The Jest configuration file is located at `frontend/jest.config.js` and includes:

- Test environment setup (jsdom)
- Module name mapping
- Coverage collection settings
- Test file matching patterns
- Transform configurations

### setupTests.js

The setup file at `frontend/src/setupTests.js` includes:

- Import of Jest DOM matchers
- Mocks for browser APIs not available in the test environment
- Global mocks for IntersectionObserver and ResizeObserver

## Available Test Scripts

The following npm scripts are available for testing:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

Tests are organized in the following structure:

```
src/
├── components/
│   └── __tests__/
│       └── ComponentName.test.jsx
└── pages/
    └── __tests__/
        └── PageName.test.jsx
```

## Writing Tests

### Component Tests

Component tests should:

1. Test rendering of the component
2. Test user interactions
3. Test state changes
4. Test props handling
5. Test accessibility features

Example test structure:

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import ComponentName from '../ComponentName';

describe('ComponentName', () => {
  test('renders component correctly', () => {
    render(<ComponentName />);
    
    // Assertions
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

### Mocking Dependencies

For mocking dependencies:

1. Use `jest.mock()` for module mocks
2. Create mock implementations for complex dependencies
3. Use `jest.spyOn()` for spying on methods

### Internationalization Testing

For components using i18next:

```javascript
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';

const renderWithI18n = (component) => {
  return render(
    <I18nextProvider i18n={i18n}>
      {component}
    </I18nextProvider>
  );
};
```

## Coverage

To run tests with coverage:

```bash
npm run test:coverage
```

This will generate a coverage report in the `coverage/` directory.

## Best Practices

1. **Test one thing at a time**: Each test should focus on a single behavior
2. **Use descriptive test names**: Test names should clearly describe what is being tested
3. **Test edge cases**: Include tests for boundary conditions and error states
4. **Mock external dependencies**: Isolate the component under test
5. **Use data-testid attributes**: For elements that need to be selected in tests
6. **Test accessibility**: Ensure components are accessible
7. **Test responsive behavior**: Test components on different screen sizes

## Continuous Integration

Tests are automatically run in the CI pipeline. All tests must pass before merging changes to the main branch.

## Troubleshooting

### Common Issues

1. **Module not found errors**: Check module name mapping in jest.config.js
2. **Async test failures**: Use `await` for async operations
3. **DOM not updating**: Use `act()` to wrap state updates
4. **Mock implementation issues**: Ensure mocks are properly configured

### Debugging Tips

1. Use `screen.debug()` to inspect the DOM
2. Use `console.log` statements in tests for debugging
3. Run tests in watch mode for faster feedback
4. Use focused tests (`test.only`) to run specific tests

## Adding New Tests

To add new tests:

1. Create a `__tests__` directory alongside the component/page
2. Name the test file `ComponentName.test.jsx`
3. Import necessary testing utilities
4. Write tests following the established patterns
5. Run tests to ensure they pass

## Test Dependencies

The following dependencies are used for testing:

- `jest`: Test runner and assertion library
- `jest-environment-jsdom`: DOM environment for tests
- `@testing-library/react`: React testing utilities
- `@testing-library/jest-dom`: Custom DOM matchers
- `identity-obj-proxy`: Mock for CSS modules

These dependencies are included in the `devDependencies` section of `package.json`.