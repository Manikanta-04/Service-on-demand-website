import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const DATA: Record<string, { meta: { title: string; desc: string }; items: any[] }> = {
  salon: {
    meta: { title: 'Salon & Beauty', desc: 'Expert beauty professionals at your doorstep' },
    items: [
      { id: 1,  name: 'Haircut & Styling',   desc: 'Premium cut with senior stylist.',      price: 499,  duration: '45 min', rating: 4.8, reviews: 2100, img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80' },
      { id: 2,  name: 'Facial & Cleanup',    desc: 'Deep cleansing and glowing skin.',      price: 899,  duration: '60 min', rating: 4.9, reviews: 890,  img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80' },
      { id: 3,  name: 'Manicure & Pedicure', desc: 'Complete nail care & massage.',         price: 699,  duration: '50 min', rating: 4.7, reviews: 1400, img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&w=400&q=80' },
      { id: 4,  name: 'Hair Spa',            desc: 'Nourishing treatment for all types.',   price: 1200, duration: '75 min', rating: 4.8, reviews: 650,  img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80' },
      { id: 5,  name: 'Bridal Makeup',       desc: 'Professional look for your big day.',   price: 4999, duration: '2 hrs',  rating: 4.9, reviews: 310,  img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  cleaning: {
    meta: { title: 'Deep Cleaning', desc: 'Complete home sanitization by certified teams' },
    items: [
      { id: 6,  name: 'Full Home Cleaning',   desc: 'Intensive deep clean for entire house.',  price: 1499, duration: '3 hrs',   rating: 4.9, reviews: 8200, img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80' },
      { id: 7,  name: 'Sofa Cleaning',        desc: 'Dry & wet vacuuming for fabric sofas.',   price: 599,  duration: '90 min',  rating: 4.7, reviews: 3400, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80' },
      { id: 8,  name: 'Bathroom Cleaning',    desc: 'Stain removal and full sanitization.',    price: 399,  duration: '60 min',  rating: 4.6, reviews: 5100, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
      { id: 9,  name: 'Kitchen Deep Clean',   desc: 'Degrease chimney, cabinets & slabs.',     price: 899,  duration: '2 hrs',   rating: 4.8, reviews: 2800, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80' },
      { id: 10, name: 'Carpet Cleaning',      desc: 'Shampooing & deep extraction.',           price: 499,  duration: '90 min',  rating: 4.7, reviews: 1900, img: 'https://images.unsplash.com/photo-1558383409-ab7efce0a187?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  repair: {
    meta: { title: 'Appliance Repair', desc: 'AC, fridge, washing machine & more — fixed right' },
    items: [
      { id: 11, name: 'AC Servicing',            desc: 'Full maintenance & gas top-up.',         price: 699,  duration: '90 min', rating: 4.8, reviews: 12000, img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80' },
      { id: 12, name: 'Washing Machine Repair',  desc: 'Motor, drum & drainage issues.',         price: 450,  duration: '60 min', rating: 4.7, reviews: 4200,  img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80' },
      { id: 13, name: 'Refrigerator Repair',     desc: 'Cooling, compressor & gas refill.',      price: 500,  duration: '75 min', rating: 4.6, reviews: 3800,  img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
      { id: 14, name: 'Microwave Repair',        desc: 'Heating issues & panel fix.',            price: 350,  duration: '45 min', rating: 4.5, reviews: 1200,  img: 'https://images.unsplash.com/photo-1585659722983-36cb2b46f5e3?auto=format&fit=crop&w=400&q=80' },
      { id: 15, name: 'TV Installation',         desc: 'Wall mounting & smart TV setup.',        price: 400,  duration: '60 min', rating: 4.8, reviews: 5600,  img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  plumbing: {
    meta: { title: 'Plumbing', desc: 'Fast, reliable fixes for all plumbing needs' },
    items: [
      { id: 26, name: 'Tap Repair',         desc: 'Fix or replace leaking taps.',           price: 199, duration: '30 min', rating: 4.6, reviews: 6200, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
      { id: 27, name: 'Pipe Leakage Fix',   desc: 'Seal or replace damaged pipes.',         price: 349, duration: '45 min', rating: 4.7, reviews: 4400, img: 'https://images.unsplash.com/photo-1585659722983-36cb2b46f5e3?auto=format&fit=crop&w=400&q=80' },
      { id: 28, name: 'Tank Cleaning',      desc: 'Anti-bacterial clean for water tanks.',  price: 799, duration: '2 hrs',  rating: 4.8, reviews: 2100, img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80' },
      { id: 29, name: 'Geyser Install',     desc: 'Safe mounting & connection.',            price: 450, duration: '60 min', rating: 4.7, reviews: 1800, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80' },
      { id: 30, name: 'Toilet Unblocking',  desc: 'Clear clogs, restore drainage.',        price: 499, duration: '45 min', rating: 4.5, reviews: 3300, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  electrician: {
    meta: { title: 'Electrician', desc: 'Wiring, installations and electrical repairs' },
    items: [
      { id: 37, name: 'Fan / Light Setup',   desc: 'Ceiling fans & light fixtures.',       price: 199, duration: '30 min', rating: 4.7, reviews: 8900, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80' },
      { id: 38, name: 'Switchboard Repair',  desc: 'Fix sparking or dead switchboards.',   price: 299, duration: '30 min', rating: 4.6, reviews: 5600, img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=400&q=80' },
      { id: 39, name: 'Inverter Setup',      desc: 'Full wiring & inverter installation.', price: 599, duration: '90 min', rating: 4.8, reviews: 2100, img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  painting: {
    meta: { title: 'Painting', desc: 'Interior & exterior walls painted to perfection' },
    items: [
      { id: 31, name: 'Full Home Painting',  desc: 'Premium interior with touchups.',   price: 8999, duration: '2 days', rating: 4.9, reviews: 1200, img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80' },
      { id: 32, name: 'Wall Texture',        desc: 'Custom textured accent walls.',     price: 2500, duration: '4 hrs',  rating: 4.8, reviews: 760,  img: 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&w=400&q=80' },
      { id: 33, name: 'Wood Polish',         desc: 'Polish & shine for furniture.',     price: 1200, duration: '3 hrs',  rating: 4.7, reviews: 540,  img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  movers: {
    meta: { title: 'Packers & Movers', desc: 'Safe and secure relocation services' },
    items: [
      { id: 21, name: '1 BHK Shifting',     desc: 'Full pack & move for 1 BHK.',       price: 4500,  duration: '4 hrs',  rating: 4.7, reviews: 3100, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
      { id: 22, name: '2 BHK Shifting',     desc: 'Full pack & move for 2 BHK.',       price: 7500,  duration: '6 hrs',  rating: 4.8, reviews: 2400, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80' },
      { id: 23, name: 'Few Items Only',     desc: 'Mini truck for select furniture.',   price: 1500,  duration: '2 hrs',  rating: 4.6, reviews: 1800, img: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=400&q=80' },
      { id: 24, name: 'Office Relocation',  desc: 'IT equipment & furniture transport.',price: 12000, duration: '8 hrs',  rating: 4.9, reviews: 620,  img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' },
    ],
  },
  'pest-control': {
    meta: { title: 'Pest Control', desc: 'Eradicate bugs, termites and pests for good' },
    items: [
      { id: 34, name: 'General Pest Control', desc: 'Ants, roaches & basic pests.',      price: 899,  duration: '90 min', rating: 4.7, reviews: 3400, img: 'https://images.unsplash.com/photo-1623696500366-22a36b32230d?auto=format&fit=crop&w=400&q=80' },
      { id: 35, name: 'Termite Treatment',    desc: 'Deep wood treatment & prevention.', price: 1499, duration: '2 hrs',  rating: 4.8, reviews: 1900, img: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=400&q=80' },
      { id: 36, name: 'Bed Bug Control',      desc: 'Complete eradication of bed bugs.', price: 1299, duration: '2 hrs',  rating: 4.6, reviews: 1200, img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80' },
    ],
  },
};

type Sort = 'default' | 'price-asc' | 'price-desc' | 'rating';

export const ServicesPage = () => {
  const { category = 'cleaning' } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [sort, setSort] = useState<Sort>('default');

  const cat  = DATA[category] || DATA.cleaning;
  const list = [...cat.items].sort((a, b) =>
    sort === 'price-asc'  ? a.price - b.price  :
    sort === 'price-desc' ? b.price - a.price  :
    sort === 'rating'     ? b.rating - a.rating : 0
  );

  return (
    <div style={{ minHeight: '100vh', background: '#09090d', color: '#e4e4e8', paddingTop: 60 }}>

      {/* Category header */}
      <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: '#111117', padding: '32px 0' }}>
        <div className="max-w-6xl mx-auto px-5">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#62627a', marginBottom: 16 }}>
            <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#62627a', padding: 0 }}
              onMouseEnter={e => (e.currentTarget.style.color = '#e4e4e8')} onMouseLeave={e => (e.currentTarget.style.color = '#62627a')}>
              Home
            </button>
            <span style={{ color: '#2a2a35' }}>/</span>
            <span style={{ color: '#e4e4e8' }}>{cat.meta.title}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontWeight: 600, fontSize: 26, letterSpacing: '-0.02em', color: '#e4e4e8', marginBottom: 6 }}>{cat.meta.title}</h1>
              <p style={{ fontSize: 14, color: '#62627a' }}>{cat.meta.desc}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 10, fontSize: 12, color: '#62627a' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#b87d10' }}>★</span> Top rated
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0b9167', display: 'inline-block' }} />
                  {list.length} services
                </span>
              </div>
            </div>

            {/* Sort */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#62627a' }}>Sort by</span>
              <select
                value={sort} onChange={e => setSort(e.target.value as Sort)}
                style={{ background: '#17171f', border: '1px solid rgba(255,255,255,0.08)', color: '#e4e4e8', fontSize: 13, borderRadius: 8, padding: '6px 12px', outline: 'none', cursor: 'pointer' }}
              >
                <option value="default">Recommended</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Service cards */}
      <div className="max-w-6xl mx-auto px-5 py-10" style={{ paddingBottom: 80 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {list.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="card card-hover"
              style={{ display: 'flex', overflow: 'hidden', cursor: 'default' }}
            >
              {/* Image */}
              <div style={{ width: 160, minWidth: 160, position: 'relative', overflow: 'hidden', flexShrink: 0 }} className="hidden sm:block">
                <img src={s.img} alt={s.name} className="img-fill" style={{ transition: 'transform 400ms ease' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1.05)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLImageElement).style.transform = 'scale(1)')}
                />
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 6 }}>
                    <h3 style={{ fontWeight: 600, fontSize: 15, color: '#e4e4e8', letterSpacing: '-0.01em' }}>{s.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0, background: '#17171f', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '3px 8px', fontSize: 12 }}>
                      <span style={{ color: '#b87d10' }}>★</span>
                      <span style={{ fontWeight: 500, color: '#e4e4e8' }}>{s.rating}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: '#62627a', lineHeight: 1.6, marginBottom: 10 }}>{s.desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#2a2a35' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="#2a2a35" strokeWidth="1.4"/><path d="M8 5v3l2 2" stroke="#2a2a35" strokeWidth="1.4" strokeLinecap="round"/></svg>
                      {s.duration}
                    </span>
                    <span>·</span>
                    <span>{s.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 16, marginTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2a2a35', marginBottom: 2 }}>From</div>
                    <div style={{ fontWeight: 600, fontSize: 19, color: '#e4e4e8', letterSpacing: '-0.02em' }}>₹{s.price}</div>
                  </div>
                  <button
                    onClick={() => isAuthenticated ? navigate(`/booking/${s.id}`) : navigate('/login')}
                    className="btn-primary"
                    style={{ padding: '8px 20px' }}
                  >
                    Book now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
