import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create auth context
const AuthContext = createContext(null);

// Base URL for API requests
const API_URL = window.location.hostname === 'mionacs.github.io' 
  ? 'https://blms-orcin.vercel.app'
  : (import.meta.env.VITE_API_URL || 'http://localhost:5000');

// Configure axios
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true; // Enable sending cookies with requests

// Add debug logging
console.log('Current hostname:', window.location.hostname);
console.log('Using API URL:', API_URL);

// Configure axios defaults for better error handling
axios.defaults.timeout = 10000; // 10 second timeout
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add axios interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request.method, request.url);
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('Response:', response.status, response.data);
    return response;
  },
  error => {
    console.error('API Error:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config
    });
    return Promise.reject(error);
  }
);

// Create auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    // For development only - bypass authentication check using environment variable
    const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';
    if (bypassAuth) {
      console.log("AUTH BYPASS ENABLED - All sections are public temporarily");
      setUser({ username: 'GuestUser', email: 'guest@example.com' });
      setLoading(false);
      return;
    }
    
    const verifyUser = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        // Silent failure - user is not logged in
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    verifyUser();
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/auth/register', userData);
      
      if (response.data.success) {
        setUser(response.data.user);
      }
      
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (emailOrUsername, password) => {
    try {
      setLoading(true);
      setError(null); // Clear previous errors
      
      // Determine if input is email or username
      const isEmail = emailOrUsername.includes('@');
      const loginData = isEmail 
        ? { email: emailOrUsername, password } 
        : { username: emailOrUsername, password };
      
      console.log("Preparing login request to:", `${API_URL}/api/auth/login`);
      console.log("Login data:", { ...loginData, password: '****' });
      
      // Try the login with explicit configuration
      const response = await axios.post('/api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        withCredentials: true,
        validateStatus: function (status) {
          return status >= 200 && status < 500; // Don't reject if status is not 2xx
        }
      });
      
      console.log("Login response received:", {
        status: response.status,
        statusText: response.statusText,
        data: response.data,
        headers: response.headers
      });
      
      if (response.data.success) {
        setUser(response.data.user);
        return response.data;
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error("Login error details:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });
      
      // Format the error message to be more user-friendly
      let errorMessage;
      
      if (!err.response) {
        errorMessage = "Cannot connect to server. Please check your internet connection.";
      } else if (err.response.status === 404) {
        errorMessage = "Invalid username or email.";
      } else if (err.response.status === 401) {
        errorMessage = "Invalid password.";
      } else if (err.response.status === 400) {
        errorMessage = "Please provide both username/email and password.";
      } else if (err.response.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else {
        errorMessage = "Login failed. Please try again.";
      }
      
      console.log("Setting error message:", errorMessage);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post('/api/auth/logout');
      setUser(null);
    } catch (err) {
      const message = err.response?.data?.message || 'Logout failed';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Refresh token function
  const refreshToken = async () => {
    try {
      const response = await axios.post('/api/auth/refresh-token');
      return response.data.success;
    } catch (err) {
      return false;
    }
  };

  // Clear error
  const clearError = () => setError(null);

  // Forgot password function
  const forgotPassword = async (email) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.post('/api/auth/forgot-password', { email });
      return response.data;
    } catch (err) {
      let errorMessage;
      
      if (!err.response) {
        errorMessage = "Cannot connect to server. Please check your internet connection.";
      } else if (err.response.status === 404) {
        errorMessage = "Email address not found in our system.";
      } else if (err.response.status === 400) {
        errorMessage = "Please provide a valid email address.";
      } else if (err.response.status === 500) {
        errorMessage = "Server error. Please try again later.";
      } else if (err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      } else {
        errorMessage = "Password reset request failed. Please try again.";
      }
      
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Create context value
  const value = {
    user,
    loading,
    error,
    register,
    login,
    logout,
    refreshToken,
    clearError,
    forgotPassword,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 