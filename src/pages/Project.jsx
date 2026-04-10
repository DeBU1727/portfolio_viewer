import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import API_BASE_URL from '../lib/api';

export default function Project() {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        // Derive unique categories from data
        const uniqueCategories = ['All', ...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setLoading(false);
      });
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <PageTransition className="flex flex-col items-center justify-start text-center min-h-screen pt-32 pb-12">
      <div className="w-full max-w-5xl flex justify-between items-end mb-16 relative px-4 md:px-0">
        <h1 className="text-[10vw] font-black leading-none tracking-tighter opacity-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none">
          PROJECTS
        </h1>
        <h2 className="text-5xl md:text-6xl font-bold uppercase relative z-10">/Projects</h2>
        <span className="text-neutral-400 relative z-10 hidden md:block text-lg font-mono">Dynamic Showcase</span>
      </div>

      <div className="w-full text-center relative px-4">
        <div className="flex justify-center flex-wrap gap-4 mb-20 relative z-10">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`pill-button transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 ${activeCategory === cat ? 'pill-dark scale-105' : 'pill-light border-transparent hover:border-neutral-700 bg-transparent text-foreground hover:bg-neutral-900'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-neutral-500 font-mono animate-pulse">Loading dynamic projects...</div>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left relative z-10 max-w-6xl mx-auto w-full mb-20">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="group cursor-pointer">
                <div className="w-full aspect-video bg-neutral-900 rounded-2xl mb-6 overflow-hidden relative">
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-neutral-600 font-mono text-xs italic">No Image Preview</div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a href={project.projectUrl || '#'} target="_blank" rel="noopener noreferrer" className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-black font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 hover:bg-neutral-200">↗</a>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-white">{project.title}</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="pill-button pill-light py-1 px-4 text-xs font-normal border-neutral-800 pointer-events-none">{project.category || 'Project'}</span>
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="pill-button border border-neutral-800 hover:bg-white hover:text-black hover:border-white text-xs px-4 py-1 transition-all">GitHub ↗</a>
                  )}
                </div>
                <p className="text-neutral-400 mt-4 line-clamp-2 text-sm leading-relaxed">{project.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-neutral-500 font-mono italic">No projects found for {activeCategory} category.</div>
        )}
      </div>
    </PageTransition>
  );
}
