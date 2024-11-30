import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create } from '../controllers/dailybiblemessage.controller.js';


const router = express.Router();

router.post('/daily-bible-message', verifyToken, create) 


export default router; 