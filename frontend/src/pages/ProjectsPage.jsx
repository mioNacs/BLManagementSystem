import React from 'react';

const ProjectsPage = () => {
  const projects = [
    {
      id: 1,
      title: 'Learning Management System',
      description: 'A comprehensive platform for managing educational resources, courses, and student progress.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      github: 'https://github.com/example/lms',
      demo: 'https://example-lms.netlify.app'
    },
    {
      id: 2,
      title: 'Smart Campus Application',
      description: 'A mobile app for students to access campus resources, schedule classes, and connect with peers.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      github: 'https://github.com/example/campus-app',
      demo: 'https://example-campus.netlify.app'
    },
    {
      id: 3,
      title: 'Attendance Tracking System',
      description: 'An automated system for tracking student attendance using facial recognition technology.',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      github: 'https://github.com/example/attendance-system',
      demo: 'https://example-attendance.herokuapp.com'
    },
    {
      id: 4,
      title: 'Coding Competition Platform',
      description: 'A platform for hosting coding competitions, with real-time judging and leaderboards.',
      technologies: ['Next.js', 'PostgreSQL', 'Docker', 'WebSockets'],
      image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      github: 'https://github.com/example/coding-platform',
      demo: 'https://example-coding.vercel.app'
    }
  ];

  return (
    <div className="pt-24 pb-16 container mx-auto px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Our Projects</h1>
      <p className="text-gray-600 mb-8">Explore student and faculty projects built with BitLinguals</p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            <div className="md:flex">
              <div className="md:w-1/3">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="h-48 w-full object-cover md:h-full"
                />
              </div>
              <div className="p-5 md:w-2/3">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
                <p className="text-gray-700 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-600 mb-2">Technologies:</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-md"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-gray-900 text-white px-3 py-1.5 rounded text-sm hover:bg-gray-800 transition-colors"
                  >
                    GitHub
                  </a>
                  <a 
                    href={project.demo} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition-colors"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage; 