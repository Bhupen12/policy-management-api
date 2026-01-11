import mongoose, { Schema } from "mongoose";

const AgentSchema = new Schema({
  name:
  {
    type: String,
    required: true,
    index: true,
  },
}, { timestamps: true });

export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema);