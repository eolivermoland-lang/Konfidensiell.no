import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Tools = lazy(() => import('./components/Tools'));
const Contact = lazy(() => import('./components/Contact'));

// Loading fallback component
const PageLoader = () => (
  <div className="h-screen w-full flex items-center justify-center bg-transparent">
    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const PageManager = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const pageTitles = {
      '/': 'Home — Konfidensiell IT Solutions',
      '/about': 'About Us — Konfidensiell',
      '/services': 'Our Services — Konfidensiell',
      '/tools': 'Developer Tools — Konfidensiell',
      '/contact': 'Contact Us — Konfidensiell',
    };
    if (pathname.startsWith('/services/')) {
      document.title = 'Service Details — Konfidensiell';
    } else {
      document.title = pageTitles[pathname] || 'Konfidensiell IT Solutions';
    }
  }, [pathname]);
  return null;
};

const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function App() {
  return (
    <Router>
      <PageManager />
      
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
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<div className="py-10"><About /></div>} />
              <Route path="/services" element={<div className="py-10"><Services /></div>} />
              <Route path="/services/:serviceId" element={<div className="py-10"><ServiceDetail /></div>} />
              <Route path="/tools" element={<div className="py-10"><Tools /></div>} />
              <Route path="/contact" element={<div className="py-10"><Contact /></div>} />
              
              {/* HIDDEN ADMIN ROUTES */}
              <Route path="/hasfhhw335ADMIN" element={<AdminLogin />} />
              <Route path="/admin-dashboard-private" element={<AdminDashboard />} />
            </Routes>
          </Suspense>
        </main>

        <Chatbot />
        
        <footer className='bg-transparent border-t border-slate-900/50 py-16 text-center backdrop-blur-sm'>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
               <div className="flex items-center gap-2">
                  <img src="/logo.webp" alt="Konfidensiell Logo" width="32" height="32" className="w-8 h-8 object-contain" />
                  <span className="font-black text-2xl uppercase tracking-tighter">KONFIDE<span className="text-blue-500">NSIELL</span></span>
               </div>
               <nav aria-label="Footer Navigation">
                 <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
                    <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                    <Link to="/contact" className="hover:text-white transition-colors">Privacy</Link>
                    <Link to="/contact" className="hover:text-white transition-colors">Terms</Link>
                 </div>
               </nav>
            </div>
            <p className='text-gray-600 text-sm'>
              &copy; {new Date().getFullYear()} Konfidensiell. All rights reserved. <br />
              <span className="mt-2 block italic text-gray-700 font-medium tracking-tighter uppercase">Crafted with Perfection in Norway 🇳🇴</span>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;