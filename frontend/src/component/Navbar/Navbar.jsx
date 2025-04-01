import React, { useState, useCallback } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import lightLogo from '../../assets/logo.svg'
import darkLogo from '../../assets/logo-dark.svg'
import { useTheme } from '../../context/ThemeContext'

const NavLink = ({ to, children, onClick }) => (
  <Link 
    to={to} 
    className="text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary transition-colors duration-200"
    onClick={onClick}
  >
    {children}
  </Link>
)

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const handleLoginClick = useCallback((e) => {
    e.preventDefault()
    navigate('/login')
    handleMenuClose()
  }, [navigate, handleMenuClose])
  
  const handleSignUpClick = useCallback((e) => {
    e.preventDefault()
    navigate('/signup')
    handleMenuClose()
  }, [navigate, handleMenuClose])

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/events", text: "Events" },
    { to: "/projects", text: "Projects" },
    { to: "/resources", text: "Resources" },
    { to: "/about", text: "About" }
  ]

  return (
    <nav className="fixed w-full bg-white/70 dark:bg-dark-bg/80 backdrop-blur-md border-b border-gray-100/50 dark:border-dark-border/50 z-50 transition-colors duration-300">
      <div className="container mx-auto px-3 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={isDarkMode ? darkLogo : lightLogo} 
              alt="BitLinguals Logo" 
              className="h-9 w-9 md:h-10 md:w-10"
              style={{ objectFit: 'contain' }}
            />
            <Link to="/" onClick={handleMenuClose}>
              <span className="text-lg md:text-xl font-semibold dark:text-dark-text-primary">BITLINGUALS</span>
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navLinks.map(({ to, text }) => (
              <NavLink key={to} to={to}>{text}</NavLink>
            ))}
          </div>

          {/* Auth Buttons & Mobile Menu Toggle */}
          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Theme toggle button */}
            <ThemeToggle />
            
            {/* Mobile menu button moved before Join Us button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary transition-colors duration-200 mr-1"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
            <button 
              onClick={handleLoginClick} 
              className="hidden sm:block text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary text-sm md:text-base transition-colors duration-200"
            >
              Login
            </button>
            <button 
              onClick={handleSignUpClick} 
              className="bg-primary-600 dark:bg-primary-700 text-white px-2 py-1.5 sm:px-3 md:px-4 md:py-2 rounded-md hover:bg-primary-700 dark:hover:bg-primary-600 text-sm md:text-base transition-colors duration-200 whitespace-nowrap"
            >
              Join Us
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-2 mt-2 border-t border-gray-100/50 dark:border-dark-border/50 bg-white dark:bg-dark-bg"> 
            <div className="flex flex-col space-y-4">
              {navLinks.map(({ to, text }) => (
                <NavLink key={to} to={to} onClick={handleMenuClose}>
                  {text}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-gray-100/50 dark:border-dark-border/50">
                <button 
                  onClick={handleLoginClick} 
                  className="block sm:hidden w-full text-left py-2 text-gray-600 dark:text-dark-text-secondary hover:text-gray-900 dark:hover:text-dark-text-primary"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
