import React, { useState } from 'react';
import { 
  Trash2, 
  Shield, 
  User, 
  Settings as SettingsIcon, 
  ChevronDown, 
  Bell, 
  Moon,
  Palette,
  Key,
  Edit
} from 'lucide-react';
import DeleteAccountModal from '../component/settings/DeleteAccountModal';
import ChangePasswordModal from '../component/settings/ChangePasswordModal';
import EditProfileModal from '../component/settings/EditProfileModal';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const SettingsPage = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [openSections, setOpenSections] = useState({
    profile: true,
    security: false,
    notifications: false,
    appearance: false
  });
  const { user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const profileInfo = [
    { label: 'Username', value: user?.username },
    { label: 'Email', value: user?.email },
    { label: 'Contact Number', value: user?.contactNo },
    { label: 'Semester', value: user?.semester },
    { label: 'Branch', value: user?.branch },
    { label: 'Roll Number', value: user?.rollNo }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <SettingsIcon className="h-6 w-6 text-gray-700 dark:text-dark-text-secondary mr-2" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-text-primary">Account Settings</h1>
          </div>
          <button
            onClick={() => setShowEditProfileModal(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        </div>

        {/* Profile Information Section */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow mb-6">
          <div
            className="p-6 cursor-pointer"
            onClick={() => toggleSection('profile')}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-400 dark:text-dark-text-secondary mr-2" />
                <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary">Profile Information</h2>
              </div>
              <ChevronDown
                className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                  openSections.profile ? 'rotate-180' : ''
                }`}
              />
            </div>
          </div>
          {openSections.profile && (
            <div className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileInfo.map(({ label, value }) => value && (
                  <div key={label} className="flex flex-col">
                    <span className="text-sm font-medium text-gray-500 dark:text-dark-text-secondary">
                      {label}
                    </span>
                    <span className="mt-1 text-gray-900 dark:text-dark-text-primary">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Security & Privacy Section */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden mb-4">
          <button
            onClick={() => toggleSection('security')}
            className="w-full px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary">Security & Privacy</h2>
            </div>
            <ChevronDown 
              className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                openSections.security ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          
          <div 
            className={`transition-all duration-200 ease-in-out ${
              openSections.security ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="px-6 py-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-dark-text-primary flex items-center">
                    <Key className="h-5 w-5 text-blue-500 mr-2" />
                    Change Password
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update your password to keep your account secure.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowChangePasswordModal(true)}
                  className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-300 dark:border-blue-800 rounded-md text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Change Password
                </button>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
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
                    className="px-4 py-2 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-800 rounded-md text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden mb-4">
          <button
            onClick={() => toggleSection('notifications')}
            className="w-full px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary">Notifications</h2>
            </div>
            <ChevronDown 
              className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                openSections.notifications ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          
          <div 
            className={`transition-all duration-200 ease-in-out ${
              openSections.notifications ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="px-6 py-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-dark-text-primary">Due Date Reminders</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Get notified before your books are due.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-dark-text-primary">New Book Alerts</h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications when new books are added to your interests.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-white dark:bg-dark-card rounded-lg shadow-md overflow-hidden mb-4">
          <button
            onClick={() => toggleSection('appearance')}
            className="w-full px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
          >
            <div className="flex items-center">
              <Palette className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
              <h2 className="text-lg font-medium text-gray-900 dark:text-dark-text-primary">Appearance</h2>
            </div>
            <ChevronDown 
              className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                openSections.appearance ? 'transform rotate-180' : ''
              }`}
            />
          </button>
          
          <div 
            className={`transition-all duration-200 ease-in-out ${
              openSections.appearance ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}
          >
            <div className="px-6 py-5 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-900 dark:text-dark-text-primary flex items-center">
                    <Moon className="h-5 w-5 text-gray-500 mr-2" />
                    Dark Mode
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Toggle between light and dark theme.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={isDarkMode}
                    onChange={toggleTheme}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DeleteAccountModal 
        isOpen={showDeleteModal} 
        onClose={() => setShowDeleteModal(false)} 
      />

      <ChangePasswordModal
        isOpen={showChangePasswordModal}
        onClose={() => setShowChangePasswordModal(false)}
      />

      <EditProfileModal
        isOpen={showEditProfileModal}
        onClose={() => setShowEditProfileModal(false)}
        user={user}
      />
    </div>
  );
};

export default SettingsPage;