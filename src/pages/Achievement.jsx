import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import API_BASE_URL from '../lib/api';

export default function Achievement() {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/certifications`)
      .then(res => res.json())
      .then(data => {
        setCertifications(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching certifications:", err);
        setLoading(false);
      });
  }, []);

  return (
    <PageTransition className="flex flex-col items-center justify-start w-full mx-auto pt-32 pb-12">
      <div className="w-full max-w-5xl flex justify-between items-end mb-16 relative">
        <h1 className="text-[10vw] font-black leading-none tracking-tighter opacity-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none">
          ACHIEVEMENTS
        </h1>
        <h2 className="text-5xl md:text-6xl font-bold uppercase relative z-10">/Achievements</h2>
        <span className="text-neutral-400 relative z-10 hidden md:block text-lg font-mono">Certifications & Awards</span>
      </div>

      <div className="w-full max-w-5xl relative z-10 mb-20 px-4 md:px-0">
        {loading ? (
          <div className="text-neutral-500 font-mono animate-pulse py-20 text-center w-full">Loading achievements...</div>
        ) : certifications.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <div key={cert.id || index} className="bg-neutral-900/50 p-8 rounded-3xl border border-neutral-800 flex flex-col items-start justify-between min-h-[250px] group transition-colors hover:bg-neutral-900/80 hover:border-neutral-700">
                <div>
                  <h3 className="text-3xl font-medium mb-2 text-white">{cert.title}</h3>
                  <div className="mb-6 flex gap-4 text-neutral-400 font-mono text-sm">
                    <span>{cert.organization}</span>
                    <span>•</span>
                    <span>{cert.issueDate ? new Date(cert.issueDate).getFullYear() : 'Ongoing'}</span>
                  </div>
                  <p className="text-neutral-300 mb-8 leading-relaxed max-w-md">{cert.description || "Official certification issued for demonstrated proficiency and verified skills."}</p>
                </div>

                <a
                  href={cert.credentialUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pill-button pill-light py-2 px-6 flex items-center space-x-2 w-full md:w-auto justify-center mt-auto text-sm"
                >
                  <span>View Certificate</span>
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 border-t border-neutral-800 text-center w-full">
            <p className="text-neutral-500 font-mono italic">No certifications found in the credentials database.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
