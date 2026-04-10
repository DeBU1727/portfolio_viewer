import React, { useState, useRef } from 'react';
import PageTransition from '../components/PageTransition';
import { Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  return (
    <PageTransition className="relative overflow-hidden pt-0 h-full">
      {/* Background Typography */}
      <div className="absolute top-[12%] inset-x-0 flex justify-center z-0 pointer-events-none select-none px-4">
        <h1 className="text-[7vw] font-black leading-none tracking-tighter flex whitespace-nowrap uppercase">
          <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>DEBANSHU</span>
          <span className="text-white opacity-10 ml-[2vw]">GHOSH</span>
        </h1>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-12 items-center relative z-10 w-full h-full min-h-[80vh]">
        {/* Left Column: Role, Bio & Tools */}
        <div className="md:col-span-6 text-left space-y-8 flex flex-col items-start pt-24 md:pt-16">
          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-widest uppercase mb-4">Full Stack Developer</h2>
            <p className="text-neutral-400 text-lg md:text-xl font-light leading-relaxed max-w-md">
              Designing digital products that are clear, usable, and conversion focused.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-start gap-12 w-full">
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 border-b border-neutral-800 pb-2 inline-block">Development tools</h3>
              <div className="flex flex-wrap gap-4 pt-2">
                {[
                  { name: 'VS Code', icon: 'vscode', color: '#007acc' },
                  { name: 'Postman', icon: 'postman', color: '#ff6c37' },
                  { name: 'GitHub', icon: 'github', color: '#ffffff' },
                  { name: 'Eclipse', icon: 'eclipse', color: '#2c2255' },
                  { name: 'Spring Boot', icon: 'spring', color: '#6db33f' }
                ].map((tool) => (
                  <div
                    key={tool.name}
                    className="group relative w-12 h-12 bg-neutral-900/50 border border-neutral-800 rounded-full flex items-center justify-center p-2.5 hover:border-white/50 hover:scale-110 transition-all duration-300 cursor-help shadow-lg overflow-hidden"
                    title={tool.name}
                  >
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${tool.icon}/${tool.icon}-original.svg`}
                      alt={tool.name}
                      className={`w-full h-full object-contain filter grayscale transition-all duration-300 ${tool.name === 'GitHub' ? 'invert opacity-40 group-hover:opacity-100 group-hover:brightness-200' : 'group-hover:grayscale-0'}`}
                    />
                    <div
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity blur-md"
                      style={{ backgroundColor: tool.color }}
                    ></div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 border-b border-neutral-800 pb-2 inline-block">Connect</h3>
              <div className="flex flex-col gap-3 max-w-3xl">
                <div className="grid grid-cols-2 gap-3">
                  <a href="https://www.linkedin.com/in/debanshu-g" target="_blank" rel="noopener noreferrer" className="pill-button border border-neutral-800 bg-neutral-900/40 backdrop-blur-md text-white py-3 px-6 flex items-center space-x-3 group hover:bg-white hover:text-black transition-all rounded-full hover:border-white shadow-lg overflow-hidden relative">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-1 grayscale group-hover:grayscale-0 transition-all shrink-0">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">LinkedIn</span>
                  </a>
                  <a href="https://github.com/DeBU1727" target="_blank" rel="noopener noreferrer" className="pill-button border border-neutral-800 bg-neutral-900/40 backdrop-blur-md text-white py-3 px-6 flex items-center space-x-3 group hover:bg-white hover:text-black transition-all rounded-full hover:border-white shadow-lg overflow-hidden relative">
                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center p-1 transition-all shrink-0">
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="w-full h-full object-contain grayscale group-hover:grayscale-0" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">GitHub</span>
                  </a>
                  <a href="tel:+917319001727" className="pill-button border border-neutral-800 bg-neutral-900/40 backdrop-blur-md text-white py-3 px-6 flex items-center space-x-3 group hover:bg-white hover:text-black transition-all rounded-full hover:border-white shadow-lg overflow-hidden relative">
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center p-1.5 transition-all shrink-0 group-hover:bg-black group-hover:text-white">
                      <Phone className="w-full h-full text-white" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">+91 7319001727</span>
                  </a>
                  <a 
                    href="#contact" 
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new CustomEvent('portfolio-scroll-to', { detail: { id: 'contact' } }));
                    }}
                    className="pill-button border border-neutral-800 bg-neutral-900/40 backdrop-blur-md text-white py-3 px-6 flex items-center space-x-3 group hover:bg-white hover:text-black transition-all rounded-full hover:border-white shadow-lg overflow-hidden relative"
                  >
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center p-1.5 transition-all shrink-0 group-hover:bg-black group-hover:text-white">
                      <Mail className="w-full h-full text-white" />
                    </div>
                    <span className="text-[10px] font-bold tracking-tight lowercase whitespace-nowrap">gdebanshu1727@gmail.com</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Portrait */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="absolute bottom-0 right-0 z-20 w-[60vw] md:w-[45vw] lg:w-[40vw] max-w-2xl h-auto flex justify-end items-end cursor-none pointer-events-auto"
      >
        <img
          src="/professional-headshot.png?v=3"
          alt="Debanshu Ghosh"
          className="w-full h-auto object-contain filter grayscale brightness-[0.7] contrast-[1.1] transition-all duration-500"
        />
        <img
          src="/professional-headshot.png?v=3"
          alt="Debanshu Ghosh Color"
          className={`absolute bottom-0 right-0 w-full h-auto object-contain z-20 transition-opacity duration-300 pointer-events-none ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          style={{
            maskImage: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, black 0%, rgba(0,0,0,0.8) 15%, transparent 35%)`,
            WebkitMaskImage: `radial-gradient(circle at ${spotlightPos.x}% ${spotlightPos.y}%, black 0%, rgba(0,0,0,0.8) 15%, transparent 35%)`,
          }}
        />
        {isHovering && (
          <div
            className="absolute w-24 h-24 border border-white/20 rounded-full z-30 pointer-events-none backdrop-blur-sm bg-white/5 shadow-2xl transition-transform duration-75 ease-out"
            style={{
              left: `${spotlightPos.x}%`,
              top: `${spotlightPos.y}%`,
              transform: 'translate(-50%, -50%)'
            }}
          ></div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 z-10 hidden md:flex"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent overflow-hidden">
          <motion.div
            animate={{ y: [0, 48, 48] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-full h-full bg-white shadow-[0_0_10px_white]"
          />
        </div>
      </motion.div>
    </PageTransition>
  );
}
