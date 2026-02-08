import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../store/LanguageContext';
import { translations } from '../data/translations';

const WavyText = ({ text, className }) => {
  const letters = Array.from(text);
  
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: [0, -10, 0],
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        repeat: Infinity,
        duration: 3,
      },
    },
    hidden: {
      opacity: 0,
      y: 0,
    },
  };

  return (
    <motion.div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span 
          variants={child} 
          key={index} 
          style={{ display: "inline-block", whiteSpace: "pre" }}
          transition={{
            repeat: Infinity,
            duration: 3,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
          animate={{
            y: [0, -8, 0],
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className='relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20'>
      
      <div className='text-center px-6 sm:px-10 lg:px-8 z-10 w-full max-w-5xl mx-auto'>
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md text-emerald-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] mb-8 shadow-2xl"
        >
          <Terminal size={14} /> {language === 'en' ? 'The Future of Development is Here' : 'Fremtidens utvikling er her'}
        </motion.div>

        {/* Wavy Title */}
        <div className="mb-6 sm:mb-8">
          <WavyText 
            text={t.hero.title} 
            className="text-[2.75rem] leading-[1.05] sm:text-7xl md:text-8xl font-black text-white tracking-tighter" 
          />
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-[2.75rem] leading-[1.05] sm:text-7xl md:text-8xl font-black tracking-tighter mt-2'
          >
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-500 bg-[length:200%_auto] animate-gradient block'>
              {t.hero.subtitle}.
            </span>
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='mt-4 max-w-2xl mx-auto text-base sm:text-lg md:text-2xl text-slate-300 font-medium px-2'
        >
          {t.hero.description}
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className='mt-10 sm:mt-12 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6'
        >
          <Link to='/contact' className='w-full sm:w-auto group relative flex items-center justify-center gap-2 px-8 py-4 sm:px-10 sm:py-5 bg-emerald-500 text-slate-900 font-black text-base sm:text-lg rounded-2xl hover:bg-emerald-400 transition-all duration-300 shadow-2xl active:scale-95'>
            {language === 'en' ? 'Start Your Journey' : 'Start Reisen Din'} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to='/services' className='w-full sm:w-auto px-8 py-4 sm:px-10 sm:py-5 bg-slate-800/40 backdrop-blur-md border border-white/5 text-white font-black text-base sm:text-lg rounded-2xl hover:bg-slate-700 transition-all active:scale-95 text-center'>
            {language === 'en' ? 'View Our Work' : 'Se Våre Prosjekter'}
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 sm:mt-24 flex justify-center items-center gap-4 sm:gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all overflow-hidden"
        >
           <span className="text-white font-bold tracking-widest text-[10px] sm:text-sm uppercase">{language === 'en' ? 'Innovation' : 'Innovasjon'}</span>
           <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></div>
           <span className="text-white font-bold tracking-widest text-[10px] sm:text-sm uppercase">{language === 'en' ? 'Precision' : 'Presisjon'}</span>
           <div className="w-1 h-1 bg-emerald-500 rounded-full flex-shrink-0"></div>
           <span className="text-white font-bold tracking-widest text-[10px] sm:text-sm uppercase">{language === 'en' ? 'Results' : 'Resultater'}</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;