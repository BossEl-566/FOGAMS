import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, getDailyBibleMessage } from '../controllers/dailybiblemessage.controller.js';


const router = express.Router();

router.post('/daily-bible-message', verifyToken, create) 
router.get('/get-daily-bible-message', getDailyBibleMessage)


export default router; 