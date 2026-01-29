import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Globe, Key, Wifi, RefreshCw, Terminal, Cpu, Zap } from 'lucide-react';

const Tools = () => {
  const [ipData, setIpData] = useState(null);
  const [loadingIp, setLoadingIp] = useState(false);
  const [password, setPassword] = useState('');
  const [passLength, setPassLength] = useState(16);
  const [latency, setLatency] = useState(null);

  const checkIp = async () => {
    setLoadingIp(true);
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setIpData(data.ip);
    } catch (error) {
      setIpData('Error fetching IP');
    }
    setLoadingIp(false);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-';
    let result = '';
    for (let i = 0; i < passLength; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
  };

  const checkLatency = () => {
    const start = Date.now();
    fetch(window.location.href, { mode: 'no-cors' }).then(() => {
      const end = Date.now();
      setLatency(end - start);
    });
  };

  return (
    <section id='tools' className='py-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        
        <div className='text-center mb-20'>
          <h2 className='text-4xl md:text-5xl font-extrabold text-white mb-6'>Developer Toolbox</h2>
          <p className='mt-4 text-xl text-gray-400 max-w-2xl mx-auto'>
            A collection of handy utilities we use daily. Free for everyone to use.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-10 mb-20'>
          {/* IP Checker */}
          <motion.div 
            whileHover={{ y: -5 }}
            className='bg-slate-900/80 p-10 rounded-3xl border border-slate-700 shadow-xl flex flex-col h-full'
          >
            <div className='flex items-center gap-4 mb-8'>
              <div className='p-3 bg-blue-600/20 rounded-2xl'>
                 <Globe className='text-blue-500' size={32} />
              </div>
              <h3 className='text-2xl font-bold text-white'>IP Checker</h3>
            </div>
            <p className='text-gray-400 mb-8 flex-grow'>
              Instantly identify your public IPv4 address. Useful for network troubleshooting and configuring firewall rules.
            </p>
            <div className='bg-slate-800 p-6 rounded-2xl mb-8 text-center h-20 flex items-center justify-center border border-slate-700 font-mono'>
              {loadingIp ? (
                <RefreshCw className='animate-spin text-blue-500' />
              ) : (
                <span className='text-xl font-bold text-blue-400'>{ipData || '0.0.0.0'}</span>
              )}
            </div>
            <button 
              onClick={checkIp}
              className='w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20'
            >
              Check My IP
            </button>
          </motion.div>

          {/* Password Generator */}
          <motion.div 
            whileHover={{ y: -5 }}
            className='bg-slate-900/80 p-10 rounded-3xl border border-slate-700 shadow-xl flex flex-col h-full'
          >
            <div className='flex items-center gap-4 mb-8'>
              <div className='p-3 bg-purple-600/20 rounded-2xl'>
                 <Key className='text-purple-500' size={32} />
              </div>
              <h3 className='text-2xl font-bold text-white'>Password Gen</h3>
            </div>
            <div className='flex justify-between items-center mb-4'>
               <span className='text-gray-400 font-bold'>Length: {passLength}</span>
               <input 
                 type='range' 
                 min='8' max='64' 
                 value={passLength} 
                 onChange={(e) => setPassLength(e.target.value)}
                 className='w-2/3 accent-purple-500'
               />
            </div>
            <div className='bg-slate-800 p-6 rounded-2xl mb-8 text-center break-all font-mono text-purple-400 min-h-[5rem] flex items-center justify-center border border-slate-700 text-sm'>
              {password || 'Click to Generate'}
            </div>
            <button 
              onClick={generatePassword}
              className='w-full py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-purple-600/20'
            >
              Generate Secure Key
            </button>
          </motion.div>

          {/* Latency Tester */}
          <motion.div 
            whileHover={{ y: -5 }}
            className='bg-slate-900/80 p-10 rounded-3xl border border-slate-700 shadow-xl flex flex-col h-full'
          >
            <div className='flex items-center gap-4 mb-8'>
              <div className='p-3 bg-green-600/20 rounded-2xl'>
                 <Wifi className='text-green-500' size={32} />
              </div>
              <h3 className='text-2xl font-bold text-white'>Latency Test</h3>
            </div>
            <p className='text-gray-400 mb-8 flex-grow'>
              Measure the round-trip time to our server. Lower latency means a faster, more responsive experience.
            </p>
            <div className='bg-slate-800 p-6 rounded-2xl mb-8 text-center h-20 flex items-center justify-center border border-slate-700'>
              <span className={`text-3xl font-black ${latency === null ? 'text-gray-600' : (latency < 50 ? 'text-green-400' : 'text-yellow-400')}`}>
                {latency !== null ? `${latency}ms` : '--'}
              </span>
            </div>
            <button 
              onClick={checkLatency}
              className='w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-600/20'
            >
              Test Ping
            </button>
          </motion.div>
        </div>

        {/* Tech Stack Info */}
        <div className='bg-slate-800/30 rounded-3xl p-12 border border-slate-700'>
           <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-center'>
              <div>
                 <h3 className='text-3xl font-bold text-white mb-6 flex items-center gap-3'>
                    <Terminal className='text-blue-500' /> Built for Performance
                 </h3>
                 <p className='text-gray-400 text-lg leading-relaxed mb-6'>
                    Our tools are built using the same high-performance tech stack we use for our clients. We leverage browser-native APIs and lightweight components to ensure instant results.
                 </p>
                 <div className='flex gap-4'>
                    <div className='flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg text-sm text-gray-300 border border-slate-700'>
                       <Cpu size={16} className='text-blue-400' /> React 18
                    </div>
                    <div className='flex items-center gap-2 px-4 py-2 bg-slate-900 rounded-lg text-sm text-gray-300 border border-slate-700'>
                       <Zap size={16} className='text-yellow-400' /> Vite 5
                    </div>
                 </div>
              </div>
              <div className='grid grid-cols-2 gap-4'>
                 <div className='aspect-square bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center border border-slate-700'>
                    <span className='text-4xl font-bold text-white mb-1'>100%</span>
                    <span className='text-xs text-gray-500 uppercase font-bold tracking-widest'>Secure</span>
                 </div>
                 <div className='aspect-square bg-slate-900/50 rounded-2xl flex flex-col items-center justify-center border border-slate-700'>
                    <span className='text-4xl font-bold text-white mb-1'>0ms</span>
                    <span className='text-xs text-gray-500 uppercase font-bold tracking-widest'>Lag</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Tools;