import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import { useLanguage } from './store/LanguageContext';

// Critical UI components
const AnimatedBackground = lazy(() => import('./components/AnimatedBackground'));
const Chatbot = lazy(() => import('./components/Chatbot'));

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
    <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const PageManager = () => {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const content = {
      en: {
        '/': { title: 'Konfidensiell — Premium IT Help & Website Development Norway', desc: 'Expert IT help, professional website development, and secure digital infrastructure for businesses and startups.' },
        '/about': { title: 'About Us — Konfidensiell IT Solutions', desc: 'Learn about Konfidensiell, a Norwegian powerhouse of innovation specializing in secure and scalable software.' },
        '/services': { title: 'Our Services — IT Consulting & Web Development', desc: 'Comprehensive IT services including web optimization, security solutions, and startup tech support in Norway.' },
        '/tools': { title: 'Developer Tools — Free Technical Assets', desc: 'Free online tools for network verification, secure password generation, and infrastructure planning.' },
        '/contact': { title: 'Contact Us — Book a Free IT Strategy Session', desc: 'Get in touch with our expert engineers for professional IT help and custom website development projects.' },
      },
      no: {
        '/': { title: 'Konfidensiell — IT Hjelp & Utvikling av Nettsider i Norge', desc: 'Ekspert IT-hjelp, profesjonell utvikling av nettsider og sikker digital infrastruktur for bedrifter og startups.' },
        '/about': { title: 'Om Oss — Konfidensiell IT-løsninger', desc: 'Lær mer om Konfidensiell, et norsk kraftsenter for innovasjon spesialisert på sikker og skalerbar programvare.' },
        '/services': { title: 'Våre Tjenester — IT-rådgivning & Webutvikling', desc: 'Omfattende IT-tjenester inkludert web-optimalisering, sikkerhetsløsninger og teknisk støtte for startups.' },
        '/tools': { title: 'Verktøy — Gratis Tekniske Ressurser', desc: 'Gratis online verktøy for nettverksverifisering, sikker passordgenerering og infrastrukturplanlegging.' },
        '/contact': { title: 'Kontakt Oss — Bestill Gratis IT-Strategisamtale', desc: 'Kontakt våre eksperter for profesjonell IT-hjelp og skreddersydde prosjekter for utvikling av nettsider.' },
      }
    };

    const current = content[language][pathname] || content[language]['/'];
    
    if (pathname.startsWith('/services/')) {
      document.title = language === 'en' ? 'Service Details — Konfidensiell' : 'Tjenestedetaljer — Konfidensiell';
    } else {
      document.title = current.title;
    }

    // Update Meta Description dynamically
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', current.desc);

    // Update HTML lang attribute
    document.documentElement.lang = language;
  }, [pathname, language]);
  
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-emerald-600 focus:text-white focus:rounded-xl focus:font-bold"
      >
        Skip to main content
      </a>

      <div className='relative min-h-screen text-white overflow-x-hidden selection:bg-emerald-500/30'>
        <Suspense fallback={<div className="fixed inset-0 bg-[#050a1f]" />}>
          <AnimatedBackground />
        </Suspense>
        
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

        <Suspense fallback={null}>
          <Chatbot />
        </Suspense>
        
        <footer className='bg-transparent border-t border-slate-900/50 py-16 text-center backdrop-blur-sm'>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
               <div className="flex items-center gap-2">
                  <img src="/logo.webp" alt="Konfidensiell Logo" width="32" height="32" className="w-8 h-8 object-contain" />
                  <span className="font-black text-2xl uppercase tracking-tighter">KONFIDE<span className="text-emerald-500">NSIELL</span></span>
               </div>
               <nav aria-label="Footer Navigation">
                 <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-slate-500">
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