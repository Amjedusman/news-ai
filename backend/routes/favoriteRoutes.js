import express from "express";
import {
  addFavorite,
  getFavorites,
  deleteFavorite,
} from "../controllers/favoriteController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(addFavorite)
  .get(getFavorites);

router.delete("/:id", deleteFavorite);

export default router;