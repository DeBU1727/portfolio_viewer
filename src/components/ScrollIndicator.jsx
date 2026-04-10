import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'project', label: 'Work' },
  { id: 'resume', label: 'Resume' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'achievement', label: 'Achievement' },
  { id: 'contact', label: 'Contact' }
];

export default function ScrollIndicator({ activeSection, scrollToSection }) {
  const [hoveredSection, setHoveredSection] = useState(null);

  return (
    <div className="fixed right-10 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-center space-y-6">
      {sections.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;

        return (
          <div
            key={section.id}
            className="group relative flex items-center justify-center w-6 h-6"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Tooltip Label */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="absolute right-12 whitespace-nowrap bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-2xl"
                >
                  {section.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Interactive Dot */}
            <button
              onClick={() => scrollToSection(section.id)}
              className="relative flex items-center justify-center w-full h-full focus:outline-none"
            >
              <motion.div
                animate={{
                  scale: isActive ? 1.6 : 1,
                  backgroundColor: isActive ? '#FFFFFF' : 'rgba(255,255,255,0.2)'
                }}
                className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 shadow-lg ${
                  isActive ? 'shadow-[0_0_15px_rgba(255,255,255,0.8)]' : ''
                }`}
              />
              
              {isActive && (
                <motion.div
                  layoutId="indicator-ring"
                  className="absolute w-7 h-7 border border-white/20 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
