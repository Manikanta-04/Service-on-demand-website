import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const roleLabel: Record<string, string> = {
  user:   'Customer',
  worker: 'Professional',
  admin:  'Administrator',
};

const Field = ({ label, value, type = 'text', editing, onChange }: {
  label: string; value: string; type?: string; editing: boolean; onChange: (v: string) => void;
}) => (
  <div>
    <label className="block text-[11px] font-semibold uppercase tracking-widest text-muted mb-1.5">{label}</label>
    {editing ? (
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input"
      />
    ) : (
      <div className="bg-surface2 border border-border rounded-lg px-4 py-3 text-[14px] text-text">
        {value || <span className="text-faint">—</span>}
      </div>
    )}
  </div>
);

export const ProfilePage = () => {
  const { user } = useAuthStore();
  const [editing, setEditing] = useState(false);
  const [name, setName]   = useState(user?.name  || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('');

  const handleSave = () => {
    // TODO: persist via API
    toast.success('Profile updated');
    setEditing(false);
  };

  const initials = (user?.name || 'U')
    .split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-2xl mx-auto px-5 py-12 pb-24">

        {/* Page header */}
        <div className="mb-8">
          <h1 className="font-semibold text-2xl text-text">My Profile</h1>
          <p className="text-muted text-[14px] mt-1">Manage your personal information and preferences</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="card overflow-hidden"
        >
          {/* Avatar + name header */}
          <div className="px-7 py-6 border-b border-border flex items-center gap-5"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(45,212,191,0.04) 100%)' }}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-teal flex items-center justify-center text-white font-bold text-xl shadow-accent-glow/30">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-success border-2 border-surface" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[18px] text-text truncate">{user?.name || 'Your Name'}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge badge-accent text-[10px]">{roleLabel[user?.role || 'user']}</span>
                <span className="text-[12px] text-faint">Verified account</span>
              </div>
            </div>

            {/* Edit toggle */}
            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              className={editing ? 'btn-primary text-[13px] py-2 px-5' : 'btn-secondary text-[13px] py-2 px-5'}
            >
              {editing ? 'Save changes' : 'Edit profile'}
            </button>
          </div>

          {/* Fields */}
          <div className="px-7 py-6 space-y-5">
            <Field label="Full Name"     value={name}  editing={editing} onChange={setName} />
            <Field label="Email Address" value={email} editing={editing} onChange={setEmail} type="email" />
            <Field label="Phone Number"  value={phone} editing={editing} onChange={setPhone} type="tel" />

            {/* Read-only role */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-muted mb-1.5">Account Role</label>
              <div className="bg-surface2 border border-border rounded-lg px-4 py-3 text-[14px] text-text flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-teal" />
                {roleLabel[user?.role || 'user']}
              </div>
            </div>

            {/* Account status */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-widest text-muted mb-1.5">Account Status</label>
              <div className="bg-surface2 border border-border rounded-lg px-4 py-3 text-[14px] text-text flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  Active & Verified
                </div>
                <span className="text-[11px] text-faint">Since 2026</span>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          <div className="px-7 py-5 border-t border-border bg-surface/40">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[13px] font-medium text-text">Delete Account</div>
                <div className="text-[12px] text-muted mt-0.5">Permanently remove your account and all data</div>
              </div>
              <button className="text-[12px] font-medium text-danger border border-danger/30 rounded-lg px-4 py-2 hover:bg-danger/10 transition-colors">
                Delete
              </button>
            </div>
          </div>
        </motion.div>

        {/* Cancel edit */}
        {editing && (
          <div className="mt-4 flex justify-end">
            <button onClick={() => setEditing(false)} className="btn-ghost text-[13px]">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
