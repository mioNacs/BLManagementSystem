import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';
import LoadingScreen from './component/ui/LoadingScreen';
import { LoadingProvider, useLoading } from './context/LoadingContext';

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
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="mb-8">
        <div className="w-16 h-1 bg-black mb-2 animate-pulse"></div>
        <div className="w-12 h-1 bg-black ml-4 animate-pulse animation-delay-150"></div>
        <div className="w-8 h-1 bg-black ml-8 animate-pulse animation-delay-300"></div>
      </div>
      <h2 className="text-2xl font-bold text-black mb-2 animate-fade-in">BitLinguals</h2>
      <p className="text-gray-600 animate-fade-in">Building knowledge bridges...</p>
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
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <ContentArea />
      <Footer />
    </div>
  );
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
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
    <LoadingProvider>
      <Router>
        <AppContent />
      </Router>
    </LoadingProvider>
  );
}

export default App;