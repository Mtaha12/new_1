import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICallbackRequest extends Document {
  phone: string;
  createdAt: Date;
  status?: 'pending' | 'processed' | 'failed';
  notes?: string;
}

const CallbackRequestSchema = new Schema<ICallbackRequest>(
  {
    phone: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['pending', 'processed', 'failed'],
      default: 'pending'
    },
    notes: { type: String, default: '' }
  },
  {
    timestamps: { createdAt: true, updatedAt: true }
  }
);

CallbackRequestSchema.index({ phone: 1, createdAt: -1 });

const CallbackRequest: Model<ICallbackRequest> =
  mongoose.models.CallbackRequest || mongoose.model<ICallbackRequest>('CallbackRequest', CallbackRequestSchema);

export default CallbackRequest;
