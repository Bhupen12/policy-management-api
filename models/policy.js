import mongoose, { Schema } from "mongoose";

const PolicySchema = new Schema({
  policyNumber: String,
  startDate: Date,
  endDate: Date,

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: 'Company',
  },
})

export default mongoose.models.Policy || mongoose.model('Policy', PolicySchema);