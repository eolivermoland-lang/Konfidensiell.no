import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../store/LanguageContext';
import { translations } from '../data/translations';

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className='relative h-[95vh] flex items-center justify-center overflow-hidden'>
      
      <div className='text-center px-4 sm:px-6 lg:px-8 z-10'>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
        >
          <Terminal size={14} /> {language === 'en' ? 'The Future of Development is Here' : 'Fremtidens utvikling er her'}
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className='text-4xl sm:text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] break-words'>
            {t.hero.title}<br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-[length:200%_auto] animate-gradient'>
              {t.hero.subtitle}.
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mt-4 max-w-2xl mx-auto text-lg md:text-2xl text-gray-400 font-medium px-4'
        >
          {t.hero.description}
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6'
        >
          <Link to='/contact' className='w-full sm:w-auto group relative flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-5 bg-white text-slate-900 font-black text-base sm:text-lg rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-2xl active:scale-95'>
            {language === 'en' ? 'Start Your Journey' : 'Start Reisen Din'} <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to='/services' className='w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-slate-900/50 backdrop-blur-md border border-slate-700 text-white font-black text-base sm:text-lg rounded-2xl hover:bg-slate-800 transition-all active:scale-95 text-center'>
            {language === 'en' ? 'View Our Work' : 'Se Våre Prosjekter'}
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 flex justify-center items-center gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all"
        >
           <span className="text-white font-bold tracking-widest text-sm uppercase">{language === 'en' ? 'Innovation' : 'Innovasjon'}</span>
           <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
           <span className="text-white font-bold tracking-widest text-sm uppercase">{language === 'en' ? 'Precision' : 'Presisjon'}</span>
           <div className="w-1 h-1 bg-slate-700 rounded-full"></div>
           <span className="text-white font-bold tracking-widest text-sm uppercase">{language === 'en' ? 'Results' : 'Resultater'}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;