import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
} from "../auth/users.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.patch("/:_id/edit", updateUser);

router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
