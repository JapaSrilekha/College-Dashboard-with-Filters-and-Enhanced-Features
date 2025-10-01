import mongoose from "mongoose";

const CollegeSchema = new mongoose.Schema({
  name: String,
  location: String,
  course: String,
  fee: Number
});

export default mongoose.model("College", CollegeSchema);
