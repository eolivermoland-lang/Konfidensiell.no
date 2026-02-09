import React from 'react';
import Hero from '../components/Hero';
import Pricing from '../components/Pricing';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Shield, Search, Lightbulb, Rocket, Settings, CheckCircle, Target, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../store/LanguageContext';
import { translations } from '../data/translations';

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];

  const processSteps = [
    { icon: <Search aria-hidden="true" />, title: t.process.step1_title, desc: t.process.step1_desc },
    { icon: <Lightbulb aria-hidden="true" />, title: t.process.step2_title, desc: t.process.step2_desc },
    { icon: <Settings aria-hidden="true" />, title: t.process.step3_title, desc: t.process.step3_desc },
    { icon: <Rocket aria-hidden="true" />, title: t.process.step4_title, desc: t.process.step4_desc }
  ];

  const manifestoPoints = [
    { title: t.manifesto.point1_title, desc: t.manifesto.point1_desc },
    { title: t.manifesto.point2_title, desc: t.manifesto.point2_desc },
    { title: t.manifesto.point3_title, desc: t.manifesto.point3_desc }
  ];

  return (
    <div className="space-y-0">
      <Hero />
      
      {/* Manifesto Section */}
      <section className="py-24 border-y border-white/5 glass-panel" aria-labelledby="manifesto-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            id="manifesto-heading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs mb-12"
          >
            {t.manifesto.heading}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {manifestoPoints.map((point, idx) => (
              <article key={idx} className="text-center">
                <h3 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase">{point.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{point.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Intro Section */}
      <section className='py-20 sm:py-32 bg-transparent' aria-labelledby="intro-heading">
        <div className='max-w-7xl mx-auto px-6 sm:px-10 lg:px-8'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center'>
            <motion.div className="text-center lg:text-left">
              <h2 id="intro-heading" className='text-[2.25rem] leading-tight sm:text-4xl md:text-6xl font-black mb-6 text-white tracking-tighter'>
                {t.home_intro.heading} <br />
                <span className="text-emerald-500 uppercase">{t.home_intro.subheading}</span>
              </h2>
              <p className='text-slate-400 text-base sm:text-xl mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0'>
                {t.home_intro.desc}
              </p>
              <div className="space-y-3 mb-10 inline-block text-left w-full sm:w-auto" role="list">
                {[t.home_intro.point1, t.home_intro.point2, t.home_intro.point3].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-200 font-bold text-xs sm:text-base bg-white/5 sm:bg-transparent p-3 sm:p-0 rounded-xl" role="listitem">
                    <CheckCircle className="text-emerald-500 flex-shrink-0" size={18} aria-hidden="true" /> {item}
                  </div>
                ))}
              </div>
              <div className="flex justify-center lg:justify-start">
                <Link to='/services' className='w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-2xl transition-all shadow-xl text-sm sm:text-base'>
                  {t.home_intro.cta} <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
            
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full'>
              <article className='glass-card p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] flex flex-col justify-between h-full border border-white/5 hover:border-emerald-500/30 transition-colors'>
                <div>
                  <Target className='mb-4 sm:mb-6 text-emerald-500' size={32} sm={40} aria-hidden="true" />
                  <h3 className='text-white font-black text-base sm:text-xl mb-3 uppercase tracking-tighter'>{t.home_intro.card1_title}</h3>
                  <p className='text-slate-400 text-[11px] sm:text-sm leading-relaxed'>{t.home_intro.card1_desc}</p>
                </div>
              </article>
              <article className='glass-card p-6 sm:p-10 rounded-[1.5rem] sm:rounded-[2.5rem] flex flex-col justify-between h-full border border-white/5 hover:border-cyan-500/30 transition-colors'>
                <div>
                  <UserCheck className='mb-4 sm:mb-6 text-cyan-500' size={32} sm={40} aria-hidden="true" />
                  <h3 className='text-white font-black text-base sm:text-xl mb-3 uppercase tracking-tighter'>{t.home_intro.card2_title}</h3>
                  <p className='text-slate-400 text-[11px] sm:text-sm leading-relaxed'>{t.home_intro.card2_desc}</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-24 sm:py-32 border-t border-white/5 glass-panel' aria-labelledby="process-heading">
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16 sm:mb-24'>
            <h2 id="process-heading" className='text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter'>{t.process.heading}</h2>
            <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">{t.process.subheading}</p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12'>
            {processSteps.map((step, index) => (
              <article key={index} className='text-center group'>
                <div className='w-20 h-20 sm:w-24 sm:h-24 bg-emerald-600/10 border border-emerald-600/20 rounded-3xl flex items-center justify-center mx-auto mb-6 sm:mb-8 text-emerald-500 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500'>
                  {React.cloneElement(step.icon, { size: 32, "aria-hidden": "true" })}
                </div>
                <h3 className='text-xl sm:text-2xl font-black text-white mb-4 uppercase tracking-tighter'>{step.title}</h3>
                <p className='text-slate-400 leading-relaxed text-sm sm:text-base'>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;