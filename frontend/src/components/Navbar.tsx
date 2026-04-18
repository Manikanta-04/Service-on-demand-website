import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

export const Navbar = () => {
  const { user, isAuthenticated, setUser } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Categories', path: '/categories' },
    { name: 'My Bookings', path: '/dashboard', auth: true },
    { name: 'Profile', path: '/profile', auth: true }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/95 backdrop-blur-lg border-b border-border px-6 py-4 flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-10">
        <div 
          className="font-display font-bold text-2xl tracking-tight cursor-pointer text-text flex items-center gap-2"
          onClick={() => navigate('/')}
        >
          <span className="text-accent">◆</span> Service Now
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            if (link.auth && !isAuthenticated) return null;
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-base font-medium transition-all px-2 ${isActive ? 'text-accent border-b-2 border-accent pb-1' : 'text-muted hover:text-text pb-1 border-b-2 border-transparent'}`}
              >
                {link.name}
              </Link>
            )
          })}
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <div className="flex items-center gap-4 bg-surface2/50 border border-border rounded-full pl-4 pr-2 py-1 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="hidden md:flex flex-col items-end mr-1">
              <span className="text-sm font-bold text-text leading-tight">{user?.name}</span>
              <span className="text-[10px] text-accent uppercase tracking-widest font-bold">{user?.role}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-white font-bold uppercase shadow-inner">
              {user?.name?.[0] || 'U'}
            </div>
            <div className="h-6 w-px bg-border"></div>
            <button 
              onClick={handleLogout}
              className="text-sm text-text hover:text-accent3 font-medium transition-colors px-3 py-2"
            >
              Logout
            </button>
          </div>
        ) : (
          location.pathname !== '/login' && (
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-bold bg-text text-surface px-6 py-2.5 rounded-full hover:bg-white transition-all shadow-md"
            >
              Sign In
            </button>
          )
        )}
      </div>
    </nav>
  );
};
