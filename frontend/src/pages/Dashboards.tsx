import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const statusConfig: Record<string, { label: string; cls: string }> = {
  PENDING:   { label: 'Pending',   cls: 'badge-warning' },
  CONFIRMED: { label: 'Confirmed', cls: 'badge-success' },
  COMPLETED: { label: 'Completed', cls: 'badge-muted'   },
  CANCELLED: { label: 'Cancelled', cls: 'badge badge-muted opacity-60' },
};

type Tab = 'overview' | 'bookings' | 'reviews';

/* ─────────── USER DASHBOARD ─────────── */
export const UserDashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ upcoming: 0, total: 0 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [tab, setTab] = useState<Tab>('overview');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/bookings`, { withCredentials: true })
      .then(res => {
        const data = res.data.bookings || [];
        setBookings(data);
        const upcoming = data.filter((b: any) => ['PENDING', 'CONFIRMED'].includes(b.status)).length;
        const total = data.reduce((s: number, b: any) => s + (b.finalAmount || 0), 0);
        setStats({ upcoming, total });
      })
      .catch(() => {});
  }, []);

  const sideItems = [
    { id: 'overview' as Tab, label: 'Overview',    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'bookings' as Tab, label: 'My Bookings',  icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { id: 'reviews' as Tab,  label: 'My Reviews',   icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
  ];

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-7xl mx-auto px-5 py-10 pb-24 flex flex-col md:flex-row gap-7">

        {/* ── Sidebar ── */}
        <aside className="w-full md:w-60 shrink-0">
          <div className="card p-5 md:sticky md:top-24">
            {/* User info */}
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-border">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-teal flex items-center justify-center text-white font-semibold text-[14px]">
                {user?.name?.[0] || 'U'}
              </div>
              <div className="overflow-hidden">
                <div className="font-semibold text-[14px] text-text truncate">{user?.name}</div>
                <div className="text-[11px] text-muted truncate">{user?.email}</div>
              </div>
            </div>

            <nav className="space-y-1">
              {sideItems.map(s => (
                <button
                  key={s.id}
                  onClick={() => setTab(s.id)}
                  className={`sidebar-item w-full ${tab === s.id ? 'active' : ''}`}
                >
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d={s.icon} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {s.label}
                </button>
              ))}
            </nav>

            <div className="mt-6 pt-5 border-t border-border">
              <button
                onClick={() => navigate('/')}
                className="btn-primary w-full text-[13px] py-2.5"
              >
                + Book a service
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main ── */}
        <main className="flex-1 min-w-0">

          {tab === 'overview' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="font-semibold text-2xl text-text mb-7">Dashboard</h2>

              {/* Stat cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <div className="stat-card border-l-2 border-l-accent">
                  <div className="text-[11px] uppercase tracking-widest text-muted mb-1">Upcoming</div>
                  <div className="font-semibold text-3xl text-text">{stats.upcoming}</div>
                  <div className="text-[12px] text-faint mt-0.5">Active bookings</div>
                </div>
                <div className="stat-card border-l-2 border-l-teal">
                  <div className="text-[11px] uppercase tracking-widest text-muted mb-1">Total spent</div>
                  <div className="font-semibold text-3xl text-text">₹{stats.total.toLocaleString()}</div>
                  <div className="text-[12px] text-faint mt-0.5">All time</div>
                </div>
              </div>

              {/* CTA */}
              <div className="card p-8 text-center" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(45,212,191,0.04) 100%)' }}>
                <div className="w-12 h-12 rounded-2xl bg-accent-dim border border-accent/20 flex items-center justify-center mx-auto mb-4 text-[22px]">🔍</div>
                <h3 className="font-semibold text-[17px] text-text mb-2">Need a service?</h3>
                <p className="text-muted text-[14px] mb-5 max-w-sm mx-auto">Browse verified professionals across 45+ cities with upfront pricing.</p>
                <button onClick={() => navigate('/')} className="btn-secondary text-[13px]">Explore Categories</button>
              </div>
            </motion.div>
          )}

          {tab === 'bookings' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="font-semibold text-2xl text-text mb-7">My Bookings</h2>
              {bookings.length === 0 ? (
                <div className="card p-14 text-center">
                  <div className="text-[40px] mb-4">📋</div>
                  <p className="text-muted">You have no bookings yet.</p>
                  <button onClick={() => navigate('/')} className="btn-primary mt-5 text-[13px]">Book your first service</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((b, i) => {
                    const sc = statusConfig[b.status] || statusConfig.PENDING;
                    return (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="card p-5 flex flex-col sm:flex-row gap-4 justify-between"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`badge ${sc.cls}`}>{sc.label}</span>
                            <span className="text-[12px] text-faint font-mono">{b.slotDate} · {b.slotTime}</span>
                          </div>
                          <h4 className="font-semibold text-[15px] text-text">{b.serviceId?.name || 'Service Booking'}</h4>
                          <p className="text-[12px] text-muted mt-0.5">Professional: {b.workerId?.name || 'Awaiting assignment'}</p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2 shrink-0">
                          <div className="font-semibold text-[18px] text-text">₹{b.finalAmount}</div>
                          <button className="text-[12px] text-accent-light hover:underline">Download invoice</button>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}

          {tab === 'reviews' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="font-semibold text-2xl text-text mb-7">My Reviews</h2>
              <div className="card p-14 text-center">
                <div className="text-[40px] mb-4">★</div>
                <p className="text-muted">You haven't submitted any reviews yet.</p>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

/* ─────────── WORKER DASHBOARD ─────────── */
export const WorkerDashboard = () => {
  const { user } = useAuthStore();
  const statCards = [
    { label: "Today's Jobs", value: '3',    sub: 'Scheduled',    color: 'border-l-amber' },
    { label: 'This Week',    value: '₹4,200', sub: 'Earned',     color: 'border-l-teal'  },
    { label: 'Avg Rating',   value: '4.9',  sub: 'From 120 reviews', color: 'border-l-accent' },
  ];

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-6xl mx-auto px-5 py-10 pb-24">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-9">
          <div>
            <h2 className="font-semibold text-2xl text-text">Worker Portal</h2>
            <p className="text-muted text-[14px] mt-1">Hello, {user?.name?.split(' ')[0]} 👋</p>
          </div>
          <div className="flex items-center gap-2 bg-surface2 border border-border rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-[13px] font-medium text-teal">Online</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statCards.map((s, i) => (
            <div key={i} className={`stat-card border-l-2 ${s.color}`}>
              <div className="text-[11px] uppercase tracking-widest text-muted">{s.label}</div>
              <div className="font-semibold text-2xl text-text mt-1">{s.value}</div>
              <div className="text-[12px] text-faint">{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Job alert */}
        <div className="card p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-dim border border-amber/20 flex items-center justify-center text-amber text-[18px] shrink-0">🔔</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-[15px] text-text">New Job: Deep Cleaning</h4>
                <span className="badge badge-warning text-[10px]">New</span>
              </div>
              <p className="text-muted text-[13px] mb-4">Banjara Hills · 2.5 km away · ₹1,499 · Today 3:00 PM</p>
              <div className="flex gap-3">
                <button className="btn-primary text-[13px] py-2 px-5">Accept Job</button>
                <button className="btn-secondary text-[13px] py-2 px-5">Decline</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────── ADMIN DASHBOARD ─────────── */
export const AdminDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, revenue: 0, workers: 84, avgRating: 4.8 });
  const [sideTab, setSideTab] = useState('overview');

  useEffect(() => {
    axios.get(`${API_URL}/bookings/all`, { withCredentials: true })
      .then(res => {
        const data = res.data.bookings || [];
        setBookings(data);
        const revenue = data.reduce((s: number, b: any) => s + (b.finalAmount || 0), 0);
        setStats(st => ({ ...st, total: data.length, revenue }));
      })
      .catch(() => {});
  }, []);

  const sideItems = ['Overview', 'Bookings', 'Workers', 'Services'];

  const adminStats = [
    { label: 'Total Bookings', value: stats.total,                       color: 'border-t-accent',  sub: 'All time' },
    { label: 'Revenue',        value: `₹${stats.revenue.toLocaleString()}`, color: 'border-t-teal',  sub: 'Cumulative' },
    { label: 'Active Workers', value: stats.workers,                     color: 'border-t-amber',   sub: 'Onboarded' },
    { label: 'Avg Rating',     value: stats.avgRating,                   color: 'border-t-success', sub: 'Platform wide' },
  ];

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-7xl mx-auto px-5 py-10 pb-24 flex flex-col md:flex-row gap-7">

        {/* Sidebar */}
        <aside className="w-full md:w-56 shrink-0">
          <div className="card p-5 md:sticky md:top-24">
            <div className="text-[11px] uppercase tracking-widest text-faint font-semibold mb-4 px-1">Admin Panel</div>
            <nav className="space-y-1">
              {sideItems.map(s => (
                <button
                  key={s}
                  onClick={() => setSideTab(s.toLowerCase())}
                  className={`sidebar-item w-full ${sideTab === s.toLowerCase() ? 'active' : ''}`}
                >
                  {s}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <h2 className="font-semibold text-2xl text-text mb-7">Platform Overview</h2>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {adminStats.map((s, i) => (
              <div key={i} className={`stat-card border-t-2 ${s.color}`}>
                <div className="text-[11px] uppercase tracking-widest text-muted">{s.label}</div>
                <div className="font-semibold text-2xl text-text mt-1">{s.value}</div>
                <div className="text-[12px] text-faint">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Recent bookings table */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <h3 className="font-semibold text-[15px] text-text">Recent Bookings</h3>
              <span className="badge badge-muted">{bookings.length} total</span>
            </div>

            {bookings.length === 0 ? (
              <div className="py-16 text-center text-muted">No bookings found.</div>
            ) : (
              <div className="divide-y divide-border">
                {bookings.slice(0, 8).map((b, i) => {
                  const sc = statusConfig[b.status] || statusConfig.PENDING;
                  return (
                    <div key={i} className="flex items-center justify-between px-6 py-4 hover:bg-surface2/40 transition-colors">
                      <div>
                        <div className="font-medium text-[14px] text-text">{b.serviceId?.name || 'Unknown Service'}</div>
                        <div className="text-[12px] text-muted mt-0.5">{b.userId?.name || 'Unknown'} · {b.slotDate} {b.slotTime}</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-semibold text-[15px] text-text">₹{b.finalAmount}</span>
                        <span className={`badge ${sc.cls}`}>{sc.label}</span>
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
