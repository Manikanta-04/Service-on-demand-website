import { useAuthStore } from '../store/useAuthStore';
import { motion } from 'framer-motion';

export const ProfilePage = () => {
  const { user } = useAuthStore();

  return (
    <div className="min-h-screen bg-surface pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display font-bold text-4xl text-text mb-8">My Profile</h1>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface2/50 border border-border rounded-2xl p-8 shadow-lg"
        >
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent2 flex items-center justify-center text-white font-display text-4xl font-bold shadow-inner">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-text">{user?.name || 'User Name'}</h2>
              <p className="text-muted text-lg capitalize tracking-wide">{user?.role || 'Customer'}</p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-faint uppercase tracking-wider mb-2 block">Email Address</label>
              <div className="bg-surface border border-border rounded-lg p-4 text-text font-medium">
                {user?.email || 'user@example.com'}
              </div>
            </div>
            
            <div>
              <label className="text-sm font-bold text-faint uppercase tracking-wider mb-2 block">Account Status</label>
              <div className="flex items-center gap-3 bg-surface border border-border rounded-lg p-4">
                <span className="w-3 h-3 rounded-full bg-accent2"></span>
                <span className="text-text font-medium">Active & Verified</span>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-border/50 flex justify-end">
            <button className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors shadow-md">
              Edit Profile
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
