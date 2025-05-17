import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { createMomo } from '../controllers/momo.controller.js';



const router = express.Router();

router.post('/create', verifyToken, createMomo);

export default router;