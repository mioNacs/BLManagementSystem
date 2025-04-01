import React, { useState } from 'react';

const ResourcesPage = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'courses', name: 'Courses' },
    { id: 'books', name: 'Books' },
    { id: 'tools', name: 'Tools & Software' }
  ];
  
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
    }
  ];
  
  const filteredResources = activeCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === activeCategory);

  return (
    <div className="pt-24 pb-16 container mx-auto px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">Learning Resources</h1>
      <p className="text-gray-600 mb-8">Curated resources to help you enhance your programming skills</p>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeCategory === category.id
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            } transition-colors`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Resource Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map(resource => (
          <div key={resource.id} className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium px-2 py-1 rounded ${
                resource.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                resource.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                resource.level === 'Advanced' ? 'bg-red-100 text-red-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {resource.level}
              </span>
              <span className="text-xs text-gray-500">{resource.category}</span>
            </div>
            <h2 className="text-xl font-semibold mb-2">{resource.title}</h2>
            <p className="text-gray-700 mb-3">{resource.description}</p>
            <p className="text-sm text-gray-600 mb-4">By {resource.author}</p>
            <a 
              href={resource.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition-colors"
            >
              Access Resource
            </a>
          </div>
        ))}
      </div>
      
      {filteredResources.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-600">No resources found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage; 