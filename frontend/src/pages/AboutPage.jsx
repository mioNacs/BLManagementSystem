import React, { useState } from 'react';
import { Linkedin, Github, Mail, Phone, MapPin, Send, ExternalLink, Twitter, Facebook, Instagram, MessageSquare, Star, Users, Award, Heart } from 'lucide-react';

const AboutPage = () => {
  const [activeTeamMember, setActiveTeamMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send the data to your backend
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
  };

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

  const coreValues = [
    {
      title: "Excellence",
      description: "We strive for excellence in everything we do, from code quality to community engagement.",
      icon: <Star className="h-6 w-6" />,
      color: "text-yellow-500 dark:text-yellow-400",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/30"
    },
    {
      title: "Collaboration",
      description: "We believe in the power of collaborative learning and working together to solve problems.",
      icon: <Users className="h-6 w-6" />,
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-100 dark:bg-blue-900/30"
    },
    {
      title: "Innovation",
      description: "We encourage creative thinking and innovative approaches to technical challenges.",
      icon: <Award className="h-6 w-6" />,
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-100 dark:bg-purple-900/30"
    },
    {
      title: "Inclusivity",
      description: "We are committed to creating an inclusive environment welcoming to coders of all backgrounds.",
      icon: <Heart className="h-6 w-6" />,
      color: "text-pink-500 dark:text-pink-400",
      bgColor: "bg-pink-100 dark:bg-pink-900/30"
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-gray-900/50 transition-colors duration-300">
      {/* Mission Section */}
      <section className="container mx-auto px-4 md:px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-full mb-4 shadow-sm">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Our Story</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">About BitLinguals</h1>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary mb-8">Learn, connect, and grow with our community</p>
        </div>
        
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
          {/* Decorative gradient circles */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary-500/10 dark:bg-primary-500/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-3xl"></div>
          
          <div className="relative">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-900 dark:text-dark-text-primary">Our Mission</h2>
            <p className="text-gray-700 dark:text-dark-text-secondary mb-5 text-lg leading-relaxed">
              BitLinguals is a community-focused learning platform designed to bridge the gap between academic knowledge and practical skills in 
              computer science and programming. Our mission is to create an inclusive environment where students can learn, 
              collaborate, and build projects together.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 my-8">
              {coreValues.map((value, index) => (
                <div key={index} className="flex items-start p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:border-primary-200 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-sm group">
                  <div className={`p-3 rounded-xl mr-4 ${value.bgColor} ${value.color} group-hover:scale-110 transition-transform duration-200`}>
                    {value.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-dark-text-primary mb-1">{value.title}</h3>
                    <p className="text-gray-600 dark:text-dark-text-secondary text-sm">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <p className="text-gray-700 dark:text-dark-text-secondary mb-5 text-lg leading-relaxed">
              We believe in the power of peer learning and project-based education. Through our platform, 
              we aim to help students develop the technical and soft skills necessary for success in the tech industry.
            </p>
            <p className="text-gray-700 dark:text-dark-text-secondary text-lg leading-relaxed">
              Our core values include fostering collaboration, promoting continuous learning, and embracing diversity in technology.
            </p>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-dark-bg transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-block px-4 py-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-full mb-4 shadow-sm">
              <span className="text-gray-700 dark:text-gray-300 font-medium">The Dream Team</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Meet Our Team</h2>
            <p className="text-lg text-gray-600 dark:text-dark-text-secondary">The passionate people behind BitLinguals</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map(member => (
              <div 
                key={member.id} 
                className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                onMouseEnter={() => setActiveTeamMember(member.id)}
                onMouseLeave={() => setActiveTeamMember(null)}
              >
                <div className="relative overflow-hidden group h-64">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent flex flex-col justify-end p-6 transform transition-transform duration-500 ${activeTeamMember === member.id ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <h3 className="text-xl font-semibold mb-1 text-white">{member.name}</h3>
                    <p className="text-primary-300 text-sm mb-3">{member.role}</p>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">{member.bio}</p>
                    <div className="flex space-x-3">
                      <a 
                        href={member.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors duration-200 transform hover:scale-110"
                        aria-label="LinkedIn Profile"
                      >
                        <Linkedin className="w-5 h-5 text-white" />
                      </a>
                      <a 
                        href={member.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors duration-200 transform hover:scale-110"
                        aria-label="GitHub Profile"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-semibold mb-1 text-gray-900 dark:text-dark-text-primary">{member.name}</h3>
                  <p className="text-primary-600 dark:text-primary-400 text-sm mb-3">{member.role}</p>
                  <p className="text-gray-700 dark:text-dark-text-secondary text-sm mb-4">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Contact Section - Optimized for mobile */}
      <section className="container mx-auto px-4 md:px-6 mt-20">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-block px-4 py-1 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-full mb-4 shadow-sm">
            <span className="text-gray-700 dark:text-gray-300 font-medium">Let's Talk</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Get in Touch</h2>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary">Have questions or suggestions? We'd love to hear from you!</p>
        </div>
        
        <div className="bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-xl p-6 md:p-8 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden">
          {/* Decorative gradient circles */}
          <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-primary-500/10 dark:bg-primary-500/20 blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-3xl"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-dark-text-primary">Contact Information</h3>
              <div className="space-y-5">
                <div className="flex items-center text-gray-700 dark:text-dark-text-secondary group">
                  <div className="p-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email us at</p>
                    <a href="mailto:contact@bitlinguals.com" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">contact@bitlinguals.com</a>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-700 dark:text-dark-text-secondary group">
                  <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Call us at</p>
                    <a href="tel:+919876543210" className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">+91 9876543210</a>
                  </div>
                </div>
                
                <div className="flex items-start text-gray-700 dark:text-dark-text-secondary group">
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 mr-4 group-hover:scale-110 transition-transform duration-200 mt-1">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Visit us at</p>
                    <address className="not-italic">Computer Science Department, <br />BIT Mesra, Ranchi, <br />Jharkhand, India</address>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-dark-text-primary">Connect With Us</h4>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#" 
                    className="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 hover:text-primary-600 dark:text-dark-text-secondary dark:hover:text-primary-400 transition-all duration-200 hover:-translate-y-1"
                    aria-label="Twitter"
                  >
                    <Twitter className="h-5 w-5 mr-2" />
                    <span>Twitter</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 hover:text-primary-600 dark:text-dark-text-secondary dark:hover:text-primary-400 transition-all duration-200 hover:-translate-y-1"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5 mr-2" />
                    <span>Facebook</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 hover:text-primary-600 dark:text-dark-text-secondary dark:hover:text-primary-400 transition-all duration-200 hover:-translate-y-1"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5 mr-2" />
                    <span>Instagram</span>
                  </a>
                  <a 
                    href="#" 
                    className="flex items-center p-2 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-700 hover:text-primary-600 dark:text-dark-text-secondary dark:hover:text-primary-400 transition-all duration-200 hover:-translate-y-1"
                    aria-label="Discord"
                  >
                    <MessageSquare className="h-5 w-5 mr-2" />
                    <span>Discord</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-dark-text-primary">Send Us a Message</h3>
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">Name</label>
                  <div className="relative">
                    <input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleFormChange}
                      className="w-full px-3 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all duration-200"
                      placeholder="Your name"
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">Email</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-3 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all duration-200"
                      placeholder="Your email"
                      required
                    />
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500">
                      <Mail className="h-6 w-6" />
                    </div>
                  </div>
                </div>
                <div className="group">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-dark-text-secondary mb-2">Message</label>
                  <textarea 
                    id="message" 
                    rows="5"
                    value={formData.message}
                    onChange={handleFormChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all duration-200"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  className="inline-flex items-center bg-primary-600 dark:bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-all duration-300 transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 shadow-md hover:shadow-lg w-full justify-center"
                >
                  <Send className="h-5 w-5 mr-2" />
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