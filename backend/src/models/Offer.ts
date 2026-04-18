import mongoose, { Document, Schema } from 'mongoose';

export interface IOffer extends Document {
  type: string;
  value: number;
  conditions: Record<string, any>;
  isActive: boolean;
}

const OfferSchema: Schema = new Schema({
  type: { type: String, required: true },
  value: { type: Number, required: true },
  conditions: { type: Schema.Types.Mixed },
  isActive: { type: Boolean, default: true }
});

export default mongoose.model<IOffer>('Offer', OfferSchema);
