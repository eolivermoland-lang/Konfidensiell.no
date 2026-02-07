import React, { useState, useRef } from 'react';
import { Mail, Send, MapPin, Clock, Linkedin, Twitter, Github, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'

  const email = "support@konfidensiell.no";

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Replace these with your actual EmailJS IDs
    const SERVICE_ID = "default_service";
    const TEMPLATE_ID = "template_i6v4hzu";
    const PUBLIC_KEY = "J_-l2lpNZ9tB9bxwr";

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current, PUBLIC_KEY)
      .then((result) => {
        setSubmitStatus('success');
        form.current.reset();
      }, (error) => {
        setSubmitStatus('error');
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setSubmitStatus(null), 5000);
      });
  };

  return (
    <section id='contact' className='py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        <div className='text-center mb-16'>
           <h2 className='text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter'>Let's Connect</h2>
           <p className='text-gray-400 text-xl max-w-2xl mx-auto font-medium'>
             Ready to start your digital transformation? Fill out the form below or reach out directly.
           </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12'>
          
          {/* Contact Info Sidebar */}
          <div className='lg:col-span-1 space-y-8'>
            <div className='glass-card p-8 rounded-[2.5rem] border border-white/5'>
              <h3 className='text-2xl font-black text-white mb-8 uppercase tracking-tighter'>Contact Details</h3>
              
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-blue-600/10 rounded-xl text-blue-500'>
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className='text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1'>Direct Email</p>
                    <a href={`mailto:${email}`} className='text-white hover:text-blue-400 transition-colors font-bold'>{email}</a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-purple-600/10 rounded-xl text-purple-500'>
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className='text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1'>Location</p>
                    <p className='text-white font-bold'>Kristiansand, Norway 🇳🇴</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-green-600/10 rounded-xl text-green-500'>
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className='text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1'>Response Time</p>
                    <p className='text-white font-bold'>Within 24 Hours</p>
                  </div>
                </div>
              </div>

              <div className='mt-12 pt-12 border-t border-white/5'>
                 <p className='text-gray-500 mb-6 font-black uppercase text-[10px] tracking-widest'>Social Presence</p>
                 <div className='flex gap-4'>
                    <a href='#' className='p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-blue-500 hover:bg-white/10 transition-all'><Linkedin size={20} /></a>
                    <a href='#' className='p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all'><Twitter size={20} /></a>
                    <a href='#' className='p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all'><Github size={20} /></a>
                 </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <form 
              ref={form} 
              onSubmit={sendEmail}
              className='glass-panel rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl space-y-6'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4'>Full Name</label>
                  <input 
                    type="text" 
                    name="user_name"
                    required
                    placeholder="John Doe"
                    className='w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4'>Email Address</label>
                  <input 
                    type="email" 
                    name="user_email"
                    required
                    placeholder="john@example.com"
                    className='w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4'>Subject</label>
                <input 
                  type="text" 
                  name="subject"
                  required
                  placeholder="How can we help?"
                  className='w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4'>Message</label>
                <textarea 
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell us about your project..."
                  className='w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none'
                ></textarea>
              </div>

              <div className='flex flex-col md:flex-row items-center gap-6 pt-4'>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-10 py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 ${
                    isSubmitting 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send size={20} />
                </button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className='flex items-center gap-2 text-green-500 font-bold'
                    >
                      <CheckCircle size={20} /> Message sent successfully!
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className='flex items-center gap-2 text-red-500 font-bold'
                    >
                      <AlertCircle size={20} /> Failed to send message.
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;