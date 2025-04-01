import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import LoadingScreen from './component/ui/LoadingScreen';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './component/auth/ProtectedRoute';
import UserProfile from './component/profile/UserProfile';
import logoLight from './assets/logo.svg';
import logoDark from './assets/logo-dark.svg';

// Import page components
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import ProjectsPage from './pages/ProjectsPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import SettingsPage from './pages/SettingsPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Create layout for auth pages
const AuthLayout = ({ children }) => {
  return (
    <div className="pt-16">
      {children}
    </div>
  );
};

// Initial loading screen for first page load
const InitialLoadingScreen = () => {
  // Apply dark mode class based on stored preference or system preference
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Check if theme is stored in localStorage
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      root.classList.add(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-white dark:bg-dark-bg z-50 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Enhanced logo animation */}
        <div className="relative w-40 h-40 mb-8 flex items-center justify-center">
          {/* Outer spinner */}
          <div className="absolute w-full h-full border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="absolute w-full h-full border-t-4 border-primary-500 dark:border-primary-400 rounded-full animate-spin"></div>
          
          {/* Logo */}
          <div className="relative z-10 w-32 h-32 flex items-center justify-center">
            <img src={logoLight} alt="BitLinguals Logo" className="w-28 h-28 block dark:hidden" />
            <img src={logoDark} alt="BitLinguals Logo" className="w-28 h-28 hidden dark:block" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-black dark:text-white mb-2 animate-fade-in">BitLinguals</h2>
        <p className="text-gray-600 dark:text-gray-300 animate-fade-in">Building knowledge bridges...</p>
        
        {/* Loading indicator */}
        <div className="mt-8 w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-primary-500 dark:bg-primary-400 rounded-full animate-loading-progress"></div>
        </div>
      </div>
    </div>
  );
};

// Content area with loading state
const ContentArea = () => {
  const location = useLocation();
  const { isLoading, showLoader, hideLoader } = useLoading();
  
  useEffect(() => {
    showLoader();
    const timer = setTimeout(() => {
      hideLoader();
    }, 1000); // 1 second loading when changing routes
    
    return () => clearTimeout(timer);
  }, [location.pathname, showLoader, hideLoader]);
  
  return (
    <div className="relative w-full flex-grow min-h-[50vh]">
      {isLoading && <LoadingScreen />}
      <div className={isLoading ? 'invisible' : 'visible w-full'}>
        <Routes>
          {/* Main site routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          
          {/* Protected routes */}
          <Route path="/projects" element={
            <ProtectedRoute>
              <ProjectsPage />
            </ProtectedRoute>
          } />
          <Route path="/resources" element={
            <ProtectedRoute>
              <ResourcesPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          
          <Route path="/settings" element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          } />
          
          <Route path="/about" element={<AboutPage />} />
          
          {/* Auth routes */}
          <Route path="/login" element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } />
          <Route path="/signup" element={
            <AuthLayout>
              <Signup />
            </AuthLayout>
          } />
          
          <Route path="/forgot-password" element={
            <AuthLayout>
              <ForgotPasswordPage />
            </AuthLayout>
          } />
          
          {/* 404 Not Found route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  );
};

function AppContent() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
  
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary flex flex-col transition-colors duration-300">
      <Navbar />
      <ContentArea />
      {!isAuthPage && <Footer />}
    </div>
  );
}

// Apply initial theme class before the app loads
function applyThemeBeforeRender() {
  // Only run in the browser
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    const storedTheme = localStorage.getItem('theme');
    
    // Remove any existing theme classes
    root.classList.remove('light', 'dark');
    
    // Apply theme based on stored preference or system preference
    if (storedTheme) {
      root.classList.add(storedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  // Apply theme before initial render
  useEffect(() => {
    applyThemeBeforeRender();
    
    // Simulate initial loading time
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 2000); // Show initial loading screen for 2 seconds
    
    return () => clearTimeout(timer);
  }, []);

  if (initialLoading) {
    return <InitialLoadingScreen />;
  }

  return (
    <ThemeProvider>
      <LoadingProvider>
        <AuthProvider>
          <Router basename="/BLManagementSystem">
            <AppContent />
          </Router>
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;