import React from 'react'
import { Code } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignUpClick = (e) => {
    e.preventDefault()
    navigate('/login')
  }
  
  const handleLoginClick = (e) => {
    e.preventDefault()
    navigate('/signup')
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="fixed w-full bg-white/70 backdrop-blur-md border-b border-gray-100/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code className="h-6 w-6" />
              <span className="text-xl font-semibold">BITLINGUALS</span>
            </div>
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
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
