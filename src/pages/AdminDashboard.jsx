import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Eye, LogOut, TrendingUp, ShieldCheck, Globe, MessageSquare, Send, Bot, Terminal, Cpu, Activity, Zap } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [realStats, setRealStats] = useState({ views: '0', visitors: '0', bandwidth: '0 MB' });
  
  // Titan AI State
  const [ngrokUrl, setNgrokUrl] = useState(localStorage.getItem('titan_ngrok_url') || 'https://kaleb-mudfat-taxably.ngrok-free.dev');
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Titan-1.0gp online. System status: Beta Alpha XT. Proxy active. How can I assist you today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatScrollRef = useRef(null);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth !== 'true') {
      navigate('/');
      return;
    }
    setIsAuthorized(true);

    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics');
        const data = await response.json();
        const metrics = data.viewer?.accounts[0]?.pagesDev?.analytics[0]?.sum;

        if (metrics) {
          setRealStats({
            views: metrics.pageViews.toLocaleString(),
            visitors: metrics.requests.toLocaleString(),
            bandwidth: (metrics.bytes / 1024 / 1024).toFixed(2) + ' MB'
          });
        }
      } catch (err) {
        console.error("Dashboard Sync Error");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [navigate]);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/');
  };

  const handleTitanChat = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !ngrokUrl) return;

    const userMessage = chatInput;
    setChatInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // Validate URL before sending
      let finalNgrokUrl = ngrokUrl.trim();
      if (!finalNgrokUrl.startsWith('http')) {
        finalNgrokUrl = `https://${finalNgrokUrl}`;
      }
      
      localStorage.setItem('titan_ngrok_url', finalNgrokUrl);

      // CALLING PROXY INSTEAD OF NGROK DIRECTLY TO FIX CORS
      const response = await fetch(`/api/titan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ngrokUrl: finalNgrokUrl,
          message: userMessage
        })
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Server returned non-JSON response (${response.status}): ${text.slice(0, 100)}`);
      }
      
      if (data.error) {
        throw new Error(data.error);
      }

      const botReply = data.choices?.[0]?.message?.content || "No response content";
      setMessages(prev => [...prev, { role: 'assistant', content: botReply }]);
    } catch (err) {
      console.error("Titan Error:", err);
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message || "Failed to reach Titan."}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isAuthorized) return null;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-white">Command Center</h1>
          <p className="text-emerald-500 font-bold text-xs uppercase tracking-widest mt-1">Admin Access Authorized</p>
        </div>
        <button onClick={handleLogout} className="px-6 py-3 bg-rose-600/10 text-rose-500 rounded-xl font-bold hover:bg-rose-600 hover:text-white transition-all">Logout</button>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Views', value: realStats.views, icon: <Eye />, color: 'text-emerald-500' },
          { label: 'Requests', value: realStats.visitors, icon: <Users />, color: 'text-cyan-500' },
          { label: 'Bandwidth', value: realStats.bandwidth, icon: <TrendingUp />, color: 'text-emerald-400' },
          { label: 'Status', value: 'Live', icon: <ShieldCheck />, color: 'text-cyan-400' },
        ].map((stat, i) => (
          <motion.div key={i} className="glass-card p-8 rounded-3xl border border-white/5">
            <div className={`mb-4 ${stat.color}`}>{stat.icon}</div>
            <div className="text-3xl font-black mb-1">{loading ? "..." : stat.value}</div>
            <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* TITAN AI INTERFACE */}
        <div className="lg:col-span-2 flex flex-col h-[600px] glass-panel rounded-[2.5rem] border border-white/5 overflow-hidden">
          <div className="p-6 bg-emerald-600/10 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-500">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-black uppercase tracking-tighter text-sm">Titan AI <span className="text-emerald-500 ml-2 text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded-full">BETA 1.0gp</span></h3>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Neural Language Model</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Activity size={14} className="text-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black text-emerald-500 uppercase">Secure Proxy Active</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${
                  msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none'
                }`}>
                  <p className="leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleTitanChat} className="p-4 bg-slate-900/50 border-t border-white/5">
            <div className="flex gap-3">
              <input 
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask Titan anything..."
                className="flex-1 bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500/50 transition-all text-white"
              />
              <button 
                type="submit"
                disabled={!ngrokUrl || isTyping}
                className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>

        {/* TITAN SETTINGS & INFRA */}
        <div className="space-y-8">
          <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5">
            <h3 className="text-xl font-black mb-6 uppercase tracking-tighter flex items-center gap-3">
              <Terminal className="text-emerald-500" /> Titan Config
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-1">Ngrok Endpoint</label>
                <input 
                  type="text"
                  value={ngrokUrl}
                  onChange={(e) => setNgrokUrl(e.target.value)}
                  placeholder="https://your-id.ngrok-free.app"
                  className="w-full mt-2 bg-slate-950/50 border border-white/5 rounded-xl px-4 py-3 text-xs outline-none focus:border-emerald-500/50 text-white"
                />
              </div>
              <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-black uppercase text-emerald-500">Model Specs</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Version: Titan-1.0gp<br />
                  Proxy: Active (Fixed CORS)<br />
                  Host: Ngrok Tunnel
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-[2.5rem] p-8 border border-white/5">
             <h3 className="text-xl font-black mb-6 uppercase tracking-tighter flex items-center gap-3">
               <Globe className="text-cyan-500" /> Infrastructure
             </h3>
             <p className="text-slate-400 text-sm">Cloudflare Edge & Secure Proxy active.</p>
             <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Node Sync</span>
                  <span className="text-emerald-500">Optimal</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-slate-500">Encryption</span>
                  <span className="text-emerald-500">AES-256</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;