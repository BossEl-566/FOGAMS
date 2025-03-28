import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createMessage } from '../controllers/anonymous.controller.js';



const router = express.Router();

router.post('/create', verifyToken, createMessage);





export default router;