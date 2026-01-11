import mongoose, { Schema } from "mongoose";

const CompanySchema = new Schema({
  name: String,
})

export default mongoose.models.Company || mongoose.model('Company', CompanySchema);