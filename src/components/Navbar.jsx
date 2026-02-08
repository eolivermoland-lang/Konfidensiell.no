import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../store/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();

  const links = [
    { name: language === 'en' ? 'Home' : 'Hjem', href: '/' },
    { name: language === 'en' ? 'About' : 'Om Oss', href: '/about' },
    { name: language === 'en' ? 'Services' : 'Tjenester', href: '/services' },
    { name: language === 'en' ? 'Tools' : 'Verktøy', href: '/tools' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800' aria-label="Main Navigation">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          
          {/* Logo Section */}
          <div className='flex items-center gap-6'>
            <Link to='/' className='flex items-center gap-3 group' aria-label="CodeNext Home">
              <div className='w-10 h-10 transition-transform group-hover:rotate-12 duration-300'>
                <img 
                  src='/logo.webp' 
                  alt='' 
                  width="40" 
                  height="40" 
                  fetchpriority="high"
                  loading="eager"
                  className='w-full h-full object-contain' 
                />
              </div>
              <span className='font-black text-2xl tracking-tighter text-white'>
                CODE<span className='text-blue-500'>NEXT</span>
              </span>
            </Link>

            {/* Language Switcher - Left Aligned */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-all text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white group overflow-hidden relative min-w-[60px]"
            >
              <Globe size={14} className="text-blue-500 group-hover:rotate-12 transition-transform" />
              <div className="relative h-4 w-6">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={language}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {language === 'en' ? 'EN' : 'NO'}
                  </motion.span>
                </AnimatePresence>
              </div>
            </button>
          </div>
          
          {/* Desktop Menu */}
          <div className='hidden md:block'>
            <div className='ml-10 flex items-center space-x-6'>
              {links.map((link) => (
                <Link 
                  key={link.name}
                  to={link.href} 
                  className={`px-2 py-1 text-sm font-bold uppercase tracking-widest transition-all hover:text-blue-400 ${
                    isActive(link.href) ? 'text-blue-400' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link to='/contact' className='ml-4 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-blue-600/20 active:scale-95'>
                {language === 'en' ? 'Contact' : 'Kontakt'}
              </Link>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className='md:hidden flex items-center gap-4'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-400 hover:text-white p-2 transition-colors'
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={28} aria-hidden="true" /> : <Menu size={28} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className='md:hidden bg-slate-900 border-b border-slate-800 overflow-hidden'
          >
            <div className='px-4 pt-4 pb-8 space-y-4'>
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-xl font-bold ${
                    isActive(link.href) ? 'text-blue-400' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to='/contact'
                onClick={() => setIsOpen(false)}
                className='block w-full py-4 bg-blue-600 text-white text-center font-bold rounded-2xl'
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
