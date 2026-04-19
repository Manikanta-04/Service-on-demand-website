import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const steps = ['Location', 'Date', 'Time Slot', 'Offers', 'Payment'];

export const BookingFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    address: '',
    date: '',
    time: '',
    serviceId: 'mock-service-123',
    amount: 500,
  });

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === 0 && !formData.address.trim()) {
      toast.error('Please enter your address');
      return;
    }
    if (currentStep === 1 && !formData.date) {
      toast.error('Please select a date');
      return;
    }
    if (currentStep === 2 && !formData.time) {
      toast.error('Please select a time slot');
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      submitBooking();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  const submitBooking = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const createRes = await axios.post(`${API_URL}/bookings/create-order`, {
        serviceId: '65a12b3c4d5e6f7a8b9c0d1e', // Valid ObjectId
        date: formData.date,
        time: formData.time,
        finalAmount: 350
      }, { withCredentials: true });

      const { orderId, bookingId } = createRes.data;

      // Mock webhook verification to confirm booking
      await axios.post(`${API_URL}/bookings/webhook`, {
        orderId,
        paymentId: 'pay_mock123',
        signature: 'valid',
        bookingId
      });

      toast.success('Booking confirmed successfully!');
      setIsComplete(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Booking failed. Please try again.');
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  // 1 for forward, -1 for backward
  const [direction, setDirection] = useState(1);


  return (
    <div className="max-w-3xl mx-auto p-6 bg-surface border border-border rounded-2xl shadow-xl">
      {isComplete ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <div className="w-24 h-24 bg-accent2/10 text-accent2 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display font-bold text-4xl mb-4 text-text">Booking Confirmed!</h2>
          <p className="text-muted text-lg mb-8 max-w-md mx-auto">
            Your service has been successfully booked for {formData.date} at {formData.time}. A worker will be assigned shortly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button 
              onClick={() => navigate('/dashboard')}
              className="bg-accent text-white px-8 py-3 rounded-lg font-medium hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
            >
              Go to My Bookings
            </button>
            <button 
              onClick={() => navigate('/')}
              className="bg-surface2 border border-border text-text px-8 py-3 rounded-lg font-medium hover:bg-surface transition-colors"
            >
              Return Home
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Progress Bar */}
          <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-surface2 -z-10 -translate-y-1/2 rounded-full" />
        <motion.div 
          className="absolute top-1/2 left-0 h-1 bg-accent -z-10 -translate-y-1/2 rounded-full" 
          initial={{ width: '0%' }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm border-2 transition-colors ${
              index <= currentStep ? 'bg-accent border-accent text-white shadow-[0_0_15px_rgba(124,110,244,0.5)]' : 'bg-surface2 border-border text-muted'
            }`}>
              {index + 1}
            </div>
            <span className={`text-xs font-mono uppercase hidden md:block ${index <= currentStep ? 'text-text' : 'text-faint'}`}>
              {step}
            </span>
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="relative min-h-[400px] overflow-hidden bg-surface2/50 rounded-xl p-6 border border-border/50">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full h-full flex flex-col"
          >
            {currentStep === 0 && (
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold mb-4 text-text">Where do you need the service?</h3>
                <input 
                  type="text" 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  className="w-full bg-surface border border-border rounded-lg p-4 text-text focus:border-accent outline-none transition-colors"
                  placeholder="Enter full address"
                />
              </div>
            )}
            
            {currentStep === 1 && (
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold mb-4 text-text">Select Date</h3>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full bg-surface border border-border rounded-lg p-4 text-text focus:border-accent outline-none"
                  style={{ colorScheme: 'dark' }}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold mb-4 text-text">Select Time Slot</h3>
                <div className="grid grid-cols-3 gap-4">
                  {['09:00', '11:00', '13:00', '15:00', '17:00'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setFormData({...formData, time})}
                      className={`p-4 rounded-lg border text-center transition-all ${
                        formData.time === time 
                        ? 'border-accent bg-accent/10 text-accent ring-1 ring-accent' 
                        : 'border-border bg-surface hover:border-accent/50 text-text'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="flex-1">
                <h3 className="font-display text-2xl font-semibold mb-4 text-text">Offers & Discounts</h3>
                <div className="p-4 border border-accent/30 bg-accent/5 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-accent">Festival Discount Applied!</h4>
                    <p className="text-sm text-muted">30% OFF on all services today.</p>
                  </div>
                  <span className="font-mono text-xl text-accent2">- ₹150</span>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="flex-1 flex flex-col justify-center items-center text-center">
                <h3 className="font-display text-3xl font-bold mb-2 text-text">Order Summary</h3>
                <p className="text-muted mb-8">Review your booking details</p>
                
                <div className="w-full max-w-md bg-surface border border-border rounded-xl p-6 text-left mb-6 shadow-lg">
                  <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border/50">
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center text-accent text-2xl">✨</div>
                    <div>
                      <h4 className="font-bold text-lg text-text">Premium Service</h4>
                      <p className="text-sm text-muted">Service ID: {formData.serviceId.slice(-6)}</p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between"><span className="text-muted">Date</span><span className="font-medium text-text">{formData.date}</span></div>
                    <div className="flex justify-between"><span className="text-muted">Time</span><span className="font-medium text-text">{formData.time}</span></div>
                    <div className="flex justify-between"><span className="text-muted">Location</span><span className="font-medium text-text truncate max-w-[200px]">{formData.address}</span></div>
                  </div>

                  <div className="space-y-3 bg-surface2/50 p-4 rounded-lg">
                    <div className="flex justify-between text-sm"><span className="text-muted">Base Price</span><span className="text-text">₹500</span></div>
                    <div className="flex justify-between text-sm"><span className="text-muted">Taxes & Fee</span><span className="text-text">₹50</span></div>
                    <div className="flex justify-between text-sm text-accent2"><span className="font-medium">Festival Discount</span><span className="font-medium">- ₹200</span></div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between font-display font-bold text-2xl"><span className="text-text">Total</span><span className="text-accent text-glow">₹{formData.amount}</span></div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button 
          onClick={() => { setDirection(-1); handlePrev(); }}
          disabled={currentStep === 0}
          className="px-6 py-2.5 rounded-lg border border-border bg-surface text-text font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-surface2 transition-colors"
        >
          Back
        </button>
        <button 
          onClick={() => { setDirection(1); handleNext(); }}
          className="px-8 py-2.5 rounded-lg bg-accent text-white font-medium hover:bg-accent/90 transition-colors shadow-[0_4px_14px_rgba(124,110,244,0.39)]"
        >
          {currentStep === steps.length - 1 ? 'Pay with Razorpay' : 'Continue'}
        </button>
        </div>
      </>
      )}
    </div>
  );
};
