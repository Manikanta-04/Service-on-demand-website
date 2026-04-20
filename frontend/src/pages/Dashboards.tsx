import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const STATUS: Record<string, { label: string; color: string; bg: string }> = {
  PENDING:   { label: 'Pending',   color: '#fb923c', bg: 'rgba(180,83,9,0.10)'  },
  CONFIRMED: { label: 'Confirmed', color: '#4ade80', bg: 'rgba(21,128,61,0.10)' },
  COMPLETED: { label: 'Completed', color: '#62627a', bg: 'rgba(255,255,255,0.05)'},
  CANCELLED: { label: 'Cancelled', color: '#62627a', bg: 'rgba(255,255,255,0.04)'},
};

const S = { background: '#09090d', color: '#e4e4e8', minHeight: '100vh', paddingTop: 60 };
const card: React.CSSProperties = { background: '#111117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)' };
const label: React.CSSProperties = { fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#62627a', marginBottom: 6 };

/* ── USER DASHBOARD ──────────────────────── */
export const UserDashboard = () => {
  const { user } = useAuthStore();
  const [tab, setTab]         = useState<'overview' | 'bookings' | 'reviews'>('overview');
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats]       = useState({ upcoming: 0, spent: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API}/bookings`, { withCredentials: true }).then(r => {
      const d = r.data.bookings || [];
      setBookings(d);
      setStats({ upcoming: d.filter((b: any) => ['PENDING','CONFIRMED'].includes(b.status)).length, spent: d.reduce((s: number, b: any) => s + (b.finalAmount || 0), 0) });
    }).catch(() => {});
  }, []);

  const initials = (user?.name || 'U').split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();

  const sideItems = [
    { id: 'overview',  label: 'Overview' },
    { id: 'bookings',  label: 'My Bookings' },
    { id: 'reviews',   label: 'Reviews' },
  ];

  return (
    <div style={S}>
      <div className="max-w-7xl mx-auto px-5 py-10 pb-24 flex flex-col md:flex-row gap-6">

        {/* Sidebar */}
        <aside style={{ width: '100%', maxWidth: 220, flexShrink: 0 }}>
          <div style={{ ...card, padding: '20px 14px' }} className="md:sticky top-24">
            {/* User pill */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#4e51ae,#0b9167)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{initials}</div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ fontWeight: 600, fontSize: 13, color: '#e4e4e8', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name}</div>
                <div style={{ fontSize: 11, color: '#62627a' }}>Customer</div>
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sideItems.map(s => (
                <button key={s.id} onClick={() => setTab(s.id as any)}
                  style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, fontSize: 13.5, fontWeight: 500, border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', transition: 'all 100ms',
                    background: tab === s.id ? 'rgba(78,81,174,0.10)' : 'transparent',
                    color: tab === s.id ? '#e4e4e8' : '#62627a',
                  }}>
                  {s.label}
                </button>
              ))}
            </nav>

            <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <button onClick={() => navigate('/')} className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '8px 0', fontSize: 13 }}>
                + Book service
              </button>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <motion.div key={tab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>

            {tab === 'overview' && (
              <div>
                <h2 style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', color: '#e4e4e8', marginBottom: 24 }}>Dashboard</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 12, marginBottom: 20 }}>
                  {[
                    { label: 'Upcoming',    value: stats.upcoming, borderColor: '#4e51ae' },
                    { label: 'Total spent', value: `₹${stats.spent.toLocaleString()}`, borderColor: '#0b9167' },
                  ].map(sc => (
                    <div key={sc.label} style={{ ...card, padding: '20px 22px', borderLeft: `2px solid ${sc.borderColor}` }}>
                      <div style={label}>{sc.label}</div>
                      <div style={{ fontWeight: 600, fontSize: 28, color: '#e4e4e8', letterSpacing: '-0.03em' }}>{sc.value}</div>
                    </div>
                  ))}
                </div>
                <div style={{ ...card, padding: '40px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🔍</div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: '#e4e4e8', marginBottom: 6 }}>Need something done?</div>
                  <div style={{ fontSize: 13, color: '#62627a', marginBottom: 20 }}>Browse our 45+ categories with upfront pricing.</div>
                  <button onClick={() => navigate('/')} className="btn-secondary" style={{ padding: '8px 20px', fontSize: 13 }}>Explore categories</button>
                </div>
              </div>
            )}

            {tab === 'bookings' && (
              <div>
                <h2 style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', color: '#e4e4e8', marginBottom: 24 }}>My Bookings</h2>
                {bookings.length === 0 ? (
                  <div style={{ ...card, padding: '60px 24px', textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 12 }}>📋</div>
                    <div style={{ color: '#62627a', fontSize: 14, marginBottom: 20 }}>No bookings yet.</div>
                    <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }}>Book your first service</button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {bookings.map((b, i) => {
                      const sc = STATUS[b.status] || STATUS.PENDING;
                      return (
                        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                          style={{ ...card, padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 5, background: sc.bg, color: sc.color }}>{sc.label}</span>
                              <span style={{ fontSize: 11, color: '#2a2a35', fontFamily: 'JetBrains Mono, monospace' }}>{b.slotDate} · {b.slotTime}</span>
                            </div>
                            <div style={{ fontWeight: 500, fontSize: 14, color: '#e4e4e8' }}>{b.serviceId?.name || 'Service Booking'}</div>
                            <div style={{ fontSize: 12, color: '#62627a', marginTop: 2 }}>Pro: {b.workerId?.name || 'Awaiting assignment'}</div>
                          </div>
                          <div style={{ textAlign: 'right', flexShrink: 0 }}>
                            <div style={{ fontWeight: 600, fontSize: 17, color: '#e4e4e8' }}>₹{b.finalAmount}</div>
                            <button style={{ fontSize: 11, color: '#9496cc', background: 'none', border: 'none', cursor: 'pointer', marginTop: 4 }}>Invoice</button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {tab === 'reviews' && (
              <div>
                <h2 style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', color: '#e4e4e8', marginBottom: 24 }}>Reviews</h2>
                <div style={{ ...card, padding: '60px 24px', textAlign: 'center' }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>★</div>
                  <div style={{ color: '#62627a', fontSize: 14 }}>No reviews submitted yet.</div>
                </div>
              </div>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

/* ── WORKER DASHBOARD ────────────────────── */
export const WorkerDashboard = () => {
  const { user } = useAuthStore();
  const stats = [
    { label: "Today's jobs",  value: '3',      sub: 'Scheduled',       border: '#b87d10' },
    { label: 'This week',     value: '₹4,200', sub: 'Earned',          border: '#0b9167' },
    { label: 'Avg rating',    value: '4.9 ★',  sub: '120 reviews',     border: '#4e51ae' },
  ];

  return (
    <div style={S}>
      <div className="max-w-5xl mx-auto px-5 py-10 pb-24">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 12 }}>
          <div>
            <h2 style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', color: '#e4e4e8' }}>Worker Portal</h2>
            <div style={{ fontSize: 13, color: '#62627a', marginTop: 2 }}>Hello, {user?.name?.split(' ')[0]} 👋</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#111117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 20, padding: '6px 14px' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#0b9167', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 500, color: '#0b9167' }}>Available</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12, marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.label} style={{ ...card, padding: '20px 22px', borderLeft: `2px solid ${s.border}` }}>
              <div style={label}>{s.label}</div>
              <div style={{ fontWeight: 600, fontSize: 24, color: '#e4e4e8', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#62627a', marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ ...card, padding: '20px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 10, background: 'rgba(180,83,9,0.10)', border: '1px solid rgba(180,83,9,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>🔔</div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ fontWeight: 600, fontSize: 14, color: '#e4e4e8' }}>New Job: Deep Cleaning</div>
                <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 7px', borderRadius: 5, background: 'rgba(180,83,9,0.10)', color: '#fb923c' }}>New</span>
              </div>
              <div style={{ fontSize: 13, color: '#62627a', marginBottom: 16 }}>Banjara Hills · 2.5 km · ₹1,499 · Today 3:00 PM</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-primary" style={{ padding: '7px 18px', fontSize: 13 }}>Accept</button>
                <button className="btn-secondary" style={{ padding: '7px 18px', fontSize: 13 }}>Decline</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ── ADMIN DASHBOARD ─────────────────────── */
export const AdminDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, revenue: 0, workers: 84, rating: 4.8 });

  useEffect(() => {
    axios.get(`${API}/bookings/all`, { withCredentials: true }).then(r => {
      const d = r.data.bookings || [];
      setBookings(d);
      setStats(s => ({ ...s, total: d.length, revenue: d.reduce((a: number, b: any) => a + (b.finalAmount || 0), 0) }));
    }).catch(() => {});
  }, []);

  const statCards = [
    { label: 'Total bookings', value: stats.total,                         border: '#4e51ae' },
    { label: 'Revenue',        value: `₹${stats.revenue.toLocaleString()}`,border: '#0b9167' },
    { label: 'Active workers', value: stats.workers,                        border: '#b87d10' },
    { label: 'Avg rating',     value: `${stats.rating} ★`,                 border: '#15803d' },
  ];

  const sideLinks = ['Overview', 'Bookings', 'Workers', 'Services'];
  const [activeLink, setActiveLink] = useState('Overview');

  return (
    <div style={S}>
      <div className="max-w-7xl mx-auto px-5 py-10 pb-24 flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside style={{ width: '100%', maxWidth: 200, flexShrink: 0 }}>
          <div style={{ ...card, padding: '20px 14px' }} className="md:sticky top-24">
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#2a2a35', marginBottom: 12, paddingLeft: 12 }}>Admin Panel</div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {sideLinks.map(l => (
                <button key={l} onClick={() => setActiveLink(l)}
                  style={{ display: 'flex', alignItems: 'center', padding: '8px 12px', borderRadius: 8, fontSize: 13.5, fontWeight: 500, border: 'none', cursor: 'pointer', textAlign: 'left', width: '100%',
                    background: activeLink === l ? 'rgba(78,81,174,0.10)' : 'transparent',
                    color: activeLink === l ? '#e4e4e8' : '#62627a',
                  }}>
                  {l}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <h2 style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', color: '#e4e4e8', marginBottom: 24 }}>Platform Overview</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginBottom: 20 }}>
            {statCards.map(sc => (
              <div key={sc.label} style={{ ...card, padding: '18px 22px', borderTop: `2px solid ${sc.border}` }}>
                <div style={label}>{sc.label}</div>
                <div style={{ fontWeight: 600, fontSize: 24, color: '#e4e4e8', letterSpacing: '-0.02em' }}>{sc.value}</div>
              </div>
            ))}
          </div>

          {/* Bookings table */}
          <div style={{ ...card, overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: '#e4e4e8' }}>Recent Bookings</div>
              <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 5, background: 'rgba(255,255,255,0.05)', color: '#62627a' }}>{bookings.length} total</span>
            </div>
            {bookings.length === 0 ? (
              <div style={{ padding: '50px 24px', textAlign: 'center', color: '#62627a', fontSize: 14 }}>No bookings found.</div>
            ) : (
              <div>
                {bookings.slice(0, 8).map((b, i) => {
                  const sc = STATUS[b.status] || STATUS.PENDING;
                  return (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', borderBottom: i < 7 ? '1px solid rgba(255,255,255,0.04)' : 'none', transition: 'background 100ms' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <div>
                        <div style={{ fontWeight: 500, fontSize: 13.5, color: '#e4e4e8' }}>{b.serviceId?.name || 'Unknown'}</div>
                        <div style={{ fontSize: 12, color: '#62627a', marginTop: 2 }}>{b.userId?.name || '—'} · {b.slotDate} {b.slotTime}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontWeight: 600, fontSize: 14, color: '#e4e4e8' }}>₹{b.finalAmount}</span>
                        <span style={{ fontSize: 11, fontWeight: 600, padding: '2px 8px', borderRadius: 5, background: sc.bg, color: sc.color }}>{sc.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};
