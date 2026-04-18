import crypto from 'crypto';

export const createRazorpayOrder = async (amountInPaise: number): Promise<{ id: string, amount: number }> => {
  // Mocking Razorpay order creation
  const dummyOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;
  return {
    id: dummyOrderId,
    amount: amountInPaise
  };
};

export const verifyRazorpaySignature = (orderId: string, paymentId: string, signature: string): boolean => {
  // Mocking signature verification
  // In a real app, we'd use crypto.createHmac with RAZORPAY_KEY_SECRET
  // For the mock, we just return true unless the signature is "fail"
  return signature !== 'fail';
};
