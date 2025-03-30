import React from 'react';
import Navbar from './component/navbar/Navbar';
import Hero from './component/hero/Hero';
import Section from './component/hero/Section';
import Footer from './component/footer/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <Navbar />
      
      {/* Hero Section */}
      <Hero/>

      {/* What We Offer Section */}
      <Section/>

      {/* Footer */}
      <Footer/>

    </div>
  );
}

export default App;