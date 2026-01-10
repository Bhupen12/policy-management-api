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
  career: {
    type: Schema.Types.ObjectId,
    ref: 'Career',
  },
})

export default mongoose.models.Policy || mongoose.model('Policy', PolicySchema);