import { useState, useEffect } from 'react';
import authHelper from '../utils/authHelper';

/**
 * Custom React Hook for Authentication
 * Simplifies authentication handling in ImpactX frontend components
 */

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const authStatus = authHelper.isAuthenticated();
      const userData = authHelper.getUserData();
      
      setIsAuthenticated(authStatus);
      setUser(userData);
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Login failed');
      }

      const data = await response.json();
      authHelper.storeAuthData(data.token, data.user);
      
      setIsAuthenticated(true);
      setUser(data.user);
      
      return { success: true, data };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, role) => {
    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:5000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Registration failed');
      }

      const data = await response.json();
      authHelper.storeAuthData(data.token, data.user);
      
      setIsAuthenticated(true);
      setUser(data.user);
      
      return { success: true, data };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authHelper.clearAuthData();
    setIsAuthenticated(false);
    setUser(null);
  };

  const makeAuthenticatedRequest = async (endpoint, options = {}) => {
    try {
      const response = await authHelper.makeAuthenticatedRequest(endpoint, options);
      return response;
    } catch (error) {
      console.error('Authenticated request failed:', error);
      throw error;
    }
  };

  // Simulate authentication for demo purposes
  const simulateAuth = async () => {
    try {
      setLoading(true);
      const authData = await authHelper.simulateAutoLogin();
      setIsAuthenticated(true);
      setUser(authData.user);
      return authData;
    } catch (error) {
      console.error('Simulation failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Enhanced API call method
  const apiCall = async (endpoint, method = 'GET', data = null) => {
    try {
      const response = await authHelper.apiCall(endpoint, method, data);
      return response;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  };

  return {
    isAuthenticated,
    user,
    loading,
    login,
    register,
    logout,
    makeAuthenticatedRequest,
    simulateAuth,
    checkAuthStatus,
    apiCall
  };
};

export default useAuth;