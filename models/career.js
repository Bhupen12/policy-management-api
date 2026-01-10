import mongoose, { Schema } from "mongoose";

const CareerSchema = new Schema({
  name: String,
})

export default mongoose.models.Career || mongoose.model('Career', CareerSchema);