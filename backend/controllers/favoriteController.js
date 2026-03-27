import Favorite from "../models/Favorite.js";

export const addFavorite = async (req, res) => {
  const { title, url, image } = req.body;

  if (!url) {
    res.status(400);
    throw new Error("Article URL is required");
  }

  const existing = await Favorite.findOne({ user: req.user._id, url });
  if (existing) {
    return res.json(existing);
  }

  const fav = await Favorite.create({
    user: req.user._id,
    title,
    url,
    image,
  });

  res.json(fav);
};

export const getFavorites = async (req, res) => {
  const favs = await Favorite.find({ user: req.user._id }).sort({ createdAt: -1 });

  res.json(favs);
};

export const deleteFavorite = async (req, res) => {
  const deleted = await Favorite.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!deleted) {
    res.status(404);
    throw new Error("Favorite not found");
  }

  res.json({ message: "Deleted" });
};