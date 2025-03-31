import React, { useState } from 'react'
import { Code, Menu, X } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignUpClick = (e) => {
    e.preventDefault()
    navigate('/login')
    setIsMenuOpen(false)
  }
  
  const handleLoginClick = (e) => {
    e.preventDefault()
    navigate('/signup')
    setIsMenuOpen(false)
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed w-full bg-white/70 backdrop-blur-md border-b border-gray-100/50 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6" />
              <Link to="/" onClick={() => setIsMenuOpen(false)}><span className="text-xl font-semibold">BITLINGUALS</span></Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              <Link to="/events" className="text-gray-600 hover:text-gray-900">Events</Link>
              <Link to="/projects" className="text-gray-600 hover:text-gray-900">Projects</Link>
              <Link to="/resources" className="text-gray-600 hover:text-gray-900">Resources</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
            </div>

            <div className="flex items-center space-x-4">
              <button onClick={handleSignUpClick} className="text-gray-600 hover:text-gray-900">Login</button>
              <button onClick={handleLoginClick} className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                Join Us
              </button>
              {/* Mobile Menu Button - Moved to end */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4"> 
              <div className="flex flex-col space-y-3">
                <Link to="/" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/events" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Events</Link>
                <Link to="/projects" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Projects</Link>
                <Link to="/resources" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>Resources</Link>
                <Link to="/about" className="text-gray-600 hover:text-gray-900" onClick={() => setIsMenuOpen(false)}>About</Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
