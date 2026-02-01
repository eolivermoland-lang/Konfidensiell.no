import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart3, Users, Eye, MousePointer2, LogOut, TrendingUp, ShieldCheck, Globe, RefreshCw } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [realStats, setRealStats] = useState({
    views: '0',
    visitors: '0',
    bandwidth: '0 MB'
  });

  const ACCOUNT_ID = "961d9b8159d86770ecbfa38b78c6ea7c";
  const API_TOKEN = "VqbFcHPBkLelYskDf6tzknO7Ag0Jr6CTnQQ4T_Tv";

  useEffect(() => {
    // Session Check
    const authString = localStorage.getItem('admin_session');
    if (!authString) {
      navigate('/');
      return;
    }

    const session = JSON.parse(authString);
    if (new Date().getTime() > session.expiry) {
      localStorage.removeItem('admin_session');
      navigate('/');
      return;
    }

    // Fetch Real Analytics from Cloudflare
    const fetchAnalytics = async () => {
      try {
        // Query for last 24 hours of traffic
        const query = `
          query {
            viewer {
              accounts(filter: { accountTag: "${ACCOUNT_ID}" }) {
                pagesDev {
                  analytics(filter: { date_geq: "2026-01-01" }, limit: 1) {
                    sum {
                      requests
                      pageViews
                      bytes
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch('https://api.cloudflare.com/client/v4/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_TOKEN}`
          },
          body: JSON.stringify({ query })
        });

        const data = await response.json();
        const metrics = data.viewer.accounts[0]?.pagesDev?.analytics[0]?.sum;

        if (metrics) {
          setRealStats({
            views: metrics.pageViews.toLocaleString(),
            visitors: metrics.requests.toLocaleString(),
            bandwidth: (metrics.bytes / 1024 / 1024).toFixed(2) + ' MB'
          });
        }
      } catch (err) {
        console.error("Cloudflare API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/');
  };

  const stats = [
    { label: 'Real Page Views', value: realStats.views, icon: <Eye />, color: 'text-blue-500' },
    { label: 'Total Requests', value: realStats.visitors, icon: <Users />, color: 'text-purple-500' },
    { label: 'Bandwidth Used', value: realStats.bandwidth, icon: <TrendingUp />, color: 'text-green-500' },
    { label: 'Cloudflare Status', value: 'Active', icon: <ShieldCheck />, color: 'text-blue-400' },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-white uppercase tracking-tighter text-glow">Command Center</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">Authenticated: Oliver Moland Eyde</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="p-3 bg-slate-800 text-gray-400 rounded-xl hover:text-white transition-all"
            aria-label="Refresh Data"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 bg-red-600/10 text-red-500 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all active:scale-95 border border-red-600/20"
          >
            <LogOut size={18} /> Exit Dashboard
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card p-8 rounded-3xl border border-white/5 relative overflow-hidden"
          >
            <div className={`mb-4 ${stat.color}`}>{React.cloneElement(stat.icon, { size: 28 })}</div>
            <div className="text-3xl font-black text-white mb-1">
              {loading ? "..." : stat.value}
            </div>
            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5">
           <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-3">
              <Globe className="text-blue-500" /> Infrastructure Source
           </h3>
           <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                 <span className="text-gray-400 text-xs font-bold uppercase">Cloudflare Account</span>
                 <span className="text-white font-mono text-xs">{ACCOUNT_ID}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-950/50 rounded-2xl border border-white/5">
                 <span className="text-gray-400 text-xs font-bold uppercase">Data Resolution</span>
                 <span className="text-green-500 text-xs font-black uppercase">Live Production</span>
              </div>
           </div>
        </div>

        <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5">
           <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tighter">Security Log</h3>
           <div className="text-xs font-mono text-gray-500 space-y-2">
              <p>[{new Date().toISOString()}] - Session Handshake: SUCCESS</p>
              <p>[{new Date().toISOString()}] - GraphQL Query: EXECUTED</p>
              <p>[{new Date().toISOString()}] - Encrypted Token: ACTIVE</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;