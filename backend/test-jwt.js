const jwt = require('jsonwebtoken');

// Test JWT signing
try {
  const token = jwt.sign(
    { userId: 'test-user-id', email: 'test@example.com', role: 'DONOR' },
    'super_secret_key_for_demo_purposes_only_change_in_production',
    { expiresIn: '24h' }
  );
  
  console.log('JWT Token generated successfully:', token);
  
  // Test JWT verification
  const decoded = jwt.verify(token, 'super_secret_key_for_demo_purposes_only_change_in_production');
  console.log('JWT Token verified successfully:', decoded);
} catch (error) {
  console.error('JWT Error:', error);
}