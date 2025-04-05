import React from 'react';
import Hero from '../component/hero/Hero';
import Section from '../component/hero/Section';

const HomePage = () => {
  return (
    <div className="bg-white dark:bg-dark-bg transition-colors duration-300">
      <div className="pt-16 min-h-screen">
        <Hero />
      </div>
      <Section />
    </div>
  );
};

export default HomePage; 