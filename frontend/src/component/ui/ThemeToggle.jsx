import React, { useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  
  // Handle the click with a preventDefault to avoid any issues
  const handleToggle = (e) => {
    e.preventDefault();
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="relative p-2 rounded-full bg-gray-100 dark:bg-dark-card hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-400 flex items-center justify-center"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      type="button"
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-500" /> 
        ) : (
          <Moon className="w-5 h-5 text-blue-400" />
        )}
      </div>
    </button>
  );
};

export default ThemeToggle; 