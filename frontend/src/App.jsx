import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import Footer from './component/footer/Footer';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';

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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
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
        <Footer />
      </div>
    </Router>
  );
}

export default App;