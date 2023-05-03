import express from 'express';
import auth from '../middleware/auth';
import { onGetChannels } from '../controllers/channels';

const router = express.Router()
router.get("/", auth, onGetChannels);


export default router;