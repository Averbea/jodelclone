import express from "express";
import { onSignUp, onSignIn, onSignOut } from "../controllers/user.js"
import auth from '../middleware/auth.js';

const router = express.Router()

router.post("/signup", onSignUp);
router.post("/signin", onSignIn)
router.post("/signout", auth, onSignOut)



export default router;