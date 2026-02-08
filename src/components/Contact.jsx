import React, { useState, useRef } from 'react';
import { Mail, Send, MapPin, Clock, Linkedin, Twitter, Github, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../store/LanguageContext';
import { translations } from '../data/translations';

const Contact = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error'
  const { language } = useLanguage();
  const t = translations[language].contact;

  const email = "support@konfidensiell.no";

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Replace these with your actual EmailJS IDs
    const SERVICE_ID = "service_vxg82me";
    const TEMPLATE_ID = "template_i6v4hzu";
    const PUBLIC_KEY = "J_-l2lpNZ9tB9bxwr";

    const templateParams = {
      name: form.current.user_name.value,
      user_name: form.current.user_name.value,
      user_mail: form.current.user_email.value,
      subject: form.current.subject.value,
      message: form.current.message.value,
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((result) => {
        setSubmitStatus('success');
        form.current.reset();
      }, (error) => {
        console.error('EmailJS Error:', error);
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
        
        <div className='text-center mb-12 sm:mb-16'>
           <h2 className='text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter px-4'>{t.heading}</h2>
           <p className='text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto font-medium px-4'>
             {t.subheading}
           </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12'>
          
          {/* Contact Info Sidebar */}
          <div className='lg:col-span-1 space-y-6 sm:space-y-8'>
            <div className='glass-card p-6 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-white/5'>
              <h3 className='text-xl sm:text-2xl font-black text-white mb-6 sm:mb-8 uppercase tracking-tighter'>{t.details_title}</h3>
              
              <div className='space-y-6'>
                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-blue-600/10 rounded-xl text-blue-500 flex-shrink-0'>
                    <Mail size={20} sm={24} />
                  </div>
                  <div className="min-w-0">
                    <p className='text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1'>{t.email_label}</p>
                    <a href={`mailto:${email}`} className='text-white hover:text-blue-400 transition-colors font-bold text-sm sm:text-base break-all'>{email}</a>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-purple-600/10 rounded-xl text-purple-500 flex-shrink-0'>
                    <MapPin size={20} sm={24} />
                  </div>
                  <div>
                    <p className='text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1'>{t.location_label}</p>
                    <p className='text-white font-bold text-sm sm:text-base'>{t.location_val}</p>
                  </div>
                </div>

                <div className='flex items-start gap-4'>
                  <div className='p-3 bg-green-600/10 rounded-xl text-green-500 flex-shrink-0'>
                    <Clock size={20} sm={24} />
                  </div>
                  <div>
                    <p className='text-[9px] sm:text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1'>{t.time_label}</p>
                    <p className='text-white font-bold text-sm sm:text-base'>{t.time_val}</p>
                  </div>
                </div>
              </div>

              <div className='mt-8 sm:mt-12 pt-8 sm:pt-12 border-t border-white/5'>
                 <p className='text-gray-500 mb-6 font-black uppercase text-[9px] sm:text-[10px] tracking-widest'>{t.social_label}</p>
                 <div className='flex gap-4'>
                    <a href='#' className='p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-blue-500 hover:bg-white/10 transition-all'><Linkedin size={18} /></a>
                    <a href='#' className='p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-blue-400 hover:bg-white/10 transition-all'><Twitter size={18} /></a>
                    <a href='#' className='p-3 bg-white/5 rounded-2xl text-gray-400 hover:text-white hover:bg-white/10 transition-all'><Github size={18} /></a>
                 </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className='lg:col-span-2'>
            <form 
              ref={form} 
              onSubmit={sendEmail}
              className='glass-panel rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-12 border border-white/5 shadow-2xl space-y-6'
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-2'>
                  <label className='text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4'>{t.form_name}</label>
                  <input 
                    type="text" 
                    name="user_name"
                    required
                    placeholder="John Doe"
                    className='w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base'
                  />
                </div>
                <div className='space-y-2'>
                  <label className='text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4'>{t.form_email}</label>
                  <input 
                    type="email" 
                    name="user_email"
                    required
                    placeholder="john@example.com"
                    className='w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <label className='text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4'>{t.form_subject}</label>
                <input 
                  type="text" 
                  name="subject"
                  required
                  placeholder="How can we help?"
                  className='w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base'
                />
              </div>

              <div className='space-y-2'>
                <label className='text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-500 ml-4'>{t.form_message}</label>
                <textarea 
                  name="message"
                  required
                  rows="5"
                  placeholder="Tell us about your project..."
                  className='w-full px-6 py-4 bg-slate-950/50 border border-white/5 rounded-2xl outline-none text-white focus:ring-2 focus:ring-blue-500 transition-all resize-none text-sm sm:text-base'
                ></textarea>
              </div>

              <div className='flex flex-col md:flex-row items-center gap-6 pt-4'>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full md:w-auto px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-black text-base sm:text-lg transition-all flex items-center justify-center gap-3 ${
                    isSubmitting 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]'
                  }`}
                >
                  {isSubmitting ? t.form_sending : t.form_btn}
                  <Send size={20} />
                </button>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className='flex items-center gap-2 text-green-500 font-bold text-sm sm:text-base'
                    >
                      <CheckCircle size={20} /> {t.form_success}
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className='flex items-center gap-2 text-red-500 font-bold text-sm sm:text-base'
                    >
                      <AlertCircle size={20} /> {t.form_error}
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