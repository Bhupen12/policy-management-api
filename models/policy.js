import mongoose, { Schema } from "mongoose";

const PolicySchema = new Schema({
  policyNumber: {
    type: String,
    required: true,
    unique: true,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  agent: {
    type: Schema.Types.ObjectId,
    ref: 'Agent',
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'PolicyCategory',
  },
  carrier: {
    type: Schema.Types.ObjectId,
    ref: 'Carrier',
  },
}, { timestamps: true });

export default mongoose.models.Policy || mongoose.model('Policy', PolicySchema);