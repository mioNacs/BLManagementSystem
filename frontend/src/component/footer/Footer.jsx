import React from 'react';
import { Mail, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import lightLogo from '../../assets/logo.svg';
import darkLogo from '../../assets/logo-dark.svg';
import { useTheme } from '../../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  return (
    <footer className="border-t border-gray-200 dark:border-dark-border py-12 px-6 bg-gray-50 dark:bg-dark-card transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src={isDarkMode ? darkLogo : lightLogo} 
                alt="BitLinguals Logo" 
                className="h-7 w-7"
                style={{ objectFit: 'contain' }}
              />
              <span className="text-xl font-semibold dark:text-dark-text-primary">BITLINGUALS</span>
            </div>
            <p className="text-gray-600 dark:text-dark-text-muted mb-4">
              Building knowledge bridges for the next generation of developers.
            </p>
            <div className="flex space-x-3">
              <a href="https://twitter.com" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Twitter size={18} />
              </a>
              <a href="https://github.com" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com" className="text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors">
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          {/* Links Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-dark-text-primary mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/events" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Events</Link></li>
              <li><Link to="/projects" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Projects</Link></li>
              <li><Link to="/resources" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Resources</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</Link></li>
            </ul>
          </div>
          
          {/* Resources Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-dark-text-primary mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/resources?type=documentation" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Documentation</Link></li>
              <li><Link to="/resources?category=tutorials" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Tutorials</Link></li>
              <li><Link to="/resources?type=blog" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Blog</Link></li>
              <li><Link to="/resources?type=faq" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">FAQ</Link></li>
              <li><Link to="/resources?type=community" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Community</Link></li>
            </ul>
          </div>
          
          {/* Contact Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-dark-text-primary mb-4">Contact Us</h3>
            <div className="flex items-start space-x-3 mb-2">
              <Mail size={18} className="text-gray-500 dark:text-gray-400 mt-0.5" />
              <a href="mailto:contact@bitlinguals.com" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                contact@bitlinguals.com
              </a>
            </div>
            <p className="text-gray-600 dark:text-dark-text-muted mt-4">
              Sityog Institute of Technology, Aurangabad, Bihar<br />
              India - 824101
            </p>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-gray-200 dark:border-dark-border flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-dark-text-muted text-sm">
            © {new Date().getFullYear()} BITLINGUALS. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0 text-sm">
            <Link to="/privacy-policy" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-gray-600 dark:text-dark-text-muted hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
