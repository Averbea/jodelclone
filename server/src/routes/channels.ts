import express from 'express';
import auth from '../middleware/auth';
import { onGetTopChannels, onSearchChannel } from '../controllers/channels';

const router = express.Router()
router.get("/topChannels", auth, onGetTopChannels);
router.get("/search", auth, onSearchChannel);

export default router;