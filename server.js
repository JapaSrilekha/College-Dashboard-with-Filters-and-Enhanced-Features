import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import College from "./models/college.js";
import Review from "./models/review.js";
import Favorite from "./models/favorite.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Seed Colleges (only once)
app.get("/seed", async (req, res) => {
  await College.deleteMany({});
  await College.insertMany([
    { name: "ABC Engineering College", location: "Hyderabad", course: "Computer Science", fee: 120000 },
    { name: "XYZ Institute of Technology", location: "Bangalore", course: "Electronics", fee: 100000 },
    { name: "Sunrise Business School", location: "Chennai", course: "MBA", fee: 150000 },
    { name: "Greenfield Medical College", location: "Hyderabad", course: "MBBS", fee: 250000 }
  ]);
  res.json({ message: "Seeded successfully" });
});

// Colleges
app.get("/colleges", async (req, res) => {
  const { location, course, minFee, maxFee, search, sort } = req.query;
  let filter = {};
  if (location) filter.location = location;
  if (course) filter.course = course;
  if (minFee || maxFee) filter.fee = { $gte: Number(minFee) || 0, $lte: Number(maxFee) || 999999 };
  if (search) filter.name = { $regex: search, $options: "i" };
  let query = College.find(filter);
  if (sort === "asc") query = query.sort({ fee: 1 });
  if (sort === "desc") query = query.sort({ fee: -1 });
  res.json(await query);
});

// Reviews
app.post("/reviews", async (req, res) => {
  const review = new Review(req.body);
  await review.save();
  res.json(review);
});

app.get("/reviews", async (req, res) => {
  res.json(await Review.find());
});

// Favorites
app.post("/favorites", async (req, res) => {
  const fav = new Favorite(req.body);
  await fav.save();
  res.json(fav);
});

app.get("/favorites", async (req, res) => {
  res.json(await Favorite.find());
});

app.delete("/favorites/:id", async (req, res) => {
  await Favorite.findByIdAndDelete(req.params.id);
  res.json({ message: "Removed from favorites" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
