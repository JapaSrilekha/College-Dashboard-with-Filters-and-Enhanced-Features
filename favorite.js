import mongoose from "mongoose";

const FavoriteSchema = new mongoose.Schema({
  collegeId: String,
  name: String,
  location: String,
  course: String,
  fee: Number
});

export default mongoose.model("Favorite", FavoriteSchema);
