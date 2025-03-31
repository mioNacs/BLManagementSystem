import React from 'react'

const Hero = () => {
  return (
    <div>
      {/* Hero Section */}
      <main className="pt-24 md:pt-32 pb-8 md:pb-12 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-block mb-4 px-4 py-1 bg-gray-100 rounded-full">
                <span className="text-gray-600 text-sm md:text-base">SIT Coding Club</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-4 md:mb-6">BITLINGUALS</h1>
              <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8">
                Where code speaks all languages. Join our community of passionate 
                coders, developers, and tech enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <button className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 flex items-center justify-center">
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
            <div className="bg-white rounded-xl shadow-2xl overflow-hidden h-[300px] md:h-[400px] mt-8 md:mt-0">
              <div className="bg-gray-100 px-4 py-2 flex items-center space-x-2">
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500"></div>
                <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                <span className="ml-2 text-xs md:text-sm text-gray-500">terminal</span>
              </div>
              <div className="bg-white p-4 md:p-6 font-mono text-xs md:text-sm h-[calc(300px-32px)] md:h-[calc(400px-40px)] overflow-y-auto">
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
