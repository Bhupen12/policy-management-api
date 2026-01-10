import { Schema } from "mongoose";

const AgentSchema = new Schema({
  name:
  {
    type: String,
    required: true,
  },
})

export default AgentSchema;