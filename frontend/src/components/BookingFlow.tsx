import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const STEPS = ['Location', 'Schedule', 'Time Slot', 'Offers', 'Summary'] as const;
type Step = 0 | 1 | 2 | 3 | 4;

const TIME_SLOTS = [
  { time: '09:00', label: '9:00 AM', available: true },
  { time: '11:00', label: '11:00 AM', available: true },
  { time: '13:00', label: '1:00 PM', available: false },
  { time: '15:00', label: '3:00 PM', available: true },
  { time: '17:00', label: '5:00 PM', available: true },
  { time: '19:00', label: '7:00 PM', available: false },
];

interface FormData {
  address: string;
  date: string;
  time: string;
  serviceId: string;
  baseAmount: number;
  discount: number;
}

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

/* ── Step Indicator ── */
const StepIndicator = ({ current }: { current: number }) => (
  <div className="flex items-center justify-between mb-8">
    {STEPS.map((label, i) => {
      const done   = i < current;
      const active = i === current;
      return (
        <div key={i} className="flex items-center">
          {/* circle */}
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-semibold border-2 transition-all duration-300 ${
              done   ? 'bg-teal border-teal text-bg' :
              active ? 'bg-accent border-accent text-white' :
                       'bg-surface2 border-border text-faint'
            }`}>
              {done ? (
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8l4 4 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : i + 1}
            </div>
            <span className={`text-[10px] hidden md:block tracking-wide uppercase font-medium transition-colors ${
              active ? 'text-text' : done ? 'text-teal' : 'text-faint'
            }`}>
              {label}
            </span>
          </div>
          {/* connector */}
          {i < STEPS.length - 1 && (
            <div className="w-full h-px mx-2 transition-colors duration-500" style={{
              background: i < current ? 'rgba(45,212,191,0.5)' : 'rgba(255,255,255,0.06)',
              minWidth: '20px', flex: 1,
            }} />
          )}
        </div>
      );
    })}
  </div>
);

/* ── Individual Steps ── */
const LocationStep = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="space-y-5">
    <div>
      <h3 className="font-semibold text-[18px] text-text mb-1">Where do you need the service?</h3>
      <p className="text-muted text-[13px]">We'll assign the nearest available professional.</p>
    </div>
    <div>
      <label className="block text-[11px] uppercase tracking-widest font-semibold text-muted mb-1.5">Full Address</label>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        className="input resize-none h-28"
        placeholder="House no., Street, Area, City, Pincode"
      />
    </div>
    {/* quick location picks */}
    <div>
      <div className="text-[11px] text-faint uppercase tracking-widest mb-2">Quick picks</div>
      <div className="flex flex-wrap gap-2">
        {['Banjara Hills, Hyderabad', 'Koramangala, Bangalore', 'Andheri, Mumbai'].map(loc => (
          <button
            key={loc}
            onClick={() => onChange(loc)}
            className={`text-[12px] border rounded-lg px-3 py-1.5 transition-all ${
              value === loc ? 'border-accent text-accent-light bg-accent-dim' : 'border-border text-muted hover:border-border-hover hover:text-text'
            }`}
          >
            {loc}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ScheduleStep = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => {
  // Generate next 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return {
      isoDate: d.toISOString().split('T')[0],
      day:  d.toLocaleDateString('en-IN', { weekday: 'short' }),
      date: d.getDate(),
      month: d.toLocaleDateString('en-IN', { month: 'short' }),
    };
  });

  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold text-[18px] text-text mb-1">Pick a date</h3>
        <p className="text-muted text-[13px]">Choose a convenient date for your appointment.</p>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
        {days.map(d => (
          <button
            key={d.isoDate}
            onClick={() => onChange(d.isoDate)}
            className={`flex flex-col items-center py-3 px-1 rounded-xl border text-center transition-all duration-150 ${
              value === d.isoDate
                ? 'border-accent bg-accent-dim text-accent-light'
                : 'border-border bg-surface2 text-muted hover:border-border-hover hover:text-text'
            }`}
          >
            <span className="text-[10px] uppercase tracking-wider">{d.day}</span>
            <span className="text-[18px] font-semibold mt-1">{d.date}</span>
            <span className="text-[10px]">{d.month}</span>
          </button>
        ))}
      </div>
      {/* Fallback date input */}
      <div>
        <label className="block text-[11px] uppercase tracking-widest font-semibold text-muted mb-1.5">Or enter a specific date</label>
        <input
          type="date"
          value={value}
          onChange={e => onChange(e.target.value)}
          min={new Date(Date.now() + 86400000).toISOString().split('T')[0]}
          className="input"
          style={{ colorScheme: 'dark' }}
        />
      </div>
    </div>
  );
};

const TimeSlotStep = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="space-y-5">
    <div>
      <h3 className="font-semibold text-[18px] text-text mb-1">Select a time slot</h3>
      <p className="text-muted text-[13px]">Greyed out slots are already booked.</p>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {TIME_SLOTS.map(slot => (
        <button
          key={slot.time}
          disabled={!slot.available}
          onClick={() => slot.available && onChange(slot.time)}
          className={`py-3.5 px-4 rounded-xl border text-[14px] font-medium transition-all duration-150 ${
            !slot.available
              ? 'border-border/40 text-faint cursor-not-allowed opacity-50 line-through'
              : value === slot.time
              ? 'border-accent bg-accent-dim text-accent-light ring-1 ring-accent/40'
              : 'border-border bg-surface2 text-text hover:border-border-hover hover:bg-surface3'
          }`}
        >
          {slot.label}
          {!slot.available && <div className="text-[10px] mt-0.5 not-italic font-normal">Booked</div>}
        </button>
      ))}
    </div>
  </div>
);

const OffersStep = () => (
  <div className="space-y-5">
    <div>
      <h3 className="font-semibold text-[18px] text-text mb-1">Offers & Discounts</h3>
      <p className="text-muted text-[13px]">Apply a coupon or avail available offers.</p>
    </div>

    {/* Active offer */}
    <div className="card p-4 flex items-center justify-between border-teal/30 bg-teal/5">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-teal-dim border border-teal/20 flex items-center justify-center text-teal text-[16px]">🏷</div>
        <div>
          <div className="font-semibold text-[14px] text-text">Festival Discount Applied</div>
          <div className="text-[12px] text-muted">30% OFF on all services today</div>
        </div>
      </div>
      <span className="font-semibold text-teal text-[15px]">–₹150</span>
    </div>

    {/* Coupon input */}
    <div>
      <label className="block text-[11px] uppercase tracking-widest font-semibold text-muted mb-1.5">Have a coupon?</label>
      <div className="flex gap-2">
        <input className="input flex-1" placeholder="Enter coupon code" />
        <button className="btn-secondary text-[13px] px-5 shrink-0">Apply</button>
      </div>
    </div>

    <div className="card p-4 flex items-center gap-3 border-amber/20 bg-amber-dim/50">
      <span className="text-amber text-[18px]">💳</span>
      <div className="text-[13px] text-muted">Pay online & get an extra <span className="font-medium text-text">₹50 cashback</span> on your first booking.</div>
    </div>
  </div>
);

const SummaryStep = ({ data }: { data: FormData }) => {
  const finalAmount = data.baseAmount - data.discount + 50; // taxes
  return (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold text-[18px] text-text mb-1">Review your booking</h3>
        <p className="text-muted text-[13px]">Confirm all details before payment.</p>
      </div>

      {/* Booking details */}
      <div className="card p-5 space-y-3 text-[14px]">
        {[
          { label: 'Date',     value: data.date    || '—' },
          { label: 'Time',     value: data.time ? (TIME_SLOTS.find(s => s.time === data.time)?.label || data.time) : '—' },
          { label: 'Location', value: data.address || '—' },
        ].map(row => (
          <div key={row.label} className="flex items-start justify-between gap-4">
            <span className="text-muted shrink-0 w-20">{row.label}</span>
            <span className="text-text text-right">{row.value}</span>
          </div>
        ))}
      </div>

      {/* Price breakdown */}
      <div className="card p-5 space-y-2.5 text-[14px]">
        <div className="flex justify-between text-muted">
          <span>Base price</span><span className="text-text">₹{data.baseAmount}</span>
        </div>
        <div className="flex justify-between text-muted">
          <span>Taxes & fees</span><span className="text-text">₹50</span>
        </div>
        <div className="flex justify-between text-teal font-medium">
          <span>Discount</span><span>–₹{data.discount}</span>
        </div>
        <div className="h-px bg-border my-1" />
        <div className="flex justify-between font-semibold text-[17px]">
          <span className="text-text">Total</span>
          <span className="text-text">₹{finalAmount}</span>
        </div>
      </div>
    </div>
  );
};

/* ── Main BookingFlow ── */
export const BookingFlow = ({ serviceId, serviceName, basePrice }: {
  serviceId?: string;
  serviceName?: string;
  basePrice?: number;
}) => {
  const [step,      setStep]      = useState<Step>(0);
  const [dir,       setDir]       = useState(1);
  const [complete,  setComplete]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [formData,  setFormData]  = useState<FormData>({
    address:    '',
    date:       '',
    time:       '',
    serviceId:  serviceId || 'mock-service-123',
    baseAmount: basePrice || 500,
    discount:   150,
  });

  const navigate = useNavigate();

  const update = (key: keyof FormData) => (val: string | number) =>
    setFormData(prev => ({ ...prev, [key]: val }));

  const validateStep = (): boolean => {
    if (step === 0 && !formData.address.trim()) { toast.error('Please enter your address'); return false; }
    if (step === 1 && !formData.date)            { toast.error('Please select a date');     return false; }
    if (step === 2 && !formData.time)            { toast.error('Please select a time slot'); return false; }
    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;
    if (step < STEPS.length - 1) {
      setDir(1);
      setStep(s => (s + 1) as Step);
    } else {
      submitBooking();
    }
  };

  const handleBack = () => {
    if (step > 0) { setDir(-1); setStep(s => (s - 1) as Step); }
  };

  const submitBooking = async () => {
    setLoading(true);
    try {
      const createRes = await axios.post(`${API_URL}/bookings/create-order`, {
        serviceId: '65a12b3c4d5e6f7a8b9c0d1e',
        date:      formData.date,
        time:      formData.time,
        finalAmount: formData.baseAmount - formData.discount + 50,
      }, { withCredentials: true });

      const { orderId, bookingId } = createRes.data;

      await axios.post(`${API_URL}/bookings/webhook`, {
        orderId, paymentId: 'pay_mock123', signature: 'valid', bookingId,
      });

      toast.success('Booking confirmed!');
      setComplete(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Booking failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Success screen ── */
  if (complete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-14"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-teal/10 border border-teal/30 flex items-center justify-center mx-auto mb-6"
        >
          <svg className="w-9 h-9 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>

        <h2 className="font-semibold text-2xl text-text mb-2">Booking Confirmed!</h2>
        <p className="text-muted text-[14px] max-w-sm mx-auto mb-2">
          Your booking for <span className="text-text font-medium">{serviceName || 'the service'}</span> is confirmed.
        </p>
        <p className="text-muted text-[14px] mb-8">
          {formData.date && `${formData.date} · `}
          {formData.time && (TIME_SLOTS.find(s => s.time === formData.time)?.label || formData.time)}
        </p>

        <div className="card p-5 max-w-xs mx-auto text-left mb-8 text-[13px]">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-muted">Professional will be assigned within 30 min</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-muted">You'll receive a confirmation SMS & email</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/dashboard')} className="btn-primary px-8 py-3">
            View My Bookings
          </button>
          <button onClick={() => navigate('/')} className="btn-secondary px-8 py-3">
            Back to Home
          </button>
        </div>
      </motion.div>
    );
  }

  /* ── Form ── */
  return (
    <div>
      <StepIndicator current={step} />

      {/* Step content */}
      <div className="relative min-h-[320px] overflow-hidden bg-surface2/40 border border-border rounded-xl p-6 mb-6">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
          >
            {step === 0 && <LocationStep  value={formData.address} onChange={update('address')} />}
            {step === 1 && <ScheduleStep  value={formData.date}    onChange={update('date')} />}
            {step === 2 && <TimeSlotStep  value={formData.time}    onChange={update('time')} />}
            {step === 3 && <OffersStep />}
            {step === 4 && <SummaryStep   data={formData} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleBack}
          disabled={step === 0}
          className="btn-secondary disabled:opacity-40 disabled:cursor-not-allowed px-6 py-2.5 text-[14px]"
        >
          ← Back
        </button>

        {/* progress pills */}
        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === step ? 'w-6 bg-accent' : i < step ? 'w-2 bg-teal/60' : 'w-2 bg-surface3'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={loading}
          className="btn-primary px-7 py-2.5 text-[14px] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.3"/>
                <path d="M12 2a10 10 0 0 1 10 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
              Processing...
            </>
          ) : step === STEPS.length - 1 ? 'Confirm & Pay' : 'Continue →'}
        </button>
      </div>
    </div>
  );
};
