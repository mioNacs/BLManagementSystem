import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import Hero from './component/hero/Hero';
import Section from './component/hero/Section';
import Footer from './component/footer/Footer';
import Login from './component/auth/Login';
import Signup from './component/auth/Signup';

// Create a layout component for the main page
const MainLayout = () => {
  return (
    <div className="pt-16">
      <Hero />
      <Section />
    </div>
  );
};

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
          <Route path="/" element={<MainLayout />} />
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;