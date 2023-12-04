import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  updateUser,
} from "../auth/users.js";
import { verifyToken } from "../middleware/jwt.js";
import { verifyAdmin } from "../middleware/admin.js";

const router = express.Router();

router.get("/:id/admin", verifyToken, verifyAdmin, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id", verifyToken, getUser);

router.patch("/:id/edit", updateUser);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
