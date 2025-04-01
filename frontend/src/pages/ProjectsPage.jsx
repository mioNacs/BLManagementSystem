import React, { useState } from 'react';
import { Github, ExternalLink, Code, Layers, Database, Cpu } from 'lucide-react';

const ProjectsPage = () => {
  const [activeProject, setActiveProject] = useState(null);
  
  const projectCategories = ['All', 'Web', 'Mobile', 'AI/ML', 'Backend'];
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const projects = [
    {
      id: 1,
      title: 'Learning Management System',
      description: 'A comprehensive platform for managing educational resources, courses, and student progress.',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      github: 'https://github.com/example/lms',
      demo: 'https://example-lms.netlify.app',
      category: 'Web',
      icon: <Code className="h-5 w-5" />
    },
    {
      id: 2,
      title: 'Smart Campus Application',
      description: 'A mobile app for students to access campus resources, schedule classes, and connect with peers.',
      technologies: ['React Native', 'Firebase', 'Redux'],
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      github: 'https://github.com/example/campus-app',
      demo: 'https://example-campus.netlify.app',
      category: 'Mobile',
      icon: <Layers className="h-5 w-5" />
    },
    {
      id: 3,
      title: 'Attendance Tracking System',
      description: 'An automated system for tracking student attendance using facial recognition technology.',
      technologies: ['Python', 'OpenCV', 'TensorFlow', 'Flask'],
      image: 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      github: 'https://github.com/example/attendance-system',
      demo: 'https://example-attendance.herokuapp.com',
      category: 'AI/ML',
      icon: <Cpu className="h-5 w-5" />
    },
    {
      id: 4,
      title: 'Coding Competition Platform',
      description: 'A platform for hosting coding competitions, with real-time judging and leaderboards.',
      technologies: ['Next.js', 'PostgreSQL', 'Docker', 'WebSockets'],
      image: 'https://images.unsplash.com/photo-1555099962-4199c345e5dd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      github: 'https://github.com/example/coding-platform',
      demo: 'https://example-coding.vercel.app',
      category: 'Backend',
      icon: <Database className="h-5 w-5" />
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="pt-24 sm:pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-gray-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">Our Projects</h1>
          <p className="text-gray-600 dark:text-dark-text-secondary mb-8 text-lg">Explore student and faculty projects built with BitLinguals</p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {projectCategories.map(category => (
              <button 
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category 
                    ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
              onMouseEnter={() => setActiveProject(project.id)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-2/5 relative overflow-hidden">
                  <div className="absolute top-0 left-0 m-3 z-10">
                    <div className="bg-black/60 backdrop-blur-sm text-white px-2.5 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      {project.icon}
                      <span className="ml-1">{project.category}</span>
                    </div>
                  </div>
                  
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="h-52 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <div className="flex space-x-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-white/20 backdrop-blur-sm p-2 rounded-full hover:bg-white/40 transition-colors duration-200"
                        aria-label="View GitHub Repository"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </a>
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-primary-500/80 backdrop-blur-sm p-2 rounded-full hover:bg-primary-500 transition-colors duration-200"
                        aria-label="View Live Demo"
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 lg:p-6 lg:w-3/5">
                  <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-dark-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">{project.title}</h2>
                  <p className="text-gray-700 dark:text-dark-text-secondary text-sm mb-4 leading-relaxed">{project.description}</p>
                  
                  <div className="mb-5">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-dark-text-muted mb-2">Technologies:</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs rounded-md transition-transform duration-200 hover:scale-105"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                    <a 
                      href={project.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProjects.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-dark-card rounded-xl shadow-sm max-w-lg mx-auto">
            <Code className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-2">No Projects Found</h3>
            <p className="text-gray-600 dark:text-dark-text-secondary">No projects available in this category at the moment.</p>
            
            <button 
              onClick={() => setSelectedCategory('All')}
              className="mt-6 px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors duration-200"
            >
              View All Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage; 