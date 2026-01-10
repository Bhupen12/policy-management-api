import mongoose, { Schema } from "mongoose";

const AccountSchema = new Schema({
  name: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

export default mongoose.models.Account || mongoose.model('Account', AccountSchema);