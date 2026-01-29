import React from 'react';
import Hero from '../components/Hero';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Zap, Shield, Search, Lightbulb, Rocket, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const processSteps = [
    { icon: <Search />, title: 'Discovery', desc: 'We dive deep into your business needs and project goals to build a rock-solid foundation.' },
    { icon: <Lightbulb />, title: 'Concept', desc: 'Turning ideas into interactive wireframes and stunning UI designs for your approval.' },
    { icon: <Settings />, title: 'Development', desc: 'Our Norwegian engineers write clean, scalable code using the latest tech stacks.' },
    { icon: <Rocket />, title: 'Launch', desc: 'Rigorous testing followed by a seamless deployment to your chosen environment.' }
  ];

  return (
    <div>
      <Hero />
      
      {/* Introduction Section */}
      <section className='py-24 bg-slate-900/50 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className='text-4xl font-bold mb-8 text-blue-400'>Next-Gen Digital Solutions</h2>
              <p className='text-gray-300 text-lg mb-6 leading-relaxed'>
                At <span className='text-white font-bold'>CodeNext</span>, we bridge the gap between complex ideas and functional reality. Based in the heart of Norway, we bring Scandinavian precision to every line of code we write.
              </p>
              <p className='text-gray-300 text-lg mb-8 leading-relaxed'>
                Whether you are a startup looking for your first MVP or an established firm needing a digital overhaul, our team is dedicated to delivering perfection. We don't just build websites; we build the engine that drives your business forward.
              </p>
              <Link to='/services' className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all'>
                Explore our services <ArrowRight size={20} />
              </Link>
            </motion.div>
            
            <div className='grid grid-cols-2 gap-6'>
              <div className='bg-slate-800/80 p-8 rounded-2xl border border-slate-700 text-center hover:border-blue-500 transition-colors group'>
                <Code className='mx-auto mb-4 text-blue-500 group-hover:scale-110 transition-transform' size={40} />
                <h3 className='text-white font-bold text-xl mb-2'>Clean Code</h3>
                <p className='text-gray-400 text-sm'>Maintainable, documented, and high-performance codebases.</p>
              </div>
              <div className='bg-slate-800/80 p-8 rounded-2xl border border-slate-700 text-center hover:border-yellow-500 transition-colors group'>
                <Zap className='mx-auto mb-4 text-yellow-500 group-hover:scale-110 transition-transform' size={40} />
                <h3 className='text-white font-bold text-xl mb-2'>Fast Delivery</h3>
                <p className='text-gray-400 text-sm'>Agile workflows ensuring your product hits the market quickly.</p>
              </div>
              <div className='bg-slate-800/80 p-8 rounded-2xl border border-slate-700 text-center col-span-2 hover:border-green-500 transition-colors group'>
                <Shield className='mx-auto mb-4 text-green-500 group-hover:scale-110 transition-transform' size={40} />
                <h3 className='text-white font-bold text-xl mb-2'>Secure by Design</h3>
                <p className='text-gray-400 text-sm'>Enterprise-grade security protocols protecting your data and users.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className='py-24 border-t border-slate-800'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-5xl font-bold text-white mb-4'>Our Development Process</h2>
            <div className='w-20 h-1 bg-blue-600 mx-auto'></div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className='relative p-6 text-center'
              >
                <div className='w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-400'>
                  {step.icon}
                </div>
                <h3 className='text-xl font-bold text-white mb-3'>{step.title}</h3>
                <p className='text-gray-400'>{step.desc}</p>
                {index < 3 && (
                   <div className='hidden md:block absolute top-14 left-[70%] w-full h-[2px] bg-gradient-to-r from-blue-600/50 to-transparent'></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className='py-24 bg-blue-600'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h2 className='text-3xl md:text-5xl font-bold text-white mb-8'>Ready to start your next big thing?</h2>
          <p className='text-blue-100 text-xl max-w-2xl mx-auto mb-12'>
            Join the list of successful businesses that trusted CodeNext for their digital transformation.
          </p>
          <div className='flex flex-wrap justify-center gap-6'>
             <Link to='/contact' className='px-10 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all shadow-xl'>
                Get a Free Quote
             </Link>
             <Link to='/about' className='px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all'>
                Learn More
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;