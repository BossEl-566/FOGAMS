import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createEvent } from '../controllers/event.controller.js';



const router = express.Router();

router.post('/create', verifyToken, createEvent);


export default router;