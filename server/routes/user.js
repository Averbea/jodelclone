import express from "express";
import { signin, signup, signout } from "../controllers/user.js"
import auth from '../middleware/auth.js';

const router = express.Router()

router.post("/signup", signup);
router.post("/signin", signin)
router.post("/signout", auth, signout)



export default router;