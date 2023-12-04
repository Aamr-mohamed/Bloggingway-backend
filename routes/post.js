import express from "express";
import {
  editPost,
  getFeedPosts,
  getUserPosts,
  likePost,
  removePost,
} from "../controller/posts.js";
import { verifyToken } from "../middleware/jwt.js";
import { verifyAdmin } from "../middleware/admin.js";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);

router.patch("/:id/removePost/:postId", verifyToken, verifyAdmin, removePost);
router.patch("/:id/editPost", verifyToken, verifyAdmin, editPost);
export default router;
