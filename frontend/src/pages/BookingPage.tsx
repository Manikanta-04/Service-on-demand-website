import { useParams, useNavigate } from 'react-router-dom';
import { BookingFlow } from '../components/BookingFlow';

// A minimal service lookup so the booking page can show the correct name/price
const serviceInfo: Record<string, { name: string; price: number; category: string }> = {
  '1':  { name: 'AC Servicing',         price: 699,  category: 'Appliance Repair' },
  '2':  { name: 'Deep Home Cleaning',   price: 1499, category: 'Cleaning' },
  '3':  { name: "Men's Haircut",        price: 499,  category: 'Salon' },
  '4':  { name: 'Plumbing Repair',      price: 199,  category: 'Plumbing' },
};

export const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate      = useNavigate();
  const info          = serviceInfo[serviceId || ''] || { name: 'Service', price: 500, category: 'Home Services' };

  return (
    <div className="min-h-screen bg-bg pt-16">
      <div className="max-w-2xl mx-auto px-5 py-10 pb-24">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[12px] text-muted mb-8">
          <button onClick={() => navigate('/')} className="hover:text-text transition-colors">Home</button>
          <span className="text-faint">/</span>
          <button onClick={() => navigate(-1)} className="hover:text-text transition-colors">{info.category}</button>
          <span className="text-faint">/</span>
          <span className="text-text">Book Now</span>
        </div>

        {/* Service summary chip */}
        <div className="flex items-center gap-4 card p-4 mb-8">
          <div className="w-10 h-10 rounded-xl bg-accent-dim border border-accent/20 flex items-center justify-center text-accent-light text-[18px] shrink-0">
            🔧
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-[15px] text-text truncate">{info.name}</div>
            <div className="text-[12px] text-muted">{info.category}</div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[10px] uppercase tracking-wider text-faint">From</div>
            <div className="font-semibold text-[17px] text-text">₹{info.price}</div>
          </div>
        </div>

        {/* The booking flow wizard */}
        <div className="card p-6">
          <BookingFlow
            serviceId={serviceId}
            serviceName={info.name}
            basePrice={info.price}
          />
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-3 gap-3 mt-6">
          {[
            { icon: '🛡️', text: 'Verified pros' },
            { icon: '💰', text: 'Transparent pricing' },
            { icon: '⭐', text: '4.8 avg rating' },
          ].map(b => (
            <div key={b.text} className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-border bg-surface/40 text-center">
              <span className="text-[18px]">{b.icon}</span>
              <span className="text-[11px] text-muted">{b.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
