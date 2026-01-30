import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './components/About';
import Services from './components/Services';
import ServiceDetail from './pages/ServiceDetail';
import Tools from './components/Tools';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';

// Helper to scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className='relative min-h-screen text-white overflow-x-hidden selection:bg-blue-500/30'>
        <AnimatedBackground />
        <Navbar />
        
        <div className='pt-20'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div className="py-10"><About /></div>} />
            <Route path="/services" element={<div className="py-10"><Services /></div>} />
            <Route path="/services/:serviceId" element={<div className="py-10"><ServiceDetail /></div>} />
            <Route path="/tools" element={<div className="py-10"><Tools /></div>} />
            <Route path="/contact" element={<div className="py-10"><Contact /></div>} />
          </Routes>
        </div>

        <Chatbot />
        
        <footer className='bg-transparent border-t border-slate-900/50 py-16 text-center backdrop-blur-sm'>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
               <div className="flex items-center gap-2">
                  <img src="/logo.svg" alt="CodeNext" className="w-8 h-8" />
                  <span className="font-black text-2xl">CODE<span className="text-blue-500">NEXT</span></span>
               </div>
               <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
                  <a href="/about" className="hover:text-white transition-colors">About</a>
                  <a href="/services" className="hover:text-white transition-colors">Services</a>
                  <a href="/contact" className="hover:text-white transition-colors">Privacy</a>
                  <a href="/contact" className="hover:text-white transition-colors">Terms</a>
               </div>
            </div>
            <p className='text-gray-600 text-sm'>
              &copy; {new Date().getFullYear()} CodeNext. All rights reserved. <br />
              <span className="mt-2 block italic text-gray-700 font-medium tracking-tighter uppercase">Crafted with Perfection in Norway 🇳🇴</span>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;