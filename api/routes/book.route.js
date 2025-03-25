import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createBookTime } from '../controllers/book.controller.js';




const router = express.Router();

router.post('/create', verifyToken, createBookTime);








export default router;