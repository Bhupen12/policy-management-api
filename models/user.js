import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
  },
  userType: {
    type: String,
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);