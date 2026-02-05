import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Eye, LogOut, TrendingUp, ShieldCheck, Globe, RefreshCw, ShieldAlert } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [realStats, setRealStats] = useState({ views: '0', visitors: '0', bandwidth: '0 MB' });

  const ACCOUNT_ID = "961d9b8159d86770ecbfa38b78c6ea7c";
  const API_TOKEN = "VqbFcHPBkLelYskDf6tzknO7Ag0Jr6CTnQQ4T_Tv";

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth');
    if (auth !== 'true') {
      navigate('/');
      return;
    }
    setIsAuthorized(true);

    const fetchAnalytics = async () => {
      try {
        const query = `
          query {
            viewer {
              accounts(filter: { accountTag: "${ACCOUNT_ID}" }) {
                pagesDev {
                  analytics(filter: { date_geq: "2026-01-01" }, limit: 1) {
                    sum { requests pageViews bytes }
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

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/');
  };

  if (!isAuthorized) return null;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-white">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-black uppercase tracking-tighter">Command Center</h1>
        <button onClick={handleLogout} className="px-6 py-3 bg-red-600/10 text-red-500 rounded-xl font-bold hover:bg-red-600 hover:text-white transition-all">Logout</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: 'Total Views', value: realStats.views, icon: <Eye />, color: 'text-blue-500' },
          { label: 'Requests', value: realStats.visitors, icon: <Users />, color: 'text-purple-500' },
          { label: 'Bandwidth', value: realStats.bandwidth, icon: <TrendingUp />, color: 'text-green-500' },
          { label: 'Status', value: 'Live', icon: <ShieldCheck />, color: 'text-blue-400' },
        ].map((stat, i) => (
          <motion.div key={i} className="glass-card p-8 rounded-3xl border border-white/5">
            <div className={`mb-4 ${stat.color}`}>{stat.icon}</div>
            <div className="text-3xl font-black mb-1">{loading ? "..." : stat.value}</div>
            <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="glass-panel rounded-[2.5rem] p-10 border border-white/5">
         <h3 className="text-xl font-black mb-8 uppercase tracking-tighter flex items-center gap-3"><Globe className="text-blue-500" /> Infrastructure</h3>
         <p className="text-gray-400 text-sm">Direct connection to Cloudflare Analytics enabled.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
