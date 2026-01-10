import mongoose, { Schema } from "mongoose";

const LOBSchema = new Schema({
  name: String,
})

export default mongoose.models.LOB || mongoose.model('LOB', LOBSchema);