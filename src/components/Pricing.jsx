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
      dark: false,
      data: t.enkel
    },
    {
      key: 'pluss',
      highlight: true,
      dark: false,
      data: t.pluss
    },
    {
      key: 'premium',
      highlight: false,
      dark: true,
      data: t.premium
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4 uppercase"
          >
            {t.heading}
          </motion.h2>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto">
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
              className={`relative flex flex-col p-8 rounded-[2.5rem] shadow-xl transition-all border ${
                tier.dark 
                ? 'bg-slate-900 text-white border-slate-800' 
                : 'bg-white text-slate-900 border-slate-100'
              } ${tier.highlight ? 'ring-2 ring-emerald-500' : ''}`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
                  {t.popular}
                </div>
              )}

              <div className="mb-8">
                <h3 className={`text-xl font-black uppercase tracking-tight mb-2 ${tier.dark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                  {tier.data.title}
                </h3>
                <div className="text-3xl font-black tracking-tighter">
                  {tier.data.price}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {tier.data.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-medium">
                    <Check className={`flex-shrink-0 mt-0.5 ${tier.dark ? 'text-emerald-400' : 'text-emerald-500'}`} size={18} />
                    <span className={tier.dark ? 'text-slate-300' : 'text-slate-600'}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link 
                to="/contact"
                className={`w-full py-4 rounded-2xl font-black text-center transition-all flex items-center justify-center gap-2 group ${
                  tier.highlight 
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200' 
                  : tier.dark
                  ? 'bg-white text-slate-900 hover:bg-slate-100'
                  : 'bg-slate-900 text-white hover:bg-slate-800'
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