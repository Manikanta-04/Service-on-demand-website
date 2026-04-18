import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/useAuthStore';

const mockServices: Record<string, any[]> = {
  salon: [
    { id: 1, name: 'Haircut & Styling', desc: 'Premium haircut with top stylists.', price: 499, img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'Facial & Cleanup', desc: 'Deep cleansing and glowing facial.', price: 899, img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Manicure & Pedicure', desc: 'Complete nail care and massage.', price: 699, img: 'https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'Hair Spa', desc: 'Nourishing hair spa treatment.', price: 1200, img: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Bridal Makeup', desc: 'Professional makeup for your special day.', price: 4999, img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=400&q=80' }
  ],
  cleaning: [
    { id: 6, name: 'Deep Home Cleaning', desc: 'Intensive full-house deep cleaning.', price: 1499, img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80' },
    { id: 7, name: 'Sofa Cleaning', desc: 'Dry and wet vacuuming for fabric sofas.', price: 599, img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80' },
    { id: 8, name: 'Bathroom Cleaning', desc: 'Deep stain removal and sanitization.', price: 399, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
    { id: 9, name: 'Kitchen Deep Cleaning', desc: 'Degreasing of chimneys, cabinets, and slabs.', price: 899, img: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=400&q=80' },
    { id: 10, name: 'Carpet Cleaning', desc: 'Shampooing and deep extraction for carpets.', price: 499, img: 'https://images.unsplash.com/photo-1558383409-ab7efce0a187?auto=format&fit=crop&w=400&q=80' }
  ],
  repair: [
    { id: 11, name: 'AC Servicing', desc: 'Comprehensive AC maintenance and gas check.', price: 699, img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80' },
    { id: 12, name: 'Washing Machine Repair', desc: 'Fix motor, drum, or drainage issues.', price: 450, img: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80' },
    { id: 13, name: 'Refrigerator Repair', desc: 'Cooling issues, compressor check, and gas refill.', price: 500, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
    { id: 14, name: 'Microwave Repair', desc: 'Heating issues and panel replacement.', price: 350, img: 'https://images.unsplash.com/photo-1585659722983-36cb2b46f5e3?auto=format&fit=crop&w=400&q=80' },
    { id: 15, name: 'TV Installation', desc: 'Wall mounting and setup of LED/Smart TVs.', price: 400, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80' }
  ],
  laundry: [
    { id: 16, name: 'Wash & Fold', desc: 'Everyday clothes washed and neatly folded.', price: 199, img: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=400&q=80' },
    { id: 17, name: 'Wash & Iron', desc: 'Washed, dried, and professionally pressed.', price: 299, img: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=400&q=80' },
    { id: 18, name: 'Dry Cleaning', desc: 'Premium care for suits and delicate fabrics.', price: 499, img: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=400&q=80' },
    { id: 19, name: 'Shoe Laundry', desc: 'Deep cleaning and restoration for footwear.', price: 349, img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80' },
    { id: 20, name: 'Blanket & Curtain', desc: 'Heavy fabrics washed and sanitized.', price: 599, img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80' }
  ],
  movers: [
    { id: 21, name: '1 BHK Shifting', desc: 'Complete packing and moving for 1 BHK.', price: 4500, img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
    { id: 22, name: '2 BHK Shifting', desc: 'Complete packing and moving for 2 BHK.', price: 7500, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80' },
    { id: 23, name: 'Few Items Shifting', desc: 'Mini truck for selective furniture/appliances.', price: 1500, img: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=400&q=80' },
    { id: 24, name: 'Office Relocation', desc: 'Safe transport of IT equipment and desks.', price: 12000, img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80' },
    { id: 25, name: 'Vehicle Transport', desc: 'Inter-city safe transport for 2/4 wheelers.', price: 5000, img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80' }
  ],
  plumbing: [
    { id: 26, name: 'Tap Repair/Replace', desc: 'Fix leaking taps or install new ones.', price: 199, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' },
    { id: 27, name: 'Pipe Leakage Fix', desc: 'Seal or replace leaking PVC/metal pipes.', price: 349, img: 'https://images.unsplash.com/photo-1585659722983-36cb2b46f5e3?auto=format&fit=crop&w=400&q=80' },
    { id: 28, name: 'Water Tank Cleaning', desc: 'Anti-bacterial cleaning for overhead tanks.', price: 799, img: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80' },
    { id: 29, name: 'Geyser Installation', desc: 'Safe mounting and connection of water heaters.', price: 450, img: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=400&q=80' },
    { id: 30, name: 'Toilet Blockage', desc: 'Clear clogs and ensure smooth drainage.', price: 499, img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80' }
  ],
  painting: [
    { id: 31, name: 'Full House Painting', desc: 'Premium interior painting with touchups.', price: 8999, img: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80' },
    { id: 32, name: 'Wall Texture', desc: 'Custom textured accent walls.', price: 2500, img: 'https://images.unsplash.com/photo-1562664377-709f2c337eb2?auto=format&fit=crop&w=400&q=80' },
    { id: 33, name: 'Wood Polish', desc: 'Polishing and shining for wooden furniture.', price: 1200, img: 'https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?auto=format&fit=crop&w=400&q=80' }
  ],
  'pest-control': [
    { id: 34, name: 'General Pest Control', desc: 'Ants, roaches, and basic pest extermination.', price: 899, img: 'https://images.unsplash.com/photo-1623696500366-22a36b32230d?auto=format&fit=crop&w=400&q=80' },
    { id: 35, name: 'Termite Treatment', desc: 'Deep wood treatment for termite prevention.', price: 1499, img: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=400&q=80' },
    { id: 36, name: 'Bed Bug Control', desc: 'Complete eradication of bed bugs.', price: 1299, img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80' }
  ],
  electrician: [
    { id: 37, name: 'Fan/Light Setup', desc: 'Installation of ceiling fans and light fixtures.', price: 199, img: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80' },
    { id: 38, name: 'Switchboard Repair', desc: 'Fixing sparking or dead switchboards.', price: 299, img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=400&q=80' },
    { id: 39, name: 'Inverter Setup', desc: 'Complete wiring and installation of inverters.', price: 599, img: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=400&q=80' }
  ],
  carpentry: [
    { id: 40, name: 'Furniture Assembly', desc: 'Assemble beds, wardrobes, and tables.', price: 450, img: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=400&q=80' },
    { id: 41, name: 'Door Lock Repair', desc: 'Fix or replace jammed door locks.', price: 250, img: 'https://images.unsplash.com/photo-1582136005085-f55bb1590fc5?auto=format&fit=crop&w=400&q=80' },
    { id: 42, name: 'Custom Shelving', desc: 'Build and mount custom wooden shelves.', price: 850, img: 'https://images.unsplash.com/photo-1581141849291-1125c7b692b5?auto=format&fit=crop&w=400&q=80' }
  ],
  'smart-home': [
    { id: 43, name: 'CCTV Installation', desc: 'Secure your home with full camera setups.', price: 1500, img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=400&q=80' },
    { id: 44, name: 'Smart Lock Setup', desc: 'Install and configure fingerprint/WiFi locks.', price: 800, img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80' },
    { id: 45, name: 'Alexa/HomeKit Config', desc: 'Automate lights, ACs, and switches.', price: 600, img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=400&q=80' }
  ],
  'auto-care': [
    { id: 46, name: 'Car Wash at Home', desc: 'Exterior wash and interior vacuuming.', price: 499, img: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=400&q=80' },
    { id: 47, name: 'Bike Servicing', desc: 'Oil change, chain lube, and general service.', price: 699, img: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80' },
    { id: 48, name: 'Jumpstart & Battery', desc: 'Emergency jumpstart and battery checking.', price: 350, img: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=400&q=80' }
  ]
};

export const ServicesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  
  const categoryKey = category?.toLowerCase() || '';
  const servicesList = mockServices[categoryKey] || mockServices.cleaning;

  return (
    <div className="min-h-screen pt-24 px-6 max-w-6xl mx-auto pb-20">
      <div className="mb-12 text-center">
        <h2 className="font-display text-5xl font-bold mb-4 capitalize text-text">{category} Services</h2>
        <p className="text-muted text-lg max-w-2xl mx-auto">
          Select a premium service from the {category} category. We ensure top-quality professionals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {servicesList.map((service, idx) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card overflow-hidden group flex flex-col md:flex-row"
          >
            <div className="md:w-2/5 h-48 md:h-auto relative overflow-hidden">
              <img 
                src={service.img} 
                alt={service.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
            </div>
            
            <div className="p-6 md:w-3/5 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-2xl mb-2 group-hover:text-accent transition-colors">{service.name}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{service.desc}</p>
              </div>
              
              <div className="flex items-end justify-between mt-4">
                <div>
                  <div className="text-xs text-faint uppercase font-mono tracking-wider mb-1">Price</div>
                  <div className="font-display text-2xl font-bold text-accent2">₹{service.price}</div>
                </div>
                <button 
                  onClick={() => {
                    if (isAuthenticated) navigate(`/booking/${service.id}`);
                    else navigate('/login');
                  }}
                  className="bg-surface2 border border-border text-text px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent hover:border-accent hover:text-white transition-all"
                >
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
