import React from 'react';
import logoLight from '../../assets/logo.svg';
import logoDark from '../../assets/logo-dark.svg';

const LoadingScreen = () => {
  return (
    <div className="fixed top-16 left-0 right-0 bottom-0 bg-white dark:bg-dark-bg z-50 flex items-center justify-center transition-colors duration-300">
      <div className="flex flex-col items-center">
        {/* Logo with loading animation */}
        <div className="relative w-28 h-28 mb-4 flex items-center justify-center">
          {/* Outer spinner */}
          <div className="absolute w-full h-full border-2 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="absolute w-full h-full border-t-2 border-primary-500 dark:border-primary-400 rounded-full animate-spin"></div>
          
          {/* Logo */}
          <div className="relative z-10 w-20 h-20 flex items-center justify-center">
            <img src={logoLight} alt="BitLinguals Logo" className="w-16 h-16 block dark:hidden" />
            <img src={logoDark} alt="BitLinguals Logo" className="w-16 h-16 hidden dark:block" />
          </div>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 animate-fade-in font-mono">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 