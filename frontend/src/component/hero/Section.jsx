import React, { useState } from 'react'
import { Calendar, Users, BookOpen, Code, ArrowRight, MousePointer } from 'lucide-react';
import { Link } from 'react-router-dom';


const Section = () => {
  const [activeFeature, setActiveFeature] = useState(null);
  
  const features = [
    {
      id: 1,
      icon: <Calendar className="h-6 w-6" />,
      title: "Workshops & Events",
      description: "Regular coding workshops, hackathons, and tech talks from industry professionals.",
      color: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      bgDark: "bg-blue-900/20"
    },
    {
      id: 2,
      icon: <Users className="h-6 w-6" />,
      title: "Community",
      description: "Join a diverse community of coders who share knowledge and collaborate on projects.",
      color: "from-emerald-500 to-green-600",
      bgLight: "bg-emerald-50",
      bgDark: "bg-emerald-900/20",
      textLight: "text-emerald-600",
      textDark: "dark:text-emerald-400"
    },
    {
      id: 3,
      icon: <BookOpen className="h-6 w-6" />,
      title: "Learning Resources",
      description: "Access to tutorials, coding challenges, and mentorship from experienced members.",
      color: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
      bgDark: "bg-amber-900/20"
    },
    {
      id: 4,
      icon: <Code className="h-6 w-6" />,
      title: "Project Collaboration",
      description: "Work together on real projects to build your portfolio and gain practical experience.",
      color: "from-purple-500 to-pink-600",
      bgLight: "bg-purple-50",
      bgDark: "bg-purple-900/20"
    }
  ];

  return (
    <div>
      {/* What We Offer Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-gray-900/50 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-full mb-4 shadow-sm">
              <span className="text-gray-700 dark:text-gray-300 font-medium">What We Offer</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Code. Connect. Create.</h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-dark-text-secondary max-w-3xl mx-auto relative">
              <span className="relative inline-block">
                BITLINGUALS 
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-primary-500/30 dark:bg-primary-400/30 rounded"></span>
              </span> provides a platform for students to learn, collaborate, and grow their coding skills.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {features.map(feature => (
              <div 
                key={feature.id}
                className="bg-white dark:bg-dark-card p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 group border border-gray-100 dark:border-gray-800 hover:border-transparent dark:hover:border-transparent relative overflow-hidden transform hover:-translate-y-1"
                onMouseEnter={() => setActiveFeature(feature.id)} 
                onMouseLeave={() => setActiveFeature(null)}
              >
                {/* Background highlight effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`}></div>
                
                {/* Animated blob in corner */}
                <div className={`absolute -bottom-20 -right-20 w-40 h-40 rounded-full ${feature.bgLight} dark:${feature.bgDark} opacity-0 group-hover:opacity-70 transition-all duration-500 blur-3xl`}></div>
                
                <div className={`relative ${feature.bgLight} dark:${feature.bgDark} w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300 ${feature.textLight || `text-${feature.color.split('-')[1]}-500`} ${feature.textDark || `dark:text-${feature.color.split('-')[1]}-400`}`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3 sm:mb-4 text-gray-900 dark:text-dark-text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 dark:text-dark-text-secondary mb-4">
                  {feature.description}
                </p>
                
                <div className={`flex items-center text-primary-600 dark:text-primary-400 font-medium transition-all duration-300 ${activeFeature === feature.id ? 'opacity-100' : 'opacity-0'}`}>
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="group relative inline-flex cursor-pointer">
              <div className="absolute inset-0 rounded-full bg-primary-500/20 dark:bg-primary-700/30 transform group-hover:scale-110 transition-transform duration-300"></div>
              <Link to="/about" className="relative bg-white dark:bg-dark-card px-5 py-3 rounded-full font-medium text-gray-800 dark:text-dark-text-primary shadow-sm hover:shadow-md transition-all duration-300 inline-flex items-center space-x-2">
                <span>Discover our community</span>
                <MousePointer className="h-4 w-4 text-primary-600 dark:text-primary-400 group-hover:animate-pulse" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Section
