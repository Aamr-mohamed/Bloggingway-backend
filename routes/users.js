import express from "express";
import { getUser, getUserFriends, addRemoveFriend } from "../auth/users.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.get("/:id", verifyToken, getUser);
router.get(":/id/friends", verifyToken, getUserFriends);

router.patch(":/_id/:friendId", verifyToken, addRemoveFriend);

export default router;
