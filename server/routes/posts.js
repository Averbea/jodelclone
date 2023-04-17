import express from "express";
import { getPosts, getPost, createPost, votePost, deletePost, } from "../controllers/posts.js"
import { commentPost, getCommentsForPost, deleteComment, voteComment } from "../controllers/comments.js";

import auth from '../middleware/auth.js';

const router = express.Router()

router.get("/", auth, getPosts);
router.post("/create", auth, createPost)

router.get("/:id", auth, getPost)
router.delete("/:id", auth, deletePost)

router.post("/:id/vote", auth, votePost)

router.post("/:id/comment", auth, commentPost)
router.get("/:id/comments", auth, getCommentsForPost)

router.post("/:id/:commentId/vote", auth, voteComment)
router.delete("/:id/:commentId", auth, deleteComment)

export default router;