import { express } from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controller/posts";
import { verifyToken } from "../middleware/jwb";

const router = express.Router();

router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);
export default router;
