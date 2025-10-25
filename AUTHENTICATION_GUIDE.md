# ImpactX Authentication Guide

This guide explains how to properly handle authentication in the ImpactX platform to prevent "Access token required" errors.

## Understanding the Authentication System

The ImpactX platform uses JWT (JSON Web Token) based authentication to secure API endpoints. All protected endpoints require a valid authentication token in the request header.

### How Authentication Works

1. **User Registration/Login**: Users must first register or login to obtain a JWT token
2. **Token Storage**: The token is stored securely (in this implementation, in localStorage)
3. **API Requests**: All subsequent requests to protected endpoints must include the token in the Authorization header
4. **Token Validation**: The backend validates the token before processing the request

## Common Causes of "Access token required" Error

1. **Missing Authorization Header**: The request doesn't include the required Authorization header
2. **Invalid Token**: The token has expired or is malformed
3. **Incorrect API Endpoint**: Using the wrong API version prefix (should be `/api/v1/`)
4. **Unauthenticated Requests**: Trying to access protected endpoints without logging in

## Solutions to Prevent Authentication Errors

### 1. Automatic Authentication Handling

The platform includes automatic authentication handling through the `authHelper` utility:

```javascript
import authHelper from '../utils/authHelper';

// This will automatically handle authentication
const response = await authHelper.makeAuthenticatedRequest('/donations', {
  method: 'POST',
  body: JSON.stringify({ amount: 100 })
});
```

### 2. Using the API Service

The global API service handles authentication automatically:

```javascript
import api from '../services/api';

// These methods automatically include authentication
const donations = await api.getDonations();
const newDonation = await api.createDonation(100);
```

### 3. React Hook for Authentication

The `useAuth` hook provides authentication functionality:

```javascript
import useAuth from '../hooks/useAuth';

const { isAuthenticated, simulateAuth, apiCall } = useAuth();

// Simulate authentication for demo purposes
useEffect(() => {
  simulateAuth();
}, []);
```

## Testing Authentication

### Backend Simulation Script

Run the simulation script to test authentication:

```bash
cd backend
node simulate-auth.js
```

This script demonstrates:
- User registration/login
- Token handling
- Authenticated API requests
- Donation creation without errors

### Frontend Test Pages

Visit these URLs to test authentication in the browser:
- http://localhost:5175/authtest - Authentication testing page
- http://localhost:5175/demo - Donation demo with automatic authentication

## Best Practices

### 1. Always Use the API Service

Instead of making direct fetch requests, use the provided API service:

```javascript
// ❌ Don't do this
fetch('http://localhost:5000/api/v1/donations', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ amount: 100 })
});

// ✅ Do this instead
import api from '../services/api';
api.createDonation(100);
```

### 2. Handle Authentication in Components

Use the authentication hook in your components:

```javascript
import useAuth from '../hooks/useAuth';

const MyComponent = () => {
  const { isAuthenticated, simulateAuth } = useAuth();
  
  useEffect(() => {
    // Automatically handle authentication
    simulateAuth();
  }, []);
  
  // Rest of your component
};
```

### 3. Error Handling

Always handle authentication errors gracefully:

```javascript
try {
  const response = await api.createDonation(100);
  // Handle success
} catch (error) {
  if (error.message.includes('Access token required')) {
    // Redirect to login or show appropriate message
  }
  // Handle other errors
}
```

## Troubleshooting

### If You Still Get "Access token required" Errors:

1. **Check the API Version Prefix**: Ensure you're using `/api/v1/` not `/api/`
2. **Verify the Backend is Running**: Make sure the backend server is running on port 5000
3. **Run the Simulation Script**: Execute `node simulate-auth.js` in the backend directory
4. **Clear Browser Storage**: Clear localStorage in your browser's developer tools
5. **Check Network Tab**: Look at the request headers in your browser's network tab to ensure the Authorization header is present

### Example of a Correct API Request:

```javascript
// Correct way to make an authenticated request
const createDonation = async (amount) => {
  try {
    const response = await fetch('http://localhost:5000/api/v1/donations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${validToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ amount })
    });
    
    if (!response.ok) {
      throw new Error('Failed to create donation');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};
```

## Conclusion

By following these guidelines and using the provided authentication utilities, you should never encounter "Access token required" errors. The platform's authentication system is designed to handle token management automatically, providing a seamless experience for both developers and end users.