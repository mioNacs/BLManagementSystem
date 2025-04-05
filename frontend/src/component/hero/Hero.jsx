import React, { useCallback, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Terminal, Code, ArrowRight } from 'lucide-react'

const Hero = () => {
  const navigate = useNavigate();
  const handleJoinNow = useCallback((e) => {
    e.preventDefault()
    navigate('/signup')
  }, [navigate])
  
  const handleLearnMore = useCallback((e) => {
    e.preventDefault()
    navigate('/about')
  }, [navigate])
  
  // Terminal animation state
  const [terminalText, setTerminalText] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  const terminalLines = [
    { text: "Welcome to BITLINGUALS", delay: 100 },
    { text: "Connecting coders across languages", delay: 80 },
    { text: "Loading next workshop...", delay: 120 },
    { text: "Join our community of passionate developers", delay: 90 },
    { text: "Building bridges through code", delay: 100 }
  ];
  
  // Typing animation effect
  useEffect(() => {
    // Skip animation if all lines are typed
    if (currentLine >= terminalLines.length) return;
    
    const currentLineObj = terminalLines[currentLine];
    const lineText = currentLineObj.text;
    
    if (currentChar < lineText.length) {
      // Still typing current line
      const typingTimer = setTimeout(() => {
        setTerminalText(prev => {
          const newText = [...prev];
          if (!newText[currentLine]) newText[currentLine] = '';
          newText[currentLine] = lineText.substring(0, currentChar + 1);
          return newText;
        });
        setCurrentChar(currentChar + 1);
      }, currentLineObj.delay);
      
      return () => clearTimeout(typingTimer);
    } else {
      // Line completed, move to next line
      const lineBreakTimer = setTimeout(() => {
        setCurrentLine(currentLine + 1);
        setCurrentChar(0);
      }, 500);
      
      return () => clearTimeout(lineBreakTimer);
    }
  }, [currentLine, currentChar]);
  
  // Blinking cursor effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 530);
    
    return () => clearInterval(cursorTimer);
  }, []);
  
  return (
    <div className="bg-white dark:bg-dark-bg transition-colors duration-300">
      {/* Hero Section */}
      <main className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <div className="inline-block mb-4 px-4 py-1 bg-gray-100 dark:bg-gray-800 rounded-full transform hover:scale-105 transition-transform duration-300">
                <span className="text-gray-600 dark:text-gray-300 text-sm md:text-base">SIT Coding Club</span>
              </div>
              <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300">
                BITLINGUALS
              </h1>
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-6 md:mb-8">
                Where code speaks all languages. Join our community of passionate 
                coders, developers, and tech enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
                <button 
                  onClick={handleJoinNow} 
                  className="bg-primary-600 dark:bg-primary-500 text-white px-6 py-3 rounded-md hover:bg-primary-700 dark:hover:bg-primary-400 flex items-center justify-center transform hover:translate-y-[-2px] transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Join Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button 
                  onClick={handleLearnMore} 
                  className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-3 rounded-md hover:border-gray-400 dark:hover:border-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            {/* Terminal */}
            <div className="rounded-xl overflow-hidden h-[300px] md:h-[400px] mt-8 md:mt-0 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 bg-gray-900 group">
              <div className="bg-gray-800 dark:bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="flex items-center mx-auto text-xs md:text-sm text-gray-400">
                  <Terminal className="w-4 h-4 mr-2" />
                  <span>terminal</span>
                </div>
              </div>
              <div className="bg-gray-950 text-white p-4 md:p-6 font-mono text-xs md:text-sm h-[calc(300px-32px)] md:h-[calc(400px-40px)] overflow-y-auto">
                {terminalText.map((line, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex">
                      <span className="text-green-400 mr-2">❯</span>
                      <span className="text-blue-400 mr-2">bitlinguals@club:~$</span>
                      <span className="text-gray-200">{line}</span>
                      {index === currentLine && cursorVisible && currentChar === line.length && (
                        <span className="text-gray-200 ml-0.5 animate-pulse">_</span>
                      )}
                    </div>
                  </div>
                ))}
                {currentLine >= terminalLines.length && (
                  <div className="flex items-center">
                    <span className="text-green-400 mr-2">❯</span>
                    <span className="text-blue-400 mr-2">bitlinguals@club:~$</span>
                    {cursorVisible && <span className="text-gray-200 ml-0.5 animate-pulse">_</span>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Hero
