import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';

const mockServices: Record<string, any[]> = {
  salon: [
    { id: 1, name: 'Haircut & Styling', desc: 'Premium haircut with top stylists.', price: 499, duration: '45 min', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 2100 },
    { id: 2, name: 'Facial & Cleanup', desc: 'Deep cleansing and glowing facial.', price: 899, duration: '60 min', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviews: 890 },
    { id: 3, name: 'Manicure & Pedicure', desc: 'Complete nail care and massage.', price: 699, duration: '50 min', img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 1400 },
    { id: 4, name: 'Hair Spa', desc: 'Nourishing hair spa treatment.', price: 1200, duration: '75 min', img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 650 },
    { id: 5, name: 'Bridal Makeup', desc: 'Professional makeup for your special day.', price: 4999, duration: '120 min', img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviews: 310 },
  ],
  cleaning: [
    { id: 6,  name: 'Deep Home Cleaning',     desc: 'Intensive full-house deep cleaning.',         price: 1499, duration: '3 hrs', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviews: 8200 },
    { id: 7,  name: 'Sofa Cleaning',           desc: 'Dry and wet vacuuming for fabric sofas.',     price: 599,  duration: '90 min', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 3400 },
    { id: 8,  name: 'Bathroom Cleaning',       desc: 'Deep stain removal and sanitization.',        price: 399,  duration: '60 min', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviews: 5100 },
    { id: 9,  name: 'Kitchen Deep Cleaning',   desc: 'Degreasing chimneys, cabinets & slabs.',     price: 899,  duration: '2 hrs', img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 2800 },
    { id: 10, name: 'Carpet Cleaning',         desc: 'Shampooing and deep extraction.',             price: 499,  duration: '90 min', img: 'https://images.unsplash.com/photo-1558383409-ab7efce0a187?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 1900 },
  ],
  repair: [
    { id: 11, name: 'AC Servicing',            desc: 'Comprehensive AC maintenance & gas check.',  price: 699,  duration: '90 min', img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 12000 },
    { id: 12, name: 'Washing Machine Repair',  desc: 'Fix motor, drum, or drainage issues.',       price: 450,  duration: '60 min', img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 4200 },
    { id: 13, name: 'Refrigerator Repair',     desc: 'Cooling issues, compressor & gas refill.',   price: 500,  duration: '75 min', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviews: 3800 },
    { id: 14, name: 'Microwave Repair',        desc: 'Heating issues and panel replacement.',      price: 350,  duration: '45 min', img: 'https://images.unsplash.com/photo-1585659722983-36cb2b46f5e3?auto=format&fit=crop&w=400&q=80', rating: 4.5, reviews: 1200 },
    { id: 15, name: 'TV Installation',         desc: 'Wall mounting & setup of LED/Smart TVs.',    price: 400,  duration: '60 min', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 5600 },
  ],
  plumbing: [
    { id: 26, name: 'Tap Repair/Replace',  desc: 'Fix leaking taps or install new ones.',         price: 199, duration: '30 min', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviews: 6200 },
    { id: 27, name: 'Pipe Leakage Fix',    desc: 'Seal or replace leaking pipes.',               price: 349, duration: '45 min', img: 'https://images.unsplash.com/photo-1585659722983-36cb2b46f5e3?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 4400 },
    { id: 28, name: 'Water Tank Cleaning', desc: 'Anti-bacterial cleaning for overhead tanks.',  price: 799, duration: '2 hrs', img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 2100 },
    { id: 29, name: 'Geyser Installation', desc: 'Safe mounting and connection of water heaters.', price: 450, duration: '60 min', img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 1800 },
    { id: 30, name: 'Toilet Blockage',    desc: 'Clear clogs and ensure smooth drainage.',       price: 499, duration: '45 min', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80', rating: 4.5, reviews: 3300 },
  ],
  painting: [
    { id: 31, name: 'Full House Painting', desc: 'Premium interior painting with touchups.', price: 8999, duration: '2 days', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviews: 1200 },
    { id: 32, name: 'Wall Texture',        desc: 'Custom textured accent walls.',            price: 2500, duration: '4 hrs', img: 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 760 },
    { id: 33, name: 'Wood Polish',         desc: 'Polishing & shining wooden furniture.',   price: 1200, duration: '3 hrs', img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 540 },
  ],
  movers: [
    { id: 21, name: '1 BHK Shifting',     desc: 'Complete packing & moving for 1 BHK.',   price: 4500,  duration: '4 hrs', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 3100 },
    { id: 22, name: '2 BHK Shifting',     desc: 'Complete packing & moving for 2 BHK.',   price: 7500,  duration: '6 hrs', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 2400 },
    { id: 23, name: 'Few Items Shifting', desc: 'Mini truck for selective furniture.',     price: 1500,  duration: '2 hrs', img: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviews: 1800 },
    { id: 24, name: 'Office Relocation',  desc: 'Safe transport of IT equipment & desks.', price: 12000, duration: '8 hrs', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80', rating: 4.9, reviews: 620 },
  ],
  electrician: [
    { id: 37, name: 'Fan/Light Setup',      desc: 'Installation of ceiling fans & light fixtures.', price: 199, duration: '30 min', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 8900 },
    { id: 38, name: 'Switchboard Repair',   desc: 'Fixing sparking or dead switchboards.',         price: 299, duration: '30 min', img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviews: 5600 },
    { id: 39, name: 'Inverter Setup',       desc: 'Complete wiring & installation of inverters.',  price: 599, duration: '90 min', img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 2100 },
  ],
  'pest-control': [
    { id: 34, name: 'General Pest Control', desc: 'Ants, roaches, and basic pest extermination.', price: 899,  duration: '90 min', img: 'https://images.unsplash.com/photo-1623696500366-22a36b32230d?auto=format&fit=crop&w=400&q=80', rating: 4.7, reviews: 3400 },
    { id: 35, name: 'Termite Treatment',    desc: 'Deep wood treatment for termite prevention.',  price: 1499, duration: '2 hrs', img: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=400&q=80', rating: 4.8, reviews: 1900 },
    { id: 36, name: 'Bed Bug Control',      desc: 'Complete eradication of bed bugs.',           price: 1299, duration: '2 hrs', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80', rating: 4.6, reviews: 1200 },
  ],
};

const categoryMeta: Record<string, { title: string; icon: string; desc: string }> = {
  salon:        { title: 'Salon & Beauty',   icon: '✦', desc: 'Expert beauty & grooming professionals at your doorstep' },
  cleaning:     { title: 'Deep Cleaning',    icon: '✦', desc: 'Complete home sanitization by certified professionals' },
  repair:       { title: 'Appliance Repair', icon: '✦', desc: 'AC, fridge, washing machine & more — fixed right' },
  plumbing:     { title: 'Plumbing',         icon: '✦', desc: 'Quick, reliable fixes for all plumbing issues' },
  painting:     { title: 'Painting',         icon: '✦', desc: 'Interior & exterior walls painted to perfection' },
  movers:       { title: 'Packers & Movers', icon: '✦', desc: 'Safe, secure relocation from local to inter-city' },
  electrician:  { title: 'Electrician',      icon: '✦', desc: 'Wiring, installations, and electrical repairs' },
  'pest-control': { title: 'Pest Control',  icon: '✦', desc: 'Eradicate bugs, termites, and pests for good' },
};

type SortKey = 'default' | 'price-asc' | 'price-desc' | 'rating';

export const ServicesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [sort, setSort] = useState<SortKey>('default');

  const key  = (category || 'cleaning').toLowerCase();
  const meta = categoryMeta[key] || { title: key, icon: '✦', desc: '' };
  const raw  = mockServices[key] || mockServices.cleaning;

  const sorted = [...raw].sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price;
    if (sort === 'price-desc') return b.price - a.price;
    if (sort === 'rating')     return b.rating - a.rating;
    return 0;
  });

  const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
  const cardItem = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 90, damping: 18 } } };

  return (
    <div className="min-h-screen bg-bg pt-16">

      {/* Category hero banner */}
      <div className="relative border-b border-border bg-surface/40">
        <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto px-5 py-12 relative z-10">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[12px] text-muted mb-6">
            <button onClick={() => navigate('/')} className="hover:text-text transition-colors">Home</button>
            <span className="text-faint">/</span>
            <button onClick={() => navigate('/services')} className="hover:text-text transition-colors">Services</button>
            <span className="text-faint">/</span>
            <span className="text-text capitalize">{meta.title}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end gap-4 justify-between">
            <div>
              <h1 className="font-bold text-3xl sm:text-4xl text-text mb-2">{meta.title}</h1>
              <p className="text-muted text-[15px]">{meta.desc}</p>
              <div className="flex items-center gap-4 mt-3 text-[13px] text-muted">
                <span className="flex items-center gap-1.5"><span className="text-amber">★</span> Top rated</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  {raw.length} services available
                </span>
              </div>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[12px] text-muted">Sort:</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value as SortKey)}
                className="bg-surface2 border border-border text-text text-[13px] rounded-lg px-3 py-2 outline-none focus:border-accent cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="rating">Top rated</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Services list */}
      <div className="max-w-6xl mx-auto px-5 py-10 pb-24">
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {sorted.map(service => (
            <motion.div
              key={service.id}
              variants={cardItem}
              className="card overflow-hidden group flex flex-col sm:flex-row"
            >
              {/* Image */}
              <div className="sm:w-[180px] shrink-0 h-44 sm:h-auto relative overflow-hidden">
                <img
                  src={service.img}
                  alt={service.name}
                  className="img-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-surface/20 sm:from-transparent sm:to-surface/40" />
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-semibold text-[16px] text-text group-hover:text-accent-light transition-colors leading-snug">{service.name}</h3>
                    <div className="flex items-center gap-1 shrink-0 text-[12px] bg-surface2 border border-border rounded-md px-2 py-1">
                      <span className="text-amber">★</span>
                      <span className="font-medium text-text">{service.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted text-[13px] leading-relaxed">{service.desc}</p>
                  <div className="flex items-center gap-3 mt-3 text-[12px] text-faint">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.2"/><path d="M8 5v3l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                      {service.duration}
                    </span>
                    <span>·</span>
                    <span>{service.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-border">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-faint">Starting from</div>
                    <div className="font-semibold text-[20px] text-text mt-0.5">₹{service.price}</div>
                  </div>
                  <button
                    onClick={() => isAuthenticated ? navigate(`/booking/${service.id}`) : navigate('/login')}
                    className="btn-primary text-[13px] py-2.5 px-5"
                  >
                    Book now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
