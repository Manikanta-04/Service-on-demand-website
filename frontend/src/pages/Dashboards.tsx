import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const API_URL = 'http://localhost:5000/api';

export const UserDashboard = () => {
  const [stats, setStats] = useState({ upcoming: 0, total: 0 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'reviews'>('overview');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_URL}/bookings`, { withCredentials: true })
      .then(res => {
        const data = res.data.bookings || [];
        setBookings(data);
        const upcoming = data.filter((b: any) => b.status === 'PENDING' || b.status === 'CONFIRMED').length;
        const total = data.reduce((sum: number, b: any) => sum + (b.finalAmount || 0), 0);
        setStats({ upcoming, total });
      })
      .catch(() => setStats({ upcoming: 0, total: 0 }));
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 pb-20">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0 glass-card p-6 h-fit md:sticky md:top-24">
        <h2 className="font-display font-bold text-xl mb-8">My Account</h2>
        <nav className="space-y-2 text-muted">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-accent/10 text-accent font-medium' : 'hover:bg-surface2 hover:text-text'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('bookings')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'bookings' ? 'bg-accent/10 text-accent font-medium' : 'hover:bg-surface2 hover:text-text'}`}
          >
            My Bookings
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${activeTab === 'reviews' ? 'bg-accent/10 text-accent font-medium' : 'hover:bg-surface2 hover:text-text'}`}
          >
            My Reviews
          </button>
        </nav>
        <div className="mt-8 pt-6 border-t border-border">
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-accent text-white py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
          >
            Book New Service
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {activeTab === 'overview' && (
          <>
            <h2 className="font-display text-4xl font-bold mb-8">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="glass-card p-6 border-l-4 border-l-accent">
                <div className="text-muted text-sm uppercase tracking-wider mb-2">Upcoming Services</div>
                <div className="font-display text-4xl font-bold text-text">{stats.upcoming}</div>
              </div>
              <div className="glass-card p-6 border-l-4 border-l-accent2">
                <div className="text-muted text-sm uppercase tracking-wider mb-2">Total Spent</div>
                <div className="font-display text-4xl font-bold text-text">₹{stats.total}</div>
              </div>
            </div>
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent text-2xl">★</div>
              <h3 className="font-bold text-xl mb-2">Need something done?</h3>
              <p className="text-muted mb-6">Browse our premium categories and book a top-rated professional today.</p>
              <button onClick={() => navigate('/')} className="bg-surface2 border border-border px-6 py-2 rounded-lg hover:border-accent hover:text-accent transition-colors">Explore Categories</button>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <>
            <h2 className="font-display text-4xl font-bold mb-8">My Bookings</h2>
            {bookings.length === 0 ? (
              <div className="glass-card p-12 text-center text-muted">
                You have no bookings yet.
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((b, idx) => (
                  <div key={idx} className="glass-card p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                          b.status === 'CONFIRMED' ? 'bg-accent2/10 text-accent2' :
                          b.status === 'PENDING' ? 'bg-accent4/10 text-accent4' :
                          'bg-surface2 text-muted'
                        }`}>
                          {b.status}
                        </span>
                        <span className="text-sm text-faint font-mono">{b.slotDate} at {b.slotTime}</span>
                      </div>
                      <h4 className="font-bold text-lg">{b.serviceId?.name || 'Service Booking'}</h4>
                      <p className="text-sm text-muted">Worker: {b.workerId?.name || 'Unassigned'}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-2">
                      <div className="font-display font-bold text-xl">₹{b.finalAmount}</div>
                      <button className="text-xs text-accent hover:underline">Download Invoice</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'reviews' && (
          <div className="glass-card p-12 text-center text-muted">
            You haven't submitted any reviews yet.
          </div>
        )}
      </div>
    </div>
  );
};

export const WorkerDashboard = () => {
  return (
    <div className="min-h-screen pt-24 px-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-display text-4xl font-bold">Worker Portal</h2>
        <div className="flex items-center gap-3 bg-surface border border-border px-4 py-2 rounded-full">
          <span className="w-3 h-3 rounded-full bg-accent2 animate-pulse" />
          <span className="text-sm font-mono text-accent2">AVAILABLE</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-card p-6">
          <div className="text-muted text-sm uppercase tracking-wider mb-2">Today's Jobs</div>
          <div className="font-display text-3xl font-bold text-accent3">3</div>
        </div>
        <div className="glass-card p-6">
          <div className="text-muted text-sm uppercase tracking-wider mb-2">Earnings</div>
          <div className="font-display text-3xl font-bold text-accent2">₹850</div>
        </div>
      </div>
      
      <div className="glass-card p-6 border-l-4 border-l-accent3">
        <h4 className="font-bold text-lg mb-2">New Job Alert: Deep Cleaning</h4>
        <p className="text-muted mb-4">Location: Banjara Hills, 2.5km away</p>
        <button className="bg-accent3 text-white px-6 py-2 rounded-lg font-medium hover:bg-accent3/90">Accept Job</button>
      </div>
    </div>
  );
};

export const AdminDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, revenue: 0, workers: 84, avgRating: 4.8 });

  useEffect(() => {
    axios.get(`${API_URL}/bookings/all`, { withCredentials: true })
      .then(res => {
        const data = res.data.bookings || [];
        setBookings(data);
        const revenue = data.reduce((sum: number, b: any) => sum + (b.finalAmount || 0), 0);
        setStats(s => ({ ...s, total: data.length, revenue }));
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 max-w-7xl mx-auto flex gap-8 pb-20">
      {/* Sidebar */}
      <div className="w-64 shrink-0 glass-card p-6 h-[80vh] sticky top-24 hidden md:block">
        <h2 className="font-display font-bold text-xl mb-8">Admin Panel</h2>
        <nav className="space-y-4 text-muted">
          <div className="text-accent cursor-pointer font-bold">Overview</div>
          <div className="hover:text-text cursor-pointer transition-colors">Services</div>
          <div className="hover:text-text cursor-pointer transition-colors">Workers</div>
          <div className="hover:text-text cursor-pointer transition-colors">Bookings</div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <h2 className="font-display text-4xl font-bold mb-8">Platform Overview</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="glass-card p-6 border-t-2 border-t-accent">
            <div className="text-muted text-xs uppercase tracking-wider mb-2 font-mono">Total Bookings</div>
            <div className="font-display text-3xl font-bold">{stats.total}</div>
          </div>
          <div className="glass-card p-6 border-t-2 border-t-accent2">
            <div className="text-muted text-xs uppercase tracking-wider mb-2 font-mono">Revenue</div>
            <div className="font-display text-3xl font-bold">₹{stats.revenue.toLocaleString()}</div>
          </div>
          <div className="glass-card p-6 border-t-2 border-t-accent4">
            <div className="text-muted text-xs uppercase tracking-wider mb-2 font-mono">Active Workers</div>
            <div className="font-display text-3xl font-bold">{stats.workers}</div>
          </div>
          <div className="glass-card p-6 border-t-2 border-t-accent3">
            <div className="text-muted text-xs uppercase tracking-wider mb-2 font-mono">Avg Rating</div>
            <div className="font-display text-3xl font-bold">{stats.avgRating}</div>
          </div>
        </div>

        <div className="glass-card p-6 min-h-[400px]">
          <h3 className="font-bold mb-6 text-xl">Recent Bookings</h3>
          {bookings.length === 0 ? (
            <div className="text-muted text-center pt-20">No active bookings found.</div>
          ) : (
            <div className="space-y-4">
              {bookings.slice(0, 5).map((b, idx) => (
                <div key={idx} className="bg-surface2/50 border border-border p-4 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-text">{b.serviceId?.name || 'Unknown Service'}</h4>
                    <p className="text-xs text-muted mt-1">{b.userId?.name || 'Unknown User'} • {b.slotDate} {b.slotTime}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-bold text-accent">₹{b.finalAmount}</span>
                    <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                      b.status === 'CONFIRMED' ? 'bg-accent2/10 text-accent2' :
                      b.status === 'PENDING' ? 'bg-accent4/10 text-accent4' :
                      'bg-surface text-muted'
                    }`}>
                      {b.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
