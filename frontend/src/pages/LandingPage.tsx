import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CATEGORIES = [
  { key: 'salon',       label: 'Salon & Beauty',    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80' },
  { key: 'cleaning',    label: 'Deep Cleaning',     img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80' },
  { key: 'repair',      label: 'Appliance Repair',  img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80' },
  { key: 'plumbing',    label: 'Plumbing',          img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80' },
  { key: 'electrician', label: 'Electrician',       img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80' },
  { key: 'painting',    label: 'Painting',          img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80' },
  { key: 'movers',      label: 'Packers & Movers',  img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80' },
  { key: 'pest-control',label: 'Pest Control',      img: 'https://images.unsplash.com/photo-1623696500366-22a36b32230d?auto=format&fit=crop&w=600&q=80' },
];

const TRENDING = [
  { id: 1,  name: 'AC Servicing',     price: '₹699',  rating: '4.8', reviews: '12k', img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80' },
  { id: 2,  name: 'Home Cleaning',    price: '₹1,499',rating: '4.9', reviews: '8k',  img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80' },
  { id: 3,  name: "Men's Haircut",    price: '₹499',  rating: '4.7', reviews: '20k', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80' },
  { id: 4,  name: 'Plumbing Repair',  price: '₹199',  rating: '4.6', reviews: '15k', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
];

const STATS = [
  { value: '12M+', label: 'Customers served' },
  { value: '4.8',  label: 'Average rating' },
  { value: '50k+', label: 'Verified pros' },
  { value: '45+',  label: 'Cities covered' },
];

const STEPS = [
  { n: '01', title: 'Choose a service', desc: 'Browse categories, read reviews, and see upfront prices — no surprises.' },
  { n: '02', title: 'Pick a slot',      desc: 'Select a date and time that works for you. Same-day available.' },
  { n: '03', title: 'Job done',         desc: 'A background-verified pro arrives and completes the work. Pay securely online.' },
];

const REVIEWS = [
  { name: 'Priya S.', service: 'AC Servicing',    rating: 5, text: 'Technician was on time, thorough, and professional. My AC works better than ever.' },
  { name: 'Rahul M.', service: 'Deep Cleaning',   rating: 5, text: 'Team of 4 arrived with all equipment. My apartment looks brand new. Will book again.' },
  { name: 'Ananya K.',service: 'Salon at Home',   rating: 4, text: 'Very comfortable experience. Stylist was skilled and hygienic. Loved the convenience.' },
];

const fade = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };
const stagger = { show: { transition: { staggerChildren: 0.07 } } };

export const LandingPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  return (
    <div className="min-h-screen" style={{ background: '#09090d', color: '#e4e4e8' }}>

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-grid opacity-100 pointer-events-none" />
        {/* Single centered glow blob — decorative only */}
        <div
          className="absolute glow-blob"
          style={{ width: 560, height: 560, top: '15%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(78,81,174,0.07)' }}
        />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #09090d)' }} />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-5 pt-28 pb-20 max-w-3xl mx-auto w-full"
        >
          {/* Pill label */}
          <div
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 mb-8 text-xs font-medium"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#62627a' }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#0b9167' }} />
            Trusted by 12M+ customers across 45 cities
          </div>

          {/* Headline */}
          <h1
            className="font-bold mb-5 leading-[1.06]"
            style={{ fontSize: 'clamp(40px, 6vw, 64px)', letterSpacing: '-0.035em', color: '#e4e4e8' }}
          >
            Home services,<br />
            <span style={{ color: '#9496cc' }}>done right.</span>
          </h1>

          <p className="mb-10 mx-auto" style={{ fontSize: 16, color: '#62627a', maxWidth: 440, lineHeight: 1.7 }}>
            Book verified professionals for cleaning, repairs, beauty, and more — with transparent pricing and no hidden fees.
          </p>

          {/* Search bar */}
          <div
            className="flex items-center mx-auto rounded-xl overflow-hidden"
            style={{
              maxWidth: 480,
              background: '#17171f',
              border: '1px solid rgba(255,255,255,0.09)',
              boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
            }}
          >
            <svg className="ml-4 shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="#2a2a35" strokeWidth="1.6"/>
              <path d="M11 11L14 14" stroke="#2a2a35" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && navigate('/services/cleaning')}
              placeholder="What do you need help with?"
              className="flex-1 py-3.5 px-3 text-sm outline-none"
              style={{ background: 'transparent', border: 'none', color: '#e4e4e8' }}
            />
            <button
              onClick={() => navigate('/services/cleaning')}
              className="btn-primary m-1.5 rounded-lg"
              style={{ padding: '8px 18px', fontSize: 13 }}
            >
              Search
            </button>
          </div>

          {/* Quick picks */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {['AC Service', 'Cleaning', 'Plumbing', 'Salon', 'Electrician'].map(s => (
              <button
                key={s}
                onClick={() => navigate(`/services/${s.toLowerCase().replace(' ', '-')}`)}
                className="text-xs px-3 py-1.5 rounded-full t-colors"
                style={{ color: '#62627a', border: '1px solid rgba(255,255,255,0.07)', background: 'transparent' }}
                onMouseEnter={e => { (e.target as HTMLButtonElement).style.color = '#e4e4e8'; (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.13)'; }}
                onMouseLeave={e => { (e.target as HTMLButtonElement).style.color = '#62627a'; (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.07)'; }}
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── STATS ────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#111117' }}>
        <div className="max-w-4xl mx-auto px-5 py-7 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
            >
              <div className="font-semibold mb-0.5" style={{ fontSize: 22, letterSpacing: '-0.02em', color: '#e4e4e8' }}>{s.value}</div>
              <div style={{ fontSize: 12, color: '#62627a' }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="section-label block mb-2">Services</span>
            <h2 className="font-semibold" style={{ fontSize: 28, letterSpacing: '-0.02em', color: '#e4e4e8' }}>What do you need?</h2>
          </div>
          <button className="btn-ghost text-sm" onClick={() => navigate('/services')}>
            View all
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>

        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {CATEGORIES.map(cat => (
            <motion.button
              key={cat.key}
              variants={fade}
              onClick={() => navigate(`/services/${cat.key}`)}
              className="group relative rounded-xl overflow-hidden text-left focus:outline-none"
              style={{ height: 160, border: '1px solid rgba(255,255,255,0.06)', background: '#111117' }}
              whileHover="hover"
            >
              <motion.img
                src={cat.img}
                alt={cat.label}
                className="img-fill absolute inset-0"
                style={{ opacity: 0.45 }}
                variants={{ hover: { opacity: 0.6, scale: 1.04 } }}
                transition={{ duration: 0.4 }}
              />
              {/* Bottom fade */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(9,9,13,0.9) 30%, transparent)' }} />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <div className="font-medium text-sm" style={{ color: '#e4e4e8', letterSpacing: '-0.01em' }}>{cat.label}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ── TRENDING ─────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0c0c10' }} className="py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-label block mb-2">Trending</span>
              <h2 className="font-semibold" style={{ fontSize: 28, letterSpacing: '-0.02em', color: '#e4e4e8' }}>Most booked</h2>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x -mx-5 px-5">
            {TRENDING.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                onClick={() => navigate(`/booking/${item.id}`)}
                className="shrink-0 snap-start rounded-xl overflow-hidden cursor-pointer group"
                style={{ width: 240, border: '1px solid rgba(255,255,255,0.06)', background: '#111117' }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
              >
                <div className="relative overflow-hidden" style={{ height: 148 }}>
                  <img src={item.img} alt={item.name} className="img-fill transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(17,17,23,0.6) 0%, transparent 60%)' }} />
                </div>
                <div className="p-4">
                  <div className="font-medium mb-2" style={{ fontSize: 14, color: '#e4e4e8', letterSpacing: '-0.01em' }}>{item.name}</div>
                  <div className="flex items-center gap-1.5 mb-4" style={{ fontSize: 12, color: '#62627a' }}>
                    <span style={{ color: '#b87d10' }}>★</span>
                    <span style={{ color: '#e4e4e8', fontWeight: 500 }}>{item.rating}</span>
                    <span>({item.reviews} reviews)</span>
                  </div>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 12 }} />
                  <div className="flex items-center justify-between">
                    <div>
                      <div style={{ fontSize: 10, color: '#62627a', textTransform: 'uppercase', letterSpacing: '0.08em' }}>From</div>
                      <div className="font-semibold" style={{ fontSize: 16, color: '#e4e4e8', letterSpacing: '-0.01em' }}>{item.price}</div>
                    </div>
                    <button
                      onClick={e => { e.stopPropagation(); navigate(`/booking/${item.id}`); }}
                      className="btn-primary"
                      style={{ padding: '6px 14px', fontSize: 12 }}
                    >
                      Book
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} className="py-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-14">
            <span className="section-label block mb-2">Process</span>
            <h2 className="font-semibold" style={{ fontSize: 28, letterSpacing: '-0.02em', color: '#e4e4e8' }}>How it works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card p-6"
              >
                <div
                  className="font-bold mb-5"
                  style={{ fontSize: 32, letterSpacing: '-0.03em', color: 'rgba(255,255,255,0.07)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {s.n}
                </div>
                <div className="font-semibold mb-2" style={{ fontSize: 15, color: '#e4e4e8' }}>{s.title}</div>
                <div style={{ fontSize: 13, color: '#62627a', lineHeight: 1.65 }}>{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ──────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#0c0c10' }} className="py-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-12">
            <span className="section-label block mb-2">Reviews</span>
            <h2 className="font-semibold" style={{ fontSize: 28, letterSpacing: '-0.02em', color: '#e4e4e8' }}>What customers say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {REVIEWS.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09 }}
                className="card p-5 flex flex-col"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.rating }).map((_, j) => (
                    <svg key={j} width="13" height="13" viewBox="0 0 12 12" fill="#b87d10"><path d="M6 1l1.3 3.9H11L8.1 7.1l1 3.9L6 8.8l-3.1 2.2 1-3.9L1 4.9h3.7z"/></svg>
                  ))}
                </div>
                <p className="flex-1 mb-4" style={{ fontSize: 13, color: '#62627a', lineHeight: 1.7 }}>"{r.text}"</p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 14 }} />
                <div className="flex items-center gap-3">
                  <div className="avatar" style={{ width: 30, height: 30, fontSize: 12 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 500, color: '#e4e4e8' }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: '#62627a' }}>{r.service}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} className="py-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2 className="font-semibold mb-3" style={{ fontSize: 30, letterSpacing: '-0.025em', color: '#e4e4e8' }}>
            Ready to book your first service?
          </h2>
          <p className="mb-8" style={{ fontSize: 15, color: '#62627a' }}>
            Join 12 million customers who trust On Demand Service for quality home services.
          </p>
          <button onClick={() => navigate('/services/cleaning')} className="btn-primary" style={{ padding: '10px 28px', fontSize: 14 }}>
            Browse services
          </button>
        </div>
      </section>

    </div>
  );
};
