import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ChevronRight, Share2 } from 'lucide-react';

const EventsPage = () => {
  const [activeEventId, setActiveEventId] = useState(null);

  const events = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      date: 'April 15, 2024',
      time: '3:00 PM - 5:00 PM',
      location: 'Room 101, Computer Science Building',
      description: 'Learn the basics of HTML, CSS, and JavaScript in this interactive workshop.',
      attendees: 45,
      bgColor: 'bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20'
    },
    {
      id: 2,
      title: 'Hackathon: Build an AI Solution',
      date: 'May 5-7, 2024',
      time: '48 hours',
      location: 'Main Auditorium',
      description: 'Join us for a 48-hour coding marathon to build innovative AI solutions for real-world problems.',
      attendees: 120,
      bgColor: 'bg-gradient-to-br from-green-500/10 to-teal-500/10 dark:from-green-500/20 dark:to-teal-500/20'
    },
    {
      id: 3,
      title: 'Career in Tech: Industry Panel',
      date: 'June 10, 2024',
      time: '4:00 PM - 6:00 PM',
      location: 'Online (Zoom)',
      description: 'Industry professionals share insights on career paths and opportunities in technology.',
      attendees: 78,
      bgColor: 'bg-gradient-to-br from-orange-500/10 to-red-500/10 dark:from-orange-500/20 dark:to-red-500/20'
    }
  ];

  const handleShareEvent = (e, eventId) => {
    e.preventDefault();
    e.stopPropagation();
    
    // In a real application, this would open a share dialog
    alert(`Share event ${eventId} with your friends!`);
  };

  return (
    <div className="pt-24 sm:pt-24 pb-16 container mx-auto px-4 md:px-6 min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-center text-gray-900 dark:text-dark-text-primary bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Upcoming Events</h1>
        <p className="text-gray-600 dark:text-dark-text-secondary mb-8 text-center">Join our community events and enhance your skills</p>
      </div>
      
      <div className="max-w-4xl mx-auto grid gap-6 sm:gap-8">
        {events.map((event) => (
          <div 
            key={event.id} 
            className={`${event.bgColor} border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 transform hover:translate-y-[-2px]`}
            onMouseEnter={() => setActiveEventId(event.id)}
            onMouseLeave={() => setActiveEventId(null)}
          >
            <div className="p-5 sm:p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-900 dark:text-dark-text-primary">{event.title}</h2>
                <button 
                  onClick={(e) => handleShareEvent(e, event.id)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  aria-label="Share event"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 dark:text-dark-text-secondary group">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-3 group-hover:scale-110 transition-transform duration-300">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{event.date}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700 dark:text-dark-text-secondary group">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-3 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{event.time}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700 dark:text-dark-text-secondary group">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 mr-3 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-gray-700 dark:text-dark-text-secondary group">
                    <div className="p-2 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 mr-3 group-hover:scale-110 transition-transform duration-300">
                      <Users className="h-4 w-4" />
                    </div>
                    <span className="text-sm">{event.attendees} attendees</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-dark-text-secondary text-sm sm:text-base mb-5 leading-relaxed">{event.description}</p>
              
              <div className="flex justify-between items-center">
                <button className={`group overflow-hidden relative px-5 py-2.5 rounded-lg font-medium text-white bg-primary-600 dark:bg-primary-500 hover:bg-primary-700 dark:hover:bg-primary-400 transition-all duration-300`}>
                  <span className={`flex items-center transition-transform duration-300 ${activeEventId === event.id ? 'transform -translate-x-2' : ''}`}>
                    Register Now
                    <ChevronRight className={`ml-1.5 h-4 w-4 transition-transform duration-300 ${activeEventId === event.id ? 'transform translate-x-1' : ''}`} />
                  </span>
                </button>
                
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.floor(Math.random() * 10) + 1} spots left
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-12 bg-white dark:bg-dark-card rounded-lg shadow-sm max-w-md mx-auto">
          <div className="mb-4 text-primary-500 dark:text-primary-400">
            <Calendar className="h-10 w-10 mx-auto" />
          </div>
          <p className="text-gray-600 dark:text-dark-text-secondary text-lg">No upcoming events at the moment. Check back later!</p>
        </div>
      )}
    </div>
  );
};

export default EventsPage; 