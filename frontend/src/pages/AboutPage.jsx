import React from 'react';

const AboutPage = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Navneet Raj',
      role: 'Founder & Lead Developer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Fullstack developer with expertise in MERN stack and educational technology.',
      linkedin: 'https://linkedin.com/in/example',
      github: 'https://github.com/example'
    },
    {
      id: 2,
      name: 'Avesh Raj Singh',
      role: 'Backend Engineer',
      image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Database architecture specialist with expertise in MongoDB, Express, and API design.',
      linkedin: 'https://linkedin.com/in/example',
      github: 'https://github.com/example'
    },
    {
      id: 3,
      name: 'Priyanshu Shekhar',
      role: 'Frontend Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'React specialist focused on building responsive and accessible user interfaces.',
      linkedin: 'https://linkedin.com/in/example',
      github: 'https://github.com/example'
    },
    {
      id: 4,
      name: 'Alok Kumar',
      role: 'DevOps & Infrastructure',
      image: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      bio: 'Cloud infrastructure and deployment automation expert with AWS and Docker expertise.',
      linkedin: 'https://linkedin.com/in/example',
      github: 'https://github.com/example'
    }
  ];

  return (
    <div className="pt-24 pb-16">
      {/* Mission Section */}
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">About BitLinguals</h1>
        <p className="text-gray-600 mb-8">Learn, connect, and grow with our community</p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            BitLinguals is a community-focused learning platform designed to bridge the gap between academic knowledge and practical skills in 
            computer science and programming. Our mission is to create an inclusive environment where students can learn, 
            collaborate, and build projects together.
          </p>
          <p className="text-gray-700 mb-4">
            We believe in the power of peer learning and project-based education. Through our platform, 
            we aim to help students develop the technical and soft skills necessary for success in the tech industry.
          </p>
          <p className="text-gray-700">
            Our core values include fostering collaboration, promoting continuous learning, and embracing diversity in technology.
          </p>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Meet Our Team</h2>
          <p className="text-gray-600 mb-10 text-center">The passionate people behind BitLinguals</p>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map(member => (
              <div key={member.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm mb-4">{member.bio}</p>
                  <div className="flex space-x-3">
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      LinkedIn
                    </a>
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section - Optimized for mobile */}
      <section className="container mx-auto px-4 md:px-6 mt-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Get in Touch</h2>
        <p className="text-gray-600 mb-8">Have questions or suggestions? We'd love to hear from you!</p>
        
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3">
                <p className="text-gray-700 flex flex-col sm:flex-row">
                  <span className="font-medium min-w-24 mb-1 sm:mb-0">Email:</span>
                  <span className="ml-0 sm:ml-2">contact@bitlinguals.com</span>
                </p>
                <p className="text-gray-700 flex flex-col sm:flex-row">
                  <span className="font-medium min-w-24 mb-1 sm:mb-0">Phone:</span>
                  <span className="ml-0 sm:ml-2">+91 9876543210</span>
                </p>
                <p className="text-gray-700 flex flex-col sm:flex-row">
                  <span className="font-medium min-w-24 mb-1 sm:mb-0">Address:</span>
                  <span className="ml-0 sm:ml-2">Computer Science Department, BIT Mesra, Ranchi, Jharkhand, India</span>
                </p>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-medium mb-3">Connect With Us</h4>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Twitter</a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Facebook</a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Instagram</a>
                  <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Discord</a>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0">
              <h3 className="text-xl font-semibold mb-4">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="w-full sm:w-auto bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 