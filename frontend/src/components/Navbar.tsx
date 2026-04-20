import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [solid, setSolid]   = useState(false);
  const [menu,  setMenu]    = useState(false);

  useEffect(() => {
    const fn = () => setSolid(window.scrollY > 16);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => setMenu(false), [location.pathname]);

  const links = [
    { label: 'Home',        to: '/' },
    { label: 'Services',    to: '/services/cleaning' },
    { label: 'My Bookings', to: '/dashboard', auth: true },
  ];

  const isActive = (to: string) => location.pathname === to;

  const navBg = solid
    ? 'rgba(9,9,13,0.92)'
    : 'transparent';
  const navBorder = solid
    ? '1px solid rgba(255,255,255,0.06)'
    : '1px solid transparent';

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          background: navBg,
          borderBottom: navBorder,
          backdropFilter: solid ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: solid ? 'blur(12px)' : 'none',
          transition: 'background 200ms ease, border-color 200ms ease',
        }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between px-5"
          style={{ height: 60 }}
        >
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 shrink-0"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div
              style={{
                width: 30, height: 30, borderRadius: 8,
                background: '#4e51ae',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
            >
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M8 1.5L13.5 4.5V11.5L8 14.5L2.5 11.5V4.5L8 1.5Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
                <path d="M8 6V10M6 8H10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
            <span style={{ fontWeight: 600, fontSize: 14.5, letterSpacing: '-0.01em', color: '#e4e4e8' }}>
              Service<span style={{ color: '#9496cc' }}>Now</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => {
              if (l.auth && !isAuthenticated) return null;
              const active = isActive(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{
                    fontSize: 13.5, fontWeight: 500, padding: '6px 12px',
                    borderRadius: 8, textDecoration: 'none',
                    color: active ? '#e4e4e8' : '#62627a',
                    background: active ? 'rgba(255,255,255,0.05)' : 'transparent',
                    transition: 'color 120ms, background 120ms',
                  }}
                  onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#e4e4e8'; }}
                  onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.color = '#62627a'; }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hidden sm:flex items-center gap-2.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: '5px 10px 5px 6px',
                    cursor: 'pointer',
                  }}
                >
                  <div className="avatar" style={{ width: 26, height: 26, fontSize: 11 }}>
                    {user?.name?.[0]?.toUpperCase() || 'U'}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 500, color: '#e4e4e8' }}>
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>
                <button
                  onClick={() => { setUser(null); toast.success('Signed out'); navigate('/'); }}
                  className="btn-ghost"
                  style={{ fontSize: 13 }}
                >
                  Sign out
                </button>
              </>
            ) : (
              location.pathname !== '/login' && (
                <button
                  onClick={() => navigate('/login')}
                  className="btn-secondary"
                  style={{ padding: '7px 16px', fontSize: 13 }}
                >
                  Sign in
                </button>
              )
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenu(v => !v)}
              className="md:hidden btn-ghost"
              style={{ padding: 8 }}
              aria-label="Menu"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, width: 18 }}>
                <span style={{ height: 1.5, background: '#62627a', borderRadius: 2, transition: 'all 150ms', transform: menu ? 'rotate(45deg) translateY(5.5px)' : 'none' }} />
                <span style={{ height: 1.5, background: '#62627a', borderRadius: 2, transition: 'all 150ms', opacity: menu ? 0 : 1 }} />
                <span style={{ height: 1.5, background: '#62627a', borderRadius: 2, transition: 'all 150ms', transform: menu ? 'rotate(-45deg) translateY(-5.5px)' : 'none' }} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menu && (
          <div style={{ background: '#111117', borderTop: '1px solid rgba(255,255,255,0.06)', padding: '8px 16px 12px' }}>
            {links.map(l => {
              if (l.auth && !isAuthenticated) return null;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  style={{ display: 'block', padding: '10px 12px', fontSize: 14, color: '#62627a', textDecoration: 'none', borderRadius: 8 }}
                >
                  {l.label}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
};
