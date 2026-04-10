import React from 'react';

export default function PageTransition({ children, className = '' }) {
  return (
    <section 
      className={`w-full min-h-screen relative px-6 md:px-12 flex flex-col justify-center ${className}`}
    >
      {children}
    </section>
  );
}
