import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);