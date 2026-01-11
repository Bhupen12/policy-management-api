import mongoose, { Schema } from "mongoose";

const ScheduledMessageSchema = new Schema(
  {
    message: { type: String, required: true },
    scheduledAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

export default mongoose.models.ScheduledMessage ||
  mongoose.model("ScheduledMessage", ScheduledMessageSchema);
