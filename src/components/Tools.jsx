import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Key, Wifi, RefreshCw, Cpu, Zap, Layers, Server, Check } from 'lucide-react';

const Tools = () => {
  const [ipData, setIpData] = useState(null);
  const [loadingIp, setLoadingIp] = useState(false);
  const [password, setPassword] = useState('');
  const [passLength, setPassLength] = useState(16);
  const [latency, setLatency] = useState(null);
  const [goal, setGoal] = useState('speed');
  
  const techStacks = {
    speed: { title: 'Ultra-Fast Web Engine', frontend: 'React + Vite', styling: 'Tailwind CSS', hosting: 'Cloudflare Edge', desc: 'Optimized for < 1s load times.' },
    security: { title: 'Secure Enterprise Portal', frontend: 'Next.js (SSR)', styling: 'Headless UI', hosting: 'Vercel / AWS', desc: 'Built with rigid security layers.' },
    ecommerce: { title: 'High-Conversion Store', frontend: 'React 18', styling: 'Modern CSS-in-JS', hosting: 'Netlify Storefront', desc: 'Seamless integration with Stripe.' }
  };

  const checkIp = async () => {
    setLoadingIp(true);
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpData(data.ip);
    } catch (e) { setIpData('Error'); }
    setLoadingIp(false);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    let res = '';
    for (let i = 0; i < passLength; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
    setPassword(res);
  };

  const checkLatency = () => {
    const start = Date.now();
    fetch('/', { mode: 'no-cors' }).then(() => setLatency(Date.now() - start));
  };

  return (
    <section className='py-20 bg-transparent'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        <header className='text-center mb-20'>
          <h1 className='text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter'>POWER TOOLS</h1>
          <p className='text-gray-400 max-w-2xl mx-auto text-xl'>Utilities for the modern digital landscape.</p>
        </header>

        {/* Tech Stack Suggester */}
        <div className="mb-32 glass-panel rounded-[3rem] p-8 md:p-16">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                 <h2 className="text-3xl font-black text-white mb-6">Stack Architect</h2>
                 <p className="text-gray-400 mb-10">Select your primary goal to see the modern technology stack we recommend for your project.</p>
                 
                 <div className="space-y-6" role="tablist" aria-label="Technology goals">
                    {Object.keys(techStacks).map(key => (
                       <button 
                         key={key} 
                         role="tab"
                         aria-selected={goal === key}
                         onClick={() => setGoal(key)}
                         className={`w-full text-left p-6 rounded-2xl border transition-all ${goal === key ? 'bg-blue-600/20 border-blue-600 text-white' : 'bg-slate-800/20 border-white/5 text-gray-500 hover:border-white/20'}`}
                       >
                         <div className="flex justify-between items-center">
                            <span className="text-lg font-bold capitalize">{key}</span>
                            {goal === key && <Zap className="text-blue-400" size={18} aria-hidden="true" />}
                         </div>
                       </button>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col justify-center glass-card p-10 rounded-[2.5rem] relative overflow-hidden" role="tabpanel">
                 <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Layers size={200} aria-hidden="true" />
                 </div>
                 
                 <motion.div key={goal} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="text-blue-500 font-bold uppercase text-xs tracking-widest mb-2">Recommended Strategy</div>
                    <h3 className="text-2xl font-black text-white mb-6">{techStacks[goal].title}</h3>
                    
                    <div className="space-y-4 mb-8">
                       {[
                         { icon: <Cpu size={16} />, label: 'Frontend', val: techStacks[goal].frontend },
                         { icon: <Zap size={16} />, label: 'Styling', val: techStacks[goal].styling },
                         { icon: <Server size={16} />, label: 'Hosting', val: techStacks[goal].hosting },
                       ].map((item, i) => (
                         <div key={i} className="flex items-center gap-4 bg-slate-950/50 p-4 rounded-xl border border-white/5">
                            <div className="text-blue-500" aria-hidden="true">{item.icon}</div>
                            <div>
                               <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">{item.label}</div>
                               <div className="text-white font-bold">{item.val}</div>
                            </div>
                         </div>
                       ))}
                    </div>
                    <p className="text-gray-400 italic text-sm">{techStacks[goal].desc}</p>
                 </motion.div>
              </div>
           </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
          <section className='glass-card p-10 rounded-3xl' aria-labelledby="ip-tool-heading">
            <Globe className='text-blue-500 mb-6' size={32} aria-hidden="true" />
            <h2 id="ip-tool-heading" className='text-2xl font-bold text-white mb-8'>IP Checker</h2>
            <div className='bg-slate-950/50 p-6 rounded-2xl mb-8 text-center text-xl font-bold text-blue-400' aria-live="polite">
              {loadingIp ? "Fetching..." : (ipData || '?.?.?.?')}
            </div>
            <button onClick={checkIp} className='w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors'>Trace IP</button>
          </section>

          <section className='glass-card p-10 rounded-3xl' aria-labelledby="pass-tool-heading">
            <Key className='text-purple-500 mb-6' size={32} aria-hidden="true" />
            <h2 id="pass-tool-heading" className='text-2xl font-bold text-white mb-8'>Password Gen</h2>
            <div className='bg-slate-950/50 p-6 rounded-2xl mb-8 text-center text-sm font-mono text-purple-400 break-all' aria-live="polite">
              {password || '••••••••'}
            </div>
            <button onClick={generatePassword} className='w-full py-4 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 transition-colors'>Generate</button>
          </section>

          <section className='glass-card p-10 rounded-3xl' aria-labelledby="ping-tool-heading">
            <Wifi className='text-green-500 mb-6' size={32} aria-hidden="true" />
            <h2 id="ping-tool-heading" className='text-2xl font-bold text-white mb-8'>Latency Ping</h2>
            <div className='bg-slate-950/50 p-6 rounded-2xl mb-8 text-center text-3xl font-black text-green-400' aria-live="polite">
              {latency !== null ? `${latency}ms` : '--'}
            </div>
            <button onClick={checkLatency} className='w-full py-4 bg-green-600 text-white rounded-xl font-bold hover:bg-green-700 transition-colors'>Ping</button>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Tools;