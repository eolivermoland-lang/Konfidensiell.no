import React from 'react';
import { Mail, Send, MapPin, Clock, Linkedin, Twitter, Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const email = "support@konfidensiell.no";

  const handleContactClick = () => {
    window.location.href = `mailto:${email}?subject=Inquiry for CodeNext&body=Hi CodeNext team,%0D%0A%0D%0AI would like to discuss a project...`;
  };

  return (
    <section id='contact' className='py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        <div className='text-center mb-16'>
           <h2 className='text-4xl md:text-5xl font-extrabold text-white mb-6'>Let's Connect</h2>
           <p className='text-gray-400 text-xl max-w-2xl mx-auto'>
             Ready to start your digital transformation? Contact us directly via email and we'll get back to you as soon as possible.
           </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          
          {/* Contact Info Sidebar */}
          <div className='lg:col-span-1 space-y-8'>
            <div className='bg-slate-800/40 p-8 rounded-3xl border border-slate-700'>
              <h3 className='text-2xl font-bold text-white mb-8'>Contact Details</h3>
              
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-blue-600/20 rounded-xl text-blue-500'>
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 font-bold uppercase tracking-wider'>Direct Email</p>
                    <a href={`mailto:${email}`} className='text-white hover:text-blue-400 transition-colors font-medium'>{email}</a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-purple-600/20 rounded-xl text-purple-500'>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 font-bold uppercase tracking-wider'>Location</p>
                    <p className='text-white font-medium'>Kristiansand, Norway 🇳🇴</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-green-600/20 rounded-xl text-green-500'>
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className='text-sm text-gray-500 font-bold uppercase tracking-wider'>Response Time</p>
                    <p className='text-white font-medium'>Within 24 Hours</p>
                  </div>
                </div>
              </div>

              <div className='mt-12 pt-12 border-t border-slate-700'>
                 <p className='text-gray-400 mb-6 font-bold uppercase text-sm tracking-widest'>Follow Our Journey</p>
                 <div className='flex gap-4'>
                    <a href='#' className='p-3 bg-slate-900 rounded-full text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition-all'><Linkedin size={20} /></a>
                    <a href='#' className='p-3 bg-slate-900 rounded-full text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition-all'><Twitter size={20} /></a>
                    <a href='#' className='p-3 bg-slate-900 rounded-full text-gray-400 hover:text-blue-400 hover:bg-slate-700 transition-all'><Github size={20} /></a>
                 </div>
              </div>
            </div>
          </div>

          {/* Direct Action Area */}
          <div className='lg:col-span-2'>
            <div className='bg-slate-800/80 rounded-3xl p-8 md:p-16 border border-slate-700 shadow-2xl flex flex-col items-center justify-center text-center h-full relative overflow-hidden'>
              
              {/* Background Glow Effect */}
              <div className='absolute -top-24 -right-24 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl'></div>
              <div className='absolute -bottom-24 -left-24 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl'></div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='z-10'
              >
                <div className='w-24 h-24 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-blue-500/30'>
                  <Mail size={48} className='text-white' />
                </div>
                
                <h3 className='text-3xl md:text-4xl font-black text-white mb-6'>Send us an Email</h3>
                <p className='text-gray-300 text-lg mb-10 max-w-md mx-auto'>
                  Click the button below to open your preferred email client. We've already filled in our address for you!
                </p>

                <button 
                  onClick={handleContactClick}
                  className='group relative inline-flex items-center gap-3 px-10 py-5 bg-white text-slate-900 font-black text-xl rounded-2xl hover:bg-blue-50 transition-all hover:scale-105 active:scale-95 shadow-2xl overflow-hidden'
                >
                  <span className='z-10 flex items-center gap-3'>
                    Open Mail Client <ExternalLink size={24} />
                  </span>
                </button>

                <p className='mt-8 text-gray-500 text-sm'>
                  Or copy manually: <span className='text-blue-400 select-all'>{email}</span>
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;