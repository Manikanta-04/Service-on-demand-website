import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out');
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'My Bookings', path: '/dashboard', auth: true },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-surface/95 backdrop-blur-md border-b border-border shadow-[0_1px_0_rgba(255,255,255,0.04)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 h-16 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="Service Now Home"
          >
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-accent-glow/40 group-hover:scale-105 transition-transform duration-200">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                <path d="M8 5.5V10.5M5.5 8H10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="font-semibold text-[15px] text-text tracking-tight">Service<span className="text-accent-light">Now</span></span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.auth && !isAuthenticated) return null;
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link px-3 py-2 rounded-lg text-sm ${active ? 'text-text bg-surface2' : ''}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                {/* Avatar pill */}
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-2.5 bg-surface2 border border-border hover:border-border-hover rounded-full pl-3 pr-1.5 py-1.5 transition-all duration-150 group"
                >
                  <span className="hidden sm:block text-[13px] font-medium text-text">{user?.name?.split(' ')[0]}</span>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-accent to-teal flex items-center justify-center text-[11px] font-bold text-white uppercase">
                    {user?.name?.[0] || 'U'}
                  </div>
                </button>
                <button
                  onClick={handleLogout}
                  className="btn-ghost text-[13px] px-3 py-2"
                >
                  Sign out
                </button>
              </div>
            ) : (
              location.pathname !== '/login' && (
                <button
                  onClick={() => navigate('/login')}
                  className="btn-primary text-sm py-2 px-5"
                >
                  Sign In
                </button>
              )
            )}
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden btn-ghost p-2"
              aria-label="Toggle menu"
            >
              <div className="w-5 flex flex-col gap-1">
                <span className={`block h-0.5 bg-muted rounded transition-all ${mobileOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
                <span className={`block h-0.5 bg-muted rounded transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-0.5 bg-muted rounded transition-all ${mobileOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-surface border-b border-border px-5 py-4 flex flex-col gap-1">
            {navLinks.map((link) => {
              if (link.auth && !isAuthenticated) return null;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="nav-link px-3 py-2.5 rounded-lg text-[15px]"
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
};
