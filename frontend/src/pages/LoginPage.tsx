import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type Tab = 'login' | 'signup';
type Mode = 'user' | 'admin';

export const LoginPage = () => {
  const [tab, setTab] = useState<Tab>('login');
  const [mode, setMode] = useState<Mode>('user');
  const [role, setRole] = useState<'user' | 'worker'>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const isAdmin  = mode === 'admin';
  const isLogin  = tab === 'login';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin || isAdmin) {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
        setUser(res.data.user);
        toast.success('Welcome back!');
        const r = res.data.user.role;
        if (r === 'worker') navigate('/worker');
        else if (r === 'admin') navigate('/admin');
        else navigate('/dashboard');
      } else {
        const res = await axios.post(`${API_URL}/auth/signup`, { name, email, password, phone: '0000000000', role }, { withCredentials: true });
        setUser(res.data.user);
        toast.success('Account created!');
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center relative overflow-hidden px-5">

      {/* Background */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute top-[-15%] left-[-5%]  w-80 h-80 bg-accent/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[-15%] right-[-5%] w-72 h-72 bg-teal/6  rounded-full blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-[400px]"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M8 5.5V10.5M5.5 8H10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>
          <span className="font-semibold text-[16px] text-text">Service<span className="text-accent-light">Now</span></span>
        </div>

        <div className="card p-7">
          {/* Mode toggle */}
          {!isAdmin ? (
            <>
              <div className="flex bg-surface2 rounded-lg p-1 mb-6">
                {(['login', 'signup'] as Tab[]).map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTab(t)}
                    className={`flex-1 py-2 rounded-md text-[13px] font-semibold transition-all duration-150 capitalize ${
                      tab === t ? 'bg-surface3 text-text shadow-card' : 'text-muted hover:text-text'
                    }`}
                  >
                    {t === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-6">
                    <h1 className="font-semibold text-xl text-text">
                      {isLogin ? 'Welcome back' : 'Create an account'}
                    </h1>
                    <p className="text-muted text-[13px] mt-1">
                      {isLogin ? 'Sign in to continue to ServiceNow' : 'Join the platform and book services instantly'}
                    </p>
                  </div>

                  {/* Signup role selector */}
                  {!isLogin && (
                    <div className="flex bg-surface2 rounded-lg p-1 mb-5">
                      {(['user', 'worker'] as const).map(r => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setRole(r)}
                          className={`flex-1 py-2 rounded-md text-[13px] font-medium transition-all duration-150 capitalize ${
                            role === r ? 'bg-accent text-white' : 'text-muted hover:text-text'
                          }`}
                        >
                          {r === 'user' ? 'Customer' : 'Worker'}
                        </button>
                      ))}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                      <div>
                        <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5">Full Name</label>
                        <input type="text" required value={name} onChange={e => setName(e.target.value)} className="input" placeholder="Your name" />
                      </div>
                    )}

                    <div>
                      <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5">Email</label>
                      <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="you@example.com" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11px] font-semibold text-muted uppercase tracking-wider">Password</label>
                        {isLogin && (
                          <button type="button" className="text-[11px] text-accent-light hover:underline">Forgot?</button>
                        )}
                      </div>
                      <div className="relative">
                        <input
                          type={showPass ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="input pr-10"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPass(v => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-faint hover:text-muted transition-colors"
                        >
                          {showPass ? (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/><line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                          ) : (
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/></svg>
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-3 mt-2 text-[14px] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                            <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                          </svg>
                          Processing...
                        </span>
                      ) : (isLogin ? 'Sign In' : 'Create Account')}
                    </button>
                  </form>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            /* Admin mode */
            <>
              <div className="mb-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-dim border border-amber/20 flex items-center justify-center text-amber text-[16px]">⚙</div>
                <div>
                  <h1 className="font-semibold text-[17px] text-text">Admin Portal</h1>
                  <p className="text-muted text-[12px]">Restricted access — authorised only</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5">Email</label>
                  <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="input" placeholder="admin@servicenow.com" />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-muted uppercase tracking-wider mb-1.5">Password</label>
                  <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="input" placeholder="••••••••" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full py-3 mt-2 text-[14px] disabled:opacity-50">
                  {loading ? 'Verifying...' : 'Access Admin Panel'}
                </button>
              </form>
            </>
          )}

          {/* Bottom switch */}
          <div className="mt-6 pt-5 border-t border-border text-center">
            <button
              onClick={() => {
                setMode(m => m === 'user' ? 'admin' : 'user');
                setEmail(''); setPassword('');
              }}
              className="text-[12px] text-faint hover:text-muted transition-colors font-mono tracking-wide"
            >
              {isAdmin ? '← Back to user login' : 'Admin portal access →'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
