import mongoose, { Schema } from "mongoose";

const AgentSchema = new Schema({
  name:
  {
    type: String,
    required: true,
  },
})

export default mongoose.models.Agent || mongoose.model('Agent', AgentSchema);