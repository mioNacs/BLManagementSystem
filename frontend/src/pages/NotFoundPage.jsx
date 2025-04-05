import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-16">
      <h1 className="text-9xl font-bold text-primary dark:text-primary-dark mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <p className="text-lg mb-8">
        Redirecting to homepage in <span className="font-bold">{countdown}</span> seconds...
      </p>
      <button 
        onClick={() => navigate('/')}
        className="px-6 py-3 bg-primary dark:bg-primary-dark text-white rounded-md hover:bg-opacity-90 transition-all"
      >
        Go Home Now
      </button>
    </div>
  );
};

export default NotFoundPage; 