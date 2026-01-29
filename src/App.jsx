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
      <div className='relative min-h-screen text-white overflow-x-hidden'>
        <AnimatedBackground />
        <Navbar />
        
        <div className='pt-16'> {/* Spacer for fixed navbar */}
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
        
        <footer className='bg-slate-900 border-t border-slate-800 py-8 text-center text-gray-500 text-sm'>
          <p>&copy; {new Date().getFullYear()} CodeNext. All rights reserved. | Based in Norway 🇳🇴</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;