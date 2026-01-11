import mongoose, { Schema } from "mongoose";

const PolicyCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
}, { timestamps: true});

export default mongoose.models.PolicyCategory || mongoose.model('PolicyCategory', PolicyCategorySchema);