import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const services = [
  { id: 1, name: 'Salon & Beauty', key: 'salon',         img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80', icon: '✦', tag: 'Most booked' },
  { id: 2, name: 'Deep Cleaning',  key: 'cleaning',       img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80', icon: '✦', tag: 'Top rated' },
  { id: 3, name: 'Appliance Repair',key: 'repair',        img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80', icon: '✦', tag: '' },
  { id: 4, name: 'Plumbing',        key: 'plumbing',      img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', icon: '✦', tag: '' },
  { id: 5, name: 'Painting',        key: 'painting',      img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80', icon: '✦', tag: '' },
  { id: 6, name: 'Packers & Movers',key: 'movers',        img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', icon: '✦', tag: '' },
  { id: 7, name: 'Electrician',     key: 'electrician',   img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', icon: '✦', tag: '' },
  { id: 8, name: 'Pest Control',    key: 'pest-control',  img: 'https://images.unsplash.com/photo-1623696500366-22a36b32230d?auto=format&fit=crop&w=600&q=80', icon: '✦', tag: '' },
];

const stats = [
  { label: 'Happy Customers', value: '12M+' },
  { label: 'Avg. Rating',     value: '4.8 ★' },
  { label: 'Verified Pros',   value: '50k+' },
  { label: 'Cities Covered',  value: '45+' },
];

const trending = [
  { id: 1, name: 'AC Service', rating: '4.8', reviews: '12k', price: '₹699',  img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=480&q=80' },
  { id: 2, name: 'Deep Cleaning', rating: '4.9', reviews: '8k', price: '₹1,499', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=480&q=80' },
  { id: 3, name: "Men's Haircut", rating: '4.7', reviews: '20k', price: '₹499', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=480&q=80' },
  { id: 4, name: 'Plumbing Fix', rating: '4.6', reviews: '15k', price: '₹199', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=480&q=80' },
];

const reviews = [
  { name: 'Priya S.', avatar: 'P', rating: 5, text: 'The AC technician was punctual, professional, and did a thorough service. Highly recommended!', service: 'AC Servicing' },
  { name: 'Rahul M.', avatar: 'R', rating: 5, text: 'Deep cleaning was flawless. The team used eco-friendly products and left everything spotless.', service: 'Deep Cleaning' },
  { name: 'Ananya K.', avatar: 'A', rating: 4, text: 'Loved the salon at home experience. Very hygienic and expert stylist. Will book again.', service: 'Salon for Women' },
];

const steps = [
  { n: '01', title: 'Book Online', desc: 'Choose a service, pick a time, and see upfront pricing — no hidden fees.' },
  { n: '02', title: 'Pro Arrives',  desc: 'A verified, background-checked expert arrives at your door on time.' },
  { n: '03', title: 'Job Done',     desc: 'Service is completed to the highest standard. Pay securely online.' },
];

const stagger = {
  hidden:  { opacity: 0 },
  show:    { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden:  { opacity: 0, y: 24 },
  show:    { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } },
};

export const LandingPage = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  // Subtle parallax on hero
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 20 });
  const sy = useSpring(my, { stiffness: 40, damping: 20 });
  const bx = useTransform(sx, [-1, 1], ['-1.5%', '1.5%']);
  const by = useTransform(sy, [-1, 1], ['-1.5%', '1.5%']);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [mx, my]);

  return (
    <div className="min-h-screen bg-bg text-text">

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden">

        {/* BG image + overlay */}
        <motion.div className="absolute inset-[-3%] z-0" style={{ x: bx, y: by }}>
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1920&q=80"
            alt=""
            className="img-cover w-full h-full opacity-20"
          />
          {/* gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-bg/70 to-bg" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg/40 via-transparent to-bg/40" />
        </motion.div>

        {/* Subtle grid */}
        <div className="absolute inset-0 bg-grid opacity-40 z-0 pointer-events-none" />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal/6 rounded-full blur-[100px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative z-10 max-w-4xl mx-auto px-5 pt-28 pb-20 text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-teal animate-pulse" />
            <span className="text-[12px] font-medium text-muted tracking-wide">Trusted by 12 million+ customers</span>
          </motion.div>

          <h1 className="font-bold text-5xl sm:text-7xl tracking-tight leading-[1.08] mb-6">
            <span className="block text-text">Home services,</span>
            <span className="block text-gradient-accent">done right.</span>
          </h1>

          <p className="text-muted text-lg sm:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Book verified professionals for cleaning, repairs, beauty, and more — at transparent, upfront prices.
          </p>

          {/* Search bar */}
          <motion.div
            whileHover={{ boxShadow: '0 0 0 1px rgba(99,102,241,0.4), 0 8px 32px rgba(0,0,0,0.4)' }}
            className="max-w-lg mx-auto flex items-center gap-2 bg-surface border border-border rounded-xl p-1.5 shadow-card-hover"
          >
            <div className="flex items-center gap-3 flex-1 pl-3">
              <svg className="w-4 h-4 text-faint shrink-0" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
                <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="What service do you need?"
                className="flex-1 bg-transparent border-none outline-none text-text placeholder:text-faint text-[15px] py-1"
                onKeyDown={e => e.key === 'Enter' && navigate('/services')}
              />
            </div>
            <button
              onClick={() => navigate('/services')}
              className="btn-primary shrink-0 py-2.5 px-6 text-[14px]"
            >
              Find
            </button>
          </motion.div>

          {/* Quick links */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['AC Service', 'Cleaning', 'Plumbing', 'Salon', 'Electrician'].map(s => (
              <button
                key={s}
                onClick={() => navigate(`/services/${s.toLowerCase().replace(' ', '-')}`)}
                className="text-[12px] text-muted border border-border/80 rounded-full px-3 py-1 hover:border-border-hover hover:text-text transition-all duration-150"
              >
                {s}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-border" />
          <div className="w-1 h-1 rounded-full bg-faint" />
        </motion.div>
      </section>

      {/* ── STATS BAR ──────────────────────────────────── */}
      <section className="border-y border-border bg-surface/40">
        <div className="max-w-5xl mx-auto px-5 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center"
            >
              <div className="font-bold text-2xl text-text mb-0.5">{s.value}</div>
              <div className="text-[12px] text-muted uppercase tracking-widest">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CATEGORIES GRID ─────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-12">
          <div className="label-tag mb-3">Categories</div>
          <div className="flex items-end justify-between">
            <h2 className="font-bold text-3xl sm:text-4xl text-text">Browse services</h2>
            <button onClick={() => navigate('/services')} className="btn-ghost text-sm hidden sm:flex items-center gap-1">
              See all
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {services.map(s => (
            <motion.button
              key={s.id}
              variants={item}
              whileHover={{ y: -3 }}
              onClick={() => navigate(`/services/${s.key}`)}
              className="group relative card overflow-hidden text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <div className="h-40 overflow-hidden">
                <img
                  src={s.img}
                  alt={s.name}
                  className="img-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/90 via-surface/30 to-transparent" />
              </div>
              <div className="p-4 pt-3">
                <div className="font-semibold text-[14px] text-text group-hover:text-accent-light transition-colors">{s.name}</div>
                {s.tag && (
                  <div className="mt-1.5 inline-block badge badge-accent text-[10px]">{s.tag}</div>
                )}
              </div>
              {/* Hover border accent */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-transparent group-hover:ring-accent/20 transition-all pointer-events-none" />
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ── TRENDING ────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 pb-20">
        <div className="mb-10">
          <div className="label-tag mb-3">Trending</div>
          <div className="flex items-end justify-between">
            <h2 className="font-bold text-3xl sm:text-4xl text-text">Most booked</h2>
            <button className="btn-ghost text-sm hidden sm:flex items-center gap-1">
              See all
              <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex gap-5 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory -mx-5 px-5">
          {trending.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/booking/${t.id}`)}
              className="card shrink-0 w-[260px] sm:w-[280px] snap-start overflow-hidden cursor-pointer group"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={t.img} alt={t.name} className="img-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/70 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="badge badge-accent text-[10px]">Popular</span>
                </div>
              </div>
              <div className="p-4">
                <div className="font-semibold text-[15px] text-text mb-1">{t.name}</div>
                <div className="flex items-center gap-1.5 text-[12px] text-muted mb-4">
                  <span className="text-amber">★</span>
                  <span className="font-medium text-text">{t.rating}</span>
                  <span>({t.reviews} reviews)</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-3">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-faint">From</div>
                    <div className="font-semibold text-[17px] text-text">{t.price}</div>
                  </div>
                  <button
                    onClick={e => { e.stopPropagation(); navigate(`/booking/${t.id}`); }}
                    className="btn-primary text-[13px] py-2 px-4"
                  >
                    Book
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────── */}
      <section className="border-y border-border bg-surface/30 py-20">
        <div className="max-w-5xl mx-auto px-5">
          <div className="text-center mb-14">
            <div className="label-tag justify-center mb-3">Process</div>
            <h2 className="font-bold text-3xl sm:text-4xl text-text">How it works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-8 left-[calc(33%+16px)] right-[calc(33%+16px)] h-px bg-border z-0" />

            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative card p-6 z-10"
              >
                <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center mb-5">
                  <span className="font-mono text-[12px] font-bold text-accent-light">{s.n}</span>
                </div>
                <h3 className="font-semibold text-[16px] text-text mb-2">{s.title}</h3>
                <p className="text-muted text-[14px] leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ─────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 py-20">
        <div className="mb-12 text-center">
          <div className="label-tag justify-center mb-3">Reviews</div>
          <h2 className="font-bold text-3xl sm:text-4xl text-text">What our customers say</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <span key={j} className="text-amber text-[14px]">★</span>
                ))}
              </div>
              <p className="text-muted text-[14px] leading-relaxed">"{r.text}"</p>
              <div className="flex items-center gap-3 pt-2 border-t border-border mt-auto">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-teal flex items-center justify-center text-[12px] font-bold text-white">
                  {r.avatar}
                </div>
                <div>
                  <div className="text-[13px] font-semibold text-text">{r.name}</div>
                  <div className="text-[11px] text-faint">{r.service}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-5 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative card overflow-hidden px-8 py-14 sm:py-16 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(45,212,191,0.06) 100%)' }}
        >
          <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          <h2 className="font-bold text-3xl sm:text-4xl text-text mb-4 relative z-10">Ready to get started?</h2>
          <p className="text-muted mb-8 max-w-md mx-auto relative z-10">Join millions of happy customers. Book your first service today.</p>
          <button
            onClick={() => navigate('/services')}
            className="btn-primary px-8 py-3 text-base relative z-10"
          >
            Book a service
          </button>
        </motion.div>
      </section>
    </div>
  );
};
