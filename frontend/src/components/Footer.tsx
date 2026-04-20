import { useNavigate } from 'react-router-dom';

const COL = { display: 'flex', flexDirection: 'column' as const, gap: 10 };
const LI  = { fontSize: 13, color: '#62627a', cursor: 'pointer', transition: 'color 120ms' };

const LINKS = {
  Company:       ['About Us', 'Careers', 'Blog', 'Contact'],
  Customers:     ['Services', 'Help Center', 'Safety', 'Terms'],
  Professionals: ['Join as a Pro', 'Pro Help Center', 'Success Stories'],
};

export const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer style={{ background: '#0c0c10', borderTop: '1px solid rgba(255,255,255,0.06)', color: '#e4e4e8' }}>
      <div className="max-w-7xl mx-auto px-5 pt-14 pb-8">

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '40px 32px', marginBottom: 40 }}>

          {/* Brand */}
          <div style={{ gridColumn: 'span 2' }}>
            <button onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 14 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: '#4e51ae', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)' }}>
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1.5L13.5 4.5V11.5L8 14.5L2.5 11.5V4.5L8 1.5Z" stroke="white" strokeWidth="1.4" strokeLinejoin="round"/>
                  <path d="M8 6V10M6 8H10" stroke="white" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontWeight: 600, fontSize: 14.5, letterSpacing: '-0.01em', color: '#e4e4e8' }}>
                Service<span style={{ color: '#9496cc' }}>Now</span>
              </span>
            </button>
            <p style={{ fontSize: 13, color: '#62627a', lineHeight: 1.65, maxWidth: 220 }}>
              Connecting you with verified home service professionals across India.
            </p>
            {/* Socials */}
            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              {['T', 'I', 'L'].map((s, i) => (
                <a key={i} href="#" style={{ width: 30, height: 30, borderRadius: 8, background: '#17171f', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#62627a', fontSize: 11, fontWeight: 600, textDecoration: 'none', transition: 'all 120ms' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#e4e4e8'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.13)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#62627a'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([group, items]) => (
            <div key={group} style={COL}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#e4e4e8', marginBottom: 4 }}>{group}</div>
              {items.map(item => (
                <a key={item} href="#"
                  style={LI}
                  onMouseEnter={e => (e.currentTarget.style.color = '#e4e4e8')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#62627a')}>
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
          <span style={{ fontSize: 12, color: '#2a2a35' }}>© 2026 ServiceNow. All rights reserved.</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0b9167' }} />
            <span style={{ fontSize: 12, color: '#2a2a35' }}>All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
