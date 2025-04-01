import React from 'react';

const EventsPage = () => {
  const events = [
    {
      id: 1,
      title: 'Introduction to Web Development',
      date: 'April 15, 2024',
      time: '3:00 PM - 5:00 PM',
      location: 'Room 101, Computer Science Building',
      description: 'Learn the basics of HTML, CSS, and JavaScript in this interactive workshop.',
    },
    {
      id: 2,
      title: 'Hackathon: Build an AI Solution',
      date: 'May 5-7, 2024',
      time: '48 hours',
      location: 'Main Auditorium',
      description: 'Join us for a 48-hour coding marathon to build innovative AI solutions for real-world problems.',
    },
    {
      id: 3,
      title: 'Career in Tech: Industry Panel',
      date: 'June 10, 2024',
      time: '4:00 PM - 6:00 PM',
      location: 'Online (Zoom)',
      description: 'Industry professionals share insights on career paths and opportunities in technology.',
    }
  ];

  return (
    <div className="pt-24 pb-16 container mx-auto px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Events</h1>
      <p className="text-gray-600 mb-8">Join our community events and enhance your skills</p>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-5">
              <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
              <div className="flex items-center text-gray-600 mb-1">
                <span className="font-medium">Date:</span>
                <span className="ml-2">{event.date}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-1">
                <span className="font-medium">Time:</span>
                <span className="ml-2">{event.time}</span>
              </div>
              <div className="flex items-center text-gray-600 mb-3">
                <span className="font-medium">Location:</span>
                <span className="ml-2">{event.location}</span>
              </div>
              <p className="text-gray-700 mb-4">{event.description}</p>
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors">
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage; 