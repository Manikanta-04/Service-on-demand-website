import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';

const card: React.CSSProperties = { background: '#111117', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)', overflow: 'hidden' };
const inputSt: React.CSSProperties = { width: '100%', background: '#17171f', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '9px 14px', color: '#e4e4e8', fontSize: 14, outline: 'none', fontFamily: 'inherit' };
const lbl: React.CSSProperties  = { display: 'block', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#62627a', marginBottom: 6 };

export const ProfilePage = () => {
  const { user } = useAuthStore();
  const [editing, setEditing]   = useState(false);
  const [name,  setName]        = useState(user?.name  || '');
  const [email, setEmail]       = useState(user?.email || '');
  const [phone, setPhone]       = useState('');
  const initials = (user?.name || 'U').split(' ').map((w: string) => w[0]).join('').slice(0, 2).toUpperCase();

  const save = () => { toast.success('Profile updated'); setEditing(false); };

  return (
    <div style={{ minHeight: '100vh', background: '#09090d', color: '#e4e4e8', paddingTop: 60 }}>
      <div className="max-w-xl mx-auto px-5 py-12 pb-24">

        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontWeight: 600, fontSize: 22, letterSpacing: '-0.02em', color: '#e4e4e8' }}>My Profile</h1>
          <p style={{ fontSize: 13, color: '#62627a', marginTop: 4 }}>Manage your personal info and preferences</p>
        </div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          {/* Header section */}
          <div style={{ ...card }}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#4e51ae,#0b9167)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18 }}>{initials}</div>
                  <div style={{ position: 'absolute', bottom: -2, right: -2, width: 14, height: 14, borderRadius: '50%', background: '#0b9167', border: '2px solid #09090d' }} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16, color: '#e4e4e8' }}>{user?.name || 'Your Name'}</div>
                  <div style={{ fontSize: 12, color: '#62627a', marginTop: 2, textTransform: 'capitalize' }}>{user?.role || 'customer'}</div>
                </div>
              </div>
              <button onClick={() => editing ? save() : setEditing(true)} className={editing ? 'btn-primary' : 'btn-secondary'} style={{ padding: '7px 16px', fontSize: 13 }}>
                {editing ? 'Save changes' : 'Edit profile'}
              </button>
            </div>

            {/* Fields */}
            <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Full Name',     value: name,  set: setName,  type: 'text'  },
                { label: 'Email',         value: email, set: setEmail, type: 'email' },
                { label: 'Phone Number',  value: phone, set: setPhone, type: 'tel'   },
              ].map(f => (
                <div key={f.label}>
                  <label style={lbl}>{f.label}</label>
                  {editing ? (
                    <input type={f.type} value={f.value} onChange={e => f.set(e.target.value)} style={inputSt}
                      onFocus={e => e.target.style.borderColor = 'rgba(78,81,174,0.5)'}
                      onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.08)'} />
                  ) : (
                    <div style={{ background: '#17171f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '9px 14px', fontSize: 14, color: f.value ? '#e4e4e8' : '#2a2a35' }}>
                      {f.value || `No ${f.label.toLowerCase()} set`}
                    </div>
                  )}
                </div>
              ))}

              {/* Read-only */}
              <div>
                <label style={lbl}>Account Status</label>
                <div style={{ background: '#17171f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 8, padding: '9px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#e4e4e8' }}>
                    <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#0b9167' }} />
                    Active & Verified
                  </div>
                  <span style={{ fontSize: 11, color: '#2a2a35' }}>Since 2026</span>
                </div>
              </div>
            </div>

            {/* Danger zone */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(0,0,0,0.15)' }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: '#e4e4e8' }}>Delete Account</div>
                <div style={{ fontSize: 12, color: '#62627a', marginTop: 2 }}>Permanently remove all your data</div>
              </div>
              <button className="btn-danger" style={{ padding: '6px 14px', fontSize: 12 }}>Delete</button>
            </div>
          </div>

          {editing && (
            <div style={{ marginTop: 10, textAlign: 'right' }}>
              <button onClick={() => setEditing(false)} className="btn-ghost" style={{ fontSize: 13 }}>Cancel</button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};
