import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Mail, Phone, School, BookOpen } from 'lucide-react';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Not Authenticated</h2>
          <p className="mb-4">Please log in to view your profile.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden">
        <div className="bg-primary-600 dark:bg-primary-700 text-white p-6">
          <h2 className="text-2xl font-bold">Your Profile</h2>
        </div>
        
        <div className="p-6">
          <div className="flex items-start">
            {/* Profile Picture */}
            <div className="mr-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                {user.profilePic ? (
                  <img 
                    src={user.profilePic} 
                    alt={`${user.username}'s profile`} 
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <User size={36} />
                )}
              </div>
            </div>
            
            {/* User Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-dark-text-primary">
                {user.username}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-700 dark:text-dark-text-secondary">
                  <Mail className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span>{user.email}</span>
                </div>
                
                {user.contactNo && (
                  <div className="flex items-center text-gray-700 dark:text-dark-text-secondary">
                    <Phone className="h-5 w-5 mr-2" aria-hidden="true" />
                    <span>{user.contactNo}</span>
                  </div>
                )}
                
                <div className="flex items-center text-gray-700 dark:text-dark-text-secondary">
                  <School className="h-5 w-5 mr-2" aria-hidden="true" />
                  <span>
                    {user.branch}, {user.semester} Semester 
                    {user.rollNo && ` (${user.rollNo})`}
                  </span>
                </div>
                
                {user.course && (
                  <div className="flex items-center text-gray-700 dark:text-dark-text-secondary">
                    <BookOpen className="h-5 w-5 mr-2" aria-hidden="true" />
                    <span>{user.course}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5 mr-2" aria-hidden="true" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 