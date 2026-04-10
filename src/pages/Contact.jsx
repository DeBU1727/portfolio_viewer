import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import CustomAlert from '../components/CustomAlert';
import { Mail, Home } from 'lucide-react';
import API_BASE_URL from '../lib/api';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ isVisible: false, message: '', type: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setAlert({ ...alert, isVisible: false });

    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setAlert({
          isVisible: true,
          type: 'success',
          message: 'Thank you for reaching out! Your message has been sent successfully. I\'ll get back to you shortly.'
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to send message');
      }
    } catch (err) {
      console.error("Submission error:", err);
      setAlert({
        isVisible: true,
        type: 'error',
        message: err.message || 'Something went wrong while sending your message. Please try again later.'
      });
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  return (
    <PageTransition className="flex flex-col items-center justify-start text-center min-h-[calc(100vh-8rem)] pt-12 relative pb-40">
      <CustomAlert
        isVisible={alert.isVisible}
        type={alert.type}
        message={alert.message}
        onClose={() => setAlert({ ...alert, isVisible: false })}
      />

      <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tighter uppercase mt-12">LET'S TALK</h1>
      <p className="text-neutral-400 mb-16 max-w-2xl text-lg md:text-xl font-light">
        Have a project in mind? Let's collaborate to bring our ideas to life in a way that resonates with everyone. Fill out the form below and I'll get back to you shortly.
      </p>

      {/* Modern Contact Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-4xl flex flex-col space-y-12 text-left z-10 bg-background/50 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-neutral-800 shadow-2xl relative">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col relative group">
            <label className="text-[10px] text-neutral-500 mb-2 transition-all group-focus-within:text-foreground uppercase tracking-[0.2em] font-bold">What's you name ?</label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="John Doe *"
              className="bg-transparent border-b border-neutral-800 py-4 text-lg focus:outline-none focus:border-white transition-all placeholder:text-neutral-700 font-light text-white appearance-none autofill:bg-transparent"
            />
          </div>
          <div className="flex flex-col relative group">
            <label className="text-[10px] text-neutral-500 mb-2 transition-all group-focus-within:text-foreground uppercase tracking-[0.2em] font-bold">What's your email?</label>
            <input
              required
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="john@doe.com *"
              className="bg-transparent border-b border-neutral-800 py-4 text-lg focus:outline-none focus:border-white transition-all placeholder:text-neutral-700 font-light text-white appearance-none autofill:bg-transparent"
            />
          </div>
        </div>

        <div className="flex flex-col relative group">
          <label className="text-[10px] text-neutral-500 mb-2 transition-all group-focus-within:text-foreground uppercase tracking-[0.2em] font-bold">your message</label>
          <textarea
            required
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            placeholder="Hello, I would like to collab... *"
            className="bg-transparent border-b border-neutral-800 py-4 text-lg focus:outline-none focus:border-white transition-all resize-none placeholder:text-neutral-700 font-light text-white appearance-none"
          ></textarea>
        </div>

        <div className="flex justify-end pt-8">
          <button
            type="submit"
            disabled={loading}
            className={`pill-button pill-dark shadow-2xl flex items-center space-x-3 text-sm uppercase tracking-widest px-12 py-6 w-full md:w-auto justify-center transition-all ${loading ? 'opacity-50 cursor-wait' : 'hover:-translate-y-1'}`}
          >
            <span className="font-bold">{loading ? 'Sending...' : 'Send Message'}</span>
            {!loading && (
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            )}
          </button>
        </div>
      </form>

      {/* Social Footer */}
      <div className="w-full flex inset-x-0 bottom-0 pt-24 justify-center items-center gap-4 flex-wrap z-0">
        <a
          href="mailto:gdebanshu1727@gmail.com"
          className="flex items-center space-x-3 pill-button border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-100 hover:text-black text-white text-sm px-6 py-2 transition-all duration-300 group rounded-full"
        >
          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center p-1 px-1.5 transition-all text-white group-hover:bg-black group-hover:text-white">
            <Mail className="w-full h-full" />
          </div>
          <span className="font-semibold text-[10px] tracking-widest lowercase">gdebanshu1727@gmail.com</span>
        </a>
        <a
          href="https://www.linkedin.com/in/debanshu-g"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-button border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-100 hover:text-black text-white text-sm px-6 py-2 transition-all duration-300 flex items-center space-x-3 group rounded-full"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg" alt="LinkedIn" className="w-4 h-4 object-contain" />
          </div>
          <span>LinkedIn</span>
        </a>
        <a
          href="https://github.com/DeBU1727"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-button border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-100 hover:text-black text-white text-sm px-6 py-2 transition-all duration-300 flex items-center space-x-3 group rounded-full"
        >
          <div className="w-5 h-5 rounded-full overflow-hidden bg-white flex items-center justify-center transition-all opacity-80 group-hover:opacity-100">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" alt="GitHub" className="w-4 h-4 grayscale group-hover:grayscale-0" />
          </div>
          <span>GitHub</span>
        </a>
      </div>
    </PageTransition>
  );
}
