import React, { useState, useEffect } from 'react';
import { ExternalLink, BookOpen, Code, Video, Wrench, Search, FileText, HelpCircle, Users } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ResourcesPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [resourceType, setResourceType] = useState(null);
  
  // Parse query parameters on component mount or when URL changes
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    
    // Check for category parameter
    const categoryParam = queryParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    
    // Check for type parameter (for special resource types)
    const typeParam = queryParams.get('type');
    if (typeParam) {
      setResourceType(typeParam);
      // Set activeCategory to 'all' so we can filter by type instead
      setActiveCategory('all');
    } else {
      setResourceType(null);
    }
  }, [location.search]);
  
  const categories = [
    { id: 'all', name: 'All Resources', icon: <Search className="h-4 w-4 mr-2" /> },
    { id: 'tutorials', name: 'Tutorials', icon: <Video className="h-4 w-4 mr-2" /> },
    { id: 'courses', name: 'Courses', icon: <Code className="h-4 w-4 mr-2" /> },
    { id: 'books', name: 'Books', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { id: 'tools', name: 'Tools & Software', icon: <Wrench className="h-4 w-4 mr-2" /> }
  ];
  
  // Additional resource types that can be accessed via the footer links
  const additionalResourceTypes = [
    { id: 'documentation', name: 'Documentation', icon: <FileText className="h-4 w-4 mr-2" /> },
    { id: 'blog', name: 'Blog Posts', icon: <BookOpen className="h-4 w-4 mr-2" /> },
    { id: 'faq', name: 'FAQs', icon: <HelpCircle className="h-4 w-4 mr-2" /> },
    { id: 'community', name: 'Community Resources', icon: <Users className="h-4 w-4 mr-2" /> }
  ];
  
  // Extended resources list including the additional resource types
  const resources = [
    {
      id: 1,
      title: 'Introduction to React',
      description: 'Learn the basics of React, including components, props, and state management.',
      link: 'https://reactjs.org/tutorial/tutorial.html',
      category: 'tutorials',
      level: 'Beginner',
      author: 'React Team'
    },
    {
      id: 2,
      title: 'Node.js Fundamentals',
      description: 'A comprehensive course on building server-side applications with Node.js.',
      link: 'https://nodejs.dev/learn',
      category: 'courses',
      level: 'Intermediate',
      author: 'Node.js Foundation'
    },
    {
      id: 3,
      title: 'Modern JavaScript for the Impatient',
      description: 'A practical guide to modern JavaScript development techniques and patterns.',
      link: 'https://example.com/js-book',
      category: 'books',
      level: 'Intermediate',
      author: 'Jane Developer'
    },
    {
      id: 4,
      title: 'MongoDB for Beginners',
      description: 'Getting started with MongoDB database design and CRUD operations.',
      link: 'https://university.mongodb.com/',
      category: 'tutorials',
      level: 'Beginner',
      author: 'MongoDB University'
    },
    {
      id: 5,
      title: 'VS Code Extensions for Web Developers',
      description: 'Essential VS Code extensions to boost your productivity as a web developer.',
      link: 'https://example.com/vscode-extensions',
      category: 'tools',
      level: 'All Levels',
      author: 'Dev Community'
    },
    {
      id: 6,
      title: 'Full Stack JavaScript Development',
      description: 'Master both frontend and backend development with JavaScript.',
      link: 'https://example.com/fullstack-js',
      category: 'courses',
      level: 'Advanced',
      author: 'Tech Academy'
    },
    // Documentation resources
    {
      id: 7,
      title: 'React Documentation',
      description: 'Official React documentation covering all aspects of the library.',
      link: 'https://reactjs.org/docs/getting-started.html',
      category: 'tutorials',
      level: 'All Levels',
      author: 'React Team',
      type: 'documentation'
    },
    {
      id: 8,
      title: 'JavaScript MDN Web Docs',
      description: 'Comprehensive reference for JavaScript, from basic to advanced concepts.',
      link: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      category: 'tutorials',
      level: 'All Levels',
      author: 'Mozilla',
      type: 'documentation'
    },
    // Blog resources
    {
      id: 9,
      title: 'Understanding React Hooks',
      description: 'Deep dive into React Hooks and how they work under the hood.',
      link: 'https://example.com/react-hooks-blog',
      category: 'tutorials',
      level: 'Intermediate',
      author: 'BitLinguals Team',
      type: 'blog'
    },
    // FAQ resources
    {
      id: 10,
      title: 'Common React Questions',
      description: 'Answers to frequently asked questions about React development.',
      link: 'https://example.com/react-faq',
      category: 'tutorials',
      level: 'Beginner',
      author: 'BitLinguals Team',
      type: 'faq'
    },
    // Community resources
    {
      id: 11,
      title: 'React Discord Community',
      description: 'Join the React Discord community to connect with other developers.',
      link: 'https://example.com/react-discord',
      category: 'tools',
      level: 'All Levels',
      author: 'React Community',
      type: 'community'
    },
    {
      id: 12,
      title: 'BitLinguals Student Forums',
      description: 'Connect with other students and share knowledge on our forums.',
      link: 'https://example.com/bitlinguals-forum',
      category: 'tools',
      level: 'All Levels',
      author: 'BitLinguals Team',
      type: 'community'
    }
  ];
  
  const filteredResources = resources
    .filter(resource => {
      // If resourceType is set (from URL), filter by that first
      if (resourceType) {
        return resource.type === resourceType;
      }
      // Otherwise, filter by category (if not 'all')
      return activeCategory === 'all' || resource.category === activeCategory;
    })
    .filter(resource => 
      searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getLevelStyles = (level) => {
    switch(level) {
      case 'Beginner':
        return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
      case 'Intermediate':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';  
      case 'Advanced':
        return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
      default:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300';
    }
  };

  // Get the current page title based on parameters
  const getPageTitle = () => {
    if (resourceType) {
      const typeInfo = additionalResourceTypes.find(t => t.id === resourceType);
      return typeInfo ? typeInfo.name : 'Learning Resources';
    }
    if (activeCategory !== 'all') {
      const categoryInfo = categories.find(c => c.id === activeCategory);
      return categoryInfo ? categoryInfo.name : 'Learning Resources';
    }
    return 'Learning Resources';
  };

  return (
    <div className="pt-24 sm:pt-24 pb-16 min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-dark-bg dark:to-gray-900/50 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">{getPageTitle()}</h1>
          <p className="text-lg text-gray-600 dark:text-dark-text-secondary mb-6">Curated resources to help you enhance your programming skills</p>
          
          {/* Search input */}
          <div className="relative max-w-md mx-auto mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resources..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-dark-bg text-gray-900 dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all duration-200"
            />
          </div>
        </div>
        
        {/* Category Tabs - only show if no resourceType is selected */}
        {!resourceType && (
          <div className="flex justify-center mb-10">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-primary-600 dark:bg-primary-500 text-white shadow-md transform -translate-y-0.5'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Show selected resource type with option to clear */}
        {resourceType && (
          <div className="flex justify-center mb-10">
            <div className="flex items-center px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-full text-sm font-medium">
              {additionalResourceTypes.find(t => t.id === resourceType)?.icon}
              <span className="ml-2">{additionalResourceTypes.find(t => t.id === resourceType)?.name}</span>
              <button 
                onClick={() => setResourceType(null)} 
                className="ml-3 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
                aria-label="Clear filter"
              >
                ×
              </button>
            </div>
          </div>
        )}
        
        {/* Resource Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredResources.map(resource => (
            <div 
              key={resource.id} 
              className="bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getLevelStyles(resource.level)}`}>
                  {resource.level}
                </span>
                <span className="flex items-center text-xs text-gray-500 dark:text-gray-400 capitalize bg-gray-100 dark:bg-gray-800 px-2.5 py-1 rounded-full">
                  {resource.type 
                    ? additionalResourceTypes.find(t => t.id === resource.type)?.icon 
                    : categories.find(cat => cat.id === resource.category)?.icon}
                  <span className="ml-1">
                    {resource.type ? resource.type : resource.category}
                  </span>
                </span>
              </div>
              
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-dark-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">{resource.title}</h2>
              <p className="text-gray-700 dark:text-dark-text-secondary text-sm mb-4 line-clamp-3">{resource.description}</p>
              
              <div className="flex justify-between items-end mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <p className="text-sm text-gray-600 dark:text-dark-text-muted">By {resource.author}</p>
                <a 
                  href={resource.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:shadow-md"
                >
                  Access
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          ))}
        </div>
        
        {filteredResources.length === 0 && (
          <div className="text-center py-16 bg-white dark:bg-dark-card rounded-xl shadow-sm max-w-lg mx-auto">
            <BookOpen className="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 dark:text-dark-text-primary mb-2">No Resources Found</h3>
            <p className="text-gray-600 dark:text-dark-text-secondary mb-6">No resources found with the current search or filter.</p>
            
            <div className="flex gap-3 justify-center">
              <button 
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg hover:bg-primary-700 dark:hover:bg-primary-400 transition-colors duration-200"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage; 