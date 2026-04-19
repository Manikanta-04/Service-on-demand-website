import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [role, setRole] = useState<'user' | 'worker'>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
        setUser(res.data.user);
        toast.success('Successfully logged in!');
        if (res.data.user.role === 'worker') navigate('/worker');
        else if (res.data.user.role === 'admin') navigate('/admin');
        else navigate('/dashboard');
      } else {
        const res = await axios.post(`${API_URL}/auth/signup`, { 
          name, 
          email, 
          password, 
          phone: '0000000000',
          role 
        }, { withCredentials: true });
        setUser(res.data.user);
        toast.success('Successfully signed up!');
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      {/* Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-accent2/20 rounded-full blur-[120px] pointer-events-none" />

      <motion.div 
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="w-full max-w-md glass-card p-8 z-10"
      >
        <div className="text-center mb-8">
          <h2 className="font-display font-bold text-3xl mb-2">
            {isAdminMode ? 'Admin Portal' : (isLogin ? 'Welcome Back' : 'Create Account')}
          </h2>
          <p className="text-muted">
            {isAdminMode ? 'Secure access for administrators' : (isLogin ? 'Enter your credentials to continue' : 'Join our premium service platform')}
          </p>
        </div>

        {/* Role Toggle for Signup */}
        {!isLogin && !isAdminMode && (
          <div className="flex bg-surface2 p-1 rounded-lg mb-6 border border-border">
            <button 
              type="button"
              className={`flex-1 py-2 rounded-md font-medium text-sm transition-colors ${role === 'user' ? 'bg-surface border border-border text-text' : 'text-muted hover:text-text'}`}
              onClick={() => setRole('user')}
            >
              Customer
            </button>
            <button 
              type="button"
              className={`flex-1 py-2 rounded-md font-medium text-sm transition-colors ${role === 'worker' ? 'bg-surface border border-border text-text' : 'text-muted hover:text-text'}`}
              onClick={() => setRole('worker')}
            >
              Worker
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && !isAdminMode && (
            <div>
              <label className="block text-xs font-mono text-faint uppercase tracking-wider mb-1">Full Name</label>
              <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full bg-surface2 border border-border rounded-lg p-3 text-text focus:border-accent outline-none transition-colors" placeholder="John Doe" />
            </div>
          )}
          
          <div>
            <label className="block text-xs font-mono text-faint uppercase tracking-wider mb-1">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-surface2 border border-border rounded-lg p-3 text-text focus:border-accent outline-none transition-colors" placeholder="you@example.com" />
          </div>
          
          <div>
            <label className="block text-xs font-mono text-faint uppercase tracking-wider mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-surface2 border border-border rounded-lg p-3 text-text focus:border-accent outline-none transition-colors" placeholder="••••••••" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-accent text-white font-medium py-3 rounded-lg hover:bg-accent/90 transition-colors mt-6 shadow-[0_4px_14px_rgba(124,110,244,0.39)] disabled:opacity-50">
            {loading ? 'Processing...' : (isLogin || isAdminMode ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        {!isAdminMode && (
          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-muted hover:text-text transition-colors">
              {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
            </button>
          </div>
        )}

        <div className="mt-8 pt-6 border-t border-border/50 text-center flex flex-col items-center">
          <button 
            onClick={() => {
              setIsAdminMode(!isAdminMode);
              setIsLogin(true);
              setEmail('');
              setPassword('');
            }} 
            className="text-xs font-mono tracking-widest uppercase text-faint hover:text-accent transition-colors"
          >
            {isAdminMode ? 'Return to User Login' : 'Admin Portal Access'}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
