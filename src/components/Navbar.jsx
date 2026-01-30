import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Tools', href: '/tools' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className='fixed top-0 left-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          
          {/* Logo Section */}
          <Link to='/' className='flex items-center gap-3 group'>
            <div className='w-10 h-10 transition-transform group-hover:rotate-12 duration-300'>
              <img src='/logo.svg' alt='CodeNext Logo' className='w-full h-full' />
            </div>
            <span className='font-black text-2xl tracking-tighter text-white'>
              CODE<span className='text-blue-500'>NEXT</span>
            </span>
          </Link>
          
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
                Contact
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className='text-gray-400 hover:text-white p-2 transition-colors'
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
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