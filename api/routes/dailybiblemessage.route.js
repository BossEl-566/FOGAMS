import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deleteDailyBibleMessage, getDailyBibleMessage, updateDailyBibleMessage } from '../controllers/dailybiblemessage.controller.js';


const router = express.Router();

router.post('/daily-bible-message', verifyToken, create) 
router.get('/get-daily-bible-message', getDailyBibleMessage)
router.delete('/delete-daily-bible-message/:dailyBibleMessageId/:userId', verifyToken, deleteDailyBibleMessage)
router.put('/update-daily-bible-message/:dailyBibleMessageId/:userId', verifyToken, updateDailyBibleMessage)


export default router; 