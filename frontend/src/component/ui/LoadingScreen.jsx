import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="absolute inset-0 bg-white z-40 flex items-center justify-center">
      <div className="flex flex-col items-center">
        {/* Minimalist loading animation */}
        <div className="relative h-8 w-8 mb-4">
          {/* Three dots animation */}
          <div className="absolute h-2 w-2 bg-black rounded-full animate-pulse" 
               style={{ left: '0%', animationDelay: '0ms' }}></div>
          <div className="absolute h-2 w-2 bg-black rounded-full animate-pulse" 
               style={{ left: '50%', transform: 'translateX(-50%)', animationDelay: '200ms' }}></div>
          <div className="absolute h-2 w-2 bg-black rounded-full animate-pulse" 
               style={{ right: '0%', animationDelay: '400ms' }}></div>
        </div>
        <p className="text-sm text-gray-600 animate-fade-in font-mono">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen; 