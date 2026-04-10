import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import ScrollIndicator from './components/ScrollIndicator';
import Home from './pages/Home';
import Project from './pages/Project';
import Resume from './pages/Resume';
import Experience from './pages/Experience';
import Skills from './pages/Skills';
import Education from './pages/Education';
import Achievement from './pages/Achievement';
import Contact from './pages/Contact';

const sections = ['home', 'project', 'resume', 'experience', 'education', 'skills', 'achievement', 'contact'];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [prevActiveSection, setPrevActiveSection] = useState('home');
  const isManualScroll = useRef(false);
  const timeoutRef = useRef(null);
  const mainRef = useRef(null);
  const contentRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis with refined "liquid" settings
    const lenis = new Lenis({
      wrapper: mainRef.current,
      content: contentRef.current,
      lerp: 0.05, // Lower value = more liquid/floaty feel
      easing: (t) => 1 - Math.pow(1 - t, 4), // Quart.out easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1, // Slight boost for responsiveness
      smoothTouch: true,
      syncTouch: true,
      infinite: false,
    });

    lenisRef.current = lenis;

    // ResizeObserver to handle dynamic height changes (e.g. data loading)
    const resizeObserver = new ResizeObserver(() => {
      lenis.update();
    });

    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Initial load hash scroll
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.substring(1);
        scrollToSection(id);
      }, 500);
    }

    return () => {
      lenis.destroy();
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: mainRef.current,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      if (isManualScroll.current) return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const newId = entry.target.id;
          setActiveSection((prev) => {
            if (prev !== newId) {
              setPrevActiveSection(prev);
              return newId;
            }
            return prev;
          });
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element && lenisRef.current) {
      isManualScroll.current = true;
      
      setPrevActiveSection(activeSection);
      setActiveSection(id);

      lenisRef.current.scrollTo(element, {
        duration: 2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isManualScroll.current = false;
        }
      });
    }
  };

  return (
    <div className="bg-background text-foreground flex flex-col font-sans">
      <Navbar 
        activeSection={activeSection} 
        prevActiveSection={prevActiveSection} 
        scrollToSection={scrollToSection} 
      />
      <ScrollIndicator 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
      
      {/* Main Container - Controlled by Lenis */}
      <main ref={mainRef} className="h-screen overflow-hidden relative no-scrollbar">
        <div ref={contentRef} className="w-full flex flex-col">
          <div id="home" className="min-h-screen w-full flex flex-col"><Home /></div>
          <div id="project" className="min-h-screen w-full flex flex-col"><Project /></div>
          <div id="resume" className="min-h-screen w-full flex flex-col"><Resume /></div>
          <div id="experience" className="min-h-screen w-full flex flex-col"><Experience /></div>
          <div id="education" className="min-h-screen w-full flex flex-col"><Education /></div>
          <div id="skills" className="min-h-screen w-full flex flex-col"><Skills /></div>
          <div id="achievement" className="min-h-screen w-full flex flex-col"><Achievement /></div>
          <div id="contact" className="min-h-screen w-full flex flex-col"><Contact /></div>
        </div>
      </main>
    </div>
  );
}

export default App;
