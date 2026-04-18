import mongoose, { Document, Schema } from 'mongoose';

export interface IBooking extends Document {
  userId: mongoose.Types.ObjectId;
  workerId: mongoose.Types.ObjectId;
  serviceId: mongoose.Types.ObjectId;
  slotDate: string;
  slotTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  finalAmount: number;
  discountApplied: number;
  commissionAmount: number;
}

const BookingSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Worker' }, // Nullable until assigned
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  slotDate: { type: String, required: true },
  slotTime: { type: String, required: true },
  status: { type: String, enum: ['PENDING', 'CONFIRMED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'PENDING' },
  finalAmount: { type: Number, required: true },
  discountApplied: { type: Number, default: 0 },
  commissionAmount: { type: Number, required: true },
});

export default mongoose.model<IBooking>('Booking', BookingSchema);
