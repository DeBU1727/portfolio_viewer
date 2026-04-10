import React, { useState, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import API_BASE_URL from '../lib/api';

export default function Resume() {
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [expRes, eduRes, skillRes, profileRes] = await Promise.all([
          fetch(`${API_BASE_URL}/experience`),
          fetch(`${API_BASE_URL}/education`),
          fetch(`${API_BASE_URL}/skills`),
          fetch(`${API_BASE_URL}/portfolio-profile?t=${Date.now()}`)
        ]);

        const expData = await expRes.json();
        const eduData = await eduRes.json();
        const skillData = await skillRes.json();
        const profileData = await profileRes.json();

        console.log("Profile Data received:", profileData);

        setExperiences(expData);
        setEducation(eduData);
        setSkills(skillData);
        setProfile(profileData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching resume data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const viewUrl = profile?.resumeUrl
    ? `${API_BASE_URL}/portfolio-profile/resume/view`
    : '#';

  const downloadUrl = profile?.resumeUrl
    ? `${API_BASE_URL}/portfolio-profile/resume/download`
    : '#';

  return (
    <PageTransition className="flex flex-col items-center pt-32 pb-12 max-w-6xl mx-auto w-full text-left">
      <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 relative">
        <h1 className="text-[10vw] font-black leading-none tracking-tighter opacity-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 whitespace-nowrap z-0 pointer-events-none uppercase">
          RESUME
        </h1>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold uppercase mb-4">/Resume</h1>
          <p className="text-neutral-400 text-lg">A comprehensive overview of my professional journey.</p>
        </div>
        <div className="flex gap-4">
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`pill-button pill-light flex items-center gap-2 px-8 ${!profile?.resumeUrl ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
            onClick={(e) => !profile?.resumeUrl && e.preventDefault()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            View Resume
          </a>
          <a
            href={downloadUrl}
            download="Resume_Debanshu_Ghosh.pdf"
            className={`pill-button pill-dark flex items-center gap-2 px-8 ${!profile?.resumeUrl ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
            onClick={(e) => !profile?.resumeUrl && e.preventDefault()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
            Download Resume
          </a>
        </div>
      </div>
      <div className="w-full">
        <div className="flex flex-col space-y-16">
          {/* Experience Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-8 pb-4 border-b border-neutral-800">Experience</h2>
            {loading ? (
              <div className="text-neutral-500 font-mono animate-pulse">Loading experience...</div>
            ) : experiences.length > 0 ? (
              <div className="flex flex-col space-y-8">
                {experiences.map((exp, idx) => (
                  <div key={exp.id || idx} className="group cursor-default relative">
                    <h3 className="text-xl font-medium text-white mb-1 group-hover:pl-2 transition-all">{exp.company}</h3>
                    <div className="flex justify-between items-center text-neutral-400 group-hover:pl-2 transition-all">
                      <span>{exp.role}</span>
                      <span className="text-sm font-mono">{exp.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-neutral-500 font-mono italic">No experience records found in database.</div>
            )}
          </section>

          {/* Education Section */}
          <section>
            <h2 className="text-2xl font-semibold mb-8 pb-4 border-b border-neutral-800">Education</h2>
            {loading ? (
              <div className="text-neutral-500 font-mono animate-pulse">Loading education...</div>
            ) : education.length > 0 ? (
              <div className="flex flex-col space-y-8">
                {education.map((edu, idx) => (
                  <div key={edu.id || idx} className="group cursor-default relative">
                    <h3 className="text-xl font-medium text-white mb-1 group-hover:pl-2 transition-all">{edu.school}</h3>
                    <div className="flex justify-between items-center text-neutral-400 group-hover:pl-2 transition-all">
                      <span>{edu.degree}</span>
                      <span className="text-sm font-mono">{edu.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-neutral-500 font-mono italic">No education records found in database.</div>
            )}
          </section>

          {/* Technical Skills Section - Grouped by Category */}
          <section>
            <h2 className="text-2xl font-semibold mb-8 pb-4 border-b border-neutral-800">Technical Skills</h2>
            {loading ? (
              <div className="text-neutral-500 font-mono animate-pulse">Loading skills...</div>
            ) : skills.length > 0 ? (
              <div className="flex flex-col space-y-12">
                {Object.entries(
                  skills.reduce((acc, skill) => {
                    const cat = skill.category || 'Other';
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(skill);
                    return acc;
                  }, {})
                ).map(([category, items], catIdx) => (
                  <div key={catIdx} className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-neutral-500 flex items-center gap-4">
                      {category}
                      <div className="h-[1px] bg-neutral-800 flex-grow"></div>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {items.map((skill, idx) => (
                        <div
                          key={skill.id || idx}
                          className="py-2.5 px-5 rounded-full bg-neutral-900/50 border border-neutral-800 text-neutral-300 text-xs font-medium hover:border-white/50 hover:bg-neutral-800 transition-all cursor-default group"
                        >
                          <span className="group-hover:text-white transition-colors">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-neutral-500 font-mono italic">No skills found in database.</div>
            )}
          </section>
        </div>
      </div>
    </PageTransition>
  );
}
