import React from 'react'
import { Code } from 'lucide-react'

const Navbar = () => {
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
              <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Events</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Projects</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Resources</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">About</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">Sign In</button>
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
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
