import React from 'react';
import { Monitor, Smartphone, Code, Globe, Layout, BarChart, Gift, MessageSquare, ShieldCheck, Sparkles, Zap, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'web-design',
    title: 'Web Design & Development',
    description: 'Stunning, responsive websites built with React and Tailwind. We focus on SEO, speed, and conversion rates.',
    features: ['Custom UI/UX Design', 'Full Responsive Layout', 'SEO Optimization', 'Speed Optimization'],
    icon: <Monitor className='w-12 h-12 text-blue-500' />
  },
  {
    id: 'app-development',
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile applications that provide seamless user experiences on iOS and Android.',
    features: ['Cross-Platform (React Native)', 'Native Performance', 'App Store Deployment', 'Push Notifications'],
    icon: <Smartphone className='w-12 h-12 text-purple-500' />
  },
  {
    id: 'e-commerce',
    title: 'E-commerce Solutions',
    description: 'Build your online store with secure payment gateways, inventory management, and a smooth checkout flow.',
    features: ['Secure Payments', 'Inventory Management', 'Customer Dashboard', 'Analytics Integration'],
    icon: <Globe className='w-12 h-12 text-green-500' />
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    description: 'Tailor-made software solutions (SaaS, CRMs, Portals) to optimize your business processes and increase efficiency.',
    features: ['Scalable Architecture', 'API Integrations', 'Cloud Hosting', 'Database Design'],
    icon: <Code className='w-12 h-12 text-yellow-500' />
  },
  {
    id: 'ui-ux-audits',
    title: 'UI/UX Audits',
    description: 'Professional review of your existing product to identify usability issues and improve conversion.',
    features: ['User Flow Analysis', 'Heatmap Review', 'Accessibility Audit', 'Design Refresh'],
    icon: <Layout className='w-12 h-12 text-pink-500' />
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    description: 'Gain insights from your data with custom dashboards and tracking setups to drive informed decisions.',
    features: ['Custom Dashboards', 'Conversion Tracking', 'User Behavior Analysis', 'Performance Metrics'],
    icon: <BarChart className='w-12 h-12 text-indigo-500' />
  }
];

const advantages = [
  {
    icon: <Gift className="text-blue-400" size={32} />,
    title: 'Free Design Preview',
    desc: 'We are so confident in our work that we offer a free visual preview of your project before you sign anything.'
  },
  {
    icon: <MessageSquare className="text-purple-400" size={32} />,
    title: 'Free Consultation',
    desc: 'Get 30 minutes of expert IT strategy and project planning at no cost. No strings attached.'
  },
  {
    icon: <ShieldCheck className="text-green-400" size={32} />,
    title: 'Norwegian Quality',
    desc: 'Local expertise with a focus on Scandinavian design principles, reliability, and precision.'
  },
  {
    icon: <Zap className="text-yellow-400" size={32} />,
    title: 'Speed & Power',
    desc: 'We use the latest technology to ensure your site or app is faster and more powerful than your competitors.'
  }
];

const Services = () => {
  return (
    <section id='services' className='py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Services Header */}
        <div className='text-center mb-20'>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-400 text-sm font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles size={16} /> Solutions
          </motion.div>
          <h2 className='text-4xl md:text-6xl font-black text-white mb-6 tracking-tight'>Expert Services</h2>
          <p className='mt-4 text-xl text-gray-400 max-w-2xl mx-auto'>
            High-end IT services designed to launch and scale your business in the digital age.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-32'>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className='bg-slate-800/40 p-8 rounded-3xl border border-slate-700 hover:border-blue-500/50 transition-all group'
            >
              <div className='mb-8 p-4 bg-slate-900 w-fit rounded-2xl group-hover:scale-110 transition-transform'>
                {service.icon}
              </div>
              <h3 className='text-2xl font-bold text-white mb-4'>{service.title}</h3>
              <p className='text-gray-400 mb-6 leading-relaxed'>{service.description}</p>
              
              <ul className='space-y-3 mb-8'>
                {service.features.map((feature, idx) => (
                  <li key={idx} className='text-sm text-gray-300 flex items-center gap-2'>
                    <div className='w-1.5 h-1.5 bg-blue-500 rounded-full'></div>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to={`/services/${service.id}`}
                className='block w-full py-4 bg-slate-900 border border-slate-700 text-white text-center rounded-xl hover:bg-blue-600 hover:border-blue-600 transition-all font-semibold'
              >
                Get Details
              </Link>
            </motion.div>
          ))}
        </div>

        {/* The CodeNext Advantage */}
        <div className='mb-32'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-black text-white mb-4'>The CodeNext Advantage</h2>
            <p className='text-gray-400 max-w-2xl mx-auto'>Why businesses choose us over international agencies.</p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {advantages.map((adv, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 hover:border-blue-500/30 transition-all text-center"
              >
                <div className="mb-6 flex justify-center">{adv.icon}</div>
                <h4 className="text-xl font-bold text-white mb-3">{adv.title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className='p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-[2.5rem]'>
          <div className='p-12 bg-slate-900 rounded-[2.25rem] text-center backdrop-blur-md'>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-widest mb-8'>
              <Timer size={14} /> Limited Spots Available
            </div>
            <h3 className='text-3xl md:text-5xl font-black text-white mb-6'>Let's build something extraordinary.</h3>
            <p className='text-gray-400 text-xl mb-10 max-w-2xl mx-auto leading-relaxed'>
              Take advantage of our <span className="text-blue-400 font-bold">Free Consultation</span> and see why we are the preferred choice for Norwegian digital innovation.
            </p>
            <div className='flex flex-wrap justify-center gap-4'>
              <Link to='/contact' className='px-12 py-5 bg-blue-600 text-white font-black text-lg rounded-2xl hover:bg-blue-700 hover:scale-105 transition-all shadow-xl shadow-blue-600/20'>
                Book My Free Strategy Call
              </Link>
              <Link to='/contact' className='px-12 py-5 bg-slate-800 text-white font-black text-lg rounded-2xl hover:bg-slate-700 transition-all'>
                Get My Free Preview
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;