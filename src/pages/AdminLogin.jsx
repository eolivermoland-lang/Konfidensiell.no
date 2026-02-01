import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, ShieldAlert, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (data.success) {
        const authData = {
          authenticated: true,
          token: data.sessionToken,
          expiry: new Date().getTime() + 3600000 
        };
        localStorage.setItem('admin_session', JSON.stringify(authData));
        navigate('/admin-dashboard-private');
      } else {
        setError(true);
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12 rounded-[2.5rem] w-full max-w-md border border-white/10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-500">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-black text-white uppercase tracking-tighter text-glow">Admin Access</h1>
          <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest font-bold">Secure Cloud Verification</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1 text-left">Identity</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all disabled:opacity-50"
                placeholder="admin@codenext.no"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-2 ml-1 text-left">Secure Key</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-12 pr-4 py-4 bg-slate-950/50 border border-white/5 rounded-2xl focus:ring-2 focus:ring-blue-500 outline-none text-white transition-all disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-red-500 text-xs font-bold uppercase tracking-widest justify-center"
            >
              <ShieldAlert size={14} /> Unauthorized Access
            </motion.div>
          )}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-2 active:scale-95 disabled:bg-slate-800 disabled:text-gray-500"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Verify Credentials <ArrowRight size={20} /></>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
