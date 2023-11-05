import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../auth/users.js";
import { verifyToken } from "../middleware/jwb.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get(":/id/friends", verifyToken, getUserFriends);

router.patch(":/id/:friendId", verifyToken, addRemoveFriend);

export default router;
