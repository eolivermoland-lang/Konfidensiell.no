import React from 'react';
import { Monitor, Smartphone, ShieldCheck, Code, Layout, BarChart, Gift, MessageSquare, Zap, Coffee, Sparkles, Wallet, Smile } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../store/LanguageContext';
import { translations } from '../data/translations';

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language].services;

  const services = [
    { id: 'web-design', title: language === 'en' ? 'Website Development & Optimization' : 'Nettsideutvikling & Optimalisering', description: language === 'en' ? 'Conversion-focused websites built with precision and modern technology.' : 'Konverteringsfokuserte nettsider bygget med presisjon og moderne teknologi.', icon: <Monitor className='w-12 h-12 text-emerald-500' /> },
    { id: 'it-consulting', title: language === 'en' ? 'IT Consulting & Infrastructure' : 'IT-Rådgivning & Infrastruktur', description: language === 'en' ? 'Expert strategic advice for businesses scaling their digital operations.' : 'Ekspert rådgivning for bedrifter som skalerer sin digitale drift.', icon: <Smartphone className='w-12 h-12 text-cyan-500' /> },
    { id: 'security-solutions', title: language === 'en' ? 'Security & Confidential Solutions' : 'Sikkerhet & Konfidensielle Løsninger', description: language === 'en' ? 'High-security digital environments for sensitive business data.' : 'Høysikkerhets digitale miljøer for sensitive forretningsdata.', icon: <ShieldCheck className='w-12 h-12 text-emerald-400' /> },
    { id: 'startup-support', title: language === 'en' ? 'Startup Tech Support' : 'Startup Teknisk Støtte', description: language === 'en' ? 'Technical partnership for founders launching and scaling their vision.' : 'Teknisk partnerskap for grundere som lanserer og skalerer sin visjon.', icon: <Code className='w-12 h-12 text-cyan-400' /> },
    { id: 'maintenance', title: language === 'en' ? 'Ongoing Support & Maintenance' : 'Vedlikehold & Drift', description: language === 'en' ? 'Proactive monitoring and updates to ensure zero downtime.' : 'Proaktiv overvåking og oppdateringer for å sikre null nedetid.', icon: <Layout className='w-12 h-12 text-emerald-500' /> },
    { id: 'digital-growth', title: language === 'en' ? 'Digital Growth & SEO' : 'Digital Vekst & SEO', description: language === 'en' ? 'Strategic search engine optimization to boost your organic reach.' : 'Strategisk søkemotoroptimalisering for å øke din organiske rekkevidde.', icon: <BarChart className='w-12 h-12 text-cyan-500' /> }
  ];

  const advantages = [
    { icon: <Gift className="text-emerald-400" size={32} />, title: t.advantages.preview },
    { icon: <MessageSquare className="text-cyan-400" size={32} />, title: t.advantages.consult },
    { icon: <ShieldCheck className="text-emerald-500" size={32} />, title: t.advantages.quality },
    { icon: <Zap className="text-cyan-500" size={32} />, title: t.advantages.speed }
  ];

  return (
    <section className='py-20 bg-transparent'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        {/* Header */}
        <div className='text-center mb-16 sm:mb-20'>
          <h2 className='text-3xl sm:text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter'>{t.heading}</h2>
          <p className='text-slate-400 max-w-2xl mx-auto text-lg sm:text-xl px-4'>{t.subheading}</p>
        </div>
        
        {/* Services Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-24 sm:mb-32'>
          {services.map((service, index) => (
            <motion.div key={index} className='glass-card p-6 sm:p-8 rounded-[2rem] sm:rounded-3xl hover:border-emerald-500/50 transition-all group flex flex-col'>
              <div className='mb-6 sm:mb-8 p-4 bg-slate-900/50 w-fit rounded-2xl group-hover:scale-110 transition-transform'>{service.icon}</div>
              <h3 className='text-xl sm:text-2xl font-bold text-white mb-4 uppercase tracking-tighter'>{service.title}</h3>
              <p className='text-slate-400 mb-8 leading-relaxed text-sm sm:text-base flex-1'>{service.description}</p>
              <Link to={`/services/${service.id}`} className='block w-full py-4 bg-emerald-600/20 border border-emerald-600/50 text-white text-center rounded-xl hover:bg-emerald-600 transition-all font-bold uppercase tracking-widest text-[10px] sm:text-xs'>{t.get_details}</Link>
            </motion.div>
          ))}
        </div>

        {/* The Advantage Row */}
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24 sm:mb-32'>
          {advantages.map((adv, idx) => (
            <div key={idx} className="glass-panel p-4 sm:p-8 rounded-2xl sm:rounded-3xl text-center">
              <div className="mb-4 sm:mb-6 flex justify-center scale-75 sm:scale-100">{adv.icon}</div>
              <h4 className="text-xs sm:text-xl font-bold text-white uppercase tracking-tighter">{adv.title}</h4>
            </div>
          ))}
        </div>

        {/* WORK & PAYMENT PROCESS */}
        <div className="mb-24 sm:mb-32">
           <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white mb-4 uppercase tracking-tighter">{t.zero_risk.heading}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base px-4">{t.zero_risk.subheading}</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-4 sm:px-0">
              <motion.div whileHover={{ y: -10 }} className="glass-card p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-l-4 border-l-emerald-500">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center text-emerald-400">
                       <Coffee size={20} />
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tighter">{t.zero_risk.step1_title}</h4>
                 </div>
                 <p className="text-slate-400 text-sm leading-relaxed">
                    {t.zero_risk.step1_desc}
                 </p>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} className="glass-card p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-l-4 border-l-cyan-500">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-cyan-600/20 rounded-xl flex items-center justify-center text-cyan-400">
                       <Sparkles size={20} />
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tighter">{t.zero_risk.step2_title}</h4>
                 </div>
                 <p className="text-slate-400 text-sm leading-relaxed">
                    {t.zero_risk.step2_desc}
                 </p>
              </motion.div>

              <motion.div whileHover={{ y: -10 }} className="glass-card p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] border-l-4 border-l-emerald-400">
                 <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600/20 rounded-xl flex items-center justify-center text-emerald-400">
                       <Wallet size={20} />
                    </div>
                    <h4 className="text-lg sm:text-xl font-black text-white uppercase tracking-tighter">{t.zero_risk.step3_title}</h4>
                 </div>
                 <p className="text-slate-400 text-sm leading-relaxed">
                    {t.zero_risk.step3_desc}
                 </p>
              </motion.div>
           </div>

           <div className="mt-8 sm:mt-12 glass-panel p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
              <Smile className="text-emerald-500" size={32} />
              <p className="text-white font-bold text-base sm:text-lg">{t.zero_risk.footer}</p>
           </div>
        </div>

        {/* Final CTA */}
        <div className='glass-card p-8 sm:p-12 rounded-[2rem] sm:rounded-[3rem] text-center border-t-2 border-t-emerald-600/30 mx-4 sm:mx-0'>
          <h3 className='text-2xl sm:text-3xl md:text-5xl font-black text-white mb-6 uppercase tracking-tighter'>{t.cta.heading}</h3>
          <p className="text-slate-400 mb-8 sm:mb-10 max-w-xl mx-auto uppercase tracking-widest text-[10px] sm:text-xs font-bold">{t.cta.subheading}</p>
          <Link to='/contact' className='inline-block w-full sm:w-auto px-8 py-4 sm:px-12 sm:py-5 bg-emerald-600 text-white font-black text-base sm:text-lg rounded-2xl hover:bg-emerald-700 shadow-xl shadow-emerald-600/20 transition-all active:scale-95 uppercase tracking-tighter'>
            {t.cta.btn}
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Services;