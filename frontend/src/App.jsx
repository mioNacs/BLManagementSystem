import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import LoadingScreen from './component/ui/LoadingScreen';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { ThemeProvider } from './context/ThemeContext';

// Import page components
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import ProjectsPage from './pages/ProjectsPage';
import ResourcesPage from './pages/ResourcesPage';
import AboutPage from './pages/AboutPage';

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
      <div className="mb-8">
        <div className="w-16 h-1 bg-black dark:bg-white mb-2 animate-pulse"></div>
        <div className="w-12 h-1 bg-black dark:bg-white ml-4 animate-pulse animation-delay-150"></div>
        <div className="w-8 h-1 bg-black dark:bg-white ml-8 animate-pulse animation-delay-300"></div>
      </div>
      <h2 className="text-2xl font-bold text-black dark:text-white mb-2 animate-fade-in">BitLinguals</h2>
      <p className="text-gray-600 dark:text-gray-300 animate-fade-in">Building knowledge bridges...</p>
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
    <div className="relative flex-grow">
      {isLoading && <LoadingScreen />}
      <div className={isLoading ? 'hidden' : 'block'}>
        <Routes>
          {/* Main site routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
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
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

function AppContent() {
  return (
    <div className="min-h-screen bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary flex flex-col transition-colors duration-300">
      <Navbar />
      <ContentArea />
      <Footer />
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
        <Router>
          <AppContent />
        </Router>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;