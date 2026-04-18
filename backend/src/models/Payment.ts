import mongoose, { Document, Schema } from 'mongoose';

export interface IPayment extends Document {
  bookingId: mongoose.Types.ObjectId;
  razorpayOrderId: string;
  razorpayPaymentId?: string;
  amount: number;
  status: 'CREATED' | 'SUCCESS' | 'FAILED' | 'REFUNDED';
  webhookVerified: boolean;
}

const PaymentSchema: Schema = new Schema({
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['CREATED', 'SUCCESS', 'FAILED', 'REFUNDED'], default: 'CREATED' },
  webhookVerified: { type: Boolean, default: false }
});

export default mongoose.model<IPayment>('Payment', PaymentSchema);
