import express from "express";
import { getPosts,getPost, createPost} from "../controllers/posts.js"

import auth from '../middleware/auth.js';

const router = express.Router()

router.get("/",auth, getPosts);
router.post("/create",auth, createPost)

router.get("/:id", auth, getPost)


export default router;