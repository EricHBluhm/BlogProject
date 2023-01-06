import express from "express";
import { getFeedPosts, getUserPosts, likePost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getFeedPosts); //grab user feed when on homepage, homepage puts all posts in database on page (want to be curated with algos in real life)
router.get("/:userId/posts", verifyToken, getUserPosts);//get relavent user posts only

//UPDATE
router.patch("/:id/like", verifyToken, likePost); //liking/unliking post

export default router;