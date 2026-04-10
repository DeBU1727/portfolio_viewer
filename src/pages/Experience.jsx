import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import API_BASE_URL from '../lib/api';

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/experience`)
      .then(res => res.json())
      .then(data => {
        setExperiences(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching experiences:", err);
        setLoading(false);
      });
  }, []);

  return (
    <PageTransition className="flex flex-col items-center justify-start w-full mx-auto pt-32 pb-12">
      <div className="w-full max-w-5xl flex justify-between items-end mb-16 relative">
        <h1 className="text-[10vw] font-black leading-none tracking-tighter opacity-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none">
          EXPERIENCE
        </h1>
        <h2 className="text-5xl md:text-6xl font-bold uppercase relative z-10">/Experience</h2>
        <span className="text-neutral-400 relative z-10 hidden md:block text-lg font-mono">{experiences.length}+ records found</span>
      </div>

      <div className="w-full max-w-5xl relative z-10 mb-20 px-4 md:px-0">
        {loading ? (
          <div className="text-neutral-500 font-mono animate-pulse py-20 text-center w-full">Loading professional history...</div>
        ) : experiences.length > 0 ? (
          experiences.map((exp, index) => (
            <div key={exp.id || index} className="flex flex-col py-12 border-t border-neutral-800 transition-colors duration-300 relative">
              <div className="flex flex-col md:flex-row justify-between md:items-start mb-6">
                <div>
                  <h3 className="text-3xl font-medium mb-1 text-white">{exp.company}</h3>
                  <p className="text-neutral-400 text-xl">{exp.role}</p>
                </div>
                <span className="text-neutral-500 font-medium md:text-right font-mono mt-2 md:mt-0 bg-neutral-900 px-4 py-1 rounded-full text-sm inline-block w-max border border-neutral-800">{exp.duration}</span>
              </div>
              <div className="pl-0 md:pl-0 mt-2 mb-8">
                <p className="text-neutral-300 text-lg leading-relaxed max-w-4xl">{exp.details}</p>
              </div>

              {exp.certificateUrl && (
                <div className="mt-auto">
                  <a
                    href={exp.certificateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pill-button pill-light py-2 px-6 flex items-center space-x-2 text-sm inline-flex"
                  >
                    <span>View Certificate</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="py-20 border-t border-neutral-800 text-center w-full">
            <p className="text-neutral-500 font-mono italic">No professional experience records found in the database.</p>
          </div>
        )}
        <div className="border-t border-neutral-800 w-full mb-12"></div>
      </div>
    </PageTransition>
  );
}
