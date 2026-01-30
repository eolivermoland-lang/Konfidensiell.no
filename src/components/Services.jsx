import React from 'react';
import { Monitor, Smartphone, Code, Globe, Layout, BarChart, Gift, MessageSquare, ShieldCheck, Sparkles, Zap, Timer, CheckCircle, Wallet, Smile, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  { id: 'web-design', title: 'Web Design & Development', description: 'Stunning, responsive websites built with React and Tailwind.', icon: <Monitor className='w-12 h-12 text-blue-500' /> },
  { id: 'app-development', title: 'Mobile App Development', description: 'Native and cross-platform mobile applications for iOS and Android.', icon: <Smartphone className='w-12 h-12 text-purple-500' /> },
  { id: 'e-commerce', title: 'E-commerce Solutions', description: 'Build your online store with secure payment gateways.', icon: <Globe className='w-12 h-12 text-green-500' /> },
  { id: 'custom-software', title: 'Custom Software', description: 'Tailor-made software solutions to optimize your business.', icon: <Code className='w-12 h-12 text-yellow-500' /> },
  { id: 'ui-ux-audits', title: 'UI/UX Audits', description: 'Professional review to identify usability issues.', icon: <Layout className='w-12 h-12 text-pink-500' /> },
  { id: 'data-analytics', title: 'Data & Analytics', description: 'Gain insights from your data with custom dashboards.', icon: <BarChart className='w-12 h-12 text-indigo-500' /> }
];

const advantages = [
  { icon: <Gift className="text-blue-400" size={32} />, title: 'Free Design Preview' },
  { icon: <MessageSquare className="text-purple-400" size={32} />, title: 'Free Consultation' },
  { icon: <ShieldCheck className="text-green-400" size={32} />, title: 'Norwegian Quality' },
  { icon: <Zap className="text-yellow-400" size={32} />, title: 'Speed & Power' }
];

const Services = () => {
  return (
    <section className='py-20 bg-transparent'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Header */}
        <div className='text-center mb-20'>
          <h2 className='text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter'>Expert Services</h2>
          <p className='text-gray-400 max-w-2xl mx-auto text-xl'>IT solutions designed to scale your business.</p>
        </div>
        
        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32'>
          {services.map((service, index) => (
            <motion.div key={index} className='glass-card p-8 rounded-3xl hover:border-blue-500/50 transition-all group'>
              <div className='mb-8 p-4 bg-slate-900/50 w-fit rounded-2xl group-hover:scale-110 transition-transform'>{service.icon}</div>
              <h3 className='text-2xl font-bold text-white mb-4 uppercase tracking-tighter'>{service.title}</h3>
              <p className='text-gray-400 mb-8 leading-relaxed'>{service.description}</p>
              <Link to={`/services/${service.id}`} className='block w-full py-4 bg-blue-600/20 border border-blue-600/50 text-white text-center rounded-xl hover:bg-blue-600 transition-all font-bold uppercase tracking-widest text-xs'>Get Details</Link>
            </motion.div>
          ))}
        </div>

        {/* The Advantage Row */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32'>
          {advantages.map((adv, idx) => (
            <div key={idx} className="glass-panel p-8 rounded-3xl text-center">
              <div className="mb-6 flex justify-center">{adv.icon}</div>
              <h4 className="text-xl font-bold text-white mb-3 uppercase tracking-tighter">{adv.title}</h4>
            </div>
          ))}
        </div>

        {/* WORK & PAYMENT PROCESS - NEW SECTION */}
        <div className="mb-32">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">Our Zero-Risk Process</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">We don't believe in locking you into contracts for products you haven't seen yet.</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div whileHover={{ y: -10 }} className="glass-card p-10 rounded-[2.5rem] border-l-4 border-l-blue-500">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400">
                       <Coffee size={24} />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tighter">1. Free Consult</h4>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    We start with a 100% free consultation. No pressure, no sales talk. Just a deep dive into your vision and a clear roadmap on how we will build it.
                 </p>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} className="glass-card p-10 rounded-[2.5rem] border-l-4 border-l-purple-500">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-purple-600/20 rounded-xl flex items-center justify-center text-purple-400">
                       <Sparkles size={24} />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tighter">2. Build & Review</h4>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    We get to work immediately. You will have a live link to watch your product being built in real-time. We iterate based on your feedback until it's perfect.
                 </p>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} className="glass-card p-10 rounded-[2.5rem] border-l-4 border-l-green-500">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-green-600/20 rounded-xl flex items-center justify-center text-green-400">
                       <Wallet size={24} />
                    </div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tighter">3. Pay Only if Happy</h4>
                 </div>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    This is our CodeNext promise: <span className="text-white font-bold">You don't pay a single krone until the project is finished and you are 100% happy with the result.</span>
                 </p>
              </motion.div>
           </div>

           <div className="mt-12 glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center justify-center gap-6 text-center">
              <Smile className="text-yellow-500" size={32} />
              <p className="text-white font-bold text-lg">Your satisfaction is our only metric for success. No upfront costs, no hidden risks.</p>
           </div>
        </div>

        {/* Final CTA */}
        <div className='glass-card p-12 rounded-[3rem] text-center border-t-2 border-t-blue-600/30'>
          <h3 className='text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter'>Ready for a new standard?</h3>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto uppercase tracking-widest text-xs font-bold">Experience the CodeNext difference today with a risk-free strategy session.</p>
          <Link to='/contact' className='inline-block px-12 py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all active:scale-95 uppercase tracking-tighter'>Book Free Call</Link>
        </div>

      </div>
    </section>
  );
};

export default Services;