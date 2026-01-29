import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative h-[90vh] flex items-center justify-center'>
      <div className='text-center px-4 sm:px-6 lg:px-8 z-10'>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6'
        >
          Building Your Digital Future
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mt-4 max-w-2xl mx-auto text-xl text-gray-300'
        >
          From concept to code. We deliver professional, clean, and modern websites and applications tailored to your business needs.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mt-10 flex flex-wrap justify-center gap-4'
        >
          <Link to='/contact' className='flex items-center gap-2 px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10 transition-all'>
            Get Started <ArrowRight size={20} />
          </Link>
          <Link to='/services' className='px-8 py-3 border border-gray-500 text-base font-medium rounded-md text-gray-300 hover:text-white hover:border-white md:py-4 md:text-lg md:px-10 transition-all'>
            Our Services
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;