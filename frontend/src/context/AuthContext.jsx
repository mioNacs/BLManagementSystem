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

  // Fetch full user data
  const fetchUserData = async () => {
    try {
      const response = await axios.get('/api/auth/me');
      if (response.data.success) {
        setUser(response.data.user);
      }
    } catch (err) {
      console.error('Failed to fetch user data:', err);
      setUser(null);
    }
  };

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
    
    fetchUserData();
    setLoading(false);

    // Set up token refresh interval
    const refreshInterval = setInterval(async () => {
      const success = await refreshToken();
      if (!success) {
        // If token refresh fails, log out the user
        setUser(null);
        clearInterval(refreshInterval);
      }
    }, 14 * 60 * 1000); // Refresh token every 14 minutes (assuming 15-minute token expiry)

    // Clean up interval on unmount
    return () => clearInterval(refreshInterval);
  }, []);

  // Add axios interceptor for handling 401 responses
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Skip token refresh for login/register endpoints
        const isAuthEndpoint = error.config.url.includes('/api/auth/login') || 
                             error.config.url.includes('/api/auth/register');
        
        if (error.response?.status === 401 && !isAuthEndpoint && error.config && !error.config.__isRetry) {
          try {
            error.config.__isRetry = true;
            const success = await refreshToken();
            if (success) {
              // Retry the original request
              return axios(error.config);
            }
          } catch (e) {
            // If refresh fails, log out the user
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
          }
        } catch (fetchError) {
          console.error('Failed to fetch complete user data:', fetchError);
          // Don't throw here, as login was successful
        }
      }

      return loginResponse.data;
    } catch (err) {
      console.error("Login error:", err);
      
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