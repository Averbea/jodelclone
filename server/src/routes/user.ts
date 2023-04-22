import express from "express";
import { onSignUp, onSignIn, onSignOut } from "../controllers/user"
import auth from '../middleware/auth';

const router = express.Router()

router.post("/signup", onSignUp);
router.post("/signin", onSignIn)
router.post("/signout", auth, onSignOut)



export default router;