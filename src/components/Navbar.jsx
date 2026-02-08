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
    <nav className='fixed top-0 left-0 w-full z-50 bg-slate-900/40 backdrop-blur-md border-b border-white/5' aria-label="Main Navigation">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          
          {/* Logo Section - Absolute Left */}
          <div className='flex items-center gap-2 sm:gap-4'>
            <Link to='/' className='flex items-center gap-2 sm:gap-3 group' aria-label="Konfidensiell Home">
              <div className='w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:rotate-12 duration-300'>
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
              <span className='font-black text-xl sm:text-2xl tracking-tighter text-white uppercase'>
                KONFIDE<span className='text-emerald-500'>NSIELL</span>
              </span>
            </Link>

            {/* Language Switcher - Behind/Next to Logo */}
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-all text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-white group overflow-hidden relative min-w-[50px] sm:min-w-[60px]"
            >
              <Globe size={12} className="text-emerald-500 group-hover:rotate-12 transition-transform" />
              <div className="relative h-3 sm:h-4 w-4 sm:w-6">
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
                  className={`px-2 py-1 text-sm font-bold uppercase tracking-widest transition-all hover:text-emerald-400 ${
                    isActive(link.href) ? 'text-emerald-400' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <Link to='/contact' className='ml-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-widest rounded-full transition-all shadow-lg shadow-emerald-600/20 active:scale-95'>
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
