import React from 'react'
import { Calendar, Users, BookOpen } from 'lucide-react';


const Section = () => {
  return (
    <div>
      {/* What We Offer Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-1 bg-gray-200 rounded-full mb-4">
              <span className="text-gray-600">What We Offer</span>
            </div>
            <h2 className="text-5xl font-bold mb-6">Code. Connect. Create.</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              BITLINGUALS provides a platform for students to learn, collaborate, and grow their coding skills.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Workshops & Events</h3>
              <p className="text-gray-600">
                Regular coding workshops, hackathons, and tech talks from industry professionals.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-gray-600">
                Join a diverse community of coders who share knowledge and collaborate on projects.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="bg-gray-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-gray-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Learning Resources</h3>
              <p className="text-gray-600">
                Access to tutorials, coding challenges, and mentorship from experienced members.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Section
