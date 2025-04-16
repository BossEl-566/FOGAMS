import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createBroadcastMessage } from '../controllers/broadcastMessage.controller.js';



const router = express.Router();

router.post('/create', verifyToken, createBroadcastMessage);






export default router;