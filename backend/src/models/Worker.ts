import mongoose, { Document, Schema } from 'mongoose';

export interface IWorker extends Document {
  name: string;
  phone: string;
  serviceId: mongoose.Types.ObjectId;
  serviceCategory: string;
  serviceType: string;
  location: {
    lat: number;
    lng: number;
  };
  status: 'AVAILABLE' | 'BUSY';
  ratingAvg: number;
  totalJobs: number;
}

const WorkerSchema: Schema = new Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
  serviceCategory: { type: String, required: true },
  serviceType: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  status: { type: String, enum: ['AVAILABLE', 'BUSY'], default: 'AVAILABLE' },
  ratingAvg: { type: Number, default: 0 },
  totalJobs: { type: Number, default: 0 }
});

export default mongoose.model<IWorker>('Worker', WorkerSchema);
