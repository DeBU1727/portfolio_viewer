import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { Zap } from 'lucide-react';
import API_BASE_URL from '../lib/api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/skills`)
      .then(res => res.json())
      .then(data => {
        setSkills(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching skills:", err);
        setLoading(false);
      });
  }, []);

  // Group skills by category for better visualization
  const categories = Array.from(new Set(skills.map(s => s.category || 'Other')));

  return (
    <PageTransition className="flex flex-col items-center justify-start w-full mx-auto pt-32 pb-12">
      {/* Dynamic Header Section */}
      <div className="w-full max-w-5xl flex justify-between items-end mb-24 relative px-4 md:px-0">
        <h1 className="text-[10vw] font-black leading-none tracking-tighter opacity-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none uppercase">
          SKILLS
        </h1>
        <h2 className="text-5xl md:text-6xl font-bold uppercase relative z-10">/Skills</h2>
        <span className="text-neutral-400 relative z-10 hidden md:block text-lg font-mono">My Technical Arsenal</span>
      </div>

      <div className="w-full max-w-5xl space-y-16 relative z-10 px-4 md:px-0">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500 font-mono animate-pulse">
            <Zap className="w-12 h-12 mb-4 opacity-20" />
            <span>Synchronizing skill matrix...</span>
          </div>
        ) : categories.length > 0 ? (
          categories.map(category => (
            <div key={category} className="space-y-8">
              <div className="flex items-center gap-4">
                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-neutral-500">{category}</h3>
                <div className="h-[1px] flex-1 bg-white/5"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.filter(s => (s.category || 'Other') === category).map(skill => (
                  <div key={skill.id} className="group bg-neutral-900/50 border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white transition-colors duration-500">
                        <Zap className="w-5 h-5 text-neutral-400 group-hover:text-black transition-colors duration-500" />
                      </div>
                      <h4 className="text-xl font-black uppercase tracking-tighter text-white">{skill.name}</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-neutral-500">
                        <span>Proficiency</span>
                        <span className="group-hover:text-white transition-colors">{skill.proficiencyLevel}%</span>
                      </div>
                      <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-neutral-700 group-hover:bg-white transition-all duration-1000 ease-out"
                          style={{ width: `${skill.proficiencyLevel}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center border border-dashed border-white/10 rounded-[40px]">
            <p className="text-neutral-500 font-bold uppercase tracking-widest text-sm">No capabilities logged in current session.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
