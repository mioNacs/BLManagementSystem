import React from 'react';
import LoadingScreen from '../ui/LoadingScreen';

/**
 * ProtectedRoute component
 * TEMPORARY: Simply renders children directly without any authentication checks
 */
const ProtectedRoute = ({ children }) => {
  // Simply return children, allowing access to all routes
  return children;
};

export default ProtectedRoute; 