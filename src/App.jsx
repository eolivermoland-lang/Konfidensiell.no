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

// Accessibility Helper: Scroll to top and Dynamic Page Titles
const PageManager = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Dynamic Titles for Accessibility
    const pageTitles = {
      '/': 'Home — CodeNext IT Solutions',
      '/about': 'About Us — CodeNext',
      '/services': 'Our Services — CodeNext',
      '/tools': 'Developer Tools — CodeNext',
      '/contact': 'Contact Us — CodeNext',
    };
    
    // Handle dynamic service routes
    if (pathname.startsWith('/services/')) {
      document.title = 'Service Details — CodeNext';
    } else {
      document.title = pageTitles[pathname] || 'CodeNext IT Solutions';
    }
  }, [pathname]);
  
  return null;
};

function App() {
  return (
    <Router>
      <PageManager />
      
      {/* 5. Primary Skip Link for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-blue-600 focus:text-white focus:rounded-xl focus:font-bold"
      >
        Skip to main content
      </a>

      <div className='relative min-h-screen text-white overflow-x-hidden selection:bg-blue-500/30'>
        <AnimatedBackground />
        <Navbar />
        
        <main id="main-content" className='pt-20' tabIndex="-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<div className="py-10"><About /></div>} />
            <Route path="/services" element={<div className="py-10"><Services /></div>} />
            <Route path="/services/:serviceId" element={<div className="py-10"><ServiceDetail /></div>} />
            <Route path="/tools" element={<div className="py-10"><Tools /></div>} />
            <Route path="/contact" element={<div className="py-10"><Contact /></div>} />
          </Routes>
        </main>

        <Chatbot />
        
        <footer className='bg-transparent border-t border-slate-900/50 py-16 text-center backdrop-blur-sm'>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
               <div className="flex items-center gap-2">
                  <img src="/logo.png" alt="CodeNext Logo" className="w-8 h-8 object-contain" />
                  <span className="font-black text-2xl">CODE<span className="text-blue-500">NEXT</span></span>
               </div>
               <nav aria-label="Footer Navigation">
                 <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
                    <a href="/about" className="hover:text-white transition-colors">About</a>
                    <a href="/services" className="hover:text-white transition-colors">Services</a>
                    <a href="/contact" className="hover:text-white transition-colors">Privacy</a>
                    <a href="/contact" className="hover:text-white transition-colors">Terms</a>
                 </div>
               </nav>
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
