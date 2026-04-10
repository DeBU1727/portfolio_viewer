import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { GraduationCap, Calendar, MapPin, Award } from 'lucide-react';
import API_BASE_URL from '../lib/api';

export default function Education() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/education`)
      .then(res => res.json())
      .then(data => {
        setEducation(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching education:", err);
        setLoading(false);
      });
  }, []);

  return (
    <PageTransition className="flex flex-col items-center pt-32 pb-12 max-w-6xl mx-auto w-full text-left px-6">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8 relative">
        <h1 className="text-[12vw] font-black leading-none tracking-tighter opacity-[0.03] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none uppercase">
          ACADEMIC
        </h1>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold uppercase mb-4 tracking-tighter">/Education</h1>
          <p className="text-neutral-400 text-lg max-w-md leading-relaxed">My foundation of learning and academic exploration.</p>
        </div>
        <div className="hidden md:flex items-center gap-3 px-6 py-3 bg-neutral-900/50 border border-neutral-800 rounded-full text-neutral-500 font-mono text-xs uppercase tracking-widest relative z-10">
          <GraduationCap className="w-4 h-4" />
          Registry of Learning
        </div>
      </div>

      <div className="w-full relative z-10 space-y-12">
        {loading ? (
          <div className="py-32 flex flex-col items-center justify-center text-neutral-500 font-mono animate-pulse">
            <div className="w-12 h-12 border-2 border-neutral-800 border-t-white rounded-full animate-spin mb-6"></div>
            <span>Deciphering academic records...</span>
          </div>
        ) : education.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {education.map((edu, index) => (
              <div key={edu.id || index} className="group relative bg-neutral-900/40 border border-white/5 rounded-[40px] p-8 md:p-12 hover:bg-neutral-900/80 hover:border-white/10 transition-all duration-700 overflow-hidden">
                {/* Decorative Element */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] -mr-32 -mt-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-10">
                  {/* Timeline / Visual Marker */}
                  <div className="flex flex-col items-center md:items-start shrink-0">
                    <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:scale-110 transition-all duration-700">
                      <Award className="w-8 h-8 text-neutral-400 group-hover:text-black transition-colors" />
                    </div>
                    <div className="hidden md:block w-[2px] h-full bg-gradient-to-b from-neutral-800 to-transparent mt-4 ml-8"></div>
                  </div>

                  <div className="flex-grow space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-black tracking-tight text-white mb-2 leading-tight uppercase">{edu.school}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-neutral-400">
                          <span className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-sky-400">
                            <GraduationCap className="w-4 h-4" />
                            {edu.degree}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-black/50 border border-white/5 rounded-full text-xs font-mono text-neutral-400 whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        {edu.duration}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-neutral-400 text-lg leading-relaxed max-w-4xl font-medium">
                        {edu.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-32 border border-dashed border-neutral-800 rounded-[40px] flex flex-col items-center text-center">
            <GraduationCap className="w-16 h-16 text-neutral-800 mb-6" />
            <p className="text-neutral-500 font-mono text-sm tracking-widest uppercase">The academic registry is currently empty.</p>
          </div>
        )}
      </div>
    </PageTransition>
  );
}
