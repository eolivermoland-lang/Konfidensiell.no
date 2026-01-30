import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className='relative h-[95vh] flex items-center justify-center overflow-hidden'>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px]" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -60, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px]" 
        />
      </div>

      <div className='text-center px-4 sm:px-6 lg:px-8 z-10'>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
        >
          <Terminal size={14} /> The Future of Development is Here
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9]'>
            FROM IDEA TO<br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-[length:200%_auto] animate-gradient'>
              PERFECTION.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mt-4 max-w-2xl mx-auto text-xl md:text-2xl text-gray-400 font-medium'
        >
          Premium Norwegian IT services. We craft digital experiences that don't just work—they inspire.
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mt-12 flex flex-wrap justify-center gap-6'
        >
          <Link to='/contact' className='group relative flex items-center gap-2 px-10 py-5 bg-white text-slate-900 font-black text-lg rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-2xl shadow-white/5 active:scale-95'>
            Start Your Journey <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to='/services' className='px-10 py-5 bg-slate-900/50 backdrop-blur-md border border-slate-700 text-white font-black text-lg rounded-2xl hover:bg-slate-800 transition-all active:scale-95'>
            View Our Work
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 flex justify-center items-center gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all"
        >
           <span className="text-white font-bold tracking-widest text-sm uppercase">Innovation</span>
           <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
           <span className="text-white font-bold tracking-widest text-sm uppercase">Precision</span>
           <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
           <span className="text-white font-bold tracking-widest text-sm uppercase">Results</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
