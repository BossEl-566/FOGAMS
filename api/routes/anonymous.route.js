import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createMessage, deleteMessage, getMessages } from '../controllers/anonymous.controller.js';




const router = express.Router();

router.post('/create', verifyToken, createMessage);
router.get('/get', verifyToken, getMessages);
router.delete('/delete/:messageId', verifyToken, deleteMessage);





export default router;