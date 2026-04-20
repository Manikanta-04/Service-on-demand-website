import { useNavigate } from 'react-router-dom';

const links = {
  Company:   ['About Us', 'Careers', 'Blog', 'Contact'],
  Customers: ['Services', 'Help Center', 'Safety', 'Terms'],
  Pros:      ['Join as a Pro', 'Pro Help Center', 'Success Stories'],
};

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-5 pt-14 pb-8">

        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">

          {/* Brand */}
          <div className="col-span-2">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2.5 mb-4 group"
            >
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center group-hover:scale-105 transition-transform">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1L14 4.5V11.5L8 15L2 11.5V4.5L8 1Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M8 5.5V10.5M5.5 8H10.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span className="font-semibold text-[16px] text-text">Service<span className="text-accent-light">Now</span></span>
            </button>
            <p className="text-muted text-[13px] leading-relaxed max-w-[220px]">
              Your trusted partner for home services. Connecting you with verified professionals instantly.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-5">
              {['Twitter', 'Instagram', 'LinkedIn'].map(s => (
                <a
                  key={s}
                  href="#"
                  className="w-8 h-8 rounded-lg bg-surface2 border border-border flex items-center justify-center text-faint hover:text-text hover:border-border-hover transition-all"
                  aria-label={s}
                >
                  <span className="text-[11px] font-mono">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h5 className="font-semibold text-[12px] text-text uppercase tracking-widest mb-4">{group}</h5>
              <ul className="space-y-2.5">
                {items.map(link => (
                  <li key={link}>
                    <a href="#" className="text-[13px] text-muted hover:text-text transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="pt-7 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-faint">© 2026 ServiceNow. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
            <span className="text-[12px] text-faint">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
