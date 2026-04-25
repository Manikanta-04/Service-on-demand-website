import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const card: React.CSSProperties = {
  background: '#17171f', border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 10, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
};

const STEPS = ['Location', 'Date', 'Time', 'Offers', 'Summary'] as const;

const SLOTS = [
  { t: '09:00', l: '9:00 AM',  ok: true  },
  { t: '11:00', l: '11:00 AM', ok: true  },
  { t: '13:00', l: '1:00 PM',  ok: false },
  { t: '15:00', l: '3:00 PM',  ok: true  },
  { t: '17:00', l: '5:00 PM',  ok: true  },
  { t: '19:00', l: '7:00 PM',  ok: false },
];

const nextDays = (n: number) => Array.from({ length: n }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() + i + 1);
  return { iso: d.toISOString().split('T')[0], day: d.toLocaleDateString('en-IN', { weekday: 'short' }), date: d.getDate(), mon: d.toLocaleDateString('en-IN', { month: 'short' }) };
});

export const BookingFlow = ({ serviceId, serviceName, basePrice }: {
  serviceId?: string; serviceName?: string; basePrice?: number;
}) => {
  const navigate = useNavigate();
  const [step, setStep]         = useState(0);
  const [dir, setDir]           = useState(1);
  const [done, setDone]         = useState(false);
  const [busy, setBusy]         = useState(false);
  const [addr, setAddr]         = useState('');
  const [date, setDate]         = useState('');
  const [time, setTime]         = useState('');
  const base    = basePrice || 500;
  const discount = 150;
  const total   = base + 50 - discount;

  const validate = () => {
    if (step === 0 && !addr.trim()) { toast.error('Enter your address'); return false; }
    if (step === 1 && !date)        { toast.error('Pick a date');         return false; }
    if (step === 2 && !time)        { toast.error('Choose a time slot');  return false; }
    return true;
  };

  const next = () => {
    if (!validate()) return;
    if (step < STEPS.length - 1) { setDir(1); setStep(s => s + 1); }
    else submit();
  };
  const back = () => { if (step > 0) { setDir(-1); setStep(s => s - 1); } };

  // ── PROTOTYPE: always succeed ──────────────────────────────────────────────
  const submit = async () => {
    setBusy(true);
    // Simulate a short processing delay to feel realistic
    await new Promise(res => setTimeout(res, 1400));
    toast.success('Payment successful! Booking confirmed 🎉');
    setDone(true);
    setBusy(false);
  };

  /* Success */
  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '40px 0' }}>
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
        style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(11,145,103,0.12)', border: '1px solid rgba(11,145,103,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0b9167" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </motion.div>
      <div style={{ fontWeight: 600, fontSize: 20, color: '#e4e4e8', marginBottom: 8 }}>Booking Confirmed!</div>
      <div style={{ fontSize: 13, color: '#62627a', marginBottom: 6 }}>
        {serviceName} · {date} {SLOTS.find(s => s.t === time)?.l || time}
      </div>
      <div style={{ fontSize: 13, color: '#62627a', marginBottom: 28 }}>A professional will be assigned within 30 minutes.</div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button className="btn-primary" style={{ padding: '9px 22px' }} onClick={() => navigate('/dashboard')}>View Bookings</button>
        <button className="btn-secondary" style={{ padding: '9px 22px' }} onClick={() => navigate('/')}>Back to Home</button>
      </div>
    </motion.div>
  );

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:  (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
  };

  return (
    <div>
      {/* Step indicators */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
        {STEPS.map((label, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < STEPS.length - 1 ? 1 : 'none' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 600, transition: 'all 200ms',
                background: i < step ? '#0b9167' : i === step ? '#4e51ae' : '#17171f',
                border: i < step ? '1px solid rgba(11,145,103,0.4)' : i === step ? '1px solid rgba(78,81,174,0.4)' : '1px solid rgba(255,255,255,0.06)',
                color: i <= step ? 'white' : '#62627a',
              }}>
                {i < step ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> : i + 1}
              </div>
              <span style={{ fontSize: 10, color: i === step ? '#e4e4e8' : i < step ? '#0b9167' : '#2a2a35', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'none' }} className="md:block">{label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 1, margin: '0 4px', marginBottom: 14, background: i < step ? 'rgba(11,145,103,0.4)' : 'rgba(255,255,255,0.06)', transition: 'background 300ms' }} />
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div style={{ ...card, padding: '24px', minHeight: 280, marginBottom: 20, overflow: 'hidden', position: 'relative' }}>
        <AnimatePresence custom={dir} mode="wait">
          <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}>

            {step === 0 && (
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: '#e4e4e8', marginBottom: 4 }}>Where do you need this?</div>
                <div style={{ fontSize: 13, color: '#62627a', marginBottom: 16 }}>We'll assign the nearest verified professional.</div>
                <textarea value={addr} onChange={e => setAddr(e.target.value)} rows={3}
                  placeholder="House no., Street, Area, City, Pincode"
                  style={{ width: '100%', background: '#1e1e28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '10px 14px', color: '#e4e4e8', fontSize: 14, outline: 'none', resize: 'none', lineHeight: 1.6, fontFamily: 'inherit' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(78,81,174,0.5)'}
                  onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.08)'}
                />
                <div style={{ fontSize: 11, color: '#2a2a35', marginTop: 10 }}>Quick picks:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                  {['Banjara Hills, Hyderabad', 'Koramangala, Bangalore', 'Andheri, Mumbai'].map(l => (
                    <button key={l} onClick={() => setAddr(l)} style={{ fontSize: 12, padding: '4px 10px', borderRadius: 6, cursor: 'pointer', transition: 'all 120ms', background: addr === l ? 'rgba(78,81,174,0.12)' : 'transparent', border: addr === l ? '1px solid rgba(78,81,174,0.3)' : '1px solid rgba(255,255,255,0.07)', color: addr === l ? '#9496cc' : '#62627a' }}>{l}</button>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: '#e4e4e8', marginBottom: 4 }}>Pick a date</div>
                <div style={{ fontSize: 13, color: '#62627a', marginBottom: 16 }}>Same-day slots available in select cities.</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
                  {nextDays(7).map(d => (
                    <button key={d.iso} onClick={() => setDate(d.iso)} style={{ padding: '10px 6px', borderRadius: 8, cursor: 'pointer', textAlign: 'center', transition: 'all 120ms', background: date === d.iso ? 'rgba(78,81,174,0.12)' : '#1e1e28', border: date === d.iso ? '1px solid rgba(78,81,174,0.35)' : '1px solid rgba(255,255,255,0.06)', color: date === d.iso ? '#9496cc' : '#e4e4e8' }}>
                      <div style={{ fontSize: 10, color: date === d.iso ? '#9496cc' : '#62627a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{d.day}</div>
                      <div style={{ fontSize: 18, fontWeight: 600, margin: '2px 0' }}>{d.date}</div>
                      <div style={{ fontSize: 10, color: date === d.iso ? '#9496cc' : '#62627a' }}>{d.mon}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: '#e4e4e8', marginBottom: 4 }}>Choose a time slot</div>
                <div style={{ fontSize: 13, color: '#62627a', marginBottom: 16 }}>Unavailable slots are already booked.</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                  {SLOTS.map(s => (
                    <button key={s.t} disabled={!s.ok} onClick={() => setTime(s.t)}
                      style={{ padding: '12px 8px', borderRadius: 8, fontSize: 13, fontWeight: 500, textAlign: 'center', cursor: s.ok ? 'pointer' : 'not-allowed', transition: 'all 120ms', opacity: !s.ok ? 0.4 : 1, textDecoration: !s.ok ? 'line-through' : 'none',
                        background: time === s.t ? 'rgba(78,81,174,0.12)' : '#1e1e28',
                        border: time === s.t ? '1px solid rgba(78,81,174,0.35)' : '1px solid rgba(255,255,255,0.06)',
                        color: time === s.t ? '#9496cc' : '#e4e4e8' }}>
                      {s.l}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: '#e4e4e8', marginBottom: 4 }}>Offers & Discounts</div>
                <div style={{ fontSize: 13, color: '#62627a', marginBottom: 16 }}>Savings automatically applied at checkout.</div>
                <div style={{ background: 'rgba(11,145,103,0.07)', border: '1px solid rgba(11,145,103,0.18)', borderRadius: 10, padding: '14px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14, color: '#e4e4e8' }}>Festival Discount</div>
                    <div style={{ fontSize: 12, color: '#62627a', marginTop: 2 }}>30% off applied automatically</div>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 15, color: '#0b9167' }}>–₹{discount}</div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input placeholder="Coupon code" style={{ flex: 1, background: '#1e1e28', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 8, padding: '8px 14px', color: '#e4e4e8', fontSize: 13, outline: 'none', fontFamily: 'inherit' }} />
                  <button className="btn-secondary" style={{ padding: '8px 16px', fontSize: 13 }}>Apply</button>
                </div>
              </div>
            )}

            {step === 4 && (
              <div>
                <div style={{ fontWeight: 600, fontSize: 16, color: '#e4e4e8', marginBottom: 16 }}>Order Summary</div>
                <div style={{ ...card, padding: '16px 18px', marginBottom: 12 }}>
                  {[
                    { l: 'Service',  v: serviceName || 'Home Service' },
                    { l: 'Date',     v: date || '—' },
                    { l: 'Time',     v: SLOTS.find(s => s.t === time)?.l || '—' },
                    { l: 'Address', v: addr || '—' },
                  ].map(r => (
                    <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ color: '#62627a' }}>{r.l}</span>
                      <span style={{ color: '#e4e4e8', textAlign: 'right', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ ...card, padding: '14px 18px' }}>
                  {[
                    { l: 'Base price',  v: `₹${base}`,     c: '#62627a' },
                    { l: 'Taxes & fee', v: '₹50',           c: '#62627a' },
                    { l: 'Discount',    v: `–₹${discount}`, c: '#0b9167' },
                  ].map(r => (
                    <div key={r.l} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0' }}>
                      <span style={{ color: '#62627a' }}>{r.l}</span><span style={{ color: r.c }}>{r.v}</span>
                    </div>
                  ))}
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '10px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: 16, color: '#e4e4e8' }}>
                    <span>Total</span><span>₹{total}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={back} disabled={step === 0} className="btn-secondary" style={{ padding: '8px 18px', opacity: step === 0 ? 0.3 : 1 }}>← Back</button>
        <div style={{ display: 'flex', gap: 4 }}>
          {STEPS.map((_, i) => <div key={i} style={{ height: 4, borderRadius: 2, transition: 'all 200ms', width: i === step ? 20 : 6, background: i === step ? '#4e51ae' : i < step ? '#0b9167' : '#1e1e28' }} />)}
        </div>
        <button onClick={next} disabled={busy} className="btn-primary" style={{ padding: '8px 22px' }}>
          {busy ? 'Processing…' : step === STEPS.length - 1 ? 'Confirm & Pay' : 'Continue →'}
        </button>
      </div>
    </div>
  );
};
