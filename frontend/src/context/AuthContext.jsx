import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  const refreshAttempts = useRef(0);
  const refreshTimeout = useRef(null);

  // Fetch full user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
        refreshAttempts.current = 0; // Reset refresh attempts on successful data fetch
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setUser(null);
    }
  };

  // Refresh token function with rate limiting
  const refreshToken = async () => {
    if (isRefreshing || refreshAttempts.current >= 3) {
      return false;
    }

    try {
      setIsRefreshing(true);
      const response = await axios.post('/api/auth/refresh-token');
      if (response.data.success) {
        refreshAttempts.current = 0;
        return true;
      }
      return false;
    } catch (error) {
      console.error('Token refresh failed:', error);
      refreshAttempts.current += 1;
      return false;
    } finally {
      setIsRefreshing(false);
    }
  };

  // Schedule next token refresh
  const scheduleTokenRefresh = () => {
    if (refreshTimeout.current) {
      clearTimeout(refreshTimeout.current);
    }

    refreshTimeout.current = setTimeout(async () => {
      const success = await refreshToken();
      if (success) {
        scheduleTokenRefresh(); // Schedule next refresh
      } else if (refreshAttempts.current >= 3) {
        setUser(null); // Log out after 3 failed attempts
      }
    }, 10 * 60 * 1000); // Refresh every 10 minutes
  };

  // Check if user is already logged in on mount
  useEffect(() => {
    const bypassAuth = import.meta.env.VITE_BYPASS_AUTH === 'true';
    if (bypassAuth) {
      console.log("AUTH BYPASS ENABLED - All sections are public temporarily");
      setUser({ username: 'GuestUser', email: 'guest@example.com' });
      setLoading(false);
      return;
    }
    
    fetchUserData();
    setLoading(false);

    // Clean up function
    return () => {
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }
    };
  }, []);

  // Set up refresh scheduling when user changes
  useEffect(() => {
    if (user) {
      scheduleTokenRefresh();
    }
    return () => {
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }
    };
  }, [user]);

  // Add axios interceptor for handling 401 responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        
        // Skip token refresh for auth endpoints and already retried requests
        const isAuthEndpoint = originalRequest.url.includes('/api/auth/login') || 
                             originalRequest.url.includes('/api/auth/register') ||
                             originalRequest.url.includes('/api/auth/refresh-token');
        
        if (error.response?.status === 401 && !isAuthEndpoint && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const success = await refreshToken();
            if (success) {
              return axios(originalRequest);
            }
          } catch (refreshError) {
            console.error('Failed to refresh token:', refreshError);
            setUser(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/auth/register', userData);
      
      if (response.data.success) {
        // Fetch full user data after successful registration
        await fetchUserData();
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
      setError(null);
      refreshAttempts.current = 0; // Reset refresh attempts on login
      
      const isEmail = emailOrUsername.includes('@');
      const loginData = isEmail 
        ? { email: emailOrUsername, password } 
        : { username: emailOrUsername, password };
      
      console.log("Sending login request to:", `${API_URL}/api/auth/login`);
      
      // Try the login
      const loginResponse = await axios.post('/api/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log("Login response:", loginResponse.data);
      
      if (loginResponse.data.success) {
        // Set initial user data from login response
        setUser(loginResponse.data.user);
        
        try {
          // Fetch complete user data
          const userResponse = await axios.get('/api/auth/me');
          if (userResponse.data.success) {
            setUser(userResponse.data.user);
            scheduleTokenRefresh(); // Start token refresh scheduling
          }
        } catch (fetchError) {
          console.error('Failed to fetch complete user data:', fetchError);
          // Don't throw here, as login was successful
        }
      }

      return loginResponse.data;
    } catch (err) {
      console.error("Login error:", err);
      
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
      if (refreshTimeout.current) {
        clearTimeout(refreshTimeout.current);
      }
      refreshAttempts.current = 0;
    } catch (err) {
      const message = err.response?.data?.message || 'Logout failed';
      setError(message);
    } finally {
      setLoading(false);
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
    isAuthenticated: !!user,
    setUser,
    fetchUserData
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

export default AuthProvider; 