import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const LoginPage = () => {
  const [tab,      setTab]      = useState<'login' | 'signup'>('login');
  const [admin,    setAdmin]    = useState(false);
  const [role,     setRole]     = useState<'user' | 'worker'>('user');
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const isLogin = tab === 'login';

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin || admin) {
        const { data } = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });
        setUser(data.user);
        toast.success('Welcome back!');
        const r = data.user.role;
        navigate(r === 'worker' ? '/worker' : r === 'admin' ? '/admin' : '/dashboard');
      } else {
        const { data } = await axios.post(`${API_URL}/auth/signup`, { name, email, password, phone: '0000000000', role }, { withCredentials: true });
        setUser(data.user);
        toast.success('Account created!');
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: '#17171f',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 8, padding: '9px 14px',
    color: '#e4e4e8', fontSize: 14, outline: 'none',
    transition: 'border-color 120ms',
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-5 pt-20 pb-12"
      style={{ background: '#09090d' }}
    >
      {/* Very subtle grid bg */}
      <div className="fixed inset-0 bg-grid opacity-60 pointer-events-none" />
      {/* One soft ambient glow */}
      <div className="fixed glow-blob" style={{ width: 400, height: 400, top: '10%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(78,81,174,0.055)' }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full"
        style={{ maxWidth: 380 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="flex items-center gap-2.5">
            <div style={{ width: 32, height: 32, borderRadius: 9, background: '#4e51ae', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5L13.5 4.5V11.5L8 14.5L2.5 11.5V4.5L8 1.5Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M8 6V10M6 8H10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, letterSpacing: '-0.01em', color: '#e4e4e8' }}>
              Service<span style={{ color: '#9496cc' }}>Now</span>
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '28px 28px 24px' }}>

          {!admin ? (
            <>
              {/* Tab switcher */}
              <div style={{ display: 'flex', background: '#17171f', borderRadius: 9, padding: 3, marginBottom: 22, border: '1px solid rgba(255,255,255,0.06)' }}>
                {(['login', 'signup'] as const).map(t => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    style={{
                      flex: 1, padding: '7px 0', borderRadius: 7, fontSize: 13.5, fontWeight: 500,
                      background: tab === t ? '#1e1e28' : 'transparent',
                      color: tab === t ? '#e4e4e8' : '#62627a',
                      border: tab === t ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
                      cursor: 'pointer', transition: 'all 140ms',
                    }}
                  >
                    {t === 'login' ? 'Sign In' : 'Sign Up'}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                >
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ fontWeight: 600, fontSize: 17, color: '#e4e4e8', letterSpacing: '-0.015em', marginBottom: 4 }}>
                      {isLogin ? 'Welcome back' : 'Create your account'}
                    </div>
                    <div style={{ fontSize: 13, color: '#62627a' }}>
                      {isLogin ? 'Sign in to continue to ServiceNow' : 'Get started — it only takes a minute'}
                    </div>
                  </div>

                  {/* Signup role toggle */}
                  {!isLogin && (
                    <div style={{ display: 'flex', background: '#17171f', borderRadius: 8, padding: 3, marginBottom: 16, border: '1px solid rgba(255,255,255,0.06)', gap: 2 }}>
                      {(['user', 'worker'] as const).map(r => (
                        <button
                          key={r}
                          onClick={() => setRole(r)}
                          style={{
                            flex: 1, padding: '6px 0', borderRadius: 6, fontSize: 13, fontWeight: 500,
                            background: role === r ? '#4e51ae' : 'transparent',
                            color: role === r ? 'white' : '#62627a',
                            border: 'none', cursor: 'pointer',
                            transition: 'all 140ms',
                          }}
                        >
                          {r === 'user' ? 'Customer' : 'Worker'}
                        </button>
                      ))}
                    </div>
                  )}

                  <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {!isLogin && (
                      <div>
                        <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#62627a', marginBottom: 5 }}>Full Name</label>
                        <input
                          type="text" required value={name} onChange={e => setName(e.target.value)}
                          placeholder="Your name" style={inputStyle}
                          onFocus={e => { e.target.style.borderColor = 'rgba(78,81,174,0.55)'; e.target.style.background = '#1a1a24'; }}
                          onBlur={e =>  { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = '#17171f'; }}
                        />
                      </div>
                    )}
                    <div>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#62627a', marginBottom: 5 }}>Email</label>
                      <input
                        type="email" required value={email} onChange={e => setEmail(e.target.value)}
                        placeholder="you@example.com" style={inputStyle}
                        onFocus={e => { e.target.style.borderColor = 'rgba(78,81,174,0.55)'; e.target.style.background = '#1a1a24'; }}
                        onBlur={e =>  { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = '#17171f'; }}
                      />
                    </div>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                        <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#62627a' }}>Password</label>
                        {isLogin && <button type="button" style={{ fontSize: 11, color: '#9496cc', background: 'none', border: 'none', cursor: 'pointer' }}>Forgot?</button>}
                      </div>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
                          placeholder="••••••••" style={{ ...inputStyle, paddingRight: 40 }}
                          onFocus={e => { e.target.style.borderColor = 'rgba(78,81,174,0.55)'; e.target.style.background = '#1a1a24'; }}
                          onBlur={e =>  { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = '#17171f'; }}
                        />
                        <button
                          type="button" onClick={() => setShowPw(v => !v)}
                          style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#2a2a35', padding: 0 }}
                        >
                          {showPw
                            ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#62627a" strokeWidth="1.2"/><circle cx="8" cy="8" r="2" stroke="#62627a" strokeWidth="1.2"/><line x1="2" y1="2" x2="14" y2="14" stroke="#62627a" strokeWidth="1.2" strokeLinecap="round"/></svg>
                            : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="#62627a" strokeWidth="1.2"/><circle cx="8" cy="8" r="2" stroke="#62627a" strokeWidth="1.2"/></svg>
                          }
                        </button>
                      </div>
                    </div>
                    <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: 4, fontSize: 14 }}>
                      {loading
                        ? <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" opacity="0.25"/><path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/></svg>
                            Processing…
                          </span>
                        : (isLogin ? 'Sign in' : 'Create account')
                      }
                    </button>
                  </form>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            /* Admin mode */
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(180,83,9,0.10)', border: '1px solid rgba(180,83,9,0.20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>⚙</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#e4e4e8' }}>Admin Portal</div>
                  <div style={{ fontSize: 12, color: '#62627a' }}>Authorised access only</div>
                </div>
              </div>
              <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@servicenow.com" style={inputStyle} />
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
                <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px', marginTop: 4, fontSize: 14 }}>
                  {loading ? 'Verifying…' : 'Access Admin Panel'}
                </button>
              </form>
            </>
          )}

          {/* Footer of card */}
          <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
            <button
              onClick={() => { setAdmin(a => !a); setEmail(''); setPassword(''); }}
              style={{ fontSize: 11, color: '#2a2a35', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#62627a')}
              onMouseLeave={e => (e.currentTarget.style.color = '#2a2a35')}
            >
              {admin ? '← Back to user login' : 'Admin portal →'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
