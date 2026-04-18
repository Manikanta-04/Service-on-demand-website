import mongoose, { Document, Schema } from 'mongoose';

export interface IService extends Document {
  category: string;
  name: string;
  price: number;
  description: string;
  workerCount: number;
  isActive: boolean;
  createdBy: mongoose.Types.ObjectId;
}

const ServiceSchema: Schema = new Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  workerCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

export default mongoose.model<IService>('Service', ServiceSchema);
