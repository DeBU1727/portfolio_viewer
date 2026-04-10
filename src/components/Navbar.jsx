import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../lib/api';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'project', label: 'Projects' },
  { id: 'resume', label: 'Resume' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievement', label: 'Achievement' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar({ activeSection, prevActiveSection, scrollToSection }) {
  const [projectCount, setProjectCount] = useState(0);
  const [experienceCount, setExperienceCount] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects/count`)
      .then(res => res.json())
      .then(data => setProjectCount(data))
      .catch(err => console.error("Error fetching project count:", err));

    fetch(`${API_BASE_URL}/experience/count`)
      .then(res => res.json())
      .then(data => setExperienceCount(data))
      .catch(err => console.error("Error fetching experience count:", err));
  }, []);

  useEffect(() => {
    const handleGlobalScroll = (e) => {
      if (e.detail && e.detail.id) {
        scrollToSection(e.detail.id);
      }
    };

    window.addEventListener('portfolio-scroll-to', handleGlobalScroll);
    return () => window.removeEventListener('portfolio-scroll-to', handleGlobalScroll);
  }, [scrollToSection]);

  // Determine direction
  const prevIndex = navItems.findIndex(i => i.id === prevActiveSection);
  const currentIndex = navItems.findIndex(i => i.id === activeSection);
  const isMovingRight = currentIndex > prevIndex;

  const indicatorVariants = {
    initial: (movingRight) => ({
      scaleX: 0,
      originX: movingRight ? 0 : 1,
    }),
    animate: (movingRight) => ({
      scaleX: 1,
      originX: movingRight ? 0 : 1,
      transition: {
        duration: 0.7,
        delay: 0.1,
        ease: [0.16, 1, 0.3, 1]
      }
    }),
    exit: (movingRight) => ({
      scaleX: 0,
      originX: movingRight ? 1 : 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl h-16 flex justify-between items-center px-8 bg-black/20 backdrop-blur-md border border-white/10 rounded-full z-50 transition-all duration-300 pointer-events-none">
      {/* Home Link */}
      <button
        onClick={() => scrollToSection('home')}
        className={`w-12 h-12 border rounded-full flex items-center justify-center bg-background/40 backdrop-blur-xl transition-all duration-700 group overflow-hidden pointer-events-auto ${activeSection === 'home'
          ? 'border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]'
          : 'border-neutral-800 shadow-xl hover:bg-white hover:text-black hover:border-white'
          }`}
      >
        <svg
          className={`w-5 h-5 transition-all duration-700 ${activeSection === 'home' ? 'text-white scale-110' : 'group-hover:scale-110'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </button>

      {/* Navigation Links */}
      <ul className="hidden lg:flex items-center space-x-8 text-[13px] font-medium tracking-wide uppercase pointer-events-auto">
        {navItems.slice(1).map((item) => {
          const isActive = activeSection === item.id;
          const counts = {
            'project': projectCount,
            'experience': `${experienceCount}+`
          };

          return (
            <li key={item.id} className="relative py-2">
              <button
                onClick={() => scrollToSection(item.id)}
                className="group focus:outline-none"
              >
                <div className={`relative transition-all duration-300 flex items-center space-x-1 ${isActive ? 'text-white font-bold' : 'text-neutral-500 hover:text-white'}`}>
                  <span>{item.label}</span>
                  {counts[item.id] && (
                    <span className="text-[10px] opacity-40 group-hover:opacity-80 transition-opacity ml-1">
                      [{counts[item.id]}]
                    </span>
                  )}

                  <AnimatePresence initial={false} custom={isMovingRight}>
                    {isActive && (
                      <motion.div
                        key="indicator"
                        custom={isMovingRight}
                        variants={indicatorVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute -bottom-1 left-0 w-full h-[0.5px] bg-white"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Let's Talk CTA */}
      <button
        onClick={() => scrollToSection('contact')}
        className="relative group flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-full overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)] transition-all duration-500 active:scale-95 pointer-events-auto"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite] transition-transform"></div>
        <span className="relative z-10 text-[13px] font-black uppercase tracking-[0.15em]">Let's Talk</span>
        <div className="relative z-10 flex items-center justify-center bg-black text-white w-7 h-7 rounded-full transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110">
          <svg
            className="w-4 h-4 transform -rotate-45 transition-transform duration-500 group-hover:rotate-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full border border-white/50 group-hover:border-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </button>
    </nav>
  );
}
