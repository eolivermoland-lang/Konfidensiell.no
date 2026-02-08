import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Heart, Zap, Target, Eye, Users, Globe, Briefcase } from 'lucide-react';
import { useLanguage } from '../store/LanguageContext';
import { translations } from '../data/translations';

const About = () => {
  const { language } = useLanguage();
  const t = translations[language].about;

  return (
    <div className='pb-20'>
      <section id='about' className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16 sm:mb-20'>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter'
            >
              {t.heading}
            </motion.h2>
            <p className='mt-4 text-lg sm:text-2xl text-gray-400 max-w-3xl mx-auto font-medium px-4'>
              {t.subheading}
            </p>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center mb-24 sm:mb-32'>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center lg:text-left px-4 sm:px-0"
            >
              <h3 className='text-2xl sm:text-3xl font-black text-white mb-6 flex items-center justify-center lg:justify-start gap-3 uppercase tracking-tighter'>
                {t.story_title}
              </h3>
              <p className='text-gray-400 mb-6 text-base sm:text-lg leading-relaxed'>
                {t.story_p1}
              </p>
              <p className='text-gray-400 mb-6 text-base sm:text-lg leading-relaxed'>
                {t.story_p2}
              </p>
              <div className='glass-panel p-6 rounded-2xl border-l-4 border-l-blue-600 italic text-gray-300 text-sm sm:text-base'>
                "{t.quote}"
              </div>
            </motion.div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 px-4 sm:px-0'>
              {[
                { icon: <Award className='w-6 h-6 sm:w-8 sm:h-8 text-blue-500' />, title: t.card1_title, desc: t.card1_desc },
                { icon: <ShieldCheck className='w-6 h-6 sm:w-8 sm:h-8 text-purple-500' />, title: t.card2_title, desc: t.card2_desc },
                { icon: <Briefcase className='w-6 h-6 sm:w-8 sm:h-8 text-green-500' />, title: t.card3_title, desc: t.card3_desc },
                { icon: <Zap className='w-6 h-6 sm:w-8 sm:h-8 text-yellow-500' />, title: t.card4_title, desc: t.card4_desc }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='glass-card p-6 sm:p-8 rounded-[1.5rem] sm:rounded-3xl border border-white/5 hover:border-blue-500/30 transition-all'
                >
                  <div className='mb-4'>{item.icon}</div>
                  <h4 className='font-black text-lg sm:text-xl text-white mb-2 uppercase tracking-tighter'>{item.title}</h4>
                  <p className='text-gray-400 text-xs sm:text-sm leading-relaxed'>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission and Vision */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0'>
             <motion.div 
               whileHover={{ y: -10 }}
               className='glass-panel p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5'
             >
                <Target className='text-blue-500 mb-6' size={40} />
                <h3 className='text-xl sm:text-2xl font-black text-white mb-4 uppercase tracking-tighter'>{t.mission_title}</h3>
                <p className='text-gray-400 leading-relaxed text-xs sm:text-sm'>
                  {t.mission_desc}
                </p>
             </motion.div>

             <motion.div 
               whileHover={{ y: -10 }}
               className='glass-panel p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5'
             >
                <Eye className='text-purple-500 mb-6' size={40} />
                <h3 className='text-xl sm:text-2xl font-black text-white mb-4 uppercase tracking-tighter'>{t.vision_title}</h3>
                <p className='text-gray-400 leading-relaxed text-xs sm:text-sm'>
                  {t.vision_desc}
                </p>
             </motion.div>

             <motion.div 
               whileHover={{ y: -10 }}
               className='glass-panel p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5'
             >
                <Users className='text-green-500 mb-6' size={40} />
                <h3 className='text-xl sm:text-2xl font-black text-white mb-4 uppercase tracking-tighter'>{t.team_title}</h3>
                <p className='text-gray-400 leading-relaxed text-xs sm:text-sm'>
                  {t.team_desc}
                </p>
             </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;