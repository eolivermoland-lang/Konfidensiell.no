import React from 'react';
import Hero from '../components/Hero';
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
            className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-12"
          >
            {t.manifesto.heading}
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {manifestoPoints.map((point, idx) => (
              <article key={idx} className="text-center">
                <h3 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase">{point.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{point.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className='py-32 bg-transparent' aria-labelledby="intro-heading">
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-24 items-center'>
            <motion.div>
              <h2 id="intro-heading" className='text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter leading-tight'>
                {t.home_intro.heading} <br />
                <span className="text-blue-500 uppercase">{t.home_intro.subheading}</span>
              </h2>
              <p className='text-gray-400 text-xl mb-10 leading-relaxed'>
                {t.home_intro.desc}
              </p>
              <div className="space-y-4 mb-10" role="list">
                {[t.home_intro.point1, t.home_intro.point2, t.home_intro.point3].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-200 font-bold" role="listitem">
                    <CheckCircle className="text-blue-500" size={20} aria-hidden="true" /> {item}
                  </div>
                ))}
              </div>
              <Link to='/services' className='inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl'>
                {t.home_intro.cta} <ArrowRight size={20} aria-hidden="true" />
              </Link>
            </motion.div>
            
            <div className='flex items-stretch gap-6'>
              <article className='glass-card p-10 rounded-[2.5rem] flex-1 flex flex-col m-0'>
                <Target className='mb-6 text-blue-500' size={48} aria-hidden="true" />
                <h3 className='text-white font-black text-xl mb-4 uppercase tracking-tighter'>{t.home_intro.card1_title}</h3>
                <p className='text-gray-400 text-sm'>{t.home_intro.card1_desc}</p>
              </article>
              <article className='glass-card p-10 rounded-[2.5rem] flex-1 flex flex-col m-0'>
                <UserCheck className='mb-6 text-purple-500' size={48} aria-hidden="true" />
                <h3 className='text-white font-black text-xl mb-4 uppercase tracking-tighter'>{t.home_intro.card2_title}</h3>
                <p className='text-gray-400 text-sm'>{t.home_intro.card2_desc}</p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className='py-32 border-t border-white/5 glass-panel' aria-labelledby="process-heading">
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-24'>
            <h2 id="process-heading" className='text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter'>{t.process.heading}</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">{t.process.subheading}</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
            {processSteps.map((step, index) => (
              <article key={index} className='text-center group'>
                <div className='w-24 h-24 bg-blue-600/10 border border-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500'>
                  {React.cloneElement(step.icon, { size: 40, "aria-hidden": "true" })}
                </div>
                <h3 className='text-2xl font-black text-white mb-4 uppercase tracking-tighter'>{step.title}</h3>
                <p className='text-gray-400 leading-relaxed'>{step.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;