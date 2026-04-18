import { useParams } from 'react-router-dom';
import { BookingFlow } from '../components/BookingFlow';

export const BookingPage = () => {
  const { serviceId } = useParams();

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h2 className="font-display text-4xl font-bold mb-4">Book Service</h2>
        <p className="text-muted">Complete the steps below to secure your slot for {serviceId}.</p>
      </div>
      <BookingFlow />
    </div>
  );
};
