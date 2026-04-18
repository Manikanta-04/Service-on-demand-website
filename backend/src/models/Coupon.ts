import mongoose, { Document, Schema } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discountPct: number;
  maxAmount: number;
  isActive: boolean;
}

const CouponSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  discountPct: { type: Number, required: true },
  maxAmount: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
});

export default mongoose.model<ICoupon>('Coupon', CouponSchema);
