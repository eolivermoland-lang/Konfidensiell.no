import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../store/LanguageContext';
import { translations } from '../data/translations';

const Pricing = () => {
  const { language } = useLanguage();
  const t = translations[language].pricing;

  const tiers = [
    {
      key: 'enkel',
      highlight: false,
      data: t.enkel
    },
    {
      key: 'pluss',
      highlight: true,
      data: t.pluss
    },
    {
      key: 'premium',
      highlight: false,
      data: t.premium
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-transparent text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 uppercase"
          >
            {t.heading}
          </motion.h2>
          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto">
            {t.subheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <motion.article
              key={tier.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative flex flex-col p-8 rounded-[2.5rem] transition-all border backdrop-blur-md ${
                tier.highlight 
                ? 'bg-emerald-500/5 border-emerald-500/30 ring-1 ring-emerald-500/20' 
                : 'bg-white/5 border-white/10'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                  {t.popular}
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${tier.highlight ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {tier.data.title}
                </h3>
                <div className="text-2xl font-black tracking-tighter text-emerald-500/90">
                  {t.on_request}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.data.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium">
                    <Check className="flex-shrink-0 mt-0.5 text-emerald-500" size={18} />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact"
                className={`w-full py-4 rounded-2xl font-black text-center transition-all flex items-center justify-center gap-2 group ${
                  tier.highlight 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-500' 
                  : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {t.cta} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;