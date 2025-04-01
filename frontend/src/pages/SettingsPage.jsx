import React, { useState } from 'react';
import { Trash2, Shield, User, Settings as SettingsIcon } from 'lucide-react';
import DeleteAccountModal from '../component/settings/DeleteAccountModal';
import { useAuth } from '../context/AuthContext';

const SettingsPage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <SettingsIcon className="h-6 w-6 text-gray-700 dark:text-dark-text-secondary mr-2" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">Account Settings</h1>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary">Profile Information</h2>
            </div>
          </div>
          
          <div className="px-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Username
                </label>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-gray-900 dark:text-dark-text-primary">
                  {user?.username || 'Not available'}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-1">
                  Email
                </label>
                <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-md text-gray-900 dark:text-dark-text-primary">
                  {user?.email || 'Not available'}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary">Security & Privacy</h2>
            </div>
          </div>
          
          <div className="px-6 py-5">
            <div className="border-t border-gray-200 dark:border-gray-700 pt-5 mt-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-dark-text-primary flex items-center">
                    <Trash2 className="h-5 w-5 text-red-500 mr-2" />
                    Delete Account
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Permanently delete your account and all associated data.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="ml-4 px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DeleteAccountModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
      />
    </div>
  );
};

export default SettingsPage; 