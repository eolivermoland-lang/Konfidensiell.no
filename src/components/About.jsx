import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Heart, Zap, Target, Eye, Users, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className='pb-20'>
      <section id='about' className='py-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-20'>
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-4xl md:text-6xl font-extrabold text-white mb-6'
            >
              Who is CodeNext?
            </motion.h2>
            <p className='mt-4 text-2xl text-gray-400 max-w-3xl mx-auto'>
              A Norwegian powerhouse of <span className='text-blue-400 font-bold'>innovation</span>, built on the pillars of quality and Scandinavian precision.
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-32'>
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className='text-3xl font-bold text-white mb-6 flex items-center gap-3'>
                Our Story 🇳🇴
              </h3>
              <p className='text-gray-300 mb-6 text-lg leading-relaxed'>
                Founded with a vision to redefine the digital landscape, CodeNext emerged from the need for high-quality, reliable, and beautiful software solutions in the Norwegian market. 
              </p>
              <p className='text-gray-300 mb-6 text-lg leading-relaxed'>
                Our journey started with a simple belief: <span className='text-white font-semibold'>Every idea deserves a perfect digital execution.</span> We saw too many businesses struggling with clunky systems and uninspired designs. We decided to be the change.
              </p>
              <div className='bg-slate-800/50 p-6 rounded-xl border-l-4 border-blue-600 italic text-gray-400'>
                "CodeNext is more than a name; it represents the next generation of code, design, and user experience."
              </div>
            </motion.div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
              {[
                { icon: <Award className='w-8 h-8 text-yellow-500' />, title: 'Premium Quality', desc: 'We write code that lasts, following industry best practices and rigorous standards.' },
                { icon: <ShieldCheck className='w-8 h-8 text-green-500' />, title: 'Extreme Security', desc: 'In a world of threats, we build fortresses. Your data security is our top priority.' },
                { icon: <Heart className='w-8 h-8 text-red-500' />, title: 'Client Centric', desc: 'Your success is our success. We work closely with you as a digital partner.' },
                { icon: <Zap className='w-8 h-8 text-purple-500' />, title: 'Modern Tech', desc: 'We stay at the bleeding edge, utilizing React, Node.js, and Cloudflare.' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-slate-800/30 p-8 rounded-2xl border border-slate-700 hover:bg-slate-800 transition-all hover:border-blue-500/50 hover:-translate-y-1'
                >
                  <div className='mb-4'>{item.icon}</div>
                  <h4 className='font-bold text-xl text-white mb-2'>{item.title}</h4>
                  <p className='text-gray-400 leading-relaxed'>{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mission and Vision */}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
             <motion.div 
               whileHover={{ y: -10 }}
               className='bg-gradient-to-br from-blue-900/40 to-slate-900 p-10 rounded-3xl border border-slate-700'
             >
                <Target className='text-blue-500 mb-6' size={48} />
                <h3 className='text-2xl font-bold text-white mb-4'>Our Mission</h3>
                <p className='text-gray-400 leading-relaxed'>
                  To empower businesses through high-end digital craftsmanship, turning complex problems into elegant, scalable solutions that drive growth.
                </p>
             </motion.div>

             <motion.div 
               whileHover={{ y: -10 }}
               className='bg-gradient-to-br from-purple-900/40 to-slate-900 p-10 rounded-3xl border border-slate-700'
             >
                <Eye className='text-purple-500 mb-6' size={48} />
                <h3 className='text-2xl font-bold text-white mb-4'>Our Vision</h3>
                <p className='text-gray-400 leading-relaxed'>
                  To be the leading choice for digital transformation in Scandinavia, known for our unwavering commitment to quality and innovation.
                </p>
             </motion.div>

             <motion.div 
               whileHover={{ y: -10 }}
               className='bg-gradient-to-br from-green-900/40 to-slate-900 p-10 rounded-3xl border border-slate-700'
             >
                <Users className='text-green-500 mb-6' size={48} />
                <h3 className='text-2xl font-bold text-white mb-4'>Our Team</h3>
                <p className='text-gray-400 leading-relaxed'>
                  A diverse group of passionate developers, designers, and strategists who eat, sleep, and breathe technology and design.
                </p>
             </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;