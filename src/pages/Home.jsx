import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Shield, Search, Lightbulb, Rocket, Settings, CheckCircle, Target, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const processSteps = [
    { icon: <Search />, title: 'Discovery', desc: 'We dive deep into your business needs and project goals to build a rock-solid foundation.' },
    { icon: <Lightbulb />, title: 'Concept', desc: 'Turning ideas into interactive wireframes and stunning UI designs for your approval.' },
    { icon: <Settings />, title: 'Development', desc: 'Our Norwegian engineers write clean, scalable code using the latest tech stacks.' },
    { icon: <Rocket />, title: 'Launch', desc: 'Rigorous testing followed by a seamless deployment to your chosen environment.' }
  ];

  const manifestoPoints = [
    { title: "No Legacy Baggage", desc: "We are new. We don't use 10-year-old tech. We use what's fast, secure, and modern today." },
    { title: "Founder-Led Projects", desc: "Because we are growing, you work directly with our lead developers, not junior account managers." },
    { title: "Scandinavian Precision", desc: "Built in Norway, our code follows a culture of transparency, honesty, and extreme quality." }
  ];

  return (
    <div>
      <Hero />
      
      {/* Manifesto Section - High Impact */}
      <section className="py-24 border-y border-white/5 glass-panel">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-blue-500 font-black uppercase tracking-[0.4em] text-xs mb-12"
          >
            Our Manifesto
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {manifestoPoints.map((point, idx) => (
              <motion.div key={idx} className="text-center">
                <h3 className="text-2xl font-black text-white mb-4 tracking-tighter uppercase">{point.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{point.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Intro Section - Very Transparent */}
      <section className='py-32 bg-transparent'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-24 items-center'>
            <motion.div>
              <h2 className='text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter leading-tight'>
                A NEW ERA OF <br />
                <span className="text-blue-500 uppercase">DIGITAL.</span>
              </h2>
              <p className='text-gray-400 text-xl mb-10 leading-relaxed'>
                We are a fresh, hungry agency dedicated to perfection. We don't have thousands of clients—and that's your advantage. You get 100% of our focus and the highest level of craftsmanship.
              </p>
              <div className="space-y-4 mb-10">
                {['Direct access to developers', 'Cutting-edge tech stack only', 'Total transparency & honesty'].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-200 font-bold">
                    <CheckCircle className="text-blue-500" size={20} /> {item}
                  </div>
                ))}
              </div>
              <Link to='/services' className='inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl transition-all shadow-xl'>
                See Our Solutions <ArrowRight size={20} />
              </Link>
            </motion.div>
            
            <div className='grid grid-cols-2 gap-6'>
              <div className='glass-card p-10 rounded-[2.5rem]'>
                <Target className='mb-6 text-blue-500' size={48} />
                <h3 className='text-white font-black text-xl mb-4 uppercase tracking-tighter'>Outcome Driven</h3>
                <p className='text-gray-400 text-sm'>We focus on your ROI and business goals from day one.</p>
              </div>
              <div className='glass-card p-10 rounded-[2.5rem] mt-12'>
                <UserCheck className='mb-6 text-purple-500' size={48} />
                <h3 className='text-white font-black text-xl mb-4 uppercase tracking-tighter'>Personalized</h3>
                <p className='text-gray-400 text-sm'>Tailor-made experiences, never copy-pasted templates.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - Focus on Clarity */}
      <section className='py-32 border-t border-white/5 glass-panel'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-24'>
            <h2 className='text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter'>How We Work</h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">Transparent and efficient from the first line of code to the final launch.</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-12'>
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className='text-center group'
              >
                <div className='w-24 h-24 bg-blue-600/10 border border-blue-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500'>
                  {React.cloneElement(step.icon, { size: 40 })}
                </div>
                <h3 className='text-2xl font-black text-white mb-4 uppercase tracking-tighter'>{step.title}</h3>
                <p className='text-gray-400 leading-relaxed'>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
