import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

// Create auth context
const AuthContext = createContext(null);

// Base URL for API requests
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Configure axios
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true; // Enable sending cookies with requests

// Create auth provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/api/auth/me');
        if (response.data.success) {
          setUser(response.data.user);
        }
      } catch (err) {
        // User is not authenticated, no need to set error
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
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
      
      console.log("Sending login request to:", `${API_URL}/api/auth/login`);
      
      // Try the login
      const response = await axios.post('/api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Login response:", response.data);
      
      if (response.data.success) {
        setUser(response.data.user);
      }
      
      return response.data;
    } catch (err) {
      console.error("Login error:", err);
      
      // Format the error message to be more user-friendly
      let errorMessage;
      
      if (!err.response) {
        // Network error
        errorMessage = "Cannot connect to server. Please check your internet connection.";
      } else if (err.response.status === 404) {
        // Username/email not found
        errorMessage = "Invalid username or email.";
      } else if (err.response.status === 401) {
        // Password error
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
      
      console.log("Setting error:", errorMessage);
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