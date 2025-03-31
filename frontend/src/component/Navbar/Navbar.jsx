import React, { useState, useCallback } from 'react'
import { Code, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const NavLink = ({ to, children, onClick }) => (
  <Link 
    to={to} 
    className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
    onClick={onClick}
  >
    {children}
  </Link>
)

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuClose = useCallback(() => {
    setIsMenuOpen(false)
  }, [])

  const handleSignUpClick = useCallback((e) => {
    e.preventDefault()
    navigate('/login')
    handleMenuClose()
  }, [navigate])
  
  const handleLoginClick = useCallback((e) => {
    e.preventDefault()
    navigate('/signup')
    handleMenuClose()
  }, [navigate])

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/events", text: "Events" },
    { to: "/projects", text: "Projects" },
    { to: "/resources", text: "Resources" },
    { to: "/about", text: "About" }
  ]

  return (
    <nav className="fixed w-full bg-white/70 backdrop-blur-md border-b border-gray-100/50 z-50">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Code className="h-5 w-5 md:h-6 md:w-6" />
            <Link to="/" onClick={handleMenuClose}>
              <span className="text-lg md:text-xl font-semibold">BITLINGUALS</span>
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
            <button 
              onClick={handleSignUpClick} 
              className="text-gray-600 hover:text-gray-900 text-sm md:text-base transition-colors duration-200"
            >
              Login
            </button>
            <button 
              onClick={handleLoginClick} 
              className="bg-black text-white px-3 py-1.5 md:px-4 md:py-2 rounded-md hover:bg-gray-800 text-sm md:text-base transition-colors duration-200"
            >
              Join Us
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 px-2 mt-2 border-t border-gray-100/50"> 
            <div className="flex flex-col space-y-3">
              {navLinks.map(({ to, text }) => (
                <NavLink key={to} to={to} onClick={handleMenuClose}>
                  {text}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
