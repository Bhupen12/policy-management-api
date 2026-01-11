import mongoose, { Schema } from "mongoose";

const MessageSchema = new Schema(
  {
    message: { type: String, required: true },
    deliveredAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
