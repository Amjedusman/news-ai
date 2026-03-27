import mongoose from "mongoose";

const favoriteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    url: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("Favorite", favoriteSchema);