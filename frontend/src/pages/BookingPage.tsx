import { useParams, useNavigate } from 'react-router-dom';
import { BookingFlow } from '../components/BookingFlow';

const INFO: Record<string, { name: string; price: number; cat: string }> = {
  '1':  { name: 'AC Servicing',       price: 699,  cat: 'Appliance Repair' },
  '2':  { name: 'Deep Home Cleaning', price: 1499, cat: 'Cleaning' },
  '3':  { name: "Men's Haircut",      price: 499,  cat: 'Salon' },
  '4':  { name: 'Plumbing Repair',    price: 199,  cat: 'Plumbing' },
};

const card: React.CSSProperties = {
  background: '#111117', border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: 12, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
};

export const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const info = INFO[serviceId || ''] || { name: 'Service', price: 500, cat: 'Home Services' };

  return (
    <div style={{ minHeight: '100vh', background: '#09090d', color: '#e4e4e8', paddingTop: 60 }}>
      <div className="max-w-xl mx-auto px-5 py-10 pb-24">

        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#62627a', marginBottom: 24 }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#62627a', padding: 0, fontSize: 12 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e4e4e8')} onMouseLeave={e => (e.currentTarget.style.color = '#62627a')}>
            Home
          </button>
          <span style={{ color: '#2a2a35' }}>/</span>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#62627a', padding: 0, fontSize: 12 }}
            onMouseEnter={e => (e.currentTarget.style.color = '#e4e4e8')} onMouseLeave={e => (e.currentTarget.style.color = '#62627a')}>
            {info.cat}
          </button>
          <span style={{ color: '#2a2a35' }}>/</span>
          <span style={{ color: '#e4e4e8' }}>Book</span>
        </div>

        {/* Service info chip */}
        <div style={{ ...card, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 9, background: 'rgba(78,81,174,0.10)', border: '1px solid rgba(78,81,174,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 17, flexShrink: 0 }}>🔧</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#e4e4e8' }}>{info.name}</div>
            <div style={{ fontSize: 12, color: '#62627a' }}>{info.cat}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#2a2a35' }}>From</div>
            <div style={{ fontWeight: 600, fontSize: 17, color: '#e4e4e8' }}>₹{info.price}</div>
          </div>
        </div>

        {/* Booking wizard */}
        <div style={{ ...card, padding: '24px' }}>
          <BookingFlow serviceId={serviceId} serviceName={info.name} basePrice={info.price} />
        </div>

        {/* Trust row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 14 }}>
          {[{ e: '🛡️', t: 'Verified pros' }, { e: '💰', t: 'No hidden fees' }, { e: '★', t: '4.8 rated' }].map(b => (
            <div key={b.t} style={{ ...card, padding: '12px 8px', textAlign: 'center' }}>
              <div style={{ fontSize: 16, marginBottom: 4 }}>{b.e}</div>
              <div style={{ fontSize: 11, color: '#62627a' }}>{b.t}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
