import React from 'react'

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <main className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-4 py-1 bg-gray-100 rounded-full">
                <span className="text-gray-600">SIT Coding Club</span>
              </div>
              <h1 className="text-6xl font-bold mb-6">BITLINGUALS</h1>
              <p className="text-xl text-gray-600 mb-8">
                Where code speaks all languages. Join our community of passionate 
                coders, developers, and tech enthusiasts.
              </p>
              <div className="flex space-x-4">
                <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 flex items-center">
                  Join Now
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:border-gray-400">
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Terminal */}
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden h-[400px]">
              <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-sm text-gray-500">terminal</span>
              </div>
              <div className="bg-white p-6 font-mono text-sm h-calc(400px - 40px) overflow-y-auto">
                <div className="flex items-center text-green-500 mb-2">
                  <span className="mr-2">❯</span>
                  <span>bitlinguals@club:~$</span>
                </div>
                <div className="text-gray-600 mb-2">
                  ❯ Welcome to BITLINGUALS
                </div>
                <div className="text-gray-600 mb-2">
                  ❯ Connecting coders across languages
                </div>
                <div className="text-gray-600 mb-2">
                  ❯ Loading next workshop...
                </div>
                <div className="flex items-center text-green-500">
                  <span className="mr-2">❯</span>
                  <span>bitlinguals@club:~$</span>
                  <span className="animate-pulse">_</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Hero
