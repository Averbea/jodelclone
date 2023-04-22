import express from "express";
import {  onCreatePost, onDeletePost, onGetPost, onGetPosts, onVotePosts, } from "../controllers/posts"
import { onCommentPost, onDeleteComment, onGetCommentsForPost, onVoteComment } from "../controllers/comments";

import auth from '../middleware/auth';

const router = express.Router()

router.get("/", auth, onGetPosts);
router.post("/create", auth, onCreatePost)

router.get("/:id", auth, onGetPost)
router.delete("/:id", auth, onDeletePost)

router.post("/:id/vote", auth, onVotePosts)

router.post("/:id/comment", auth, onCommentPost)
router.get("/:id/comments", auth, onGetCommentsForPost)

router.post("/:id/:commentId/vote", auth, onVoteComment)
router.delete("/:id/:commentId", auth, onDeleteComment)

export default router;