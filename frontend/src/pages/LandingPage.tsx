import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const services = [
  { id: 1, name: 'Salon for Women', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=600&q=80', desc: 'Expert beauty & grooming' },
  { id: 2, name: 'Deep Cleaning', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80', desc: 'Complete home sanitization' },
  { id: 3, name: 'Appliance Repair', img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80', desc: 'AC, Fridge & Washing Machine' },
  { id: 4, name: 'Plumbing & Pipes', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80', desc: 'Quick leak & block fixes' },
  { id: 5, name: 'Professional Painting', img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80', desc: 'Interior & exterior walls' },
  { id: 6, name: 'Packers & Movers', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', desc: 'Safe & secure shifting' },
  { id: 7, name: 'Electrician', img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80', desc: 'Wiring & installations' },
  { id: 8, name: 'Pest Control', img: 'https://images.unsplash.com/photo-1623696500366-22a36b32230d?auto=format&fit=crop&w=600&q=80', desc: 'Eradicate bugs & termites' }
];

const stats = [
  { label: 'Happy Customers', value: '12M+' },
  { label: 'Average Rating', value: '4.8/5 ⭐' },
  { label: 'Verified Pros', value: '50k+' },
  { label: 'Cities Covered', value: '45+' }
];

const popularServices = [
  { id: 1, name: 'AC Servicing', rating: '4.8 (12k)', price: '₹699', img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Deep Home Cleaning', rating: '4.9 (8k)', price: '₹1499', img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Men\'s Haircut', rating: '4.7 (20k)', price: '₹499', img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80' },
  { id: 4, name: 'Plumbing Repair', rating: '4.6 (15k)', price: '₹199', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' }
];

export const LandingPage = () => {
  const navigate = useNavigate();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const backgroundX = useTransform(springX, [-1, 1], ['-2%', '2%']);
  const backgroundY = useTransform(springY, [-1, 1], ['-2%', '2%']);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="min-h-screen bg-surface selection:bg-accent/30 text-text">
      {/* Hero Section */}
      <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Video with Overlay and Parallax */}
        <motion.div 
          className="absolute inset-[-5%] z-0"
          style={{ x: backgroundX, y: backgroundY }}
        >
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover opacity-70"
            poster="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1920&q=80"
          >
            {/* High quality stock video for cleaning/services */}
            <source src="https://cdn.pixabay.com/video/2020/06/19/42555-432029706_large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-surface/40" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl px-6 pt-32 pb-20 text-center z-10"
        >
        <h1 className="font-display font-extrabold text-6xl md:text-8xl tracking-tight mb-6">
          <span className="block text-text">Service Now</span>
        </h1>
        <p className="font-body text-muted text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          A full-stack, location-aware service booking platform. Real-time slot availability, 
          dynamic worker assignment, and an advanced premium UI.
        </p>

        {/* Floating Search Bar */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="max-w-xl mx-auto bg-surface/50 backdrop-blur-xl border border-border rounded-full p-2 flex items-center shadow-2xl"
        >
          <input 
            type="text" 
            placeholder="Search for a service or address..." 
            className="flex-1 bg-transparent border-none outline-none px-6 text-text font-body placeholder:text-faint"
          />
          <button 
            onClick={() => navigate('/login')}
            className="bg-accent text-white px-8 py-3 rounded-full font-display font-semibold hover:bg-accent/90 transition-colors"
          >
            Find Service
          </button>
        </motion.div>
        </motion.div>
      </div>

      {/* Services Grid (Rich Cards) */}
      <div className="w-full max-w-7xl mx-auto px-6 py-20 z-10">
        <div className="text-center mb-16">
          <div className="font-mono text-[12px] text-accent tracking-widest uppercase mb-3 font-bold">
            Explore Categories
          </div>
          <h2 className="font-display font-bold text-4xl text-text">Premium Services</h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((s) => (
            <motion.div
              key={s.id}
              variants={{
                hidden: { y: 40, opacity: 0 },
                show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
              }}
              whileHover={{ y: -6 }}
              className="bg-surface border border-border rounded-2xl cursor-pointer group shadow-md hover:shadow-xl hover:border-accent/50 transition-all duration-300 relative flex flex-col h-[340px]"
              onClick={() => navigate(`/services/${s.name.toLowerCase().replace(' ', '-')}`)}
            >
              <div className="h-48 w-full overflow-hidden rounded-t-2xl">
                <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-center">
                <h3 className="font-display font-bold text-xl text-text mb-2 group-hover:text-accent transition-colors">
                  {s.name}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-accent/30 transition-all pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Trust Banner / Stats */}
      <div className="w-full border-y border-border bg-surface2/30 py-10 my-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-display font-bold text-3xl text-text mb-1">{stat.value}</div>
              <div className="text-muted text-sm uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Categories Section */}
      <div className="w-full max-w-7xl mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-4xl mb-4 text-text">What do you need help with?</h2>
          <p className="text-muted text-lg">Choose from our most popular premium services.</p>
        </div>
      </div>

      {/* Most Booked Services Section */}
      <div className="w-full max-w-7xl mx-auto px-6 pb-24">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="font-display font-bold text-4xl mb-2 text-text">Most Booked Services</h2>
            <p className="text-muted text-lg">Trending services based on customer bookings.</p>
          </div>
          <button className="text-accent font-medium hover:underline hidden sm:block">See All →</button>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 pt-4 snap-x snap-mandatory hide-scrollbar -mx-6 px-6">
          {popularServices.map((ps) => (
            <motion.div 
              key={ps.id}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/booking/${ps.id}`)}
              className="bg-surface border border-border rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl transition-all min-w-[280px] sm:min-w-[320px] snap-start shrink-0 flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                <img src={ps.img} alt={ps.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-3 py-1 rounded shadow-md uppercase tracking-wide">Popular</div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-display font-bold text-xl text-text leading-tight">{ps.name}</h3>
                </div>
                <div className="flex items-center text-sm text-muted mb-6">
                  <span className="text-[#f4c76e] mr-1 text-base">★</span> <span className="font-medium text-text/90">{ps.rating.split(' ')[0]}</span> <span className="ml-1 text-faint">({ps.rating.split(' ')[1].replace(/[()]/g, '')} reviews)</span>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-4 mt-auto">
                  <div>
                    <div className="text-xs text-faint uppercase tracking-wider mb-1">Starting from</div>
                    <div className="font-display font-bold text-2xl text-text">{ps.price}</div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/booking/${ps.id}`); }}
                    className="text-sm font-bold text-white bg-accent px-6 py-2.5 rounded-lg hover:bg-accent/90 transition-colors shadow-md"
                  >
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it Works Section */}
      <div className="w-full bg-surface2/50 py-24 border-y border-border">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="font-display font-bold text-4xl mb-16 text-text">How Service Now Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface border border-border text-accent rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">📱</div>
              <h3 className="font-bold text-xl mb-3 text-text">1. Book a Service</h3>
              <p className="text-muted leading-relaxed">Choose your required service, select a convenient time slot, and view transparent pricing upfront.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface border border-border text-accent2 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">👨‍🔧</div>
              <h3 className="font-bold text-xl mb-3 text-text">2. Pro Arrives</h3>
              <p className="text-muted leading-relaxed">A fully verified, background-checked professional arrives at your doorstep equipped with the right tools.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-surface border border-border text-accent4 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-sm">✨</div>
              <h3 className="font-bold text-xl mb-3 text-text">3. Job Done</h3>
              <p className="text-muted leading-relaxed">Enjoy your completed service. Pay securely online and leave a review for your professional.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
