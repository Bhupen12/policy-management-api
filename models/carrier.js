import mongoose, { Schema } from "mongoose";

const CarrierSchema = new Schema({
  name: {
    type: String,
    required: true,
    index: true,
  },
}, { timestamps: true })

export default mongoose.models.Carrier || mongoose.model('Carrier', CarrierSchema);