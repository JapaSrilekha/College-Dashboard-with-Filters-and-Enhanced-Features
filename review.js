import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  college: String,
  rating: Number,
  comment: String
});

export default mongoose.model("Review", ReviewSchema);
